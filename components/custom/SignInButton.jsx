"use client";
import React from "react";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserDetail } from "@/app/provider";

function SignInButton() {
    const CreateUser = useMutation(api.users.CreateUser);
    const { userDetail,setUserDetail } = useUserDetail();

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const userInfo = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                }
            );

            const user = userInfo.data;

           

            // Save to Convex DB
          const result =  await CreateUser({
                name: user?.name,
                email: user?.email,
                picture: user?.picture,
            })

            const userDetail = {
                ...user,
                _id:result?.id??result
            }

            if (typeof window !== undefined) {
                localStorage.setItem('userDetail',JSON.stringify(userDetail));
                setUserDetail(user); // Update context state
            }
        },
        onError: (errorResponse) => console.log(errorResponse),
    });

    return <Button onClick={googleLogin} className='text-white font-bold'>Get Started</Button>;
}

export default SignInButton;
