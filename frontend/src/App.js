// import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css'
import WebFont from "webfontloader";
import React from "react";
import Footer from './component/layout/Footer/Footer'
import Home from './component/Home/Home.js'
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from './component/Product/Search.js'
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import {loadUser} from "./actions/userAction";
// import UserOptions from "./component/layout/Header/UserOptions";
import {useSelector} from "react-redux";
import Profile from "./component/User/Profile";
// import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from './component/Cart/Cart'
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";



function App() {

    React.useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans"]
            }
        })
        // To make sure that user remains in the chrome store after login
        store.dispatch(loadUser())
    }, [])
    const { isAuthenticated,user } = useSelector(state => state.user);

    let userRole;
    if(user)
    userRole = user.role;
    return (
        <Router>


            {/* <Header  /> */}

            <Routes>
                {/*// Agar koi login ho tohi usse <UserOptions/> dikhao*/}
                {/*{isAuthenticated &&*/}
                {/*    <Route element={<UserOptions user={user}/>}/>*/}
                {/*}*/}
                <Route exact path="/" element={<Home />}  />

                {/* To get the value of id in <ProductDetails/> use const {id} = useParams() */}
                <Route exact path="product/:id" element={<ProductDetails />} />
                <Route exact path="products" element={<Products />} page="home"/>
                <Route path="products/product/:id" element={<ProductDetails />} page="home"/>
                <Route exact path="/search" element={<Search />} />
                <Route exact path="/login" element={<LoginSignUp />} />
                {
                    isAuthenticated && <Route exact path='/account' element={<Profile/>} />
                }
                {
                    isAuthenticated && <Route exact path='/me/updateProfile' element={<UpdateProfile/>} />
                }
                {
                    isAuthenticated && <Route exact path='/password/update' element={<UpdatePassword/>} />
                }
                {
                    isAuthenticated && <Route exact path='/password/forgot' element={<ForgotPassword/>} />
                }
                {
                    isAuthenticated && <Route exact path='/password/reset:token' element={<ResetPassword/>} />
                }
                {
                    isAuthenticated && <Route exact path='/cart' element={<Cart/>} />
                }
                {
                    isAuthenticated && <Route exact path='/shipping' element={<Shipping/>} />
                }
                {
                    isAuthenticated && <Route exact path='/process/payment' element={<Payment/>} />
                }
                {
                    isAuthenticated && <Route exact path='/success' element={<OrderSuccess/>} />
                }
                {
                    isAuthenticated && <Route exact path='/orders' element={<MyOrders/>} />
                }

                {
                    isAuthenticated && <Route exact path='/orders/confirm' element={<ConfirmOrder/>} />
                }

                {
                    isAuthenticated && <Route exact path='/order/:orderId' element={<OrderDetails/>} />
                }
                {
                    userRole === 'admin' && <Route path="/dashboardAdmin/" element={<Dashboard/>}/>
                }
                {
                    userRole === 'admin' && <Route path="/productListAdmin" element={<ProductList/>}/>
                }
                {
                    userRole === 'admin' && <Route path="/CreateProductAdmin" element={<NewProduct/>}/>
                }
                {
                    userRole === 'admin' && <Route path="/UpdateProductAdmin/:id" element={<UpdateProduct/>}/>
                }
                {
                    userRole === 'admin' && <Route path="/ordersAdmin" element={<OrderList/>}/>
                }
                {
                    userRole === 'admin' && <Route path="/updateOrderAdmin/:id" element={<ProcessOrder/>}/>
                }
                {
                    userRole === 'admin' && <Route path="/usersAdmin" element={<UsersList/>}/>
                }
                {
                    userRole === 'admin' && <Route path="/editUserAdmin/:id" element={<UpdateUser/>}/>
                }
                {
                    userRole === 'admin' && <Route path="/reviewsAdmin/" element={<ProductReviews/>}/>
                }





            </Routes>



            <Footer />
        </Router>
    );
}

export default App;
