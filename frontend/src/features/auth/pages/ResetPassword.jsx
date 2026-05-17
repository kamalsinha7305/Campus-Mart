import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Check, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import {
  resetPassword,
  verifyResetPasswordToken,
} from "../api/authApi.js";
import AuthPageRightPart from "../components/AuthPageRightPart";
import AuthMessageBanner from "../components/AuthMessageBanner";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import {
  getPasswordStrength,
  isPasswordStrongEnough,
} from "../utils/passwordStrength";
import cmlogo from "../../../assets/final_cm_logo.png";
import whitecmlogo from "../../../assets/white_cm_logo_mobile.png";

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

const cardShell =
  "w-full min-h-0 flex-1 overflow-y-auto overflow-x-hidden rounded-t-[1.5rem] bg-white px-5 pb-8 pt-8 text-[#18181B] shadow-[0_-1.125rem_3.125rem_rgba(30,35,120,0.18)] dark:bg-[#131313] dark:text-white sm:px-8 md:mt-0 md:max-h-[calc(100dvh-5rem)] md:min-h-0 md:flex-none md:rounded-none md:overflow-y-auto md:overflow-x-hidden md:w-full md:max-w-[40rem] lg:max-w-[44rem] xl:max-w-[26.5vw] 2xl:max-w-[52rem] 3xl:max-w-[56rem] md:p-0 md:shadow-none";

const inputClassBase =
  "h-[6.3vh] w-full rounded-lg border border-transparent bg-slate-50 pl-10 text-[0.6875rem] text-[#111827] outline-none transition placeholder:text-gray-500/60 focus:border-[#393AF2] focus:bg-white focus:ring-4 focus:ring-[#393AF2]/10 dark:bg-[#1A1D20] dark:text-white dark:focus:bg-[#1A1D20] sm:h-11 md:h-10 md:rounded-xl md:pl-11 md:text-xs lg:h-10  xl:text-xs xl:h-[6.4vh] ";

const inputClassToggle = `${inputClassBase} pr-10 md:pr-12`;
const inputClassNoToggle = `${inputClassBase} pr-3 md:pr-3`;

const primaryBtn =
  "mt-4 h-[6.3vh] w-full rounded-lg bg-[#393AF2] text-sm font-semibold text-white transition hover:bg-[#2829D8] focus:outline-none focus:ring-4 focus:ring-[#393AF2]/25 disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 md:mt-3 md:h-10 md:rounded-xl md:text-xs lg:h-10 lg:text-sm xl:h-[6.4vh] xl:text-[0.8rem]";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [formMessage, setFormMessage] = useState(null);

  const navigate = useNavigate();
  const { token } = useParams();
  const strength = getPasswordStrength(password);
  const showPasswordOk = strength?.level === "awesome";
  const clearFormMessage = () => setFormMessage(null);

  useEffect(() => {
    const verifyTokenOnLoad = async () => {
      try {
        const response = await verifyResetPasswordToken(token);

        if (response.data.success) {
          setIsTokenValid(true);
        }
      } catch (error) {
        setIsTokenValid(false);
        setLoadError(
          error.response?.data?.message || "Invalid or expired link.",
        );
      } finally {
        setIsValidating(false);
      }
    };

    if (token) {
      verifyTokenOnLoad();
    } else {
      setIsValidating(false);
      setIsTokenValid(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearFormMessage();

    if (!isPasswordStrongEnough(password)) {
      setFormMessage({
        variant: "error",
        text: "Please meet all password requirements below before continuing.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setFormMessage({
        variant: "error",
        text: "Passwords do not match.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await resetPassword(token, {
        password,
      });

      if (response.data.success) {
        setFormMessage({
          variant: "success",
          text:
            response.data.message ||
            "Password updated successfully. You can sign in with your new password.",
        });
        window.setTimeout(() => setIsSuccess(true), 1000);
      }
    } catch (error) {
      setFormMessage({
        variant: "error",
        text:
          error.response?.data?.message ||
          "Failed to reset password. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] overflow-x-hidden select-none bg-white dark:bg-[#131313] md:h-[100dvh] md:overflow-hidden">
      <div className="relative flex min-h-[100dvh] w-full flex-col bg-white font-poppins dark:bg-[#131313] md:h-full md:min-h-0 md:w-[44%] lg:w-[36%] xl:w-[41%]">
        <div className="relative flex min-h-[100dvh] flex-col bg-gradient-to-br from-[#2f35f4] to-[#7472f5] text-white md:h-full md:min-h-0 md:bg-none md:bg-white dark:md:bg-[#131313] md:text-[#111827]">
          <div className="flex shrink-0 items-center justify-center pt-6 sm:pt-8 md:justify-start md:pt-0 md:mt-2 md:pl-4 xl:mt-4 xl:pl-7">
            <CampusMartLogo />
          </div>

          <div className="mb-5 flex shrink-0 flex-col items-center gap-3 pt-2 pb-1 sm:mb-8 md:hidden">
            <p className="text-center text-[0.6875rem] font-medium opacity-90 sm:text-[0.75rem]">
              Secure password recovery
            </p>
            <div className="flex gap-2" aria-hidden="true">
              <span className="h-0.5 w-7 rounded-full bg-white" />
              <span className="h-0.5 w-3 rounded-full bg-white/80" />
              <span className="h-0.5 w-3 rounded-full bg-white/80" />
            </div>
          </div>

          <div className="flex min-h-0 flex-1 items-end justify-center md:items-center md:px-8 lg:px-12 xl:px-16">
            <div className={cardShell}>
              {isValidating ? (
                <div className="flex flex-col items-center justify-center py-12 text-center md:py-16">
                  <div
                    className="mb-6 size-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#393AF2] dark:border-zinc-700 dark:border-t-[#818cf8] sm:mb-8 sm:size-14 md:size-16"
                    aria-hidden="true"
                  />
                  <p className="font-figtree text-sm font-medium text-zinc-700 animate-pulse dark:text-zinc-300 sm:text-base md:text-lg">
                    Verifying secure link…
                  </p>
                </div>
              ) : !isTokenValid ? (
                <div className="flex flex-col">
                  <div className="mb-5 md:mb-4 lg:mb-5">
                    <h1 className="font-figtree text-[1.25rem] sm:text-[1.125rem] md:text-[1.2rem] lg:text-lg xl:text-[1.45rem]  font-semibold leading-snug text-red-600 dark:text-red-400 xl:text-2xl">
                      Link Expired
                    </h1>
                    <p className="mt-2 font-figtree text-sm leading-tight text-gray-600 dark:text-[#9AA8B6] sm:text-[0.8125rem] md:text-[0.8125rem] lg:text-sm xl:text-sm">
                      This password reset link is invalid or has expired. For
                      your security, links only stay valid for a limited time.
                    </p>
                    {loadError ? (
                      <div className="mt-4 mb-[-1.5vh] xl:mb-[-1.4vh]">
                        <AuthMessageBanner variant="error">
                          {loadError}
                        </AuthMessageBanner>
                      </div>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className={primaryBtn}
                  >
                    Request a new link
                  </button>
                  <p className="mt-6 text-center text-xs text-gray-700 sm:text-[0.8125rem] md:mt-3 lg:text-sm xl:mt-5">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-[#393AF2] transition hover:text-[#2426C7] sm:text-[0.8125rem] lg:text-xs xl:text-[0.8125rem]"
                    >
                      <ArrowLeft className="size-[0.875rem]" /> Back to Login
                    </Link>
                  </p>
                </div>
              ) : !isSuccess ? (
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <div className="mb-4 md:mb-4 lg:mb-5 xl:mb-[2.4vh]">
                    <h1 className="font-figtree text-[1.25rem] sm:text-[1.125rem] md:text-[1.2rem] lg:text-lg xl:text-[1.45rem]  font-semibold leading-snug tracking-normal 2xl:text-2xl">
                      Create a new password
                    </h1>
                    <p className="mt-1 font-figtree text-xs leading-snug text-gray-700 dark:text-[#D6D6D6] sm:text-[0.8125rem] md:text-[0.8125rem] lg:text-xs xl:text-sm">
                      Your identity is verified. Choose a strong password you
                      haven&apos;t used elsewhere.
                    </p>
                  </div>

                  {formMessage ? (
                    <div className="mb-[2.1vh] mt-[-0.8vh]  md:mb-3 xl:mb-[2vh] xl:mt-[-0.7vh] ">
                      <AuthMessageBanner variant={formMessage.variant}>
                        {formMessage.text}
                      </AuthMessageBanner>
                    </div>
                  ) : null}

                  <div className="space-y-[2.3vh] sm:space-y-4 md:space-y-3 lg:space-y-3.5 xl:space-y-[2.4vh]">
                    <label className="block">
                      <span className="relative block group">
                        <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500 sm:left-4" />
                        <span
                          className={`pointer-events-none absolute left-10 sm:left-11 px-1 transition-all duration-200 ${
                            password
                              ? "-top-0 -translate-y-1/2 bg-white text-[0.625rem] text-[#393AF2] dark:bg-[#131313] dark:text-[#818cf8]"
                              : "top-1/2 -translate-y-1/2 text-[0.75rem] text-gray-500/80"
                          } group-focus-within:-top-0 group-focus-within:-translate-y-1/2 group-focus-within:bg-white group-focus-within:text-[0.625rem] group-focus-within:text-[#393AF2] dark:group-focus-within:bg-[#131313] dark:group-focus-within:text-[#818cf8]`}
                        >
                          New password
                        </span>
                        <input
                          className={`${inputClassToggle} ${showPasswordOk ? "pr-[3.25rem] md:pr-16" : ""}`}
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            clearFormMessage();
                          }}
                          placeholder=" "
                          required
                        />
                        {showPasswordOk ? (
                          <span
                            className="pointer-events-none absolute right-[2.75rem] top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400 sm:right-[3rem] md:right-[3.25rem]"
                            aria-hidden="true"
                          >
                            <Check
                              className="size-[1.125rem]"
                              strokeWidth={2.5}
                            />
                          </span>
                        ) : null}
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#393AF2] sm:right-4"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="size-[1.125rem]" />
                          ) : (
                            <Eye className="size-[1.125rem]" />
                          )}
                        </button>
                      </span>
                      <PasswordStrengthMeter password={password} />
                    </label>

                    <label className="block">
                      <span className="relative block group">
                        <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500 sm:left-4" />
                        <span
                          className={`pointer-events-none absolute left-10 sm:left-11 px-1 transition-all duration-200 ${
                            confirmPassword
                              ? "-top-0 -translate-y-1/2 bg-white text-[0.625rem] text-[#393AF2] dark:bg-[#131313] dark:text-[#818cf8]"
                              : "top-1/2 -translate-y-1/2 text-[0.75rem] text-gray-500/80"
                          } group-focus-within:-top-0 group-focus-within:-translate-y-1/2 group-focus-within:bg-white group-focus-within:text-[0.625rem] group-focus-within:text-[#393AF2] dark:group-focus-within:bg-[#131313] dark:group-focus-within:text-[#818cf8]`}
                        >
                          Confirm new password
                        </span>
                        <input
                          className={inputClassNoToggle}
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            clearFormMessage();
                          }}
                          placeholder=" "
                          required
                        />
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${primaryBtn} mt-[2.3vh] xl:mt-[2.4vh]`}
                  >
                    {isSubmitting ? "Updating…" : "Update password"}
                  </button>

                  <p className="mt-4 text-center text-xs md:mt-3 lg:text-sm xl:mt-[2.5vh]">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-[#393AF2] transition hover:text-[#2426C7] sm:text-[0.8125rem] lg:text-xs xl:text-[0.8125rem]"
                    >
                      <ArrowLeft className="size-[0.875rem]" /> Back to Signin
                    </Link>
                  </p>

                  <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-[#CBD5E1] md:hidden" />
                </form>
              ) : (
                <div className="flex flex-col">
                  <div className="mb-5 md:mb-4 lg:mb-5">
                    <h1 className="font-figtree text-xl font-semibold leading-snug text-zinc-900 dark:text-zinc-100 sm:text-[1.125rem] md:text-[1.3rem] lg:text-lg xl:text-xl">
                      Password updated
                    </h1>
                    <p className="mt-2 font-figtree text-sm leading-snug text-gray-600 dark:text-[#9AA8B6] sm:text-[0.8125rem] md:text-[0.8125rem] lg:text-sm xl:text-base">
                      Your password has been changed. You can sign in with your
                      new password.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className={primaryBtn}
                  >
                    Back to signin
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AuthPageRightPart />
    </div>
  );
}

export default ResetPassword;
