import * as React from 'react';
import { Avatar, Typography, Link, Button, Card, CardContent, CardOverflow, AspectRatio } from '@mui/joy';

const Cards = ({ categories }) => {
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
                    <Avatar src={categories.avatar.file.url}
                        alt={categories.name || "User avatar"}
                        sx={{ '--Avatar-size': '4rem' }} />
                </AspectRatio>
            </CardOverflow>
            {/* Increased margin-top to add more space between the avatar and button */}
            <Typography level="title-lg" sx={{ mt: 4 }}>
                <Link href={categories.url}>
                    <Button variant="outlined" sx={{ backgroundColor: 'gold', color: 'black', '&:hover': { backgroundColor: 'darkgoldenrod' } }}>
                        {categories.name}
                    </Button>
                </Link>
            </Typography>
            <CardContent sx={{ maxWidth: '40ch' }}>
                <div>
                    {categories.description.split('\n').map((listItem, idx) => (
                        <li key={idx}>{listItem.trim()}</li>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Cards;
