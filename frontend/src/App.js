import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import OrderHistoryScreen from './screens/OrderHistoryScreen'
import CategoryScreen from './screens/CategoryScreen'

import ReturnStatic from './screens/static/ReturnStatic'
import ShippingStatic from './screens/static/ShippingStatic'
import InternationalStatic from './screens/static/InternationalStatic'
import AboutStatic from './screens/static/AboutStatic'

const App = () => {
  return (
    <Router>
      <Header />
      <Route path='/' component={HomeScreen} exact />
      <main className='py-3'>
        <Container className="p-5">
          <Route path='/international' component={InternationalStatic} />
          <Route path='/returnpolicy' component={ReturnStatic} />
          <Route path='/shippingpolicy' component={ShippingStatic} />
          <Route path='/about' component={AboutStatic} />

          <Route path='/category/:id' component={CategoryScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/orderhistory' component={OrderHistoryScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
        </Container>

      </main>
      <Footer />
    </Router>
  );
}

export default App;
