import React from "react";
import "./List.scss";
import Cover from "../Cover/Cover";
import useFetch from "../../hooks/useFetch";

const List = ({ subCats, maxPrice, sort, catId }) => {
  const sortParam = sort ? `&sort=price:${sort}` : "";
  const { data: productsData } = useFetch("products");
  const { data: imagesData } = useFetch("images");

  let data = productsData?.filter(
    (product) => product.categories.includes(catId) && product.price <= maxPrice
  );

  if (subCats.length > 0) {
    data = data?.filter((product) =>
      subCats.includes(product.sub_categories.toString())
    );
  }

  if (sort === "asc") {
    data = data?.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    data = data?.sort((a, b) => b.price - a.price);
  }

  const loading = false;
  const error = false;

  return (
    <div className="list">
      {loading
        ? "loading"
        : data?.map((item) => {
            const mainImgUrl = imagesData[item.img]?.url;
            const secondImgUrl = imagesData[item.img2]?.url;
            return (
              <Cover
                item={{ ...item, img: mainImgUrl, img2: secondImgUrl }}
                key={item.id}
              />
            );
          })}
    </div>
  );
};

export default List;
