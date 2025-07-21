export const Badge = ({ className = "", children, ...props }) => (
  <div
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}
    {...props}
  >
    {children}
  </div>
)
