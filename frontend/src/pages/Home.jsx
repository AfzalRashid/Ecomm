import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product"
import { useGetProductsQuery } from "../slices/productApiSlice"
import Message from "../components/Message"


export default function Home() {
const {data : products, isLoading, error} = useGetProductsQuery()
    return <>
    {isLoading ? 
    <h2>Loading ..</h2> : 
    error ? <Message variant="danger">{error?.data?.message || error.error}</Message> : 
    <Row>
           {products.map(function (product) {
            return <Col sm="12" md="6" lg="4" key={product._id}><Product product={product} /></Col>
            }
            )}
        </Row>
    }
    </>
}