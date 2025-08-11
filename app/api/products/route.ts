import { dodopayments } from "@/lib/dodopayments";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
  const cacheKey = "products";

  try {
    const cachedProducts = await redis.get(cacheKey);
    if (cachedProducts) {
      console.log("Returning products from cache");
      return NextResponse.json(cachedProducts);
    }

    const products = await dodopayments.products.list({
      headers: {
        Authorization: `Bearer ${process.env.DODO_API_KEY_TEST}`,
      },
    });

    const transformedProducts = products.items.map((product) => ({
      ...product,
      description: product.description?.split(",").map((desc) => desc.trim()),
    }));

    const existingProducts = await prisma.product.findMany({
      where: {
        product_id: {
          in: transformedProducts.map((product) => product.product_id),
        },
      },
    });
    console.log("Existing products:", existingProducts);

    if (existingProducts.length > 0) {
      await redis.set(cacheKey, JSON.stringify(existingProducts));  
      return NextResponse.json(existingProducts);
    }

    console.log("Creating products in the database");
    const createResult = await prisma.product.createMany({
      data: transformedProducts.map((product) => ({
        name: product.name || "",
        description: product.description ?? [],
        product_id: product.product_id,
        business_id: product.business_id,
        is_recurring: product.is_recurring,
        price: product.price || 0,
        currency: product.currency || "USD",
      })),
    });
    console.log("Products created count:", createResult);

    const newProducts = await prisma.product.findMany({
      where: {
        product_id: {
          in: transformedProducts.map((product) => product.product_id),
        },
      },
    });

    await redis.set(cacheKey, JSON.stringify(newProducts));

    return NextResponse.json(newProducts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
