import React from "react";
import "./Cover.scss";
import { Link } from "react-router-dom";

const Cover = ({ item }) => {
  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="cover">
        <div className="image">
          {item?.isNew && <span>New Product</span>}
          <img
            src={item?.img}
            alt=""
            className="mainImg"
          />
          <img
            src={item?.img2}
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.title}</h2>
        <div className="prices">
          {/* calculate 20% more than the new price */}
          <h3>${(item?.price * 1.2).toFixed(2)}</h3>
          <h3>${item?.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Cover;
