import { getPasswordStrength } from "../utils/passwordStrength";

/**
 * Strength bar + emoji + hint below the password field.
 */
function PasswordStrengthMeter({ password, className = "" }) {
  const strength = getPasswordStrength(password);
  if (!password || !strength) return null;

  return (
    <div className={`mt-2 space-y-1.5 ${className}`}>
      <div className="h-1 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-zinc-700">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${strength.barClass}`}
          style={{ width: `${strength.widthPct}%` }}
        />
      </div>
      <p className="font-figtree text-[0.6875rem] leading-snug text-gray-600 dark:text-gray-400 sm:text-xs">
        <span className="mr-1" aria-hidden="true">
          {strength.emoji}
        </span>
        {strength.message}
      </p>
    </div>
  );
}

export default PasswordStrengthMeter;
