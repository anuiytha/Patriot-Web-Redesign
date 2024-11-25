import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tooltip,
    Snackbar,
    Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SectionAccordion = ({ title, items }) => (
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container spacing={2}>
                {items.map((item, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Card sx={{ boxShadow: 3, p: 2 }}>
                            <CardContent>
                                <Typography>
                                    <strong>{item.label}</strong>
                                </Typography>
                                {item.value && (
                                    <Button variant="outlined" aria-label={`View ${item.label}`}>
                                        {item.value}
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </AccordionDetails>
    </Accordion>
);

const EmployeeDashboard = () => {
    const [userInfo, setUserInfo] = useState({
        EmployeeInfo: { UserName: "John Doe", Email: "john.doe@example.com" },
    });
    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [notification, setNotification] = useState("");

    const handleClose = () => {
        setOpen(false);
        setEditingCategory(null);
    };

    const handleSave = () => {
        if (!userInfo.EmployeeInfo.UserName) {
            setNotification("Username is required.");
            return;
        }
        setNotification("Changes saved successfully!");
        handleClose();
    };

    const handleChange = (e, category) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [category]: { ...prev[category], [name]: value },
        }));
    };

    const renderFields = () => {
        if (!editingCategory) return null;
        return Object.keys(userInfo[editingCategory]).map((field) => (
            <TextField
                key={field}
                label={field.replace(/([A-Z])/g, " $1")}
                name={field}
                value={userInfo[editingCategory][field]}
                onChange={(e) => handleChange(e, editingCategory)}
                fullWidth
                margin="normal"
                aria-label={`${field} input`}
            />
        ));
    };

    const leaveBalances = [
        { label: "ACA VA1450 Hours:", value: "56.50" },
        { label: "Emergency Paid Sick FFCRA:", value: "56.50" },
        { label: "Emergency FMLA FFCRA:", value: "56.50" },
    ];

    const payInformation = [
        { label: "All Pay Stubs" },
        { label: "Direct Deposit Information" },
        { label: "Deductions History" },
    ];

    const benefits = [
        { label: "Current Summary" },
        { label: "Beneficiaries and Dependents" },
    ];

    const taxes = [
        { label: "W-4 Employee's Withholding Allowance Certificate" },
        { label: "Electronic Regulatory Consent" },
        { label: "W-2 Wage and Tax Statement" },
    ];

    // **Newly Added Activities**
    const activities = [
        {
            label: "Enter Time",
            description: "You can enter your working hours",
            link: "/employeetimesheet",
        },
        { label: "Labor Redistribution", link: "/laborredistribution" },
        { label: "Employee Menu", link: "/employeemenu" },
    ];

    return (
        <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Employee Dashboard
            </Typography>

            <Grid container spacing={4}>
                {/* Left Side - Profile and Activities */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent sx={{ textAlign: "center" }}>
                            <Avatar
                                aria-label="User Avatar"
                                sx={{ width: 60, height: 60, margin: "0 auto" }}
                            >
                                <PersonIcon />
                            </Avatar>
                            <Typography variant="h6" sx={{ mt: 1 }}>
                                {userInfo.EmployeeInfo.UserName || "Not Provided"}
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ mt: 2 }}
                                href="/personalprofile"
                                aria-label="Navigate to My Profile"
                            >
                                My Profile
                            </Button>
                        </CardContent>
                    </Card>

                    {/* My Activities Section */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" align="center">
                            My Activities
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            {activities.map((activity, index) => (
                                <Grid item xs={12} key={index}>
                                    <Tooltip title={activity.description || ""}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            href={activity.link}
                                            aria-label={activity.label}
                                            sx={{ textTransform: "none" }}
                                        >
                                            {activity.label}
                                        </Button>
                                    </Tooltip>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>

                {/* Right Side - Accordions */}
                <Grid item xs={12} sm={8}>
                    <SectionAccordion title="Leave Balances as of" items={leaveBalances} />
                    <SectionAccordion title="Pay Information" items={payInformation} />
                    <SectionAccordion title="Benefits" items={benefits} />
                    <SectionAccordion title="Taxes" items={taxes} />
                </Grid>
            </Grid>

            {/* Edit Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit {editingCategory}</DialogTitle>
                <DialogContent>{renderFields()}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" disabled={!editingCategory}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Notification Snackbar */}
            <Snackbar
                open={!!notification}
                message={notification}
                autoHideDuration={4000}
                onClose={() => setNotification("")}
            />
        </Box>
    );
};

export default EmployeeDashboard;
