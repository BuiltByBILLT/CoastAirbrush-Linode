import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_RESET,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_IMAGES_REQUEST,
    PRODUCT_UPDATE_IMAGES_SUCCESS,
    PRODUCT_UPDATE_IMAGES_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_SUGGESTED_REQUEST,
    PRODUCT_SUGGESTED_SUCCESS,
    PRODUCT_SUGGESTED_FAIL
} from '../constants/productConstants'

export const listProducts =
    (keyword = '', pageNumber = '', limit = '', sort = '', upDown = "", staff = false) => async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST })

            const { data } = await axios.get(
                `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&limit=${limit}&staff=${staff}&sort=${sort}&upDown=${upDown}`
            )

            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message : error.message
            })

        }
    }

export const resetProducts = () => async (dispatch) => { dispatch({ type: PRODUCT_LIST_RESET }) }

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/details/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })

    }
}

export const resetProductDetails = () => async (dispatch) => { dispatch({ type: PRODUCT_DETAILS_RESET }) }

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/products`, {}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/products/${product.cloverID}`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const updateImages = (images, pID) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_IMAGES_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/products/images/${pID}`, images, config)

        dispatch({
            type: PRODUCT_UPDATE_IMAGES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_IMAGES_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const { data } = await axios.get(`/api/products/top`)

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })

    }
}

export const getSuggestedProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_SUGGESTED_REQUEST })

        const { data } = await axios.get(`/api/products/suggested`)

        dispatch({
            type: PRODUCT_SUGGESTED_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_SUGGESTED_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })

    }
}


// export const createProductReview = (productId, review) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: PRODUCT_CREATE_REVIEW_REQUEST
//         })

//         const { userLogin: { userInfo } } = getState()
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }
//         await axios.post(`/api/products/${productId}/reviews`, review, config)

//         dispatch({
//             type: PRODUCT_CREATE_REVIEW_SUCCESS,
//         })

//     } catch (error) {
//         dispatch({
//             type: PRODUCT_CREATE_REVIEW_FAIL,
//             payload: error.response && error.response.data.message
//                 ? error.response.data.message : error.message
//         })
//     }
// }