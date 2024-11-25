import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register Chart.js modules
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

    const [showChart, setShowChart] = useState(true);
    const [selectedTerm, setSelectedTerm] = useState("Fall 2023");
    const [open, setOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("August");
    const [selectedYear, setSelectedYear] = useState(2025);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
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

    // Filter grades by selected term
    const filteredGrades = studentInfo.grades.filter((g) => g.semester === selectedTerm);

    // Map grades to GPA values and assign colors based on GPA
    const gradeMapping = {
        "A+": 4.0,
        A: 4.0,
        "A-": 3.7,
        "B+": 3.3,
        B: 3.0,
        "B-": 2.7,
        C: 2.0,
        D: 1.0,
        F: 0.0,
    };
    const gradeColors = {
        4.0: "rgba(75, 192, 192, 0.8)", // Green
        3.7: "rgba(54, 162, 235, 0.8)", // Blue
        3.3: "rgba(255, 206, 86, 0.8)", // Yellow
        3.0: "rgba(255, 159, 64, 0.8)", // Orange
        2.7: "rgba(255, 99, 132, 0.8)", // Red
    };

    // Prepare data for the bar chart
    const chartData = {
        labels: filteredGrades.map((g) => g.course),
        datasets: [
            {
                label: "GPA Equivalent",
                data: filteredGrades.map((g) => gradeMapping[g.grade] || 0),
                backgroundColor: filteredGrades.map((g) => gradeColors[gradeMapping[g.grade]] || "rgba(255, 99, 132, 0.8)"),
                borderColor: "rgba(0, 0, 0, 0.1)",
                borderWidth: 1,
            },
        ],
    };

    // Bar chart options with dynamic sizing and interactivity
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `GPA: ${tooltipItem.raw}`,
                },
            },
            legend: {
                display: true,
                position: "top",
                labels: {
                    usePointStyle: true,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 0.5,
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Student Records
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                {/* Personal Info */}
                <Box sx={{ flex: "1 1 40%", maxWidth: "400px" }}>
                    <Card sx={{ boxShadow: 3, p: 2 }}>
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

                {/* Main Content */}
                <Box sx={{ flex: "1 1 60%", display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Grades */}
                    <Accordion defaultExpanded={false}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">View Grades</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                {/* Term Selection */}
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

                                {/* Show Chart Toggle */}
                                <FormControlLabel
                                    control={<Checkbox checked={showChart} onChange={(e) => setShowChart(e.target.checked)} />}
                                    label="Show Bar Chart"
                                />

                                {/* Bar Chart */}
                                {showChart && (
                                    <Box sx={{ height: 300, marginBottom: 4 }}>
                                        <Typography variant="subtitle1">Grade Overview for {selectedTerm}</Typography>
                                        <Bar data={chartData} options={chartOptions} />
                                    </Box>
                                )}

                                {/* Grade Details */}
                                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
                                    {filteredGrades.map((grade, index) => (
                                        <Card key={index} sx={{ boxShadow: 3, p: 2 }}>
                                            <CardContent>
                                                <Typography>
                                                    <strong>{grade.course}</strong>
                                                </Typography>
                                                <Typography>Grade: {grade.grade}</Typography>
                                                <Typography>Semester: {grade.semester}</Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Holds */}
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

                    {/* Graduation Date */}
                    <Accordion defaultExpanded={false}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Expected Graduation Date</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{studentInfo.expectedGraduationDate}</Typography>
                            <Button variant="contained" onClick={handleOpen}>Update Graduation Date</Button>
                        </AccordionDetails>
                    </Accordion>

                    {/* Transcripts */}
                    <Accordion defaultExpanded={false}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Transcript Services</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
