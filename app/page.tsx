"use client";
import React from "react";
import { useRouter } from "next/navigation";
const Home: React.FC = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };


  return (
    <div className="min-h-screen bg-background text-gray-800">
      {/* Navbar */}
      <nav className="p-4 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">FlowMate</h1>
        <div>
          <button
            onClick={() => navigateTo("/sign-in")}
            className="ml-4 px-5 py-2 bg-primary text-white rounded hover:bg-indigo-700"
          >
            Log in
          </button>
          <button
            onClick={() => navigateTo("/sign-up")}
            className="ml-4 px-5 py-2 bg-primary text-white rounded hover:bg-indigo-700"
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center mt-16 px-8">
        <h2 className="text-5xl font-bold text-gray-900 leading-tight">
          Automate Without Limits
        </h2>
        <p className="text-lg mt-4 max-w-3xl mx-auto text-gray-600">
          Streamline your workflows with ease—no developers, no delays. The only
          limit is your imagination.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => navigateTo("/sign-up")}
            className="px-6 py-3 bg-accent text-white rounded shadow hover:bg-orange-600"
          >
            Start free with email
          </button>
          <button
            onClick={() => navigateTo("/sign-up")}
            className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-100"
          >
            Start with Google
          </button>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="mt-16 px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Example Workflow
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-left text-gray-700">
            <li>New website form submission (Webflow)</li>
            <li>Add a new record to your database (Tables)</li>
            <li>Split into paths for different operations</li>
            <li>Path A: Add a new contact to HubSpot</li>
            <li>Path B: Send a message to Slack</li>
          </ol>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-gray-100 py-6 text-center">
        <p className="text-gray-500">
          &copy; 2024 My Automate App. All rights reserved.
        </p>
      </footer>
   
    </div>
  );
};

export default Home;
