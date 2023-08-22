import React, { useState, useEffect } from "react";
import "./Featured.scss";
import Cover from "../Cover/Cover";
import useFetch from "../../hooks/useFetch";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WatchOffOutlinedIcon from "@mui/icons-material/WatchOffOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

const Featured = ({ type }) => {
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useFetch("products");
  const {
    data: imagesData,
    loading: imagesLoading,
    error: imagesError,
  } = useFetch("images");

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (productsData && imagesData && type) {
      const mappedProducts = productsData.map((product) => {
        const mainImgUrl = imagesData[product.img]?.url;
        const secondImgUrl = imagesData[product.img2]?.url;
        return { ...product, img: mainImgUrl, img2: secondImgUrl };
      });

      const filtered = mappedProducts.filter((item) => item.type === type);
      setFilteredProducts(filtered);
    }
  }, [productsData, imagesData, type]);

  return (
    <div className="featured">
      <div className="top">
        <div className="tab">
          <div className="first-row">
            <h1 className="type">
              <TrendingUpOutlinedIcon /> {type} watches
            </h1>
            <div className="second-row">
              <h4>
                <MonetizationOnOutlinedIcon className="icons" /> Up to 30% Off
              </h4>
              <h4>
                <LocalShippingOutlinedIcon className="icons" /> Free Delivery
              </h4>
              <h4>
                <WatchOffOutlinedIcon className="icons" /> 30-Day Return
              </h4>
            </div>
            <img
              src="/Images/superdeals.png"
              className="deals"
              alt="Super Deals"
            />
          </div>
        </div>
      </div>
      <div className="bottom">
        {productsError || imagesError ? (
          <div className="error-message">
            Oops! Our database where we keep all our watches seems to be down.
            Please try again later ! &#128533;
          </div>
        ) : productsLoading || imagesLoading ? (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        ) : (
          filteredProducts?.map((item) => <Cover item={item} key={item.id} />)
        )}
      </div>
    </div>
  );
};

export default Featured;
