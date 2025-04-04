"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Compass } from "lucide-react";
import CreateCommunityModal from "@/components/pages/community/CommunityForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { getAuthenticatedUser } from "@/../actions/loginActions";
import CommunityCard from "@/components/pages/community/CommunityCard";

export default function CommunityPage() {
  const [communities, setCommunities] = useState([]);
  const [user, setUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    if (typeof window !== "undefined") {
      try {
        const res = await getAuthenticatedUser();
        if (res && res.userType === "user") {
          setToken(res.token);
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Auth verification error:", error);
        setIsLoggedIn(false);
      }

      // Fetch communities regardless of login status
      await fetchCommunities();
    }
  };

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/community");
      const data = await response.json();

      if (data.success) {
        setCommunities(data.communities);
      } else {
        toast.error(data.error || "Failed to fetch communities");
      }
    } catch (error) {
      console.error("Error fetching communities:", error);
      toast.error("Failed to fetch communities");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCommunity = async (communityData) => {
    try {
      if (!token) {
        toast.error("Please login to create a community");
        router.push("/login");
        return;
      }

      const response = await fetch("/api/community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ communityData }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Community created successfully!");
        fetchCommunities();
        setIsCreateModalOpen(false);
      } else {
        toast.error(data.error || "Failed to create community");
      }
    } catch (error) {
      console.error("Error creating community:", error);
      toast.error("Failed to create community");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary p-12">
        <p className="text-secondary">Loading... Please wait</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl titlefont md:p-5 font-bold tracking-tight text-accent">
            Communities
          </h1>
          <p className="mt-2 text-secondary">
            Join communities and connect with others
          </p>

          <Button
            variant="primary"
            onClick={() => {
              if (isLoggedIn) {
                setIsCreateModalOpen(true);
              } else {
                toast.error("Please login to create a community");
                router.push("/login");
              }
            }}
            className="mt-6 bg-ternary text-white hover:scale-105 transition-transform"
            size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Create your own Community
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <Button variant={"primary"} className={"bg-accent text-white"}>
            <Compass className="mr-2 h-4 w-4" />
            Explore
          </Button>
        </div>

        <Separator className="mb-8 bg-white/10" />

        {/* Display communities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.length > 0 ? (
            communities.map((community) => (
              <CommunityCard
                key={community._id}
                community={community}
                currentUser={user}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">
                No communities found. Create one to get started!
              </p>
            </div>
          )}
        </div>

        {isCreateModalOpen && (
          <CreateCommunityModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateCommunity}
          />
        )}
      </div>
    </div>
  );
}
