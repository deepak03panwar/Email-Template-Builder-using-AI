"use client"
import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Code, Monitor, Smartphone } from 'lucide-react';
import { useEmailTemplate, useScreenSize } from '@/app/provider';
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

 

function EditorHeader({ viewHTMLCode }) {
  const { screenSize, setScreenSize } = useScreenSize();
  const updateEmailTemplate = useMutation(api.emailTemplate.UpdateTemplateDesign);
  const { templateId } = useParams();
  const { emailTemplate } = useEmailTemplate();

  

  const onSaveTemplate = async () => {
    // if (status === "loading") {
    //   return; // Prevent action while session is still loading
    // }

    // if (!session) {
    //   // Trigger Google Login
    //   signIn('google').catch((err) => console.error("Sign-in Error:", err));
    //   return;
    // }

    console.log("Before saving:", emailTemplate); // Debugging step

    try {
      const sanitizedTemplate = JSON.parse(JSON.stringify(emailTemplate));

      await updateEmailTemplate({
        tid: templateId,
        design: sanitizedTemplate,
      });

      toast('Email Template Saved Successfully!');
    } catch (error) {
      console.error("Error while saving template:", error);
      toast('Failed to save email template or SignIn!');
    }
  };

  return (
    <div className="p-4 shadow-sm flex justify-between items-center">
      <Image src={'/logo.svg'} alt="logo" width={160} height={150} priority />
      <div className='flex gap-3'>
        <Button
          variant="ghost"
          onClick={() => setScreenSize('desktop')}
          className={`${screenSize === 'desktop' && 'bg-purple-100 text-primary'}`}>
          <Monitor /> Desktop
        </Button>
        <Button
          variant="ghost"
          onClick={() => setScreenSize('mobile')}
          className={`${screenSize === 'mobile' && 'bg-purple-100 text-primary'}`}>
          <Smartphone /> Mobile
        </Button>
      </div>
      <div className='flex gap-3'>
        <Button variant='ghost' className='hover:text-primary hover:bg-purple-100' onClick={() => viewHTMLCode(true)}>
          <Code />
        </Button>
        <Button variant="outline">Send Test Email</Button>
        <Button onClick={onSaveTemplate}>Save Template</Button>
      </div>
    </div>
  );
}

export default EditorHeader;
