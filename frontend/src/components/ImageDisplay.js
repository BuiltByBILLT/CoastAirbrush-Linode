import React, { useState, useEffect } from 'react'
import { Image, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


const ImageDisplay = ({ product }) => {

    var images = product.images
    var thumbs = [images[0]]
    var bigs = [images[0]]
    images.sort((a, b) => {
        if (a.imageNumber < b.imageNumber) return -1
        if (a.imageNumber > b.imageNumber) return 1
        if (a.imageType < b.imageType) return -1
        if (a.imageType > b.imageType) return 1
    })

    for (var i = 1; i < images.length; i++) {
        if (images[i].imageNumber == thumbs[thumbs.length - 1].imageNumber) {
            bigs.pop()
            bigs.push(images[i])
            continue;
        }
        else {
            thumbs.push(images[i])
            bigs.push(images[i])
        }
    }

    const [selected, setSelected] = useState(0)

    useEffect(() => {

    }, [])


    if (product.images.length === 0) {
        return (
            <Image src={"/images/sample.jpg"} alt={product.pName} style={{ width: "100%", objectFit: "contain" }} />
        )
    }
    return (
        <>
            <Image src={"https://www.coastairbrush.com/" + bigs[selected].imageSrc} alt={product.pName}
                style={{ width: "100%", objectFit: "contain" }}
            />
            <Row className="my-5 justify-content-center" >
                {thumbs.map((thumb, index) => (
                    <Col key={index} xs="auto"
                    // className={selected == index && "border border-danger"}
                    >
                        <Image src={"https://www.coastairbrush.com/" + thumb.imageSrc} alt={product.pName}
                            style={{ height: "75px", textAlign: "center" }}
                            onClick={() => setSelected(index)}
                        />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default ImageDisplay