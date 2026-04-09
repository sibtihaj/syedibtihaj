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
    <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2">
      {products.map((product, idx) => {
        const projectHref =
          product.slug != null && product.slug !== ""
            ? `/projects/${product.slug}`
            : product.href;

        return (
        <motion.div
          key={product.slug ?? `${product.title}-${idx}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="h-full min-h-0"
        >
          <Link
            href={projectHref}
            className="group flex h-full min-h-[28rem] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-500 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 md:min-h-[32rem]"
          >
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-20" />
            </div>

            <div className="flex min-h-0 flex-1 flex-col p-8">
              <div className="mb-4 flex min-h-[5rem] flex-wrap content-start gap-2">
                {product.stack?.map((tech, techIdx) => (
                  <span
                    key={`${product.slug}-${tech}-${techIdx}`}
                    className="rounded-md bg-zinc-50 px-2 py-1 text-[10px] font-normal uppercase tracking-widest text-zinc-500 transition-colors group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-sky-50 group-hover:text-blue-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Heading
                as="h3"
                className="mb-2 line-clamp-2 min-h-[3.5rem] text-xl font-normal text-zinc-900 transition-all group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-sky-500 group-hover:bg-clip-text group-hover:text-transparent md:min-h-[4rem] md:text-2xl"
              >
                {product.title}
              </Heading>
              <Paragraph className="line-clamp-2 min-h-[2.75rem] text-zinc-500 transition-colors group-hover:text-zinc-600">
                {product.description}
              </Paragraph>

              <div className="mt-auto flex min-h-[1.75rem] -translate-x-2 items-center pt-6 text-sm font-normal uppercase tracking-widest opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                  View Project
                </span>
                <span className="ml-2 text-blue-600">→</span>
              </div>
            </div>
          </Link>
        </motion.div>
        );
      })}
    </div>
  );
};
