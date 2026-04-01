import { motion } from "framer-motion";

export const Circles = () => {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: [0, 0.5, 0.2, 0],
          scale: 1,
          z: 0,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 0,
        }}
        className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-blue-500/[0.1] shadow-[0_8px_32px_rgba(59,130,246,0.1)]"
      ></motion.div>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: [0, 0.5, 0.2, 0],
          scale: 1,
          z: 0,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 2,
        }}
        className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.05] shadow-[0_8px_32px_rgba(14,165,233,0.1)]"
      ></motion.div>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: [0, 0.5, 0.2, 0],
          scale: 1,
          z: 0,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 4,
        }}
        className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-blue-500/[0.05] shadow-[0_8px_32px_rgba(59,130,246,0.1)]"
      ></motion.div>
    </>
  );
};
