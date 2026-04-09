"use client";
import { Paragraph } from "@/components/Paragraph";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { certificationBadges } from "@/constants/certificationBadges";
import { Heading } from "./Heading";

export default function About() {
  const images = [
    "https://images.unsplash.com/photo-1692544350322-ac70cfd63614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692374227159-2d3592f274c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw8fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692445381633-7999ebc03730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
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
            Toward <span className="text-brand-gradient italic">solutions architecture.</span>
          </Heading>
          <Paragraph className="mb-6 text-lg leading-relaxed text-zinc-700">
            Hey, I&apos;m Syed, a Senior Product Support Engineer at HashiCorp (now IBM) and the founder of Webifex Labs, a small studio I started in 2022. I&apos;m deliberately moving toward{" "}
            <span className="font-medium text-zinc-800">Solutions Architect</span>
            {" "}
            work: customer-facing design conversations, trade-offs made explicit, and architectures that survive contact with production, not slide decks that ignore how things fail.
          </Paragraph>
          <Paragraph className="mb-6 text-zinc-500">
            That direction is grounded in how I got here: support and operations (helpdesks, Salesforce admin, higher-degree administration), then AWS as a Cloud Support Engineer on EKS, ECS, and Fargate for global enterprise customers, and now Terraform Enterprise at HashiCorp. I spend my days inside the gap between what people intend to deploy and what actually runs when data, auth, and upgrades meet reality.
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
            Over the last two years, Webifex Labs has been where I prove I can own the full story, not only tickets but boundaries, integrations, and observability. Two portfolio builds make that concrete:{" "}
            <Link
              href="/projects/ai-incident-assistant"
              className="text-emerald-700 underline-offset-4 hover:underline font-medium"
            >
              AI Incident Assistant
            </Link>
            {" "}(authenticated incident playground, MCP-backed tools, gateway-routed models, Supabase sessions and quotas, framed as one coherent system rather than a single-feature demo) and{" "}
            <Link
              href="/projects/ib-scheduling"
              className="text-emerald-700 underline-offset-4 hover:underline font-medium"
            >
              IB Scheduling
            </Link>
            {" "}(Next.js and a Go API on Railway with Supabase Auth and Postgres, OIDC-verified JWTs, race-safe booking, and Prometheus/Grafana telemetry, the sort of split you end up explaining to stakeholders when you justify cost, security, and operability).
          </Paragraph>
          <Paragraph className="mb-6 text-zinc-500">
            Alongside dozens of other client deliveries, I&apos;m pushing more of this work to GitHub and keeping this site current so the narrative matches what I ship.
          </Paragraph>
          <Paragraph className="mb-6 text-zinc-600 italic font-mono border-l-2 border-emerald-600 pl-6 py-2 bg-emerald-50/50 rounded-r-lg">
            &quot;Support taught me where designs crack; building end-to-end taught me how to close the loop. That&apos;s the mindset I bring to architecture conversations.&quot;
          </Paragraph>
          <Paragraph className="text-zinc-500">
            If you&apos;re hiring for Solutions Architecture, principal consulting, or a role that needs someone who can diagram a target state and defend it under production pressure, I&apos;d like to talk.
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

        <Heading as="h3" className="text-xl md:text-2xl lg:text-3xl font-normal tracking-tight mb-4">
          Certification <span className="text-zinc-300 font-light italic">Badges</span>
        </Heading>
        <Paragraph className="text-zinc-500 mb-10 max-w-2xl">
          AWS Solutions Architect - Associate sits alongside CKA and HashiCorp certifications. Together they back up the idea that I can talk customer outcomes and platform mechanics in the same conversation, which is what a lot of Solutions Architect roles are looking for.
        </Paragraph>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {certificationBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl border border-zinc-100 bg-white p-4 md:p-5 shadow-sm transition-all duration-500 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
            >
              <div className="flex h-64 md:h-72 w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 px-5 py-6 md:px-7 md:py-8">
                <Image
                  src={badge.src}
                  alt={badge.title}
                  width={badge.width}
                  height={badge.height}
                  unoptimized
                  className="h-auto max-h-full w-auto max-w-full object-contain"
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
