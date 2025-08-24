"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const doctors = [
  {
    name: "General Physician",
    description: "Helps with everyday health concerns and common symptoms.",
    image: "/doctor1.png",
    isPremium: false,
  },
  {
    name: "Pediatrician",
    description: "Expert in children's health, from babies to teens.",
    image: "/doctor2.png",
    isPremium: true,
  },
  {
    name: "Dermatologist",
    description: "Handles skin issues like rashes, acne, or infections.",
    image: "/doctor3.png",
    isPremium: true,
  },
  {
    name: "Psychologist",
    description: "Supports mental health and emotional well-being.",
    image: "/doctor4.png",
    isPremium: true,
  },
  {
    name: "Nutritionist",
    description: "Provides advice on healthy eating and weight management.",
    image: "/doctor5.png",
    isPremium: true,
  }
];

const features = [
  {
    title: "AI-Powered Diagnosis",
    value: "1000+",
    description: "Medical consultations completed"
  },
  {
    title: "Specialist Doctors",
    value: "10+",
    description: "Expert AI agents available"
  },
  {
    title: "User Satisfaction",
    value: "98%",
    description: "Positive feedback from users"
  },
  {
    title: "Available 24/7",
    value: "100%",
    description: "Always ready to help"
  }
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "Always free",
    features: [
      "1 Free Medical Consultation",
      "Free medical Report",
    ],
    isActive: false,
  },
  {
    name: "Pro",
    price: "$4",
    period: "/month",
    features: [
      "30 Medical Consultant / Month",
      "Unlimited Medical Reports",
      "Email Support",
      "Priority Support",
    ],
    isActive: true,
  }
];

export const MainShowcase = () => {
  return (
    <div className="w-full space-y-32 py-20">
      {/* Doctor Specialists Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">AI Specialist Doctor Agent</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our AI-powered medical specialists for instant consultations and expert advice
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                {doctor.isPremium && (
                  <Badge className="absolute top-4 right-4 bg-black text-white">
                    Premium
                  </Badge>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-gray-600 mb-4">{doctor.description}</p>
                <Button className="w-full">Start Consultation</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg"
              >
                <h3 className="text-4xl font-bold text-blue-600 mb-4">{feature.value}</h3>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Report Preview Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Detailed Medical Reports</h2>
              <p className="text-gray-600">
                Get comprehensive medical reports after each consultation. Our AI-powered system generates
                detailed summaries including symptoms, diagnosis, and recommendations.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Symptom Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Treatment Recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Follow-up Care Instructions</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/medical-assistance.png"
                alt="Medical Report Preview"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Join Subscription</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your healthcare needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg relative"
            >
              {plan.isActive && (
                <Badge className="absolute top-4 right-4">
                  Active
                </Badge>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600 ml-1">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant={plan.isActive ? "secondary" : "default"} className="w-full">
                {plan.isActive ? "Current Plan" : "Switch to this plan"}
              </Button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}


