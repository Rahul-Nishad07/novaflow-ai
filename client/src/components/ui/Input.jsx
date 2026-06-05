export default function Input({
  label,
  ...props
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-slate-300">
        {label}
      </label>

      <input
        {...props}
        className="
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          px-4
          py-3
          text-white
          outline-none
          focus:border-indigo-500
        "
      />
    </div>
  );
}