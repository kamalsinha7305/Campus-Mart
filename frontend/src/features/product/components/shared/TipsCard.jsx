import {
  HiOutlineLightBulb,
  HiOutlinePhotograph,
  HiOutlineCurrencyRupee,
  HiOutlineClipboardCheck,
} from "react-icons/hi";

const TIPS_DATA = {
  1: {
    icon: <HiOutlineClipboardCheck size={24} />,
    title: "Tips for better listings",

    tips: [
      "Use a descriptive product title.",
      "Mention important product details.",
      "Add honest usage information.",
      "Clear descriptions increase trust.",
    ],
  },

  2: {
    icon: <HiOutlinePhotograph size={24} />,
    title: "Tips for better photos",

    tips: [
      "Use natural lighting.",
      "Show all product angles.",
      "Keep background clean.",
      "Avoid blurry images.",
    ],
  },

  3: {
    icon: <HiOutlineCurrencyRupee size={24} />,
    title: "Pricing tips",

    tips: [
      "Keep pricing realistic.",
      "Competitive prices sell faster.",
      "Mention negotiable pricing carefully.",
      "Clear meetup locations help buyers.",
    ],
  },

  4: {
    icon: <HiOutlineLightBulb size={24} />,
    title: "Final review",

    tips: [
      "Review all details carefully.",
      "Ensure images are correct.",
      "Check payment information.",
      "Preview exactly as buyers will see it.",
    ],
  },
};

const TipsCard = ({ step }) => {
  const currentTip = TIPS_DATA[step];

  return (
    <div className="w-full rounded-[28px] border border-[#ECECEC] bg-[#F5F3FF] p-6">
      {/* Top */}
      <div className="flex items-center gap-3 text-[#4F46E5]">
        {currentTip.icon}

        <h2 className="text-sm font-bold uppercase tracking-wide">
          {currentTip.title}
        </h2>
      </div>

      {/* Tips */}
      <div className="mt-6 flex flex-col gap-5">
        {currentTip.tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#818CF8] mt-[9px]" />

            <p className="text-[15px] leading-7 text-[#111827]">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsCard;
