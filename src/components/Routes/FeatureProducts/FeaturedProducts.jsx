import React from 'react'
import styles from '../../../styles/styles'
import { productData } from '../../../static/data'
import ProductCard from '../ProductCard/ProductCard'
import { useSelector } from 'react-redux'

const FeaturedProducts = () => {
    const {allProducts} = useSelector((state) => state.products);
  return (
    <div>
        <div className={`${styles.section} mt-12`}>
            <div className={`${styles.heading}`}>
                <h1>Featured Products</h1>
            </div>
            <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[30px] wb-12  '>
                {
                    allProducts && allProducts.map((i,index)=>
                        <ProductCard data={i} key={index} />)
                }
            </div>
        </div>
    </div>
    
  )
}

export default FeaturedProducts
