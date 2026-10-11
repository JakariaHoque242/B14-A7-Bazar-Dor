"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { ArrowLeft, User, Mail, LogOut, Edit3 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন।");
      router.push("/signin?redirect=/profile");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-bazar-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-bazar-muted">প্রোফাইল লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছেন!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট হতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-bazar-muted hover:text-bazar-primary transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>হোম পেজে ফিরে যান</span>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-bazar-base-content tracking-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-bazar-muted mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-bazar-base-300 p-6 sm:p-8 shadow-xs space-y-6">
        {/* User Top Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-bazar-base-200">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-emerald-100 border border-emerald-300 flex items-center justify-center text-2xl font-bold text-emerald-800 shrink-0 shadow-xs">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User Avatar"}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{(user.name || "U").charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-bazar-base-content">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="text-xs sm:text-sm text-bazar-muted mt-0.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-bazar-primary" />
                <span>{user.email}</span>
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>↩ সাইন আউট</span>
          </button>
        </div>

        {/* Account Details & Challenge C3 Update Button */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-bazar-base-content">
              ব্যক্তিগত তথ্য
            </h3>
            {/* C3 requirement: button taking user to another route */}
            <Link
              href="/profile/update"
              className="inline-flex items-center gap-2 px-4 py-2 bg-bazar-primary hover:bg-bazar-primary-hover text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>তথ্য পরিবর্তন করুন</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-bazar-base-100 p-4 rounded-xl border border-bazar-base-200">
              <span className="text-xs text-bazar-muted block font-medium">নাম</span>
              <p className="text-sm font-semibold text-bazar-base-content mt-1">
                {user.name || "নাম সেট করা হয়নি"}
              </p>
            </div>

            <div className="bg-bazar-base-100 p-4 rounded-xl border border-bazar-base-200">
              <span className="text-xs text-bazar-muted block font-medium">ইমেইল</span>
              <p className="text-sm font-semibold text-bazar-base-content mt-1">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
