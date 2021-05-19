import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart


    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
        return () => { }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        history.push('/login?redirect?=shipping')
    }

    return (
        <Row>
            <Col lg={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your Cart is empty <Link to="/"> Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col lg={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col lg={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col lg={2}>${item.price}</Col>
                                    <Col lg={2}>
                                        <Form.Control className='form-select' as='select' value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, e.target.value))}
                                        >
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col lg={2}>
                                        <Button type='button' variant='light' onClick={
                                            () => removeFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash' />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col lg={4}>
                <Card>
                    <ListGroup>
                        <ListGroupItem>
                            <h2>Subtotal ({cartItems.reduce((acc, curr) => acc + Number(curr.qty), 0)}) Items</h2>
                            ${cartItems
                                .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
                                .toFixed(2)}
                        </ListGroupItem>
                        <ListGroupItem className='d-grid gap-2'>
                            <Button type='button' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>

        </Row>
    )
}

export default CartScreen