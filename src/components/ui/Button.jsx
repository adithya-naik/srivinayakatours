import React from "react"

const Button = ({ children, onClick, type = "button", className = "", variant = "primary", size = "md" }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  }

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-6 py-3",
    lg: "h-12 px-8 py-3 text-lg",
  }

  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  )
}

export default Button

