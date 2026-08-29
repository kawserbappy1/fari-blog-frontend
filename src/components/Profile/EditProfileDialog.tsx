"use client";

import { useEffect, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import type { User } from "@/types/auth";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";

type Props = {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditProfileDialog = ({ user, open, onOpenChange }: Props) => {
  const updateMutation = useUpdateProfile();

  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.profile?.bio || "");
  const [location, setLocation] = useState(user.profile?.location || "");

  const [facebook, setFacebook] = useState(
    user.profile?.socialLinks?.facebook || "",
  );

  const [linkedin, setLinkedin] = useState(
    user.profile?.socialLinks?.linkedin || "",
  );

  const [twitter, setTwitter] = useState(
    user.profile?.socialLinks?.twitter || "",
  );

  const [github, setGithub] = useState(user.profile?.socialLinks?.github || "");

  const [website, setWebsite] = useState(
    user.profile?.socialLinks?.website || "",
  );

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(
    user.profile?.profileImage || null,
  );

  // ==========================================
  // Reset form when user changes
  // ==========================================

  useEffect(() => {
    setName(user.name || "");
    setBio(user.profile?.bio || "");
    setLocation(user.profile?.location || "");

    setFacebook(user.profile?.socialLinks?.facebook || "");
    setLinkedin(user.profile?.socialLinks?.linkedin || "");
    setTwitter(user.profile?.socialLinks?.twitter || "");
    setGithub(user.profile?.socialLinks?.github || "");
    setWebsite(user.profile?.socialLinks?.website || "");

    setPreviewImage(user.profile?.profileImage || null);

    setProfileImage(null);
  }, [user]);

  // ==========================================
  // Image Change
  // ==========================================

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setProfileImage(file);

    const previewUrl = URL.createObjectURL(file);

    setPreviewImage(previewUrl);
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    updateMutation.mutate(
      {
        name,
        bio,
        location,

        socialLinks: {
          facebook,
          linkedin,
          twitter,
          github,
          website,
        },

        ...(profileImage && {
          profileImage,
        }),
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Profile</DialogTitle>

          <DialogDescription>
            Update your profile information. Email and role cannot be changed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ======================================
              Profile Image
          ======================================= */}

          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-background bg-muted shadow-lg">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-muted-foreground">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition hover:scale-105"
              >
                <Camera className="h-4 w-4" />

                <input
                  id="profileImage"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <p className="text-xs text-muted-foreground">
              JPG, PNG or WEBP • Max 5MB
            </p>
          </div>

          <Separator />

          {/* ======================================
              Name
          ======================================= */}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              minLength={3}
              maxLength={50}
            />
          </div>

          {/* ======================================
              Email + Role
          ======================================= */}

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                value={user.email}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>

              <Input
                id="role"
                value={user.role}
                disabled
                className="bg-muted capitalize"
              />
            </div>
          </div>

          {/* ======================================
              Bio
          ======================================= */}

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>

            <Textarea
              id="bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Tell people a little about yourself..."
              maxLength={500}
              rows={4}
            />

            <p className="text-right text-xs text-muted-foreground">
              {bio.length}/500
            </p>
          </div>

          {/* ======================================
              Location
          ======================================= */}

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>

            <Input
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="e.g. Chattogram, Bangladesh"
              maxLength={100}
            />
          </div>

          {/* ======================================
              Social Links
          ======================================= */}

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Social Links</h3>

              <p className="text-sm text-muted-foreground">
                Add your social profiles.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                placeholder="Facebook URL"
                value={facebook}
                onChange={(event) => setFacebook(event.target.value)}
              />

              <Input
                placeholder="LinkedIn URL"
                value={linkedin}
                onChange={(event) => setLinkedin(event.target.value)}
              />

              <Input
                placeholder="Twitter URL"
                value={twitter}
                onChange={(event) => setTwitter(event.target.value)}
              />

              <Input
                placeholder="GitHub URL"
                value={github}
                onChange={(event) => setGithub(event.target.value)}
              />

              <Input
                placeholder="Website URL"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                className="md:col-span-2"
              />
            </div>
          </div>

          {/* ======================================
              Footer
          ======================================= */}

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateMutation.isPending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
