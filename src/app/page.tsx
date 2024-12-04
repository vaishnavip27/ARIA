"use client";
import { useRouter } from "next/navigation";
import {AnimatedBeamMultipleOutputDemo } from "../components/BeamMultiple";

export default function Home() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/main");
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white text-center overflow-y-auto">
      {/* Main Header Section */}
      <section className="flex flex-col justify-center items-center h-screen border border-white">
        <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-bricolage">
          Unleash the power of <br />
          web3 intents with AI
        </h1>
        <p className="text-xl font-bold">
          Execute transactions, search resources and retrieve onchain data by
          prompting in natural language.
        </p>
        <button
          onClick={handleNavigation}
          className="mt-6 px-5 py-3 w-[162px] bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md shadow-md transition"
        >
          Launch App
        </button>
      </section>

      {/* Vision Section */}
      <section className="text-center px-4">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-300 bg-clip-text text-transparent font-bricolage">
          Our Vision
        </h2>
        <p className="text-3xl font-bold max-w-5xl mx-auto">
        We believe in a future where every onchain interaction starts from a <br/>simple prompt to make web3 accessible to everyone.
        </p>

        <div className="mx-auto">
          <AnimatedBeamMultipleOutputDemo />
        </div>
      </section>
    </div>
  );
}
