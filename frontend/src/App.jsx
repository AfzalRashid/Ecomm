import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home"
import { Outlet } from "react-router-dom";
import { Container
 } from "react-bootstrap";
function App() {
  console.log('Hi from App')
  return <>
  <Header/>
  <Container>
  <Outlet/>
  </Container>
  <Footer/>
  </>
}

export default App;
