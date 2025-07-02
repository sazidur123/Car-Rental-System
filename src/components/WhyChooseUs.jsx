import React from "react";
import { FaCarSide, FaDollarSign, FaRegSmile, FaHeadset } from "react-icons/fa";

const points = [
	{
		icon: <FaCarSide className="text-3xl sm:text-4xl text-white" />,
		title: "Wide Variety of Cars",
		desc: "From budget-friendly options to luxury vehicles, find the perfect ride for any occasion.",
		bg: "bg-gradient-to-tr from-blue-500 to-indigo-600",
	},
	{
		icon: <FaDollarSign className="text-3xl sm:text-4xl text-white" />,
		title: "Affordable Prices",
		desc: "Enjoy competitive daily rates you can count on—no hidden fees.",
		bg: "bg-gradient-to-tr from-red-400 to-emerald-600",
	},
	{
		icon: <FaRegSmile className="text-3xl sm:text-4xl text-white" />,
		title: "Easy Booking Process",
		desc: "Seamlessly book your ride in just a few clicks.",
		bg: "bg-gradient-to-tr from-yellow-400 to-orange-500",
	},
	{
		icon: <FaHeadset className="text-3xl sm:text-4xl text-white" />,
		title: "24/7 Customer Support",
		desc: "Our team is always here to help with any questions or concerns.",
		bg: "bg-gradient-to-tr from-pink-500 to-fuchsia-600",
	},
];

const WhyChooseUs = () => (
	<section className="max-w-7xl mx-auto my-14 sm:my-20 px-2 sm:px-4">
		<h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-12 text-indigo-700 drop-shadow-lg">
			Why Choose Us?
		</h2>
		<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8">
			{points.map((point, idx) => (
				<div
					key={idx}
					className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-[170px] sm:h-[190px] md:h-[210px] lg:h-[220px] items-center text-center"
				>
					<div
						className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full mb-4 shadow-lg mt-6 ${point.bg}`}
					>
						{point.icon}
					</div>
					<div className="px-4 sm:px-5 flex-1 flex flex-col">
						<h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-2 text-gray-800">
							{point.title}
						</h3>
						<div className="text-xs text-gray-500 mb-2 line-clamp-2">
							{point.desc}
						</div>
					</div>
				</div>
			))}
		</div>
	</section>
);

export default WhyChooseUs;