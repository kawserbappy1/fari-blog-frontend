"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

type PasswordField = "current" | "new" | "confirm";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState<
    Record<PasswordField, boolean>
  >({
    current: false,
    new: false,
    confirm: false,
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePassword = (field: PasswordField) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const passwordChecks = useMemo(
    () => ({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
      special: /[^A-Za-z0-9]/.test(newPassword),
    }),
    [newPassword],
  );

  const strength = Object.values(passwordChecks).filter(Boolean).length;

  const strengthLabel =
    strength === 0
      ? ""
      : strength <= 2
        ? "Weak"
        : strength <= 3
          ? "Medium"
          : strength === 4
            ? "Strong"
            : "Very Strong";

  const strengthValue = (strength / 5) * 100;

  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;

  const isValid =
    currentPassword.length > 0 &&
    passwordChecks.length &&
    passwordChecks.uppercase &&
    passwordChecks.lowercase &&
    passwordChecks.number &&
    passwordChecks.special &&
    passwordsMatch;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    console.log({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to profile
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols">
          <Card className="overflow-hidden border-border/60 shadow-sm">
            <CardHeader className="border-b bg-background px-6 py-6 md:px-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <KeyRound className="h-6 w-6" />
                </div>

                <div>
                  <CardTitle className="text-xl md:text-2xl">
                    Change Password
                  </CardTitle>

                  <CardDescription className="mt-1">
                    Update your password to keep your account secure.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-6 py-6 md:px-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="current-password"
                      type={showPassword.current ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your current password"
                      className="h-11 pl-10 pr-10"
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      onClick={() => togglePassword("current")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={
                        showPassword.current ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword.current ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="new-password"
                      type={showPassword.new ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="h-11 pl-10 pr-10"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() => togglePassword("new")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={
                        showPassword.new ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword.new ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {newPassword.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Password strength
                        </span>

                        <span
                          className={
                            strength <= 2
                              ? "text-destructive"
                              : strength <= 3
                                ? "text-yellow-600"
                                : "text-green-600"
                          }
                        >
                          {strengthLabel}
                        </span>
                      </div>

                      <Progress value={strengthValue} />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="confirm-password"
                      type={showPassword.confirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your new password"
                      className="h-11 pl-10 pr-10"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() => togglePassword("confirm")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={
                        showPassword.confirm ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword.confirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {confirmPassword.length > 0 && (
                    <div
                      className={`flex items-center gap-2 text-xs ${
                        passwordsMatch ? "text-green-600" : "text-destructive"
                      }`}
                    >
                      {passwordsMatch ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <X className="h-3.5 w-3.5" />
                      )}

                      {passwordsMatch
                        ? "Passwords match"
                        : "Passwords do not match"}
                    </div>
                  )}
                </div>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/profile">Cancel</Link>
                  </Button>

                  <Button type="submit" disabled={!isValid} className="gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <CardTitle className="text-base">
                      Password Security
                    </CardTitle>

                    <CardDescription className="text-xs">
                      Follow these recommendations
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <PasswordRule
                  valid={passwordChecks.length}
                  text="At least 8 characters"
                />

                <PasswordRule
                  valid={passwordChecks.uppercase}
                  text="One uppercase letter"
                />

                <PasswordRule
                  valid={passwordChecks.lowercase}
                  text="One lowercase letter"
                />

                <PasswordRule valid={passwordChecks.number} text="One number" />

                <PasswordRule
                  valid={passwordChecks.special}
                  text="One special character"
                />
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-primary/[0.03] shadow-sm">
              <CardContent className="p-5">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                  <div>
                    <h3 className="text-sm font-semibold">
                      Keep your account safe
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Never share your password with anyone. Use a unique
                      password that you do not use on other websites.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

type PasswordRuleProps = {
  valid: boolean;
  text: string;
};

const PasswordRule = ({ valid, text }: PasswordRuleProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full ${
          valid
            ? "bg-green-100 text-green-600"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <Check className="h-3 w-3" />
      </div>

      <span
        className={`text-xs ${
          valid ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export default ChangePassword;
