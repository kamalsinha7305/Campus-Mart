import { useEffect, useMemo, useRef, useState } from "react";

import toast from "react-hot-toast";

import { HiOutlineTrash, HiOutlinePhotograph } from "react-icons/hi";

import useProductListing from "../hooks/useProductListing";

const MAX_IMAGES = 5;

const ImagesStep = () => {
  const fileInputRef = useRef(null);

  const { formData, updateField, nextStep, prevStep } = useProductListing();

  const [isDragging, setIsDragging] = useState(false);

  // =========================
  // VALIDATION
  // =========================

  const isValid = useMemo(() => {
    return formData.images.length > 0;
  }, [formData.images]);

  // =========================
  // CLEANUP URLS
  // =========================

  useEffect(() => {
    return () => {
      formData.imagePreviews.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  // =========================
  // PROCESS FILES
  // =========================

  const processFiles = (files) => {
    const fileArray = Array.from(files);

    const remainingSlots = MAX_IMAGES - formData.images.length;

    if (remainingSlots <= 0) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);

      return;
    }

    const selectedFiles = fileArray.slice(0, remainingSlots);

    const validFiles = [];

    const previewUrls = [];

    selectedFiles.forEach((file) => {
      if (
        !["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
          file.type,
        )
      ) {
        toast.error("Only PNG, JPG & WEBP images are allowed");

        return;
      }

      validFiles.push(file);

      previewUrls.push(URL.createObjectURL(file));
    });

    if (validFiles.length === 0) return;

    updateField("images", [...formData.images, ...validFiles]);

    updateField("imagePreviews", [...formData.imagePreviews, ...previewUrls]);
  };

  // =========================
  // INPUT CHANGE
  // =========================

  const handleInputChange = (e) => {
    processFiles(e.target.files);

    e.target.value = null;
  };

  // =========================
  // REMOVE IMAGE
  // =========================

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];

    const updatedPreviews = [...formData.imagePreviews];

    URL.revokeObjectURL(updatedPreviews[index]);

    updatedImages.splice(index, 1);

    updatedPreviews.splice(index, 1);

    updateField("images", updatedImages);

    updateField("imagePreviews", updatedPreviews);
  };

  // =========================
  // DRAG EVENTS
  // =========================

  const handleDragOver = (e) => {
    e.preventDefault();

    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setIsDragging(false);

    processFiles(e.dataTransfer.files);
  };

  return (
    <div className="w-full rounded-[28px] border border-[#ECECEC] bg-white shadow-sm p-5 sm:p-7 md:p-8">
      {/* Header */}
      <div>
        <h2 className="text-[1.8rem] font-bold text-[#111827] leading-tight">
          Upload Product Images
        </h2>

        <p className="mt-2 text-[#6B7280] text-sm md:text-base">
          Add clear images to increase buyer trust and improve listing
          engagement.
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        className={`mt-8 rounded-[28px] border-2 border-dashed p-8 md:p-10 transition-all duration-200 cursor-pointer
        
        ${isDragging ? "border-[#4F46E5] bg-[#EEF2FF]" : "border-[#D1D5DB]"}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={handleInputChange}
        />

        <div className="flex flex-col items-center justify-center text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-3xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
            <HiOutlinePhotograph size={40} />
          </div>

          {/* Heading */}
          <h3 className="mt-6 text-[1.4rem] font-bold text-[#111827]">
            Upload Product Photos
          </h3>

          {/* Description */}
          <p className="mt-3 max-w-md text-sm md:text-base text-[#6B7280] leading-7">
            Drag and drop your images here or click to browse from your device.
          </p>

          {/* Info */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <div className="rounded-full bg-[#F3F4F6] px-4 py-2 text-xs font-medium text-[#374151]">
              PNG
            </div>

            <div className="rounded-full bg-[#F3F4F6] px-4 py-2 text-xs font-medium text-[#374151]">
              JPG
            </div>

            <div className="rounded-full bg-[#F3F4F6] px-4 py-2 text-xs font-medium text-[#374151]">
              WEBP
            </div>

            <div className="rounded-full bg-[#EEF2FF] px-4 py-2 text-xs font-semibold text-[#4F46E5]">
              Max {MAX_IMAGES} images
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Images */}
      {formData.imagePreviews.length > 0 && (
        <div className="mt-10">
          {/* Top */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#111827]">
              Uploaded Images
            </h3>

            <p className="text-sm text-[#6B7280]">
              {formData.imagePreviews.length}/{MAX_IMAGES}
            </p>
          </div>

          {/* Grid */}
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {formData.imagePreviews.map((image, index) => (
              <div
                key={index}
                className="group relative rounded-[24px] overflow-hidden border border-[#ECECEC]"
              >
                {/* Cover Badge */}
                {index === 0 && (
                  <div className="absolute top-3 left-3 z-10 rounded-full bg-[#4F46E5] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Cover
                  </div>
                )}

                {/* Image */}
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-full aspect-square object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      handleRemoveImage(index);
                    }}
                    className="w-12 h-12 rounded-full bg-white text-red-500 flex items-center justify-center"
                  >
                    <HiOutlineTrash size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warning Card */}
      <div className="mt-10 rounded-[24px] border border-[#FDE68A] bg-[#FEFCE8] p-5">
        <h3 className="text-sm font-bold uppercase tracking-wide text-[#92400E]">
          Important
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#78350F]">
          Upload clear and authentic product photos. Listings with high-quality
          images receive significantly better engagement and buyer trust.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-10 flex items-center justify-between">
        {/* Pagination */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#9CA3AF]">Step 2 of 4</span>

          <div className="flex gap-1">
            <div className="w-3 h-[4px] rounded-full bg-[#16A34A]" />

            <div className="w-7 h-[4px] rounded-full bg-[#4F46E5]" />

            <div className="w-3 h-[4px] rounded-full bg-[#D1D5DB]" />

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
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagesStep;
