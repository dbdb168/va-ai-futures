"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Gauge,
  GraduationCap,
  Compass,
  Target,
  BarChart2,
  Mail,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { icon: BookOpen, href: "/ch1", subtitle: "CHAPTER 01", title: "The General Purpose Technology Thesis" },
  { icon: Gauge, href: "/ch2", subtitle: "CHAPTER 02", title: "The Fluency Variable" },
  { icon: GraduationCap, href: "/ch3", subtitle: "CHAPTER 03", title: "The Knowledge Network Effect" },
  { icon: Compass, href: "/ch4", subtitle: "CHAPTER 04", title: "Four Scenarios for Virginia" },
  { icon: Target, href: "/ch5", subtitle: "CHAPTER 05", title: "Implications and Qualifiers" },
  { icon: BarChart2, href: "/dashboard", subtitle: "DASHBOARD", title: "Where Is Virginia Tracking?" },
  { icon: Mail, href: "/contact", subtitle: "CONTACT", title: "Get in Touch" },
];

/* The 5 items shown in the mobile bottom bar (by href) */
const mobileBarHrefs = ["/ch1", "/ch4", "/dashboard", "/contact"];

export default function Sidebar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const mobileBarItems = navItems.filter((item) =>
    mobileBarHrefs.includes(item.href)
  );

  return (
    <>
      {/* ───────── Desktop sidebar (md+) — unchanged ───────── */}
      <aside className="hidden md:flex flex-col items-center w-[72px] shrink-0 bg-bg-sidebar h-screen sticky top-0 py-6 gap-8">
        {/* Logo */}
        <Link href="/">
          <div className="w-10 h-10 rounded-lg bg-accent-crimson flex items-center justify-center shrink-0">
            <span
              className="text-text-on-dark font-serif font-semibold text-base"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              VF
            </span>
          </div>
        </Link>

        {/* Nav icons */}
        <nav className="flex flex-col gap-2">
          {navItems.map(({ icon: Icon, href, subtitle, title }) => (
            <Link key={href} href={href}>
              <div className="relative group">
                {/* Active accent bar */}
                {isActive(href) && (
                  <div className="absolute left-0 top-0 w-[3px] h-full bg-accent-crimson rounded-r" />
                )}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isActive(href)
                      ? "bg-bg-sidebar-active"
                      : "hover:bg-bg-sidebar-active"
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      isActive(href) ? "text-accent-crimson" : "text-text-tertiary"
                    }
                  />
                </div>
                {/* Hover tooltip */}
                <div className="absolute left-[52px] top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <div
                    className="bg-[#2A2A2A] rounded-lg w-[220px] flex"
                    style={{ overflow: "hidden" }}
                  >
                    {/* Crimson left accent */}
                    <div style={{ width: 3, backgroundColor: "#C41E3A", flexShrink: 0 }} />
                    <div style={{ padding: "14px 16px" }}>
                      <div
                        className="uppercase"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "10px",
                          fontWeight: 600,
                          letterSpacing: "1px",
                          color: "#C41E3A",
                          lineHeight: "1.4",
                        }}
                      >
                        {subtitle}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#FAFAF7",
                          lineHeight: "1.4",
                          marginTop: "4px",
                        }}
                      >
                        {title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* ───────── Mobile bottom nav (below md) ───────── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around"
        style={{ height: 64, backgroundColor: "#0F0F0F" }}
      >
        {mobileBarItems.map(({ icon: Icon, href }) => (
          <Link key={href} href={href} className="flex items-center justify-center w-12 h-12">
            <Icon
              size={22}
              className={isActive(href) ? "text-accent-crimson" : "text-text-tertiary"}
            />
          </Link>
        ))}
        {/* Hamburger menu button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center justify-center w-12 h-12"
          aria-label="Open navigation menu"
        >
          <Menu size={22} className="text-text-tertiary" />
        </button>
      </nav>

      {/* ───────── Mobile full-screen overlay ───────── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col md:hidden"
          style={{ backgroundColor: "#0F0F0F" }}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between px-6" style={{ height: 64 }}>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <div className="w-10 h-10 rounded-lg bg-accent-crimson flex items-center justify-center">
                <span
                  className="text-text-on-dark font-serif font-semibold text-base"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  VF
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-10 h-10"
              aria-label="Close navigation menu"
            >
              <X size={24} className="text-text-tertiary" />
            </button>
          </div>

          {/* Nav items list */}
          <nav className="flex flex-col px-6 pt-4 gap-1 overflow-y-auto flex-1">
            {navItems.map(({ icon: Icon, href, subtitle, title }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 rounded-lg px-4 py-3 transition-colors"
                style={
                  isActive(href)
                    ? { backgroundColor: "rgba(196, 30, 58, 0.1)" }
                    : {}
                }
              >
                <Icon
                  size={20}
                  className={
                    isActive(href) ? "text-accent-crimson" : "text-text-tertiary"
                  }
                />
                <div>
                  <div
                    className="uppercase"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      color: "#C41E3A",
                      lineHeight: "1.4",
                    }}
                  >
                    {subtitle}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#FAFAF7",
                      lineHeight: "1.4",
                      marginTop: "2px",
                    }}
                  >
                    {title}
                  </div>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
