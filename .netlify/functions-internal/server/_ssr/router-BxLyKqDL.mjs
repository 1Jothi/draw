import { r as __toESM } from "../_runtime.mjs";
import { i as chatbotFaqs, n as SLOGAN, r as api } from "./api-Dw9fxolT.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent, t as SiteContentProvider } from "./site-content-BnJGl2Eq.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as useMotionValue, r as useSpring, s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { b as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as Bell, N as ArrowUp, b as Linkedin, f as MessageCircle, g as Mail, h as MapPin, j as Bot, p as Menu, s as Send, t as X, u as Phone, v as LogIn, x as Instagram } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as Route$14 } from "./admin-C5hACOSB.mjs";
import { t as Route$15 } from "./services._category.index-kbgUvGuY.mjs";
import { t as Route$16 } from "./services._category._sub.index-Dn22Jlc_.mjs";
import { t as Route$17 } from "./services._category._sub._service-B8fULkiV.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BxLyKqDL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-CwzGBHek.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var links = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/services",
		label: "Services"
	},
	{
		to: "/portfolio",
		label: "Portfolio"
	},
	{
		to: "/clients",
		label: "Clients"
	},
	{
		to: "/reviews",
		label: "Reviews"
	},
	{
		to: "/news",
		label: "News"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function Navbar() {
	const { content, news } = useSiteContent();
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [toast, setToast] = (0, import_react.useState)(false);
	const latest = news[0];
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!latest) return;
		if (sessionStorage.getItem("drawvax.newsToast") === latest.id) return;
		const timer = setTimeout(() => setToast(true), 3e3);
		return () => clearTimeout(timer);
	}, [latest]);
	const dismissToast = () => {
		setToast(false);
		if (latest) sessionStorage.setItem("drawvax.newsToast", latest.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("fixed inset-x-0 top-0 z-[90] transition-all duration-500", scrolled ? "py-2" : "py-4"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.nav, {
				initial: {
					y: -80,
					opacity: 0
				},
				animate: {
					y: 0,
					opacity: 1
				},
				transition: {
					duration: .7,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: cn("flex items-center justify-between gap-3 rounded-2xl px-3 py-3 sm:px-4 transition-all duration-500", scrolled ? "glass" : "border border-transparent"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "group flex min-w-0 items-center gap-3",
						onClick: () => setOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							whileHover: {
								rotate: 12,
								scale: 1.08
							},
							className: "gradient-accent grid size-10 shrink-0 place-items-center rounded-xl font-display text-lg font-bold text-primary-foreground",
							children: "D"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-base font-bold tracking-tight sm:text-lg",
								children: content.settings.companyName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-[11px] font-medium tracking-wide gradient-text sm:block",
								children: SLOGAN
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden items-center gap-1 lg:flex",
						children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: link.to,
							className: "group relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
							activeProps: { className: "text-foreground" },
							activeOptions: { exact: link.to === "/" },
							children: [link.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gradient-accent absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" })]
						}, link.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login",
								"aria-label": "Sign in",
								title: "Sign in",
								className: "glass-soft inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Sign in"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/news",
								"aria-label": "News and updates",
								className: "glass-soft relative grid size-10 place-items-center rounded-xl text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4.5" }), latest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									className: "absolute top-2 right-2 size-2 rounded-full bg-accent",
									animate: {
										scale: [
											1,
											1.5,
											1
										],
										opacity: [
											1,
											.6,
											1
										]
									},
									transition: {
										duration: 2,
										repeat: Infinity
									}
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "gradient-accent hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 sm:inline-flex",
								children: "Get a Quote"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Toggle menu",
								onClick: () => setOpen((value) => !value),
								className: "glass-soft grid size-10 place-items-center rounded-xl lg:hidden",
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					x: 40,
					height: 0
				},
				animate: {
					opacity: 1,
					x: 0,
					height: "auto"
				},
				exit: {
					opacity: 0,
					x: 40,
					height: 0
				},
				transition: {
					duration: .35,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "glass mt-2 overflow-hidden rounded-2xl lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							x: 24
						},
						animate: {
							opacity: 1,
							x: 0
						},
						transition: { delay: .05 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							onClick: () => setOpen(false),
							className: "block rounded-xl px-4 py-3 text-sm font-semibold text-primary hover:bg-secondary",
							children: "Sign in"
						})
					}), links.map((link, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							x: 24
						},
						animate: {
							opacity: 1,
							x: 0
						},
						transition: { delay: .05 * index },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							onClick: () => setOpen(false),
							className: "block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
							activeProps: { className: "bg-secondary text-foreground" },
							activeOptions: { exact: link.to === "/" },
							children: link.label
						})
					}, link.to))]
				})
			}) : null })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: toast && latest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: -20,
				scale: .94
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				y: -20,
				scale: .94
			},
			transition: {
				type: "spring",
				stiffness: 260,
				damping: 22
			},
			className: "glass fixed top-24 right-4 z-[95] w-[min(21rem,calc(100vw-2rem))] rounded-2xl p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-accent mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase",
								children: "Latest update"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm font-semibold",
								children: latest.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
								children: latest.excerpt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/news",
								onClick: dismissToast,
								className: "mt-2 inline-block text-xs font-semibold gradient-text",
								children: "Read all updates →"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Dismiss update",
						onClick: dismissToast,
						className: "ml-auto rounded-md p-1 text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})
				]
			})
		}) : null })]
	});
}
function Footer() {
	const { content } = useSiteContent();
	const [email, setEmail] = (0, import_react.useState)("");
	const subscribe = async (event) => {
		event.preventDefault();
		if (!email.includes("@")) {
			toast.error("Please enter a valid email address.");
			return;
		}
		try {
			await api.submitLead({
				source: "Contact form",
				name: "Newsletter subscriber",
				email: email.trim().slice(0, 255),
				message: "Newsletter signup"
			});
		} catch {
			toast.error("Couldn't subscribe right now. Please try again.");
			return;
		}
		toast.success("You're subscribed. Welcome to the Drawvax list.");
		setEmail("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative mt-10 overflow-hidden border-t border-border/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			"aria-hidden": true,
			className: "gradient-accent absolute inset-x-0 top-0 h-px",
			initial: { scaleX: 0 },
			whileInView: { scaleX: 1 },
			viewport: { once: true },
			transition: {
				duration: 1.2,
				ease: "easeOut"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-7xl px-5 py-16 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-accent grid size-10 place-items-center rounded-xl font-display text-lg font-bold text-primary-foreground",
								children: "D"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg font-bold",
								children: content.contact.legalName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-display text-xl font-semibold gradient-text",
							children: SLOGAN
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground",
							children: "A front-end engineering and digital growth studio helping businesses in India and Kuwait grow."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: content.founder.photo,
								alt: content.founder.name,
								loading: "lazy",
								className: "size-9 shrink-0 rounded-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["Built & led by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: content.founder.name
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: [{
								label: "LinkedIn",
								url: content.contact.linkedin,
								Icon: Linkedin
							}, {
								label: "Instagram",
								url: content.contact.instagram,
								Icon: Instagram
							}].filter((social) => social.url).map(({ label, url, Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.a, {
								href: url,
								target: "_blank",
								rel: "noreferrer",
								"aria-label": label,
								whileHover: {
									y: -4,
									scale: 1.06
								},
								className: "glass-soft grid size-10 place-items-center rounded-xl text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
							}, label))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold tracking-[0.16em] uppercase",
						children: "Company"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2.5 text-sm text-muted-foreground",
						children: [
							{
								to: "/about",
								label: "About"
							},
							{
								to: "/portfolio",
								label: "Portfolio"
							},
							{
								to: "/clients",
								label: "Clients"
							},
							{
								to: "/reviews",
								label: "Reviews"
							},
							{
								to: "/news",
								label: "News"
							},
							{
								to: "/contact",
								label: "Contact"
							},
							{
								to: "/login",
								label: "Sign in"
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: "transition-colors hover:text-foreground",
							children: item.label
						}) }, item.to))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold tracking-[0.16em] uppercase",
						children: "Services"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2.5 text-sm text-muted-foreground",
						children: content.services.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/services/$category",
							params: { category: category.slug },
							className: "transition-colors hover:text-foreground",
							children: category.title
						}) }, category.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-semibold tracking-[0.16em] uppercase",
							children: "Get in touch"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-3 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-4 shrink-0 text-primary" }), content.contact.address]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4 shrink-0 text-primary" }), content.contact.phone]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex min-w-0 gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "break-all",
										children: content.contact.email
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: subscribe,
							className: "glass-soft mt-5 flex items-center gap-2 rounded-xl p-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: email,
								onChange: (event) => setEmail(event.target.value),
								placeholder: "Your email",
								"aria-label": "Email for newsletter",
								className: "w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
								whileHover: { scale: 1.08 },
								whileTap: { scale: .94 },
								className: "gradient-accent grid size-9 shrink-0 place-items-center rounded-lg text-primary-foreground",
								"aria-label": "Subscribe",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
							})]
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© 2026 ",
					content.contact.legalName,
					". All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold gradient-text",
					children: SLOGAN
				})]
			})]
		})]
	});
}
/** Glowing dot + trailing ring. Pointer-fine devices only. */
function CustomCursor() {
	const [enabled, setEnabled] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(false);
	const x = useMotionValue(-100);
	const y = useMotionValue(-100);
	const ringX = useSpring(x, {
		stiffness: 220,
		damping: 24,
		mass: .5
	});
	const ringY = useSpring(y, {
		stiffness: 220,
		damping: 24,
		mass: .5
	});
	(0, import_react.useEffect)(() => {
		if (!window.matchMedia("(pointer: fine)").matches) return;
		setEnabled(true);
		const move = (event) => {
			x.set(event.clientX);
			y.set(event.clientY);
			const target = event.target;
			setActive(Boolean(target?.closest("a, button, [role=\"button\"], input, textarea, select, [data-cursor=\"hover\"]")));
		};
		window.addEventListener("pointermove", move, { passive: true });
		return () => window.removeEventListener("pointermove", move);
	}, [x, y]);
	if (!enabled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed inset-0 z-[120] hidden md:block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "absolute size-2 rounded-full bg-primary",
			style: {
				x,
				y,
				translateX: "-50%",
				translateY: "-50%"
			},
			animate: {
				scale: active ? .4 : 1,
				opacity: 1
			},
			transition: { duration: .18 }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "absolute rounded-full border border-primary/70",
			style: {
				x: ringX,
				y: ringY,
				translateX: "-50%",
				translateY: "-50%"
			},
			animate: {
				width: active ? 56 : 30,
				height: active ? 56 : 30,
				backgroundColor: active ? "color-mix(in oklab, var(--primary) 18%, transparent)" : "transparent",
				boxShadow: active ? "0 0 32px color-mix(in oklab, var(--primary) 55%, transparent)" : "0 0 14px color-mix(in oklab, var(--primary) 30%, transparent)"
			},
			transition: {
				type: "spring",
				stiffness: 260,
				damping: 22
			}
		})]
	});
}
function ScrollToTop() {
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setVisible(window.scrollY > 500);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		type: "button",
		"aria-label": "Scroll to top",
		onClick: () => window.scrollTo({
			top: 0,
			behavior: "smooth"
		}),
		className: "glass fixed right-6 bottom-26 z-50 grid size-12 place-items-center rounded-full text-foreground md:bottom-28",
		initial: {
			opacity: 0,
			y: 30,
			scale: .6
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			y: 30,
			scale: .6
		},
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 16
		},
		whileHover: {
			scale: 1.12,
			boxShadow: "0 0 34px color-mix(in oklab, var(--primary) 60%, transparent)"
		},
		whileTap: { scale: .92 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-5" })
	}) : null });
}
/** Ambient gradient blobs + grid used behind every page. Pure CSS, GPU-friendly. */
function AnimatedBackdrop() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-blob absolute -top-40 -left-32 size-[34rem] rounded-full opacity-45 blur-[110px]",
				style: { background: "var(--gradient-accent)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-blob absolute top-1/3 -right-40 size-[38rem] rounded-full opacity-30 blur-[130px]",
				style: {
					background: "var(--gradient-accent)",
					animationDelay: "-6s"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-blob absolute bottom-0 left-1/3 size-[30rem] rounded-full opacity-25 blur-[120px]",
				style: {
					background: "var(--gradient-soft)",
					animationDelay: "-11s"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-[0.16]",
				style: {
					backgroundImage: "linear-gradient(color-mix(in oklab, var(--foreground) 9%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--foreground) 9%, transparent) 1px, transparent 1px)",
					backgroundSize: "68px 68px",
					maskImage: "radial-gradient(ellipse at 50% 0%, black 15%, transparent 72%)"
				}
			})
		]
	});
}
/**
* Lightweight route transition: the new page renders immediately (no exit
* wait, so clicks feel instant) and always starts at the top.
*/
function PageTransition({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useLayoutEffect)(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant"
		});
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.main, {
		initial: {
			opacity: 0,
			y: 14
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .12,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "relative w-full min-w-0",
		children
	}, pathname);
}
var quickReplies = [
	"What services do you offer?",
	"Pricing?",
	"How long does a project take?"
];
function answerFor(input) {
	const text = input.toLowerCase();
	return chatbotFaqs.find((faq) => faq.keywords.some((keyword) => text.includes(keyword)))?.answer ?? "Great question. Leave your name and email below and a Drawvax specialist will get back to you within two business hours.";
}
function Chatbot() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [welcomed, setWelcomed] = (0, import_react.useState)(false);
	const [input, setInput] = (0, import_react.useState)("");
	const [lead, setLead] = (0, import_react.useState)({
		name: "",
		email: ""
	});
	const [messages, setMessages] = (0, import_react.useState)([{
		id: "m0",
		from: "bot",
		text: "Hi, I'm Vax — the Drawvax Infotech assistant. Ask me about our services, pricing or timelines."
	}]);
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setWelcomed(true), 6e3);
		return () => clearTimeout(timer);
	}, []);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, open]);
	const send = (text) => {
		if (!text.trim()) return;
		const userMessage = {
			id: `u${Date.now()}`,
			from: "user",
			text
		};
		setMessages((current) => [...current, userMessage]);
		setInput("");
		setTimeout(() => {
			setMessages((current) => [...current, {
				id: `b${Date.now()}`,
				from: "bot",
				text: answerFor(text)
			}]);
		}, 600);
	};
	const submitLead = async (event) => {
		event.preventDefault();
		if (!lead.name.trim() || !lead.email.includes("@")) {
			toast.error("Please add your name and a valid email.");
			return;
		}
		const saved = { name: lead.name.trim() };
		try {
			await api.submitLead({
				source: "Chatbot",
				name: lead.name.trim().slice(0, 120),
				email: lead.email.trim().slice(0, 255),
				message: (messages.filter((m) => m.from === "user").map((m) => m.text).join(" | ") || "Chat enquiry").slice(0, 3e3)
			});
		} catch {
			toast.error("Couldn't send right now. Please try again.");
			return;
		}
		setLead({
			name: "",
			email: ""
		});
		setMessages((current) => [...current, {
			id: `b${Date.now()}`,
			from: "bot",
			text: `Thanks ${saved.name}! Our team will email you shortly.`
		}]);
		toast.success("Details received — we'll be in touch.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: welcomed && !open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 14,
				scale: .9
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .9
			},
			className: "glass fixed right-6 bottom-24 z-50 max-w-[15rem] rounded-2xl px-4 py-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: "Need help choosing a service?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Chat with Vax — it takes 30 seconds."
			})]
		}) : null }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
			type: "button",
			"aria-label": "Open chat",
			onClick: () => {
				setOpen((value) => !value);
				setWelcomed(false);
			},
			className: "gradient-accent fixed right-6 bottom-6 z-[70] grid size-14 place-items-center rounded-full text-primary-foreground",
			animate: { boxShadow: ["0 0 0 0 color-mix(in oklab, var(--primary) 55%, transparent)", "0 0 0 16px color-mix(in oklab, var(--primary) 0%, transparent)"] },
			transition: {
				duration: 2.2,
				repeat: Infinity
			},
			whileHover: { scale: 1.1 },
			whileTap: { scale: .92 },
			children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-6" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 30,
				scale: .94
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				y: 30,
				scale: .94
			},
			transition: {
				type: "spring",
				stiffness: 260,
				damping: 24
			},
			className: "glass fixed right-4 bottom-24 z-[70] flex h-[30rem] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-border/60 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-accent grid size-9 place-items-center rounded-xl text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-4.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: "Vax Assistant"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Typically replies instantly"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: scrollRef,
					className: "hide-scrollbar flex-1 space-y-3 overflow-y-auto p-4",
					children: [
						messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: message.from === "user" ? "gradient-accent ml-auto max-w-[80%] rounded-2xl rounded-br-sm px-3.5 py-2.5 text-sm text-primary-foreground" : "glass-soft max-w-[85%] rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm",
							children: message.text
						}, message.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5 pt-1",
							children: quickReplies.map((reply) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => send(reply),
								className: "glass-soft rounded-full px-3 py-1.5 text-[11px] text-muted-foreground hover:text-foreground",
								children: reply
							}, reply))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submitLead,
							className: "glass-soft mt-2 space-y-2 rounded-2xl p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Want a follow-up? Leave your details."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: lead.name,
									onChange: (event) => setLead({
										...lead,
										name: event.target.value
									}),
									placeholder: "Name",
									className: "w-full rounded-lg bg-input/60 px-3 py-2 text-xs outline-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: lead.email,
									onChange: (event) => setLead({
										...lead,
										email: event.target.value
									}),
									placeholder: "Email",
									className: "w-full rounded-lg bg-input/60 px-3 py-2 text-xs outline-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "gradient-accent w-full rounded-lg py-2 text-xs font-semibold text-primary-foreground",
									children: "Request callback"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (event) => {
						event.preventDefault();
						send(input);
					},
					className: "flex items-center gap-2 border-t border-border/60 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: input,
						onChange: (event) => setInput(event.target.value),
						placeholder: "Type a message...",
						className: "w-full bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "gradient-accent grid size-9 shrink-0 place-items-center rounded-lg text-primary-foreground",
						"aria-label": "Send message",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
					})]
				})
			]
		}) : null })
	] });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold gradient-text",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "gradient-accent inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Drawvax Infotech — Client Satisfaction is Our Signature" },
			{
				name: "description",
				content: "Drawvax Infotech is a front-end development and digital growth studio building premium, fast, animated web experiences."
			},
			{
				name: "author",
				content: "Drawvax Infotech"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteContentProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedBackdrop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomCursor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollToTop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chatbot, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" })
		] })
	});
}
var $$splitComponentImporter$12 = () => import("./routes-DgK76JR6.mjs");
var Route$12 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Drawvax Infotech — Client Satisfaction. Company Satisfaction." },
		{
			name: "description",
			content: "Websites, apps, digital marketing, branding and manpower support from Drawvax Infotech — 5+ years, 130 projects, clients in India and Kuwait."
		},
		{
			property: "og:title",
			content: "Drawvax Infotech — Client Satisfaction. Company Satisfaction."
		},
		{
			property: "og:description",
			content: "A front-end engineering and digital growth studio building interfaces that convert."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./about-CLNOtees.mjs");
var Route$11 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Drawvax Infotech — Our Story & Team" },
		{
			name: "description",
			content: "5+ years, 130 projects and one motive: client satisfaction and company satisfaction. Meet the studio and the founder behind Drawvax Infotech."
		},
		{
			property: "og:title",
			content: "About Drawvax Infotech"
		},
		{
			property: "og:description",
			content: "The story, process and people behind Drawvax Infotech."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./clients-BR4JErBI.mjs");
var Route$10 = createFileRoute("/clients")({
	head: () => ({ meta: [
		{ title: "Our Clients | Drawvax Infotech" },
		{
			name: "description",
			content: "The brands and teams Drawvax Infotech partners with across fintech, retail, healthcare, logistics and consumer goods."
		},
		{
			property: "og:title",
			content: "Our Clients | Drawvax Infotech"
		},
		{
			property: "og:description",
			content: "Long-term partnerships built on delivery, not promises."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./contact-CByX6lN3.mjs");
var Route$9 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact Drawvax Infotech — Get a Free Quote" },
		{
			name: "description",
			content: "Talk to Drawvax Infotech about your web, design, SEO or marketing project. We reply within two business hours."
		},
		{
			property: "og:title",
			content: "Contact Drawvax Infotech"
		},
		{
			property: "og:description",
			content: "Tell us about your project and get a fixed quote."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./login-Cy8qdYMa.mjs");
var Route$8 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Sign in | Drawvax Infotech" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./news-D0LWi4de.mjs");
var Route$7 = createFileRoute("/news")({
	head: () => ({ meta: [
		{ title: "News & Updates | Drawvax Infotech" },
		{
			name: "description",
			content: "Announcements, launches and milestones from the Drawvax Infotech studio — new services, client projects and team news."
		},
		{
			property: "og:title",
			content: "News & Updates | Drawvax Infotech"
		},
		{
			property: "og:description",
			content: "The latest from the Drawvax Infotech studio."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./portfolio-CKZvJcvn.mjs");
var Route$6 = createFileRoute("/portfolio")({
	head: () => ({ meta: [
		{ title: "Portfolio — Selected Work | Drawvax Infotech" },
		{
			name: "description",
			content: "Dashboards, storefronts, campaigns and brand systems delivered by Drawvax Infotech for clients across fintech, retail, health and logistics."
		},
		{
			property: "og:title",
			content: "Portfolio | Drawvax Infotech"
		},
		{
			property: "og:description",
			content: "Selected web, marketing, SEO and branding projects."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./reviews-Doayg8lY.mjs");
var Route$5 = createFileRoute("/reviews")({
	head: () => ({ meta: [
		{ title: "Client Reviews & Testimonials | Drawvax Infotech" },
		{
			name: "description",
			content: "Read verified client reviews of Drawvax Infotech and leave your own. Client satisfaction is our signature."
		},
		{
			property: "og:title",
			content: "Client Reviews | Drawvax Infotech"
		},
		{
			property: "og:description",
			content: "What our clients say about working with Drawvax Infotech."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./services-C5swur1F.mjs");
var Route$4 = createFileRoute("/services")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.login-Ci43wz86.mjs");
var Route$3 = createFileRoute("/admin/login")({
	head: () => ({ meta: [{ title: "Admin sign in | Drawvax Infotech" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./services.index-D4kGR2t1.mjs");
var Route$2 = createFileRoute("/services/")({
	head: () => ({ meta: [
		{ title: "Services | Drawvax Infotech" },
		{
			name: "description",
			content: "Technical services, non-technical marketing & creative services, and manpower & business support from Drawvax Infotech."
		},
		{
			property: "og:title",
			content: "Services | Drawvax Infotech"
		},
		{
			property: "og:description",
			content: "Technical, non-technical and manpower services under one roof."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./services._category-aVMpgSI-.mjs");
var Route$1 = createFileRoute("/services/$category")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./services._category._sub-Dh5nAU5m.mjs");
var Route = createFileRoute("/services/$category/$sub")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AboutRoute = Route$11.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$13
});
var AdminRoute = Route$14.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$13
});
var ClientsRoute = Route$10.update({
	id: "/clients",
	path: "/clients",
	getParentRoute: () => Route$13
});
var ContactRoute = Route$9.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$13
});
var LoginRoute = Route$8.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$13
});
var NewsRoute = Route$7.update({
	id: "/news",
	path: "/news",
	getParentRoute: () => Route$13
});
var PortfolioRoute = Route$6.update({
	id: "/portfolio",
	path: "/portfolio",
	getParentRoute: () => Route$13
});
var ReviewsRoute = Route$5.update({
	id: "/reviews",
	path: "/reviews",
	getParentRoute: () => Route$13
});
var ServicesRoute = Route$4.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$13
});
var AdminLoginRoute = Route$3.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AdminRoute
});
var ServicesIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => ServicesRoute
});
var ServicesCategoryRoute = Route$1.update({
	id: "/$category",
	path: "/$category",
	getParentRoute: () => ServicesRoute
});
var ServicesCategoryIndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => ServicesCategoryRoute
});
var ServicesCategorySubRoute = Route.update({
	id: "/$sub",
	path: "/$sub",
	getParentRoute: () => ServicesCategoryRoute
});
var ServicesCategorySubIndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => ServicesCategorySubRoute
});
var ServicesCategorySubServiceRoute = Route$17.update({
	id: "/$service",
	path: "/$service",
	getParentRoute: () => ServicesCategorySubRoute
});
var AdminRouteChildren = { AdminLoginRoute };
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var ServicesCategorySubRouteChildren = {
	ServicesCategorySubServiceRoute,
	ServicesCategorySubIndexRoute
};
var ServicesCategoryRouteChildren = {
	ServicesCategorySubRoute: ServicesCategorySubRoute._addFileChildren(ServicesCategorySubRouteChildren),
	ServicesCategoryIndexRoute
};
var ServicesRouteChildren = {
	ServicesCategoryRoute: ServicesCategoryRoute._addFileChildren(ServicesCategoryRouteChildren),
	ServicesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute: AdminRouteWithChildren,
	ClientsRoute,
	ContactRoute,
	LoginRoute,
	NewsRoute,
	PortfolioRoute,
	ReviewsRoute,
	ServicesRoute: ServicesRoute._addFileChildren(ServicesRouteChildren)
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
