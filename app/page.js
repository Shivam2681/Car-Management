"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const FeatureCard = ({ title, description }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
    </CardContent>
  </Card>
);

const Testimonial = ({ name, role, content }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </CardHeader>
    <CardContent>
      <p className="italic">{content}</p>
    </CardContent>
  </Card>
);

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Car Management Software" className="w-10 h-10" />
            <span className="ml-2 text-2xl font-bold">Car Management</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-gray-700 hover:text-indigo-600 transition">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition">How It Works</a></li>
              <li><a href="#testimonials" className="text-gray-700 hover:text-indigo-600 transition">Testimonials</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-20">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">Streamline Your Car Management</h1>
          <p className="text-xl text-gray-600 mb-8">Manage your car fleet with ease using our powerful software.</p>
          <div className="flex justify-center">
            <Button
              onClick={handleGetStarted}
              variant="primary"
              className="bg-blue-600 border border-blue-700 hover:bg-blue-700 hover:border-blue-800 text-white px-4 py-2 rounded-md flex items-center"
            >
              Get Started <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

        </section>

        <section id="features" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Comprehensive Inventory"
              description="Track and manage all your vehicles in one place."
            />
            <FeatureCard 
              title="Maintenance Scheduling"
              description="Set reminders and monitor service schedules for your cars."
            />
            <FeatureCard 
              title="Detailed Analytics"
              description="Generate reports and insights to optimize your fleet."
            />
          </div>
        </section>

        <section id="how-it-works" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <CardHeader>
                <CardTitle>Add Your Cars</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Input your vehicle details and assign them to your fleet.</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center">
              <CardHeader>
                <CardTitle>Schedule Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Set reminders for regular service, insurance renewals, and more.</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center">
              <CardHeader>
                <CardTitle>Monitor Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Track fuel consumption, mileage, and other metrics to optimize your fleet.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="testimonials" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Testimonial
              name="John Doe"
              role="Fleet Manager"
              content="Car Management has transformed the way we manage our fleet. It's a game-changer!"
            />
            <Testimonial
              name="Jane Smith"
              role="Operations Coordinator"
              content="The reporting and analytics features are incredibly helpful in optimizing our operations."
            />
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="/logo.svg" alt="Car Management Software" className="w-10 h-10 inline-block mr-2" />
              <span className="text-xl font-bold">Car Management</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-indigo-400 transition"><svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg></a>
              <a href="#" className="hover:text-indigo-400 transition"><svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-400 text-sm">
            © 2024 Car Management. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}