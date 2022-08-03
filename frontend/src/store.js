import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    deleteProductReducer,
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReducer, productReviewsReducer
} from './reducers/productReducer'
import {
    userReducer,
    profileReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailReducer
} from './reducers/userReducer'
import {cartReducer} from "./reducers/cartReducer";
import {
    adminOrderReducer,
    allOrders,
    myOrderReducer,
    newOrderReducer,
    orderDetailReducer
} from "./reducers/orderReducer";

const reducer = combineReducers({
    // This name will be displays in Redux in chrome 
    // This is th state name
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
    orderDetail: orderDetailReducer,
    newReview: newReviewReducer,
    allOrders: allOrders,
    allUsers: allUsersReducer,
    newProduct:newProductReducer,
    deleteProduct:deleteProductReducer,
    adminOrders:adminOrderReducer,
    userDetails:userDetailReducer,
    productReviews:productReviewsReducer,
})
let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
























































































