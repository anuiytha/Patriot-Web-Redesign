import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Card,
    CardContent,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Avatar,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Snackbar,
    Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ethnicities = [
    'African', 'African American', 'Afro-Caribbean', 'Arab', 'Asian',
    'South Asian', 'Southeast Asian', 'European', 'Hispanic or Latino',
    'Indigenous or Native American', 'Pacific Islander', 'Jewish',
    'Middle Eastern', 'Mixed or Multiethnic', 'White or Caucasian', "Don't want to mention"
];

const genders = ['Male', 'Female', "Don't want to mention"];

const PersonalProfile = () => {
    const [userInfo, setUserInfo] = useState({
        PersonalInfo: { UserName: '', Email: '', HomeAddress: '', PhoneNumber: '', GNumber: '' },
        PersonalDetails: { FirstName: '', MiddleName: '', LastName: '', DateofBirth: '', Sex: '', PersonalPronoun: '', GenderIdentification: '' },
        Email: { GMUEmail: '', FAFSAParentEmail: '', FAFSAStudentEmail: '', OtherEmail1: '', OtherEmail2: '' },
        PhoneNumber: { phonenum1: '', phonenum2: '', premresphone: '' },
        Address: { PermanentAddress: '' },
        EmergencyContact: { EmergencyCont: '' },
        AdditionalDetails: { EthnicityRace: '', SSN: '', SSNConfirm: '' }
    });

    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [ssnError, setSsnError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showSSN, setShowSSN] = useState(false);
    const [showSSNConfirm, setShowSSNConfirm] = useState(false);

    const handleOpen = (category) => {
        setEditingCategory(category);
        setOpen(true);
        setSsnError('');
    };

    const handleClose = () => {
        setOpen(false);
        setEditingCategory(null);
    };

    const handleSave = () => {
        if (editingCategory === 'AdditionalDetails' && userInfo.AdditionalDetails.SSN !== userInfo.AdditionalDetails.SSNConfirm) {
            setSsnError('SSNs do not match. Please enter again.');
            return;
        }

        if (editingCategory === 'PersonalDetails' && (!userInfo.PersonalDetails.FirstName || !userInfo.PersonalDetails.LastName)) {
            setSsnError('First Name and Last Name are required.');
            return;
        }

        setSnackbarMessage(`${editingCategory} saved successfully!`);
        setSnackbarOpen(true);
        handleClose();
    };

    const handleChange = (e, category) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [category]: { ...prev[category], [name]: value },
        }));
    };

    const toggleShowSSN = () => setShowSSN(!showSSN);
    const toggleShowSSNConfirm = () => setShowSSNConfirm(!showSSNConfirm);
    const handleSnackbarClose = () => setSnackbarOpen(false);

    const renderFields = () => {
        if (!editingCategory) return null;

        if (editingCategory === 'PersonalDetails') {
            return (
                <>
                    <TextField
                        label="First Name"
                        name="FirstName"
                        value={userInfo.PersonalDetails.FirstName}
                        onChange={(e) => handleChange(e, 'PersonalDetails')}
                        fullWidth
                        margin="normal"
                        required
                        error={!userInfo.PersonalDetails.FirstName}
                        helperText={!userInfo.PersonalDetails.FirstName ? 'First Name is required.' : ''}
                    />
                    <TextField
                        label="Middle Name"
                        name="MiddleName"
                        value={userInfo.PersonalDetails.MiddleName}
                        onChange={(e) => handleChange(e, 'PersonalDetails')}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        name="LastName"
                        value={userInfo.PersonalDetails.LastName}
                        onChange={(e) => handleChange(e, 'PersonalDetails')}
                        fullWidth
                        margin="normal"
                        required
                        error={!userInfo.PersonalDetails.LastName}
                        helperText={!userInfo.PersonalDetails.LastName ? 'Last Name is required.' : ''}
                    />
                    <TextField
                        label="Date of Birth"
                        type="date"
                        name="DateofBirth"
                        value={userInfo.PersonalDetails.DateofBirth || ''}
                        onChange={(e) => handleChange(e, 'PersonalDetails')}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="GenderIdentification"
                            value={userInfo.PersonalDetails.GenderIdentification}
                            onChange={(e) => handleChange(e, 'PersonalDetails')}
                        >
                            {genders.map((gender) => (
                                <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Personal Pronoun"
                        name="PersonalPronoun"
                        value={userInfo.PersonalDetails.PersonalPronoun}
                        onChange={(e) => handleChange(e, 'PersonalDetails')}
                        fullWidth
                        margin="normal"
                    />
                </>
            );
        }

        if (editingCategory === 'AdditionalDetails') {
            return (
                <>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Ethnicity</InputLabel>
                        <Select
                            name="EthnicityRace"
                            value={userInfo.AdditionalDetails.EthnicityRace}
                            onChange={(e) => handleChange(e, 'AdditionalDetails')}
                        >
                            {ethnicities.map((ethnicity) => (
                                <MenuItem key={ethnicity} value={ethnicity}>{ethnicity}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="SSN"
                        name="SSN"
                        type={showSSN ? 'text' : 'password'}
                        value={userInfo.AdditionalDetails.SSN}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            handleChange({ target: { name: 'SSN', value } }, 'AdditionalDetails');
                        }}
                        fullWidth
                        margin="normal"
                        inputProps={{ maxLength: 11 }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={toggleShowSSN}>
                                    {showSSN ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        label="Confirm SSN"
                        name="SSNConfirm"
                        type={showSSNConfirm ? 'text' : 'password'}
                        value={userInfo.AdditionalDetails.SSNConfirm}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            handleChange({ target: { name: 'SSNConfirm', value } }, 'AdditionalDetails');
                        }}
                        fullWidth
                        margin="normal"
                        error={!!ssnError}
                        helperText={ssnError}
                        inputProps={{ maxLength: 11 }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={toggleShowSSNConfirm}>
                                    {showSSNConfirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
                </>
            );
        }

        return Object.keys(userInfo[editingCategory]).map((field) => (
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
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>Personal Information</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Box sx={{ flex: '1 1 40%', maxWidth: '400px' }}>
                    <Card sx={{ boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'right', justifyContent: 'space-between' }}>
                            <Box sx={{ flex: 2 }}>
                                <Avatar
                                    sx={{ width: 85, height: 85 }}
                                    alt="User Profile Icon"
                                >
                                    <PersonIcon sx={{ marginRight: 2, width: 50, height: 50, alignItems: 'center' }} />
                                </Avatar>
                                <Typography variant="h6">{userInfo.PersonalInfo.Email || 'Not Provided'}</Typography>
                                <br />
                                <Typography><strong>GNumber:</strong> <br />{userInfo.PersonalInfo.GNumber || 'Not Provided'}</Typography>
                                <Box
                                    sx={{
                                        borderBottom: '1px solid #ccc',
                                        marginY: 1,
                                        width: '100%',
                                    }}
                                    role="separator"

                                />
                                <Typography><EmailIcon aria-label="Email icon" /> {userInfo.PersonalInfo.Email || 'Not Provided'}</Typography>
                                <Typography><HomeIcon aria-label="Home address icon" /> {userInfo.PersonalInfo.HomeAddress || 'Not Provided'}</Typography>
                                <Typography><PhoneIcon aria-label="Phone icon" /> {userInfo.PersonalInfo.PhoneNumber || 'Not Provided'}</Typography>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpen('PersonalInfo')} aria-label="Edit Personal Info">
                                    <EditIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Card sx={{ boxShadow: 3, flex: '1 1 auto' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Avatar
                                sx={{ marginRight: 2, width: 56, height: 56 }}
                                alt="Personal Details Icon"
                            >
                                <PersonIcon />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6"><strong>Personal Details</strong></Typography>
                                <Box
                                    sx={{
                                        borderBottom: '1px solid #ccc',
                                        marginY: 1,
                                        width: '100%',
                                    }}
                                    role="separator"
                                />
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <Typography><strong>First Name:</strong> <br />{userInfo.PersonalDetails.FirstName || 'Not Provided'}</Typography>
                                    <Typography><strong>Middle Name:</strong><br /> {userInfo.PersonalDetails.MiddleName || 'Not Provided'}</Typography>
                                    <Typography><strong>Last Name:</strong><br /> {userInfo.PersonalDetails.LastName || 'Not Provided'}</Typography>
                                    <Typography><strong>Date of Birth:</strong><br /> {userInfo.PersonalDetails.DateofBirth || 'Not Provided'}</Typography>
                                    <Typography><strong>Legal Sex:</strong><br /> {userInfo.PersonalDetails.GenderIdentification || 'Not Provided'}</Typography>
                                    <Typography><strong>Personal Pronoun:</strong> <br />{userInfo.PersonalDetails.PersonalPronoun || 'Not Provided'}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpen('PersonalDetails')}>
                                    <EditIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ boxShadow: 3, flex: '1 1 auto' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Avatar
                                sx={{ marginRight: 2, width: 56, height: 56 }}
                                alt="Email Icon"
                            >
                                <EmailIcon />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6"><strong>Email</strong></Typography>
                                <Box
                                    sx={{
                                        borderBottom: '1px solid #ccc',
                                        marginY: 1,
                                        width: '100%',
                                    }}
                                    role="separator"
                                />
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <Typography><strong>GMU E-mail Address</strong> <br />{userInfo.Email.GMUEmail || 'Not Provided'} <br /></Typography>
                                    <Typography><strong>Personal E-mail Address</strong> <br />{userInfo.Email.OtherEmail1 || 'Not Provided'}</Typography>
                                    <Typography><strong>Financial Aid Parent E-mail Address</strong><br /> {userInfo.Email.FAFSAParentEmail || 'Not Provided'}<br /></Typography>
                                    <Typography><strong>Financial Aid Student E-mail Address</strong><br /> {userInfo.Email.FAFSAStudentEmail || 'Not Provided'}<br /></Typography>
                                </Box>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpen('Email')}>
                                    <EditIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ boxShadow: 3, flex: '1 1 auto' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Avatar
                                sx={{ marginRight: 2, width: 56, height: 56 }}
                                alt="Additional Details Icon"
                            >
                                <ListAltIcon />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6"><strong>Additional Details</strong></Typography>
                                <Box
                                    sx={{
                                        borderBottom: '1px solid #ccc',
                                        marginY: 1,
                                        width: '100%',
                                    }}
                                    role="separator"
                                />
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <Typography><strong>Ethnicity:</strong> <br />{userInfo.AdditionalDetails.EthnicityRace || 'Not Provided'}</Typography>
                                    <Typography><strong>SSN:</strong> <br />{userInfo.AdditionalDetails.SSN ? '******' : 'Not Provided'}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleOpen('AdditionalDetails')}>
                                    <EditIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit {editingCategory}</DialogTitle>
                <DialogContent>{renderFields()}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} color="primary" variant="contained" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    action={
                        <Button color="inherit" size="small" onClick={handleSnackbarClose}>
                            OK
                        </Button>
                    }
                    sx={{
                        width: '100%',
                        fontSize: '1rem',
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PersonalProfile;