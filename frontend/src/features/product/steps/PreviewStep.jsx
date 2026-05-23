import { useMemo } from "react";

import toast from "react-hot-toast";

import { HiOutlineLocationMarker, HiOutlinePencil } from "react-icons/hi";

import { FaRupeeSign } from "react-icons/fa";

import { MdVerified } from "react-icons/md";

import { useNavigate } from "react-router-dom";

import axios from "../../../services/axiosInstance";

import { uploadImage } from "../../../Utils/imageUpload";

import useProductListing from "../hooks/useProductListing";

import { saveDraftProduct } from "../api/productApi.js";

const PreviewStep = () => {
  const navigate = useNavigate();

  const { formData, prevStep, goToStep, loading, setLoading, resetForm } =
    useProductListing();

  // DISCOUNT
  const discountPercentage = useMemo(() => {
    if (!formData.originalPrice || !formData.sellingPrice) return 0;

    const original = Number(formData.originalPrice);

    const selling = Number(formData.sellingPrice);

    return Math.round(((original - selling) / original) * 100);
  }, [formData.originalPrice, formData.sellingPrice]);

  // SAVE DRAFT
  const handleSaveDraft = async () => {
    try {
      setLoading(true);

      await saveDraftProduct({
        title: formData.title,

        description: formData.description,

        category: formData.category,

        condition: formData.condition,

        selling_price: Number(formData.sellingPrice),

        original_price: Number(formData.originalPrice),

        is_negotiable: formData.negotiable,

        payment_preference: formData.paymentMethod,

        meetup_location: formData.meetupLocation,

        attributes: {
          brand: formData.brand,

          color: formData.color,

          usage_duration: formData.usageDuration,
        },
      });

      toast.success("Draft saved successfully");
    } catch (error) {
      toast.error("Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

  // SUBMIT
  const handlePublish = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // Upload Images
      const uploads = await Promise.all(
        formData.images.map((file) => uploadImage(file)),
      );

      const uploadedUrls = uploads.map((img) => img.url);

      const uploadedFileIds = uploads.map((img) => img.fileId);

      // Create Product
      await axios.post("/api/product", {
        title: formData.title.trim(),

        description: formData.description.trim(),

        category: formData.category,

        condition: formData.condition,

        selling_price: Number(formData.sellingPrice),

        original_price: Number(formData.originalPrice),

        is_negotiable: formData.negotiable,

        payment_preference: formData.paymentMethod,

        images: uploadedUrls,

        image_file_ids: uploadedFileIds,

        pickup_address_snapshot: {
          address_line:
            formData.address?.address_line || formData.address?.line1,

          city: formData.address?.city,

          state: formData.address?.state,

          pincode: formData.address?.pincode,
        },

        meetup_location: formData.meetupLocation,

        attributes: {
          brand: formData.brand,

          color: formData.color,

          usage_duration: formData.usageDuration,
        },
      });

      toast.success("Product listed successfully");

      resetForm();

      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-[28px] border border-[#ECECEC] bg-white shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="relative h-[260px] md:h-[380px] bg-[#F9FAFB]">
        {formData.imagePreviews?.[0] ? (
          <img
            src={formData.imagePreviews[0]}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#9CA3AF]">
            No Image
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Top Actions */}
        <div className="absolute top-5 right-5 flex items-center gap-3">
          <button
            onClick={() => goToStep(1)}
            className="h-11 px-5 rounded-2xl bg-white/90 backdrop-blur-md text-[#111827] font-semibold flex items-center gap-2"
          >
            <HiOutlinePencil size={18} />
            Edit
          </button>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
          {/* Category */}
          <div className="inline-flex rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
            {formData.category?.replaceAll("_", " ")}
          </div>

          {/* Title */}
          <h1 className="mt-5 text-[2rem] md:text-[2.8rem] font-bold text-white leading-tight max-w-3xl">
            {formData.title}
          </h1>

          {/* Price */}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="flex items-center text-white">
              <FaRupeeSign size={24} />

              <span className="text-[2rem] font-bold">
                {formData.sellingPrice}
              </span>
            </div>

            {/* Original */}
            <div className="text-white/70 line-through text-lg">
              ₹{formData.originalPrice}
            </div>

            {/* Discount */}
            {discountPercentage > 0 && (
              <div className="rounded-full bg-[#DCFCE7] px-4 py-2 text-sm font-bold text-[#166534]">
                {discountPercentage}% OFF
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="p-5 sm:p-7 md:p-8">
        {/* Images */}
        <div>
          <h2 className="text-lg font-bold text-[#111827]">Product Gallery</h2>

          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.imagePreviews.map((image, index) => (
              <div
                key={index}
                className="rounded-[24px] overflow-hidden border border-[#ECECEC]"
              >
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-full aspect-square object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-10 grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8">
          {/* LEFT */}
          <div>
            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-[#111827]">
                Product Description
              </h2>

              <p className="mt-5 text-[15px] leading-8 text-[#4B5563] whitespace-pre-line">
                {formData.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="mt-10">
              <h2 className="text-lg font-bold text-[#111827]">
                Product Details
              </h2>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card */}
                {[
                  {
                    label: "Brand",
                    value: formData.brand,
                  },

                  {
                    label: "Color",
                    value: formData.color,
                  },

                  {
                    label: "Condition",

                    value: formData.condition?.replaceAll("_", " "),
                  },

                  {
                    label: "Usage Duration",

                    value: formData.usageDuration?.replaceAll("_", " "),
                  },

                  {
                    label: "Purchase Date",

                    value: formData.purchaseDate,
                  },

                  {
                    label: "Negotiable",

                    value: formData.negotiable ? "Yes" : "No",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-[24px] border border-[#ECECEC] p-5"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-[#9CA3AF]">
                      {item.label}
                    </p>

                    <h3 className="mt-3 text-lg font-semibold text-[#111827] capitalize">
                      {item.value}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">
            {/* Seller Card */}
            <div className="rounded-[28px] border border-[#ECECEC] p-6">
              {/* Seller */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] font-bold text-lg">
                  CM
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#111827]">Campus Mart</h3>

                    <MdVerified className="text-[#2563EB]" />
                  </div>

                  <p className="text-sm text-[#6B7280]">Verified Seller</p>
                </div>
              </div>

              {/* Pickup */}
              <div className="mt-6 rounded-2xl bg-[#F9FAFB] p-5">
                <div className="flex items-start gap-3">
                  <HiOutlineLocationMarker
                    size={22}
                    className="text-[#4F46E5] mt-1"
                  />

                  <div>
                    <h4 className="font-semibold text-[#111827]">
                      Meetup Location
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-[#6B7280]">
                      {formData.meetupLocation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="mt-5 rounded-2xl bg-[#F9FAFB] p-5">
                <h4 className="font-semibold text-[#111827]">Pickup Address</h4>

                <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                  {formData.address?.address_line || formData.address?.line1}
                  <br />
                  {formData.address?.city}, {formData.address?.state}
                  <br />
                  {formData.address?.pincode}
                </p>
              </div>

              {/* Payment */}
              <div className="mt-5 rounded-2xl border border-[#E5E7EB] p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[#9CA3AF]">
                  Preferred Payment
                </p>

                <h4 className="mt-2 text-lg font-semibold capitalize text-[#111827]">
                  {formData.paymentMethod}
                </h4>
              </div>
            </div>

            {/* Save as Draft */}
            <button
              onClick={handleSaveDraft}
              disabled={loading}
              className="h-[54px] rounded-2xl border border-[#D1D5DB] bg-white px-6 font-semibold text-[#111827] hover:bg-[#F9FAFB] transition-all duration-200"
            >
              Save as Draft
            </button>

            {/* Publish */}
            <button
              onClick={handlePublish}
              disabled={loading}
              className={`h-[60px] rounded-2xl font-bold text-lg transition-all duration-200
                
                ${
                  loading
                    ? "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                    : "bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-xl shadow-indigo-200"
                }`}
            >
              {loading ? "Publishing..." : "Publish Product"}
            </button>

            {/* Back */}
            <button
              onClick={prevStep}
              className="h-[54px] rounded-2xl border border-[#D1D5DB] text-[#111827] font-semibold hover:bg-[#F9FAFB] transition-all duration-200"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};;

export default PreviewStep;
