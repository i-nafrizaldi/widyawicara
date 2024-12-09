"use client";

import PurchasingForm from "@/components/PurchasingForm";
import AuthGuard from "@/hoc/AuthGuard";
import useCreateSelling from "@/hooks/api/product/useCreateSelling";

const Selling = () => {
  const { createSelling, isLoading } = useCreateSelling();

  const handleFormSubmit = (data: any) => {
    createSelling(data);
  };

  return (
    <div className="container min-h-screen flex flex-col gap-6 place-content-center">
      <p className="text-4xl font-black text-center">Selling Product</p>
      <PurchasingForm onSubmit={handleFormSubmit} isLoading={isLoading} />;
    </div>
  );
};

export default AuthGuard(Selling);
