import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product({product}){
    return <Link to={`/products/${product._id}`}><Card className="my-3 p-3">
    <img src={product.image} alt="Not available" />
    <Card.Title>{product.name}</Card.Title>
    <Card.Text><Rating value={product.rating} text={product.numReviews}/></Card.Text>
    <Card.Text as='h3'>${product.price}</Card.Text>
    </Card></Link>
}