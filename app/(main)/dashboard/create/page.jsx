"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  Sparkles } from 'lucide-react'
import AIInputBox from '@/components/custom/AIInputBox'
import { useScreenSize } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


function Create() {
  const router = useRouter();
    
  return (
    <div className='px-10 md:px-28 lg:px-64 xl:px-72 mt-20 text-primary'>
        <div className='flex items-center flex-col'>
             <h2 className='font-bold text-3xl'>CREATE NEW EMAIL TEMPLATE</h2>  
             <p className='text-lg text-black-400'>Effortlessly design and customize professional AI-powered email templates with ease.</p>
              <Tabs defaultValue="AI" className="w-[500px] mt-10" >
                   <TabsList>
                     <TabsTrigger value="AI">Create with AI <Sparkles className='w-5 h-5 ml-2'/></TabsTrigger>
                     <TabsTrigger value="SCRATCH">Start from Scratch</TabsTrigger>
                    </TabsList>
                     <TabsContent value="AI">
                        <AIInputBox/>
                     </TabsContent>
                     <TabsContent value="SCRATCH">
                     <div className="flex justify-center mr-20">
              <Button onClick={() => router.push('/editor/create')}>
                Go to Editor
              </Button>
            </div>
                     </TabsContent>
              </Tabs>

        </div>
      
        </div>
  )
}

export default Create