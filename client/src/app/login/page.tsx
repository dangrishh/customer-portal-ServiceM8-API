"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });

      // ❗ If backend route is missing or wrong → res.ok = false
      if (!res.ok) throw new Error("Invalid login");

      const data = await res.json();

      // Store authentication
      localStorage.setItem("token", data.token);
      localStorage.setItem("customerId", data.customerId);

      // Redirect user after login
      window.location.href = "/bookings";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-blue-50">
      <div className="w-full max-w-md bg-white shadow rounded-2xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Customer Portal
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-xl border-gray-200 p-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-xl border-gray-200 p-3"
              placeholder="123-456-7890"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button className="w-full py-3 rounded-2xl bg-blue-600 text-white font-semibold">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
