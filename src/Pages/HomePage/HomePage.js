import React, { useEffect, useState } from "react";
import BasicCard from "../../components/HomepageCard";
import useContentful from "../../components/contentful/useContentful";
import { Box } from '@mui/material';

const HomePage = () => {
    const [options, setOptions] = useState([]);
    const { getCategories } = useContentful();

    useEffect(() => {
        getCategories().then((response) => setOptions(response));
    }, [getCategories]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="70vh"

            sx={{
                overflow: 'hidden',
                maxWidth: '100%',
                boxSizing: 'border-box',
            }}
        >
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center"
                gap={2}
            >
                {options.map((categories, index) => (
                    <BasicCard key={index} categories={categories} />
                ))}
            </Box>
        </Box>
    );
};

export default HomePage;
