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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import {useRouter} from "next/navigation";
import {signIn} from 'next-auth/react';

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

export default function Login() {
    const defaultTheme = createTheme();
    const router = useRouter();
    const [formData, setFormData] = useState({
        lemail: "harrylai05@gmail.com",
        password: "1234"
    });

    function handleInput(e) {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        // console.log(fieldName, fieldValue)

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const handleSubmit = async function(e) {
        e.preventDefault();

        await signIn("credentials", {
            lemail: formData.lemail,
            password: formData.password,
            redirect: true,
            callbackUrl: '/'
        })

        // try {
        //     const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/auth/login', {
        //         method: 'post',
        //         headers: {"Content-Type": "application/json"},
        //         body: JSON.stringify(formData),
        //         credentials: 'include',
        //     })
        //     if (request.ok) {
        //         const result = await request.json();
        //         if (result.err) {
        //             console.log('---err---');
        //         } else {
        //             router.push('/')
        //         }
        //     }
        // } catch (e) {
        //     console.log({
        //         err: e.toString()
        //     })
        // }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> {/* onSubmit */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lemail"
                            label="Email Address"
                            name="lemail"
                            autoComplete="email"
                            autoFocus
                            onChange={handleInput}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleInput}
                        />
                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox value="remember" color="primary" />}*/}
                        {/*    label="Remember me"*/}
                        {/*/>*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // onClick={handleSubmit}
                            onClick={signIn}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {/*<Link href="#" variant="body2">*/}
                                {/*    Forgot password?*/}
                                {/*</Link>*/}
                            </Grid>
                            <Grid item>
                                <Link href="/sign-up" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}
