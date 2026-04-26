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
  const [projectModalOpen, setProjectModalOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-white text-black">

      {/* NAVBAR */}
      <header className={`fixed w-full top-0 z-50 ${isScrolled ? "bg-white shadow" : ""}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Layers /> QuantumX
          </div>
          <button
            onClick={() => window.open("https://wa.me/919494777869")}
            className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            Book Call <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
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
            <CheckCircle2 size={16} /> Fast Delivery
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 size={16} /> Secure
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Image
            src="/hero_dashboard.png"
            alt="Dashboard"
            width={1000}
            height={600}
            className="rounded-xl"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Services</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {["Web Development", "AI Integration", "Mobile Apps"].map((s) => (
            <div key={s} className="border p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">{s}</h3>
              <p className="text-gray-500 text-sm">
                High-quality {s} solutions built for scale.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 mt-20 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} QuantumX Technologies
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <MessageSquare />
          <Globe2 />
        </div>
      </footer>

      {/* MODAL */}
      {projectModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setProjectModalOpen(false)}
              className="absolute top-2 right-2"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">Book Project</h2>

            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <input name="name" placeholder="Name" className="w-full border p-2 rounded" required />
              <input name="phone" placeholder="Phone" className="w-full border p-2 rounded" required />
              <input name="amount" placeholder="Budget" className="w-full border p-2 rounded" required />

              <button className="bg-blue-600 text-white w-full py-3 rounded">
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              {submitStatus === "success" && <p className="text-green-600">Saved successfully!</p>}
              {submitStatus === "error" && <p className="text-red-600">Error saving data</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
