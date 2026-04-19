import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { baseURL } from "../Common/SummaryApi";
import SummaryApi from "../Common/SummaryApi";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize user from localStorage cache
  useEffect(() => {
    const cachedUser = localStorage.getItem("cachedUserDetails");
    if (cachedUser) {
      try {
        setUserDetails(JSON.parse(cachedUser));
      } catch (err) {
        console.error("Error parsing cached user:", err);
      }
    }

    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch user profile
  const fetchUserProfile = useCallback(async () => {
    try {
      const authStatus = localStorage.getItem("isAuthenticated");
      if (!authStatus || authStatus !== "true") {
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await axios({
        method: SummaryApi.userProfile.method,
        url: `${baseURL}${SummaryApi.userProfile.url}`,
        withCredentials: true,
      });

      if (response.data.success) {
        setUserDetails(response.data.user);
        setIsLoggedIn(true);
        // Cache user details in localStorage
        localStorage.setItem(
          "cachedUserDetails",
          JSON.stringify(response.data.user)
        );
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("cachedUserDetails");
        setIsLoggedIn(false);
        setUserDetails(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Update specific user fields without full refetch
  const updateUserDetails = useCallback((updatedFields) => {
    setUserDetails((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem("cachedUserDetails", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear user data on logout
  const clearUserData = useCallback(() => {
    setUserDetails(null);
    setIsLoggedIn(false);
    localStorage.removeItem("cachedUserDetails");
    localStorage.removeItem("isAuthenticated");
  }, []);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        isLoggedIn,
        loading,
        setUserDetails,
        setIsLoggedIn,
        fetchUserProfile,
        updateUserDetails,
        clearUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
