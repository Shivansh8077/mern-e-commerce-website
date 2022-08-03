import React from 'react';
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/orderConstants";

import axios from "axios";

//Create order
export  const createOrder = (order) =>
    async (dispatch,getState) => {
        try {
            dispatch({
                type:ORDER_DETAILS_REQUEST
            })
            let url = '/api/v1/order/new';
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            let { data } = await axios.post(url,order,config);

            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

        }catch (e) {
            dispatch({
                type:CLEAR_ERRORS,
                errorMessage:`Koi error hai - > ${e.message}`,
                payload: e.response.data.message
            })
        }
}

//My Orders
export const myOrders = (orders) => {
   return async (dispatch, getState) => {
        try {
            dispatch({
                type: MY_ORDERS_REQUEST
            })
            // The below url will fetch whatever response would be given to it
             let url = '/api/v1/orders/me';
             let {data} = await axios.get(url);


             dispatch({
                 type: MY_ORDERS_SUCCESS,
                 payload: data.orders
             })
        }catch (e) {
            dispatch({
                type:CLEAR_ERRORS,
                errorMessage:`Koi error hai - > ${e.message}`,
                payload: e.response.data.message
            })
        }
    }
}


// Order Details
export const getOrderDetails = (orderID) => {
 return   async (dispatch) => {
        try {


            dispatch({
                type: ORDER_DETAILS_REQUEST
            })
            let url = `/api/v1/order/${orderID}`
            let {data} = await axios.get(url);
            console.log('data',data)
            dispatch({
                type:ORDER_DETAILS_SUCCESS,
                payload: data.order
            })


        }catch (e) {
            dispatch({
                type:ORDER_DETAILS_FAIL,
                errorMessage:`Koi error hai - > ${e.message}`,
                payload: e.response.data.message
            })
        }
    }
}

// Get All Orders(admin)
export const getAllOrders = () =>{
    return async (dispatch)=>{
        try {

            dispatch({
                type:ALL_ORDERS_REQUEST
            })
            const { data } = await axios.get('api/v1/orders');
            // console.log('data',data)
            dispatch({
                type:ALL_ORDERS_SUCCESS,
                payload: data.orders
            })

        }catch (e) {
            dispatch({
                type:ALL_ORDERS_FAIL,
                errorMessage:`Koi error hai - > ${e.message}`,
                payload: e.response.data.message
            })
        }
    }
}

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
    console.log('reached update order')
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            `/api/v1/admin/updateOrder/${id}`,
            order,
            config
        );

        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/deleteOrder/${id}`);

        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};




































// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
