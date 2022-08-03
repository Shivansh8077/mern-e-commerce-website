import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/all";
import "./Home.css";
import MetaData from '../layout/MetaData';
import ProductCard from './ProductCard';
import { clearErrors, getProduct } from '../../actions/productAction'
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import Header from '../layout/Header/Header';
import store from "../../store";
import {loadUser} from "../../actions/userAction";
import {Route} from "react-router-dom";
import UserOptions from "../layout/Header/UserOptions";

const Home = () => {
  
  const alert = useAlert();
  const dispatch = useDispatch();
  
  // You Created a state 'products' out of 'n' no. of ot  r states you created
  // To access data from let's say the 'products' state use the below code 
  const { loading, products, error, productsCount } = useSelector((state) => state.products)
  
  useEffect(() => {
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors)
    }
    dispatch(getProduct())

    // To make sure that user remains in the chrome store after login
    store.dispatch(loadUser())
  }, [dispatch, error, alert]) //every time stste changes call getProduct()

  const { isAuthenticated,user } = useSelector(state => state.user);


  return (

    <Fragment>
      <Header page='Home'/>
      {/*// Agar koi login ho tohi usse <UserOptions/> dikhao*/}
      {isAuthenticated &&
          <UserOptions user={user}/>
      }
      {/* If products are still loading display any placeholder */}
      {loading ? <Loader /> :
        <Fragment>

          <MetaData title="Ecommerce" /> {/* Page Title */}

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href='#container'>
              <button>
                Scroll <CgMouse />
              </button>
            </a>
            <h2 className="homeHeading">Featured {productsCount} Products</h2>
            <div id="container" className="container">
              {products && products.map(function (product) {
                return <ProductCard product={product} key={product._id} />
              })}

            </div>

          </div>
        </Fragment>}
    </Fragment>
  )

}

export default Home