import React, { Fragment } from 'react'
// import { ReactNavbar } from "overlay-navbar"
// import logo from "../../../images/logo.png";
import Search from '../../Product/Search'
import { Link } from 'react-router-dom'

// const options = {
//     burgerColor: "white",
//     burgerColorHover: "#eb4034",
//     logo,
//     logoWidth: "20vmax",
//     navColor1: "grey",
//     navColor2:"white",
//     logoHoverSize: "10px",
//     logoHoverColor: "#eb4034",
//     link1Text: "Home",
//     link2Text: "Products",
//     link3Text: "Contact",
//     link4Text: "About",
//     link1Url: "/",
//     link2Url: "api/v1/products",
//     link3Url: "/contact",
//     link4Url: "/about",
//     link1Size: "1.3vmax",
//     link1Color: "rgba(35, 35, 35,0.8)",
//     nav1justifyContent: "flex-end",
//     nav2justifyContent: "flex-end",
//     nav3justifyContent: "flex-start",
//     nav4justifyContent: "flex-start",
//     link1ColorHover: "#eb4034",
//     link1Margin: "1vmax",
//     profileIconUrl: "/login",
//     profileIconColor: "rgba(35, 35, 35,0.8)",
//     searchIconColor: "rgba(35, 35, 35,0.8)",
//     cartIconColor: "rgba(35, 35, 35,0.8)",
//     profileIconColorHover: "#eb4034",
//     searchIconColorHover: "#eb4034",
//     cartIconColorHover: "#eb4034",
//     cartIconMargin: "1vmax",
//   };


const Header = ({ page }) => {
    // console.log('Header-js - Header Loaded')
    return (
        <>
            {/* <ReactNavbar {...options}/> */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Ecommerce</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/products' >Products</Link>
                            </li>
                        </ul>
                        <ul className='d-flex  navbar-nav'>

                           <li className='nav-item'>
                            <Link to='/login'>🤦‍♂️</Link></li> 
                        </ul>
                        {

                            page === "Products" ? <Search /> :
                                <Fragment />
                        }
                       

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header