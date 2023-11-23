import { useSearchParams } from "react-router-dom";
import Container from "../../Shared/Container";
import { categories } from "./CategoriesData";
import CategoryBox from "./CategoryBox";

const Categories = () => {

  const [params,setParams] = useSearchParams()
  const category = params.get('category')
   

  return (
    <Container>
      <div className="flex items-center justify-between gap-2 pt-4 overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            icon={item.icon}
            label={item.label}
            selected={category === item.label}
          ></CategoryBox>
        ))}
      </div>
    </Container>
  );
};
export default Categories;
