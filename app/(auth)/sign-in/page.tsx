"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface SignInFormData {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  // Submit handler
  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    setServerError(null);
    const { email, password } = data;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setServerError("Invalid email or password. Please try again.");
    } else {
      router.push("/dashboard");
    }
  };

  // OAuth handler
  const handleOAuthSignIn = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (e) {
      setServerError("Failed to sign in. Please try again.");
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">FlowMate</div>
        <button
          onClick={() => router.push("/sign-up")}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
        >
          Sign Up
        </button>
      </nav>

      {/* Main Section */}
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="max-w-screen-lg w-full flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome back to <br />
              <span className="text-primary">FlowMate</span> <br />
              Automate your workflow effortlessly.
            </h1>
            <ul className="mt-6 space-y-2 text-gray-600">
              <li>✅ Easy login with Google or GitHub</li>
              <li>✅ Secure and fast authentication</li>
              <li>✅ Access your dashboard instantly</li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 bg-white p-8 shadow-md rounded">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
              Log in to your account
            </h2>

            {/* OAuth Buttons */}
            <button
              onClick={() => handleOAuthSignIn("google")}
              className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded hover:bg-blue-700 mb-4"
            >
              <svg
                className="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4285F4"
                  d="M24 12.1c3.22 0 6.07 1.17 8.33 3.08l6.2-6.2C34.62 6.15 29.63 4 24 4 14.95 4 7.4 10.46 5.08 18.94l7.92 6.12C14.07 17.38 18.6 12.1 24 12.1z"
                />
                <path
                  fill="#34A853"
                  d="M46.07 24.56c0-1.48-.13-2.9-.36-4.27H24v8.09h12.47c-.56 2.73-2.06 5.04-4.15 6.59l6.65 5.18C42.69 36.6 46.07 31.05 46.07 24.56z"
                />
                <path
                  fill="#FBBC05"
                  d="M12.82 28.4c-1.11-2.08-1.74-4.45-1.74-6.99s.63-4.91 1.74-6.99L5.08 8.94C3.13 12.45 2 16.49 2 20.9s1.13 8.45 3.08 11.96l7.74-4.46z"
                />
                <path
                  fill="#EA4335"
                  d="M24 46c6.48 0 11.92-2.13 15.87-5.78l-6.65-5.18c-1.84 1.24-4.2 1.97-6.85 1.97-5.4 0-9.93-3.28-11.9-7.96l-7.92 6.12C10.08 41.54 16.39 46 24 46z"
                />
              </svg>
              Continue with Google
            </button>

            <button
              onClick={() => handleOAuthSignIn("github")}
              className="w-full flex items-center justify-center bg-gray-800 text-white py-3 rounded hover:bg-gray-900 mb-4"
            >
              <svg
                className="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a9.75 9.75 0 00-3.08 18.99c.49.09.67-.21.67-.47v-1.71c-2.74.6-3.32-1.32-3.32-1.32-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.89 1.52 2.34 1.08 2.91.82.09-.65.35-1.08.64-1.33-2.2-.25-4.51-1.1-4.51-4.91 0-1.08.39-1.97 1.03-2.67-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.64 9.64 0 0112 6.84c.85.01 1.7.11 2.5.33 1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.67 0 3.82-2.31 4.66-4.52 4.9.36.3.68.89.68 1.79v2.65c0 .26.18.57.68.47A9.75 9.75 0 0012 2.25z"
                  clipRule="evenodd"
                />
              </svg>
              Continue with GitHub
            </button>

            <div className="text-center text-gray-500 mb-4">OR</div>

            {/* Email Login */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-3 border rounded"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <label className="block mt-4 mb-2 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-3 border rounded"
                placeholder="********"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              {serverError && (
                <p className="text-red-500 mt-4">{serverError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 mt-6 bg-primary text-white rounded hover:bg-orange-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
