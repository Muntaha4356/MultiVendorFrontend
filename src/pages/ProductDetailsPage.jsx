import React, { useEffect, useState } from 'react'
import Header from '../components/Layouts/Header'
import Footer from '../components/Routes/Footer/Footer'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data'
import SuggestedProducts from '../components/ProductDetails/SuggestedProducts'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsShop } from '../redux/actions/product'
const ProductDetailsPage = () => {
  const {id} = useParams();
  const [data, setData] = useState();
  const {allProducts} = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(()=>{
    if (allProducts) {
      const foundProduct = allProducts.find((i) => i._id === id);
      setData(foundProduct)
    }
  }, [allProducts])
  return (
    <div>
      <Header/>
      <ProductDetails data={data} />
      {/* <RelatedProducts/> */}
      {
        data && <SuggestedProducts data={data}/>
      }
      <Footer/>
    </div>
  )
}

export default ProductDetailsPage
