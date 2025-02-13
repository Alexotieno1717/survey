import NotFound from "@/components/notfound/notFound";
import DataTable from "@/components/tables/dataTable";
import { Button } from "@/components/ui/button";
import CustomizeButton from "@/components/ui/CustomizeButton";
import ExportButton from "@/components/ui/ExportButton";
import FilterButton from "@/components/ui/FilterButton";
import HeaderWithButton from "@/components/ui/HeaderWithButton";

let data = [];
const Page = () => {
	return (
		<div className="md:p-4 pt-8 mt-12 space-y-4">
			{data.length < 1 ? (
				<div className="h-[calc(100vh_-_116px)]">
					<div className="py-[22px] space-y-6">
						<HeaderWithButton title="Survey"/>
					</div>
                    <div className="bg-white flex  h-[calc(100vh_-_200px)] rounded-xl">
                        <div className="flex items-center justify-center mx-auto">

					<NotFound title="Survey" pathToCreate={"/dashboard/survey/createsurvey"} />
                        </div>

                    </div>
				</div>
			) : (
				<>
					<div className="pt-[22px] space-y-6">
						<HeaderWithButton title="Create Survey" showButton={true} />
						<HeaderWithButton
							title="Manage Survey Questions"
							showButton={true}
						/>
					</div>
					<div className="px-6">
						<form action="">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-[6px]">
									<label className="text text-sm">Survey</label>
									<select className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
										<option value="">Select survey ...</option>
										<option value="1">Survey 1</option>
										<option value="2">Survey 2</option>
										<option value="3">Survey 3</option>
									</select>
								</div>

								<div className="space-y-[6px]">
									<label className="text text-sm ">Survey Question</label>
									<select className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
										<option value="">Select survey question ...</option>
										<option value="1">Survey 1</option>
										<option value="2">Survey 2</option>
										<option value="3">Survey 3</option>
									</select>
								</div>
							</div>

							<div className="flex items-end justify-end pt-[17px] space-x-3">
								<Button variant="outline">Reset</Button>
								<Button>Search</Button>
								<Button>Create Survey Question</Button>
							</div>
						</form>
					</div>
					<div className="p-6">
						<div className="flex space-x-4 mb-6">
							<div className="relative flex-grow">
								<input
									type="text"
									className="w-full px-10 py-3 border border-gray-300 rounded-[8px] shadow-sm text-gray-500 placeholder-gray-500 placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
									placeholder="Search"
								/>
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
									<svg
										className="w-5 h-5 text-gray-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
										></path>
									</svg>
								</span>
							</div>
							<FilterButton />
							<CustomizeButton />
							<ExportButton />
						</div>
					</div>
					<div>
						<DataTable />
					</div>
				</>
			)}
		</div>
	);
};

export default Page;
