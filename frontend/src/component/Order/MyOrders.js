import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    const coloumns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>                )
            }
        }
    ]
    console.log('orders',orders)
    const rows = []

    orders && orders.forEach(function (order) {
        rows.push({
            'id': order._id,
            'status':order.orderStatus,
            'itemsQty':order.orderItems.length,
            'amount':order.totalPrice,

            })
    })

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, alert, error]);

    return (
        <Fragment>
            <MetaData title={user.name} />
            {
                loading? (
                    <Loader />
                ):(
                    <div className="myOrdersPage">
                        <DataGrid columns={coloumns} rows={rows}
                                  pageSize={10} autoHeight={true} disableSelectionOnClick
                                  className="myOrdersTable" />
                        <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>

                    </div>
                )
            }
        </Fragment>

    );
};

export default MyOrders;
