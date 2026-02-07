import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSunny, IoMdMoon } from "react-icons/io";

import Image4 from "../assets/upper_circle_1.png";
import Image5 from "../assets/rectangle_1.png";
import Image6 from "../assets/rectangle_2.png";
import Image7 from "../assets/Homepage.png";
import ImageShade from "../assets/login_shade.png";

import { auth } from "./firebase";
import { toast } from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const firstName = fname.trim();
      const lastName = lname.trim();
      const cleanedEmail = email.trim();
      const cleanedPassword = password;

      if (!firstName || !lastName || !cleanedEmail || !cleanedPassword) {
        toast.error("Please fill all fields");
        setIsSubmitting(false);
        return;
      }

      await createUserWithEmailAndPassword(auth, cleanedEmail, cleanedPassword);
      const user = auth.currentUser;

      if (user) {
        const idToken = await user.getIdToken();

        const response = await fetch(
          import.meta.env.VITE_API_URL
            ? `${import.meta.env.VITE_API_URL}/api/auth/signup`
            : "http://localhost:5001/api/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
              firstName,
              lastName,
            }),
          }
        );

        if (!response.ok) {
          let errText = `HTTP ${response.status}`;
          try {
            const json = await response.json();
            errText = json.message || json.error || JSON.stringify(json);
          } catch {
            const text = await response.text().catch(() => null);
            if (text) errText = text;
          }
          throw new Error(errText);
        }
      }

      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });

      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      const message = error?.message || "Signup failed. Please try again.";
      toast.error(message, { position: "bottom-center" });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="flex overflow-hidden relative">
      {/* Top left image */}
      <div className="absolute -top-36 -left-52 z-10">
        <img src={ImageShade} className="w-[35vw] h-[52vh]" alt="image" />
      </div>

      {/* Left Side */}
      <div className="relative h-screen w-[100%] lg:w-[38%] xl:w-[42%] bg-white shadow dark:bg-[#131313]">
        <Link
          to={"/"}
          className="flex items-center justify-center mt-[6vh] xl:mt-[8vh]"
        >
          <svg
            className="mb-[0.4vh]"
            width="20"
            height="20"
            viewBox="0 0 27 26"
            fill="none"
          >
            <path
              d="M18.05 8.79119C18.05 11.3414 15.5629 13.4088 13.0126 13.4088C10.4624 13.4088 7.9752 11.3414 7.9752 8.79119C7.9752 6.24094 5.42505 3.33398 7.9753 3.33398C10.5256 3.33398 18.05 6.24094 18.05 8.79119Z"
              stroke="#4D4EF2"
              strokeWidth="1.67914"
            />
            <path
              d="M19.1842 9.63082C19.1842 12.1811 16.6971 14.2485 14.1468 14.2485C11.5965 14.2485 9.10938 12.1811 9.10938 9.63082C9.10938 7.08056 15.0807 1.23511 17.6309 1.23511C20.1812 1.23511 19.1842 7.08056 19.1842 9.63082Z"
              stroke="#534FF2"
              strokeWidth="1.67914"
            />
            <path
              d="M4.12511 10.2522C4.41527 9.14425 5.41637 8.37158 6.56164 8.37158H19.7557C20.8938 8.37158 21.8905 9.13479 22.1872 10.2335L25.5888 22.8271C26.0212 24.4279 24.8154 26.0026 23.1572 26.0026H3.26333C1.6131 26.0026 0.408693 24.4421 0.826795 22.8457L4.12511 10.2522Z"
              fill="#394FF1"
            />
          </svg>
          <span className="text-[#012436] dark:text-[#FFFFFF] text-[18px] lg:text-[1.5rem] xl:text-[1.45rem] font-poppins font-semibold ml-[0.3vw]">
            Campus Mart
          </span>
        </Link>

        <div>
          <h1 className="flex items-center justify-center mt-[3vh] lg:mt-[4vh] xl:mt-[6vh] xl:gap-1">
            <span className="font-robotoflex text-black text-[18px] dark:text-[#F1F1F1] font-semibold  lg:text-[1.65rem] mr-[6px] xl:text-[1.55em] tracking-tight">
              Create
            </span>
            <span className="font-robotoflex font-semibold bg-gradient-to-l from-blue-600 to-indigo-600 bg-clip-text text-transparent lg:text-[1.65rem] text-[18px] xl:text-[1.55rem] tracking-tight">
              Campus Mart
            </span>
            <span className="font-robotoflex text-black text-[18px] dark:text-[#F1F1F1] font-semibold  lg:text-[1.65rem] mr-[6px] xl:text-[1.55em] tracking-tight xl:ml-1">
              Account
            </span>
          </h1>
          <div className="flex items-center justify-center text-[#828F9B] dark:text-[#D6D6D6] text-[13px] lg:text-[1.025rem] font-normal font-['Poppins'] mb-[3vh] xl:text-[1vw] xl:mb-[2vh] xl:mt-[1vh]">
            Enter your details to access Campus Mart.
          </div>

          <div className="w-3/4 mx-auto">
            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleRegister}
            >
              <div className="mt-[3vh]">
                <div className="text-[#1e1e1e] dark:text-[#D6D6D6] text-[13.5px] lg:text-[15px] font-normal font-['Poppins'] xl:mb-1">
                  First Name
                </div>
                <input
                  className="w-[77vw] h-[5.2vh] rounded-md lg:w-[24.5vw] lg:h-[5.8vh] border border-[#DEDEDE] pl-[4vw] dark:text-white dark:bg-[#1a1d20] lg:pl-[1vw] outline-none dark:border-[#848484]"
                  type="text"
                  placeholder="First name"
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
              </div>

              <div className="mt-[1.5vh]">
                <div className="text-[#1e1e1e] dark:text-[#D6D6D6] text-[13.5px] lg:text-[15px] font-normal font-['Poppins'] xl:mb-1">
                  Last Name
                </div>
                <input
                  className="w-[77vw] h-[5.2vh] rounded-md lg:w-[24.5vw] lg:h-[5.8vh] border border-[#DEDEDE] pl-[4vw] dark:text-white dark:bg-[#1a1d20] lg:pl-[1vw] outline-none dark:border-[#848484]"
                  type="text"
                  placeholder="Last name"
                  onChange={(e) => setLname(e.target.value)}
                  required
                />
              </div>

              <div className="mt-[1.5vh]">
                <div className="text-[#1e1e1e] dark:text-[#D6D6D6] text-[13.5px] lg:text-[15px] font-normal font-['Poppins'] xl:mb-1">
                  Email
                </div>
                <input
                  className="w-[77vw] h-[5.2vh] rounded-md lg:w-[24.5vw] lg:h-[5.8vh] border border-[#DEDEDE] pl-[4vw] dark:text-white dark:bg-[#1a1d20] lg:pl-[1vw] outline-none dark:border-[#848484]"
                  type="email"
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="relative mt-[1.5vh]">
                <div className="text-[#1e1e1e] dark:text-[#D6D6D6] text-[13.5px] lg:text-[15px] xl:mb-1">
                  Password
                </div>

                <input
                  className="w-[77vw] h-[5vh] lg:w-[24.5vw] lg:h-[5.8vh] rounded-md border border-[#bbc2c9] pl-[1.2vw] dark:text-white dark:bg-[#1a1d20] outline-none dark:border-[#848484]"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="absolute top-[53%] right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="xl:mt-[1vh]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white bg-[#1a1d20] rounded-md w-[80vw] h-[5vh] lg:w-[24.5vw] lg:h-[5.8vh] mt-[3vh] hover:bg-[#0b0c0d] disabled:opacity-60"
                >
                  {isSubmitting ? "Creating..." : "Create account"}
                </button>
              </div>

              <div className="mt-[2vh] xl:mt-[0.7vh]">
                <span className="text-[#848484] text-[13px] font-poppins">
                  Already have an account?{" "}
                </span>
                <Link to={"/login"}>
                  <span className="text-[#292929] dark:text-neutral-300 text-[13px] xl:text-[14px] font-medium font-poppins">
                    Login
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full absolute bottom-[2.2vh] lg:bottom-[2.9vh]">
          <div className="text-center">
            <span className="text-zinc-500 text-[8px] lg:text-[12.5px] font-normal font-['Poppins']">
              By clicking "Create account" I acknowledge that <br />I agree to
              the{" "}
            </span>
            <span className="text-gray-700 dark:text-[#AAB9C5] text-[8px] lg:text-[13px] font-normal font-['Poppins'] underline cursor-pointer">
              Terms of Use
            </span>
            <span className="text-zinc-500 text-[8px] lg:text-[13px] font-normal font-['Poppins']">
              {" "}
              and{" "}
            </span>
            <span className="text-zinc-700 dark:text-[#AAB9C5] text-[8px] lg:text-[13px] font-normal font-['Poppins'] underline cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-zinc-500 text-[8px] lg:text-sm font-normal font-['Poppins']">
              .
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="h-screen w-[0%] lg:w-[62%] relative overflow-hidden bg-gradient-to-l from-[#364EF2] to-[#534ff2]">
        <button
          onClick={() => toggleDarkMode()}
          aria-label="Toggle dark mode"
          className="transition duration-500 ease-in-out absolute right-14 top-[36vh] z-20"
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

        <img src={Image6} className="absolute top-[-4%] left-[-10%] w-[55vw]" />
        <img src={Image5} className="absolute top-[18%] left-[-13%] w-[55vw]" />
        <img src={Image4} className="absolute top-0 right-0 w-[10vw]" />
        <img src={Image7} className="absolute bottom-0 right-0 w-[46vw]" />
      </div>
    </div>
  );
}

export default Signup;
