import React, { useState } from "react";
import {
    Box, Typography, Card, CardContent, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, Accordion, AccordionSummary, Grid, Link
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Financial Dashboard Component
const FinancialDashboard = () => {
    const [userInfo, setUserInfo] = useState({
        Offer: {
            Info: (
                <div>
                    <Typography variant="h6">John Doe</Typography>
                    <Typography variant="body1">Student ID: 123456</Typography>
                    <Typography variant="body1">Major: Computer Science</Typography>
                    <Typography variant="body1">Enrollment Year: 2021</Typography>
                </div>
            )
        },
        FinancialAidHistory: { Info: 'There is no award history available.' },
        Resources: { Info: 'No Responses to Questions or Terms and Conditions are found.' },
        Notifications: { Info: 'No Withdrawal Information is found. Please read all Notifications if exist.' },
        SatisfactoryAcademicProgress: { Info: 'xyz' },
        CollegeFinancialPlanning: { Info: 'No information is available for this aid year.' },
    });

    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    // Handle Modal Open/Close
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

    // Pie Chart Data for Aid Breakdown
    const aidData = [
        { name: 'Scholarships', value: 400 },
        { name: 'Loans', value: 300 },
        { name: 'Grants', value: 200 },
    ];

    // Loan and Repayment Information (to be displayed as table or chart)
    const loanData = [
        { loanType: 'Federal Loan', amount: 5000, interestRate: 3.5, repayment: '2026-12-31' },
        { loanType: 'Private Loan', amount: 2000, interestRate: 5.0, repayment: '2025-06-30' },
    ];

    // College Financial Aid Plans (FAFSA, State Grants, etc.)
    const financialPlans = [
        {
            name: 'FAFSA',
            description: 'Free Application for Federal Student Aid. Apply for federal grants, loans, and work-study.',
            url: 'https://studentaid.gov/h/apply-for-aid/fafsa'
        },
        {
            name: 'State Grants',
            description: 'State-based financial assistance. Requirements vary by state.',
            url: 'https://www.studentaid.gov/understand-aid/types/grants/state-grants'
        },
        {
            name: 'Private Scholarships',
            description: 'External scholarships based on merit, need, or field of study.',
            url: 'https://www.scholarships.com'
        },
        {
            name: 'Pell Grant',
            description: 'Federal grant based on financial need for undergraduate students.',
            url: 'https://studentaid.gov/understand-aid/types/grants/pell'
        },
    ];

    // Function to render fields in modal
    const renderFields = () => {
        if (!editingCategory) return null;

        const fields = Object.keys(userInfo[editingCategory]).map((field) => (
            <TextField
                key={field}
                label={field.replace(/([A-Z])/g, ' $1')}
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
            <Typography variant="h4" gutterBottom>Financial Dashboard</Typography>

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
                                <Typography variant="h6">{userInfo.Offer.Info || 'Not Provided'}</Typography>
                                <br />
                                <a href="/personalprofile">
                                    <Button> My Profile</Button>
                                </a>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Right Side Columns */}
                <Box sx={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Financial Aid Overview</Typography>
                        </AccordionSummary>
                        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <PieChart width={200} height={200}>
                                <Pie
                                    data={aidData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {aidData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </Box>
                    </Accordion>

                    {/* Financial Aid History */}
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Financial Aid History</Typography>
                        </AccordionSummary>
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="body2">Here is the history of your financial aid awards, including scholarships, loans, and grants.</Typography>
                        </Box>
                    </Accordion>

                    {/* Loan Management */}
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Loan Management</Typography>
                        </AccordionSummary>
                        <Box sx={{ padding: 2 }}>
                            <Grid container spacing={2}>
                                {loanData.map((loan, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6">{loan.loanType}</Typography>
                                                <Typography variant="body2">Amount: ${loan.amount}</Typography>
                                                <Typography variant="body2">Interest Rate: {loan.interestRate}%</Typography>
                                                <Typography variant="body2">Repayment Due: {loan.repayment}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Accordion>

                    {/* College Financial Planning */}
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">College Financial Planning</Typography>
                        </AccordionSummary>
                        <Box sx={{ padding: 2 }}>
                            {financialPlans.map((plan, index) => (
                                <Box key={index} sx={{ marginBottom: 2 }}>
                                    <Typography variant="h6">{plan.name}</Typography>
                                    <Typography variant="body2">{plan.description}</Typography>
                                    <Link href={plan.url} target="_blank" sx={{ color: 'primary.main' }}>
                                        Visit {plan.name} Website
                                    </Link>
                                </Box>
                            ))}
                        </Box>
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

export default FinancialDashboard;
