"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  Heart,
  User,
  Menu,
  X,
  ShoppingBag,
  PawPrint,
  MessageCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getToken, getUserByToken } from "../../actions/userActions";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    let token = getToken("userToken");
    if (token) {
      setUserType("user");
    } else {
      token = getToken("sellerToken");
      if (token) {
        setUserType("seller");
      }
    }
  }, []);

  return (
    <div>
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <PawPrint size={28} />
              <Link href="/" className="titlefont text-2xl font-bold">
                FurEver
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 items-center">
              <Link
                href="/community"
                className="flex items-center gap-1 hover:text-accent transition-colors">
                <Users size={18} /> Community
              </Link>
              <Link
                href="/chat"
                className="flex items-center gap-1 hover:text-accent transition-colors">
                <MessageCircle size={18} /> Chat
              </Link>
              {userType === "seller" && (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1 hover:text-accent transition-colors">
                  <User size={18} /> Dashboard
                </Link>
              )}
              {userType === "user" && (
                <Link
                  href="/store"
                  className="flex items-center gap-1 hover:text-accent transition-colors">
                  <ShoppingBag size={18} /> Pet Store
                </Link>
              )}
              <Link
                href="/street-animals"
                className="flex items-center gap-1 hover:text-accent transition-colors">
                <Heart size={18} /> Street Animals
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-1 hover:text-accent transition-colors">
                <User size={18} /> Profile
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 flex flex-col space-y-4">
              <Link
                href="/"
                className="flex items-center gap-2 hover:text-accent transition-colors">
                <Home size={18} /> Home
              </Link>
              <Link
                href="/street-animals"
                className="flex items-center gap-2 hover:text-accent transition-colors">
                <Heart size={18} /> Street Animals
              </Link>
              <Link
                href="/community"
                className="flex items-center gap-2 hover:text-accent transition-colors">
                <Users size={18} /> Community
              </Link>
              <Link
                href="/chat"
                className="flex items-center gap-2 hover:text-accent transition-colors">
                <MessageCircle size={18} /> Chat
              </Link>
              <Link
                href="/store"
                className="flex items-center gap-2 hover:text-accent transition-colors">
                <ShoppingBag size={18} /> Pet Store
              </Link>
              <Link href="/dashboard">
                <ShoppingBag
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2">
                  <User size={16} /> Dashboard
                </ShoppingBag>
              </Link>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
