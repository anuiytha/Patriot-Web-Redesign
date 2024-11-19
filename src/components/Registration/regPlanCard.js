import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from "@mui/material";

const RegPlanCard = ({ registerPlan }) => {
    // Log the registerPlan object to ensure the structure is correct
    console.log(registerPlan);

    // Safely access the image URL, including all the nested fields
    const imageUrl = registerPlan?.avatar?.fields?.file?.url
        ? `https:${registerPlan.avatar.fields.file.url}`  // Ensure the URL is prefixed with 'https:'
        : 'https://via.placeholder.com/345x140';  // Fallback image in case avatar is not available

    return (
        <>
            <Link href={registerPlan.url} sx={{ color: 'black', textDecoration: 'none' }}>
                <Card sx={{
                    width: 350,          // Set the width to 400px
                    height: 250,
                    padding: 2,       // Set the height to 300px
                    // Add padding inside the card
                    margin: '0 auto',    // Center the card horizontally
                    display: 'flex',
                    justifyContent: 'center',  // Center content horizontally
                    alignItems: 'center',
                }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image={imageUrl}  // Use the constructed imageUrl
                            alt={registerPlan?.name || 'Image'}
                            sx={{ width: '30%', height: 155, margin: '0 auto', objectFit: 'contain' }}
                        />
                        <CardContent>

                            <Typography gutterBottom variant="h5" component="div">
                                {registerPlan?.name || 'Title Not Available'}
                            </Typography>


                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {registerPlan?.description || 'Description not available'}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link >
        </>
    );
};

export default RegPlanCard;
