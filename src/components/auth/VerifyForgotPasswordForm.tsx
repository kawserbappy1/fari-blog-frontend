"use client";

import { useState } from "react";
import { ArrowLeft, KeyRound, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useVerifyForgotPassword } from "@/hooks/useVerifyForgotPassword";

const VerifyForgotPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");

  const verifyMutation = useVerifyForgotPassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is missing");
      router.push("/forgot-password");
      return;
    }

    if (otp.length !== 6) {
      toast.error("Please enter the 6 digit OTP");
      return;
    }

    verifyMutation.mutate(
      {
        email,
        otp,
      },
      {
        onSuccess: (response) => {
          const resetToken = response.data.resetToken;

          sessionStorage.setItem("forgotPasswordResetToken", resetToken);

          toast.success("OTP verified successfully");

          router.push("/reset-forgot-password");
        },

        onError: (error: any) => {
          toast.error(error?.message || "Invalid or expired OTP");
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <KeyRound className="h-7 w-7 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Verify OTP</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Enter the 6 digit OTP sent to
            </p>

            <p className="mt-1 text-sm font-medium">{email}</p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                disabled={verifyMutation.isPending}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={verifyMutation.isPending || otp.length !== 6}
            >
              {verifyMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>

            <Link
              href="/forgot-password"
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Change Email
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyForgotPasswordForm;
