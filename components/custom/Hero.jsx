"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation' // If using Pages Router, use 'next/router'

function Hero() {
  const router = useRouter();
  return (
    <div className='px-10 md:px-28 lg:px-44 flex flex-col items-center mt-20 '>
      <h2 className='font-extrabold text-5xl text-center'>
      AI-Driven Email<span className='text-primary'> Template Builder </span><span className='block text-black'> Fast, Simple,<span className='text-primary'> Powerful </span> </span>
      </h2>
      


      <p className='mt-4 text-center'>
        Longing to impress clients with professional emails but don’t have enough time to build them on your own? Use our ready-made email templates complete with engaging imagery and copy — save time on email production with us.
      </p>

      {/* <div className='flex gap-5 mt-6'>
        <Button variant='outline'>Try Demo</Button>
        <Button>Learn More</Button>
      </div> */}

<div className='flex gap-5 mt-6'>
        <Button  className='font-bold'variant='outline' onClick={() => router.push('/dashboard/create')}>
          Try Demo
        </Button>
        <Button className='text-white font-bold'>Learn More</Button>
      </div>

      <div className='mt-8 mb-20'>
        
        <Image
          src='/landing.png'
          alt='Landing Image'
          width={1000}
          height={800}
          className='rounded-md'
          priority
        />
      </div>
    </div>
  )
}

export default Hero
