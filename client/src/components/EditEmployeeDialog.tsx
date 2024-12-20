import { CheckBox, Person } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, Stack, Box, TextField, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, FormGroup, Button, Input, Grid2 } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../context/AppContext";

export default function EditEmployeeDialog(props: {
    isEditEmployeeDialogOpen: boolean,
    handleCloseEditEmployee: (() => void),
    setIsSuccessfullEmployeeUpdationAlertShown: React.Dispatch<React.SetStateAction<boolean>>,
    editingEmployee: { id: string, img: any, firstName: string, lastName: string, email: string, mobile: string, designation: string, gender: string, course: string, createDate: Date } | undefined,
    getEmployeeData: ()=>void
}) {
    const context = useContext(appContext);

    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [designation, setDesignation] = useState("");
    const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER" | "">("");
    const [course, setCourse] = useState<"BSC" | "BCA" | "MCA" | "">("");
    const [profilePic, setProfilePic] = useState<File>();

    useEffect(() => {
        if (props.editingEmployee == undefined) {
            return;
        }

        setId(props.editingEmployee.id);
        setFirstName(props.editingEmployee.firstName);
        setLastName(props.editingEmployee.lastName);
        setEmail(props.editingEmployee.email);
        setMobile(props.editingEmployee.mobile);
        setDesignation(props.editingEmployee.designation);
        setGender(props.editingEmployee.gender as any);
        setCourse(props.editingEmployee.course as any);
    }, [props.editingEmployee]);

    const handleUpdateEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let profilePicBuf = new Uint8Array(await profilePic?.arrayBuffer() as ArrayBuffer);

        fetch(context.serverUrl + "/employee", {
            method: "PUT",
            body: JSON.stringify({ id, firstName, lastName, email, mobile, designation, gender, course, profilePic: profilePicBuf }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json()).then((body) => {
            if (!body.success) {
                return;
            }
            props.getEmployeeData();
            props.setIsSuccessfullEmployeeUpdationAlertShown(true);
            props.handleCloseEditEmployee();
        });
    }

    return <Dialog open={props.isEditEmployeeDialogOpen} onClose={props.handleCloseEditEmployee}>
        <DialogTitle>Edit Employee Details</DialogTitle>
        <DialogContent>
            <form onSubmit={(e) => handleUpdateEmployee(e)}>
                <Stack rowGap={2} paddingTop={2}>
                    <Box display={"flex"} sx={{ flexDirection: { xs: "column", sm: "row" } }} gap={2}>
                        <TextField size="small" label={"First Name"} placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)}></TextField>
                        <TextField size="small" label={"Last Name"} placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)}></TextField>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <TextField size="small" label={"Email"} placeholder="johndoe@email.com" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <TextField size="small" label={"Mobile No."} placeholder="9999888877" fullWidth value={mobile} onChange={(e) => setMobile(e.target.value)}></TextField>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <FormControl fullWidth>
                            <InputLabel size="small">Designation</InputLabel>
                            <Select
                                label="Designation"
                                size="small"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
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
                            <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value as any)}>
                                <Grid2 container columnSpacing={2}>
                                    <Grid2>
                                        <FormControlLabel value={"MALE"} control={<Radio></Radio>} label={"Male"}></FormControlLabel>
                                    </Grid2>
                                    <Grid2>
                                        <FormControlLabel value={"FEMALE"} control={<Radio></Radio>} label={"Female"}></FormControlLabel>
                                    </Grid2>
                                    <Grid2>
                                        <FormControlLabel value={"OTHER"} control={<Radio></Radio>} label={"Other"}></FormControlLabel>
                                    </Grid2>
                                </Grid2>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <FormControl component={"fieldset"} fullWidth>

                            <FormLabel component={"legend"}>Course</FormLabel>
                            <RadioGroup row value={course} onChange={(e) => setCourse(e.target.value as any)}>
                                <Grid2 container columnSpacing={2}>
                                    <Grid2>
                                        <FormControlLabel value={"BSC"} control={<Radio></Radio>} label={"B.Sc"}></FormControlLabel>
                                    </Grid2>
                                    <Grid2>
                                        <FormControlLabel value={"BCA"} control={<Radio></Radio>} label={"BCA"}></FormControlLabel>
                                    </Grid2>
                                    <Grid2>
                                        <FormControlLabel value={"MCA"} control={<Radio></Radio>} label={"MCA"}></FormControlLabel>
                                    </Grid2>
                                </Grid2>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <Button variant="contained" color="info" startIcon={<Person />} fullWidth>
                            Upload Profile Photo
                            <Input
                                sx={{
                                    position: "absolute",
                                    opacity: 0,
                                }} type="file"
                                inputProps={{ style: { cursor: "pointer" } }}
                                onChange={(e) => setProfilePic((e.target as HTMLInputElement).files?.[0])}
                            >
                            </Input>
                        </Button>
                    </Box>
                    <Button type="submit" variant="contained">Update</Button>
                </Stack>
            </form>
        </DialogContent>
    </Dialog>
}