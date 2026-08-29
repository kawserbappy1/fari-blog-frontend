"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  //useSyncExternalStore দিয়ে Hydration Mismatch Error সমাধান করার এই উপায়টি useState + useEffect ব্যবহার করার চেয়ে অনেক বেশি ক্লিন এবং পারফর্ম্যান্ট।
  const mounted = useSyncExternalStore(
    () => () => {}, //(subscribe): প্রথম আর্গুমেন্ট হলো একটি সাবস্ক্রিপশন ফাংশন। যেহেতু এখানে আমরা বাইরের কোনো ডাটা সোর্স সাবস্ক্রাইব করছি না, তাই একটি খালি ফাংশন দেওয়া হয়েছে যা কিছুই রিটার্ন করে না।
    () => true, //(getSnapshot): ব্রাউজার বা ক্লায়েন্ট সাইডে পেজ লোড হওয়ার পর এর মান সবসময় true হবে।
    () => false, //(getServerSnapshot): সার্ভারে রেন্ডারিং (SSR) চলার সময় এর মান সবসময় false থাকবে।
  );

  if (!mounted) {
    return <Button variant="ghost" size="icon" aria-label="Toggle theme" />;
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
