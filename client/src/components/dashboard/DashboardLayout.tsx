import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [clientsMenuOpen, setClientsMenuOpen] = useState(false);

  const toggleClientsMenu = () => setClientsMenuOpen((open) => !open);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-r border-neutral-800 flex flex-col text-neutral-100">
        {/* Branding */}
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-lg font-bold tracking-wide bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            My Dashboard
          </h2>
          <p className="text-xs text-neutral-400">Control Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">


          {/* Clients menu with toggle */}
          <div>
            <Button
              variant="ghost"
              onClick={toggleClientsMenu}
              className="w-full justify-between items-center gap-2 text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
            >
              <div className="flex items-center gap-2">
                <Users size={18} />
                Clients
              </div>
              {clientsMenuOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </Button>

            {/* Dropdown submenu */}
            {clientsMenuOpen && (
              <div className="flex flex-col ml-6 mt-1 space-y-1">
                <Link href="/dashboard/clients/create">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition text-sm"
                  >
                    Create Client
                  </Button>
                </Link>
                <Link href="/dashboard/clients/view">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition text-sm"
                  >
                    View Clients
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <Link href="/dashboard/invoices/create">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
            >
              🧾 Create Invoice
            </Button>
          </Link>

        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-400 hover:bg-neutral-800 hover:text-red-300 transition"
          >
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-1">
        <Card className="h-full shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </main>
    </div>
  );
};
