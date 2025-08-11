// import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";
import Header from "../../components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function Dashboard({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden w-full">
      <SidebarProvider>
        {/* <Sidebar /> */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <Header />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
