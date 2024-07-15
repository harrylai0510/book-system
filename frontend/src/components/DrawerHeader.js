'use client';

import {styled} from "@mui/material/styles";

const DrawerHeaderStyle = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function DrawerHeader(props) {
    return (
        <DrawerHeaderStyle />
    );
}