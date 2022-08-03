import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import ProductCard from '../Home/ProductCard';
import { clearErrors, getProduct } from '../../actions/productAction'
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader/Loader'
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination'
import MetaData from '../layout/MetaData';
import Header from '../layout/Header/Header';
import { Slider } from "@mui/material";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";


const categories = [
    "Laotop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];
const Products = () => {
    const alert = useAlert();


    const paramsObj = useParams(); //object
    const keyword = paramsObj.keyword; //fetch the required from the obj

    const [currentPage, setcurrentPage] = useState(1)
    function setCurrentPageNo(e) {
        setcurrentPage(e)
    }

    const [price, setPrice] = useState([0, 25000])
    function priceHandler(e, newPrice) {
        setPrice(newPrice)
    }

    const [category, setCategory] = useState("")

    const dispatch = useDispatch();

    const [ratings, setRatings] = useState(0)

    // Getting values from Redux Store
    const { loading, products,
        error, productsCount, resultPerPage,
        filteredProductsCount
    } = useSelector((state) => state.products)

    useEffect(() => { //This useEffect will run before any other code
        if (error) {
            alert.error(error);
            dispatch(clearErrors)
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, error, keyword, alert, currentPage, price, category, ratings])

    let count = filteredProductsCount;

    return (
        <Fragment >
            <Header page='Products' />
            <MetaData title="Products" /> {/* Page Title */}
            {
                loading ? <Loader /> :
                    <Fragment >
                        <MetaData title='Products'/>
                        <div className="products">
                            <div style={{ display: "block", width: "100%" }}>
                                <h2 className="productsHeading">Products</h2>
                            </div>
                            {
                                products.length === 0 ?
                                    (
                                        <span className="products">No Products Found</span>
                                    ) : (

                                        products &&  // If there are products 
                                        products.map(function (product) {
                                            return <ProductCard key={product._id} product={product} />
                                        })
                                    )
                            }
                        </div>
                        <div className="filterBox whiteText">
                            <Typography >  Price </Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby='range-slider'
                                min={0}
                                max={99000}
                            />
                            <div>
                                <Typography display='inline'> Categories </Typography>
                                <button className='btn btn-danger btn-sm' onClick={() => {
                                    setCategory("")
                                }}>Remove Filter</button>

                            </div>
                            <ul className="categoryBox whiteText">
                                {
                                    categories.map(function (category) {
                                        return <li className="category-link"
                                            key={category}
                                            onClick={() => setCategory(category)}
                                        >
                                            {category}
                                        </li>
                                    })
                                }
                            </ul>
                            <fieldset>
                                <Typography component='legend'>Ratings Above</Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newratings) => {
                                        setRatings(newratings)
                                    }}
                                    aria-labelledby='continous-slider'
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}
                                />

                            </fieldset>


                        </div>


                        {
                            resultPerPage <= count &&
                            (
                                <div className="paginationBox">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        // totalItemsCount={count}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText="Next"
                                        prevPageText="Prev"
                                        firstPageText="1st"
                                        lastPageText="Last"
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activeClass="pageItemActive"
                                        activeLinkClass="pageLinkActive"
                                    />
                                </div>
                            )}
                    </Fragment>
            }

        </Fragment>

    )
}

export default Products