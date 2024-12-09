import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import ProductItemFields from "./ProductItemField";

const schema = z.object({
  productItem: z
    .array(
      z.object({
        productId: z
          .string({ required_error: "Product Item is required" })
          .min(1, "Product Item is required"),
        qty: z
          .string({ required_error: "Quantity is required" })
          .min(1, "Quantity is required"),
      })
    )
    .min(1, "At least one item is required"),
});

interface PurchasingFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const PurchasingForm: React.FC<PurchasingFormProps> = ({ onSubmit, isLoading }) => {
  const initialValues = { productItem: [{ productId: "", qty: "" }] };

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "productItem",
  });

  return (
    <FormProvider {...methods}>
      <div className="container w-[400px] place-content-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 border p-4 rounded-lg"
        >
          <div className="flex flex-col gap-3">
            <Label className="mt-1">Products Items</Label>
            <ProductItemFields
              control={control}
              methods={methods}
              append={append}
              remove={remove}
              fields={fields}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
};

export default PurchasingForm;
