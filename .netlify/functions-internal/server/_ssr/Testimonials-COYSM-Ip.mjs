import { r as __toESM } from "../_runtime.mjs";
import { r as api } from "./api-Dw9fxolT.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as approvedReviews, r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as Section, r as SectionHeading, t as Reveal } from "./Section-DQv6pgQf.mjs";
import { E as ChevronLeft, T as ChevronRight, i as Star } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Testimonials-COYSM-Ip.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Stars({ rating, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex gap-0.5", className),
		"aria-label": `${rating} out of 5`,
		children: [
			1,
			2,
			3,
			4,
			5
		].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", value <= rating ? "fill-gold text-gold" : "text-muted-foreground/40") }, value))
	});
}
function ReviewCard({ review }) {
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const initials = review.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
	const hasStory = review.fullStory && review.fullStory !== review.comment;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass flex h-full flex-col rounded-3xl p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { rating: review.rating }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 flex-1 leading-relaxed text-muted-foreground",
				children: [
					"“",
					expanded && hasStory ? review.fullStory : review.comment,
					"”"
				]
			}),
			hasStory ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setExpanded((v) => !v),
				className: "mt-3 self-start text-xs font-semibold gradient-text",
				children: expanded ? "Show less" : "Read full story"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex min-w-0 items-center gap-3",
				children: [
					review.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: review.avatar,
						alt: `${review.name}`,
						loading: "lazy",
						className: "size-11 shrink-0 rounded-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-accent grid size-11 shrink-0 place-items-center rounded-full text-sm font-bold text-primary-foreground",
						children: initials
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-semibold",
							children: review.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: review.company
						})]
					}),
					review.companyLogo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: review.companyLogo,
						alt: `${review.company} logo`,
						loading: "lazy",
						className: "ml-auto max-h-8 max-w-20 object-contain"
					}) : null
				]
			})
		]
	});
}
function Testimonials({ withForm = true }) {
	const { reviews, loading } = useSiteContent();
	const approved = approvedReviews(reviews);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		company: "",
		rating: 5,
		comment: ""
	});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (approved.length < 2) return;
		const timer = setInterval(() => setIndex((value) => (value + 1) % approved.length), 6e3);
		return () => clearInterval(timer);
	}, [approved.length]);
	const current = approved[index % Math.max(approved.length, 1)];
	const submit = async (event) => {
		event.preventDefault();
		if (!form.name.trim() || form.comment.trim().length < 10) {
			toast.error("Add your name and a comment of at least 10 characters.");
			return;
		}
		try {
			await api.submitReview({
				name: form.name.trim().slice(0, 100),
				company: form.company.trim().slice(0, 150),
				rating: form.rating,
				comment: form.comment.trim().slice(0, 1e3)
			});
		} catch {
			toast.error("Couldn't send your review. Please try again.");
			return;
		}
		setSubmitted(true);
		setForm({
			name: "",
			company: "",
			rating: 5,
			comment: ""
		});
		toast.success("Thank you! Your review is pending approval.");
		setTimeout(() => setSubmitted(false), 4e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "reviews",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "Client Reviews",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["What our clients say about ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "gradient-text",
				children: "working with us"
			})] }),
			subtitle: "Real feedback from businesses in India and Kuwait. Every project ends with the same question: are you genuinely satisfied?"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-h-[18rem] min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							x: 60
						},
						animate: {
							opacity: 1,
							x: 0
						},
						exit: {
							opacity: 0,
							x: -60
						},
						transition: {
							duration: .5,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewCard, { review: current })
					}, current.id) : loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glass h-64 animate-pulse rounded-3xl" }) : null
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Previous review",
							onClick: () => setIndex((value) => (value - 1 + approved.length) % approved.length),
							className: "glass-soft grid size-10 place-items-center rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Next review",
							onClick: () => setIndex((value) => (value + 1) % approved.length),
							className: "glass-soft grid size-10 place-items-center rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						}),
						approved.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 text-xs text-muted-foreground tabular-nums",
							children: [
								index % approved.length + 1,
								" / ",
								approved.length
							]
						}) : null
					]
				})]
			}), withForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				direction: "right",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "glass rounded-3xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold",
							children: "Leave a Review"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Reviews appear publicly once our team approves them."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.name,
									onChange: (event) => setForm({
										...form,
										name: event.target.value
									}),
									placeholder: "Your name",
									className: "w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.company,
									onChange: (event) => setForm({
										...form,
										company: event.target.value
									}),
									placeholder: "Company (optional)",
									className: "w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground",
										children: "Rating"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-1",
										children: [
											1,
											2,
											3,
											4,
											5
										].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
											type: "button",
											whileHover: { scale: 1.2 },
											whileTap: { scale: .9 },
											onClick: () => setForm({
												...form,
												rating: value
											}),
											"aria-label": `${value} stars`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
												rating: form.rating >= value ? 1 : 0,
												className: "w-4"
											})
										}, value))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: form.comment,
									onChange: (event) => setForm({
										...form,
										comment: event.target.value
									}),
									placeholder: "Tell us about your experience",
									rows: 4,
									className: "w-full resize-none rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
									whileHover: { scale: 1.03 },
									whileTap: { scale: .97 },
									className: "gradient-accent w-full rounded-xl py-3 text-sm font-semibold text-primary-foreground",
									children: "Submit Review"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 10,
								scale: .95
							},
							animate: {
								opacity: 1,
								y: 0,
								scale: 1
							},
							exit: { opacity: 0 },
							className: "mt-4 rounded-xl bg-primary/15 px-4 py-3 text-center text-sm font-medium",
							children: "✓ Received — pending approval"
						}) : null })
					]
				})
			}) : null]
		})]
	});
}
//#endregion
export { Testimonials as n, ReviewCard as t };
