"use client";
import { Paragraph } from "@/components/Paragraph";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heading } from "./Heading";

export default function About() {
  const images = [
    "https://images.unsplash.com/photo-1692544350322-ac70cfd63614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692374227159-2d3592f274c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw8fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692445381633-7999ebc03730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  ];

  const badges = [
    {
      title: "AWS Certified Solutions Architect",
      image: "/badges/AWS%20Certified%20Solutions%20Architect%20Badge.png",
    },
    {
      title: "Certified Kubernetes Administrator (CKA)",
      image: "/badges/CKA%20Certified%20Kubernetes%20Administrator%20Badge.png",
    },
    {
      title: "HashiCorp Certified Terraform Associate",
      image: "/badges/HashiCorp%20Certified%20Terraform%20Associate%20Badge.png",
    },
    {
      title: "HashiCorp Certified Consul Associate",
      image: "/badges/HashiCorp%20Certified%20Consul%20Associate%20Badge.png",
    },
    {
      title: "Amazon EKS Training",
      image: "/badges/Amazon%20EKS%20Training%20Badge.png",
    },
  ];

  return (
    <div className="max-w-6xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-20">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? 3 : -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 transition-all duration-500 hover:border-blue-300"
          >
            <Image
              src={image}
              fill
              alt="about"
              className="object-cover transform transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Heading as="h3" className="text-xl md:text-2xl font-normal mb-6 text-zinc-900">
            Started in Support. <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Stayed for the Craft.</span>
          </Heading>
          <Paragraph className="mb-6 text-lg leading-relaxed text-zinc-700">
            Hey, I&apos;m Syed — a Senior Support Engineer at HashiCorp and the founder of Webifex Labs, a small freelance studio I started in 2022.
          </Paragraph>
          <Paragraph className="mb-6 text-zinc-500">
            My career started in technical support roles — IT helpdesks, Salesforce administration, higher-degree administration — and steadily grew into cloud infrastructure. I joined AWS in 2022 as a Cloud Support Engineer, working deep in container platforms like EKS, ECS, and Fargate for enterprise customers globally. I now do the same at HashiCorp, specialising in Terraform Enterprise.
          </Paragraph>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-end"
        >
          <Paragraph className="mb-6 text-zinc-500">
            In parallel, I&apos;ve been building. Since August 2022 I&apos;ve shipped 20+ production web applications through Webifex Labs — e-commerce stores, SaaS tools, marketing sites — using Next.js, TypeScript, and Stripe, often with AI automation layered on top.
          </Paragraph>
          <Paragraph className="mb-6 text-zinc-500">
            More recently I decided to push more of that work to GitHub and to keep this portfolio up to date alongside it—from here on, I intend to maintain both as ongoing, public-facing records of what I ship.
          </Paragraph>
          <Paragraph className="mb-6 text-zinc-600 italic font-mono border-l-2 border-blue-500 pl-6 py-2 bg-blue-50/50 rounded-r-lg">
            &quot;The support engineering background isn&apos;t separate from the product work — it&apos;s what makes the products more resilient. I know what breaks in production.&quot;
          </Paragraph>
          <Paragraph className="text-zinc-500">
            If you&apos;re looking for someone who can build something from scratch, or bring genuine cloud depth to a technical challenge, let&apos;s talk.
          </Paragraph>
        </motion.div>
      </div>

      <div className="mb-32">
        <div className="flex items-baseline gap-4 mb-8">
          <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-[0.5em]">
            Credentials
          </span>
          <div className="h-px w-16 bg-zinc-100" />
        </div>

        <Heading as="h3" className="text-3xl md:text-5xl font-normal tracking-tight mb-4">
          Certification <span className="text-zinc-300 font-light italic">Badges</span>
        </Heading>
        <Paragraph className="text-zinc-500 mb-10 max-w-2xl">
          Verified credentials in cloud architecture, Kubernetes, and infrastructure automation.
        </Paragraph>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl border border-zinc-100 bg-white p-4 md:p-5 shadow-sm transition-all duration-500 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
            >
              <div className="relative h-64 md:h-72 w-full overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50">
                <Image
                  src={badge.image}
                  alt={badge.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-contain p-5 md:p-7"
                />
              </div>
              <p className="mt-4 text-sm md:text-base text-zinc-700 font-medium font-sans group-hover:text-zinc-900 transition-colors">
                {badge.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
