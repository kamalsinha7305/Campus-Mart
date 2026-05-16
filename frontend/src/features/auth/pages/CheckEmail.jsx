import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkEmailVerification, resendVerification } from "../api/authApi";
import cmlogo from "../../../assets/final_cm_logo.png";
import whitecmlogo from "../../../assets/white_cm_logo_mobile.png";
import checkemailicon from "../../../assets/checkemailicon.png";
import { ArrowLeft, OctagonAlert } from "lucide-react";
import AuthPageRightPart from "../components/AuthPageRightPart";
import AuthMessageBanner from "../components/AuthMessageBanner";

const CampusMartLogo = () => (
  <Link
    to="/"
    className="inline-flex items-center justify-center gap-2 md:gap-1.5 lg:gap-2 xl:gap-2 2xl:gap-2.5 font-poppins text-xl md:text-sm lg:text-sm xl:text-base 2xl:text-[1.7rem] font-semibold text-white md:text-[#012436] dark:md:text-white"
  >
    <img
      src={cmlogo}
      className="mb-1 size-5 hidden md:block  md:h-[1.0625rem] md:w-[0.8125rem] lg:h-[1.1875rem] lg:w-[0.9375rem] xl:h-[1.3125rem] xl:w-[1.0625rem] 2xl:h-[3vh] 2xl:w-[1.2vw]"
      alt="Campus Mart Logo"
    />
    <img
      src={whitecmlogo}
      className="block mb-1 size-5 md:hidden md:h-[1.0625rem] md:w-[0.8125rem] lg:h-[1.1875rem] lg:w-[0.9375rem] xl:h-[1.3125rem] xl:w-[1.0625rem] 2xl:h-[3vh] 2xl:w-[1.2vw]"
      alt="Campus Mart Logo"
    />
    <span>Campus Mart</span>
  </Link>
);

function CheckEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  // Grab the email passed from the signup page.
  // If someone visits this page directly without signing up, it falls back to empty.
  const email = location.state?.email || "";

  const [isResending, setIsResending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const clearFormMessage = () => setFormMessage(null);

  const handleResend = async () => {
    if (!email) {
      navigate("/signup");
      return;
    }

    clearFormMessage();
    setIsResending(true);
    try {
      const response = await resendVerification({
        email,
      });

      if (response.data.success) {
        setFormMessage({
          variant: "success",
          text:
            response.data.message ||
            "Verification email sent again. Check your inbox (and spam).",
        });
      }
    } catch (error) {
      setFormMessage({
        variant: "error",
        text:
          error.response?.data?.message ||
          "Failed to resend the verification email.",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyStatus = async () => {
    if (!email) {
      navigate("/signup");
      return;
    }

    clearFormMessage();
    setIsChecking(true);
    try {
      const response = await checkEmailVerification(email);

      if (response.data.success) {
        if (response.data.verified) {
          setFormMessage({
            variant: "success",
            text: "Email verified! Redirecting to sign in…",
          });
          window.setTimeout(() => navigate("/login"), 900);
        } else {
          setFormMessage({
            variant: "info",
            text: "Your email isn’t verified yet. Open the link we sent, then try again.",
          });
        }
      }
    } catch (error) {
      setFormMessage({
        variant: "error",
        text:
          error.response?.data?.message ||
          "Unable to check verification status right now.",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] overflow-x-hidden select-none bg-white dark:bg-[#131313] md:h-[100dvh] md:overflow-hidden">
      {/* ── LEFT PANEL ── */}
      <div className="relative flex min-h-[100dvh] w-full flex-col bg-white font-poppins dark:bg-[#131313] md:h-full md:min-h-0 md:w-[44%] lg:w-[36%] xl:w-[41%]">
        <div className="relative flex min-h-[100dvh] flex-col bg-gradient-to-br from-[#2f35f4] to-[#7472f5] text-white md:h-full md:min-h-0 md:bg-none md:bg-white dark:md:bg-[#131313] md:text-[#111827]">
          <div className="flex shrink-0 items-center justify-center pt-6 sm:pt-8 md:justify-start md:pt-0 md:mt-2 md:pl-4 xl:mt-3 xl:pl-7">
            <CampusMartLogo />
          </div>

          {/* Tagline strip shown only on mobile */}
          <div className="mb-5 flex shrink-0 flex-col items-center gap-3 pt-2 pb-1 sm:mb-8 md:hidden">
            <p className="text-center text-[0.6875rem] font-medium opacity-90 sm:text-[0.75rem]">
              The smarter way to trade today
            </p>
            <div className="flex gap-2" aria-hidden="true">
              <span className="h-0.5 w-7 rounded-full bg-white" />
              <span className="h-0.5 w-3 rounded-full bg-white/80" />
              <span className="h-0.5 w-3 rounded-full bg-white/80" />
            </div>
          </div>

          <div className="flex min-h-0 flex-1 items-end justify-center md:items-center md:px-8 lg:px-12 xl:px-16">
            <div
              className="
                w-full min-h-0 flex-1 overflow-y-auto overflow-x-hidden
                rounded-t-[1.5rem] bg-white px-5 pb-8 pt-10
                text-[#18181B] shadow-[0_-1.125rem_3.125rem_rgba(30,35,120,0.18)]
                dark:bg-[#131313] dark:text-white
                sm:px-8
                md:mt-0 md:max-h-[calc(100dvh-5rem)] md:min-h-0 md:flex-none md:rounded-none md:overflow-y-auto md:overflow-x-hidden
                md:w-full md:max-w-[40rem] lg:max-w-[44rem] xl:max-w-[48rem]
                2xl:max-w-[52rem] 3xl:max-w-[56rem]
                md:p-0 md:shadow-none
              "
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-[1.5vh] flex h-14 w-14 items-center justify-center rounded-full bg-blue-700/10 transition-colors duration-300 dark:bg-blue-500/20 sm:h-16 sm:w-16 md:mb-4 lg:mb-5 xl:mb-[1.9vh]">
                  <img
                    src={checkemailicon}
                    alt="Check Email Icon"
                    className="h-6 w-7 sm:h-7 sm:w-8"
                  />
                </div>
                <h2 className="font-figtree font-semibold leading-6 tracking-normal text-zinc-900 transition-colors duration-300 dark:text-zinc-100 text-[1.25rem] sm:text-[1.125rem] md:text-[1.2rem] lg:text-lg xl:text-[1.45rem] ">
                  Check Your Email
                </h2>
                <p className="mt-1.5 font-figtree text-[0.875rem] leading-6 text-gray-700 transition-colors duration-300 dark:text-[#D6D6D6] sm:text-[0.8125rem] md:text-[0.8125rem] lg:text-xs xl:text-[0.85rem] md:leading-5  ">
                  We’ve sent a verification link to your email address.
                  <br className="hidden sm:block" />
                  Please click the link to confirm your account.
                </p>
                <div className="mt-5 rounded-xl border border-slate-300/30 bg-slate-100 px-4 py-2 transition-colors duration-300 dark:border-zinc-800 dark:bg-[#1e1e1e] md:mt-4">
                  <span className="text-sm font-semibold text-zinc-900 transition-colors duration-300 dark:text-zinc-100 md:text-xs lg:text-[0.8rem]">
                    {email || "Unknown Email"}
                  </span>
                </div>
              </div>

              {formMessage ? (
                <div className="mt-5 md:mt-4">
                  <AuthMessageBanner variant={formMessage.variant}>
                    {formMessage.text}
                  </AuthMessageBanner>
                </div>
              ) : null}

              <div className="mt-5 space-y-[2vh] md:mt-4 md:space-y-3.5 lg:mt-5 lg:space-y-4">
                <button
                  onClick={handleVerifyStatus}
                  disabled={isChecking}
                  className="h-[6.3vh] w-full rounded-lg bg-[#393AF2] text-sm font-semibold text-white transition hover:bg-[#2829D8] focus:outline-none focus:ring-4 focus:ring-[#393AF2]/25 disabled:cursor-not-allowed disabled:opacity-60 md:mt-0 md:h-9 md:rounded-xl md:text-xs lg:h-9 lg:text-xs xl:h-[6.4vh] xl:text-[0.8rem] "
                >
                  {isChecking ? "Checking..." : "Reload / I’ve Verified"}
                </button>

                <div className="flex items-center justify-center gap-1 text-center text-[0.75rem] sm:text-[0.8125rem] md:text-[0.8125rem] lg:text-xs xl:text-xs">
                  <span className="text-gray-700 transition-colors duration-300 dark:text-gray-400">
                    Didn’t receive the email?
                  </span>
                  <button
                    onClick={handleResend}
                    disabled={isResending}
                    className="font-semibold text-blue-700 transition-colors hover:text-[#2426C7] disabled:opacity-50 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {isResending ? "Sending..." : "Resend Email"}
                  </button>
                </div>

                <div className="inline-flex items-start justify-start gap-3 rounded-3xl bg-slate-100 p-4 outline outline-1 outline-offset-[-0.0625rem] outline-slate-300/10 transition-colors duration-300 dark:bg-[#1e1e1e] dark:outline-zinc-800  md:p-3 lg:p-4">
                  <div className="pt-1">
                    <OctagonAlert className="size-[0.9375rem] text-red-500 dark:text-red-400" />
                  </div>
                  <div className="text-xs font-normal leading-5 text-gray-700 transition-colors duration-300 dark:text-gray-300 md:text-[0.8125rem] md:leading-4 lg:text-xs lg:leading-5">
                    Check your spam folder if you don&apos;t see the message
                    within a few minutes. Make sure your university firewall
                    isn&apos;t blocking our domain.
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center md:mt-5 lg:mt-6 xl:mt-5">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-[#393AF2] transition hover:text-[#2426C7] sm:text-[0.8125rem] lg:text-xs xl:text-[0.8125rem]"
                >
                  <ArrowLeft className="size-[0.875rem]" /> Back to Registration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <AuthPageRightPart />
    </div>
  );
}

export default CheckEmail;
