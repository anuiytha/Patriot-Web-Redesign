import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import { Link } from "@mui/material";


const PersonalinfoCard = ({ personalInfo }) => {

    console.log(personalInfo);

    const imageUrl = personalInfo?.avatar?.fields?.file?.url
        ? `https:${personalInfo.avatar.fields.file.url}`  // Ensure the URL is prefixed with 'https:'
        : 'https://via.placeholder.com/345x140';


    return (
        <div>
            <Card
                data-resizable
                sx={{
                    height: 290,
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    alignItems: 'center',
                    width: 340,
                    // to make the demo resizable
                    overflow: 'hidden',
                    '--icon-size': '100px',
                }} >
                <CardOverflow variant="solid" color="success">
                    <AspectRatio
                        variant="outlined"
                        color="warning"
                        ratio="1"
                        sx={{
                            m: 'auto',
                            transform: 'translateY(50%)',
                            borderRadius: '50%',
                            width: 'var(--icon-size)',
                            boxShadow: 'sm',
                            bgcolor: 'background.surface',
                            position: 'relative',
                        }}    >
                        <div>
                            <Avatar src={imageUrl}
                                alt={personalInfo.name || "User avatar"}
                                sx={{ '--Avatar-size': '6rem' }} />
                        </div>
                    </AspectRatio>
                </CardOverflow>
                <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>

                    <Link href={personalInfo.url} >
                        <Button variant="outlined" sx={{ backgroundColor: 'gold', color: 'black', '&:hover': { backgroundColor: 'darkgoldenrod' } }}>
                            {personalInfo.name}
                        </Button>
                    </Link>


                </Typography>
                <CardContent sx={{ maxWidth: '40ch' }}>
                    <ul>
                        {personalInfo.description}
                    </ul>

                </CardContent>
                <CardActions
                    orientation="vertical"
                    buttonFlex={1}
                    sx={{
                        '--Button-radius': '40px',
                        width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
                    }} >
                </CardActions>

            </Card>

        </div >
    );
}

export default PersonalinfoCard;
