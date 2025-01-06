// page.tsx
'use client'
import React from 'react'
import Candidates from '@/components/candidates/Candidates'
import Hero from '@/components/candidates/Hero'
import CalEmbed from '@/components/CalEmbed'

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <div className="bg-white">
        <Candidates />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <CalEmbed />
        </div>
      </div>
    </div>
  )
}

export default Page