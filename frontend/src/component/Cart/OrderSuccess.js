import React from 'react';
import {Typography} from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import './OrderSuccess.css'

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />

            <Typography>Your Order has been Placed successfully </Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    );
};

export default OrderSuccess;
