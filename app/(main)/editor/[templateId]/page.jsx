"use client";
import { useEmailTemplate, useUserDetail } from "@/app/provider";
import Canvas from "@/components/custom/Canvas";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementSideBar from "@/components/custom/ElementSideBar";
import Settings from "@/components/custom/Settings";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {api } from "@/convex/_generated/api";  
import { useQuery } from "convex/react"; 
import { useCallback } from "react"; 

function Editor() {
  const [viewHTMLCode, setViewHtmlCode] = useState(false);  
  const  {userDetail,setUserDetail} =useUserDetail();
  const { templateId } = useParams();
  const {emailTemplate,setEmailTemplate} = useEmailTemplate();
  const [loading,setLoading] = useState(false);
  const convex = useConvex();


  const handleViewHTMLCode = useCallback((v) => setViewHtmlCode(v), []);

  
  useEffect(() => {
    if (userDetail && templateId) { 
      console.log("🚀 Fetching template in useEffect for:", { userDetail, templateId });
      GetTemplateData();
    }
  }, [userDetail, templateId]);  
  

    


  const GetTemplateData = async () => {
    if (!templateId || !userDetail?.email) return; // Prevent unnecessary API calls
  
    try {
      setLoading(true);
      const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
        tid: templateId,
        email: userDetail.email,
      });
  
      if (result?.design) {
        console.log("Design received", result.design);
        setEmailTemplate(result.design);
      } else {
        console.error("Invalid Template Data:", result);
        setEmailTemplate([]); // Prevent errors if response is empty
      }
    } catch (error) {
      console.error("Error fetching template data:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const fetchTemplateDesign = async () => {
    try {
      const response = await fetch('YOUR_GEMINI_API_URL'); // Update API URL
      const result = await response.json();
  
      console.log("Fetched Design from API:", JSON.stringify(result.design, null, 2)); // Debug Log
  
      if (result?.design && Array.isArray(result.design) && result.design.length > 0) {
        console.log("Valid Design Data Received", result.design);
        setEmailTemplate(result.design); // ✅ Update the state only if data is valid
      } else {
        console.error("Invalid Template Data or Empty:", result);
        setEmailTemplate([]); // Prevent errors if response is empty
      }
    } catch (error) {
      console.error("Error fetching template:", error);
    }
  };

  useEffect(() => {
    if (emailTemplate?.design) {
      try {
        const parsedDesign = JSON.parse(emailTemplate.design); // Parse JSON
        console.log("✅ Parsed Design:", parsedDesign);
  
        if (Array.isArray(parsedDesign)) {
          setEmailTemplate(parsedDesign); // Set parsed array to state
        } else {
          console.error("❌ Parsed design is not an array:", parsedDesign);
        }
      } catch (error) {
        console.error("❌ Error parsing design JSON:", error);
      }
    }
  }, [emailTemplate.design]);
  
  return (
    <div className="min-h-screen bg-gray-100 bg-gradient-to-r from-teal-200 to-teal-500">
      {/* <EditorHeader viewHTMLCode={(v) => setViewHtmlCode(v)} /> */}
      <EditorHeader viewHTMLCode={handleViewHTMLCode} />

{loading ? (
  <div className="flex justify-center items-center h-screen">
    <h2 className="text-lg font-semibold text-gray-600 animate-pulse">
      Loading template, please wait...
    </h2>
  </div>
) : (
  <div className="grid grid-cols-5">
    <ElementSideBar />
    <div className="col-span-3 bg-gray-200">
      <Canvas viewHTMLCode={viewHTMLCode} closeDialog={() => setViewHtmlCode(false)} />
    </div>
    <Settings />
  </div>
)}

    </div>
  );
}

export default Editor;
