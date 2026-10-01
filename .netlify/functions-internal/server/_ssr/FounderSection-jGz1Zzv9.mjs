import { r as __toESM } from "../_runtime.mjs";
import { o as getClientLogoUrl } from "./api-Dw9fxolT.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { n as animate, t as useInView } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as staggerChild, i as Stagger, n as Section, r as SectionHeading, t as Reveal } from "./Section-DQv6pgQf.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as ChevronDown, F as ArrowRight, I as Activity, S as Globe, b as Linkedin, g as Mail, l as Quote, u as Phone } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FounderSection-jGz1Zzv9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Counter({ value, suffix }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-60px"
	});
	const [display, setDisplay] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!inView) return;
		const controls = animate(0, value, {
			duration: 1.6,
			ease: [
				.22,
				1,
				.36,
				1
			],
			onUpdate: (latest) => setDisplay(Math.round(latest))
		});
		return () => controls.stop();
	}, [inView, value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		className: "font-display text-3xl font-bold gradient-text sm:text-5xl",
		children: [display, suffix]
	});
}
function AboutSection() {
	const { content } = useSiteContent();
	const { settings } = content;
	const [teamOpen, setTeamOpen] = (0, import_react.useState)(false);
	const stats = [
		{
			label: "Years Experience",
			value: settings.yearsExperience,
			suffix: "+"
		},
		{
			label: "Projects",
			value: settings.projectsCompleted,
			suffix: ""
		},
		{
			label: "Happy Clients",
			value: content.clients.length,
			suffix: "+"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "about",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						align: "left",
						eyebrow: "About Drawvax",
						title: settings.aboutTitle,
						subtitle: settings.aboutBody
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stagger, {
							className: "grid grid-cols-2 gap-3 sm:gap-4",
							children: [stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								variants: staggerChild,
								className: "glass rounded-3xl p-4 text-center sm:p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
									value: stat.value,
									suffix: stat.suffix
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted-foreground sm:text-sm",
									children: stat.label
								})]
							}, stat.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								type: "button",
								variants: staggerChild,
								onClick: () => setTeamOpen((v) => !v),
								onMouseEnter: () => setTeamOpen(true),
								"aria-expanded": teamOpen,
								className: "glass rounded-3xl p-4 text-center sm:p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
									value: settings.teamTotal,
									suffix: ""
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground sm:text-sm",
									children: ["Team Members", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `size-3.5 transition-transform ${teamOpen ? "rotate-180" : ""}` })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: false,
							animate: {
								height: "auto",
								opacity: 1
							},
							className: "glass-soft mt-3 rounded-2xl p-4 sm:mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase",
								children: "Team structure"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4",
								children: settings.teamBreakdown.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-xl bg-background/40 px-3 py-2 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-display text-lg font-bold gradient-text",
										children: row.count
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted-foreground sm:text-xs",
										children: row.label
									})]
								}, row.label))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-soft mt-3 flex items-center gap-3 rounded-2xl px-4 py-3 sm:mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "relative grid size-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									"Currently ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: settings.ongoingProjects
									}),
									" ",
									"ongoing projects"
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "mt-20",
				direction: "up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase",
					children: "Trusted by businesses in India & Kuwait"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "animate-marquee flex w-max gap-4",
						children: [...content.clients, ...content.clients].map((client, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "glass-soft grid h-20 w-44 shrink-0 place-items-center rounded-2xl px-3 text-center text-xs font-semibold text-muted-foreground transition-all duration-300 hover:scale-105 hover:text-foreground sm:w-48",
							children: getClientLogoUrl(client.logo) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block h-14 w-36 overflow-hidden rounded-xl bg-foreground p-1.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: getClientLogoUrl(client.logo),
									alt: `${client.name} logo`,
									loading: "lazy",
									decoding: "async",
									className: "block h-full w-full object-contain"
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "line-clamp-2",
								children: client.name
							})
						}, `${client.id}-${index}`))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Our Process",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						content.process.length,
						" steps from idea to ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "gradient-text",
							children: "impact"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
					className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
					children: content.process.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: staggerChild,
						className: "glass relative rounded-3xl p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-baseline gap-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-baseline gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-5xl font-bold text-primary/25",
										children: step.step
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase",
										children: ["— ", step.label]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-lg font-semibold",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: step.text
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gradient-accent mt-5 block h-px w-full origin-left" })
						]
					}, step.step))
				})]
			})
		]
	});
}
function HighlightedBio({ bio, highlight }) {
	if (!highlight) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: bio });
	const index = bio.toLowerCase().indexOf(highlight.toLowerCase());
	if (index < 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: bio });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		bio.slice(0, index),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "font-semibold gradient-text",
			children: bio.slice(index, index + highlight.length)
		}),
		bio.slice(index + highlight.length)
	] });
}
function FounderSection() {
	const { content } = useSiteContent();
	const founder = content.founder;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "founder",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 40,
				scale: .97
			},
			whileInView: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			viewport: {
				once: true,
				margin: "-60px"
			},
			transition: {
				duration: .8,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: "glass mx-auto flex w-full flex-col gap-8 rounded-[2rem] p-5 sm:p-8 lg:grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-center lg:gap-10 lg:p-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group relative mx-auto w-full max-w-[18rem] sm:max-w-xs lg:max-w-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gradient-accent absolute -inset-1 rounded-[1.6rem] opacity-40 blur-lg transition-opacity duration-500 group-hover:opacity-90" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: founder.photo,
					alt: `${founder.name}, ${founder.title}`,
					loading: "lazy",
					decoding: "async",
					width: 912,
					height: 1104,
					className: "relative aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 text-center lg:text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "glass-soft inline-flex rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase",
						children: "Meet the Founder"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-5 font-display text-2xl font-bold break-words sm:text-4xl",
						children: [founder.name, " 😊"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-medium gradient-text",
						children: founder.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-3 text-left text-sm leading-relaxed text-muted-foreground sm:text-base",
						children: founder.bio.split(/\n\s*\n/).map((para, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightedBio, {
							bio: para,
							highlight: founder.highlight
						}) }, i))
					}),
					founder.highlight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative mt-6 overflow-hidden rounded-2xl p-[1.5px]",
						style: { background: "var(--gradient-accent)" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[calc(1rem-1.5px)] bg-background/90 px-5 py-4 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-[0.2em] text-muted-foreground uppercase",
								children: "Our motive"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-display text-xl font-bold gradient-text sm:text-2xl",
								children: [
									"“",
									founder.highlight,
									"”"
								]
							})]
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-soft mt-6 rounded-2xl p-5 text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "size-5 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-display text-lg leading-snug font-medium",
								children: [
									"“",
									founder.quote,
									"”"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: "— Santhosh"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-2 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: founder.linkedin,
								target: "_blank",
								rel: "noreferrer",
								className: "glass-soft inline-flex min-w-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "size-4 shrink-0 text-primary" }), " LinkedIn"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `mailto:${founder.email}`,
								className: "glass-soft inline-flex min-w-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4 shrink-0 text-primary" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: founder.email
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${founder.phone.replace(/\s/g, "")}`,
								className: "glass-soft inline-flex min-w-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4 shrink-0 text-primary" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: founder.phone
									})
								]
							}),
							founder.website ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: founder.website,
								target: "_blank",
								rel: "noreferrer",
								className: "glass-soft inline-flex min-w-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4 shrink-0 text-primary" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: "Official website"
									})
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap justify-center gap-4 text-sm lg:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/portfolio",
							className: "inline-flex items-center gap-1 font-semibold gradient-text",
							children: ["See Portfolio ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-primary" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "inline-flex items-center gap-1 font-semibold gradient-text",
							children: ["Contact Santhosh ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-primary" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground italic",
						children: founder.credit
					})
				]
			})]
		})
	});
}
//#endregion
export { FounderSection as n, AboutSection as t };
