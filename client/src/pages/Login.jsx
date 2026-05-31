function Login() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-96 bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-4">
          NovaFlow Login
        </h1>

        <input
          className="border w-full p-2 mb-3"
          placeholder="Email"
        />

        <input
          className="border w-full p-2 mb-3"
          placeholder="Password"
          type="password"
        />

        <button className="bg-blue-600 text-white px-4 py-2 w-full">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;