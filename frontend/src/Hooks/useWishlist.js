import { useState, useCallback } from "react";
import api from "../Utils/api";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist
  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/wishlist");
      if (response.data.success) {
        setWishlist(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle wishlist item
  const toggleWishlist = useCallback(
    async (productId, productData = null) => {
      try {
        const response = await api.post("/api/wishlist/toggle", {
          productId,
        });
        if (response.data.success) {
          if (response.data.data.isInWishlist) {
            // Add product - include full product data if available
            if (productData) {
              setWishlist([...wishlist, productData]);
            } else {
              setWishlist([...wishlist, productId]);
            }
          } else {
            // Remove product
            setWishlist(
              wishlist.filter(
                (item) => {
                  const itemId = typeof item === "string" ? item : item._id;
                  return itemId !== productId;
                }
              )
            );
          }
          return response.data.data.isInWishlist;
        }
      } catch (error) {
        console.error("Error toggling wishlist:", error);
        throw error;
      }
    },
    [wishlist]
  );

  // Check if product is in wishlist from backend
  const checkProductInWishlist = useCallback(async (productId) => {
    try {
      const response = await api.get(`/api/wishlist/check/${productId}`);
      if (response.data.success) {
        return response.data.data.isInWishlist;
      }
    } catch (error) {
      console.error("Error checking wishlist:", error);
    }
    return false;
  }, []);

  // Check if product is in wishlist (local state check)
  const isInWishlist = useCallback(
    (productId) => {
      return wishlist.some((item) => {
        const itemId = typeof item === "string" ? item : item._id;
        return itemId === productId;
      });
    },
    [wishlist]
  );

  // Add to wishlist
  const addToWishlist = useCallback(
    async (productId) => {
      try {
        const response = await api.post("/api/wishlist/add", {
          productId,
        });
        if (response.data.success) {
          setWishlist(response.data.data);
          return true;
        }
      } catch (error) {
        console.error("Error adding to wishlist:", error);
        throw error;
      }
    },
    []
  );

  // Remove from wishlist
  const removeFromWishlist = useCallback(
    async (productId) => {
      try {
        const response = await api.post("/api/wishlist/remove", {
          productId,
        });
        if (response.data.success) {
          // Update local state to remove product
          setWishlist(
            wishlist.filter(
              (item) => {
                const itemId = typeof item === "string" ? item : item._id;
                return itemId !== productId;
              }
            )
          );
          return true;
        }
      } catch (error) {
        console.error("Error removing from wishlist:", error);
        throw error;
      }
    },
    [wishlist]
  );

  return {
    wishlist,
    loading,
    fetchWishlist,
    toggleWishlist,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    checkProductInWishlist,
    setWishlist,
  };
};
