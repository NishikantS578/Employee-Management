import { Container, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { appContext } from "../context/AppContext";
import { useNavigate } from "react-router";

export default function Home() {
    const context = useContext(appContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (context.isLoggedIn == false) {
            navigate("/login");
            return;
        }
    }, []);

    return <Container>
        <Typography variant="h5" textAlign={"center"} padding={8}>Dashboard</Typography>
        <Typography variant="h4" textAlign={"center"}>Welcome {context.userName}</Typography>
        <Typography variant="h4" textAlign={"center"} paddingTop={8} paddingBottom={4}>
            Streamline Your Workforce with Ease
        </Typography>
        <Typography variant="body1" textAlign={"center"}>
            Effortlessly manage employee data, track performance, and simplify HR processes with our user-friendly system.
        </Typography>
    </Container>
}