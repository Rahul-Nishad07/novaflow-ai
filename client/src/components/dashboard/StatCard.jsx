import React from "react";

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-900">
      {/* Subtle glow effect on hover */}
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl transition-all group-hover:bg-indigo-500/20" />

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white tracking-tight">
            {value}
          </h2>
        </div>

        {/* Icon container with distinct background */}
        <div className="rounded-xl bg-slate-800/80 p-3 group-hover:bg-indigo-600/20 transition-colors duration-300">
          <Icon size={24} className="text-indigo-400 group-hover:text-indigo-300" />
        </div>
      </div>
    </div>
  );
}





// import React from "react";

// export default function StatCard({
//   title,
//   value,
//   icon: Icon,
// }) {
//   return (
//     <div
//       className="
//         rounded-2xl
//         border
//         border-slate-800
//         bg-slate-900
//         p-6
//         shadow-lg
//         transition
//         hover:scale-[1.02]
//       "
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-slate-400">
//             {title}
//           </p>

//           <h2
//             className="
//               mt-2
//               text-3xl
//               font-bold
//               text-white
//             "
//           >
//             {value}
//           </h2>
//         </div>

//         <Icon
//           size={34}
//           className="text-indigo-400"
//         />
//       </div>
//     </div>
//   );
// }