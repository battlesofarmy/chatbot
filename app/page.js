"use client";

import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    setInput("");


    // Append user message
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // const { data } = await axios.post("http://localhost:5000/chat", {
      const { data } = await axios.post("https://chat.muntasir3301.xyz/chat", {
        input,
      });

      // Append bot response
      const botMessage = { role: "bot", text: data.output };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error: Unable to get a response." },
      ]);
    }

  };

  return (
    <section className="">
        <div className="flex flex-col h-screen bg-gray-900 text-white md:py-20 md:px-32 px-4">
          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto space-y-4 p-4 border border-gray-700 rounded-lg">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-lg ${
                  msg.role === "user" ? "bg-blue-500 ml-auto" : "bg-gray-700"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="flex-grow p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
      </div>
    </section>
  );
}
