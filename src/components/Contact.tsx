"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const defaultFormState = {
  name: { value: "", error: "" },
  email: { value: "", error: "" },
  message: { value: "", error: "" },
};

export const Contact = () => {
  const [formData, setFormData] = useState(defaultFormState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 pl-2">
          Your Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          value={formData.name.value}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: { value: e.target.value, error: "" },
            })
          }
          className="bg-zinc-950/50 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 pl-2">
          Email Address
        </label>
        <input
          type="email"
          placeholder="john@doe.com"
          value={formData.email.value}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: { value: e.target.value, error: "" },
            })
          }
          className="bg-zinc-950/50 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm"
        />
      </div>

      <div className="md:col-span-2 flex flex-col gap-3">
        <label className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 pl-2">
          How can I help?
        </label>
        <textarea
          placeholder="Write your message here..."
          rows={6}
          value={formData.message.value}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: { value: e.target.value, error: "" },
            })
          }
          className="bg-zinc-950/50 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm resize-none"
        />
      </div>

      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          className="relative group overflow-hidden rounded-xl bg-emerald-500 px-10 py-4 text-sm font-bold uppercase tracking-widest text-zinc-950 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
        >
          <span className="relative z-10">Send Message</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </button>
      </div>
    </form>
  );
};
