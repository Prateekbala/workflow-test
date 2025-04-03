"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { signupSchema } from "@/schemas/authSchemas"; // Adjust the import path accordingly
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import axios from "axios";

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setServerError(null);
    try {
      const response = await axios.post("/api/sign-up", data);

      if (response.status === 200) {
        router.push("/dashboard");
      } else {
        setServerError(response.data.error || "Failed to sign up");
      }
    } catch (e) {
      setServerError("An error occurred. Please try again.");
      console.log(e);
    }
  };

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">
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
      <div className="max-w-screen-lg w-full flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Join millions worldwide <br /> who automate their work <br /> using{" "}
            <span className="text-primary">AutomateApp</span>.
          </h1>
          <ul className="mt-6 space-y-2 text-gray-600">
            <li>✅ Easy setup, no coding required</li>
            <li>✅ Free forever for core features</li>
            <li>✅ 14-day trial of premium features & apps</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-white p-8 shadow-md rounded">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Sign up for free
          </h2>
          {/* OAuth Buttons */}
          <button
            onClick={() => handleOAuthSignIn("google")}
            className="w-full flex items-center justify-center bg-blue-300 text-white py-3 rounded hover:bg-blue-700 mb-4"
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

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-2 font-medium text-gray-700">
              Work email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-3 border rounded mb-4 focus:outline-primary focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block mb-2 font-medium text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="w-full p-3 border rounded focus:outline-primary focus:ring-2 focus:ring-primary"
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="block mb-2 font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  className="w-full p-3 border rounded focus:outline-primary focus:ring-2 focus:ring-primary"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <label className="block mt-4 mb-2 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-3 border rounded focus:outline-primary focus:ring-2 focus:ring-primary"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {serverError && (
              <p className="text-red-500 text-sm mt-4">{serverError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-6 bg-accent text-white font-medium rounded hover:bg-orange-600"
            >
              Get started for free
            </button>
          </form>

          <p className="mt-4 text-center text-gray-500">
            Already have an account?{" "}
            <a href="/sign-in" className="text-primary underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
