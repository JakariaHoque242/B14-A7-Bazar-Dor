"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("অনুগ্রহ করে আপনার নাম প্রদান করুন।");
      toast.error("অনুগ্রহ করে আপনার নাম প্রদান করুন।");
      return;
    }

    if (!email.trim() || !password) {
      setErrorMsg("ইমেইল ও পাসওয়ার্ড উভয়ই আবশ্যক।");
      toast.error("ইমেইল ও পাসওয়ার্ড উভয়ই আবশ্যক।");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("উভয় পাসওয়ার্ড মেলেনি। আবার লিখুন।");
      toast.error("উভয় পাসওয়ার্ড মেলেনি। আবার লিখুন।");
      return;
    }

    setLoading(true);
    try {
      const res = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (res.error) {
        const msg = res.error.message || "রেজিস্ট্রেশন করতে সমস্যা হয়েছে।";
        setErrorMsg(msg);
        toast.error(msg);
      } else {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে সাইন ইন করুন।");
        router.push("/signin");
      }
    } catch {
      setErrorMsg("রেজিস্ট্রেশন প্রক্রিয়া সম্পন্ন করা যায়নি।");
      toast.error("রেজিস্ট্রেশন সম্পন্ন করা যায়নি।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: "google" | "github") => {
    try {
      setLoading(true);
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      toast.error(`${provider === "google" ? "Google" : "GitHub"} সাইন আপ ব্যর্থ হয়েছে।`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-bazar-muted hover:text-bazar-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>

        {/* Header Title & Subtitle */}
        <div className="text-left">
          <h1 className="text-3xl font-extrabold text-bazar-base-content tracking-tight">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-sm text-bazar-muted mt-1.5 leading-relaxed">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-bazar-base-300 p-6 sm:p-8 shadow-sm">
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-xs font-semibold text-bazar-base-content mb-1.5">
                নাম
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: রহিম উদ্দিন"
                  required
                  className="w-full bg-bazar-base-100 border border-bazar-base-300 focus:border-bazar-primary rounded-xl px-3.5 py-2.5 pl-10 text-sm text-bazar-base-content focus:outline-hidden focus:ring-2 focus:ring-bazar-primary/20 transition-all placeholder:text-gray-400"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-bazar-base-content mb-1.5">
                ইমেইল
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-bazar-base-100 border border-bazar-base-300 focus:border-bazar-primary rounded-xl px-3.5 py-2.5 pl-10 text-sm text-bazar-base-content focus:outline-hidden focus:ring-2 focus:ring-bazar-primary/20 transition-all placeholder:text-gray-400"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-bazar-base-content mb-1.5">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  required
                  className="w-full bg-bazar-base-100 border border-bazar-base-300 focus:border-bazar-primary rounded-xl px-3.5 py-2.5 pl-10 pr-10 text-sm text-bazar-base-content focus:outline-hidden focus:ring-2 focus:ring-bazar-primary/20 transition-all placeholder:text-gray-400"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-semibold text-bazar-base-content mb-1.5">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="আবার লিখুন"
                  required
                  className="w-full bg-bazar-base-100 border border-bazar-base-300 focus:border-bazar-primary rounded-xl px-3.5 py-2.5 pl-10 text-sm text-bazar-base-content focus:outline-hidden focus:ring-2 focus:ring-bazar-primary/20 transition-all placeholder:text-gray-400"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-bazar-primary hover:bg-bazar-primary-hover text-white text-sm font-semibold rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>অ্যাকাউন্ট তৈরি করুন</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-bazar-base-200" />
            </div>
            <span className="relative bg-white px-3 text-xs text-bazar-muted">
              অথবা
            </span>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialSignUp("google")}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-bazar-base-300 hover:bg-bazar-base-100 transition-colors text-xs font-semibold text-bazar-base-content"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignUp("github")}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-bazar-base-300 hover:bg-bazar-base-100 transition-colors text-xs font-semibold text-bazar-base-content"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-xs text-bazar-muted">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-semibold text-bazar-primary hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
