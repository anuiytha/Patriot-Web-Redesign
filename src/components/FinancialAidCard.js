import * as React from 'react';
import { Avatar, Typography, Link, Button, Card, CardContent, CardOverflow, AspectRatio } from '@mui/joy';


const Cards = ({ financialAid }) => {
    const imageUrl = financialAid?.avatar?.fields?.file?.url
        ? `https:${financialAid.avatar.fields.file.url}`  // Ensure the URL is prefixed with 'https:'
        : 'https://via.placeholder.com/345x140';
    return (
        <Card
            sx={{
                height: 290,
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                alignItems: 'center',
                width: 340,
                overflow: 'hidden',
                '--icon-size': '100px',
            }}
        >
            <CardOverflow variant="solid" color="success">
                <AspectRatio
                    variant="outlined"
                    color="warning"
                    ratio="1"
                    sx={{
                        m: 'auto',
                        // Reduced transform to lower the avatar
                        transform: 'translateY(30%)',
                        borderRadius: '50%',
                        width: 'var(--icon-size)',
                        boxShadow: 'sm',
                        bgcolor: 'background.surface',
                        position: 'relative',
                    }}
                >
                    <Avatar src={imageUrl}
                        alt={financialAid.name || "User avatar"}
                        sx={{ '--Avatar-size': '2rem' }} />
                </AspectRatio>
            </CardOverflow>
            {/* Increased margin-top to add more space between the avatar and button */}
            <Typography level="title-lg" sx={{ mt: 4 }}>
                <Link href={financialAid.url}>
                    <Button variant="outlined" sx={{ backgroundColor: 'gold', color: 'black', '&:hover': { backgroundColor: 'darkgoldenrod' } }}>
                        {financialAid.name}
                    </Button>
                </Link>
            </Typography>
            <CardContent sx={{ maxWidth: '40ch' }}>
                <div>
                    {financialAid.description}
                </div>
            </CardContent>
        </Card>
    );
};

export default Cards;
