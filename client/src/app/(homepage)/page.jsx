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
        "https://static.vecteezy.com/system/resources/previews/009/792/159/non_2x/veterinarian-putting-a-bandage-on-injured-dog-s-paw-free-vector.jpg",
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
        <section className="bg-secondary py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <div className="inline-block px-4 py-1 bg-accent/30 rounded-full text-secondary-foreground mb-4">
                  <span className="text-sm font-medium tracking-wide">Making a difference together</span>
                </div>
                <h1 className="titlefont text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
                  Helping Paws & Creating Smiles
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                  A platform dedicated to street animal welfare and creating a
                  vibrant pet-loving community. Together, we can make a
                  difference in their lives.
                </p>
                <div className="flex flex-wrap gap-4 pt-6">
                  <Button
                    size="lg"
                    className="bg-primary text-white hover:bg-primary/90 shadow-md">
                    Report Emergency
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5">
                    Adopt a Pet
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-accent/80 border-2 border-white flex items-center justify-center text-xs font-medium text-white">
                        {i}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">500+</span> animals helped this month
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="rounded-2xl overflow-hidden shadow-xl relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/30 to-transparent mix-blend-overlay z-10"></div>
                  <Image
                    src="https://static.independent.co.uk/2022/08/22/15/iStock-1204163981%20%281%29.jpg"
                    alt="Happy dog with owner"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                  <div className="flex items-center gap-3">
                    <Heart className="text-red-500" size={24} />
                    <div>
                      <p className="text-sm font-medium text-primary">Waiting for love</p>
                      <p className="text-xs text-muted-foreground">50+ pets need homes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Street Animal Welfare Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-16">
              <div className="w-16 h-1 bg-accent mb-6"></div>
              <h2 className="titlefont text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
                Street Animal Welfare
              </h2>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                Help us make a difference in the lives of street animals through
                our emergency services and welfare programs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {emergencyServices.map((service) => (
                <Card
                  key={service.id}
                  className="transition-all duration-300 hover:shadow-xl border-0 overflow-hidden bg-secondary">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="bg-accent/80 text-white text-xs px-3 py-1 rounded-full">
                        Emergency
                      </span>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <CardTitle className="text-xl mb-3 text-primary">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-secondary-foreground mb-4">
                      {service.description}
                    </CardDescription>
                    <Link href={`/street-animals/${service.id}`}>
                      <Button
                        variant="ghost"
                        className="text-primary hover:text-accent flex items-center gap-1 p-0">
                        Learn More <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/street-animals">
                <Button className="bg-primary text-white hover:bg-primary/90 shadow-md">
                  View All Street Animal Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Pet Services Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <span className="text-accent font-medium">For Pet Owners</span>
                <h2 className="titlefont text-3xl md:text-4xl font-bold text-primary mt-2">
                  Pet Owner Services
                </h2>
                <div className="w-20 h-1 bg-accent mt-4"></div>
              </div>
              <Link href="/pet-services">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1 border-primary text-primary mt-6 md:mt-0">
                  View All <ArrowRight size={16} />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {petServices.map((service) => (
                <Card
                  key={service.id}
                  className="overflow-hidden transition-all hover:shadow-lg bg-white border-0">
                  <div className="relative h-56">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <CardTitle className="text-primary text-xl">{service.name}</CardTitle>
                    <p className="text-muted-foreground mt-2 mb-6">
                      {service.description}
                    </p>
                    <Button className="bg-primary text-white hover:bg-primary/90 shadow-sm w-full">
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How You Can Help */}
        <section className="py-20 bg-primary/95 text-white relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="titlefont text-3xl md:text-4xl font-bold mb-6 text-white">
                How You Can Help
              </h2>
              <p className="text-lg md:text-xl mb-12 text-white/80">
                There are many ways to make a difference in the lives of animals
                in need. Choose how you'd like to contribute.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-colors">
                <div className="bg-accent p-4 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3">Donate</h3>
                <p className="text-white/80">
                  Support our work with funds that go directly to animal care and rescue operations.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-colors">
                <div className="bg-accent p-4 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3">Volunteer</h3>
                <p className="text-white/80">
                  Give your time and skills to help animals in need through our regular volunteer programs.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-colors">
                <div className="bg-accent p-4 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Home className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3">Foster</h3>
                <p className="text-white/80">
                  Provide a temporary home for animals waiting for adoption. All supplies provided.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-colors">
                <div className="bg-accent p-4 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <PawPrint className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3">Adopt</h3>
                <p className="text-white/80">
                  Give a forever home to an animal in need of love and care. Change a life forever.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Button
                size="lg"
                className="bg-accent text-white hover:bg-accent/90 shadow-lg px-10">
                Get Involved Today
              </Button>
            </div>
          </div>
        </section>

        {/* Impact Metrics Section - NEW */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-primary titlefont text-5xl font-bold">500+</h3>
                <p className="text-secondary mt-2">Animals Rescued</p>
              </div>
              <div className="text-center">
                <h3 className="text-primary titlefont text-5xl font-bold">350+</h3>
                <p className="text-secondary mt-2">Adoptions</p>
              </div>
              <div className="text-center">
                <h3 className="text-primary titlefont text-5xl font-bold">200+</h3>
                <p className="text-secondary mt-2">Volunteers</p>
              </div>
              <div className="text-center">
                <h3 className="text-primary titlefont text-5xl font-bold">50+</h3>
                <p className="text-secondary mt-2">Partner Shelters</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - NEW */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-12">
              <h2 className="titlefont text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
                Success Stories
              </h2>
              <div className="w-16 h-1 bg-accent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story) => (
                <div key={story.id} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">{story.name}</h3>
                  </div>
                  <p className="text-secondary-foreground">{story.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - NEW */}
        <section className="py-16 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h2 className="titlefont text-3xl font-bold text-primary mb-4">Ready to Make a Difference?</h2>
              <p className="text-secondary-foreground mb-8 max-w-2xl mx-auto">
                Join our community of animal lovers today and help us create a better world for our furry friends.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-primary text-white hover:bg-primary/90 shadow-md px-8">
                  Become a Volunteer
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 px-8">
                  Make a Donation
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="titlefont text-2xl font-bold mb-6 flex items-center gap-2">
                <PawPrint size={24} /> FurEver
              </h3>
              <p className="text-white/80 mb-6">
                Dedicated to improving the lives of animals and creating a
                community of pet lovers.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
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
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
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
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
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
              <h3 className="font-bold text-xl mb-6">Street Animals</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/report-emergency"
                    className="text-white/70 hover:text-white transition-colors">
                    Report Emergency
                  </Link>
                </li>
                <li>
                  <Link
                    href="/food-donation"
                    className="text-white/70 hover:text-white transition-colors">
                    Food Donation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sterilization-drives"
                    className="text-white/70 hover:text-white transition-colors">
                    Sterilization Drives
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shelter-locations"
                    className="text-white/70 hover:text-white transition-colors">
                    Shelter Locations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/volunteer"
                    className="text-white/70 hover:text-white transition-colors">
                    Volunteer
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">Pet Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/adoption"
                    className="text-white/70 hover:text-white transition-colors">
                    Adoption
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vet-services"
                    className="text-white/70 hover:text-white transition-colors">
                    Veterinary Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pet-store"
                    className="text-white/70 hover:text-white transition-colors">
                    Pet Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lost-found"
                    className="text-white/70 hover:text-white transition-colors">
                    Lost & Found
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pet-events"
                    className="text-white/70 hover:text-white transition-colors">
                    Pet Events
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">Subscribe</h3>
              <p className="text-white/70 mb-4">
                Stay updated with our newsletter for events, adoption drives and
                more.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white w-full focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button className="w-full bg-accent hover:bg-accent/90">Subscribe</Button>
              </div>
            </div>
          </div>

          <Separator className="my-10 bg-white/20" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} FurEver. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-white/60 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
