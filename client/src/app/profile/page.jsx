"use client";
import React, { useState, useEffect } from "react";
import { getAuthenticatedUser } from "../../../actions/loginActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PawPrint, Mail, Calendar, Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    name: "",
    bio: "",
    profilePicture: ""
  });
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getAuthenticatedUser();
        if (!userData) {
          window.location.href = "/login";
          return;
        }
        setUser(userData);
        setUpdatedProfile({
          name: userData.name || "",
          bio: userData.bio || "",
          profilePicture: userData.profilePicture || ""
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async () => {
    try {
      setUpdating(true);
      const response = await axios.put('/api/user/profile', updatedProfile);
      
      if (response.data.success) {
        setUser(prev => ({
          ...prev,
          ...updatedProfile
        }));
        setIsEditing(false);
        toast.success("Profile updated successfully");
      } else {
        toast.error(response.data.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Get a default avatar based on user's ID or name
  const getDefaultAvatar = () => {
    if (!user) return "/default-avatar.svg";
    
    // Use the last digit of the user ID to select between avatars (or use name's length if no ID)
    const idLastChar = user._id ? user._id.slice(-1) : user.name?.length.toString().slice(-1) || "0";
    const num = parseInt(idLastChar, 10) % 3; // Use modulo 3 since we have 3 avatars now
    
    // Choose from 3 default avatars
    if (num === 0) return "/default-avatar.svg";    // Fun emoji style
    if (num === 1) return "/default-avatar-2.svg";  // Adventurer style
    return "/default-avatar-3.svg";                 // Bottts style (robot)
  };

  const handleLogout = () => {
    // You could add any logout logic here (clearing tokens, etc.)
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-2xl flex items-center gap-2">
              <PawPrint className="h-6 w-6 text-primary" />
              {isEditing ? "Edit Profile" : "My Profile"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32 border-4 border-primary/10">
                  {user.profilePicture ? (
                    <AvatarImage src={user.profilePicture} />
                  ) : (
                    <AvatarImage src={getDefaultAvatar()} />
                  )}
                  <AvatarFallback className="text-2xl bg-primary/10">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Input
                    name="profilePicture"
                    value={updatedProfile.profilePicture}
                    onChange={handleInputChange}
                    placeholder="Profile picture URL"
                    className="w-full max-w-[250px]"
                  />
                )}
              </div>

              <div className="flex-1 space-y-4 w-full text-center md:text-left">
                {isEditing ? (
                  <>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Name</label>
                      <Input
                        name="name"
                        value={updatedProfile.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Bio</label>
                      <Textarea
                        name="bio"
                        value={updatedProfile.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself"
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2 justify-end pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        disabled={updating}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleProfileUpdate}
                        disabled={updating}
                      >
                        {updating ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h2 className="text-2xl font-semibold">{user.name}</h2>
                      <p className="text-muted-foreground flex items-center gap-1 mt-1 justify-center md:justify-start">
                        <Mail className="h-4 w-4" /> {user.email}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1 justify-center md:justify-start">
                        <Calendar className="h-4 w-4" /> Member since {formatDate(user.createdAt)}
                      </p>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">About Me</h3>
                      <p className="text-muted-foreground">
                        {user.bio || "No bio provided yet."}
                      </p>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <Button 
                        variant="destructive" 
                        onClick={handleLogout}
                        className="flex items-center gap-2"
                      >
                        <LogOut size={16} /> Logout
                      </Button>
                      <Button onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 