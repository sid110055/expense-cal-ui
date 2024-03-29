import {Typography} from "@mui/material";
import React from "react";
import Header from "./header";

function Footer(){
    return (
        <footer className="footer">
            <Typography variant="body2" align="center">&copy; 2024 Expense Tracker. All rights reserved.</Typography>
        </footer>
    );
}

export default Footer;