import React, { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom";
const Search = () => {
    const navigate = useNavigate();
    const [keyword,setKeyword] = useState("");
    function searchSubmitHandler(e){
        e.preventDefault();
        if(keyword.trim()){
          navigate(`/products/${keyword}`)
        }else{
         navigate('/products')
        }
    }
    return (
        <Fragment>
            <form className="d-flex" onSubmit={searchSubmitHandler}>
                <input className="form-control me-2" type="search" 
                placeholder="Search a Product.." aria-label="Search" 
                onChange={function(e){
                    setKeyword(e.target.value)
                }}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </Fragment>
    )
}

export default Search