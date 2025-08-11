"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard";
import { motion } from "framer-motion";

type Product = {
  product_id: number;
  name: string;
  description: string[]; 
  price: number;
  is_recurring: boolean;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function Pricing() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      const productsData: Product[] = response.data;
      console.log("Products: ", productsData);

      // Sort the products so that the Monthly Plan comes before the Yearly Plan.
      const sortedProducts = productsData.sort((a, b) => {
        if (a.name === "Monthly Plan" && b.name === "Yearly Plan") return -1;
        if (a.name === "Yearly Plan" && b.name === "Monthly Plan") return 1;
        return 0;
      });

      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center px-4 py-12 md:px-8 lg:px-16 xl:px-20 text-center">
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-xl md:text-2xl lg:text-4xl font-semibold w-3/4 md:w-2/5 lg:w-[500px]"
      >
        Choose Your Plan
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-2 text-xs sm:text-sm md:text-md lg:text-lg font-normal w-3/4 md:w-2/3 lg:w-full mx-auto text-muted-foreground"
      >
        Pick a plan that fits your needs.
      </motion.p>

      <motion.div
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:max-w-2xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.product_id}
            variants={cardVariants}
            transition={{
              duration: 1.2,
              delay: index * 0.15,
              ease: "easeOut",
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
