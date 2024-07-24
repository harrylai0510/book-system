'use client';

import {useState} from "react";
import {styled, useTheme} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { Toolbar, Box, Divider, List, ListItem, IconButton, ListItemButton, ListItemIcon, ListItemText, Button, Grid, Typography, CssBaseline } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonIcon from '@mui/icons-material/Person';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import HistoryIcon from '@mui/icons-material/History';
import AssessmentIcon from '@mui/icons-material/Assessment';

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useSession, signOut} from "next-auth/react";


const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function LeftDrawer(props) {
    const theme = useTheme();
    const pathname = usePathname();
    const [open, setOpen] = useState(true);
    const session = useSession();
    const router = useRouter();

    const menuItems = [
        {name: 'User', icon: 'PersonIcon', href: '/user'},
        {name: 'Book', icon: 'ImportContactsIcon', href: '/book'},
        {name: 'History', icon: 'HistoryIcon', href: '/history'},
        {name: 'Report', icon: 'AssessmentIcon', href: '/report'},
    ];

    let name = '';
    const menuItem = menuItems.filter((item) => {
        return item.href === pathname;
    })
    if (menuItem.length === 1)
        name = menuItem[0].name

    function handleDrawerOpen() {
        setOpen(true)
    }

    function handleDrawerClose() {
        setOpen(false)
    }

    async function handleClick() {
        const result = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/auth/logout', { method: 'post', credentials: 'include' });
        signOut({
            callbackUrl: process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/sign-in'
        })
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>

            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Grid container>
                        <Grid item>
                            <Typography variant="h6" noWrap component="div">
                                {name}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Grid container direction="row-reverse">
                                <Grid item>
                                    <Button size="small" variant="contained" color="info" onClick={handleClick}>Logout</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {menuItems.map((item, index) => (
                        <Link key={item.name} href={item.href} passHref style={{ textDecoration: "none", color: 'inherit' }}>
                            <ListItem disablePadding sx={{display: 'block'}} selected={pathname === item.href}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}>
                                        { item.icon === 'PersonIcon' ? <PersonIcon/> : '' }
                                        { item.icon === 'ImportContactsIcon' ? <ImportContactsIcon/> : '' }
                                        { item.icon === 'HistoryIcon' ? <HistoryIcon/> : '' }
                                        { item.icon === 'AssessmentIcon' ? <AssessmentIcon/> : '' }
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
