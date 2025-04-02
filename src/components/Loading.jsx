import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex space-x-2">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="w-5 h-5 bg-green-500 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
