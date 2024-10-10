"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { products, Product } from "@/app/data/products";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Find your favorite products</h1>
          <Button onClick={toggleTheme} variant="outline" size="icon">
            {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
        <div className="mb-8 relative max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader className="p-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative h-64 w-full cursor-pointer">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <div className="relative h-[80vh] w-full">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/product/${product.id}`} passHref>
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center mt-12 text-muted-foreground text-lg">No products found.</p>
        )}
      </div>
    </div>
  );
}
