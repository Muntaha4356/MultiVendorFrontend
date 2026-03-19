import React, { useEffect, useState } from "react";
import { productData } from "../static/data";
import styles from "../styles/styles";
import Header from "../components/Layouts/Header";
import ProductCard from "../components/Routes/ProductCard/ProductCard";

const BestSelling = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
    productData && productData.sort((a, b) => a.total_sell - b.total_sell);
    setData(d);
    
  }, []);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No Products Found
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default BestSelling;
