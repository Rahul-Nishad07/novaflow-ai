export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        w-full
        rounded-xl
        bg-indigo-600
        px-4
        py-3
        font-medium
        text-white
        transition
        hover:bg-indigo-700
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}