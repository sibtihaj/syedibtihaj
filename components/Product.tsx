"use client";
import type { Product, ProductImage } from "@/types/products";
import Image from "next/image";
import React, { useState } from "react";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { motion } from "framer-motion";

function getExternalCta(href: string | undefined): {
  url: string;
  label: string;
} | null {
  const trimmed = href?.trim();
  if (!trimmed || trimmed === "#") return null;
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return null;
  }
  const isGithub = trimmed.includes("github.com");
  return {
    url: trimmed,
    label: isGithub ? "View on GitHub" : "Live preview",
  };
}

export const SingleProduct = ({ product }: { product: Product }) => {
  const [activeImage, setActiveImage] = useState<ProductImage>(
    product.thumbnail
  );
  const externalCta = getExternalCta(product.href);

  return (
    <div className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={product.slug}
        className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-100 shadow-2xl shadow-zinc-200/50"
      >
        <Image
          src={activeImage}
          alt="thumbnail"
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      </motion.div>
      
      <div className="flex flex-row justify-center my-12 gap-4 flex-wrap">
        {product.images.map((image, idx) => (
          <button
            onClick={() => setActiveImage(image)}
            key={`image-thumbnail-${idx}`}
            className={`relative h-20 w-32 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              activeImage === image ? "border-blue-500 scale-105 shadow-lg" : "border-zinc-100 opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={image}
              alt="product thumbnail"
              fill
              className="object-cover object-top"
            />
          </button>
        ))}
      </div>

      <div className="flex lg:flex-row justify-between items-start flex-col gap-8 mt-20">
        <div className="flex-1">
          <Heading className="text-3xl md:text-5xl font-normal mb-6"> {product.title}</Heading>
          <div className="flex flex-wrap gap-2 mb-8">
            {product.stack?.map((stack: string) => (
              <span
                key={stack}
                className="text-[10px] font-normal uppercase tracking-[0.2em] bg-blue-50 text-blue-700 px-3 py-1 rounded-full ring-1 ring-blue-100"
              >
                {stack}
              </span>
            ))}
          </div>
          <Paragraph className="text-lg md:text-xl text-zinc-700 leading-relaxed mb-10">
            {product.description}
          </Paragraph>
        </div>

        {externalCta ? (
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={externalCta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-2xl font-normal text-sm uppercase tracking-widest transition-all hover:bg-zinc-800 shadow-xl shadow-zinc-200 group"
          >
            {externalCta.label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1 text-sky-400"
              aria-hidden
            >
              <path d="M5 12l14 0"></path>
              <path d="M13 18l6 -6"></path>
              <path d="M13 6l6 6"></path>
            </svg>
          </motion.a>
        ) : null}
      </div>

      <div className="prose prose-zinc max-w-none mt-20 pt-20 border-t border-zinc-100">
        {product?.content}
      </div>
    </div>
  );
};
