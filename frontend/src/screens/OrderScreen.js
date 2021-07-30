import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => { setSdkReady(true) }
            document.body.appendChild(script)
        }

        if (!order || order._id !== orderId || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
        return () => { }
    }, [dispatch, history, userInfo, orderId, successPay, successDeliver, order])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    if (!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }


    return loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
            : (
                <>
                    <Row className="mt-5 mb-3">
                        <Col lg="auto">
                            <h3 className="text-danger text-break m-0">Order #{order._id}</h3>
                        </Col>
                        <Col className="mt-3 mt-lg-auto">
                            <p className="my-0">{order.createdAt.substring(0, 10)}</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={8}>
                            {order.orderItems.length === 0
                                ? <Message>Order is empty</Message>
                                : (
                                    <ListGroup className="mb-5">
                                        <ListGroup.Item className="mb-3 border-left-0 border-right-0 px-0">
                                            <Row>
                                                <Col xs={4} lg={3} className="mb-3 mb-lg-0 my-auto d-none d-lg-block">
                                                    <h6>Product</h6>
                                                </Col>
                                                <Col className="d-none d-lg-block my-auto">
                                                </Col>
                                                <Col xs={5} lg={2} className="text-center my-auto">
                                                    <h6>Price</h6>
                                                </Col>
                                                <Col xs={2} lg={1} className="text-center my-auto">
                                                    <h6>Qty</h6>
                                                </Col>
                                                <Col xs={5} lg={2} className="text-center my-auto">
                                                    <h6>Total</h6>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index} className="mb-3 border-0 px-0">
                                                <Row>
                                                    <Col xs={12} lg={3} className="mb-3 mb-lg-0">
                                                        <Image src={item.image} alt={item.name}
                                                            fluid rounded />
                                                    </Col>
                                                    <Col xs={12} lg={4} className="mb-2 my-lg-auto text-center text-lg-left">
                                                        <Link to={`/product/${item.product}`}
                                                            className=" text-danger" style={{ fontWeight: "bold" }}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col xs={5} lg={2} className="text-center my-auto">
                                                        ${item.price}
                                                    </Col>
                                                    <Col xs={2} lg={1} className="text-center my-auto border">
                                                        {item.qty}
                                                    </Col>
                                                    <Col xs={5} lg={2} className="text-center my-auto">
                                                        ${item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            <ListGroup>
                                <ListGroup.Item>
                                    <h4>Shipping</h4>
                                    <p>
                                        <strong>Name: </strong>{order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>
                                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                    </p>
                                    <p>
                                        <strong>Address: </strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}
                                        , {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered
                                        ? <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                        : <Message variant='danger'>Not Delivered</Message>
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h4>Payment Method</h4>
                                    <p>

                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid
                                        ? <Message variant='success'>Paid on {order.paidAt}</Message>
                                        : <Message variant='danger'>Not Paid</Message>
                                    }
                                </ListGroup.Item>

                            </ListGroup>

                        </Col>
                        <Col lg={4} className="pl-lg-5">
                            <Card>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <h4>Order Summary</h4>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>{formatter.format(order.itemsPrice)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>{formatter.format(order.shippingPrice)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>{formatter.format(order.taxPrice)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>{formatter.format(order.totalPrice)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {!sdkReady ? <Loader /> : (
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            )}
                                        </ListGroup.Item>
                                    )}
                                    {loadingDeliver && <Loader />}
                                    {userInfo && userInfo.isAdmin && !order.isDelivered && (
                                        <ListGroup.Item>
                                            <Button type='button' className='btn btn-block'
                                                onClick={deliverHandler}
                                                disabled={!order.isPaid}
                                            >
                                                Mark as Delivered
                                            </Button>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )

}

export default OrderScreen
