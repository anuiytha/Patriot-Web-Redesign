// Import React and MUI components
import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';

const StudentRecords = () => {
    const [studentInfo, setStudentInfo] = useState({
        personalInfo: { userName: 'John Doe', studentId: '123456', major: 'Computer Science', enrollmentYear: '2021' },
        grades: [
            { course: 'Introduction to Programming', grade: 'A', semester: 'Fall 2023' },
            { course: 'Data Structures', grade: 'A-', semester: 'Spring 2024' },
        ],
        holds: ['Library Fee', 'Tuition Due'],
        expectedGraduationDate: 'August 2025',
        unofficialTranscriptLink: 'link-to-unofficial-transcript.pdf',
        officialTranscriptOrderLink: 'link-to-order-official-transcript',
    });

    const [open, setOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('August');
    const [selectedYear, setSelectedYear] = useState(2025);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = Array.from(new Array(10), (val, index) => 2024 + index);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const updatedDate = `${selectedMonth} ${selectedYear}`;
        setStudentInfo((prevInfo) => ({
            ...prevInfo,
            expectedGraduationDate: updatedDate,
        }));
        handleClose();
    };
    
    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>Student Records</Typography>

            {/* Main Flex Container */}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                {/* Left Box */}
                <Box sx={{ flex: '1 1 40%', maxWidth: '400px' }}>
                    <Card sx={{ boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ display: 'flex' }}>
                            <Box sx={{ flex: 1, alignItems: "center" }}>
                                <Avatar sx={{ width: 60, height: 60 }}>
                                    <SchoolIcon />
                                </Avatar>
                                <Typography variant="h6">{studentInfo.personalInfo.userName}</Typography>
                                <Typography variant="body2">Student ID: {studentInfo.personalInfo.studentId}</Typography>
                                <Typography variant="body2">Major: {studentInfo.personalInfo.major}</Typography>
                                <Typography variant="body2">Enrollment Year: {studentInfo.personalInfo.enrollmentYear}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Right Side Columns */}
                <Box sx={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Accordion for Grades */}
                    <Accordion defaultExpanded={false}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">View Grades</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                                {studentInfo.grades.map((grade, index) => (
                                    <Card key={index} sx={{ boxShadow: 3, p: 2 }}>
                                        <CardContent>
                                            <Typography><strong>{grade.course}</strong></Typography>
                                            <Typography>Grade: {grade.grade}</Typography>
                                            <Typography>Semester: {grade.semester}</Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Accordion for Holds */}
                    <Accordion defaultExpanded={false}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">View Your Holds</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                {studentInfo.holds.length > 0 ? (
                                    studentInfo.holds.map((hold, index) => (
                                        <Typography key={index}><strong>{hold}</strong></Typography>
                                    ))
                                ) : (
                                    <Typography>No holds on your account</Typography>
                                )}
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Accordion for Graduation Date */}
                    <Accordion defaultExpanded={false}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Expected Graduation Date</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{studentInfo.expectedGraduationDate}</Typography>
                            <Button variant="contained" onClick={handleOpen}>Update Graduation Date</Button>
                        </AccordionDetails>
                    </Accordion>

                    {/* Accordion for Transcripts */}
                    <Accordion defaultExpanded={false}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Transcript Services</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button href={studentInfo.unofficialTranscriptLink} variant="outlined" target="_blank">
                                    View Unofficial Transcript
                                </Button>
                                <Button href={studentInfo.officialTranscriptOrderLink} variant="outlined" target="_blank">
                                    Order Official Transcript
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>

            {/* Edit Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Expected Graduation Date</DialogTitle>
                <DialogContent>
                    <Select
                        label="Month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        fullWidth
                    >
                        {months.map((month) => (
                            <MenuItem key={month} value={month}>
                                {month}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        label="Year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StudentRecords;