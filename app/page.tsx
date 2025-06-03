'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import LandingPageHeader from "@/components/common/LandingPageHeader";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon, Send } from "lucide-react";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { useTheme } from "next-themes";
import { Pointer } from "@/components/magicui/pointer";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import Footer from "@/components/common/Footer";


export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter();

  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

  const slideUp = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen h-full bg-[#0E0D13] dark">
      <LandingPageHeader />

      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-[#0E0D13] px-4 md:px-6">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />

        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.2 }}
          className="text-[#F8F8F8] flex flex-col items-center gap-10 z-10"
        >
          <motion.div variants={slideUp} transition={{ duration: 0.6 }}>
            <div className="z-10 flex items-center justify-center pb-10">
              <div
                className={cn(
                  "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span className="text-sm pr-2">✨ Introducing Formix </span>
                  <ArrowRightIcon size={16} />
                </AnimatedShinyText>
              </div>
            </div>
          </motion.div>

          <motion.div variants={slideUp} transition={{ duration: 0.6 }}>
            <div className="flex flex-col items-center gap-4">
              <div className="text-balance text-5xl font-semibold leading-none tracking-tighter text-center">
                Design Forms That Work —{" "}
                <LineShadowText className="italic" shadowColor="#467be5">
                  Instantly
                </LineShadowText>
              </div>
              <div className="max-w-2xl text-center text-[#C7C8CC]">
                Easily design interactive forms, customize them with drag-and-drop, share instantly, and track every view and response — all in one seamless experience.
              </div>
            </div>
          </motion.div>

          <motion.div variants={slideUp} transition={{ duration: 0.6 }}>
            {
              user ? (
                <div className="flex gap-4 md:gap-10 text-sm flex-wrap justify-center">
                  <button onClick={()=>router.push('/dashboard')} className="bg-[#004BE0] hover:bg-[#004BE0]/80 px-3 py-2 cursor-pointer rounded-sm flex items-center gap-2">
                    Go to Dashboard <Send size={14} />
                  </button>

                  <button className="px-3 py-2 cursor-pointer bg-[#0A0A0A] hover:bg-[#2a2a2a] rounded-sm">
                    How it Works?
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 md:gap-10 text-sm flex-wrap justify-center">
                  <button className="bg-[#7D5FF3] hover:bg-[#7D5FF3]/80 px-3 py-2 cursor-pointer rounded-sm flex items-center gap-2">
                    Start Free Trial <Send size={14} />
                  </button>
                  <button className="px-3 py-2 cursor-pointer bg-[#0A0A0A] hover:bg-[#2a2a2a] rounded-sm">
                    How it Works?
                  </button>
                </div>
              )
            }
          </motion.div>
        </motion.div>
      </div>

      <div className="text-[#F8F8F8] px-4 md:px-6 py-20 flex bg-[#0E0D13] flex-col gap-10 items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center z-10 flex flex-col gap-2"
        >
          <div className="text-2xl font-semibold tracking-tight">
            Watch How It Works
          </div>
          <p className="max-w-2xl mx-auto text-[#C7C8CC] text-sm">
            Explore how Formix lets you design and publish forms effortlessly — all in real time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-7xl md:rounded-xl rounded-md overflow-hidden shadow-xl z-10 border-2 border-[#4B4B4B] md:p-2 p-1"
        >
          <video
            src="/DemoVideo.mp4"
            className="rounded-xl w-full h-auto opacity-80  shadow-lg"
            autoPlay
            loop
            muted
            controls={false}
          />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
