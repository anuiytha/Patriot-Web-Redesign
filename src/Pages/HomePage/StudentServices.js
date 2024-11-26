import React from "react";
import { useState, useEffect } from "react";
import useContentful from "../../components/contentful/useContentful";
import StudentServicesCard from "../../components/StudentServicesCard";
import { Box } from "@mui/material";
const StudentServices = () => {
    const [ss_list, setList] = useState([]);
    const { getStudentServices } = useContentful();

    useEffect(() => {
        getStudentServices().then((response) => setList(response))
    })
    return (
        <Box
            display="flex"                // Use flexbox for layout
            flexDirection="column"        // Arrange items in a column
            alignItems="center"           // Center horizontally
            justifyContent="center"       // Center vertically
            minHeight="100vh"             // Full viewport height
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
                    ss_list.map((studentServices, index) => (<StudentServicesCard key={index} studentServices={studentServices} />))
                }
            </Box>
        </Box>

    )

}

export default StudentServices;