"use client";

import {useEffect, useState} from "react";
import {Button, Container, Modal, Stack, TextField} from "@mui/material";
import DataTable from "@/components/DataTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const columns = [
    {field: 'id', headerName: 'ID', width: 50},
    {field: 'userName', headerName: 'Full Name', width: 200},
    {field: 'firstName', headerName: 'First Name', width: 200},
    {field: 'lastName', headerName: 'Last Name', width: 200},
    {field: 'lemail', headerName: 'Email', width: 200},
];

export default function User(props) {
    const [users, setUsers] = useState([]);
    const [modelOpen, setModelOpen] = useState(false);
    const [formData, setFormData] = useState({
        fistName: '',
        lastName: '',
        lemail: '',
        password: '',
        userName: ''
    });
    const [selectedRow, setSelectedRow] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const getUsers = async function () {
        const rawUsers = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/users');
        const result = rawUsers.ok ? await rawUsers.json() : [];
        setUsers(result)
    }

    function handleOpenModel() {
        setModelOpen(true);
    }

    function handleCloseModel() {
        setFormData({
            fistName: '',
            lastName: '',
            lemail: '',
            password: '',
            userName: ''
        })
        setEditMode(false);
        setModelOpen(false);
    }

    function handleInput(e) {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    async function handleCreateUser() {
        if (!formData.lemail) {
            console.log('w/o value')
            return;
        }

        if (editMode) {
            if (selectedRow.length == 0) {
                return;
            }

            const userId = selectedRow[0];

            try {
                const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/users/' + userId, {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName
                    })
                })
                if (request.ok) {
                    const result = await request.json();
                    if (result.err) {
                        console.log('---err---');
                    } else {
                        setEditMode(false);
                        getUsers();
                        handleCloseModel();
                    }
                }
            } catch (e) {
                console.log({
                    err: e.toString()
                })
            }
        } else {
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
                        getUsers();
                        handleCloseModel();
                    }
                }
            } catch (e) {
                console.log({
                    err: e.toString()
                })
            }
        }
    }

    async function handleEditUser() {
        if (selectedRow.length == 0) {
            return;
        }

        const userId = selectedRow[0];
        setEditMode(true);

        try {
            const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/users/' + userId, {
                method: 'get',
                headers: {"Content-Type": "application/json"},
            })
            if (request.ok) {
                const result = await request.json();
                if (result.err) {
                    console.log('---err---');
                } else {
                    console.log(result)
                    setFormData((prevState) => ({
                        ...prevState,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        lemail: result.lemail
                    }))
                    handleOpenModel();
                }
            }
        } catch (e) {
            console.log({
                err: e.toString()
            })
        }
    }

    async function handleDeleteUser() {
        if (selectedRow.length == 0) {
            return;
        }

        const deleteUserId = selectedRow[0];
        try {
            const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/users/' + deleteUserId, {
                method: 'delete',
                headers: {"Content-Type": "application/json"},
            })
            if (request.ok) {
                const result = await request.json();
                if (result.err) {
                    console.log('---err---');
                } else {
                    getUsers();
                }
            }
        } catch (e) {
            console.log({
                err: e.toString()
            })
        }
    }


    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Container>
            <Stack direction="row" spacing={2} sx={{mb: 2}}>
                <Button variant="contained" onClick={handleOpenModel}>Create</Button>
                {
                    (selectedRow.length > 0) ?
                        <Button variant="outlined" color={'secondary'} onClick={handleEditUser}>Edit</Button> : null
                }
                {
                    selectedRow.length > 0 ?
                        <Button variant="contained" color={'error'} onClick={handleDeleteUser}>Delete</Button> : null
                }
            </Stack>
            <Box>
                <Modal
                    open={modelOpen}
                    onClose={handleCloseModel}
                >
                    <Box className={"model"}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create New User
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            <Stack spacing={2} direction="column">

                                <TextField label="First Name" name="firstName" variant="outlined"
                                           value={formData.firstName}
                                           onChange={handleInput}
                                           fullWidth/>
                                <TextField label="Last Name" name="lastName" variant="outlined"
                                           value={formData.lastName}
                                           onChange={handleInput}
                                           fullWidth/>
                                <TextField label="Email" name="lemail" variant="outlined"
                                           value={formData.lemail}
                                           fullWidth
                                           onChange={handleInput}
                                           readOnly={editMode}
                                           disabled={editMode}
                                           required/>
                                {
                                    !editMode ?
                                        <TextField label="Password" name="password" variant="outlined"
                                                   value={formData.password}
                                                   fullWidth
                                                   onChange={handleInput}
                                                   readOnly={editMode}
                                                   disabled={editMode}
                                                   required/>
                                        : null
                                }
                            </Stack>
                        </Typography>

                        <Stack spacing={1} direction="row" sx={{position: 'fixed', bottom: 8, right: 8}}>
                            <Button variant="contained" onClick={handleCreateUser}>Confirm</Button>
                            <Button variant="contained" color="grey" onClick={handleCloseModel}>Cancel</Button>
                        </Stack>
                    </Box>
                </Modal>
            </Box>
            <DataTable data={users} columns={columns} rowSelectionModel={selectedRow}
                       setRowSelectionModel={setSelectedRow}></DataTable>
        </Container>
    )
}
