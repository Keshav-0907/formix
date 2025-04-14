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

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter();


  console.log('Loading')
  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router]) 

  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

  const slideUp = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 18,
      },
    },
  };

  return (
    <div className="min-h-screen h-full bg-[#0A0A0A]">
      <LandingPageHeader />

      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background dark">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
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
                  "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
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
              <div className="text-balance text-5xl font-semibold leading-none tracking-tighter">
                Design Forms That Work —{" "}
                <LineShadowText className="italic" shadowColor={'#467be5'}>
                  Instantly
                </LineShadowText>
              </div>
              <div className="max-w-2xl text-center text-[#C7C8CC]">
                Easily design interactive forms, customize them with drag-and-drop, share instantly, and track every view and response — all in one seamless experience.
              </div>
            </div>
          </motion.div>

          <motion.div variants={slideUp} transition={{ duration: 0.6 }}>
            <div className="flex gap-10 text-sm">
              <button className='bg-[#004BE0] hover:bg-[#004BE0]/80 px-3 py-2 cursor-pointer rounded-sm flex items-center gap-2'>
                Start Free Trial <Send size={14} />
              </button>
              <button className='px-3 py-2 cursor-pointer bg-[#0A0A0A] hover:bg-[#2a2a2a] rounded-sm'>
                How it Works ?
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
