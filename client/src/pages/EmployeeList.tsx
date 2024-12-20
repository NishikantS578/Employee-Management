import { Add, CheckBox, Person, Search } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Container, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Input, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CreateEmployeeDialog from "../components/CreateEmployeeDialog";
import { appContext } from "../context/AppContext";
import { useNavigate } from "react-router";
import EditEmployeeDialog from "../components/EditEmployeeDialog";

export default function EmployeeList() {
    const context = useContext(appContext);
    const navigate = useNavigate();

    const [employeeData, setEmployeeData] = useState<{ id: string, img: any, firstName: string, lastName: string, email: string, mobile: string, designation: string, gender: string, course: string, createDate: Date }[]>([]);

    const [totalDocumentCount, setTotalDocumentCount] = useState(0);

    const [search, setSearch] = useState("");

    const [editingEmployee, setEditingEmployee] = useState<{ id: string, img: any, firstName: string, lastName: string, email: string, mobile: string, designation: string, gender: string, course: string, createDate: Date }>();

    const [rowsPerPage, setRowsPerPage] = useState<10 | 25 | 50 | 100>(10);

    const [isSuccessfullEmployeeCreationAlertShown, setIsSuccessfullEmployeeCreationAlertShown] = useState(false);

    const [isSuccessfullEmployeeUpdationAlertShown, setIsSuccessfullEmployeeUpdationAlertShown] = useState(false);

    const [isSuccessfullEmployeeDeletionAlertShown, setIsSuccessfullEmployeeDeletionAlertShown] = useState(false);

    const [isCreateEmployeeDialogOpen, setIsCreateEmployeeDialogOpen] = useState(false);
    const [isEditEmployeeDialogOpen, setIsEditEmployeeDialogOpen] = useState(false);


    const handleOpenCreateEmployee = () => {
        setIsCreateEmployeeDialogOpen(true);
    }

    const handleCloseCreateEmployee = () => {
        setIsCreateEmployeeDialogOpen(false);
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetch(context.serverUrl + "/employee?search=" + search)
            .then((res) => res.json())
            .then((data) => { setEmployeeData(data.data) });
    }

    const handleOpenEditEmployee = (employeeData: { id: string, img: any, firstName: string, lastName: string, email: string, mobile: string, designation: string, gender: string, course: string, createDate: Date }) => {
        setEditingEmployee(employeeData);
        setIsEditEmployeeDialogOpen(true);
    }

    const handleCloseEditEmployee = () => {
        setIsEditEmployeeDialogOpen(false);
    }

    const handleDeleteEmployee = (employeeId: string) => {
        fetch(context.serverUrl + "/employee?id=" + employeeId, { method: "DELETE" })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    getEmployeeData();
                    setIsSuccessfullEmployeeDeletionAlertShown(true);
                }
            })
    }

    const getEmployeeData = () => {
        if (context.isLoggedIn == false) {
            navigate("/login");
            return;
        }

        fetch(context.serverUrl + "/employee")
            .then((res) => res.json())
            .then((data) => {
                setEmployeeData(data.data)
                setTotalDocumentCount(data.totalDocumentCount);
            });
    }

    useEffect(getEmployeeData, []);

    return <Container sx={{ overflow: "clip" }}>
        <Snackbar open={isSuccessfullEmployeeCreationAlertShown} onClose={() => setIsSuccessfullEmployeeCreationAlertShown(false)}>
            <Alert variant="filled">Successfully Created Employee</Alert>
        </Snackbar>

        <Snackbar open={isSuccessfullEmployeeUpdationAlertShown} onClose={() => setIsSuccessfullEmployeeUpdationAlertShown(false)}>
            <Alert variant="filled">Successfully Updated Employee</Alert>
        </Snackbar>

        <Snackbar open={isSuccessfullEmployeeDeletionAlertShown} onClose={() => setIsSuccessfullEmployeeDeletionAlertShown(false)}>
            <Alert variant="filled">Successfully Deleted Employee</Alert>
        </Snackbar>

        <Typography variant="h5" padding={4} textAlign={"center"}>Employee List</Typography>
        <Box display={"flex"} alignItems={"center"} justifyContent={"end"} gap={4}>
            <Box> Total Count: {totalDocumentCount} </Box>
            <Button
                variant="outlined"
                startIcon={<Add></Add>}
                sx={{ alignItems: "center", width: "max-content" }}
                onClick={handleOpenCreateEmployee}
            >
                <Typography variant="button">
                    Create Employee
                </Typography>
            </Button>
            <CreateEmployeeDialog open={isCreateEmployeeDialogOpen} handleClose={handleCloseCreateEmployee} setIsSuccessfullEmployeeCreationAlertShown={setIsSuccessfullEmployeeCreationAlertShown} getEmployeeData={getEmployeeData}></CreateEmployeeDialog>
        </Box>
        <Box display={"flex"} alignItems={"center"} justifyContent={"end"} gap={2} paddingTop={4}>
            <form onSubmit={handleSearch}>
                <FormControl>
                    <Box display={"flex"} alignItems={"center"}>
                        <TextField id="search" size="small" placeholder="Search Employee" sx={{ "& fieldset": { border: "none" }, bgcolor: "#fff9", borderTopLeftRadius: 2, borderBottomLeftRadius: 2, boxShadow: "inset 0 0 0 1px #ccc5" }} value={search} onChange={(e) => setSearch(e.target.value)} >
                        </TextField>
                        <FormLabel htmlFor="search" sx={{ display: "flex", alignItems: "center", bgcolor: "#ccc5" }}>
                            <IconButton onClick={handleSearch}>
                                <Search></Search>
                            </IconButton>
                        </FormLabel>
                    </Box>
                </FormControl>
            </form>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small" stickyHeader >
                <TableHead>
                    <TableRow>
                        <TableCell >
                            <Typography>Unique Id</Typography>
                        </TableCell>
                        <TableCell >
                            <Typography>Image</Typography>
                        </TableCell>
                        <TableCell >
                            <Typography>Name</Typography>
                        </TableCell>
                        <TableCell >
                            <Typography>Email</Typography>
                        </TableCell>
                        <TableCell >
                            <Typography>Mobile No.</Typography>
                        </TableCell>
                        <TableCell >
                            <Typography>Designation</Typography>
                        </TableCell>
                        <TableCell >
                            <Typography>Gender</Typography>
                        </TableCell>
                        <TableCell >
                            <Typography>Course</Typography>
                        </TableCell>
                        <TableCell >
                            <Typography>Create Date</Typography>
                        </TableCell>
                        <TableCell colSpan={2}>
                            <Typography textAlign={"center"}>Action</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employeeData.map((data) => {

                        let imgbuf = "";
                        data.img.data.map((e: number) => imgbuf += String.fromCharCode(e))

                        return <TableRow key={data.id}>
                            <TableCell>
                                <Typography textAlign={"center"}>{data.id.slice(-4)}</Typography>
                            </TableCell>
                            <TableCell>
                                <Avatar src={"data:image/jpeg;base64," + btoa(imgbuf)}></Avatar>
                            </TableCell>
                            <TableCell>
                                <Typography>{data.firstName + " " + data.lastName}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{data.email}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{data.mobile}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{data.designation}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{data.gender}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{data.course}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{data.createDate && new Date(data.createDate).toLocaleDateString()}</Typography>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => handleOpenEditEmployee(data)}>Edit</Button>
                            </TableCell>
                            <TableCell>
                                <Button color={"error"} onClick={() => handleDeleteEmployee(data.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination align="left" count={totalDocumentCount} onPageChange={() => { }} page={0} rowsPerPage={rowsPerPage} onRowsPerPageChange={(e) => { setRowsPerPage(Number(e.target.value) as any) }} sx={{ "& .MuiTablePagination-spacer": { display: "none", } }}></TablePagination>
                    </TableRow>
                </TableFooter>
            </Table>

            <EditEmployeeDialog
                isEditEmployeeDialogOpen={isEditEmployeeDialogOpen}
                handleCloseEditEmployee={handleCloseEditEmployee}
                setIsSuccessfullEmployeeUpdationAlertShown={setIsSuccessfullEmployeeUpdationAlertShown}
                editingEmployee={editingEmployee}
                getEmployeeData={getEmployeeData}
            />
        </TableContainer>
    </Container >
} 