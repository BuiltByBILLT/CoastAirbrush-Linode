import asyncHandler from 'express-async-handler'
import axios from 'axios'

// @desc Submit Clover Order
// @route POST /api/clover
// @access Public
const orderClover = asyncHandler(async (req, res) => {
    const { cart, userInfo, token } = req.body
    // await new Promise((res) => setTimeout(res, 3000))
    try {
        //Create Order
        const newOrder = await axios.post(
            process.env.CLOVER_URL + `/orders`,
            {
                // "note": "Shipping Required", // For Mark as Deliever
                "state": "Open",
                "orderType": { "id": process.env.ORDER_TYPE },
                "employee": {
                    "id": userInfo.employeeID ? userInfo.employeeID : process.env.WEBSITE
                }

            }, { headers: { "Authorization": `Bearer ${process.env.CLOVER_KEY}` } }
        )
        const orderID = newOrder.data.id

        // Add Bulk Line Items
        let bulkLineItems = { "items": [] }
        for (let cartItem of cart.cartItems) {
            for (let index = 0; index < cartItem.qty; index++) {
                let lineItem =
                {
                    "item": { "id": cartItem.cloverID },
                    "name": cartItem.name,
                    "alternateName": cartItem.image,
                    "note": cartItem.pID,
                    "price": cartItem.price,
                    "taxRates": [
                        {
                            "id": "HSKPV1YMDB9CA", //Has to match existing ID
                            "name": "", // doesnt matter
                            "rate": cart.shippingInfo.taxRate, // Manual Entry
                            "isDefault": false
                        }
                    ],
                }
                bulkLineItems.items.push(lineItem)
            }
        }
        // Add Shipping
        const { email, firstName, lastName, company, address, address2, city, country, region, postalCode, phone } = cart.shippingInfo
        const shippingLabel = { email, firstName, lastName, company, address, address2, city, country, region, postalCode, phone }
        bulkLineItems.items.push(
            {
                "item": { "id": process.env.SHIPPINGID },
                "name": "Website Shipping",
                "alternateName": `Shipping (${cart.shippingMethod.method})`,
                "price": cart.shippingMethod.price,
                "note": JSON.stringify(shippingLabel),
                "taxRates": [
                    {
                        "id": "FNC2N54SC3QXG", //Has to match existing ID
                        "name": "", // doesnt matter
                        "rate": 0, // Manual Entry
                        "isDefault": false
                    }
                ],
            })
        await axios.post(
            process.env.CLOVER_URL + `/orders/${orderID}/bulk_line_items`, bulkLineItems,
            { headers: { "Authorization": `Bearer ${process.env.CLOVER_KEY}` } }
        )

        // Attach Customer
        var customerID = userInfo && userInfo.customerID
        if (customerID) {
            // if (!userInfo || userInfo.employeeID || !userInfo.customerID) {
            //     //Create Customer
            //     const newCustomer = await axios.post(process.env.CLOVER_URL + `/customers`,
            //         {
            //             "emailAddresses": [
            //                 {
            //                     "emailAddress": cart.shippingInfo.email
            //                 }
            //             ],
            //             "firstName": cart.shippingInfo.firstName,
            //             "lastName": cart.shippingInfo.lastName
            //         }, { headers: { "Authorization": `Bearer ${process.env.CLOVER_KEY}` } }
            //     )
            //     customerID = newCustomer.data.id
            // }
            await axios.post(
                process.env.CLOVER_URL + `/orders/${orderID}`,
                { "customers": [{ "id": customerID }] },
                { headers: { "Authorization": `Bearer ${process.env.CLOVER_KEY}` } }
            )
        }


        // Add Discount
        //If userLogin = isStaff
        // if (userInfo && userInfo.isStaff == true) {
        if (cart.discount && cart.discount.discountType === "PRECENT") {
            await axios.post(
                process.env.CLOVER_URL + `/orders/${orderID}/discounts`,
                { percentage: Number(cart.discount.discountAmount), name: cart.discount.discountCode },
                { headers: { "Authorization": `Bearer ${process.env.CLOVER_KEY}` } }
            )
        }
        if (cart.discount && cart.discount.discountType === "FLAT") {
            await axios.post(
                process.env.CLOVER_URL + `/orders/${orderID}/discounts`,
                { amount: Number(cart.discount.discountAmount * -100), name: cart.discount.discountCode },
                { headers: { "Authorization": `Bearer ${process.env.CLOVER_KEY}` } }
            )
        }
        // } else {
        //     throw new Error("Discount not Authorized")
        // }

        //
        // Modifcation Later
        //

        //Pay for Order
        await axios.post(
            process.env.CLOVER_PAY_URL + `/orders/${orderID}/pay`,
            {
                "source": token,
                "email": cart.shippingInfo.email
            },
            { headers: { "Authorization": `Bearer ${process.env.CLOVER_KEY}` } }
        )


        //Final Call for All Info
        const { data } = await axios.get(
            process.env.CLOVER_URL + `/orders/${orderID}?expand=lineItems&expand=customers&expand=payments`,
            { headers: { "Authorization": `Bearer ${process.env.CLOVER_KEY}` } }
        )
        res.json(data)
    } catch (error) {
        if (error.response) {
            throw new Error(JSON.stringify(error.response.data))
        } else if (error.request) {
            throw new Error("Request Error")
        } else {
            throw new Error("Server Error: " + JSON.stringify(error))
        }
    }
})


// @desc Get Tax Rate from Address
// @route POST /api/clover/tax
// @access Public
const fetchTax = asyncHandler(async (req, res) => {
    const shippingInfo = req.body
    var taxRate
    // Logic
    if (shippingInfo.region == "CA" || shippingInfo.region == "California") {
        taxRate = 775000
    } else {
        taxRate = 0
    }
    res.json(taxRate)
})


// @desc Create a Refund
// @route POST /api/clover/refund
// @access Public
const refundClover = asyncHandler(async (req, res) => {
    const { amount, lineID, orderID } = req.body
    // await new Promise((res) => setTimeout(res, 3000))
    try {
        console.log("orderID", orderID)
        console.log("amount", amount)
        console.log("line", lineID)

        //Create Refund
        const { data } = await axios.post(
            process.env.CLOVER_PAY_URL + `/orders/${orderID}/returns`,
            {
                "items": [
                    {
                        "parent": lineID,
                        "type": "sku",
                        "amount": amount
                    }
                ]
            },
            { headers: { "Authorization": `Bearer ${process.env.CLOVER_KEY}` } }
        )

        console.log(JSON.stringify(data))
        res.json("success")

    } catch (error) {
        if (error.response) {
            throw new Error(JSON.stringify(error.response.data))
        } else if (error.request) {
            throw new Error("Request Error")
        } else {
            throw new Error("Server Error: " + JSON.stringify(error))
        }
    }
})





export {
    orderClover,
    fetchTax,
    refundClover
}