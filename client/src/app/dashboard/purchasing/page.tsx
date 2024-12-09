"use client";

import PurchasingForm from "@/components/PurchasingForm";
import AuthGuard from "@/hoc/AuthGuard";
import useCreatePurchasing from "@/hooks/api/product/useCreatePurchasing";

const Purchasing = () => {
  const { createOrder, isLoading } = useCreatePurchasing();

  const handleFormSubmit = (data: any) => {
    createOrder(data);
  };

  return (
    <div className="container min-h-screen flex flex-col gap-6 place-content-center">
      <p className="text-4xl font-black text-center">Purchasing Order</p>
      <PurchasingForm onSubmit={handleFormSubmit} isLoading={isLoading} />;
    </div>
  );
};

export default AuthGuard(Purchasing);
