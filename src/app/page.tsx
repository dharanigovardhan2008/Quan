"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Layers,
  MessageSquare,
  Globe2,
  X
} from "lucide-react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [authType, setAuthType] = useState<"signin" | "signup">("signin");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      amount: formData.get("amount") as string,
      date: formData.get("date") as string,
      phone: formData.get("phone") as string,
      details: formData.get("details") as string,
    };

    try {
      await addDoc(collection(db, "project_bookings"), {
        ...data,
        createdAt: serverTimestamp(),
        status: "new",
      });
      setSubmitStatus("success");
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    }

    const text = `New Project Request
Name: ${data.name}
Type: ${data.type}
Budget: ${data.amount}
Date: ${data.date}
Phone: ${data.phone}
Details: ${data.details}`;

    window.open(`https://wa.me/919494777869?text=${encodeURIComponent(text)}`, "_blank");

    setIsSubmitting(false);
  };

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Our Work", href: "#works" },
    { name: "Achievements", href: "#achievements" },
    { name: "FAQs", href: "#faq" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* NAVBAR */}
      <div className="fixed top-0 w-full z-50 flex justify-center pt-4">
        <header className={`w-full max-w-[55rem] rounded-full flex items-center ${isScrolled ? "bg-white shadow" : "bg-white"}`}>
          <div className="w-full px-5 flex justify-between items-center py-2">
            <Image src="/logo.png" alt="QuantumX" width={140} height={40} />

            <nav className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href}>{link.name}</a>
              ))}
            </nav>

            <button
              onClick={() => window.open("https://wa.me/919494777869")}
              className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2"
            >
              Book Call <ArrowRight size={14} />
            </button>
          </div>
        </header>
      </div>

      {/* HERO */}
      <section className="pt-40 text-center px-6">
        <h1 className="text-5xl font-black mb-6">
          The intelligent platform for modern enterprise
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Accelerate your team&apos;s workflow with next-generation tools.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setProjectModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2"
          >
            Book Project <ArrowRight />
          </button>

          <button
            onClick={() => window.open("https://wa.me/919494777869")}
            className="border px-6 py-3 rounded-full"
          >
            Book Call
          </button>
        </div>

        <div className="mt-10 flex justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CheckCircle2 size={16} /> Fast
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 size={16} /> Secure
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Services</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {["Web Dev", "AI", "Mobile"].map((s) => (
            <div key={s} className="border p-6 rounded-xl">
              <h3 className="font-bold">{s}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 text-center">
        <p>© {new Date().getFullYear()} QuantumX</p>
        <div className="flex justify-center gap-4 mt-4">
          <MessageSquare />
          <Globe2 />
        </div>
      </footer>

      {/* MODAL */}
      {projectModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl relative">
            <button onClick={() => setProjectModalOpen(false)} className="absolute top-2 right-2">
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4">Book Project</h2>

            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <input name="name" placeholder="Name" className="border p-2 w-full" required />
              <input name="phone" placeholder="Phone" className="border p-2 w-full" required />
              <button className="bg-blue-600 text-white w-full py-2 rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
