import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, TextField } from '@mui/material';
import { gapi } from 'gapi-script'; // Import Google API

const clientId = '299028247097-77r1i63bpno2f9rre2gqtf84djfjpmvh.apps.googleusercontent.com'; // Replace with your Google Client ID
const apiKey = 'IzaSyD-y_A8bXKO9MHFsg-sTEHxtqDfOzpHhy0'; // Replace with your Google API key

const TimeSheet = () => {
    const today = new Date();
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [timesheet, setTimesheet] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: apiKey,
                clientId: clientId,
                scope: 'https://www.googleapis.com/auth/calendar.readonly',
            }).then(() => {
                console.log("GAPI client initialized.");
                loadCalendarEvents();
            }).catch((error) => {
                setError("Error initializing GAPI client: " + error.message);
                console.error("Error initializing GAPI client:", error);
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const loadCalendarEvents = () => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (!authInstance.isSignedIn.get()) {
            setError("User is not signed in.");
            console.error("User is not signed in.");
            return;
        }

        gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime',
        }).then((response) => {
            const events = response.result.items;
            setCalendarEvents(events);
        }).catch((error) => {
            setError("Error fetching calendar events: " + error.message);
            console.error('Error fetching calendar events:', error);
        });
    };

    const handleHoursChange = (eventId, e) => {
        const newTimesheet = { ...timesheet, [eventId]: e.target.value };
        setTimesheet(newTimesheet);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Timesheet Submitted:', timesheet);
        // Handle submission to backend or further processing here
        alert('Timesheet Submitted: ' + JSON.stringify(timesheet));
    };

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Employee Timesheet - {today.toLocaleString('default', { month: 'long' })} {today.getFullYear()}
            </Typography>

            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {calendarEvents.length === 0 ? (
                        <Typography variant="body1">No calendar events found.</Typography>
                    ) : (
                        calendarEvents.map((event) => (
                            <Grid item xs={12} sm={6} md={4} key={event.id}>
                                <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                                    <Typography variant="body1">
                                        {new Date(event.start.dateTime || event.start.date).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2">{event.summary}</Typography>
                                    <TextField
                                        type="number"
                                        label="Hours"
                                        inputProps={{ min: 0, max: 24 }}
                                        value={timesheet[event.id] || ''}
                                        onChange={(e) => handleHoursChange(event.id, e)}
                                        fullWidth
                                    />
                                </Box>
                            </Grid>
                        ))
                    )}
                </Grid>
                <Button type="submit" variant="contained" sx={{ marginTop: 3, backgroundColor: '#000', color: '#fff' }}>
                    Submit Timesheet
                </Button>
            </form>
        </Box>
    );
};

export default TimeSheet;
