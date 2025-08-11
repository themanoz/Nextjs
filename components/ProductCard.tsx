"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

type Product = {
  product_id: number;
  name: string;
  description: string[];
  price: number;
  is_recurring: boolean;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  // Compute the billing period based on the product name.
  // Adjust the logic here if you have a different indicator.
  const period =
    product.name === "Monthly Plan"
      ? "/month"
      : product.name === "Yearly Plan"
      ? "/year"
      : "";

  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckout = async (productId: number) => {
    const url = `https://test.checkout.dodopayments.com/buy/${productId}?quantity=1&redirect_url=http://localhost:3000/dashboard`;
    if (session?.accessToken) {
      router.push(url);
    } else {
      signIn("github", { callbackUrl: url });
    }
  };

  return (
    <div>
      <Card
        key={product.product_id}
        // className="p-8 rounded-2xl 
        // bg-gradient-to-br from-white via-gray-50 to-gray-100 
        // dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 
        // backdrop-blur-sm 
        // border border-gray-200/50 dark:border-gray-700/50 
        // hover:scale-105 transition-all duration-50
        // shadow-sm hover:shadow-md"
        className={`p-6 shadow-lg rounded-2xl ${
          product.name === "Yearly Plan" ? "border border-green-600" : ""
        }`}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="text-4xl font-bold">
            ${product.price / 100} {period}
          </p>

          {product.description && product.description.length > 0 && (
            <ul className="mt-4 space-y-2 text-slate-200">
              {product.description.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {product.name === "Monthly Plan" ? (
            <Button
              className="mt-6 w-full bg-green-800 text-white hover:bg-green-700"
              onClick={() => handleCheckout(product.product_id)}
            >
              Start 7-day free trial
            </Button>
          ) : (
            <Button
              className="mt-6 w-full bg-green-800 text-white hover:bg-green-700"
              onClick={() => handleCheckout(product.product_id)}
            >
              Get Started
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
