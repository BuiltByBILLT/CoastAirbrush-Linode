import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
    return (
        <Container>
            <Row className='justify-content-lg-center'>
                <Col xs={12} lg={6}>
                    {children}
                </Col>

            </Row>
        </Container>
    )
}


export default FormContainer