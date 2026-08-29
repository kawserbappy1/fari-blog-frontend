//এটার main কাজ হলো:
//পুরো application-এর মধ্যে TanStack Query ব্যবহার করার জন্য একটি Query Client তৈরি করে React application-এর সবাইকে সেটা available করে দেওয়া।

"use client";
//1.QueryClient--এটা হচ্ছে TanStack Query-এর brain/manager। এটা server থেকে আসা data manage করে। এই data গুলো browser-এ কোথায় থাকবে, কখন আবার server থেকে আনবে, কোন data fresh, কোনটা পুরোনো—এসব QueryClient manage করে।
//2.QueryClientProvider --তৈরি করা QueryClient-কে application-এর সব child component-এর কাছে পৌঁছে দেওয়া।
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
//QueryClient-এর জন্য useState কেন? ---তুমি যদি সরাসরি লিখতে:const queryClient = new QueryClient();তাহলে component render হওয়ার সময় নতুন QueryClient তৈরি হওয়ার সম্ভাবনা থাকে।কিন্তু আমরা চাই:এই component-এর lifetime-এ একই QueryClient instance ব্যবহার হোক।

type props = {
  children: React.ReactNode;
};

export default function QueryProvider({ children }: props) {
  //এখানে একটা state তৈরি হচ্ছে। কিন্তু দেখো:দুইটা value সাধারণত থাকে:কিন্তু এখানে setter নেই:কারণ আমরা QueryClient পরিবর্তন করব না। আমাদের শুধু initial QueryClient দরকার।
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            //staleTime মানে:কতক্ষণ fetched data-কে TanStack Query fresh মনে করবে। যদি staleTime না দাও, তাহলে unnecessary API request বেশি হতে পারে।
            staleTime: 60 * 1000,
            //refetchOnWindowFocus: ধরো তোমার blog application-এ data প্রতি second পরিবর্তন হয় না তাই user শুধু tab change করলেই আবার fetched করানো unnecessary হতে পারে। তুমি চাইলে controlled refetch করতে পারো।
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
