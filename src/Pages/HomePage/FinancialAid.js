import React from "react";
import { useState, useEffect } from "react";
import useContentful from "../../components/contentful/useContentful";
import FinancialAidCard from "../../components/FinancialAidCard";
import { Box } from '@mui/material';

const FinancialAid = () => {
    const [fa_list, setList] = useState([]);
    const { getFinancialAid } = useContentful();

    useEffect(() => {
        getFinancialAid().then((response) => setList(response))
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
                {fa_list.map((financialAid, index) => (<FinancialAidCard key={index} financialAid={financialAid} />
                ))}
            </Box>
        </Box>

    )
}

export default FinancialAid;