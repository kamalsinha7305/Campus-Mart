import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";

import { toast } from "react-hot-toast";

import cmlogo from "../../../assets/final_cm_logo.png";

import axios from "../../../services/axiosInstance.js";

import AuthPageRightPart from "../components/AuthPageRightPart";

const CampusMartLogo = () => (
  <Link
    to="/"
    className=" md:absolute md:top-[3%] md:left-7 lg:top-[3%] lg:left-7 xl:top-[3%] xl:left-7 inline-flex items-center justify-center gap-2 md:gap-1.5 lg:gap-2 xl:gap-2 font-poppins text-xl md:text-sm lg:text-sm xl:text-base font-semibold text-white  md:text-[#012436] dark:md:text-white"
  >
    <img
      src={cmlogo}
      className="size-5 md:h-[17px] md:w-[13px] lg:h-[19px] lg:w-[15px] xl:h-[21px] xl:w-[17px] mb-1"
      viewBox="0 0 27 26"
      fill="none"
    ></img>

    <span>Campus Mart</span>
  </Link>
);

const GoogleIcon = () => (
  <svg className="size-4 lg:size-5" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />

    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />

    <path
      fill="#FBBC05"
      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
    />

    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38z"
    />
  </svg>
);

function Signup() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [fname, setFname] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/auth/register", {
        name: fname,

        email,

        password,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Account created successfully!");

        navigate("/checkEmail", { state: { email } });
      }
    } catch (error) {
      console.error("Signup Error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "An error occurred connecting to the server.";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`;
  };

  return (
    <div className="flex min-h-[100dvh] overflow-x-hidden bg-white dark:bg-[#131313] lg:overflow-hidden">
      {/* Left Side */}

      <div className="relative flex min-h-[100dvh] w-full flex-col bg-white font-poppins dark:bg-[#131313] md:w-[44%] lg:w-[36%] xl:w-[38%]">
        <div className="relative flex min-h-[100dvh] flex-col bg-gradient-to-br from-[#2f35f4] to-[#7472f5] pt-5 text-white sm:pt-8 md:bg-none md:px-8 md:py-8 md:text-[#111827] lg:px-12 lg:py-10 xl:px-16">
          <CampusMartLogo />

          <div className="flex h-[85px] shrink-0 flex-col items-center gap-4 sm:h-[192px] sm:gap-5 md:h-auto md:items-start md:gap-0">
            <p className="text-center mt-4 text-[11px] font-medium sm:text-xs md:hidden">
              The smarter way to trade today
            </p>

            <div className="flex gap-2 md:hidden" aria-hidden="true">
              <span className="h-0.5 w-7 rounded-full bg-white" />

              <span className="h-0.5 w-3 rounded-full bg-white/80" />

              <span className="h-0.5 w-3 rounded-full bg-white/80" />
            </div>
          </div>

          <div className="flex flex-1 items-start justify-center md:items-center">
            <form
              className="mt-0 sm:-mt-9 md:mt-6 lg:mt-6 xl:mt-9 min-h-[calc(100dvh-144px)] w-full flex-1 rounded-t-[24px] bg-white px-5 pb-6 pt-6 text-[#18181B] shadow-[0_-18px_50px_rgba(30,35,120,0.18)] dark:bg-[#131313] dark:text-white  sm:min-h-[calc(100dvh-156px)] sm:px-7 md:min-h-0 md:flex-none md:max-w-[300px] md:rounded-none md:p-0 md:shadow-none xl:max-w-[320px]"
              onSubmit={handleRegister}
            >
              <div className="mb-4 md:mb-2 lg:mb-2.5 xl:mb-3.5">
                <h1 className="font-figtree  font-semibold leading-6 tracking-normal text-lg sm:text-lg md:text-[1.2rem] lg:text-lg xl:text-xl ">
                  Create Account
                </h1>

                <p className="mt-1 font-figtree text-[11px] leading-4 text-gray-700 dark:text-[#D6D6D6] sm:text-[11px] md:text-[10px] lg:text-xs xl:text-xs">
                  Enter your details to start your academic journey.
                </p>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex h-10 sm:h-9 md:h-9 lg:h-9 xl:h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-300/30 bg-white  font-semibold text-gray-700 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition hover:border-slate-300 hover:bg-[#F9FAFB] dark:border-[#363A42] dark:bg-[#1A1D20] dark:text-white dark:hover:bg-[#20242A] text-sm md:text-[10px] lg:text-[0.7rem] xl:text-xs md:rounded-xl  "
              >
                <GoogleIcon />
                Sign Up with Google
              </button>

              <div className="my-4 sm:my-4 md:my-2.5 lg:my-2 xl:my-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-300/30 dark:bg-[#3A3A3A]" />

                <span className="text-[9px] sm:text-[9px] font-normal uppercase leading-3 tracking-[0.18em] text-gray-500 ">
                  or register with email
                </span>

                <div className="h-px flex-1 bg-slate-300/30 dark:bg-[#3A3A3A]" />
              </div>

              <div className="space-y-3.5 sm:space-y-3 md:space-y-2.5 lg:space-y-2.5 xl:space-y-3">
                <label className="block">
                  <span className="mb-1 block text-[12px] sm:text-[11px] lg:text-xs xl:text-xs font-normal leading-4 text-zinc-900 dark:text-[#E5E7EB]">
                    Full Name
                  </span>

                  <span className="relative block">
                    <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500 sm:left-4" />

                    <input
                      className="h-12 sm:h-10 md:h-9 lg:h-9 xl:h-10 w-full rounded-lg border border-transparent bg-slate-50 pl-10 pr-3  text-[#111827] outline-none transition placeholder:text-gray-500/60 focus:border-[#393AF2] focus:bg-white focus:ring-4 focus:ring-[#393AF2]/10 dark:bg-[#1A1D20] dark:text-white dark:focus:bg-[#1A1D20]  md:rounded-xl md:pl-11 text-[11px]       md:text-xs"
                      type="text"
                      placeholder="John Doe"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1 block text-[12px] font-normal leading-4 text-zinc-900 dark:text-[#E5E7EB] sm:text-[11px] lg:text-xs">
                    Email Address
                  </span>

                  <span className="relative block">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500 sm:left-4" />

                    <input
                      className="h-12 sm:h-10 md:h-9 lg:h-9 xl:h-10 w-full rounded-lg border border-transparent bg-slate-50 pl-10 pr-3 text-[11px] text-[#111827] outline-none transition placeholder:text-gray-500/60 focus:border-[#393AF2] focus:bg-white focus:ring-4 focus:ring-[#393AF2]/10 dark:bg-[#1A1D20] dark:text-white dark:focus:bg-[#1A1D20]  md:rounded-xl md:pl-11 md:text-xs "
                      type="email"
                      placeholder="name@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1 block text-[12px] font-normal leading-4 text-zinc-900 dark:text-[#E5E7EB] sm:text-[11px] lg:text-xs">
                    Password
                  </span>

                  <span className="relative block">
                    <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500 sm:left-4" />

                    <input
                      className="h-12 sm:h-10 md:h-9 lg:h-9 xl:h-10 w-full rounded-lg border border-transparent bg-slate-50 pl-10 pr-10 text-[11px] text-[#111827] outline-none transition placeholder:text-gray-500/60 focus:border-[#393AF2] focus:bg-white focus:ring-4 focus:ring-[#393AF2]/10 dark:bg-[#1A1D20] dark:text-white dark:focus:bg-[#1A1D20]  md:rounded-xl md:pl-11 md:pr-12 md:text-xs "
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#393AF2] sm:right-4"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </span>
                </label>
              </div>

              <label className="mt-3 md:mt-2 lg:mt-2.5 xl:mt-3.5 flex items-start gap-2.5 md:gap-2 lg:gap-2.5 xl:gap-2.5 leading-4 text-gray-700  text-[11px] sm:text-[10px] md:text-[10px] lg:text-[11px] xl:text-[11px]">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 size-3.5 rounded border-slate-300/50 text-[#393AF2] focus:ring-[#393AF2] md:size-3 lg:size-4 xl:size-4 "
                />

                <span>
                  I agree to the{" "}
                  <Link
                    to="/termscondition"
                    className="font-medium text-[#393AF2]"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/termscondition"
                    className="font-medium text-[#393AF2]"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="sm:h-10 md:h-9 lg:h-9 xl:h-10 mt-4 md:mt-2.5 lg:mt-2.5 xl:mt-3.5 h-12 w-full rounded-lg bg-[#393AF2] font-semibold text-white transition hover:bg-[#2829D8] focus:outline-none focus:ring-4 focus:ring-[#393AF2]/25 disabled:cursor-not-allowed disabled:opacity-60 md:rounded-xl text-sm md:text-xs lg:text-xs xl:text-sm"
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </button>

              <div className="mt-4 md:mt-2 lg:mt-2.5 xl:mt-3.5 text-center text-xs text-gray-700 sm:text-[11px]   md:text-[11px] lg:text-xs xl:text-xs  ">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-700 transition hover:text-[#2426C7]"
                >
                  Log In
                </Link>
              </div>

              <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-[#CBD5E1] md:hidden" />
            </form>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <AuthPageRightPart />
    </div>
  );
}

export default Signup;
