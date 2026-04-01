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
            A Devout Journey <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Since Day One.</span>
          </Heading>
          <Paragraph className="mb-6 text-lg leading-relaxed text-zinc-700">
            Hey there, I&apos;m Syed Ibtihaj - a passionate developer, avid writer,
            and a connoisseur of awesome design. Welcome to my corner of the
            digital world!
          </Paragraph>
          <Paragraph className="mb-6 text-zinc-500">
            Since the early days of my journey, I&apos;ve been captivated by the
            art of crafting exceptional digital experiences. As a developer, I
            thrive on turning lines of code into functional and elegant solutions.
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
            My goal is to not just create software, but to build digital marvels
            that seamlessly merge form and function. But my journey doesn&apos;t stop at coding. 
          </Paragraph>
          <Paragraph className="mb-6 text-zinc-600 italic font-mono border-l-2 border-blue-500 pl-6 py-2 bg-blue-50/50 rounded-r-lg">
            &quot;I believe that aesthetics and usability go hand in hand. My eye for awesome design ensures that every project not only works flawlessly but looks stunning.&quot;
          </Paragraph>
          <Paragraph className="text-zinc-500">
            Join me on this journey of bytes and narratives, logic and creativity,
            code and prose. Together, we can explore the boundless possibilities
            of technology and storytelling.
          </Paragraph>
        </motion.div>
      </div>
    </div>
  );
}
