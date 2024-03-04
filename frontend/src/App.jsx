import Footer from "./components/Footer";
import Header from "./components/Header";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Outlet } from "react-router-dom";
import { Container
 } from "react-bootstrap";
function App() {
  return <>
  <Header/>
  <Container>
  <Outlet/>
  </Container>
  <Footer/>
  <ToastContainer/>
  </>
}

export default App;
