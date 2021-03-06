import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Form, ListGroup, Modal, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { UserContext } from '../contexts/UserContext';
import Loader from './Loader';

const PoSearchModal = ({ show, setShow, merchantData, fillHandler }) => {

    const user = useContext(UserContext)
    const [inventoryList, setInventoryList] = useState([])
    const [search, setSearch] = useState("")



    // Close Modal and Reset
    const closeHandler = () => {
        setShow(false)
        setSearch("")
    }

    // Fill In Item
    const selectHandler = (parentNode) => {
        fillHandler(parentNode.children[0].innerHTML,
            parentNode.children[1].innerHTML,
            parentNode.children[2].innerHTML,
            parentNode.children[3].innerHTML)
        closeHandler()
    }

    useEffect(() => {
        // console.log(merchantData)
        if (merchantData && merchantData.data && merchantData.data.merchantItems) {
            setInventoryList(merchantData.data.merchantItems.
                filter(inv => inv.description.toLowerCase().includes(search.toLowerCase()) ||
                    inv.sku.toLowerCase().includes(search.toLowerCase())))
        }
    }, [merchantData, search])


    return (
        <Modal show={show} onHide={closeHandler} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Search for Inventory Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder="search" value={search}
                        onChange={(e) => setSearch(e.target.value)}>
                    </Form.Control>
                </Form>
                {<Table hover>
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>CloverID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryList.map(line => (
                            <tr key={line.sku} onClick={(e) => selectHandler(e.target.parentNode)} style={{ cursor: "pointer" }}>
                                <td className="p-2">{line.sku}</td>
                                <td className="p-2">{line.description}</td>
                                <td className="p-2">{line.price}</td>
                                <td className="p-2">{line.cloverID}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>}
            </Modal.Body>
        </Modal>
    );
};

export default PoSearchModal;
