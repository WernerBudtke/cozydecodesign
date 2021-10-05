import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
const ProductsGallery = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => alert(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(products);
  return (
    <>
      <div>aca va algo</div>
      <div className="productsGallery">
        {products.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </>
  );
};

export default ProductsGallery;
