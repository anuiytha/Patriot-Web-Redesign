// GoogleCalendar.js or your existing component file
import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { Box, Typography } from '@mui/material';

const clientId = '299028247097-77r1i63bpno2f9rre2gqtf84djfjpmvh.apps.googleusercontent.com'; // Replace with your Google Client ID
const apiKey = 'AIzaSyD-y_A8bXKO9MHFsg-sTEHxtqDfOzpHhy0'; // Replace with your Google API Key
const scopes = 'https://www.googleapis.com/auth/calendar.readonly'; // Scopes for Calendar access

const GoogleCalendar = () => {
    const [calendarEvents, setCalendarEvents] = useState([]);

    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: apiKey,
                clientId: clientId,
                scope: scopes,
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            }).then(() => {
                const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
                if (isSignedIn) {
                    getAccessToken();
                } else {
                    gapi.auth2.getAuthInstance().signIn().then(getAccessToken);
                }
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const getAccessToken = () => {
        const accessToken = gapi.auth.getToken().access_token;
        console.log('Access Token:', accessToken);
        fetchCalendarEvents(accessToken);
    };

    const fetchCalendarEvents = (accessToken) => {
        gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        }).then((response) => {
            const events = response.result.items;
            setCalendarEvents(events);
        }).catch((error) => {
            console.error('Error fetching events:', error);
        });
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4">Upcoming Calendar Events</Typography>
            {calendarEvents.length > 0 ? (
                calendarEvents.map(event => (
                    <Box key={event.id} sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, margin: '10px 0' }}>
                        <Typography variant="body1">
                            {new Date(event.start.dateTime || event.start.date).toLocaleString()} - {event.summary}
                        </Typography>
                    </Box>
                ))
            ) : (
                <Typography variant="body2">No upcoming events found.</Typography>
            )}
        </Box>
    );
};

export default GoogleCalendar;
