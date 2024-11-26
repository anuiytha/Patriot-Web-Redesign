import React from 'react';
import { Box, Button, Modal, TextField, List, ListItem, ListItemText, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import courseDatabase from './courseDatabase'; // Import the manual database

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const options = [
    { value: 'Summer 2025', label: 'Summer 2025' },
    { value: 'Fall 2024', label: 'Fall 2024' },
    { value: 'Fall 2025', label: 'Fall 2025' },
    { value: 'Spring 2025', label: 'Spring 2025' },
];

// Convert schedule into chart data
const processScheduleForChart = (schedule) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return daysOfWeek.map((day) => {
        const classes = schedule.filter(course => course.meetingDay === day);
        return {
            day,
            classes: classes.length,
            details: classes.map(course => `${course.courseName} (${course.meetingTime})`).join(", "),
        };
    });
};

function ChildModal({ addClasses }) {
    const [subject, setSubject] = React.useState('');
    const [courseNumber, setCourseNumber] = React.useState('');
    const [courseFound, setCourseFound] = React.useState(null);
    const [selectedCourses, setSelectedCourses] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setSubject('');
        setCourseNumber('');
        setCourseFound(null);
        setSelectedCourses([]);
        setOpen(false);
    };

    const handleSearchCourse = () => {
        const foundCourse = courseDatabase.find(course =>
            subject.toLowerCase() === course.subject.toLowerCase() &&
            courseNumber === course.courseNumber
        );
        setCourseFound(foundCourse || null);
    };

    const handleAddToQueue = () => {
        if (courseFound && !selectedCourses.some(course => course.courseNumber === courseFound.courseNumber)) {
            setSelectedCourses([...selectedCourses, courseFound]);
            setCourseFound(null); // Clear current search result after adding
            setSubject('');
            setCourseNumber('');
        }
    };

    const handleSaveClasses = () => {
        addClasses(selectedCourses);
        handleClose();
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Add Classes</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 600 }}>
                    <h2 id="child-modal-title">Register for Classes</h2>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            label="Subject"
                            placeholder="Ex: Software Engineering"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Course Number"
                            placeholder="Ex: 632"
                            value={courseNumber}
                            onChange={(e) => setCourseNumber(e.target.value)}
                            fullWidth
                            required
                        />
                        <Button onClick={handleSearchCourse}>Search</Button>
                        {courseFound && (
                            <Box sx={{ mt: 2 }}>
                                <p><strong>Course Name:</strong> {courseFound.courseName}</p>
                                <p><strong>Professor:</strong> {courseFound.professor}</p>
                                <p><strong>Credits:</strong> {courseFound.credits}</p>
                                <p><strong>Meeting Day:</strong> {courseFound.meetingDay}</p>
                                <p><strong>Meeting Time:</strong> {courseFound.meetingTime}</p>
                                <Button onClick={handleAddToQueue}>Add to Queue</Button>
                            </Box>
                        )}
                    </Box>
                    {selectedCourses.length > 0 && (
                        <Box sx={{ mt: 4 }}>
                            <h3>Selected Courses</h3>
                            <List>
                                {selectedCourses.map((course, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={`${course.subject} ${course.courseNumber} - ${course.courseName}`}
                                            secondary={`Meeting: ${course.meetingDay} | ${course.meetingTime}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Button onClick={handleSaveClasses}>Save Classes</Button>
                        </Box>
                    )}
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}


export default function NestedModal() {
    const [open, setOpen] = React.useState(false);
    const [schedule, setSchedule] = React.useState([]);
    const [termSelected, setTermSelected] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Updated function to handle multiple classes
    const addClasses = (newClasses) => setSchedule([...schedule, ...newClasses]);

    const removeClass = (index) => setSchedule(schedule.filter((_, i) => i !== index));

    const handleTermSelect = () => {
        setTermSelected(true);
        handleClose();
    };

    return (
        <div>
            {!termSelected && (
                <Button onClick={handleOpen} sx={{ border: '2px solid #4CAF50', padding: '10px 20px', borderRadius: '5px', marginTop: 5, marginLeft: 5 }}>
                    Select a Term to Register
                </Button>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Terms Open for Registration</h2>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-select-term"
                            select
                            label="Select"
                            defaultValue="Fall 2024"
                            helperText="Please select your term"
                            fullWidth
                        >
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Button onClick={handleTermSelect}>Submit</Button>
                </Box>
            </Modal>

            {termSelected && (
                <Box sx={{ mt: 4, marginLeft: 5 }}>
                    <h3>Your Schedule</h3>
                    {schedule.length === 0 ? (
                        <p>No classes added yet.</p>
                    ) : (
                        <List>
                            {schedule.map((course, index) => (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton edge="end" onClick={() => removeClass(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={`${course.subject} ${course.courseNumber} - ${course.courseName}`}
                                        secondary={`Meeting: ${course.meetingDay} | ${course.meetingTime}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}

                    {/* Add Chart */}
                    {schedule.length > 0 && (
                        <>
                            <h3>Weekly Class Schedule</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={processScheduleForChart(schedule)}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis
                                        allowDecimals={false}
                                        label={{
                                            value: "Meeting Time",
                                            angle: -90,
                                            position: 'insideLeft',
                                        }}
                                    />
                                    <Tooltip
                                        formatter={(value, name, props) => [
                                            props.payload.details,
                                            "Classes",
                                        ]}
                                    />
                                    <Bar dataKey="classes" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </>
                    )}

                    <ChildModal addClasses={addClasses} /> {/* Updated prop */}
                </Box>
            )}
        </div>
    );
}

