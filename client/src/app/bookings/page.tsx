"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ServiceM8Job {
  job_uuid: string;
  job_description?: string;
  job_number?: number;
  client_name?: string;
  company_name?: string;
  job_state?: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<ServiceM8Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const customerId = localStorage.getItem("customerId");
      if (!customerId) return (window.location.href = "/login");

      try {
        const res = await fetch(`/api/bookings?customerId=${customerId}`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-blue-50">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Your Bookings</h1>

          <button
            className="text-sm text-gray-600"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </header>

        {loading ? (
          <p>Loading…</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <Link key={b.job_uuid} href={`/bookings/${b.job_uuid}`}>
                <div className="block bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {b.job_description ?? `Job ${b.job_number}`}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Client: {b.client_name ?? b.company_name ?? "—"}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs">
                      {b.job_state ?? "Unknown"}
                    </span>

                    <span className="text-sm text-gray-400">{b.job_uuid}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
