"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Home, Heart, Calendar, ArrowRight, PawPrint } from "lucide-react";

export default function HomePage() {
  const emergencyServices = [
    {
      id: 1,
      name: "Injury Reporting",
      description: "Report injured street animals for immediate assistance",
      image:
        "https://images.unsplash.com/photo-1591160690555-5debfba289f0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    },
    {
      id: 2,
      name: "Food Donation",
      description: "Donate leftover pet-friendly food for street animals",
      image:
        "https://images.unsplash.com/photo-1591160690555-5debfba289f0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    },
    {
      id: 3,
      name: "Shelter Locator",
      description: "Find nearby shelters for rescued or injured animals",
      image:
        "https://images.unsplash.com/photo-1591160690555-5debfba289f0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    },
  ];

  const petServices = [
    {
      id: 1,
      name: "Pet Adoption",
      description: "Find your perfect furry companion",
      image:
        "https://images.unsplash.com/photo-1591160690555-5debfba289f0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    },
    {
      id: 2,
      name: "Veterinary Appointments",
      description: "Book online or in-person vet consultations",
      image:
        "https://images.unsplash.com/photo-1591160690555-5debfba289f0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    },
    {
      id: 3,
      name: "Pet Store",
      description: "Premium food, toys and accessories for your pets",
      image:
        "https://images.unsplash.com/photo-1591160690555-5debfba289f0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    },
  ];

  const successStories = [
    {
      id: 1,
      name: "Rocky",
      text: "From street dog to loving home - Rocky was rescued after an injury report on FurEver and now lives with a wonderful family.",
      image:
        "https://images.unsplash.com/photo-1591160690555-5debfba289f0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    },
    {
      id: 2,
      name: "Bella",
      text: "After being spotted through our Lost & Found feature, Bella was reunited with her family within hours of going missing.",
      image:
        "https://images.unsplash.com/photo-1591160690555-5debfba289f0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    },
    {
      id: 3,
      name: "Max",
      text: "Through our sterilization drive, Max and 50 other street dogs received proper healthcare and vaccination, improving their quality of life.",
      image:
        "https://images.unsplash.com/photo-1591160690555-5debfba289f0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 space-y-6">
                <h1 className="titlefont text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
                  Helping Paws & Creating Smiles
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  A platform dedicated to street animal welfare and creating a
                  vibrant pet-loving community. Together, we can make a
                  difference.
                </p>
                <div className="flex gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Report Emergency
                  </Button>
                  <Button size="lg" variant="outline">
                    Adopt a Pet
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="https://static.independent.co.uk/2022/08/22/15/iStock-1204163981%20%281%29.jpg"
                  alt="Happy dog with owner"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Street Animal Welfare Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="titlefont text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
              Street Animal Welfare
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Help us make a difference in the lives of street animals through
              our emergency services and welfare programs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {emergencyServices.map((service) => (
                <Card
                  key={service.id}
                  className="transition-transform hover:scale-[1.02]">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="pt-6 text-center">
                    <CardTitle className="text-xl mb-2">
                      {service.name}
                    </CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Link href={`/street-animals/${service.id}`}>
                      <Button
                        variant="ghost"
                        className="text-accent flex items-center gap-1">
                        Learn More <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/street-animals">
                <Button className="bg-accent/90 text-accent-foreground hover:bg-accent">
                  View All Street Animal Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Pet Services Section */}
        <section className="py-16 bg-accent/10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="titlefont text-3xl font-bold text-primary">
                Pet Owner Services
              </h2>
              <Link href="/pet-services">
                <Button variant="outline" className="flex items-center gap-1">
                  View All <ArrowRight size={16} />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {petServices.map((service) => (
                <Card
                  key={service.id}
                  className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <p className="text-muted-foreground mt-2">
                      {service.description}
                    </p>
                    <Button className="w-full mt-4">Explore</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How You Can Help */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="titlefont text-3xl md:text-4xl font-bold mb-6">
              How You Can Help
            </h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
              There are many ways to make a difference in the lives of animals
              in need.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-primary-foreground/10 p-6 rounded-lg">
                <div className="bg-white p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-red-500" size={24} />
                </div>
                <h3 className="font-bold text-xl mb-2">Donate</h3>
                <p className="text-primary-foreground/80">
                  Support our work with funds that go directly to animal care.
                </p>
              </div>

              <div className="bg-primary-foreground/10 p-6 rounded-lg">
                <div className="bg-white p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-blue-500" size={24} />
                </div>
                <h3 className="font-bold text-xl mb-2">Volunteer</h3>
                <p className="text-primary-foreground/80">
                  Give your time and skills to help animals in need.
                </p>
              </div>

              <div className="bg-primary-foreground/10 p-6 rounded-lg">
                <div className="bg-white p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Home className="text-green-500" size={24} />
                </div>
                <h3 className="font-bold text-xl mb-2">Foster</h3>
                <p className="text-primary-foreground/80">
                  Provide a temporary home for animals waiting for adoption.
                </p>
              </div>

              <div className="bg-primary-foreground/10 p-6 rounded-lg">
                <div className="bg-white p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <PawPrint className="text-amber-500" size={24} />
                </div>
                <h3 className="font-bold text-xl mb-2">Adopt</h3>
                <p className="text-primary-foreground/80">
                  Give a forever home to an animal in need of love.
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 mt-10">
              Get Involved Today
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary-foreground text-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="titlefont text-xl font-bold mb-4 flex items-center gap-2">
                <PawPrint size={20} /> FurEver
              </h3>
              <p className="text-secondary/80 mb-4">
                Dedicated to improving the lives of animals and creating a
                community of pet lovers.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-secondary hover:text-accent transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-secondary hover:text-accent transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-secondary hover:text-accent transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M22 4S17.5 8.5 12 8.5 2 4 2 4m20 16.5S17.5 16 12 16s-10 4.5-10 4.5"></path>
                    <path d="M22 4c0 0-7.5 8-10 8s-10-8-10-8"></path>
                    <path d="M2 20.5C2 15 7 8.5 12 8.5s10 6.5 10 12"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Street Animals</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/report-emergency"
                    className="hover:text-accent transition-colors">
                    Report Emergency
                  </Link>
                </li>
                <li>
                  <Link
                    href="/food-donation"
                    className="hover:text-accent transition-colors">
                    Food Donation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sterilization-drives"
                    className="hover:text-accent transition-colors">
                    Sterilization Drives
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shelter-locations"
                    className="hover:text-accent transition-colors">
                    Shelter Locations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/volunteer"
                    className="hover:text-accent transition-colors">
                    Volunteer
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Pet Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/adoption"
                    className="hover:text-accent transition-colors">
                    Adoption
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vet-services"
                    className="hover:text-accent transition-colors">
                    Veterinary Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pet-store"
                    className="hover:text-accent transition-colors">
                    Pet Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lost-found"
                    className="hover:text-accent transition-colors">
                    Lost & Found
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pet-events"
                    className="hover:text-accent transition-colors">
                    Pet Events
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Subscribe</h3>
              <p className="text-secondary/80 mb-4">
                Stay updated with our newsletter for events, adoption drives and
                more.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-md text-primary w-full"
                />
                <Button className="whitespace-nowrap">Subscribe</Button>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-secondary/20" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary/80 text-sm">
              © {new Date().getFullYear()} FurEver. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="hover:text-accent transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
