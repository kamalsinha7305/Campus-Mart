import { IoIosSunny, IoMdMoon } from "react-icons/io";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext.jsx";
import AuthPanelShape from "../../../assets/auth_page_left_side.png";

import HomepagePreview from "../../../assets/auth_left_card_image.png";
function AuthPageRightPart() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <aside className="hidden h-screen shrink-0 overflow-hidden bg-white p-3 dark:bg-[#131313] md:flex md:w-[56%] lg:w-[64%] lg:p-4 xl:w-[62%] xl:p-4">
      <div className="relative flex h-full w-full overflow-hidden rounded-2xl bg-[#3b3bf2] px-[clamp(1.5rem,4vw,4rem)] py-[clamp(1.5rem,5vh,3rem)] text-white">
        <img
          src={AuthPanelShape}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[0%] top-[9%] z-[1] w-[34%] min-w-[240px] max-w-[360px] object-contain opacity-[0.9] rotate-[-90deg]"
        />
        <img
          src={AuthPanelShape}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[0%] left-[4%] z-[1] w-[35%] min-w-[240px] max-w-[360px] object-contain opacity-[0.8]"
        />

        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className="absolute right-5 top-5 z-20 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        >
          {darkMode ? (
            <IoIosSunny className="size-4 text-[#FFD119] xl:size-5" />
          ) : (
            <IoMdMoon className="size-4 text-white xl:size-5" />
          )}
        </button>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[620px] flex-col justify-center gap-[clamp(1.5rem,5vh,4.5rem)] xl:max-w-[600px]">
          <section className="max-w-[462px]">
            <div
              className="relative mb-4 h-3 w-24 overflow-hidden xl:w-28"
              aria-hidden="true"
            >
              <motion.div
                className="absolute left-0 top-0 h-full w-full"
                initial={{ x: "-110%" }}
                animate={{ x: "110%" }}
                transition={{
                  duration: 1.8,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <span className="absolute left-0 top-1/2 h-[5px] w-full -translate-y-1/2 rounded-full bg-white" />
                <span className="absolute left-3 top-1/2 size-3 -translate-y-1/2 rounded-full bg-[#3b3bf2]" />
              </motion.div>
            </div>
            <h2 className="font-figtree text-[clamp(1.5rem,2.3vw,2rem)] font-medium leading-tight text-white">
              From hostel needs to daily deals
            </h2>
            <p className="mt-2 max-w-[390px] font-figtree text-[clamp(0.95rem,1.2vw,1.25rem)] leading-snug text-zinc-200">
              A faster, simpler way to exchange essentials within your campus.
            </p>
          </section>

          <section className="w-full max-w-[min(390px,92%)] rounded-2xl bg-white p-[clamp(0.75rem,1.3vw,1rem)] shadow-[0_20px_60px_rgba(18,18,120,0.22)]">
            <div className="overflow-hidden rounded-lg border border-zinc-200 shadow-[inset_0_-2px_16px_rgba(56,56,236,0.25)]">
              <div className="relative aspect-[491/266] max-h-[min(260px,34vh)] overflow-hidden bg-[#f8f9ff]">
                <img
                  src={HomepagePreview}
                  alt="Campus Mart marketplace preview"
                  className="block h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="pt-3 font-figtree">
              <h3 className="text-[clamp(1.1rem,1.6vw,1.4rem)] font-semibold leading-6 text-black">
                CampusMart
              </h3>
              <p className="mt-1 text-[clamp(0.85rem,1.1vw,1rem)] leading-5 text-neutral-400">
                Everything students need. Buy. Sell. Repeat.
              </p>
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}

export default AuthPageRightPart;
