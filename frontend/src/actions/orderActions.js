import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
} from '../constants/orderConstants'


export const getOrderDetails = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        // const { userLogin: { userInfo } } = getState()

        // const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }

        // const { data } = await axios.get(`/api/orders/${orderId}`, config)
        const { data } = await axios.get(`/api/orders/${orderId}`)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const listOrders = (token) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                // Authorization: `Bearer ${userInfo.token}`
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(`/api/orders`, config)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

// export const deliverOrder = (order) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: ORDER_DELIVER_REQUEST
//         })

//         const { userLogin: { userInfo } } = getState()

//         const config = {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }
//         const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)

//         dispatch({
//             type: ORDER_DELIVER_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: ORDER_DELIVER_FAIL,
//             payload: error.response && error.response.data.message
//                 ? error.response.data.message : error.message
//         })
//     }
// }