import { AITMap } from "@/components/AITMap";
import { Container, Typography } from "@mui/material";

export default function Home() {
    return (
        <Container>
            <Typography variant="h4">Dashboard / Home</Typography>
            <AITMap />
        </Container>
    );
}
