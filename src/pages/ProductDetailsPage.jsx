import React, { useEffect, useState } from 'react'
import Header from '../components/Layouts/Header'
import Footer from '../components/Routes/Footer/Footer'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import { useParams, useSearchParams } from 'react-router-dom'
import { productData } from '../static/data'
import SuggestedProducts from '../components/ProductDetails/SuggestedProducts'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsShop } from '../redux/actions/product'
const ProductDetailsPage = () => {
  const {id} = useParams();
  const [data, setData] = useState();
  const {allProducts} = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents]);
  return (
    <div>
      <Header/>
      <ProductDetails data={data} />
      {/* <RelatedProducts/> */}
      {
          !eventData && (
            <>
            {data && <SuggestedProducts data={data} />}
            </>
          )
        }
      <Footer/>
    </div>
  )
}

export default ProductDetailsPage
