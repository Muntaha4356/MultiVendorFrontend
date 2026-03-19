import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "./ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  console.log(allProducts, "product")
  useEffect(() => {
    const firstFive = allProducts ? allProducts.slice(0, 5) : [];
    setData(firstFive);
    console.log(allProducts, "product")
  }, [allProducts]);
  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Best Deals</h1>
      </div>
      <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
        {data &&
          data.map((i, index) => {
            return <ProductCard data={i} key={index} />;
          })}
      </div>
    </div>
  );
};

export default BestDeals;
