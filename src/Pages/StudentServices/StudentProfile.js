import React from "react";
import { useState, useEffect } from "react";
import useContentful from "../../components/contentful/useContentful";
import StudentProfileCard from "../../components/StudentProfileCard";
import { Box } from "@mui/material";

const StudentProfile = () => {
    const [studentp, setStudentp] = useState([]);
    const { getStudentProfile } = useContentful();

    useEffect(() => {
        getStudentProfile().then((response) => setStudentp(response))
    })

    return (
        <>
            <br />

            <Box
                display="flex"                // Use flexbox for layout
                flexDirection="column"        // Arrange items in a column
                alignItems="center"           // Center horizontally
                justifyContent="center"       // Center vertically
                minHeight="70vh"             // Full viewport height
                p={2}                         // Padding around the container
                sx={{
                    overflow: 'hidden',        // Prevent container scrolling
                    maxWidth: '100%',          // Ensure container does not exceed screen width
                    boxSizing: 'border-box',   // Include padding in the element's total width and height
                }}
            >
                <Box
                    display="flex"            // Use flexbox for the cards container
                    flexDirection="row"       // Arrange cards in a row
                    flexWrap="wrap"           // Allow wrapping if needed
                    justifyContent="center"   // Center cards horizontally
                    gap={2}                   // Space between cards
                >
                    {
                        studentp.map((studentProfile, index) => (<StudentProfileCard key={index} studentProfile={studentProfile} />))
                    }
                </Box>
            </Box>
        </>

    )

}

export default StudentProfile;