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

	return (
		<section className="max-w-5xl mx-auto my-10 sm:my-12 px-2 sm:px-4">
			<h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-primary">
				Special Offers
			</h2>
			<div className="flex flex-col md:flex-row gap-5 sm:gap-6 justify-center items-stretch">
				{offers.map((offer, i) => (
					<motion.div
						key={offer.title}
						className={`flex-1 min-w-[220px] rounded-xl shadow-lg p-5 sm:p-6 ${offer.color} flex flex-col justify-between`}
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
						<div>
							<h3 className="text-lg sm:text-xl font-bold mb-2">
								{offer.title}
							</h3>
							<p className="mb-4 text-gray-700 text-sm sm:text-base">
								{offer.description}
							</p>
						</div>
						<button
							className="btn btn-primary self-start"
							onClick={() => {
								if (offer.cta === "Book Now") {
									navigate("/available-cars");
								}
							}}
						>
							{offer.cta}
						</button>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default SpecialOffers;