import React, { useEffect, useState } from "react";
import RegistrationCard from "../../components/Registration/RegistrationCard";
import useContentful from "../../components/contentful/useContentful";
import { Box } from '@mui/material';

const Registration = () => {
    const [registerOption, setRegisterOption] = useState([]);
    const { getRegistration } = useContentful();

    useEffect(() => {
        getRegistration().then((response) => setRegisterOption(response));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"

            justifyContent="center"
            minHeight="70vh"
            p={2}
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
                {registerOption.map((registration, index) => (
                    <RegistrationCard key={index} registration={registration} />
                ))}
            </Box>
        </Box>
    );
};

export default Registration;
