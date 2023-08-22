import { useState, useEffect } from "react";
import { PRODUCTS, CATEGORIES, SUB_CATEGORIES, IMAGES } from "../../data/data";

const useFetch = (requestType, catId = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      switch (requestType) {
        case "products":
          setData(PRODUCTS);
          break;
        case "categories":
          setData(CATEGORIES);
          break;
        case "sub-categories":
          if (catId) {
            const filteredSubCategories = SUB_CATEGORIES.filter((subCat) =>
              subCat.categories.includes(catId)
            );
            setData(filteredSubCategories);
          } else {
            setData(SUB_CATEGORIES);
          }
          break;
        case "images":
          setData(IMAGES);
          break;
        default:
          setData(null);
          setError(true);
          break;
      }
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  }, [requestType, catId]);

  return { data, loading, error };
};

export default useFetch;
