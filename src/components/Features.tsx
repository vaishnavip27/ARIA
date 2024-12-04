import React from 'react';
import { motion } from 'framer-motion';
import { Token, Repeat, Bridge, Bot, Rocket, Coins } from 'lucide-react';
import { FeatureCard } from '../components/FeatureCard';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Token,
      title: "Custom Token Creation",
      description: "Create custom tokens with specific parameters through simple natural language prompts"
    },
    {
      icon: Repeat,
      title: "Token Swapping",
      description: "Seamlessly swap tokens across different platforms with AI-optimized routes"
    },
    {
      icon: Bridge,
      title: "Cross-chain Bridge",
      description: "Bridge your assets across different blockchains with intelligent routing"
    },
    {
      icon: Bot,
      title: "AI Assistant",
      description: "24/7 AI support for all your DeFi operations and queries"
    },
    {
      icon: Rocket,
      title: "Smart Vesting",
      description: "Set up and manage token vesting schedules with natural language commands"
    },
    {
      icon: Coins,
      title: "Portfolio Management",
      description: "AI-powered insights and management for your DeFi portfolio"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Powered by AI, Built for DeFi</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Experience the future of decentralized finance with our AI-powered platform
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}