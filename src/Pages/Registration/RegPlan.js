import React, { useEffect, useState } from "react";
import RegPlanCard from "../../components/Registration/regPlanCard";
import useContentful from "../../components/contentful/useContentful";
import { Box } from '@mui/material';

const RegPlan = () => {
    const [regPlanning, setRegPlan] = useState([]);
    const { getRegPlan } = useContentful();


    useEffect(() => {
        getRegPlan().then((response) => setRegPlan(response));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                {regPlanning.map((registerPlan, index) => (
                    <RegPlanCard key={index} registerPlan={registerPlan} />
                ))}
            </Box>
        </Box>
    );
};

export default RegPlan;
