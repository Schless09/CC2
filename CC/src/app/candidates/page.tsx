'use client'
import React from 'react'
import Candidates from '@/components/candidates/Candidates'
import Hero from '@/components/candidates/Hero'
import { FeaturedPosts } from '@/components/cards/FeaturedPosts'
import { blogPosts } from '../constants'
import CalEmbed from '@/components/CalEmbed'

const page = () => {
  return (
    <div>       
        <Hero />
        <Candidates />
        <div className='my-12 lg:my-16 w-full'>
        <CalEmbed />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"> {/* Added container */}
          <FeaturedPosts posts={blogPosts.slice(0, 3)} />
        </div>
        </div>
    </div>
  )
}

export default page