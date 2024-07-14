"use client";

import {useEffect, useState} from "react";
import {Button, Container, Modal, Stack, TextField} from "@mui/material";
import DataTable from "@/components/DataTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const columns = [
    {field: 'id', headerName: 'ID', width: 50},
    {field: 'bookName', headerName: 'Name', width: 200},
];

export default function Book(props) {
    const [books, setBooks] = useState([]);
    const [modelOpen, setModelOpen] = useState(false);
    const [formData, setFormData] = useState({
        bookName: ''
    });
    const [selectedRow, setSelectedRow] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const getBooks = async function () {
        const rawBooks = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/books');
        const result = rawBooks.ok ? await rawBooks.json() : [];
        setBooks(result)
    }

    function handleOpenModel() {
        setModelOpen(true);
    }

    function handleCloseModel() {
        setFormData({
            bookName: ''
        })
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

    async function handleCreateBook() {
        if (!formData.bookName) {
            console.log('w/o value')
            return;
        }

        if (editMode) {
            if (selectedRow.length == 0) {
                return;
            }

            const bookId = selectedRow[0];

            try {
                const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/books/' + bookId, {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        bookName: formData.bookName
                    })
                })
                if (request.ok) {
                    const result = await request.json();
                    if (result.err) {
                        console.log('---err---');
                    } else {
                        setEditMode(false);
                        getBooks();
                        handleCloseModel();
                    }
                }
            } catch (e) {
                console.log({
                    err: e.toString()
                })
            }
        } else {
            // Create New Record
            try {
                const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/books', {
                    method: 'post',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(formData)
                })
                if (request.ok) {
                    const result = await request.json();
                    if (result.err) {
                        console.log('---err---');
                    } else {
                        getBooks();
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

    async function handleEditBook() {
        if (selectedRow.length == 0) {
            return;
        }

        const bookId = selectedRow[0];
        setEditMode(true);

        try {
            const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/books/' + bookId, {
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
                        bookName: result.bookName
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

    async function handleDeleteBook() {
        if (selectedRow.length == 0) {
            return;
        }

        const deleteBookId = selectedRow[0];
        try {
            const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/books/' + deleteBookId, {
                method: 'delete',
                headers: {"Content-Type": "application/json"},
            })
            if (request.ok) {
                const result = await request.json();
                if (result.err) {
                    console.log('---err---');
                } else {
                    getBooks();
                }
            }
        } catch (e) {
            console.log({
                err: e.toString()
            })
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <Container>
            <Stack direction="row" spacing={2} sx={{mb: 2}}>
                <Button variant="outlined" onClick={handleOpenModel}>Create</Button>
                {
                    (selectedRow.length > 0) ?
                        <Button variant="outlined" color={'secondary'} onClick={handleEditBook}>Edit</Button> : null
                }
                {
                    (selectedRow.length > 0) ?
                        <Button variant="outlined" color={'error'} onClick={handleDeleteBook}>Delete</Button> : null
                }
            </Stack>
            <Box>
                <Modal
                    open={modelOpen}
                    onClose={handleCloseModel}
                >
                    <Box className={"model"}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create New Book
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            <TextField label="Book Name" name="bookName" variant="outlined" value={formData.bookName}
                                       onChange={handleInput}
                                       fullWidth required/>
                        </Typography>

                        <Stack spacing={1} direction="row" sx={{position: 'fixed', bottom: 8, right: 8}}>
                            <Button variant="contained" onClick={handleCreateBook}>Confirm</Button>
                            <Button variant="contained" color="grey" onClick={handleCloseModel}>Cancel</Button>
                        </Stack>
                    </Box>
                </Modal>
            </Box>
            <DataTable data={books} columns={columns} rowSelectionModel={selectedRow}
                       setRowSelectionModel={setSelectedRow}></DataTable>
        </Container>
    )
}
