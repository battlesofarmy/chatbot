"use client";
import { FaArrowCircleUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { FcOnlineSupport } from "react-icons/fc";
import axios from "axios";
import logo from '@/public/zestmate.png'
import Image from "next/image";

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

    // Scroll to the bottom whenever messages change
    const chatEndRef = useRef(null);
    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  return (
    <section className="bg-gray-900 h-[100vh]">
      
     <div className="container">

      <div className="flex justify-between items-center pt-3">
        <div className="flex items-center text-gray-300 text-3xl font-medium">
          <FcOnlineSupport className="text-5xl mr-2 text-[#F1A048]"/>
          <i>ZestMate</i>
        </div>
        <Image width={80} height={80} src={logo} alt="Logo"/>
      </div>


        <div className="flex flex-col md:h-[80vh] h-[70vh]  text-white mt-3">
          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto space-y-4 p-4 border border-gray-700 rounded-lg  bg-[#1E293B]">
            {
            messages.length>0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-lg ${
                    msg.role === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700"
                  }`}
                >
                  {msg.text}
                  <div ref={chatEndRef} /> {/* Keeps scrolling to bottom */}
                </div>
              ))
              
            ) : (
              <div className="pt-24 text-center">
                <div>
                  <div className="flex justify-center mb-3">
                    <Image width={60} height={60} src={logo} alt="Logo"/>
                  </div>
                  <kbd className="text-4xl">ZestMate</kbd>
                  <p className="mt-1 text-sm">AI assistant of Z. H. Sikder University of Science & Technology</p>
                  <p className="mt-1 text-sm">Depertment of Computer Science & Engineering</p>
                </div>
              </div>
            )
            }
          </div>
          
          {/* Send button option  */}
          <div className="flex items-center mt-3 relative">
            <input
              rows={3}
              type="text"
              className="flex-grow p-2 h-16 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none pl-5"
              placeholder="Ask your any question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="absolute right-2 ml-2 px-4 py-2 text-3xl"
            >
              <FaArrowCircleUp/>
            </button>
          </div>
          <p className="-mb-8 mt-4 text-xs">Created By 💖<kbd>Muntasir Ahmed</kbd> </p>
        </div>

     </div>
    </section>
  );
}
