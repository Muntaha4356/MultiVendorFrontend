import React from 'react'
import Checkout from '../components/Checkout/Checkout'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Header from '../components/Layouts/Header'
import Footer from '../components/Layouts/Footer'

const CheckoutPage = () => {
  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default CheckoutPage
