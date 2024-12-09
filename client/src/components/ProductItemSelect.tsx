import { SelectContent, SelectItem } from "@/components/ui/select";
import useGetProductList from "@/hooks/api/product/useGetProductList";

const ProductItemSelect = () => {
  const { data: product } = useGetProductList();

  return (
    <SelectContent>
      {product.map((product, index) => {
        return (
          <SelectItem key={index} value={`${product.id}`}>
            {product.name}
          </SelectItem>
        );
      })}
    </SelectContent>
  );
};

export default ProductItemSelect;
