import React from "react";
import { CircularProgress, Box } from "@mui/material";

const CenteredLoadingSpinner = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw" bgcolor="gray.100">
            <CircularProgress color="primary" size={64} thickness={4} />
        </Box>
    );
};

export default CenteredLoadingSpinner;