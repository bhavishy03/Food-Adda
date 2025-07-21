export const Card = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
)

export const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
)
