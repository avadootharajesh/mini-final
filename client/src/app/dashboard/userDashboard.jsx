// user dashboard
"use client";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios from "axios";

export default function UserDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md">
        <CardContent>
          <CardTitle className="text-center">User Dashboard</CardTitle>
          <div className="mt-4">
            <p>Welcome to the user dashboard!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
