import React from "react";
import { Routes, Route } from "react-router-dom";

import { UseAuth } from "./context/AuthContext";

import { ToastContainer } from "react-toastify";

import Layout from "./layout/Layout/Layout";
import Spinner from "./components/Spinner/Spinner";

import ShopProtectedRoute from "./routes/ShopProtectedRoute";

import Home from "./pages/Home/Home";

import SignIn from "./pages/Auth/Login/SignIn";
import SignUp from "./pages/Auth/Register/SignUp";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";

import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Shop from "./pages/Shop/Shop";

import Notes from "./pages/Notes/Notes";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";

function App() {
    const { isAuthReady, loading } = UseAuth();
 
    return (
      <>
        {(isAuthReady && loading) && (<Spinner />)}
        {isAuthReady && (
          <div>
              <ToastContainer position='top-left' />
                <Layout>
                
                <Routes>
                  <Route index element={<Home />} />
                  <Route path='/login' element={<SignIn />} />
                  <Route path='/register' element={<SignUp />} />
                  <Route path='/forgot-password' element={<ForgotPassword />} />

                  <Route element={<ShopProtectedRoute />}>
                    <Route path="/shop" element={<Shop />} />
                  </Route>

                  <Route path="/notes" element={<Notes />}/>
                  <Route path="/checkout" element={<Checkout />}/>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>

              </Layout>
          </div>
        )}
      </>
    );
}

export default App;