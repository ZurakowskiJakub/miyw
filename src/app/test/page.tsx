import { TestComponent } from "@/components/TestComponent";
import { Container, Typography } from "@mui/material";

export default function Home() {
    return (
        <Container>
            <Typography variant="h4">Testing...</Typography>
            <TestComponent />
        </Container>
    );
}
