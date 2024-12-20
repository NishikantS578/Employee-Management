import { useContext, useState } from "react"
import { appContext } from "../context/AppContext"
import { useNavigate } from "react-router";
import { Box, Button, Container, FormLabel, Paper, Stack, TextField, Typography } from "@mui/material";
import { AppRegistrationRounded, LoginRounded, LoginTwoTone, PersonPin } from "@mui/icons-material";

export default function Login() {
    const context = useContext(appContext);
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    const handleLogin = () => {
        context.isLoggedIn = true;
        context.userName = userName;
        localStorage.setItem("l", "T");
        navigate(-1);
    };

    return <Container sx={{ p: 4, display: "flex", alignItems: "center", justifyContent: "center", height: "75vh" }}>
        <Paper sx={{ p: 4, maxWidth: 400 }}>
            <form>
                <Stack gap={2}>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <PersonPin sx={{ height: "50px", width: "50px" }}></PersonPin>
                    </Box>
                    <Typography>Login</Typography>
                    <TextField autoComplete="username" size="small" placeholder="Username" label="Username" value={userName} onChange={(e) => setUserName(e.target.value)}></TextField>

                    <TextField type="password" autoComplete="new-password" size="small" placeholder="Password" label="Password"></TextField>

                    <Button variant="contained" onClick={handleLogin}>Login</Button>
                </Stack>
            </form>
        </Paper>
    </Container>
}