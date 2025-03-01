"use client"
import { useDragElementLayout, useEmailTemplate, useScreenSize } from '@/app/provider';
import React, { useEffect, useRef,useState } from 'react';
import ColumnLayout from '../LayoutElements/ColumnLayout';
import ViewHTMLDialog from './ViewHTMLDialog';

function Canvas({viewHTMLCode,closeDialog}) {
  const htmlRef = useRef();
  const { screenSize,setScreenSize } = useScreenSize();
  const { dragElementLayout } = useDragElementLayout();
  const [dragOver, setDragOver] = useState(false);
  const [htmlCode,setHtmlCode] = useState();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate() || { emailTemplate: [], setEmailTemplate: () => {} };


  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDropHandle = () => {
    console.log(dragElementLayout?.dragLayout);
    setDragOver(false);
  
    if (dragElementLayout?.dragLayout) {
      // setEmailTemplate((prev) => [
      //   ...prev,
      //   {
      //     ...dragElementLayout.dragLayout, // Ensure a fresh object is added
      //     id: Date.now(), // Add a unique ID to prevent React key issues
      //   },
      // ]);
      // setEmailTemplate(prev => [...prev, JSON.parse(JSON.stringify({
      //   ...dragElementLayout.dragLayout,
      //   id: Date.now()
      // }))]);
      setEmailTemplate(prev => {
        let updatedTemplate = prev || []; // Ensure prev is always an array
        let newElement = {
          ...dragElementLayout.dragLayout,
          id: Date.now(),
        };
      
        console.log("New Element Added:", newElement);
        return [...updatedTemplate, newElement];
      });
      
    }
  };

  const getLayoutComponent = (layout) => {

  
    switch (layout?.type) {
      case 'column':
        return <ColumnLayout layout={layout} />;
      case 'Image':
        return <ImageComponent layout={layout} />;
      case 'Text':
        return <TextComponent layout={layout} />;
      case 'Button':
        return <ButtonComponent layout={layout} />;
      case 'LogoHeader':  // Add this case if missing
        return <LogoHeader layout={layout} />;
      default:
        return null;
    }
  };
  

  <Canvas 
  viewHTMLCode={viewHTMLCode} 
  closeDialog={() => setViewHtmlCode(false)}
  emailTemplate={emailTemplate} 
/>

  
  useEffect(()=>{
   viewHTMLCode && GetHTMLCode();
  },[viewHTMLCode])

  const GetHTMLCode =() =>{
   if(htmlRef.current){
    const htmlContent =htmlRef.current.innerHTML;
    console.log(htmlContent)
    setHtmlCode(htmlContent);
   }
  }

  useEffect(() => {
    if (viewHTMLCode) {
      setTimeout(GetHTMLCode, 100);
    }
  }, [viewHTMLCode]);
  

useEffect(() => {
  try {
    if (emailTemplate?.design) {
      const parsedData = JSON.parse(emailTemplate.design); // Extract and parse
      console.log("✅ Parsed Email Template:", parsedData);
      setEmailTemplate(parsedData); // Store parsed array instead of object
    }
  } catch (error) {
    console.error("❌ Error parsing emailTemplate:", error);
  }
}, [emailTemplate]);


  return (

    <div className=" flex justify-center border border-green-500  bg-gradient-to-r from-teal-200 to-teal-500">
      <div
        className={`bg-white p-6 w-full 
        ${screenSize === 'desktop' ? 'max-w-2xl' : 'max-w-md'} 
        ${dragOver && 'bg-purple-100 p-4'}`} 
        onDragOver={onDragOver}
        onDrop={onDropHandle}
        ref={htmlRef}
      >
      {Array.isArray(emailTemplate) && emailTemplate.length > 0 ? (
  emailTemplate.map((layout, index) => (
    <div key={index}>
      {getLayoutComponent(layout)}
    </div>
  ))
) : (
  <h2 className="p-4 text-center bg-gray-100 border border-dashed">
    Add Layout Here
  </h2>
)}
      </div>
      <ViewHTMLDialog openDialog={viewHTMLCode} htmlCode={htmlCode} closeDialog={closeDialog}/>
    </div>
  );
}

export default Canvas;
