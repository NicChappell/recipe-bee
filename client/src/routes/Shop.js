// import dependencies
import React from 'react'

// // import files
// import longSleeveTShirt from '../images/merch/logo-solid-colors/long-sleeve-t-shirt/file-name-goes-here.png'
// import premiumTShirt from '../images/merch/logo-solid-colors/premium-t-shirt/file-name-goes-here.png'
// import pulloverHoodie from '../images/merch/logo-solid-colors/pullover-hoodie/file-name-goes-here.png'
// import raglan from '../images/merch/logo-solid-colors/raglan/file-name-goes-here.png'
// import standardTShirt from '../images/merch/logo-solid-colors/standard-t-shirt/file-name-goes-here.png'
// import sweatshirt from '../images/merch/logo-solid-colors/sweatshirt/file-name-goes-here.png'
// import tankTop from '../images/merch/logo-solid-colors/tank-top/file-name-goes-here.png'
// import vNeckTShirt from '../images/merch/logo-solid-colors/v-neck-t-shirt/file-name-goes-here.png'

// const products = {
//     logoSolidColors: {
//         longSleeveTShirt: {

//         },
//         premiumTShirt: {

//         },
//         pulloverHoodie: {

//         },
//         raglan: {

//         },
//         standardTShirt: {

//         },
//         sweatshirt: {

//         },
//         tankTop: {

//         },
//         vNeckTShirt: {

//         }
//     },
//     logoVintageDistressed: {

//     }
// }

const Thumbnail = () => {
    const handleClick = e => {
        // destructure event
        const { name } = e.target

        console.log(`clicked ${name} thumbnail`)
    }

    return (
        <img
            alt=""
            className="thumbnail"
            name="imported-file-name-goes-here.png"
            onClick={handleClick}
            src="https://via.placeholder.com/400x300"
        />
    )
}

const Card = () => {
    return (
        <div className="card">
            <div className="card-image">
                <img src="https://via.placeholder.com/400x300" alt="" />
                <span className="card-title">RecipeBee Logo [APPAREL_TYPE]</span>
            </div>
            <div className="card-content">
                <p>
                    Price:
                    <span className="strike">$19.99</span>
                    <span className="sale">$14.99</span>
                    <div className="discount">
                        <i className="right material-icons">loyalty</i>
                        20% OFF
                    </div>
                </p>
                <p>Colors:</p>
                <div className="gallery">
                    <Thumbnail />
                    <Thumbnail />
                    <Thumbnail />
                    <Thumbnail />
                    <Thumbnail />
                </div>
                <p>Styles:</p>
                <ul>
                    <li>
                        Solid Colors
                    </li>
                    <li>
                        Vintage Distressed
                    </li>
                </ul>
            </div>
            <div className="card-action">
                <a className="btn-flat amber lighten-2 black-text" href="#">Buy on Amazon</a>
            </div>
        </div>
    )
}

const Shop = () => {
    return (
        <div className="container" id="shop">
            <div className="row">
                <div className="col s12 m6 l4">
                    <Card />
                </div>
                <div className="col s12 m6 l4">
                    <Card />
                </div>
                <div className="col s12 m6 l4">
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default Shop
