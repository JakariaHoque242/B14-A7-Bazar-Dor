"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession, signOut } from "@/lib/auth-client";
import { Category } from "@/types";
import { getBengaliDateString } from "@/lib/utils";
import toast from "react-hot-toast";
import { ChevronDown, User, LogOut, Menu, X } from "lucide-react";

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentDate(getBengaliDateString());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছেন!");
      setIsDropdownOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট হতে সমস্যা হয়েছে");
    }
  };

  const user = session?.user;

  return (
    <header className="w-full bg-white border-b border-bazar-base-300 sticky top-0 z-40">
      
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-xs">
            🛒
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-bazar-base-content flex items-center gap-1.5">
              বাজার দর
            </span>
            <p className="text-xs text-bazar-muted font-normal leading-tight">
              {currentDate || "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {isPending ? (
            <div className="h-9 w-24 bg-bazar-base-200 animate-pulse rounded-lg" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-bazar-base-300 hover:border-bazar-primary hover:bg-bazar-base-100 transition-colors"
                aria-expanded={isDropdownOpen}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-emerald-100 border border-emerald-300 flex items-center justify-center text-sm font-semibold text-emerald-800 shrink-0">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{(user.name || "U").charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <span className="hidden sm:inline-block font-medium text-sm text-bazar-base-content max-w-[120px] truncate">
                  {user.name || "ব্যবহারকারী"}
                </span>
                <ChevronDown className={`w-4 h-4 text-bazar-muted transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-bazar-base-300 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-bazar-base-200">
                    <p className="font-semibold text-sm text-bazar-base-content truncate">
                      {user.name || "ব্যবহারকারী"}
                    </p>
                    <p className="text-xs text-bazar-muted truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-bazar-base-content hover:bg-bazar-base-200 transition-colors"
                    >
                      <User className="w-4 h-4 text-bazar-primary" />
                      <span>আমার প্রোফাইল</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-sm font-medium text-bazar-base-content hover:text-bazar-primary hover:bg-bazar-base-200 rounded-lg transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-sm font-medium text-white bg-bazar-primary hover:bg-bazar-primary-hover rounded-lg shadow-sm transition-colors"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-bazar-base-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">

            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id || cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
                    isActive
                      ? "bg-bazar-primary text-white border-bazar-primary shadow-xs"
                      : "bg-bazar-base-200 text-bazar-base-content border-bazar-base-300 hover:bg-bazar-base-300"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
