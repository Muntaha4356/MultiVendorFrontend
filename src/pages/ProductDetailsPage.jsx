import React, { useEffect, useState } from 'react'
import Header from '../components/Layouts/Header'
import Footer from '../components/Routes/Footer/Footer'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import { useParams, useSearchParams } from 'react-router-dom'
import SuggestedProducts from '../components/ProductDetails/SuggestedProducts'
import { useSelector } from 'react-redux'
import { matchesProductRoute } from '../utils/slugify'
import Loader from '../components/Layout/Loader'
const ProductDetailsPage = () => {
  const {id} = useParams();
  const [data, setData] = useState();
  const {allProducts, isLoading: productsLoading} = useSelector((state) => state.products);
  const { allEvents, isLoading: eventsLoading } = useSelector((state) => state.events);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const event = allEvents && allEvents.find((item) => matchesProductRoute(item, id));
      setData(event);
      return;
    }

    const product = allProducts && allProducts.find((item) => matchesProductRoute(item, id));
    setData(product);
  }, [allProducts, allEvents, id, eventData]);
  const isLoading = productsLoading || eventsLoading;

  return (
    <div>
      <Header/>
      {isLoading && !data ? (
        <Loader />
      ) : !data ? (
        <div className="w-full py-20 text-center text-gray-600">Product not found.</div>
      ) : (
        <>
          <ProductDetails data={data} />
          {!eventData && data && <SuggestedProducts data={data} />}
        </>
      )}
      <Footer/>
    </div>
  )
}

export default ProductDetailsPage
