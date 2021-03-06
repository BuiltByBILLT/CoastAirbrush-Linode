import axios from 'axios'
import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Container, Modal, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import ExampleDoc from '../assest/productdata.csv'
import { UserContext } from '../contexts/UserContext'
import MerchantUpload from '../components/MerchantUpload'


const UploadsScreen = () => {

    const [uploading, setUploading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [file, setFile] = useState("")
    const [merchant, setMerchant] = useState("")

    const user = useContext(UserContext)


    // Image Upload
    const uploadProductImageHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        setSuccess("")
        setError("")
        try {
            const { data } = await axios.post('/api/upload/prodimage', formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            setSuccess(data)
        } catch (error) {
            console.error(error)
            setError(error)
        }
        setUploading(false)
        // e.target.value = ""
    }


    return (
        <Container className="my-5 py-3">
            <h2 className="mb-5">Uploads</h2>
            <Modal show={uploading} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Uploading File...
                        <br /> Please do not close this window</Modal.Title>
                </Modal.Header>
                <Modal.Body> <Loader /> </Modal.Body>
            </Modal>

            <Form className="my-4">
                <Form.Group controlId='image'>
                    <Form.Label>Product Images:</Form.Label>
                    <Form.File id='image-file' label='No File Selected' custom
                        onChange={uploadProductImageHandler}>
                    </Form.File>
                    {uploading && <Loader />}
                </Form.Group>
                {success && `Successfully uploaded: prodimages/${success}`}
                {error && `error: ${error}`}
            </Form>




            <MerchantUpload />


        </Container>
    )
}

export default UploadsScreen
