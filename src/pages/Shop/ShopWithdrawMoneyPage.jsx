import React from 'react'
import DashboardHeader from '../../components/Dashboard/Shop/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/Shop/Layout/DashboardSidebar'
import { useSelector } from 'react-redux'
import WithDrawMoney from '../../components/Shop/WithDrawMoney'

const ShopWithdrawMoneyPage = () => {
  const {seller } = useSelector((state) => state.seller)
    return (
      <div>
        
          <DashboardHeader seller={seller} />
          <div className="flex justify-between w-full">
              <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSidebar active={7} />
                  </div>
                     <WithDrawMoney />
                     

          </div>
        
      </div>
    )
}

export default ShopWithdrawMoneyPage
