import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import UserOrderDetails from "../components/Cart/UserOrderDetails";


const OrderDetailsPage = () => {
  
  return (
    
    <div>
        <Header />
        <UserOrderDetails />
        <Footer />
    </div>
  )
}

export default OrderDetailsPage
