export default function Logo({ size = 36, className = '' }) {
  return (
    <img
      src="/logo.png"
      alt="BudgetAxis logo"
      width={size}
      height={size}
      className={`shrink-0 rounded-xl object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

