import { useEffect } from "react";

import useProductListing from "../../hooks/useProductListing";

import BasicInfoStep from "../../steps/BasicInfoStep";
import ImagesStep from "../../steps/ImagesStep";
import PricingStep from "../../steps/PricingStep";
import PreviewStep from "../../steps/PreviewStep";

import Stepper from "../stepper/Stepper";
import TipsCard from "../shared/TipsCard";

const ListingLayout = () => {
  const { step } = useProductListing();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfoStep />;

      case 2:
        return <ImagesStep />;

      case 3:
        return <PricingStep />;

      case 4:
        return <PreviewStep />;

      default:
        return <BasicInfoStep />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] dark:bg-[#131313]">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 md:py-8">
        {/* Back */}
        <button
          onClick={() => window.history.back()}
          className="text-sm text-[#111827] dark:text-white flex items-center gap-2"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="mt-7">
          <h1 className="text-[2rem] md:text-[2.4rem] font-bold text-[#111827] dark:text-white leading-tight">
            Sell Your Product
          </h1>

          <p className="mt-2 text-[#6B7280] dark:text-[#A1A1AA] text-sm md:text-base">
            Provide the basic details to help buyers find your product.
          </p>
        </div>

        {/* Stepper */}
        <div className="mt-8">
          <Stepper />
        </div>

        {/* Main */}
        <div className="mt-10 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start">
          {/* LEFT */}
          <div className="w-full max-w-[920px]">{renderStep()}</div>

          {/* RIGHT */}
          <div className="hidden xl:block sticky top-24">
            <TipsCard step={step} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingLayout;
