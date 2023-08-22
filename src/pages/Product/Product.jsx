import React, { useState, useEffect } from "react";
import "../Product/Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useFetch("products");
  const {
    data: imagesData,
    loading: imagesLoading,
    error: imagesError,
  } = useFetch("images");

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products && imagesData) {
      const foundProduct = products.find((item) => item.id.toString() === id);

      if (foundProduct) {
        const mainImgUrl = imagesData[foundProduct.img]?.url;
        const secondImgUrl = imagesData[foundProduct.img2]?.url;
        setProduct({ ...foundProduct, img: mainImgUrl, img2: secondImgUrl });
      }
    }
  }, [products, id]);

  return (
    <div className="product">
      {productsLoading || imagesLoading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="images">
              <img
                src={product?.img}
                alt=""
                onClick={(e) => setSelectedImg("img")}
              />
              <img
                src={product?.img2}
                alt=""
                onClick={(e) => setSelectedImg("img2")}
              />
            </div>
            <div className="mainImg">
              <img
                src={selectedImg === "img" ? product?.img : product?.img2}
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <h1>{product?.title}</h1>
            <span className="price">${product?.price}</span>
            <p>{product?.desc}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }>
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product.id,
                    title: product.title,
                    desc: product.desc,
                    price: product.price,
                    img: product.img,
                    quantity,
                  })
                )
              }>
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>
            <div className="info">
              <span>Disclaimer: Demo Products Only</span>
              <hr />
              <span>{/* ... the disclaimer text ... */}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
