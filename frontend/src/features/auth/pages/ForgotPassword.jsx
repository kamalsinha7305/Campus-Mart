import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { forgotPassword } from "../api/authApi";
import AuthPageRightPart from "../components/AuthPageRightPart";
import AuthMessageBanner from "../components/AuthMessageBanner";
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

/* ─── Main component ─── */
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const clearFormMessage = () => setFormMessage(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setFormMessage({
        variant: "error",
        text: "Please enter your email address.",
      });
      return;
    }

    clearFormMessage();
    setIsSubmitting(true);

    try {
      const response = await forgotPassword({ email });

      if (response.data.success) {
        setFormMessage({
          variant: "success",
          text:
            response.data.message ||
            "If an account exists for this email, we’ve sent a reset link. Check your inbox.",
        });
        window.setTimeout(() => setIsSubmitted(true), 900);
      }
    } catch (error) {
      setFormMessage({
        variant: "error",
        text:
          error.response?.data?.message ||
          "We couldn’t send a reset link. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] overflow-x-hidden select-none bg-white dark:bg-[#131313] md:h-[100dvh] md:overflow-hidden">
      {/* ══════════════ LEFT PANEL ══════════════ */}
      <div className="relative flex min-h-[100dvh] w-full flex-col bg-white font-poppins dark:bg-[#131313] md:h-full md:min-h-0 md:w-[44%] lg:w-[36%] xl:w-[41%]">
        {/* Gradient wrapper — visible on mobile, transparent on md+ */}
        <div className="relative flex min-h-[100dvh] flex-col bg-gradient-to-br from-[#2f35f4] to-[#7472f5] text-white md:h-full md:min-h-0 md:bg-none md:bg-white dark:md:bg-[#131313] md:text-[#111827]">
          {/* Logo */}
          <div className="flex shrink-0 items-center justify-center pt-6 sm:pt-8 md:justify-start md:pt-0 md:mt-2 md:pl-4 xl:mt-3 xl:pl-7">
            <CampusMartLogo />
          </div>

          {/* Mobile tagline strip */}
          <div className="mb-5 flex shrink-0 flex-col items-center gap-3 pt-2 pb-1 sm:mb-8 md:hidden">
            <p className="text-center text-[0.6875rem] font-medium opacity-90 sm:text-[0.75rem]">
              Recover access to your account
            </p>
            <div className="flex gap-2" aria-hidden="true">
              <span className="h-0.5 w-7 rounded-full bg-white" />
              <span className="h-0.5 w-3 rounded-full bg-white/80" />
              <span className="h-0.5 w-3 rounded-full bg-white/80" />
            </div>
          </div>

          {/* ── Form / Success card ── */}
          <div className="flex  flex-1 items-end justify-center md:items-center md:px-8 lg:px-12 xl:px-16">
            {/* -------- FORM STATE -------- */}
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="
                 w-full h-[80dvh] md:h-auto overflow-y-auto overflow-x-hidden rounded-t-[1.5rem] bg-white px-5 pb-8 pt-8 text-[#18181B] shadow-[0_-1.125rem_3.125rem_rgba(30,35,120,0.18)] dark:bg-[#131313] dark:text-white sm:px-8 md:mt-0 md:max-h-[calc(100dvh-5rem)] md:min-h-0 md:flex-none md:rounded-none md:overflow-y-auto md:overflow-x-hidden md:w-full md:max-w-[40rem] lg:max-w-[44rem] xl:max-w-[26.5vw] 2xl:max-w-[52rem] 3xl:max-w-[56rem] md:p-0 md:shadow-none
                "
              >
                {/* Heading */}
                <div className="mb-4 md:mb-5 lg:mb-6 xl:mb-7">
                  <h1 className="font-figtree font-semibold leading-tight tracking-normal text-[1.25rem]  sm:text-[1.125rem] md:text-[1.3rem] lg:text-lg xl:text-[1.45rem]">
                    Forgot Password
                  </h1>
                  <p className="mt-1 font-figtree text-[0.75rem]     leading-snug text-gray-500 dark:text-[#9AA8B6] sm:text-[0.75rem] md:text-[0.8125rem] lg:text-xs xl:text-sm">
                    Enter your email address and we&apos;ll send you a link to
                    reset your password
                  </p>
                </div>

                {formMessage ? (
                  <div className="mb-4 md:mb-3 lg:mb-4">
                    <AuthMessageBanner variant={formMessage.variant}>
                      {formMessage.text}
                    </AuthMessageBanner>
                  </div>
                ) : null}

                {/* Email field */}
                <label className="block mb-5 md:mb-4 lg:mb-5 xl:mb-6">
                  <span className="relative block group">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 sm:left-4" />
                    <span
                      className={`pointer-events-none absolute left-10 sm:left-11 px-1 transition-all duration-200 ${
                        email
                          ? "-top-0 -translate-y-1/2 bg-white text-[0.625rem] text-[#393AF2] dark:bg-[#131313] dark:text-[#818cf8]"
                          : "top-1/2 -translate-y-1/2 text-[0.75rem] text-gray-500/80"
                      } group-focus-within:-top-0 group-focus-within:-translate-y-1/2 group-focus-within:bg-white group-focus-within:text-[0.625rem] group-focus-within:text-[#393AF2] dark:group-focus-within:bg-[#131313] dark:group-focus-within:text-[#818cf8]`}
                    >
                      Email Address
                    </span>
                    <input
                      type="email"
                      value={email}
                      placeholder=" "
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearFormMessage();
                      }}
                      required
                      className="
                        h-[6.3vh] sm:h-10 md:h-9 lg:h-10 xl:h-[6.4vh]
                        w-full rounded-lg border border-slate-200
                        bg-slate-50 pl-10 pr-4
                        text-[#111827] text-[0.6875rem] md:text-xs lg:text-[0.8125rem]
                        outline-none transition
                        placeholder:text-gray-400/70
                        focus:border-[#393AF2] focus:bg-white focus:ring-4 focus:ring-[#393AF2]/10
                        dark:bg-[#1A1D20] dark:border-[#2A2D35] dark:text-white dark:focus:bg-[#1A1D20]
                        md:rounded-xl md:pl-11
                      "
                    />
                  </span>
                </label>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    h-[6.3vh] sm:h-10 md:h-9 lg:h-10 xl:h-[6.4vh]
                    w-full rounded-lg
                    bg-[#393AF2] font-semibold text-white
                    text-[0.6875rem] md:text-xs lg:text-[0.8125rem] xl:text-sm
                    transition hover:bg-[#2829D8]
                    focus:outline-none focus:ring-4 focus:ring-[#393AF2]/25
                    disabled:cursor-not-allowed disabled:opacity-60
                    md:rounded-xl
                  "
                >
                  {isSubmitting ? "Sending link…" : "Send Reset Link"}
                </button>

                {/* Back to login */}
                <div className="mt-5 md:mt-4 flex justify-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-[#393AF2] transition hover:text-[#2426C7] sm:text-[0.8125rem] lg:text-xs xl:text-[0.8125rem]"
                  >
                    <ArrowLeft className="size-[0.875rem]" />
                    Back to Login
                  </Link>
                </div>
              </form>
            ) : (
              /* -------- SUCCESS STATE -------- */
              <div
                className="w-full h-[80dvh] md:h-auto overflow-y-auto overflow-x-hidden rounded-t-[1.5rem] bg-white px-5 pb-8 pt-8 text-[#18181B] shadow-[0_-1.125rem_3.125rem_rgba(30,35,120,0.18)] dark:bg-[#131313] dark:text-white sm:px-8 md:mt-0 md:max-h-[calc(100dvh-5rem)] md:min-h-0 md:flex-none md:rounded-none md:overflow-y-auto md:overflow-x-hidden md:w-full md:max-w-[40rem] lg:max-w-[44rem] xl:max-w-[26.5vw] 2xl:max-w-[52rem] 3xl:max-w-[56rem] md:p-0 md:shadow-none
  "
              >
                {/* Success icon */}
                <div className="mb-5 flex flex-col items-center gap-3 w-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
                    <CheckCircle2 className="size-6 text-[#393AF2]" />
                  </div>

                  {/* Text content strictly centered */}
                  <div className="flex flex-col items-center text-center">
                    <h1 className="font-figtree font-semibold leading-tight text-2xl sm:text-xl md:text-[1.4rem] lg:text-xl xl:text-2xl">
                      Check your inbox
                    </h1>
                    <p className="mt-2 text-sm leading-snug text-gray-500 dark:text-[#9AA8B6] sm:text-[0.75rem] md:text-[0.8125rem] lg:text-xs xl:text-[0.8125rem] xl:mt-[1vh]">
                      We&apos;ve sent a password reset link to
                    </p>
                    {/* Email pill */}
                    <span className="mt-1.5 inline-block rounded-md bg-slate-100 dark:bg-[#1A1D20] px-3 py-2 text-[0.75rem] font-semibold text-[#393AF2] dark:text-[#818cf8] md:text-[0.8125rem] xl:mt-[2.8vh]">
                      {email}
                    </span>
                    <p className="mt-3 text-sm leading-snug text-gray-500 dark:text-[#9AA8B6] sm:text-[0.75rem] md:text-[0.8125rem] lg:text-xs xl:text-[0.8125rem] xl:mt-[2.8vh]">
                      Click the link in that email to reset your password. If
                      you don&apos;t see it, check your spam folder.
                    </p>
                  </div>
                </div>
                {/* Resend hint */}
                <p className="text-center text-[0.75rem] md:text-[0.8125rem] lg:text-xs text-gray-500 dark:text-[#9AA8B6] w-full">
                  Didn&apos;t receive an email?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setFormMessage(null);
                      setIsSubmitted(false);
                    }}
                    className="font-semibold text-[#393AF2] transition hover:text-[#2426C7]"
                  >
                    Try again
                  </button>
                </p>

                {/* Back to login */}
                <div className="mt-5 md:mt-4 flex justify-center w-full xl:mt-[3vh]">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-1.5 text-[0.75rem] font-medium text-[#393AF2] transition hover:text-[#2426C7] sm:text-[0.8125rem] lg:text-xs xl:text-[0.8125rem]"
                  >
                    <ArrowLeft className="size-[0.875rem]" />
                    Back to Login
                  </Link>
                </div>
              </div>
            )}
          </div>
          {/* ── end form/success card ── */}
        </div>
        {/* ── end gradient wrapper ── */}
      </div>
      {/* ══════════════ END LEFT PANEL ══════════════ */}

      {/* ══════════════ RIGHT PANEL ══════════════ */}
      <AuthPageRightPart />
    </div>
  );
}

export default ForgotPassword;
