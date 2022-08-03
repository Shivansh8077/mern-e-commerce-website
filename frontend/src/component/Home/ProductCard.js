import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import MetaData from '../layout/MetaData'


const ProductCard = ({ product }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf: true
    }
    return (<Fragment>
        {/* <MetaData title={product.name} /> */}
        {/*  The attribute to below is the link of that perticular item */}
        <Link className='productCard' to={`product/${product._id}`}>
            {/* <Link className='productCard' to={`product/${product._id}`}> */}
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /><span style={{ marginTop: 8 }}>({product.numOfReviews})</span>
            </div>
            <p>${product.price}</p>
        </Link>
    </Fragment>
    )
}

export default ProductCard