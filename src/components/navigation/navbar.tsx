import Image from "next/image";
import {
	Bell,
	Cloud,
	LifeBuoy,
	LogOut,
	User,
	UserPlus,
	Users,
	X,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface INavbarProps {
	sidebarOpen: boolean;
	toggleSidebar: () => void;
}

const Navbar = ({ sidebarOpen, toggleSidebar }: INavbarProps) => {
	return (
		<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start rtl:justify-end">
						<button
							data-drawer-target="logo-sidebar"
							data-drawer-toggle="logo-sidebar"
							aria-controls="logo-sidebar"
							type="button"
							className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
							onClick={toggleSidebar}
						>
							<span className="sr-only">Open sidebar</span>
							{sidebarOpen ? (
								<X className="w-6 h-6 text-gray-500" />
							) : (
								<svg
									className="w-6 h-6"
									aria-hidden="true"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										clipRule="evenodd"
										fillRule="evenodd"
										d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
									></path>
								</svg>
							)}
						</button>
						<Link href="/dashboard/home" className="flex ms-2 md:me-24">
							<Image
								src={"/assets/icons/bongasms-logo.png"}
								width={129}
								height={42}
								alt="BongaSMS logo"
								className="mx-auto"
							/>
						</Link>
					</div>
					<div className="flex items-center">
						<button
							type="button"
							className="group text-gray-500 border border-gray-500 hover:bg-primary hover:text-white focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
						>
							<Bell className="w-4 h-4 text-gray-500 group-hover:text-white" />
							<span className="sr-only">notifications icon</span>
						</button>
						<div className="flex items-center ms-4">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className="border-0 border-none p-0 !focus:outline-none">
										<span className="sr-only">Open user menu</span>
										<img
											className="w-10 h-10 rounded-full"
											src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
											alt="user photo"
										/>
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56 me-4">
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem disabled>
											<User className="mr-2 h-4 w-4" />
											<span>Profile</span>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<Link href={"/dashboard/clients"}>
											<DropdownMenuItem>
												<Users className="mr-2 h-4 w-4" />
												<span>Clients</span>
											</DropdownMenuItem>
										</Link>
										<DropdownMenuSub>
											<DropdownMenuSubTrigger>
												<UserPlus className="mr-2 h-4 w-4" />
												<span>Settings</span>
											</DropdownMenuSubTrigger>
											<DropdownMenuPortal>
												<DropdownMenuSubContent>
													<Link href={"/dashboard/settings/transactiontags"}>
														<DropdownMenuItem>
															<span>Transaction Tags</span>
														</DropdownMenuItem>
													</Link>
													<Link href={"/dashboard/settings/networks"}>
														<DropdownMenuItem>
															<span>Networks</span>
														</DropdownMenuItem>
													</Link>
													<DropdownMenuSeparator />
													<Link href={"/dashboard/settings/services"}>
														<DropdownMenuItem>
															<span>Services</span>
														</DropdownMenuItem>
													</Link>
												</DropdownMenuSubContent>
											</DropdownMenuPortal>
										</DropdownMenuSub>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem disabled>
										<LifeBuoy className="mr-2 h-4 w-4" />
										<span>Support</span>
									</DropdownMenuItem>
									<Link href="/dashboard/developerhub">
										<DropdownMenuItem>
											<Cloud className="mr-2 h-4 w-4" />
											<span>Developer Hub</span>
										</DropdownMenuItem>
									</Link>
									<DropdownMenuSeparator />
									<Link href="/dashboard/logout">
										<DropdownMenuItem>
											<LogOut className="mr-2 h-4 w-4" />
											<span>Log out</span>
										</DropdownMenuItem>
									</Link>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
