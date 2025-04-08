// seller dashboard
"use client";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";

import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  ShoppingCart,
  Users,
  PackagePlus,
  LogOut,
} from "lucide-react";
import { logout } from "@/lib/userutils";

export default function SellerDashboard() {

  const router = useRouter();

  const [products, setProducts] = useState([]);

  return (
    <div className="flex min-h-screen bg-[#E3DAC9]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#A0785A] text-white p-5 hidden md:block">
        <h2 className="text-2xl font-bold text-center">Seller Dashboard</h2>
        <Separator className="my-4 bg-white" />
        <ul className="space-y-4">
          <li className="flex items-center gap-2 cursor-pointer">
            <Users className="w-5 h-5" /> Customer Requests
          </li>
          <li className="flex items-center gap-2 cursor-pointer">
            <ShoppingCart className="w-5 h-5" /> Orders & Sales
          </li>
          <li className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              router.push("/dashboard/add-product");
            }}
          >
            <PackagePlus className="w-5 h-5" /> Add Product
          </li>
          <li className="flex items-center gap-2 cursor-pointer">
            <BarChart className="w-5 h-5" /> Analytics
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Navbar */}
        <nav className="flex justify-between items-center bg-[#355E3B] text-white p-4 rounded-lg shadow-md">
          <h1 className="text-xl font-bold">Seller Dashboard</h1>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/profile.jpg" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button
              variant="destructive"
              className="flex items-center gap-2"
              onClick={() => {
                logout();
                toast.success("Logout successful", {
                  
                });
              }}
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </nav>

        {/* Tabs for Dashboard Sections */}
        <Tabs defaultValue="products" className="mt-6">
          <TabsList className="bg-[#00693E] text-white space-x-3 transition-all duration-300">
            <TabsTrigger value="products">Your Products</TabsTrigger>
            <TabsTrigger value="requests">Customer Requests</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Products Section */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Your Products</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  List of all your uploaded products.
                </p>
                {/* Product List Goes Here */}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Requests */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Customer Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Manage customer inquiries & requests.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">View your sales performance.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
