'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import {useRouter} from "next/navigation";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://book.harrylai.com/">
                harrylai.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Register() {
    const defaultTheme = createTheme();
    const router = useRouter();
    const [formData, setFormData] = useState({
        lemail: "",
        firstName: "",
        lastName: "",
        password: ""
    });

    function handleInput(e) {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        console.log(fieldName, fieldValue)

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const handleSubmit = async function(e) {
        e.preventDefault();
        console.log(formData);

        try {
            const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/users', {
                method: 'post',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            })
            if (request.ok) {
                const result = await request.json();
                if (result.err) {
                    console.log('---err---');
                } else {
                    // TODO: animation for sign up success
                    setTimeout(() => {
                        router.push('/sign-in');
                    }, 1000)
                }
            }
        } catch (e) {
            console.log({
                err: e.toString()
            })
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lemail"
                                    label="Email Address"
                                    name="lemail"
                                    autoComplete="email"
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleInput}
                                />
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                                {/*<FormControlLabel*/}
                                {/*    control={<Checkbox value="allowExtraEmails" color="primary"/>}*/}
                                {/*    label="I want to receive inspiration, marketing promotions and updates via email."*/}
                                {/*/>*/}
                            {/*</Grid>*/}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/sign-in" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>

    )
}
