import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Breadcrumb, Button } from 'react-bootstrap'
import Rating from './Rating'
import "../styles/Cards.css"


const ProductSimpleCard = ({ product }) => {
    return (
        <Link to={`/product/${product.pID}`} className="linkBox">
            <div className="mb-5 productSimpleCard">
                <Image className="px-2" style={{ width: "100%", height: "200px", objectFit: "contain" }}
                    src={product.images && product.images[0] ? "https://www.coastairbrush.com/" + product.images[0].imageSrc
                        : "/images/sample.jpg"}
                />
                <p className="text-center mt-4 text-danger">
                    {product.pName}
                </p>
                <div className="overlay">
                    <Button className="middle">See More</Button>
                </div>
            </div>
        </Link>
    )
}

export default ProductSimpleCard
