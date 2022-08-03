import React from 'react'
import profilePng from "../../images/Profile.png";
import ReactStars from 'react-rating-stars-component'


const ReviewCard = ({review}) => {

    const options = {
        edit: false,
        color:"white",
        value: review.rating,
        readOnly: true,
        size: window.innerWidth < 600 ? 20:25,
        precision: 0.5,
        isHalf : true
      };
  return (
<div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>  )
}

export default ReviewCard