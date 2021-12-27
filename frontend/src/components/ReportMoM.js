import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { toUSD } from '../common'
import { UserContext } from '../contexts/UserContext'
import Message from './Message'

const ReportMoM = () => {

    const user = useContext(UserContext)
    const [startString, setStartString] = useState("")
    const [error, setError] = useState("")
    const [report, setReport] = useState({})

    // Mutation: Get MoM Report 
    const { mutate, isLoading, reset } = useMutation(data => {
        console.log(data)
        return axios.post(`/api/reports/mom`, data, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            console.log(data.data)
            const raw = data.data
            setReport({ ...raw })
            setError("")
            reset()
        },
        onError: (error) => {
            setError(error.response && error.response.data.message
                ? error.response.data.message : error.message)
        }
    })

    // Handlers
    const sumbitHandler = (e) => {
        e.preventDefault()
        mutate({ startString })
    }


    return (
        <div>
            <Form>
                <Form.Row className="mb-5 justify-content-center" >
                    <Col xs={{ span: 3 }} className="text-left mt-3">
                        <h4>Month Over Month:</h4>
                    </Col>

                    <Col xs={{ span: 3 }} className="text-center">
                        <Form.Control
                            type={"date"}
                            value={startString}
                            onChange={(e) => setStartString(e.target.value)}
                        >
                        </Form.Control>
                        Start: (First Day of the Month)
                    </Col>
                    <Col xs={{ span: 3 }} >
                        <Button block style={{ paddingBottom: "8px" }}
                            disabled={!startString || isLoading}
                            onClick={sumbitHandler} >
                            {isLoading ? "Loading" : "Go"}
                        </Button>
                    </Col>
                </Form.Row>
            </Form>

            {error && <Message variant="danger">{error}</Message>}
            <Row className="my-5 justify-content-center">
                <Col xs="auto" className="my-auto">
                    <h5>Previous:</h5>
                </Col>
                <Col xs="auto" className="text-center">
                    <h3>{toUSD(report.prevTotals)}</h3>
                </Col>
            </Row>

            <Row className="my-5 justify-content-center">
                <Col xs="auto" className="my-auto">
                    <h5>Selected:</h5>
                </Col>
                <Col xs="auto" className="text-center">
                    <h3>{toUSD(report.selectedTotals)}</h3>
                </Col>
            </Row>


        </div >
    )
}

export default ReportMoM
