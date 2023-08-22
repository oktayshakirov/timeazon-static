import React, { useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import "../Products/Products.scss";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);

  const {
    data: subcategories,
    loading,
    error,
  } = useFetch("sub-categories", catId);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  const toggleFilterVisible = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <div className="products">
      <button className="filter-button" onClick={toggleFilterVisible}>
        Show Filters
      </button>
      <div className={`left ${filterVisible ? "show" : ""}`}>
        <div className="filterItem">
          <h2>Subcategories:</h2>
          {subcategories?.map((item) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                value={item.id}
                onChange={handleChange}
              />
              <label htmlFor={item.id}>{item.title}</label>
            </div>
          ))}
        </div>
        <div className="filterItem">
          <h2>Filter by price:</h2>
          <div className="inputItem">
            <span>0 € </span>
            <input
              type="range"
              min={0}
              max={999}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span> {maxPrice} €</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by:</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img className="catImg" src="/Banners/CategoryPage.jpg" alt="" />
        <List
          catId={catId}
          maxPrice={maxPrice}
          sort={sort}
          subCats={selectedSubCats}
        />
      </div>
    </div>
  );
};

export default Products;
