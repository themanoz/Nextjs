"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import axios from "axios";

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Product = {
  product_id: number;
  name: string;
  description: string[];
  price: number;
  is_recurring: boolean;
};

export default function SubscriptionModal({
  open,
  onOpenChange,
}: SubscriptionModalProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const monthlyProduct = products.find(
    (product) => product.name === "Monthly Plan"
  );
  
  const yearlyProduct = products.find(
    (product) => product.name === "Yearly Plan"
  );

  const plan = isMonthly ? monthlyProduct : yearlyProduct;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!plan) {
    return <div>Plan not found.</div>;
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe and get access to GitTrek</DialogTitle>
          <DialogDescription>
            Please choose a plan or start your free trial to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center mt-4">
          <div className="inline-flex items-center border rounded-full p-1 shadow">
            <button
              onClick={() => setIsMonthly(true)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                isMonthly
                  ? "bg-green-600 text-white"
                  : "bg-transparent text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsMonthly(false)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                !isMonthly
                  ? "bg-green-600 text-white"
                  : "bg-transparent text-white"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="max-w-md w-full p-8 place-items-center">
          <ProductCard product={plan} />
        </div>

        <Link href={""} onClick={() => signOut({ callbackUrl: "/" })}>
          Logout
        </Link>
      </DialogContent>
    </Dialog>
  );
}
