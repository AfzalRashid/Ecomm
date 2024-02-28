import {Nav, Container, Navbar, Badge} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function Header() {

    const {cartItems} = useSelector(function(state) {
        return state.cart
    })

    return <header>
    <Navbar bg="secondary" expand="md" variant="dark" >
    <Container>
    <Navbar.Brand as={Link} to='/'>FR commerce</Navbar.Brand>
    <Nav className='ms-auto'>
        <Nav.Link as={Link} to='/cart'>
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <FaShoppingCart/>{  cartItems.length > 0 &&
        <Badge bg='danger' pill style={{ position: 'absolute', top: '-6px', right: '-6px', fontSize: '0.7rem', padding: '4px' }}>
            {cartItems.reduce((a,c) => a + c.qty, 0)} 
            </Badge>}
            </div>
            Cart
            </Nav.Link>
        <Nav.Link as={Link} to='/login'><FaUser/>Singn In</Nav.Link>
    </Nav>
    </Container>
    </Navbar>
    
    </header>
}