"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const pathname = usePathname()
  const isJobDetails = pathname.includes("/jobs/")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full ${isScrolled ? "border-b shadow-sm" : ""} bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-200`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-md w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">CareerConnect</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={`text-sm ${pathname === "/" ? "text-blue-600 font-medium" : "text-gray-600"}`}>
              Home
            </Link>
            <Link
              href="/jobs"
              className={`text-sm ${pathname.includes("/jobs") ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              Jobs
            </Link>
            <Link
              href="/companies"
              className={`text-sm ${pathname.includes("/companies") ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              Companies
            </Link>
            {isJobDetails && (
              <Link href="/salaries" className="text-sm text-gray-600">
                Salaries
              </Link>
            )}
            {isJobDetails && (
              <Link href="/interview-prep" className="text-sm text-gray-600">
                Interview Prep
              </Link>
            )}
            <Link href="/resources" className="text-sm text-gray-600">
              Resources
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search"
              className="w-[200px] pl-9 h-9 bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
            />
          </div>

          <Button variant="ghost" size="icon" className="text-gray-600">
            <Bell className="h-5 w-5" />
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&auto=format&fit=crop"
              alt="User"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className={`text-base ${pathname === "/" ? "text-blue-600 font-medium" : "text-gray-600"}`}
                >
                  Home
                </Link>
                <Link
                  href="/jobs"
                  className={`text-base ${pathname.includes("/jobs") ? "text-blue-600 font-medium" : "text-gray-600"}`}
                >
                  Jobs
                </Link>
                <Link
                  href="/companies"
                  className={`text-base ${pathname.includes("/companies") ? "text-blue-600 font-medium" : "text-gray-600"}`}
                >
                  Companies
                </Link>
                <Link href="/salaries" className="text-base text-gray-600">
                  Salaries
                </Link>
                <Link href="/interview-prep" className="text-base text-gray-600">
                  Interview Prep
                </Link>
                <Link href="/resources" className="text-base text-gray-600">
                  Resources
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

