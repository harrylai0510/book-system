"use client";

import {useEffect, useState} from "react";
import {
    Button,
    Container,
    FormControl, FormHelperText,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
} from "@mui/material";
import DataTable from "@/components/DataTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const columns = [
    {field: 'id', headerName: 'ID', width: 50},
    {
        field: 'user.userName', headerName: 'User Name', width: 200,
        valueGetter: function (value, row) {
            return `${row.user.firstName} ${row.user.lastName}`;
        }
    },
    {
        field: 'book.bookName', headerName: 'Book Name', width: 200,
        valueGetter: function (value, row) {
            return row.book.bookName;
        }
    },
];

export default function History(props) {
    const router = useRouter();
    const {data: session, status} = useSession()
    const [Histories, setHistories] = useState([]);
    const [modelOpen, setModelOpen] = useState(false);
    const [initLoad, setInitLoad] = useState(true);
    const [optionData, setOptionData] = useState({
        userList: [],
        bookList: []
    });
    const [formData, setFormData] = useState({
        userId: null,
        bookId: null
    });
    const [selectedRow, setSelectedRow] = useState([]);

    const getHistories = async function () {
        const rawHistories = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/histories', {method: 'get'});
        const result = rawHistories.ok ? await rawHistories.json() : [];
        setHistories(result)
    }

    const getOptionData = async function () {
        let tempData = [];

        const rawUsers = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/users', {method: 'get'});
        const resultUser = rawUsers.ok ? await rawUsers.json() : [];
        tempData['userList'] = resultUser;

        const rawBooks = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/books', {method: 'get'});
        const resultBook = rawBooks.ok ? await rawBooks.json() : [];
        tempData['bookList'] = resultBook;

        setOptionData(tempData);
    }

    function handleOpenModel() {
        setModelOpen(true);
    }

    function handleCloseModel() {
        setFormData({
            ...formData,
            bookId: null
        })
        setModelOpen(false);
    }

    async function handleCreateHistory() {
        console.log(formData)
        if (!formData.userId || !formData.bookId) {
            return;
        }

        try {
            const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/histories', {
                method: 'post',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            })
            if (request.ok) {
                const result = await request.json();
                if (result.err) {
                    console.log('---err---');
                } else {
                    getHistories();
                    handleCloseModel();
                }
            }
        } catch (e) {
            console.log({
                err: e.toString()
            })
        }
    }

    async function handleDeleteHistory() {
        if (selectedRow.length == 0) {
            return;
        }

        const deleteHistoryId = selectedRow[0];
        try {
            const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + '/histories/' + deleteHistoryId, {
                method: 'delete',
                headers: {"Content-Type": "application/json"},
            })
            if (request.ok) {
                const result = await request.json();
                if (result.err) {
                    console.log('---err---');
                } else {
                    getHistories();
                }
            }
        } catch (e) {
            console.log({
                err: e.toString()
            })
        }
    }

    function handleInput(e) {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    useEffect(() => {
        if (status === "authenticated") {
            setFormData((prevState) => ({
                ...prevState,
                userId: session?.user?.id
            }))
        }
        if (initLoad) {
            setInitLoad(false);
            getOptionData();
            getHistories();
        }
    }, [session, status]);


    return (
        <Container>
            <Stack direction="row" spacing={2} sx={{mb: 2}}>
                <Button variant="contained" onClick={handleOpenModel}>Create</Button>
                {
                    selectedRow.length > 0 ?
                        <Button variant="contained" color={'error'} onClick={handleDeleteHistory}>Delete</Button> : null
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
                                <FormControl sx={{m: 1, minWidth: 120}}>
                                    <InputLabel id="user">User *</InputLabel>
                                    <Select
                                        id={'user'}
                                        name={'userId'}
                                        label={'User *'}
                                        onChange={handleInput}
                                        value={formData.userId}
                                        readOnly
                                    >
                                        {
                                            optionData.userList.map((item) => {
                                                return (
                                                    <MenuItem key={item.id} value={item.id}>{item.userName}</MenuItem>)
                                            })
                                        }
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                                <FormControl sx={{m: 1, minWidth: 120}}>
                                    <InputLabel id="book">Book *</InputLabel>
                                    <Select
                                        id={'book'}
                                        name={'bookId'}
                                        label={'Book *'}
                                        onChange={handleInput}
                                    >
                                        {
                                            optionData.bookList.map((item) => {
                                                return (
                                                    <MenuItem key={item.id} value={item.id}>{item.bookName}</MenuItem>)
                                            })
                                        }
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            </Stack>
                        </Typography>

                        <Stack spacing={1} direction="row" sx={{position: 'fixed', bottom: 8, right: 8}}>
                            <Button variant="contained" onClick={handleCreateHistory}>Confirm</Button>
                            <Button variant="contained" color="grey" onClick={handleCloseModel}>Cancel</Button>
                        </Stack>
                    </Box>
                </Modal>
            </Box>
            <DataTable data={Histories} columns={columns} rowSelectionModel={selectedRow} setRowSelectionModel={setSelectedRow}></DataTable>
        </Container>
    )
}
