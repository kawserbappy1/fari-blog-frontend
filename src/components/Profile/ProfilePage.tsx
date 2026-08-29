"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Edit3,
  Globe,
  MapPin,
  ShieldCheck,
  UserRound,
  Mail,
} from "lucide-react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import EditProfileDialog from "./EditProfileDialog";

const ProfilePage = () => {
  const { data: user, isLoading, isError } = useCurrentUser();

  const [editOpen, setEditOpen] = useState(false);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-muted/30 py-10">
        <div className="mx-auto max-w-5xl px-4">
          <Skeleton className="h-72 w-full rounded-3xl" />

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl md:col-span-2" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Unable to load profile</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Please login again and try again.
          </p>
        </div>
      </main>
    );
  }

  const profile = user.profile;

  const initials = user.name?.trim().charAt(0).toUpperCase() || "U";

  const socialLinks = profile?.socialLinks;

  return (
    <>
      <main className="min-h-screen bg-muted/30 py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-4">
          {/* ======================================
              Hero
          ======================================= */}

          <section className="relative overflow-hidden rounded-3xl border bg-background shadow-sm">
            {/* Background */}

            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />

            <div className="relative px-6 pb-8 pt-12 md:px-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                {/* Profile Identity */}

                <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                  {/* Avatar */}

                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-background bg-muted shadow-xl">
                    {profile?.profileImage ? (
                      <Image
                        src={profile.profileImage}
                        alt={user.name}
                        fill
                        priority
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-bold text-primary">
                        {initials}
                      </div>
                    )}
                  </div>

                  {/* Name */}

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-3xl font-bold tracking-tight">
                        {user.name}
                      </h1>

                      {user.emailVerified && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </div>

                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </p>

                    {profile?.location && (
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {profile.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Edit */}

                <Button onClick={() => setEditOpen(true)} className="gap-2">
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </section>

          {/* ======================================
              Main Content
          ======================================= */}

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {/* ====================================
                About
            ===================================== */}

            <section className="rounded-2xl border bg-background p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold">About Me</h2>

                  <p className="text-xs text-muted-foreground">
                    Personal information
                  </p>
                </div>
              </div>

              <p className="text-sm leading-7 text-muted-foreground">
                {profile?.bio ||
                  "No bio added yet. Tell people something about yourself."}
              </p>
            </section>

            {/* ====================================
                Account Information
            ===================================== */}

            <section className="rounded-2xl border bg-background p-6 shadow-sm md:col-span-2">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold">Account Information</h2>

                  <p className="text-xs text-muted-foreground">
                    Your account details
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <InfoItem
                  label="Email"
                  value={user.email}
                  icon={<Mail className="h-4 w-4" />}
                />

                <InfoItem
                  label="Role"
                  value={user.role}
                  icon={<ShieldCheck className="h-4 w-4" />}
                />

                <InfoItem
                  label="Auth Provider"
                  value={user.authProvider}
                  icon={<UserRound className="h-4 w-4" />}
                />

                <InfoItem
                  label="Account Status"
                  value={user.activeStatus}
                  icon={<CheckCircle2 className="h-4 w-4" />}
                />

                <InfoItem
                  label="Email Verification"
                  value={user.emailVerified ? "Verified" : "Not verified"}
                  icon={<CheckCircle2 className="h-4 w-4" />}
                />

                <InfoItem
                  label="Member Since"
                  value={formatDate(user.createdAt)}
                  icon={<CalendarDays className="h-4 w-4" />}
                />
              </div>
            </section>

            {/* ====================================
                Social Links
            ===================================== */}

            <section className="rounded-2xl border bg-background p-6 shadow-sm md:col-span-3">
              <div className="mb-5">
                <h2 className="font-semibold">Social Links</h2>

                <p className="text-sm text-muted-foreground">
                  Connect with me around the web
                </p>
              </div>

              <Separator className="mb-5" />

              <div className="flex flex-wrap gap-3">
                {socialLinks?.facebook && (
                  <SocialButton
                    href={socialLinks.facebook}
                    label="Facebook"
                    icon={<Globe className="h-4 w-4" />}
                  />
                )}

                {socialLinks?.linkedin && (
                  <SocialButton
                    href={socialLinks.linkedin}
                    label="LinkedIn"
                    icon={<FaLinkedin className="h-4 w-4" />}
                  />
                )}

                {socialLinks?.twitter && (
                  <SocialButton
                    href={socialLinks.twitter}
                    label="Twitter"
                    icon={<FaTwitter className="h-4 w-4" />}
                  />
                )}

                {socialLinks?.github && (
                  <SocialButton
                    href={socialLinks.github}
                    label="GitHub"
                    icon={<FaGithub className="h-4 w-4" />}
                  />
                )}

                {socialLinks?.website && (
                  <SocialButton
                    href={socialLinks.website}
                    label="Website"
                    icon={<Globe className="h-4 w-4" />}
                  />
                )}

                {!socialLinks?.facebook &&
                  !socialLinks?.linkedin &&
                  !socialLinks?.twitter &&
                  !socialLinks?.github &&
                  !socialLinks?.website && (
                    <p className="text-sm text-muted-foreground">
                      No social links added yet.
                    </p>
                  )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ========================================
          Edit Dialog
      ========================================= */}

      <EditProfileDialog
        user={user}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
};

export default ProfilePage;

// ============================================================
// Helper Components
// ============================================================

type InfoItemProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

const InfoItem = ({ label, value, icon }: InfoItemProps) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-muted/30 p-4">
      <div className="mt-0.5 text-primary">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>

        <p className="mt-1 truncate text-sm font-medium capitalize">{value}</p>
      </div>
    </div>
  );
};

type SocialButtonProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const SocialButton = ({ href, label, icon }: SocialButtonProps) => {
  return (
    <Button asChild variant="outline" className="gap-2">
      <a href={href} target="_blank" rel="noopener noreferrer">
        {icon}
        {label}
      </a>
    </Button>
  );
};

// ============================================================
// Date Formatter
// ============================================================

const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};
