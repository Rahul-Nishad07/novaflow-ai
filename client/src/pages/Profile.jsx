import {
  User,
  Mail,
  Calendar,
  Database,
  FileText,
  Edit,
} from "lucide-react";

export default function Profile() {
  const user = {
    name: "Rahul Nishad",
    email: "rahul@gmail.com",
    role: "Admin",
    joined: "June 2026",
    uploads: 156,
    storage: "1.8 GB",
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Profile
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your account information
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left Card */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <div className="flex flex-col items-center">

            <img
              src="https://ui-avatars.com/api/?name=Rahul+Nishad&background=6366f1&color=fff"
              alt="profile"
              className="w-32 h-32 rounded-full"
            />

            <h2 className="text-white text-2xl font-bold mt-5">
              {user.name}
            </h2>

            <p className="text-slate-400">
              {user.role}
            </p>

            <button
              className="
                mt-5
                flex
                items-center
                gap-2
                bg-indigo-600
                hover:bg-indigo-500
                px-5
                py-3
                rounded-xl
                text-white
              "
            >
              <Edit size={18} />
              Edit Profile
            </button>

          </div>

        </div>

        {/* Right Side */}

        <div className="lg:col-span-2 space-y-6">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <h2 className="text-white text-xl font-semibold mb-6">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div className="bg-slate-800 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-slate-400">
                  <User size={18} />
                  Full Name
                </div>

                <p className="text-white mt-2">
                  {user.name}
                </p>
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail size={18} />
                  Email
                </div>

                <p className="text-white mt-2">
                  {user.email}
                </p>
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={18} />
                  Joined
                </div>

                <p className="text-white mt-2">
                  {user.joined}
                </p>
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-slate-400">
                  <User size={18} />
                  Role
                </div>

                <p className="text-white mt-2">
                  {user.role}
                </p>
              </div>

            </div>

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

              <div className="flex items-center gap-3">

                <FileText className="text-indigo-400" />

                <div>
                  <p className="text-slate-400">
                    Total Uploads
                  </p>

                  <h3 className="text-3xl text-white font-bold">
                    {user.uploads}
                  </h3>
                </div>

              </div>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

              <div className="flex items-center gap-3">

                <Database className="text-green-400" />

                <div>
                  <p className="text-slate-400">
                    Storage Used
                  </p>

                  <h3 className="text-3xl text-white font-bold">
                    {user.storage}
                  </h3>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}