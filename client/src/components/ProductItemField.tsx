import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import ProductItemSelect from "@/components/ProductItemSelect";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Control } from "react-hook-form";

interface ProductItemFieldsProps {
  control: Control<any>;
  methods: any;
  append: (item: { productId: string; qty: string }) => void;
  remove: (index: number) => void;
  fields: any[];
}

const ProductItemFields: React.FC<ProductItemFieldsProps> = ({
  control,
  methods,
  append,
  remove,
  fields,
}) => {
  return (
    <div className="flex flex-col px-4 pt-2 pb-4 gap-4 rounded-md">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4">
          <div className="w-3/4">
            <FormSelect
              name={`productItem.${index}.productId`}
              label=""
              placeholder="Select a Product"
              form={methods}
              item={<ProductItemSelect />}
            />
          </div>
          <div>
            <FormInput
              name={`productItem.${index}.qty`}
              type="number"
              label=""
              placeholder="Enter Qty"
              min={1}
              form={methods}
            />
          </div>
          <div className="mt-2 flex items-center justify-center">
            {fields.length > 1 ? (
              <Trash2
                onClick={() => remove(index)}
                className="cursor-pointer"
              />
            ) : (
              <Trash2 className="opacity-50 cursor-not-allowed" />
            )}
          </div>
        </div>
      ))}
      <Button className="mx-auto" onClick={() => append({ productId: "", qty: "" })}>
        <Plus />
      </Button>
    </div>
  );
};

export default ProductItemFields;
