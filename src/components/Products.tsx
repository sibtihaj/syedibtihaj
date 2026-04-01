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
            className="group block relative rounded-2xl overflow-hidden bg-white border border-zinc-200 transition-all duration-500 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5"
          >
            <div className="aspect-[16/10] relative overflow-hidden">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-20" />
            </div>

            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {product.stack?.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] uppercase tracking-widest font-normal px-2 py-1 rounded-md bg-zinc-50 text-zinc-500 group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-sky-50 group-hover:text-blue-700 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Heading
                as="h3"
                className="text-xl md:text-2xl font-normal text-zinc-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-sky-500 group-hover:bg-clip-text group-hover:text-transparent transition-all mb-2"
              >
                {product.title}
              </Heading>
              <Paragraph className="text-zinc-500 group-hover:text-zinc-600 transition-colors line-clamp-2">
                {product.description}
              </Paragraph>

              <div className="mt-6 flex items-center bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent text-sm font-normal uppercase tracking-widest opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                View Project 
                <span className="ml-2 text-blue-600">→</span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
