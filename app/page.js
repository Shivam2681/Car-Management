import React from 'react'
import Hero from './_components/Hero'
import Features from './_components/Features'
import Footer from './_components/Footer'
import Home from './_components/Home'

function page() {
  return (
    <div className="min-h-screen bg-[#1A1F2C] text-black overflow-hidden">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Car Management Software" className="w-10 h-10" />
            <span className="ml-2 text-2xl font-bold">FleetManager</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-gray-700 hidden md:block hover:text-indigo-600 transition">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-700 hidden md:block hover:text-indigo-600 transition">How It Works</a></li>
              <li><a href="#testimonials" className="text-gray-700 hidden md:block hover:text-indigo-600 transition">Testimonials</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <Home/>
      <Hero/>
      <Features/>
      <Footer/>
    </div>
  )
}

export default page

