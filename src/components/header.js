import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Typography, IconButton, Badge, InputBase, Menu, MenuItem, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(0.5, 1, 0.5, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '15ch',
        },
    },
}));

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [openHelpDialog, setOpenHelpDialog] = React.useState(false); // State to manage modal visibility

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleOpenHelpDialog = () => {
        setOpenHelpDialog(true); // Open the Help modal
    };

    const handleCloseHelpDialog = () => {
        setOpenHelpDialog(false); // Close the Help modal
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <IconButton size="large" aria-label="go to home" color="inherit">
                        <Badge color="error">
                            <HomeIcon />
                        </Badge>
                    </IconButton>
                </Link>
                <div role="alert" aria-live="assertive">
                    <p>Messages</p>
                </div>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: 'darkgreen' }}>
                    <Toolbar>
                        <img src="/m1.webp" alt="Patriot Web Mascot" width="150" height="150" />
                        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', fontSize: '24px', marginLeft: 1 }}>Patriot Web</Typography>

                        <Search sx={{ maxWidth: '200px' }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>

                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Tooltip title="Takes you to the Home Page">
                                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <IconButton size="large" aria-label="go to home" color="inherit">
                                            <Badge color="error">
                                                <HomeIcon />
                                            </Badge>
                                        </IconButton>
                                    </Link>
                                </Tooltip>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Tooltip title="You have 1 notification">
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                    >
                                        <Badge badgeContent={1} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Tooltip title="User Profile">
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Tooltip >
                            </div>

                            {/* Help link to open modal */}
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Tooltip title="Help">
                                    <Button
                                        color="inherit"
                                        onClick={handleOpenHelpDialog}
                                        sx={{ fontSize: '14px' }}
                                    >
                                        Help
                                    </Button>
                                </Tooltip>
                            </div>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </Box >

            {/* Help Dialog Modal */}
            <Dialog
                open={openHelpDialog}
                onClose={handleCloseHelpDialog}
                aria-labelledby="help-dialog-title"
                aria-describedby="help-dialog-description"
            >
                <DialogTitle id="help-dialog-title">Help & Support</DialogTitle>
                <DialogContent>
                    <Typography style={{ fontWeight: 'bold' }}>
                        Technical Assistance:
                    </Typography>

                    <Typography variant="body1">
                        ITS Support 24/7
                        <a href="https://chat.edusupportcenter.com/chat/websiteChat?short_name=gmuhd&key=gmuhd2552" target="_blank" rel="noopener noreferrer">
                            <span> Live Chat</span>
                        </a>.
                    </Typography>
                    <Typography>
                        Call: 703-993-8870
                        <br />
                        support@gmu.edu
                    </Typography>
                    <br />
                    <Typography variant="body1">
                        You can also check for related problem articles at{' '}
                        <a href="https://its.gmu.edu" target="_blank" rel="noopener noreferrer">
                            its.gmu.edu
                        </a>.
                    </Typography>

                    {/* Add more help information here */}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseHelpDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );
}
