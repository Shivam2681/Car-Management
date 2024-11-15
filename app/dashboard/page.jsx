"use client"
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewCar from './_components/AddNewCar'
import CarList from './_components/carList'
import { Car, Plus } from 'lucide-react'

function Dashboard() {
  return (
    <div className='p-6 md:p-10 max-w-7xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h2 className='font-bold text-3xl flex items-center gap-2'>
            <Car className="h-8 w-8" />
            My Car Collection
          </h2>
          <p className='text-gray-500 mt-2'>
            Manage and showcase your vehicles
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10'>
        <AddNewCar />
        {/* <div className='p-6 border rounded-lg bg-white hover:shadow-md transition-all'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-blue-100 rounded-full'>
              <Car className='h-5 w-5 text-blue-600' />
            </div>
            <h3 className='font-semibold'>Total Cars</h3>
          </div>
          <p className='text-2xl font-bold'>0</p>
        </div> */}
        {/* Add more stat cards here if needed */}
      </div>

      <div className='border-b mb-8'></div>

      <div className='space-y-6'>
        <CarList />
      </div>

      <div className='mt-12 text-center text-gray-500 text-sm'>
        <p>Need help? Contact support@carmanager.com</p>
      </div>
    </div>
  )
}

export default Dashboard