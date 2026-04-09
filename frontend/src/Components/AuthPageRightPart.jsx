import React, {useState} from 'react'
import { IoIosSunny, IoMdMoon } from "react-icons/io";
import Image4 from "../assets/upper_circle_1.png";
import Image5 from "../assets/rectangle_1.png";
import Image6 from "../assets/rectangle_2.png";
import Image7 from "../assets/Homepage.png";

function AuthPageRightPart() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
  const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="h-screen w-[0%] lg:w-[62%] relative overflow-hidden bg-gradient-to-l from-[#364EF2] to-[#534ff2]">
      <button
        onClick={() => toggleDarkMode()}
        aria-label="Toggle dark mode"
        className="transition duration-500 ease-in-out absolute right-[8%] top-[34.4%] z-20"
      >
        {darkMode ? (
          <IoIosSunny className="text-[#FFD119] sm:size-4 md:size-5 lg:size-6 xl:size-5 transition-all duration-500 ease-in-out rotate-0 scale-100" />
        ) : (
          <IoMdMoon className="text-[#323232] sm:size-4 md:size-5 lg:size-6 xl:size-5 transition-all duration-500 ease-in-out rotate-0 scale-100" />
        )}
      </button>

      <div className="absolute font-figtree top-[12%] left-[27%] text-[#ffffd5] text-[40px] font-black tracking-tight leading-tight">
        Find What You Need, <br />
        Sell What You Don't!
      </div>

      <img src={Image6} className="absolute top-[-4%] left-[-10%] w-[55vw]" alt="graphic" />
      <img src={Image5} className="absolute top-[18%] left-[-13%] w-[55vw]" alt="graphic" />
      <img src={Image4} className="absolute top-0 right-0 w-[10vw]" alt="graphic" />
      <img src={Image7} className="absolute bottom-0 right-0 w-[46vw]" alt="graphic" />
    </div>
  )
}

export default AuthPageRightPart