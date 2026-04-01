import { motion } from "framer-motion";

export const Lines = () => {
  return (
    <>
      {/* Blur Line */}
      <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-blue-500/20 translate-y-[14px] w-px h-40 blur-[1px]" />
      {/* Glow Line */}
      <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-blue-500/50 translate-y-[14px] w-px h-40 " />
      {/* Blur Circle */}
      <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-blue-600/20 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[2px]" />
      {/* Glow Circle */}
      <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-blue-500 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40 " />
    </>
  );
};
