import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/utils/db';
import { CarModel } from '@/utils/schema';

async function CarDetails({ params }) {
  const car = await db.query.CarModel.findFirst({
    where: (cars, { eq }) => eq(cars.id, params.id)
  });

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center">Car not found</h1>
      </div>
    );
  }

  const tags = JSON.parse(car.tags);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Cars
          </Button>
        </Link>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{car.carName}</h1>
            <h2 className="text-xl text-muted-foreground mb-4">{car.modelName}</h2>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {car.images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image.data}
                    alt={`${car.carName} - Image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap">{car.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CarDetails;