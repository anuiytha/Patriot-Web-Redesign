import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
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
    { value: 'Spring 2025', label: 'Spring 2025' }
];

function ChildModal({ addClass }) {
    const [subject, setSubject] = React.useState('');
    const [courseNumber, setCourseNumber] = React.useState('');
    const [isAdvanced, setIsAdvanced] = React.useState(false);
    const [courseFound, setCourseFound] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSearchCourse = () => {
        // Find a course where either the subject or course number matches the input
        const foundCourse = courseDatabase.find(course =>

            (subject && course.subject === subject) ||

            (subject && course.subject.toLowerCase() === subject.toLowerCase()) ||

            (courseNumber && course.courseNumber === courseNumber)
        );
        setCourseFound(foundCourse ? foundCourse : null); // Clear if not found
    };


    const handleAddClass = () => {
        if (courseFound) {
            addClass(courseFound);
            handleClose();
        }
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Add Class</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 600 }}>
                    <h2 id="child-modal-title">Register for Classes</h2>
                    <h3 id="child-modal-title">Enter your Search Criteria</h3>

                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                label="Subject"
                                placeholder="Ex: Software Engineering"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                fullWidth
                                required
                            />
                        </div>
                        <div>
                            <TextField
                                label="Course Number"
                                placeholder="Ex: 632"
                                value={courseNumber}
                                onChange={(e) => setCourseNumber(e.target.value)}
                                fullWidth
                                required
                            />
                        </div>

                        <Button onClick={handleSearchCourse}>Search</Button>

                        {courseFound && (
                            <Box sx={{ mt: 2 }}>
                                <p><strong>Course Name:</strong> {courseFound.courseName}</p>
                                <p><strong>Professor:</strong> {courseFound.professor}</p>
                                <p><strong>Credits:</strong> {courseFound.credits}</p>
                                <p><strong>Description:</strong> {courseFound.description}</p>
                                <p><strong>Meeting Time:</strong>{courseFound.MeetingTime}</p>
                            </Box>
                        )}
                        <FormControlLabel
                            control={<Checkbox checked={isAdvanced} onChange={() => setIsAdvanced(!isAdvanced)} />}
                            label="Advanced Search"
                        />
                    </Box>
                    <Button onClick={handleAddClass} disabled={!courseFound}>Add Class</Button>
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default function NestedModal() {
    const [open, setOpen] = React.useState(false);
    const [schedule, setSchedule] = React.useState([]);
    const [termSelected, setTermSelected] = React.useState(false); // New state to track if term is selected

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addClass = (newClass) => setSchedule([...schedule, newClass]);
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
                        <div>
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
                        </div>
                    </Box>
                    <Button onClick={handleTermSelect}>Submit</Button>
                </Box>
            </Modal>

            {/* Displaying the Schedule */}
            {termSelected && (
                <Box sx={{ mt: 4, marginLeft: 5 }}>
                    <h3>Your Schedule</h3>
                    {schedule.length === 0 ? (
                        <p>No classes added yet.</p>
                    ) : (
                        <List>
                            {schedule.map((course, index) => (
                                <ListItem key={index} secondaryAction={
                                    <IconButton edge="end" onClick={() => removeClass(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }>
                                    <ListItemText
                                        primary={`${course.subject} ${course.courseNumber} - ${course.courseName}`}
                                        secondary={`Professor: ${course.professor} | Credits: ${course.credits}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                    <ChildModal addClass={addClass} />
                </Box>
            )}
        </div>
    );
}
