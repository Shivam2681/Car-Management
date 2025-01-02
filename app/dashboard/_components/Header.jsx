"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

  const path = usePathname();
  useEffect(() =>{
    console.log(path) 
  },[])
  return (
    <div className='flex p-2 items-center justify-between bg-secondary shadow-md'>
      <div className='flex'>
      <Image src={'/logo.svg'} width={50} height={100} alt='logo' />
      <span className=" text-2xl p-2 font-bold">FleetManager</span>
      </div>
      
      <ul className=' hidden md:flex gap-6'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
        ${path =='/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
        ${path =='/dasboard/Questions' && 'text-primary font-bold'}`}>Questions</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
        ${path =='/dasboard/Upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
        ${path =='/dasboard/How it works? ' && 'text-primary font-bold'}`}>How it works?</li>
      </ul>
      <div className='pr-2'>
      <UserButton/>
      </div>
    </div>
  )
}

export default Header