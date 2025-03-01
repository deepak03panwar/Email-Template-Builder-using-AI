"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import Prompt from "@/Data/Prompt";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from 'uuid';
import { useUserDetail } from "@/app/provider";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation"; 


function AIInputBox() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const SaveTemplate = useMutation(api.emailTemplate?.SaveTemplate);
  const { userDetail,setUserDetail } = useUserDetail();
  const router = useRouter();

  const OnGenerate = async () => {

    
    const PROMPT = Prompt.EMAIL_PROMPT + "\n-" + userInput;
    const tid = uuidv4();
    setLoading(true);

    try {
      const result = await axios.post('/api/ai-email-generate', {
         prompt: PROMPT
           });
         console.log("AI API Response:", result.data);
         setLoading(false)

      

      // Extract valid design data
      // const designData = result.data.design;  

      // Save the data in DB
      const resp = await SaveTemplate({
        tid,
        design: result.data,
        email: userDetail?.email,
        description: userInput
      });

      console.log("Template saved successfully!", resp);
      setLoading(false);

      // Navigate user to editor screen
      router.push('/editor/'+tid);

    } catch (e) {
      console.error("Error generating or saving template:", e);
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <p className="mb-2">Provide details about the email template you'd like to create</p>
      <Textarea
        placeholder="Start Writing Here"
        rows={5}
        className="text-xl h-[200px]"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Button className="w-full mt-5" disabled={!userInput.trim() || loading} onClick={OnGenerate}>
        {loading ? (
          <span className="flex items-center">
            <Loader2 className="animate-spin mr-2" /> Please Wait...
          </span>
        ) : "Generate"}
      </Button>
    </div>
  );
}

export default AIInputBox;
