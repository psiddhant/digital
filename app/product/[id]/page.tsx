"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product, products } from "@/app/data/products";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === Number(id));
    setProduct(foundProduct || null);
  }, [id]);

  if (!product) {
    return <div className="text-center mt-12">Product not found</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Button 
        variant="outline" 
        onClick={() => router.back()} 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
      </Button>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="p-0">
          <div className="relative h-96 w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-3xl font-bold mb-4">{product.name}</CardTitle>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
      
            <Link href={product.link} className="w-full">
          <Button className="w-full">
            Buy Now
            </Button>
            </Link>
  
        </CardFooter>
      </Card>
    </div>
  );
}