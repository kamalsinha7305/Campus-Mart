import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import { saveDraftToLocal, getDraftFromLocal } from "../utils/draftStorage";

const ProductListingContext = createContext();

const initialFormData = {
  // Basic Info
  title: "",
  description: "",
  category: "",
  condition: "",
  usageDuration: "",
  brand: "",
  color: "",
  purchaseDate: "",

  // Images
  images: [],
  imagePreviews: [],

  // Pricing
  sellingPrice: "",
  originalPrice: "",
  negotiable: false,
  paymentMethod: "",

  // Address
  address: null,
  meetupLocation: "Foodys",

  // Terms
  termsAccepted: false,
};

export const ProductListingProvider = ({ children }) => {
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  // LOAD DRAFT
  useEffect(() => {
    const savedDraft = getDraftFromLocal();

    if (savedDraft) {
      setFormData(savedDraft);
    }
  }, []);

  // STEP NAVIGATION
  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const goToStep = useCallback((stepNumber) => {
    setStep(stepNumber);
  }, []);

  // UPDATE FIELD
  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // UPDATE MULTIPLE FIELDS
  const updateFormData = useCallback((values) => {
    setFormData((prev) => ({
      ...prev,
      ...values,
    }));
  }, []);

  // RESET
  const resetForm = useCallback(() => {
    setFormData(initialFormData);

    setStep(1);
  }, []);

  // AUTO SAVE DRAFT
  useEffect(() => {
    saveDraftToLocal(formData);
  }, [formData]);

  // CONTEXT VALUE
  const value = useMemo(
    () => ({
      step,
      setStep,

      loading,
      setLoading,

      formData,
      setFormData,

      nextStep,
      prevStep,
      goToStep,

      updateField,
      updateFormData,

      resetForm,
    }),
    [
      step,
      loading,
      formData,

      nextStep,
      prevStep,
      goToStep,

      updateField,
      updateFormData,

      resetForm,
    ],
  );

  return (
    <ProductListingContext.Provider value={value}>
      {children}
    </ProductListingContext.Provider>
  );
};;

export const useProductListingContext = () => {
  const context = useContext(ProductListingContext);

  if (!context) {
    throw new Error(
      "useProductListingContext must be used inside ProductListingProvider",
    );
  }

  return context;
};
