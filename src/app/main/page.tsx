"use client";

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
      {/* Gradient blur background */}
      <div className="absolute inset-0 -z-10">
        <GradientBlur />
      </div>
      
      {/* Message box content */}
      <div className="relative">
        {children}
      </div>
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
        setMessages(prev => [...prev, {
          content: "Please connect your wallet to continue.",
          isUser: false
        }]);
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

  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F] text-white relative">
      <header className="fixed right-4 top-4 z-50 flex items-center gap-2">
        {address ? (
          <>
            <div className="text-sm font-mono break-all">{address}</div>
            <Button
              variant="ghost"
              className="text-sm hover:bg-white/10 border border-red-500 text-red-500 rounded-xl"
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
            className={`text-sm hover:bg-white/10 border border-white rounded-xl ${isConnecting ? "cursor-not-allowed" : ""}`}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}
      </header>

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 pl-16 relative">
          {isFirstMessage ? (
            <div className="flex min-h-screen flex-col items-center justify-center p-4 relative">
              <div className="absolute inset-0 z-0">
                <GradientBlur />
              </div>

              <div className="relative z-10 flex mb-12 items-center justify-center">
                <div className="flex items-center w-[160px] justify-center p-1 rounded-full bg-transparent text-white text-center font-bold text-md">
                  Introducing AI
                </div>
              </div>

              <h1 className="mb-8 text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent relative z-10">
                What can I help you ship?
              </h1>

              <div className="relative w-full max-w-[770px] mx-auto z-10">
                <div className="border border-white/20 rounded-lg overflow-hidden bg-[#27272a]">
                  <form onSubmit={handleSubmit} className="relative z-10">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="h-[64px] rounded-lg border-0 bg-black pl-10 pr-20 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Ask v0 a question..."
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
          ) : (
            <div className="flex flex-col h-screen">
              <div className="flex-1 p-4 mt-16">
                <div className="max-w-[770px] mx-auto">
                  <MessageBoxWithGradient>
                    <div className="h-[calc(100vh-240px)] mb-8 overflow-y-auto p-2 rounded-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ">
                      <div className="space-y-4">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex items-start gap-2 ${
                              message.isUser ? "flex-row-reverse" : "flex-row"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                              <img
                                src={message.isUser ? "/image.png" : "/image2.png"}
                                alt={message.isUser ? "User Avatar" : "AI Avatar"}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div
                              className={`max-w-[75%] p-2 rounded-lg ${
                                message.isUser
                                  ? "bg-gray-800 text-gray-200"
                                  : "bg-[#27272a] text-gray-300"
                              }`}
                            >
                              {message.content}
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </div>
                  </MessageBoxWithGradient>
                </div>
              </div>

              <div className="fixed bottom-16 left-16 right-0 p-4 bg-[#0F0F0F]">
                <div className="max-w-[770px] mx-auto relative">
                  <div className="border border-white/20 rounded-lg overflow-hidden bg-[#27272a]">
                    <form onSubmit={handleSubmit} className="relative z-10">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="h-[56px] rounded-lg border-0 bg-black pl-10 pr-20 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Type your message..."
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Paperclip className="h-5 w-5 text-gray-400" />
                      </div>
                      <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                    <div className="absolute inset-0 z-20 pointer-events-none mix-blend-lighten">
                      <SparklesCore
                        id="searchBarParticlesInput"
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
          )}
        </main>
      </div>
    </div>
  );
}