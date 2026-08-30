"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForgotPassword } from "@/hooks/useForgotPassword";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const forgotMutation = useForgotPassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    forgotMutation.mutate(
      {
        email: email.trim().toLowerCase(),
      },
      {
        onSuccess: (response) => {
          toast.success(
            response?.message || "If an account exists, an OTP has been sent.",
          );

          router.push(
            `/verify-forgot-password?email=${encodeURIComponent(
              email.trim().toLowerCase(),
            )}`,
          );
        },
        onError: (error: any) => {
          toast.error(
            error?.message || "Something went wrong. Please try again.",
          );
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-7 w-7 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Forgot Password?</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email address and we&apos;ll send you an OTP to reset
              your password.
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={forgotMutation.isPending}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={forgotMutation.isPending}
            >
              {forgotMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
