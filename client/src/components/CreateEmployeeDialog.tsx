import { CheckBox, Person } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function CreateEmployeeDialog(props: { open: boolean, handleClose: { (): void } }) {
    const [designation, setDesignation] = useState("");

    return <Dialog open={props.open} onClose={props.handleClose} >
        <DialogTitle>Employee Details</DialogTitle>
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
                    <Button type="submit" variant="contained">Create</Button>
                </Stack>
            </form>
        </DialogContent>
    </Dialog>
}