import { Add, CheckBox, Person, Search } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Input, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CreateEmployeeDialog from "../components/CreateEmployeeDialog";
import { appContext } from "../context/AppContext";
import { useNavigate } from "react-router";

const employeeData = [
    { id: "1", imgSrc: "https://mui.com/static/images/avatar/3.jpg", name: "Ava Miller", email: "ava123@gmail.com", mobile: "1234567890", designation: "SALES", gender: "FEMALE", course: "MCA", createDate: "19/12/2022" },
    { id: "2", imgSrc: "https://mui.com/static/images/avatar/3.jpg", name: "Ava Miller", email: "ava123@gmail.com", mobile: "1234567890", designation: "SALES", gender: "FEMALE", course: "MCA", createDate: "19/12/2022" },
    { id: "3", imgSrc: "https://mui.com/static/images/avatar/3.jpg", name: "Ava Miller", email: "ava123@gmail.com", mobile: "1234567890", designation: "SALES", gender: "FEMALE", course: "MCA", createDate: "19/12/2022" },
    { id: "4", imgSrc: "https://mui.com/static/images/avatar/3.jpg", name: "Ava Miller", email: "ava123@gmail.com", mobile: "1234567890", designation: "SALES", gender: "FEMALE", course: "MCA", createDate: "19/12/2022" },
    { id: "5", imgSrc: "https://mui.com/static/images/avatar/3.jpg", name: "Ava Miller", email: "ava123@gmail.com", mobile: "1234567890", designation: "SALES", gender: "FEMALE", course: "MCA", createDate: "19/12/2022" },
]

export default function EmployeeList() {
    const context = useContext(appContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (context.isLoggedIn == false) {
            navigate("/login");
        }
    }, []);

    const [isCreateEmployeeDialogOpen, setIsCreateEmployeeDialogOpen] = useState(false);
    const [isEditEmployeeDialogOpen, setIsEditEmployeeDialogOpen] = useState(false);

    const handleOpenCreateEmployee = () => {
        setIsCreateEmployeeDialogOpen(true);
    }

    const handleCloseCreateEmployee = () => {
        setIsCreateEmployeeDialogOpen(false);
    }

    const handleOpenEditEmployee = () => {
        setIsEditEmployeeDialogOpen(true);
    }

    const handleCloseEditEmployee = () => {
        setIsEditEmployeeDialogOpen(false);
    }

    return <Container sx={{ overflow: "clip" }}>
        <Typography variant="h5" padding={4} textAlign={"center"}>Employee List</Typography>
        <Box display={"flex"} alignItems={"center"} justifyContent={"end"} gap={4}>
            <Box> Total Count: {4} </Box>
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
            <CreateEmployeeDialog open={isCreateEmployeeDialogOpen} handleClose={handleCloseCreateEmployee}></CreateEmployeeDialog>
        </Box>
        <Box display={"flex"} alignItems={"center"} justifyContent={"end"} gap={2} paddingTop={4}>
            <FormControl>
                <Box display={"flex"} alignItems={"center"} sx={{ backgroundColor: "#ddd5", borderRadius: 2, overflow: "clip" }}>
                    <TextField id="search" size="small" placeholder="Search Employee" sx={{ "& fieldset": { border: "none" } }}>
                    </TextField>
                    <FormLabel htmlFor="search" sx={{ display: "flex", alignItems: "center", bgcolor: "#ccc5" }}>
                        <IconButton>
                            <Search></Search>
                        </IconButton>
                    </FormLabel>
                </Box>
            </FormControl>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
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
                        return <TableRow key={data.id}>
                            <TableCell>
                                <Typography textAlign={"center"}>{data.id}</Typography>
                            </TableCell>
                            <TableCell>
                                <Avatar src={data.imgSrc}></Avatar>
                            </TableCell>
                            <TableCell>
                                <Typography>{data.name}</Typography>
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
                                <Typography>{data.createDate}</Typography>
                            </TableCell>
                            <TableCell>
                                <Button onClick={handleOpenEditEmployee}>Edit</Button>
                            </TableCell>
                            <TableCell>
                                <Button color={"error"}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>

            <Dialog open={isEditEmployeeDialogOpen} onClose={handleCloseEditEmployee}>
                <DialogTitle>Edit Employee Details</DialogTitle>
                <DialogContent>
                    <form>
                        <Stack rowGap={2}>
                            <Box display={"flex"} sx={{ flexDirection: { xs: "column", sm: "row" } }} gap={2}>
                                <TextField size="small" label={"First Name"} placeholder="John"></TextField>
                                <TextField size="small" label={"Last Name"} placeholder="Doe"></TextField>
                            </Box>
                            <Box sx={{ width: "100%" }}>
                                <TextField size="small" label={"Email"} placeholder="johndoe@email.com" fullWidth></TextField>
                            </Box>
                            <Box sx={{ width: "100%" }}>
                                <TextField size="small" label={"Mobile No."} placeholder="9999888877" fullWidth></TextField>
                            </Box>
                            <Box sx={{ width: "100%" }}>
                                <FormControl fullWidth>
                                    <InputLabel size="small">Designation</InputLabel>
                                    <Select
                                        label="Designation"
                                        size="small"
                                        value={"SALES"}
                                    >
                                        <MenuItem value="HR">HR</MenuItem>
                                        <MenuItem value="MANAGER">Manager</MenuItem>
                                        <MenuItem value="SALES">Sales</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ width: "100%" }}>
                                <FormControl>
                                    <FormLabel>Gender</FormLabel>
                                    <RadioGroup row>
                                        <FormControlLabel value={"MALE"} control={<Radio></Radio>} label={"Male"}></FormControlLabel>
                                        <FormControlLabel value={"FEMALE"} control={<Radio></Radio>} label={"Female"}></FormControlLabel>
                                        <FormControlLabel value={"OTHER"} control={<Radio></Radio>} label={"Other"}></FormControlLabel>
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box sx={{ width: "100%" }}>
                                <FormControl component={"fieldset"} fullWidth>
                                    <FormLabel component={"legend"}>Course</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel value={"BSC"} control={<CheckBox sx={{ ml: 2 }}></CheckBox>} label={"B.Sc"}></FormControlLabel>
                                        <FormControlLabel value={"BCA"} control={<CheckBox sx={{ ml: 2 }}></CheckBox>} label={"BCA"}></FormControlLabel>
                                        <FormControlLabel value={"MCA"} control={<CheckBox sx={{ ml: 2 }}></CheckBox>} label={"MCA"}></FormControlLabel>
                                    </FormGroup>
                                </FormControl>
                            </Box>
                            <Box sx={{ width: "100%" }}>
                                <Button variant="contained" color="info" startIcon={<Person />} fullWidth>
                                    Upload Profile Photo
                                    <Input sx={{
                                        position: "absolute",
                                        opacity: 0,
                                    }} type="file" inputProps={{ style: { cursor: "pointer" } }}></Input>
                                </Button>
                            </Box>
                            <Button type="submit" variant="contained">Update</Button>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
        </TableContainer>
    </Container>
} 