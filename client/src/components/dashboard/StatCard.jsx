import React from "react";

export default function StatCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-6
        shadow-lg
        transition
        hover:scale-[1.02]
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400">
            {title}
          </p>

          <h2
            className="
              mt-2
              text-3xl
              font-bold
              text-white
            "
          >
            {value}
          </h2>
        </div>

        <Icon
          size={34}
          className="text-indigo-400"
        />
      </div>
    </div>
  );
}