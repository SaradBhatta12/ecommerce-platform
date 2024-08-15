import { useEffect, useState } from "react";
import { useGetallCategoryQuery } from "../../redux/api/categorySlice";
import ProductForm from "../sub-comp/ProductForm";

const Create = () => {
  const { data: category, isLoading, isError } = useGetallCategoryQuery();
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (category?.allCategory) {
      setCategoryData(category.allCategory);
    }
  }, [category]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading categories...</div>;

  return (
    <div>
      <ProductForm categories={categoryData} />
    </div>
  );
};

export default Create;
