import { useContext, useState } from "react"
import { appContext } from "../context/AppContext"
import { useNavigate } from "react-router";
import { Button, Container, Paper, Stack, TextField } from "@mui/material";

export default function Login() {
    const context = useContext(appContext);
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    const handleLogin = () => {
        context.isLoggedIn = true;
        context.userName = userName;
        navigate(-1);
    };

    return <Container sx={{ p: 4, display: "flex", alignItems: "center", justifyContent: "center", height: "75vh" }}>
        <Paper sx={{ p: 4, maxWidth: 400 }}>
            <form>
                <Stack gap={2}>
                    <TextField autoComplete="username" size="small" placeholder="Username" label="Username" value={userName} onChange={(e) => setUserName(e.target.value)}></TextField>

                    <TextField type="password" autoComplete="new-password" size="small" placeholder="Password" label="Password"></TextField>

                    <Button variant="contained" onClick={handleLogin}>Login</Button>
                </Stack>
            </form>
        </Paper>
    </Container>
}