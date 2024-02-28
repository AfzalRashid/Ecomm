import {useParams, useNavigate} from 'react-router-dom'
import {Form,Row, Col, ListGroup, ListGroupItem, Container, Image, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useGetProductDetailsQuery } from '../slices/productApiSlice'
import { useState } from 'react'
import { addToCart } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'

export default function PDP() {
const {id:productId} = useParams()
const {data: product, isLoading, error} = useGetProductDetailsQuery(productId)
const [qty,setQty] = useState(1)
const dispatch = useDispatch()
const navigate= useNavigate()

const addToCartHandler = function () {
    dispatch(addToCart({...product, qty}))
    navigate('/cart')
}

return <> {isLoading ? (
    <h2>Loading...</h2>) : error ? (
        <div>{error?.data?.message || error.error}</div>
    ) : 
(<Row>
<Col md={5}><Image src={product.image} fluid/></Col>
<Col md={4}><ListGroup variant='flush'>
    <ListGroupItem>{product.name}</ListGroupItem>
    <ListGroupItem><Rating value={product.rating} text={product.numReviews}></Rating></ListGroupItem>
    <ListGroupItem as='h3'>$ {product.price}</ListGroupItem>
</ListGroup>
</Col>
<Col>
<Card>
    <ListGroup variant='flush'>
        <ListGroupItem>{product.description}</ListGroupItem>
        { product.countInStock >0 &&
        <ListGroupItem><Row>
            <Col>Qty</Col>
            <Col>
            <Form.Control
            as='select'
            value= {qty}
            onChange={function(e) {setQty(Number(e.target.value))}}
            >
               {[...Array(product.countInStock).keys()].map(function(x){
                    return <option key={x+1} value={x+1}>{x+1}</option>
                }) }
            </Form.Control>
            </Col>
        </Row></ListGroupItem>
}
        <ListGroupItem>
            <Button variant='secondary'
            onClick = {addToCartHandler}>
                Add To Cart
            </Button>
        </ListGroupItem>
    </ListGroup>
</Card>
</Col>
</Row>)}
</>
}