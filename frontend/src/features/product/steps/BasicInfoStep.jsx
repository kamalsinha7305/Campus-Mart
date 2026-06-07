import Select from "react-select";
import { IoArrowForward } from "react-icons/io5";
import useProductListing from "../hooks/useProductListing";
import {
  PRODUCT_CATEGORY_OPTIONS,
  PRODUCT_CONDITION_OPTIONS,
  PRODUCT_USAGE_OPTIONS,
} from "../constants/productOptions";
import RequiredAsterisk from "../components/shared/RequiredLabel.jsx";
import { validateBasicInfo } from "../validations";
import FormError from "../components/shared/FormError";
import { motion } from "framer-motion";

const BasicInfoStep = () => {
  const { formData, updateField, nextStep, errors, validateAndProceed } =
    useProductListing();

  // Select Styles
  const selectStyles = {
    control: (provided, state) => {
      const fieldName = state.selectProps.name;

      return {
        ...provided,
        minHeight: 56,
        borderRadius: 12,

        borderColor: errors[fieldName]
          ? "#EF4444"
          : state.isFocused
            ? "#4F46E5"
            : "#E5E7EB",

        boxShadow: "none",

        paddingLeft: 6,

        backgroundColor: "#F7F8FA",

        "&:hover": {
          borderColor: errors[fieldName] ? "#EF4444" : "#4F46E5",
        },
      };
    },

    menu: (provided) => ({
      ...provided,
      borderRadius: 18,
      overflow: "hidden",
      zIndex: 20,
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#EEF2FF" : "#FFFFFF",

      color: "#111827",

      cursor: "pointer",
    }),
  };

  return (
    <motion.div
  initial={{
    opacity: 0,
    y: 16,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.35,
    ease: "easeOut",
  }} className="w-full font-figtree rounded-xl border border-[#E1E1E1] bg-white shadow-sm p-5 sm:p-7 md:p-8 xl:p-7 dark:bg-[#1A1D20] dark:text-white dark:border-0">
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          {/* Product Name */}
          <div data-field="title">
            <label className="text-base font-semibold text-[#0F172A] dark:text-white">
              Product Title
              <RequiredAsterisk />
            </label>

            <input
              type="text"
              maxLength={120}
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="e.g. Macbook Air M1"
              className={`mt-3 w-full h-[56px] rounded-xl border border-[#E5E7EB] ${
                errors.title
                  ? "border-red-500"
                  : "border-[#E5E7EB] focus:border-[#4F46E5]"
              } px-5 outline-none focus:border-[#4F46E5] bg-[#F7F8FA] dark:bg-slate-800`}
            />
            <FormError error={errors.title} />
            <div className="mt-1 flex justify-end">
              <span className="text-sm text-[#94A3B8]">
                {formData.title.length}/120
              </span>
            </div>
          </div>

          {/* Category */}
          <div data-field="category">
            <label className="text-base font-semibold text-[#111827] dark:text-white">
              Category
              <RequiredAsterisk />
            </label>

            <div className="mt-3">
              <Select
                name="category"
                options={PRODUCT_CATEGORY_OPTIONS}
                styles={selectStyles}
                isSearchable={false}
                placeholder="Select category"
                value={
                  PRODUCT_CATEGORY_OPTIONS.find(
                    (item) => item.value === formData.category,
                  ) || null
                }
                onChange={(selected) =>
                  updateField("category", selected?.value || "")
                }
              />
              <FormError error={errors.category} />
            </div>
          </div>

          {/* Description */}
          <div data-field="description">
            <label className="text-base font-semibold text-[#111827] dark:text-white">
              Short Description
              <RequiredAsterisk />
            </label>

            <textarea
              maxLength={1000}
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe your product..."
              className={`mt-3 w-full h-[220px] rounded-xl border border-[#E5E7EB] ${
                errors.description
                  ? "border-red-500"
                  : "border-[#E5E7EB] focus:border-[#4F46E5]"
              } p-5 resize-none outline-none focus:border-[#4F46E5] bg-[#F7F8FA] dark:bg-slate-800`}
            />
            <FormError error={errors.description} />

            <div className="flex justify-between text-sm text-[#94A3B8]">
              <span>Describe the core functionality and value.</span>

              <span>{formData.description.length}/1000</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Brand */}
          <div>
            <label className="text-base font-semibold text-[#111827] dark:text-white">
              Brand / Model
            </label>

            <input
              type="text"
              value={formData.brand}
              onChange={(e) => updateField("brand", e.target.value)}
              placeholder="e.g. Apple"
              className="mt-3 w-full h-[56px] rounded-xl border border-[#E5E7EB] px-5 outline-none focus:border-[#4F46E5] bg-[#F7F8FA] dark:bg-slate-800"
            />
          </div>

          {/* Color */}
          <div>
            <label className="text-base font-semibold text-[#111827] dark:text-white">
              Product Color
            </label>

            <input
              type="text"
              value={formData.color}
              onChange={(e) => updateField("color", e.target.value)}
              placeholder="e.g. Space Grey"
              className="mt-3 w-full h-[56px] rounded-xl border border-[#E5E7EB] px-5 outline-none focus:border-[#4F46E5] bg-[#F7F8FA] dark:bg-slate-800"
            />
          </div>

          {/* Condition */}
          <div data-field="condition">
            <label className="text-base font-semibold text-[#111827] dark:text-white">
              Product Condition
              <RequiredAsterisk />
            </label>

            <div className="mt-3">
              <Select
                name="condition"
                options={PRODUCT_CONDITION_OPTIONS}
                styles={selectStyles}
                isSearchable={false}
                placeholder="Choose condition"
                value={
                  PRODUCT_CONDITION_OPTIONS.find(
                    (item) => item.value === formData.condition,
                  ) || null
                }
                onChange={(selected) =>
                  updateField("condition", selected?.value || "")
                }
              />
              <FormError error={errors.condition} />
            </div>
          </div>

          {/* Usage */}
          <div data-field="usageDuration">
            <label className="text-base font-semibold text-[#111827] dark:text-white">
              Usage Duration
              <RequiredAsterisk />
            </label>

            <div className="mt-3">
              <Select
                name="usageDuration"
                options={PRODUCT_USAGE_OPTIONS}
                styles={selectStyles}
                isSearchable={false}
                placeholder="Select duration"
                value={
                  PRODUCT_USAGE_OPTIONS.find(
                    (item) => item.value === formData.usageDuration,
                  ) || null
                }
                onChange={(selected) =>
                  updateField("usageDuration", selected?.value || "")
                }
                className="bg-[#F7F8FA]"
              />
              <FormError error={errors.usageDuration} />
            </div>
          </div>

          {/* Purchase Date */}
          <div data-field="purchaseDate">
            <label className="text-base font-semibold text-[#111827] dark:text-white">
              Date of Purchase
              <RequiredAsterisk />
            </label>

            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              value={formData.purchaseDate}
              onChange={(e) => updateField("purchaseDate", e.target.value)}
              className={`mt-3 w-full h-[56px] rounded-xl border border-[#E5E7EB] ${
                errors.purchaseDate
                  ? "border-red-500"
                  : "border-[#E5E7EB] focus:border-[#4F46E5]"
              } px-5 outline-none focus:border-[#4F46E5] bg-[#F7F8FA] dark:bg-slate-800`}
            />
            <FormError error={errors.purchaseDate} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 flex items-center justify-between">
        {/* Pagination */}
        <div className="flex items-center gap-2">
          <span className="text-base text-[#94A3B8]">Step 1 of 4</span>

          <div className="flex gap-1">
            <div className="w-7 h-[4px] rounded-full bg-[#4F46E5]" />

            <div className="w-3 h-[4px] rounded-full bg-[#D1D5DB]" />

            <div className="w-3 h-[4px] rounded-full bg-[#D1D5DB]" />

            <div className="w-3 h-[4px] rounded-full bg-[#D1D5DB]" />
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={() => validateAndProceed(validateBasicInfo, nextStep)}
          className="h-[50px] lg:h-[54px] px-6 lg:px-8 rounded-xl flex justify-center items-center gap-2 font-semibold transition-all duration-200 text-base lg:text-lg bg-[#3838EC] hover:bg-[#4338CA] text-white shadow-lg shadow-indigo-200"
        >
          <span>Continue</span>
          <IoArrowForward className="size-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default BasicInfoStep;
