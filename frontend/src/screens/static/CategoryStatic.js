import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import "../../styles/Static.css"

const CategoryStatic = () => {
    return (
        <Container className="my-5 py-3">
            <h2 className="text-danger pl-0">All Tools</h2>
            <Row className="">
                {[
                    { name: "3D Paintable Items", url: "607", image: "/images/LWoKbo.png" },
                    { name: "Airbrushes", url: "20", image: "/images/airbrush.png" },
                    { name: "Airbrush Parts", url: "22", image: "/images/sFQu2G.png" },
                    { name: "Airbrush Starter Sets", url: "383", image: "/images/QijSk1.tif.png" },
                    { name: "Airbrush Tanning", url: "607", image: "/images/4uYdgx.png" },
                    { name: "Apparel / Banners", url: "20", image: "/images/Clothes.png" },
                    { name: "Automobile Painting Supplies", url: "20", image: "/images/Automobile.png" },
                    { name: "Bottles / Hoses Quick Disconnects", url: "383", image: "/images/9agZHy.tif.png" },
                    { name: "Coast Airbrush Paint Kits", url: "607", image: "/images/TiHAv0.tif.png" },
                    { name: "Compressors / CO2 Tanks", url: "20", image: "/images/MkZQIh.tif.png" },
                    { name: "Easels / Shirt Boards", url: "383", image: "/images/2J8TcK.png" },
                    { name: "Fine Arts / T Shirt & Cancas Supplies", url: "22", image: "/images/FineArts.png" },
                    { name: "Leafing Supplies", url: "607", image: "/images/Foil.png" },
                    { name: "Makeup / Tanning Supplies & Kits", url: "20", image: "/images/FFWSQA.png" },
                    { name: "Manifolds Adapters Regulators Holders Cleaning Kits", url: "22", image: "/images/78yAuO.png" },
                    { name: "Masking / Stenciling Cutting Supplies", url: "383", image: "/images/UHn5Mk.png" },
                    { name: "Metal Panels", url: "607", image: "/images/8gw2IY.tif.png" },
                    { name: "Paint / Flakes", url: "20", image: "/images/Paint.png" },
                    { name: "Pinstriping & Lettering Supplies", url: "22", image: "/images/Pinstripe.png" },
                    { name: "Plotters / Vinyl & Clip Art", url: "383", image: "/images/Pgf5yx.png" },
                    { name: "Projectors / Light Boxes", url: "607", image: "/images/hsUXPI.tif.png" },
                    { name: "Spray Botths / Filters", url: "20", image: "/images/Spray_Booths.png" },
                    { name: "Spray Guns", url: "22", image: "/images/Spray_Guns.png" },
                    { name: "Templates & Stencils", url: "383", image: "/images/3Mpfa3.tif.png" },
                ].map(card => (
                    <Col key={card.name} xs='6' lg='3' className='p-4 my-5'>
                        <Link to={`/category/${card.url}`} className="linkBox" >
                            <Image
                                className="mx-auto px-2"
                                style={{ width: "100%", height: "200px", objectFit: "contain" }}
                                src={card.image}
                            />
                            <h5 className="redTextHover text-center my-4">{card.name}</h5>
                        </Link>
                    </Col>
                ))}
            </Row>
            <h2 className="text-danger pl-0 pt-5 mt-5">Other</h2>
            <Row className="">
                {[
                    { name: "Books & Magazines", url: "607", image: "/images/ADll3n.png" },
                    { name: "Classes & Workshops", url: "20", image: "/images/Classes_Workshops.png" },
                    { name: "Training Videos / DVD's", url: "22", image: "/images/IrfgYy.tif.png" },
                    { name: "Gift Certificates", url: "383", image: "/images/Tshirts.png" },
                    { name: "Repairs", url: "22", image: "/images/Gift_card.png" },
                    { name: "Specials & Discounts", url: "383", image: "/images/Special_Offer.png" },
                ].map(card => (
                    <Col key={card.name} xs='6' lg='3' className='p-4 my-5'>
                        <Link to={`/category/${card.url}`} className="linkBox" >
                            <Image
                                className="mx-auto px-2"
                                style={{ width: "100%", height: "200px", objectFit: "contain" }}
                                src={card.image}
                            />
                            <h5 className="redTextHover text-center my-4">{card.name}</h5>
                        </Link>
                    </Col>
                ))}
            </Row>

        </Container>
    )
}

export default CategoryStatic