import Message from "../components/Message"
import { useSelector, useDispatch } from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {Row,Col, ListGroup, Image, Form, Button,Card, ListGroupItem} from "react-bootstrap"
import { addToCart,removeFromCart } from "../slices/cartSlice"
import {FaTrash} from "react-icons/fa"

export default function Cart(){
    const cart = useSelector((state)=>state.cart)
    const {cartItems, itemsPrice} = cart
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    return <>
    <Row>
    <Col md={8}>
        <h1 style={{marginBottom:"20px"}}>Shopping Cart</h1>
        {(cartItems.length === 0) ?
    <Message variant="success">
        Your Cart is empty, <Link to="/">Go Back</Link>
    </Message> :
     <ListGroup variant="flush">
        {cartItems.map((item)=>
            <ListGroup.Item key={item._id}>
            <Row>
                <Col md={2}>
                    <Image src={item.image} fluid rounded/>
                </Col>
                <Col md={3}>
                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                </Col>
                <Col md={2}>{item.price}</Col>
                <Col md={2}>
                <Form.Control
                    as='select'
                    value= {item.qty}
                    onChange= {async function(e){
                        dispatch(addToCart({...item, qty: Number(e.target.value)}))
                    }}
                    >
                    {[...Array(item.countInStock).keys()].map(function(x){
                            return <option key={x+1} value={x+1}>{x+1}</option>
                        }) }
            </Form.Control>
            </Col>
                <Col md={2}>
                    <Button type="button" variant="light"
                    onClick={async ()=>dispatch(removeFromCart(item._id))}
                    >
                        <FaTrash/>
                    </Button>
                </Col>
            </Row>
            </ListGroup.Item>
        )}
     </ListGroup> }
     </Col>
     <Col md={4}>
        <Card>
            <ListGroup>
                <ListGroup.Item>
                    <h2 style={{marginBottom:"10px"}}>Subtotal ({cartItems.reduce((a,c)=>a+c.qty,0)}) items</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    {itemsPrice.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button variant="secondary"
                    disabled ={cartItems.length === 0 ?true : false }
                    onClick={()=>navigate('/login?redirect=/shipping')}
                    >
                        Proceed to Checkout
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
     </Col>
     </Row>
     </>
}