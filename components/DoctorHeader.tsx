'use client'

import React from 'react'
import { useState } from "react";
import Image from 'next/image'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from "lucide-react";

const DoctorHeader = () => {
  const pathname = usePathname()
   const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    return typeof window !== "undefined" && window.location.pathname === path;
  };

  // const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white border-b">
      <div className="mx-auto max-w-[1350px]">
        <div className="flex items-center justify-between h-[80px] px-6 py-3">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Image
              src="/images/logo.png"
              alt="Next.js logo"
              width={150}
              height={32}
              priority
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-9">
            <Link className={`hover:text-primary ${isActive('/doctor/dashboard') ? 'text-primary' : ''}`} href="/doctor/dashboard">Home</Link>
            <Link className={`hover:text-primary ${isActive('/doctor/diagnosis') ? 'text-primary' : ''}`} href="/doctor/diagnosis">Diagnosis</Link>
            <Link className={`hover:text-primary ${isActive('/doctor/care-plan') ? 'text-primary' : ''}`} href="/doctor/care-plan">Care Plan</Link>
            <Link className={`hover:text-primary ${isActive('/doctor/appointments') ? 'text-primary' : ''}`} href="/doctor/appointments">Appointments</Link>
            <Link className={`hover:text-primary ${isActive('/doctor/messaging') ? 'text-primary' : ''}`} href="/doctor/messages">Messaging</Link>
          </nav>

          {/* Right Side - Profile */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-secondary hover:bg-secondary text-white hover:text-white">
                  MI
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden bg-white border-t flex flex-col space-y-2 px-6 py-4">
            <Link onClick={() => setMobileOpen(false)} href="/doctor/dashboard" className={`hover:text-primary ${isActive('/doctor/dashboard') ? 'text-primary' : ''}`}>Home</Link>
            <Link onClick={() => setMobileOpen(false)} href="/doctor/diagnosis" className={`hover:text-primary ${isActive('/doctor/diagnosis') ? 'text-primary' : ''}`}>Diagnosis</Link>
            <Link onClick={() => setMobileOpen(false)} href="/doctor/care-plan" className={`hover:text-primary ${isActive('/doctor/care-plan') ? 'text-primary' : ''}`}>Care Plan</Link>
            <Link onClick={() => setMobileOpen(false)} href="/doctor/appointments" className={`hover:text-primary ${isActive('/doctor/appointments') ? 'text-primary' : ''}`}>Appointments</Link>
            <Link onClick={() => setMobileOpen(false)} href="/doctor/messaging" className={`hover:text-primary ${isActive('/doctor/messaging') ? 'text-primary' : ''}`}>Messaging</Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default DoctorHeader
