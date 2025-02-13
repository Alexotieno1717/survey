"use client"
import Navbar from "@/components/navigation/navbar";
import Sidebar from "@/components/navigation/sidebar";
import { useState } from "react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	const [ sidebarOpen, setSidebarOpen ] = useState(false)

	const toggleSideBar = () => setSidebarOpen(!sidebarOpen)
	return (
		<>
			<Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSideBar} />
			<Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSideBar} />
			<div className="p-4 sm:ml-72">{children}</div>
		</>
	);
}
