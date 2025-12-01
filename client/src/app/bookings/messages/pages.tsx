"use client";

import { useEffect, useState } from "react";

interface Message {
  _id: string;
  sender: "customer" | "system" | "staff";
  content: string;
  createdAt: string;
}

export default function MessagesPage({
  params,
}: {
  params: { id: string };
}) {
  const bookingId = params.id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  // Load messages
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/messages/${bookingId}`);
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    };

    fetchMessages();

    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [bookingId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const res = await fetch(`/api/messages/${bookingId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input }),
    });

    if (res.ok) {
      const newMessage = await res.json();
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Messages for Booking #{bookingId}
        </h1>

        {loading ? (
          <p>Loading messages...</p>
        ) : (
          <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto pr-2">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`p-4 rounded-xl shadow-sm border
                ${
                  msg.sender === "customer"
                    ? "bg-blue-100 border-blue-300 ml-auto max-w-[70%]"
                    : msg.sender === "staff"
                    ? "bg-green-100 border-green-300 max-w-[70%]"
                    : "bg-gray-100 border-gray-300 max-w-[70%]"
                }`}
              >
                <p className="text-sm font-semibold capitalize">{msg.sender}</p>
                <p className="mt-1">{msg.content}</p>
                <p className="text-[11px] text-gray-500 mt-2">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border p-3 rounded-xl"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
