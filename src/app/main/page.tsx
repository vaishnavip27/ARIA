"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from "lucide-react";
import { Sidebar } from "@/components/Sidebar"; 
import { SparklesCore } from "@/components/ui/sparkles";
import { GradientBlur } from "@/components/GradientBlur";
import {
  connectToArConnect,
  disconnectFromArConnect,
  isWalletConnected,
} from "@/lib/arconnect";

interface Message {
  content: string;
  isUser: boolean;
}

const MessageBoxWithGradient = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-75 blur-lg" />
      {/* Additional gradient layer for depth */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500 via-transparent to-transparent opacity-50" />
      <div className="relative">{children}</div>
    </div>
  );
};

export default function MainPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkWalletStatus = async () => {
      try {
        const connected = await isWalletConnected();
        if (connected) {
          const walletAddress = await connectToArConnect();
          setAddress(walletAddress);
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };
    checkWalletStatus();
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const walletAddress = await connectToArConnect();
      setAddress(walletAddress);
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectFromArConnect();
      setAddress(null);
      setIsFirstMessage(true);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!address) {
      const connected = await handleConnect();
      if (!connected) {
        setMessages((prev) => [
          ...prev,
          {
            content: "Please connect your wallet to continue.",
            isUser: false,
          },
        ]);
        return;
      }
    }

    setMessages((prev) => [...prev, { content: input, isUser: true }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { content: "I'm processing your request: " + input, isUser: false },
      ]);
    }, 500);

    setInput("");
    setIsFirstMessage(false);
  };

  // Define the onNewChat function here
  const onNewChat = () => {
    // Logic to create a new chat (for now, just clearing the messages)
    setMessages([]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F] text-white relative">
      <header className="fixed right-4 top-4 z-50 flex items-center gap-2">
        {address ? (
          <>
            <div className="text-sm font-mono break-all border border-white/20 p-2 rounded-xl font-medium text-white/70">
              {address}
            </div>
            <Button
              variant="ghost"
              className="text-sm bg-white/80 border border-black font-bold text-black rounded-xl"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            onClick={handleConnect}
            disabled={isConnecting}
            className={`text-sm hover:bg-white/0 border border-white rounded-xl ${
              isConnecting ? "cursor-not-allowed" : ""
            }`}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}
      </header>
      <div className="flex flex-1">
        {/* Pass onNewChat as a prop to Sidebar */}
        <Sidebar onNewChat={onNewChat} />
        <main className="flex-1 pl-16 relative">
          {isFirstMessage ? (
            <div className="flex min-h-screen flex-col items-center justify-center p-4 relative">
              <div className="absolute inset-0 z-0">
                <GradientBlur />
              </div>
              <div className="flex flex-col items-center justify-center space-y-8 max-w-[770px] w-full relative z-10">
                <Image
                  src="/image.png"
                  alt="abc"
                  width={60}
                  height={60}
                  className="p-1 bg-gradient-to-br from-indigo-500 border border-white/20 rounded-xl"
                />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  How can I assist you today?
                </h1>
                <div className="w-full">
                  <div className="relative overflow-hidden rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
                    <form onSubmit={handleSubmit} className="relative z-10">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="h-[82px] rounded-lg border-0 bg-transparent pl-10 pr-20 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Ask me anything..."
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20">
                        <Paperclip className="h-5 w-5 text-gray-400" />
                      </div>
                      <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-20"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                    <div className="absolute inset-0 z-20 pointer-events-none mix-blend-lighten">
                      <SparklesCore
                        id="searchBarParticles"
                        background="transparent"
                        minSize={0.4}
                        maxSize={1.2}
                        particleDensity={80}
                        particleColor="#FFFFFF"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-screen">
              {/* Messages and Input */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
