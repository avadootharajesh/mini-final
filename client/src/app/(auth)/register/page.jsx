"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RegisterPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (type) => {
    setUser((prevUser) => ({ ...prevUser, userType: type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800"
          placeholder="Enter your password"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800"
          placeholder="Confirm your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-800 text-white py-2 rounded-lg hover:bg-yellow-700 transition duration-300">
        Register as {user.userType}
      </button>
    </form>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg ">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
        <Tabs defaultValue="user" className="w-[400px]">
          <TabsList>
            <TabsTrigger
              value="user"
              onClick={() => handleUserTypeChange("user")}>
              User Account
            </TabsTrigger>
            <TabsTrigger
              value="seller"
              onClick={() => handleUserTypeChange("seller")}>
              Seller Account
            </TabsTrigger>
          </TabsList>
          <TabsContent value="user">{renderForm()}</TabsContent>
          <TabsContent value="seller">{renderForm()}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RegisterPage;
