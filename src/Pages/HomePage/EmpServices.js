import React from "react";
import { useState, useEffect } from "react";
import useContentful from "../../components/contentful/useContentful";
import EmployeeServicesCard from "../../components/EmployeeServicesCard";
import { Box } from '@mui/material';

const EmployeeServices = () => {
    const [es_list, setList] = useState([]);
    const { getEmployeeServices } = useContentful();

    useEffect(() => {
        getEmployeeServices().then((response) => setList(response))
    })
    return (



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
                    es_list.map((employeeServices, index) => (<EmployeeServicesCard key={index} employeeServices={employeeServices} />))
                }
            </Box>
        </Box>

    )
}

export default EmployeeServices;