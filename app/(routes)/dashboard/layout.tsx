"use client"

import React from 'react'
import AppHeader from './_components/AppHeader'
import { Footer } from '@/components/Footer'
import { usePathname } from 'next/navigation'

function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const pathname = usePathname();
  const isMedicalAgent = pathname?.includes('/medical-agent/');

  return (
    <div className="min-h-screen flex flex-col">
        <AppHeader />
        <div className={`px-10 md:px-20 lg:px-40 py-10 flex-grow ${isMedicalAgent ? 'pb-0' : ''}`}>
           {children}
        </div>
        {!isMedicalAgent && <Footer />}
    </div>
  )
}

export default DashboardLayout