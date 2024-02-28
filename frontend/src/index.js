import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Home from './pages/Home';
import PDP from './pages/PDP'
import Cart from "./pages/Cart"
import {Provider} from 'react-redux'
import store from './store'

const route = createBrowserRouter(createRoutesFromElements(
    <Route element={<App/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/products/:id" element={<PDP/>}/>
        <Route path="/cart" element={<Cart/>}/>
    </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Provider store={store}><RouterProvider router={route}/></Provider>);


