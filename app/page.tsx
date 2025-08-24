"use client";


import { motion } from "motion/react";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSectionOne() {
  const { user } = useUser();

  useEffect(() => {
    const createUser = async () => {
      if (user) {
        try {
          await fetch('/api/users', {
            method: 'POST',
          });
        } catch (error) {
          console.error('Error creating user:', error);
        }
      }
    };
    
    createUser();
  }, [user]);

  return (
    <div className="relative  my-10 flex  flex-col items-center justify-center">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"🧠Transform Healthcare with AI Medical Voice Agents"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Provide 24/7 intelligent medical support using conversational AI. Triage symptoms, book appointments, and deliver empathetic care with voice-first automation.
        </motion.p>
          
          <Link href={'/sign-in'}>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
         {!user ? <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Get Started
          </button>
          :
          <div className="flex gap-5 items-center ">
       
       
         
          <Link href={'/dashboard'}>
          
            <Button>
              Go to the Dashboard
              <ArrowRight/>
            </Button>
          </Link>
        
      </div>}
        </motion.div>

        </Link>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
            <img
              src="/image.png"
              alt="Landing page preview"
              className="h-auto w-full object-contain"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
      <FeatureBentoGrid/>
      
    </div>
  );
}

const Navbar = () => {
  const {user} = useUser();
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      
        
        <div className='flex items-center justify-between p-4  px-6 md:px-20 lg:px-40 bg-white'>
        <Image src={'/logo.svg'} alt='logo' width={180} height={90} />
        </div>
        
      
      {!user?
      <Link href={'/sign-in'}> <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Login
      </button>
      </Link>
      :
      <div className="flex gap-5 items-center">
        <UserButton />
       
         
          <Link href={'/dashboard'}>
            <Button>
              Dashboard
            </Button>
          </Link>
        
      </div>
}
    </nav>
  );
};

