"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Loader2, ShieldCheck, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// OTP Validation Schema
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

// Error Message Helper
function getErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return fallback;
}

export function OtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Email comes from: otp?email=example@gmail.com
  const email = searchParams.get("email");
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // OTP Timer 5 Minutes = 300 Seconds
  const [timeLeft, setTimeLeft] = useState<number>(300);
  // Resend Cooldown 30 Seconds
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));

      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format Timer
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0",
    )}`;
  };

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),

    defaultValues: {
      otp: "",
    },
  });

  const verifyMutation = useMutation({
    mutationFn: async (otp: string) => {
      // Check Email
      if (!email) {
        throw new Error(
          "Verification email is missing. Please register again.",
        );
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      return data;
    },
    onSuccess: () => {
      setServerError(null);
      setSuccessMessage("Account verified successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    },
    onError: (error: unknown) => {
      setSuccessMessage(null);
      setServerError(
        getErrorMessage(
          error,
          "Invalid OTP. Please check the code and try again.",
        ),
      );
    },
  });

  // RESEND OTP MUTATION
  const resendMutation = useMutation({
    mutationFn: async () => {
      if (!email) {
        throw new Error("Email is missing. Please register again.");
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/resend-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      return data;
    },
    onSuccess: (data) => {
      setServerError(null);
      setSuccessMessage(
        data?.message || "A new OTP has been sent to your email.",
      );
      // setTimeLeft(300);
      setResendCooldown(30);
    },
    onError: (error: unknown) => {
      setSuccessMessage(null);
      setServerError(
        getErrorMessage(error, "Failed to resend OTP. Please try again."),
      );
    },
  });
  // Submit Handler
  const onSubmit = (data: OtpFormValues) => {
    setServerError(null);
    setSuccessMessage(null);
    if (!email) {
      setServerError("Verification email is missing. Please register again.");
      return;
    }
    if (timeLeft <= 0) {
      setServerError("Your OTP has expired. Please request a new OTP.");
      return;
    }
    // Verify OTP
    verifyMutation.mutate(data.otp);
  };

  const handleResendOtp = () => {
    if (!email) {
      setServerError("Verification email is missing. Please register again.");
      return;
    }
    // Cooldown Check
    if (resendCooldown > 0) {
      return;
    }
    setServerError(null);
    setSuccessMessage(null);
    resendMutation.mutate();
  };

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
        <Card className="w-full max-w-md text-center shadow-lg">
          <CardHeader>
            <div className="mb-2 flex justify-center">
              <div className="rounded-full bg-destructive/10 p-3 text-destructive">
                <ShieldCheck className="h-8 w-8" />
              </div>
            </div>

            <CardTitle className="text-2xl font-bold">
              Verification Link Invalid
            </CardTitle>

            <CardDescription>
              We could not find the email address required for verification.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button className="w-full" onClick={() => router.push("/register")}>
              Back to Registration
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        {/* =====================================
            // Header
        ====================================== */}

        <CardHeader className="space-y-1">
          <div className="mb-2 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <ShieldCheck className="h-8 w-8" />
            </div>
          </div>

          <CardTitle className="text-2xl font-bold">
            Verify Your Email
          </CardTitle>

          <CardDescription>
            We have sent a 6-digit verification code to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>

        {/* =====================================
            Content
        ====================================== */}

        <CardContent>
          {/* ===================================
              Server Error
          ==================================== */}

          {serverError && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          {/* ===================================
              Success Message
          ==================================== */}

          {successMessage && (
            <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-600">
              {successMessage}
            </div>
          )}

          {/* ===================================
              OTP Timer
          ==================================== */}

          <div className="mb-6 flex items-center justify-center gap-1.5 rounded-md bg-secondary/50 py-2 text-sm font-medium text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />

            <span>Code expires in:</span>

            <span
              className={`font-bold ${
                timeLeft < 60 ? "animate-pulse text-red-500" : "text-primary"
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* ===================================
              OTP Form
          ==================================== */}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* OTP Input */}

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                disabled={verifyMutation.isPending || timeLeft <= 0}
                onChange={(value) => {
                  setValue("otp", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
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

            {/* OTP Validation Error */}

            {errors.otp && (
              <p className="text-xs text-red-500">{errors.otp.message}</p>
            )}

            {/* =================================
                Verify Button
            ================================== */}

            <Button
              className="w-full"
              type="submit"
              disabled={
                verifyMutation.isPending ||
                timeLeft <= 0 ||
                resendMutation.isPending
              }
            >
              {verifyMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : timeLeft <= 0 ? (
                "OTP Expired"
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>
        </CardContent>

        {/* =====================================
            Footer / Resend OTP
        ====================================== */}

        <CardFooter className="flex flex-col gap-3 border-t p-4 text-sm text-muted-foreground">
          <p>Didn&apos;t receive the code?</p>

          {/* ===================================
              Resend Button
          ==================================== */}

          {resendCooldown > 0 ? (
            <p className="text-xs">
              You can resend OTP in{" "}
              <span className="font-semibold text-primary">
                {resendCooldown}s
              </span>
            </p>
          ) : (
            <Button
              type="button"
              variant="ghost"
              onClick={handleResendOtp}
              disabled={resendMutation.isPending || verifyMutation.isPending}
              className="text-primary hover:text-primary"
            >
              {resendMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Resend OTP
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
