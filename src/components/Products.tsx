"use client";
import React from "react";
import { products } from "@/constants/products";
import Image from "next/image";
import Link from "next/link";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { motion } from "framer-motion";

export const Products = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {products.map((product, idx) => (
        <motion.div
          key={product.href}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
          <Link
            href={product.href}
            className="group block relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-500 hover:border-zinc-700 hover:shadow-2xl hover:shadow-emerald-500/10"
          >
            <div className="aspect-[16/10] relative overflow-hidden">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
            </div>

            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {product.stack?.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Heading
                as="h3"
                className="text-xl md:text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors mb-2"
              >
                {product.title}
              </Heading>
              <Paragraph className="text-zinc-400 group-hover:text-zinc-300 transition-colors line-clamp-2">
                {product.description}
              </Paragraph>

              <div className="mt-6 flex items-center text-emerald-500 text-sm font-bold uppercase tracking-widest opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                View Project 
                <span className="ml-2">→</span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
