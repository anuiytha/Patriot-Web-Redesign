import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    Button,
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    LinearProgress,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Slider,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StudentRecords = () => {
    const [studentInfo, setStudentInfo] = useState({
        personalInfo: {
            userName: "John Doe",
            studentId: "123456",
            major: "Computer Science",
            enrollmentYear: "2023",
        },
        grades: [
            { course: "Introduction to Programming", grade: "A", semester: "Spring 2023" },
            { course: "Data Structures", grade: "A-", semester: "Spring 2024" },
            { course: "Algorithms", grade: "B+", semester: "Spring 2024" },
            { course: "Advanced Algorithms", grade: "A", semester: "Summer 2024" },
            { course: "Operating Systems", grade: "A-", semester: "Fall 2024" },
            { course: "Computer Networks", grade: "B", semester: "Spring 2024" },
            { course: "UI/UX", grade: "A+", semester: "Fall 2023" },
            { course: "NLP", grade: "A", semester: "Fall 2023" },
            { course: "Computational Design", grade: "A-", semester: "Fall 2023" },
        ],
        holds: ["Library Fee", "Tuition Due"],
        expectedGraduationDate: "August 2025",
        unofficialTranscriptLink: "link-to-unofficial-transcript",
        officialTranscriptOrderLink: "link-to-order-official-transcript",
    });

    const [progress, setProgress] = useState(73.69);
    const [open, setOpen] = useState(false);
    const [sliderValue, setSliderValue] = useState(progress);
    const [selectedMonth, setSelectedMonth] = useState("August");
    const [selectedYear, setSelectedYear] = useState(2025);
    const [selectedTerm, setSelectedTerm] = useState("Spring 2024");
    const [showChart, setShowChart] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = () => {
        const updatedDate = `${selectedMonth} ${selectedYear}`;
        setStudentInfo((prevInfo) => ({
            ...prevInfo,
            expectedGraduationDate: updatedDate,
        }));
        setProgress(sliderValue);
        handleClose();
    };

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    const filteredGrades = studentInfo.grades.filter((g) => g.semester === selectedTerm);

    const gradeMapping = {
        "A+": 4.0,
        A: 4.0,
        "A-": 3.7,
        "B+": 3.3,
        B: 3.0,
    };

    const gradeColors = {
        4.0: "rgba(75, 192, 192, 0.8)",
        3.7: "rgba(54, 162, 235, 0.8)",
        3.3: "rgba(255, 206, 86, 0.8)",
        3.0: "rgba(255, 159, 64, 0.8)",
    };

    const chartData = {
        labels: filteredGrades.map((g) => g.course),
        datasets: [
            {
                label: "GPA Equivalent",
                data: filteredGrades.map((g) => gradeMapping[g.grade] || 0),
                backgroundColor: filteredGrades.map(
                    (g) => gradeColors[gradeMapping[g.grade]] || "rgba(255, 99, 132, 0.8)"
                ),
                borderColor: "rgba(0, 0, 0, 0.1)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Student Records
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
                {/* Personal Information Card */}
                <Box sx={{ flex: "1 1 30%", maxWidth: "400px" }}>
                    <Card sx={{ boxShadow: 3, padding: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar sx={{ width: 60, height: 60 }}>
                                <SchoolIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h6">{studentInfo.personalInfo.userName}</Typography>
                                <Typography variant="body2">Student ID: {studentInfo.personalInfo.studentId}</Typography>
                                <Typography variant="body2">Major: {studentInfo.personalInfo.major}</Typography>
                                <Typography variant="body2">Enrollment Year: {studentInfo.personalInfo.enrollmentYear}</Typography>
                            </Box>
                        </Box>
                    </Card>
                </Box>

                {/* Other Sections */}
                <Box sx={{ flex: "1 1 70%", display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* View Grades */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">View Grades</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
                                    <Typography variant="subtitle1">Select Term:</Typography>
                                    <Select
                                        value={selectedTerm}
                                        onChange={(e) => setSelectedTerm(e.target.value)}
                                        fullWidth
                                        sx={{ maxWidth: 200 }}
                                    >
                                        {[...new Set(studentInfo.grades.map((g) => g.semester))].map((term) => (
                                            <MenuItem key={term} value={term}>
                                                {term}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                                <FormControlLabel
                                    control={<Checkbox checked={showChart} onChange={(e) => setShowChart(e.target.checked)} />}
                                    label="Show Bar Chart"
                                />
                                {showChart && (
                                    <Box sx={{ height: 300, marginBottom: 4 }}>
                                        <Bar data={chartData} />
                                    </Box>
                                )}
                                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
                                    {filteredGrades.map((grade, index) => (
                                        <Card key={index} sx={{ boxShadow: 3, p: 2 }}>
                                            <Typography>
                                                <strong>{grade.course}</strong>
                                            </Typography>
                                            <Typography>Grade: {grade.grade}</Typography>
                                            <Typography>Semester: {grade.semester}</Typography>
                                        </Card>
                                    ))}
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* View Your Holds */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">View Your Holds</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                {studentInfo.holds.length > 0 ? (
                                    studentInfo.holds.map((hold, index) => (
                                        <Typography key={index}>
                                            <strong>{hold}</strong>
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography>No holds on your account</Typography>
                                )}
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Expected Graduation Date */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Expected Graduation Date</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ marginTop: 1 }}>
                                Expected Graduation: {studentInfo.expectedGraduationDate}
                            </Typography>
                            <Typography sx={{ marginTop: 2 }}>
                                Progress Toward Graduation: {progress.toFixed(2)}%
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{ marginTop: 1, height: 10, borderRadius: 5 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: 2 }}
                                onClick={handleOpen}
                            >
                                Update Graduation Date
                            </Button>
                        </AccordionDetails>
                    </Accordion>

                    {/* Transcript Services */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Transcript Services</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <Button href={studentInfo.unofficialTranscriptLink} variant="outlined">
                                    View Unofficial Transcript
                                </Button>
                                <Button href={studentInfo.officialTranscriptOrderLink} variant="outlined">
                                    Order Official Transcript
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>

            {/* Dialog for Updating Graduation Date */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Expected Graduation Date</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        Adjust Progress Toward Graduation:
                    </Typography>
                    <Slider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        aria-labelledby="graduation-progress-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                    />
                    <Typography sx={{ marginTop: 2 }}>Select New Graduation Date:</Typography>
                    <Select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2, maxWidth: 200 }}
                    >
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                            <MenuItem key={month} value={month}>
                                {month}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        fullWidth
                        sx={{ maxWidth: 200 }}
                    >
                        {Array.from({ length: 10 }, (_, i) => 2025 + i).map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StudentRecords;
