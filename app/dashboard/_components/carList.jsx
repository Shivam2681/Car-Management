"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { CarModel } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Pencil, Trash, Plus, Loader2, Search } from "lucide-react";
import AddNewCar from "./AddNewCar";

const CarList = () => {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    user && fetchCars();
  }, [user]);

  const fetchCars = async (query = "") => {
    try {
      setIsLoading(true);
      const result = await db.query.CarModel.findMany({
        where: query ? like(CarModel.carName, `%${query}%`) : undefined,
        orderBy: (cars, { desc }) => [desc(cars.createdAt)],
      });

      const processedResults = result.map((car) => ({
        ...car,
        tags: JSON.parse(car.tags || "[]"),
        previewImage: car.images?.[0]?.data || null,
      }));

      setCarList(processedResults);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (carId) => {
    if (confirm("Are you sure you want to delete this car?")) {
      try {
        await db.delete(CarModel).where(eq(CarModel.id, carId));
        fetchCars(searchQuery);
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCars(searchQuery);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const filteredCarList = carList.filter(
    (car) =>
      car.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (car.tags || []).some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Cars</h2>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCarList.map((car) => (
          <Card
            key={car.id}
            className="overflow-hidden bg-white rounded-lg shadow-md transform transition-all duration-500 ease-in-out hover:shadow-xl hover:scale-105"
          >
            <CardHeader className="p-0 relative group">
              {car.previewImage ? (
                <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={car.previewImage}
                    alt={car.carName}
                    fill
                    className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-80"
                  />
                </div>
              ) : (
                <div className="h-60 bg-secondary flex items-center justify-center rounded-t-lg">
                  <p className="text-muted-foreground">No image available</p>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-5">
              <CardTitle className="mb-2 text-2xl font-semibold text-primary">
                {car.carName}
              </CardTitle>
              <p className="text-sm text-muted-foreground mb-2">
                {car.modelName}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-2 hover: transition-colors duration-300">
                {car.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {car.tags?.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary-100 text-primary px-2 py-1 rounded-full shadow-sm transition-all duration-500 ease-in-out"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <Link href={`/dashboard/cars/${car.id}`}>
                <Button
                  variant="link"
                  className="p-0 text-primary font-medium transition-all duration-500 ease-in-out hover:underline"
                >
                  View Details
                </Button>
              </Link>
              <div className="flex gap-2">
                <Link href={`/dashboard/cars/${car.id}/edit`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:bg-primary-100 transition-transform duration-500 ease-in-out hover:scale-110"
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(car.id)}
                  className="text-destructive hover:bg-destructive-100 transition-transform duration-500 ease-in-out hover:scale-110"
                >
                  <Trash className="h-5 w-5" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredCarList.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No cars found matching the search query.
          </p>
        </div>
      )}
    </div>
  );
};

export default CarList;
