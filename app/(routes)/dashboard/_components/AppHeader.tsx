'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const menuOptions = [
    {
        id:1,
        name:'Home',
        path:'/dashboard'
    },
    {
        id:2,
        name:'History',
        path:'/dashboard/history'
    },
    {
        id:3,
        name:'Pricing',
        path:'/dashboard/billing'
    }
    
]
function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className='relative'>
      <div className='flex items-center justify-between p-4 shadow px-6 md:px-20 lg:px-40 bg-white'>
        <Image src={'/logo.svg'} alt='logo' width={180} height={90} />
        
        {/* Desktop Menu */}
        <div className='hidden md:flex gap-12 items-center'>
          {menuOptions.map((option,index) =>(
            <Link key={index} href={option.path}>
              <h2 className='hover:font-bold cursor-pointer transition-all'>{option.name}</h2>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className='flex items-center gap-4'>
          <UserButton />
          <Button 
            variant="ghost" 
            className='md:hidden' 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className='absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 md:hidden z-50'>
          <div className='flex flex-col gap-4'>
            {menuOptions.map((option,index) =>(
              <Link 
                key={index} 
                href={option.path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <h2 className='hover:font-bold cursor-pointer transition-all py-2 border-b'>{option.name}</h2>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AppHeader