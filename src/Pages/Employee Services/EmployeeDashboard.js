import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EmployeeDashboard = () => {
    const [userInfo, setUserInfo] = useState({
        EmployeeInfo: { UserName: '', Email: '', HomeAddress: '', PhoneNumber: '' },
        PersonalDetails: { FirstName: '', MiddleName: '', LastName: '', DOB: '', Sex: '', PersonalPronoun: '', GenderId: '' },
        additionalInfo1: { field1: '', field2: '' },
        additionalInfo2: { field1: '', field2: '' },
        additionalInfo3: { field1: '', field2: '' },
        additionalInfo4: { field1: '', field2: '' },
        additionalInfo5: { field1: '', field2: '' },
        additionalInfo6: { field1: '', field2: '' },
    });

    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    // const handleOpen = (category) => {
    //     setEditingCategory(category);
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
        setEditingCategory(null);
    };

    const handleSave = () => {
        handleClose();
    };

    const handleChange = (e, category) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [category]: { ...prev[category], [name]: value },
        }));
    };

    // // const handleDelete = (category) => {
    // //     setUserInfo((prev) => ({
    // //         ...prev,
    // //         [category]: {},
    // //     }));
    // };

    // Function to render all fields in the modal for editing
    const renderFields = () => {
        if (!editingCategory) return null;

        const fields = Object.keys(userInfo[editingCategory]).map((field) => (
            <TextField
                key={field}
                label={field.replace(/([A-Z])/g, ' $1')} // Add spaces between camelCase words
                name={field}
                value={userInfo[editingCategory][field]}
                onChange={(e) => handleChange(e, editingCategory)}
                fullWidth
                margin="normal"
            />
        ));

        return fields;
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>Employee Dashboard</Typography>

            {/* Main Flex Container */}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                {/* Left Box */}
                <Box sx={{ flex: '1 1 40%', maxWidth: '400px' }}>
                    <Card sx={{ boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ display: 'flex' }}>
                            <Box sx={{ flex: 1, alignItems: "center" }}>
                                <Avatar sx={{ width: 60, height: 60, alignItems: "center" }}>
                                    <PersonIcon />
                                </Avatar>
                                <Typography variant="h6">{userInfo.EmployeeInfo.UserName || 'Not Provided'}</Typography>
                                <br />
                                <a href="/personalprofile">
                                    <button> My Profile</button>
                                </a>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Right Side Columns */}
                <Box sx={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Accordion >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Leave Balances as of</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>ACA VA1450 Hours:</strong> <button> 56.50</button></Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>Emergency Paid Sick FFCRA:</strong> <button>56.50</button></Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>Emergency FMLA FFCRA:</strong> <button>56.50</button></Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">My Activities</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>



                                <Button sx={{ backgroundColor: '#000', color: '#fff' }} href="/employeetimesheet">
                                    Enter Time
                                </Button>



                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>Labor Redistribution</strong></Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>Employee Menu</strong></Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Pay Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <p>Latest Pay Stub: date hyperlink</p>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>All Pay Stubs</strong></Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>Direct Deposit Information</strong></Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>Deductions History</strong></Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Benefits</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>Current Summary</strong></Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>Beneficiaries and Dependents</strong></Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Taxes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>W-4 Employee's Withholding Allowance Certificate</strong></Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>Electronic Regulatory Consent</strong></Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>W-2 Wage and Tax Statement</strong></Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Employee Summary</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>Summary Card 1</strong></Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>Summary Card 2</strong></Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ boxShadow: 3, p: 2 }}>
                                    <CardContent>
                                        <Typography><strong>Summary Card 3</strong></Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>

            {/* Edit Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit {editingCategory}</DialogTitle>
                <DialogContent>
                    {renderFields()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EmployeeDashboard;
