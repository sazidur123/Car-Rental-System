import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const offers = [
	{
		title: "Get 15% Off for Weekend Rentals!",
		description:
			"Book any car for the weekend and enjoy a 15% discount. Limited time only!",
		cta: "Book Now",
		color: "bg-red-100",
	},
	{
		title: "Luxury Cars at $99/day!",
		description:
			"Drive in style this holiday season. Select luxury models now just $99/day.",
		cta: "Learn More",
		color: "bg-yellow-100",
	},
	{
		title: "Free Upgrade on Your First Booking!",
		description:
			"Sign up and get a free upgrade to the next car class on your first booking.",
		cta: "Sign Up",
		color: "bg-green-100",
	},
	{
		title: "Refer & Earn $20 Credit!",
		description:
			"Refer a friend and both of you get $20 rental credit after their first booking.",
		cta: "Refer Now",
		color: "bg-blue-100",
	},
];

const cardVariants = {
	hidden: { opacity: 0, x: 100 },
	visible: (i) => ({
		opacity: 1,
		x: 0,
		transition: { delay: i * 0.2, type: "spring", stiffness: 80 },
	}),
};

const SpecialOffers = () => {
	const navigate = useNavigate();

	// Modern gradient button style for all CTAs
	const ctaButtonStyle =
		"flex-1 px-3 py-2 rounded-full bg-gradient-to-r from-red-600 to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow hover:from-red-700 hover:to-indigo-600 transition-all duration-200";

	return (
		<section className="max-w-7xl mx-auto my-10 sm:my-16 px-2 sm:px-4">
			<h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-700">
				Special Offers
			</h2>
			<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8">
				{offers.map((offer, i) => (
					<motion.div
						key={offer.title}
						className={`bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-[170px] sm:h-[190px] md:h-[210px] lg:h-[220px] ${offer.color}`}
						custom={i}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
						variants={cardVariants}
						whileHover={{
							scale: 1.05,
							y: -8,
							transition: { type: "spring", stiffness: 300 },
						}}
					>
						<div className="p-4 sm:p-5 flex-1 flex flex-col">
							<h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-2">
								{offer.title}
							</h3>
							<div className="text-xs text-gray-500 mb-2 line-clamp-2">
								{offer.description}
							</div>
							<div className="flex gap-2 mt-auto">
								<button
									className={ctaButtonStyle}
									onClick={() => {
										if (offer.cta === "Book Now") {
											navigate("/available-cars");
										}
									}}
								>
									{offer.cta}
								</button>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default SpecialOffers;