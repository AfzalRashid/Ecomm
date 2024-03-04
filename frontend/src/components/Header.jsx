import {Nav, Container, Navbar, Badge, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

export default function Header() {

    const {cartItems} = useSelector(function(state) {
        return state.cart
    })
    const {userInfo} = useSelector(function(state) {
        return state.auth
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

// We can give any name to the output of useLogoutMutation i.e. logoutAPICall
    const [logoutAPICall] = useLogoutMutation()

    const logoutHandler = async ()=>{
        try {
        await logoutAPICall()
        dispatch(logout())
        navigate('/login')
        } catch (err) {
            console.log(err)
        }
    }

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
        {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
                <NavDropdown.Item>
                <Link to='/profile'>
                Profile
                </Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        ):(<Nav.Link as={Link} to='/login'><FaUser/>Singn In</Nav.Link>)}
    </Nav>
    </Container>
    </Navbar>
    
    </header>
}