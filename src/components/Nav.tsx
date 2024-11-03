import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export const Nav = () => {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography variant="h4" className="mr-2">
                    M.I.Y.W
                </Typography>
                <Button color="inherit">Home</Button>
                <Button color="inherit">AIT by Location</Button>
                <Button color="inherit">AIT by LOB</Button>
                <Button color="inherit">AIT by Datacenter</Button>
            </Toolbar>
        </AppBar>
    );
};
