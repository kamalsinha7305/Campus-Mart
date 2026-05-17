import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

import { verifyEmail as verifyEmailApi } from "../api/authApi.js";
import AuthPageRightPart from "../components/AuthPageRightPart";
import AuthMessageBanner from "../components/AuthMessageBanner";
import cmlogo from "../../../assets/final_cm_logo.png";

const CampusMartLogo = () => (
  <Link
    to="/"
    className="md:absolute md:top-[3dvh] md:left-[1.75rem] lg:top-[3dvh] lg:left-[1.75rem] xl:top-[3dvh] xl:left-[1.75rem] inline-flex items-center justify-center gap-2 md:gap-1.5 lg:gap-2 xl:gap-2 font-poppins text-xl md:text-sm lg:text-sm xl:text-base font-semibold text-white md:text-[#012436] dark:md:text-white"
  >
    <img
      src={cmlogo}
      className="mb-1 size-5 md:h-[1.0625rem] md:w-[0.8125rem] lg:h-[1.1875rem] lg:w-[0.9375rem] xl:h-[1.3125rem] xl:w-[1.0625rem]"
      alt="Campus Mart Logo"
    />
    <span>Campus Mart</span>
  </Link>
);

const cardShell =
  "w-full min-h-0 flex-1 overflow-y-auto overflow-x-hidden rounded-t-[1.5rem] bg-white px-5 pb-8 pt-8 text-[#18181B] shadow-[0_-1.125rem_3.125rem_rgba(30,35,120,0.18)] dark:bg-[#131313] dark:text-white sm:px-8 md:mt-0 md:max-h-[calc(100dvh-5rem)] md:min-h-0 md:flex-none md:rounded-none md:overflow-y-auto md:overflow-x-hidden md:w-full md:max-w-[40rem] lg:max-w-[44rem] xl:max-w-[48rem] 2xl:max-w-[52rem] 3xl:max-w-[56rem] md:p-0 md:shadow-none";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formMessage, setFormMessage] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const code = searchParams.get("code");

      if (!code) {
        setFormMessage({
          variant: "error",
          text: "This verification link is missing a code. Request a new link from sign up or contact support.",
        });
        setLoading(false);
        return;
      }

      try {
        const response = await verifyEmailApi({
          code,
        });

        if (response.data.success) {
          setFormMessage({
            variant: "success",
            text:
              response.data.message ||
              "Email verified successfully! Redirecting to sign in…",
          });
          window.setTimeout(() => navigate("/login", { replace: true }), 1200);
        } else {
          setFormMessage({
            variant: "error",
            text: response.data.message || "Verification failed.",
          });
        }
      } catch (error) {
        setFormMessage({
          variant: "error",
          text:
            error.response?.data?.message ||
            "Verification failed. The link may be invalid or expired.",
        });
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="flex min-h-[100dvh] overflow-x-hidden select-none bg-white dark:bg-[#131313] md:h-[100dvh] md:overflow-hidden">
      <div className="relative flex min-h-[100dvh] w-full flex-col bg-white font-poppins dark:bg-[#131313] md:h-full md:min-h-0 md:w-[44%] lg:w-[36%] xl:w-[41%]">
        <div className="relative flex min-h-[100dvh] flex-col bg-gradient-to-br from-[#2f35f4] to-[#7472f5] text-white md:h-full md:min-h-0 md:bg-none md:bg-white dark:md:bg-[#131313] md:text-[#111827]">
          <div className="flex shrink-0 items-center justify-center pt-6 sm:pt-8 md:justify-start md:pt-0 md:mt-2 md:pl-4 xl:mt-4 xl:pl-7">
            <CampusMartLogo />
          </div>

          <div className="mb-5 flex shrink-0 flex-col items-center gap-2 pt-3 pb-1 sm:mb-8 md:hidden">
            <p className="text-center text-[0.6875rem] font-medium opacity-90 sm:text-[0.75rem]">
              Confirming your campus account
            </p>
            <div className="flex gap-2" aria-hidden="true">
              <span className="h-0.5 w-7 rounded-full bg-white" />
              <span className="h-0.5 w-3 rounded-full bg-white/80" />
              <span className="h-0.5 w-3 rounded-full bg-white/80" />
            </div>
          </div>

          <div className="flex min-h-0 flex-1 items-end justify-center md:items-center md:px-8 lg:px-12 xl:px-16">
            <div className={cardShell}>
              <div className="flex flex-col items-center justify-center py-10 text-center md:py-14 lg:py-16">
                <div
                  className={`mb-6 size-12 rounded-full border-4 border-slate-200 border-t-[#393AF2] dark:border-zinc-700 dark:border-t-[#818cf8] sm:mb-8 sm:size-14 md:size-16 ${
                    loading ? "animate-spin" : ""
                  }`}
                  aria-hidden="true"
                />
                <h1 className="font-figtree text-xl font-semibold leading-snug text-zinc-900 dark:text-zinc-100 sm:text-[1.125rem] md:text-[1.3rem] lg:text-lg xl:text-xl">
                  {loading
                    ? "Verifying your email"
                    : formMessage?.variant === "success"
                      ? "You’re all set"
                      : formMessage?.variant === "error"
                        ? "Something went wrong"
                        : "Done"}
                </h1>
                <p className="mt-2 max-w-md font-figtree text-sm leading-snug text-gray-700 dark:text-[#D6D6D6] sm:text-[0.8125rem] md:mt-3 md:text-[0.8125rem] lg:text-sm xl:text-base">
                  {loading
                    ? "Please wait while we confirm your email address."
                    : formMessage?.variant === "success"
                      ? "Your email is verified."
                      : formMessage?.variant === "error"
                        ? "Use the actions below to continue."
                        : "Taking you to the next step."}
                </p>
              </div>

              {formMessage ? (
                <div className="-mt-4 mb-4 px-1 sm:-mt-6 md:mb-5">
                  <AuthMessageBanner variant={formMessage.variant}>
                    {formMessage.text}
                  </AuthMessageBanner>
                </div>
              ) : null}

              <p className="mt-2 text-center text-xs text-gray-700 sm:text-[0.8125rem] md:mt-3 lg:text-sm">
                <Link
                  to="/login"
                  className="font-semibold text-[#393AF2] transition hover:text-[#2426C7]"
                >
                  Go to sign in
                </Link>
              </p>

              <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-[#CBD5E1] md:hidden" />
            </div>
          </div>
        </div>
      </div>

      <AuthPageRightPart />
    </div>
  );
}

export default VerifyEmail;
