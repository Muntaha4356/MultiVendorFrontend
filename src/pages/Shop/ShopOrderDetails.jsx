import React from 'react'
import DashboardHeader from '../../components/Dashboard/Shop/DashboardHeader'
import Footer from '../../components/Layouts/Footer'
import { useSelector } from 'react-redux'
import OrderDetails from '../../components/Shop/OrderDetails'

const ShopOrderDetails = () => {
    const {seller} = useSelector((state) => state.seller);
  return (
    <div>
      <DashboardHeader seller={seller} />
      <OrderDetails/>
      <Footer />
    </div>
  )
}

export default ShopOrderDetails

