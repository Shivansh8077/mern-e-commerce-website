import React, {Fragment, useState} from 'react'
import './ProductDetails.css'
import Carousel from 'react-material-ui-carousel'
import { useSelector, useDispatch } from "react-redux";
import {clearErrors, getProductDetails, newReview} from '../../actions/productAction';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard'
import ReactStars from 'react-rating-stars-component'
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {

  // Alternate for match Match
  const { id } = useParams();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(state => state.productDetails)
  const { success, error: reviewError } = useSelector(
      (state) => state.newReview
  );
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors)
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id))
  }, [dispatch, id, alert, error,reviewError,success])

  const options = {
    edit: false,
    color:"grey",
    value: product.rating,
    readOnly: true,
    size: window.innerWidth < 600 ? 20:25,
    precision: 0.5,
    isHalf : true
  };




  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  function increaseQuantity(){
    if(product.Stock<=quantity)
      return;
    const qty = quantity +1;

    setQuantity(qty);
  }

  function decreaseQuantity(){
    if(quantity<=1)
      return;
    const qty = quantity -1;
    setQuantity(qty);
  }


  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myFormobj = {
      "rating"    : rating  ,
      "comment"   : comment ,
      "productId" : id      ,
    }
  console.log('myFormobj',myFormobj)

    dispatch(newReview(myFormobj));
    setOpen(false);
  };

  return (
      <Fragment>
        {
          loading? <Loader/>:
              <Fragment>
                <div className="ProductDetails">
                  <div>
                    <Carousel>
                      {product.images &&
                          product.images.map((item, i) => (
                              <img
                                  className="CarouselImage"
                                  key={i}
                                  src={item.url}
                                  alt={`${i} Slide`}
                              />
                          ))}
                    </Carousel>
                  </div>
                  <div>
                    <div className="detailsBlock-1">
                      <h2>{product.name}</h2>
                      <p>Product # {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
    
              <span className="detailsBlock-2-span">
                {" "}
                ({product.numOfReviews} Reviews)
              </span>
                      <span>
                <ReactStars {...options} />
              </span>
                    </div>
                    <div className="detailsBlock-3">
                      <h1>{`₹${product.price}`}</h1>
                      <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                          <button onClick={decreaseQuantity} >-</button>
                          <input  readOnly type="number"  value={quantity} />
                          <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button
                            disabled={product.Stock < 1 ? true : false}
                            onClick={addToCartHandler}
                        >
                          Add to Cart <span style={{fontWeight:"bolder"}}>{quantity}</span>
                        </button>
                      </div>

                      <p>
                        Status:
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                          {product.Stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                      </p>
                    </div>

                    <div className="detailsBlock-4">
                      Description : <p>{product.description}</p>
                    </div>

                    <button className="submitReview"  onClick={submitReviewToggle}>
                      Submit Review
                    </button>
                  </div>
                </div>

                <h3 className="reviewsHeading">REVIEWS</h3>


                {/*12.14.11*/}


                <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle} // click anywhere on the screen to close the dialog
                >
                  <DialogTitle>Submit Review</DialogTitle>
                  <DialogContent className="submitDialog">
                    <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                    />

                    <textarea
                        className="submitDialogTextArea"
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
                {/* If the array product.reviews has its 1st element that means that
        The arrays.map function can be aplledd on it */}
                {product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                      {
                        product.reviews.map(function(review){
                          return <ReviewCard review={review} />
                        })
                      }
                    </div>

                ) : (
                    <p className="noReviews">No Reviews Yet</p>
                )}
              </Fragment>
        }
      </Fragment>
  )
}

export default ProductDetails