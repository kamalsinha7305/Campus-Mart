import { useEffect, useMemo, useState } from "react";

import toast from "react-hot-toast";

import { HiOutlineLocationMarker, HiOutlineCash } from "react-icons/hi";

import { FaRupeeSign } from "react-icons/fa";

import axios from "../../../services/axiosInstance";

import useProductListing from "../hooks/useProductListing";

import { PRODUCT_PAYMENT_OPTIONS } from "../constants/productOptions";

const meetupLocations = [
  "Foodys",
  "Main Gate",
  "Library",
  "Academic Block",
  "Hostel Reception",
];

const PricingStep = () => {
  const { formData, updateField, nextStep, prevStep } = useProductListing();

  const [loadingAddress, setLoadingAddress] = useState(false);

  // FETCH ADDRESS

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoadingAddress(true);

        const res = await axios.get("/api/address");

        const addresses = res.data?.addresses || [];

        const defaultAddress =
          addresses.find((addr) => addr.isDefault) || addresses[0];

        updateField("address", defaultAddress || null);
      } catch (error) {
        toast.error("Failed to fetch address");
      } finally {
        setLoadingAddress(false);
      }
    };

    if (!formData.address) {
      fetchAddress();
    }
  }, []);

  // VALIDATION

  const isValid = useMemo(() => {
    return (
      formData.sellingPrice &&
      Number(formData.sellingPrice) > 0 &&
      formData.originalPrice &&
      Number(formData.originalPrice) >= Number(formData.sellingPrice) &&
      formData.paymentMethod &&
      formData.address &&
      formData.termsAccepted
    );
  }, [formData]);

  return (
    <div className="w-full rounded-[28px] border border-[#ECECEC] bg-white shadow-sm p-5 sm:p-7 md:p-8">
      {/* Header */}
      <div>
        <h2 className="text-[1.8rem] font-bold text-[#111827] leading-tight">
          Pricing & Pickup
        </h2>

        <p className="mt-2 text-[#6B7280] text-sm md:text-base">
          Set your pricing and pickup preferences.
        </p>
      </div>

      {/* Main Grid */}
      <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          {/* Selling Price */}
          <div className="rounded-[28px] border border-[#ECECEC] p-5">
            <label className="text-sm font-bold uppercase tracking-wide text-[#111827]">
              Selling Price
            </label>

            <div className="mt-4 flex items-center rounded-2xl border border-[#E5E7EB] overflow-hidden h-[64px]">
              <div className="w-16 h-full bg-[#F9FAFB] flex items-center justify-center">
                <FaRupeeSign className="text-[#6B7280]" />
              </div>

              <input
                type="text"
                value={formData.sellingPrice}
                onChange={(e) =>
                  updateField(
                    "sellingPrice",
                    e.target.value.replace(/[^0-9]/g, ""),
                  )
                }
                placeholder="Enter selling price"
                className="flex-1 h-full px-5 outline-none text-lg font-semibold"
              />
            </div>

            {/* Negotiable */}
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#F9FAFB] p-4">
              <div>
                <h3 className="font-semibold text-[#111827]">Negotiable</h3>

                <p className="mt-1 text-sm text-[#6B7280]">
                  Allow buyers to negotiate.
                </p>
              </div>

              {/* Toggle */}
              <button
                onClick={() => updateField("negotiable", !formData.negotiable)}
                className={`relative w-[56px] h-[32px] rounded-full transition-all duration-300
                
                ${formData.negotiable ? "bg-[#4F46E5]" : "bg-[#D1D5DB]"}`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300
                    
                    ${formData.negotiable ? "translate-x-7" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>

          {/* Original Price */}
          <div className="rounded-[28px] border border-[#ECECEC] p-5">
            <label className="text-sm font-bold uppercase tracking-wide text-[#111827]">
              Original Price
            </label>

            <div className="mt-4 flex items-center rounded-2xl border border-[#E5E7EB] overflow-hidden h-[64px]">
              <div className="w-16 h-full bg-[#F9FAFB] flex items-center justify-center">
                <FaRupeeSign className="text-[#6B7280]" />
              </div>

              <input
                type="text"
                value={formData.originalPrice}
                onChange={(e) =>
                  updateField(
                    "originalPrice",
                    e.target.value.replace(/[^0-9]/g, ""),
                  )
                }
                placeholder="Enter original price"
                className="flex-1 h-full px-5 outline-none text-lg font-semibold"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-[28px] border border-[#ECECEC] p-5">
            <div className="flex items-center gap-3">
              <HiOutlineCash size={22} className="text-[#4F46E5]" />

              <h3 className="font-bold text-[#111827]">Preferred Payment</h3>
            </div>

            {/* Options */}
            <div className="mt-5 flex flex-wrap gap-3">
              {PRODUCT_PAYMENT_OPTIONS.map((option) => {
                const isActive = formData.paymentMethod === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => updateField("paymentMethod", option.value)}
                    className={`h-[52px] px-6 rounded-2xl border text-sm font-semibold transition-all duration-200
                      
                      ${
                        isActive
                          ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                          : "border-[#E5E7EB] hover:border-[#4F46E5]"
                      }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">
          {/* Pickup Address */}
          <div className="rounded-[28px] border border-[#ECECEC] p-5">
            <div className="flex items-center gap-3">
              <HiOutlineLocationMarker size={22} className="text-[#4F46E5]" />

              <h3 className="font-bold text-[#111827]">Pickup Address</h3>
            </div>

            {/* Address */}
            <div className="mt-5 rounded-2xl bg-[#F9FAFB] p-5">
              {loadingAddress ? (
                <p className="text-sm text-[#6B7280]">Loading address...</p>
              ) : formData.address ? (
                <div>
                  <p className="text-sm leading-7 text-[#111827]">
                    {formData.address.address_line || formData.address.line1}
                  </p>

                  <p className="mt-2 text-sm leading-7 text-[#6B7280]">
                    {formData.address.city}, {formData.address.state}
                    <br />
                    {formData.address.pincode}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-red-500">No address found</p>
              )}
            </div>
          </div>

          {/* Meetup */}
          <div className="rounded-[28px] border border-[#ECECEC] p-5">
            <h3 className="font-bold text-[#111827]">Meetup Location</h3>

            <div className="mt-5 flex flex-wrap gap-3">
              {meetupLocations.map((location) => {
                const isActive = formData.meetupLocation === location;

                return (
                  <button
                    key={location}
                    onClick={() => updateField("meetupLocation", location)}
                    className={`h-[48px] px-5 rounded-2xl border text-sm font-semibold transition-all duration-200
                      
                      ${
                        isActive
                          ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                          : "border-[#E5E7EB]"
                      }`}
                  >
                    {location}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Terms */}
          <div className="rounded-[28px] border border-[#ECECEC] bg-[#F9FAFB] p-5">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => updateField("termsAccepted", e.target.checked)}
                className="mt-1"
              />

              <p className="text-sm leading-7 text-[#6B7280]">
                I acknowledge and agree to the marketplace terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 flex items-center justify-between">
        {/* Pagination */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#9CA3AF]">Step 3 of 4</span>

          <div className="flex gap-1">
            <div className="w-3 h-[4px] rounded-full bg-[#16A34A]" />

            <div className="w-3 h-[4px] rounded-full bg-[#16A34A]" />

            <div className="w-7 h-[4px] rounded-full bg-[#4F46E5]" />

            <div className="w-3 h-[4px] rounded-full bg-[#D1D5DB]" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {/* Back */}
          <button
            onClick={prevStep}
            className="h-[54px] px-8 rounded-2xl border border-[#D1D5DB] text-[#111827] font-semibold hover:bg-[#F9FAFB] transition-all duration-200"
          >
            ← Back
          </button>

          {/* Continue */}
          <button
            onClick={nextStep}
            disabled={!isValid}
            className={`h-[54px] px-10 rounded-2xl font-semibold transition-all duration-200
            
            ${
              isValid
                ? "bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-lg shadow-indigo-200"
                : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            Preview →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingStep;
