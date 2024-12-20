import { Person } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid2, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { Dispatch, MouseEvent, SetStateAction, useContext, useState } from "react";
import { appContext } from "../context/AppContext";

export default function CreateEmployeeDialog(props: { open: boolean, handleClose: () => void, setIsSuccessfullEmployeeCreationAlertShown: Dispatch<SetStateAction<boolean>>, getEmployeeData: () => void }) {
    const context = useContext(appContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [designation, setDesignation] = useState("");
    const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER" | "">("");
    const [course, setCourse] = useState<"BSC" | "BCA" | "MCA" | "">("");
    const [profilePic, setProfilePic] = useState<File>();

    const handleCreateEmployee = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let profilePicBuf = new Uint8Array(await profilePic?.arrayBuffer() as ArrayBuffer);

        fetch(context.serverUrl + "/employee", {
            method: "POST",
            body: JSON.stringify({ firstName, lastName, email, mobile, designation, gender, course, profilePic: profilePicBuf }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json()).then((body) => {
            if (!body.success) {
                return;
            }
            props.getEmployeeData();
            props.setIsSuccessfullEmployeeCreationAlertShown(true);
            props.handleClose();
        });

    }

    return <Dialog open={props.open} onClose={props.handleClose} >
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
            <form>
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
                                onChange={(e) => { setDesignation(e.target.value) }}
                                value={designation}
                            >
                                <MenuItem value="HR">HR</MenuItem>
                                <MenuItem value="MANAGER">Manager</MenuItem>
                                <MenuItem value="SALES">Sales</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <FormControl fullWidth>
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
                            <Input sx={{
                                position: "absolute",
                                opacity: 0,
                            }} type="file" inputProps={{ style: { cursor: "pointer" } }} onChange={(e) => { setProfilePic((e.target as HTMLInputElement).files?.[0]) }}></Input>
                        </Button>
                        <Typography variant="caption" color="warning">Image size should be less than 50kB</Typography>
                    </Box>
                    <Button type="submit" variant="contained" onClick={handleCreateEmployee}>Create</Button>
                </Stack>
            </form>
        </DialogContent>
    </Dialog>
}