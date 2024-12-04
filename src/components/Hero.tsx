import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GradientButton } from "../components/GradientButton

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-transparent" />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            AraoAI
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Your AI-powered DeFi companion built on Arweave and AO. Create, swap, and manage tokens with natural language prompts.
          </p>
          <div className="flex gap-4">
            <GradientButton>
              Get Started <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </GradientButton>
            <button className="px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}