"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const defaultFormState = {
  name: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  message: {
    value: "",
    error: "",
  },
};

export const Contact = () => {
  const [formData, setFormData] = useState(defaultFormState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Write your submit logic here
    console.log(formData);
  };

  return (
    <form className="grid grid-cols-1 gap-8" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="relative group">
          <label className="text-[10px] uppercase tracking-widest font-normal text-zinc-400 mb-2 block ml-1 group-focus-within:text-blue-600 transition-colors">Full Name</label>
          <input
            type="text"
            placeholder="Syed Ibtihaj"
            className="w-full bg-zinc-50/50 backdrop-blur-sm border border-zinc-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 text-zinc-900 placeholder:text-zinc-400 transition-all duration-300"
            value={formData.name.value}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: {
                  value: e.target.value,
                  error: "",
                },
              })
            }
          />
        </div>
        
        <div className="relative group">
          <label className="text-[10px] uppercase tracking-widest font-normal text-zinc-400 mb-2 block ml-1 group-focus-within:text-blue-600 transition-colors">Email Address</label>
          <input
            type="email"
            placeholder="you@company.com"
            className="w-full bg-zinc-50/50 backdrop-blur-sm border border-zinc-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 text-zinc-900 placeholder:text-zinc-400 transition-all duration-300"
            value={formData.email.value}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: {
                  value: e.target.value,
                  error: "",
                },
              })
            }
          />
        </div>
        
        <div className="relative group">
          <label className="text-[10px] uppercase tracking-widest font-normal text-zinc-400 mb-2 block ml-1 group-focus-within:text-blue-600 transition-colors">Message</label>
          <textarea
            placeholder="How can I help you?"
            rows={6}
            className="w-full bg-zinc-50/50 backdrop-blur-sm border border-zinc-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 resize-none"
            value={formData.message.value}
            onChange={(e) =>
              setFormData({
                ...formData,
                message: {
                  value: e.target.value,
                  error: "",
                },
              })
            }
          />
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-normal py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-zinc-200 uppercase tracking-widest text-sm"
        type="submit"
      >
        Send Message
      </motion.button>
    </form>
  );
};
