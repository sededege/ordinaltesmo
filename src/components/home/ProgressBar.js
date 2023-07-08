import React from "react";
import { motion } from "framer-motion";

import "tailwindcss/tailwind.css";

const ProgressBar = ({ progress, state }) => {
  return (
    <div className="relative w-full h-2 rounded-full bg-tesmo2 overflow-hidden ">
      <motion.div
className={`${state !== 'orange' ? 'bg-purple-500' : 'bg-orange-500'} absolute top-0 left-0 h-full`}
style={{ width: `${progress}%` }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      ></motion.div>
    </div>
  );
};

export default ProgressBar;
