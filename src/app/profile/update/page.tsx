"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { ArrowLeft, User, CheckCircle2 } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isPending) {
      if (!session?.user) {
        toast.error("তথ্য আপডেট করতে অনুগ্রহ করে সাইন ইন করুন।");
        router.push("/signin?redirect=/profile/update");
      } else if (session.user.name) {
        setName(session.user.name);
      }
    }
  }, [isPending, session, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("নামের ঘরটি খালি রাখা যাবে না।");
      toast.error("নামের ঘরটি খালি রাখা যাবে না।");
      return;
    }

    setLoading(true);
    try {
      // BetterAuth updateUser API
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res?.error) {
        const msg = res.error.message || "তথ্য আপডেট করতে ব্যর্থ হয়েছে।";
        setErrorMsg(msg);
        toast.error(msg);
      } else {
        toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch {
      setErrorMsg("তথ্য আপডেট করতে সমস্যা হয়েছে।");
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-bazar-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-bazar-muted">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm text-bazar-muted hover:text-bazar-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-extrabold text-bazar-base-content tracking-tight">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-sm text-bazar-muted mt-1.5 leading-relaxed">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচে নতুন নামটি লিখুন।
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-bazar-base-300 p-6 sm:p-8 shadow-sm">
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-bazar-base-content mb-1.5">
                নাম (Name)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নতুন নাম লিখুন"
                  required
                  className="w-full bg-bazar-base-100 border border-bazar-base-300 focus:border-bazar-primary rounded-xl px-3.5 py-2.5 pl-10 text-sm text-bazar-base-content focus:outline-hidden focus:ring-2 focus:ring-bazar-primary/20 transition-all placeholder:text-gray-400"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Read-only email notice */}
            <div className="bg-bazar-base-100 p-3 rounded-xl border border-bazar-base-200 text-xs text-bazar-muted">
              <span className="font-medium text-bazar-base-content block">ইমেইল: {session.user.email}</span>
              (ইমেইল পরিবর্তনযোগ্য নয়)
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-bazar-primary hover:bg-bazar-primary-hover text-white text-sm font-semibold rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Update Information</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
