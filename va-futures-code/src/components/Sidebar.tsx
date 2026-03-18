"use client";

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

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="flex flex-col items-center w-[72px] shrink-0 bg-bg-sidebar h-screen sticky top-0 py-6 gap-8">
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
                  className="bg-[#1F1F1F] rounded-lg w-[200px]"
                  style={{ padding: "12px 16px" }}
                >
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
              </div>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
