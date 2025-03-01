"use client"
import React, { useContext, useEffect } from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useState } from 'react';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import { DragDropLayoutElement } from '@/context/DragDropLayoutElement';
import { EmailTemplateContext } from '@/context/EmailTemplateContext';
import { SelectedElementContext } from '@/context/SelectedElementContext';


function provider({children}) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    const [userDetail,setUserDetail] = useState();
    const [screenSize,setScreenSize] = useState('desktop');
    const [dragElementLayout,setDragElementLayout] = useState();
    // const [emailTemplate,setEmailTemplate] = useState([]);
    const [selectedElement,setSelectedElement] = useState();
    const [emailTemplate, setEmailTemplate] = useState([]);





   useEffect(() => {
  if (typeof window !== "undefined") {
    try {
      const storedUserDetail = localStorage.getItem("userDetail");
      const storedEmailTemplate = localStorage.getItem("emailTemplate");

      const parsedUserDetail = storedUserDetail ? JSON.parse(storedUserDetail) : null;
      // const parsedEmailTemplate = storedEmailTemplate ? JSON.parse(storedEmailTemplate) : [];
      let parsedEmailTemplate = [];
    try {
          parsedEmailTemplate = storedEmailTemplate ? JSON.parse(storedEmailTemplate) : [];
       } 
    catch (error) {
    console.error("Invalid JSON:", error);
    }


      setEmailTemplate(Array.isArray(parsedEmailTemplate) ? parsedEmailTemplate : []);
      setUserDetail(parsedUserDetail || null);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      localStorage.removeItem("userDetail");  // Clear corrupt data
      localStorage.removeItem("emailTemplate");
    }
  }
}, []);
 
    


  useEffect(()=>{
    if(typeof window!==undefined){
      localStorage.setItem('emailTemplate',JSON.stringify(emailTemplate))
    }

  },[emailTemplate])


  useEffect(() => {
    if (selectedElement) {
      let updatedEmailTemplates = [];
  
      emailTemplate.forEach((item) => {
        if (item.id === selectedElement?.layout?.id) {
          updatedEmailTemplates.push(selectedElement?.layout);
        } else {
          updatedEmailTemplates.push(item); 
        }
      });
  
      setEmailTemplate(updatedEmailTemplates);
    }
  }, [selectedElement]);
  
  




  return (

    <ConvexProvider client={convex}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
              <ScreenSizeContext.Provider value={{screenSize,setScreenSize}}>
                <DragDropLayoutElement.Provider value={{dragElementLayout,setDragElementLayout}}>
                  <EmailTemplateContext.Provider value={{emailTemplate,setEmailTemplate}}>
                    <SelectedElementContext.Provider value={{selectedElement,setSelectedElement}}>
         <div> 
             {children}
           </div>
           </SelectedElementContext.Provider>
           </EmailTemplateContext.Provider>
           </DragDropLayoutElement.Provider>
           </ScreenSizeContext.Provider>
           </UserDetailContext.Provider>
     </GoogleOAuthProvider>
    </ConvexProvider>
  )
}

export default provider

export const useUserDetail = () =>{
    return useContext(UserDetailContext);
}

export const useScreenSize = () =>{
  return useContext(ScreenSizeContext);
}

export const  useDragElementLayout = () =>{
  return useContext(DragDropLayoutElement);
}

export const useEmailTemplate = () =>{
  return useContext(EmailTemplateContext);
}

export const useSelectedElement = () =>{
  return useContext(SelectedElementContext);
}