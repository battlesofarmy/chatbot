"use client";

import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "user", msg: "Hello!" },

    { role: "admin", msg: "  Lore ab officia mollitia consequuntur tempore aperiam quibusdam rem qui voluptas perferendis delectus dolor? Earum, distinctio doloribus repellat non illo nisi impedit odio voluptates facilis?" },
  ]);

  const chatEndRef = useRef(null);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Works when new messages arrive

  return (
    <div className="flex-grow overflow-y-auto space-y-4 p-4 border border-gray-700 rounded-lg bg-[#1E293B] h-[400px]">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg max-w-lg ${
            msg.role === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700"
          }`}
        >
          {msg.msg}
        </div>
      ))}
      <div ref={chatEndRef} /> {/* Keeps scrolling to bottom */}
    </div>
  );
}
