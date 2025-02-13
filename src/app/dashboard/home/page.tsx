import ChartDecrease from "@/components/charts/ChartDecrease";
import CustomLegend from "@/components/charts/CustomLegend";
import MessagingBarChart from "@/components/charts/MessagingBarChart";
import StackedBarChart from "@/components/charts/StackedBarChart";
import TinyAreaChart from "@/components/charts/TinyAreaChart";
import FilterButton from "@/components/ui/FilterButton";
import OverviewCards from "@/components/home/OverviewCards";
import StatsCard from "@/components/home/StatsCard";
import HeaderWithButton from "@/components/ui/HeaderWithButton";

const overviewValues = [
	{
		img: "/assets/icons/sender-id-1.png",
		title: "Register for a sender ID",
		description:
			"To register your alphanumeric Sender ID, the Kenyan network operators Safaricom & Airtel require that you provide some details",
	},
	{
		img: "/assets/icons/sender-id-2.png",
		title: "Apply for bulk data",
		description:
			"To register your alphanumeric Sender ID, the Kenyan network operators Safaricom & Airtel require that you provide some details",
	},
	{
		img: "/assets/icons/sender-id-3.png",
		title: "Send Email",
		description: "Send emails to your mailing list",
	},
];

const statsChartValues = [
	{
		amount: "22",
		description: "Total Survey",
		chart: <ChartDecrease />,
	},
	{
		amount: "100,000",
		description: "Survey Response",
		chart: <TinyAreaChart />,
		urlLink: "View Inbox",
	},
	{
		amount: "100",
		description: "Survey Completed",
		chart: <TinyAreaChart />,
	},
	{
		amount: "100,000.00",
		description: "Inactive Survey's",
		chart: <TinyAreaChart />,
		urlLink: "View Inbox",
	},
];

const Home = () => {
	return (
		<div className="pt-8 mt-12 space-y-4 md:p-4">
			<div>
				{/* TODO make it reusable component */}
				<div className="flex flex-col md:flex-row md:space-x-[52px]  md:items-center space-y-3 bg-[rgba(220,241,254,36%)] rounded-[10px] p-3 md:p-7 ">
					<img src="/assets/images/profile-img.png" alt="Profile"  className="w-[76px] h-[76px]"
					 />
					<div>
						<h1 className="font-semibold text-xl md:text-4xl text-[#171725] leading-10 mb:1 md:mb-3">
							Hi John, welcome to Bonga
						</h1>
						<p className="font-normal  text-sm text-[#344054] leading-5">
							We’re excited to welcome you to Bonga sms and we’re even more
							excited about what we’ve got planned. You’re already on your way
							to creating beautiful experiences for your client but before then
							here are a few things to set up.
						</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
				{overviewValues.map((item, index: number) => (
					<OverviewCards
						key={index}
						img={item.img}
						title={item.title}
						description={item.description}
					/>
				))}
			</div>

			<div className="pt-[19px]">
				<HeaderWithButton title="Dashboard" showButton={true} />
			</div>

			{/* Charts Project */}
			<div className="flex flex-col xl:flex-row xl:space-x-2 rounded py-[19px]">
				<div className="w-full xl:w-5/12 bg-white rounded-[10px] shadow-lg px-[23px]">
					<div className="flex items-center justify-between">
						<h1 className="pt-6 text-lg font-semibold">Project Tracked</h1>
						<div className="pt-4">
							<FilterButton color="blue" />
						</div>
					</div>
					<div className="pt-[3px] pb-8">
						<h1 className="text-base text-light-gray">
							February Total: <span className="font-bold text-black">175</span>
						</h1>
					</div>
					<StackedBarChart />
				</div>

				<div className="grid w-full grid-cols-1 gap-2 pt-10 xl:w-7/12 lg:grid-cols-2">
					{statsChartValues.map((item, index) => (
						<StatsCard
							key={index}
							amount={item.amount}
							description={item.description}
							chart={item.chart}
							urlLink={item.urlLink}
						/>
					))}
				</div>
			</div>

			{/* End of Charts */}

			<div className="p-3 md:p-6 bg-white rounded-[10px] shadow-lg">
				<div className="pb-5 border-b">
					<h1 className="text-base font-semibold">
						Messaging - Last 1 Year Trends
					</h1>
					<p className="pt-1 text-sm text-gray-600">
						View and track the number of users who register on your platform.
					</p>
				</div>
				<div className="flex flex-col justify-between pt-5 md:flex-row">
					<div className="flex space-x-10 text-gray-900">
						{/* TODO Make them reusable component */}
						<div className="space-y-2">
							<p className="text-gray-600">Total Messages</p>
							<h1 className="text-lg font-semibold md:text-2xl">1.56 M</h1>
						</div>
						<div className="space-y-2">
							<p className="text-gray-600">Messages Sent</p>
							<h1 className="text-lg font-semibold md:text-2xl">1 M</h1>
						</div>
						<div className="space-y-2">
							<p className="text-gray-600">Messages Delivered</p>
							<h1 className="text-lg font-semibold md:text-2xl">506 K</h1>
						</div>
					</div>
					<CustomLegend />
				</div>

				<div className="pt-5">
					<MessagingBarChart />
				</div>
			</div>
		</div>
	);
};

export default Home;
