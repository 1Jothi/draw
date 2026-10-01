import { r as __toESM } from "../_runtime.mjs";
import { c as slugify, r as api } from "./api-Dw9fxolT.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as Section } from "./Section-DQv6pgQf.mjs";
import { f as Outlet, l as useRouterState, v as Navigate, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as LogOut, r as Trash2, y as Lock } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-YFSUVt8T.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-B3FXzqOb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	"Homepage",
	"Statistics",
	"Process",
	"Founder",
	"Services",
	"Portfolio",
	"Clients",
	"International Clients",
	"Reviews",
	"News",
	"Contact",
	"Leads",
	"Media",
	"Users"
];
function Field({ label, value, onChange, textarea, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs tracking-[0.14em] text-muted-foreground uppercase",
			children: label
		}), textarea ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			rows: 4,
			onChange: (event) => onChange(event.target.value),
			className: "mt-2 w-full resize-none rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			onChange: (event) => onChange(event.target.value),
			className: "mt-2 w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
		})]
	});
}
function ImageField({ label, value, onChange, showUrl = true }) {
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const upload = async (event) => {
		const file = event.currentTarget.files?.[0];
		event.currentTarget.value = "";
		if (!file) return;
		setUploading(true);
		try {
			onChange(await api.uploadMedia(file));
			toast.success("Image uploaded.");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Image upload failed.");
		} finally {
			setUploading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			showUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: `${label} URL`,
				value,
				onChange,
				type: "url"
			}) : null,
			value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: value,
				alt: `${label} preview`,
				loading: "lazy",
				className: "h-28 max-w-full rounded-lg object-contain"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "inline-flex min-h-11 cursor-pointer items-center rounded-lg px-3 text-sm text-primary hover:bg-primary/10",
				children: [uploading ? "Uploading…" : `Upload ${label.toLowerCase()}`, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/jpeg,image/png,image/webp,image/avif",
					onChange: (event) => void upload(event),
					disabled: uploading,
					className: "sr-only"
				})]
			})
		]
	});
}
function Panel({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 18
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: -12
		},
		transition: { duration: .35 },
		className: "glass rounded-3xl p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 space-y-4",
			children
		})]
	});
}
function RowActions({ onDelete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => {
			if (window.confirm("Are you sure you want to delete this item?")) onDelete();
		},
		className: "glass-soft grid size-9 place-items-center rounded-xl text-destructive",
		"aria-label": "Delete",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
	});
}
function AdminPage() {
	const store = useSiteContent();
	const [tab, setTab] = (0, import_react.useState)("Homepage");
	if (useRouterState({ select: (state) => state.location.pathname }) === "/admin/login") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	if (!store.authReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60svh] items-center justify-center px-4 text-muted-foreground",
		children: "Checking access…"
	});
	if (!store.isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/admin/login" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Admin",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Content ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "gradient-text",
			children: "control room"
		})] }),
		subtitle: `Signed in as ${store.userEmail ?? "admin"}. Changes are saved to the site database.`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[13rem_minmax(0,1fr)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 lg:row-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "glass-soft rounded-xl p-3 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
						className: "flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold",
						children: ["Sections ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-primary",
							children: tab
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Admin sections",
						className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3",
						children: tabs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: (event) => {
								setTab(item);
								event.currentTarget.closest("details")?.removeAttribute("open");
							},
							className: tab === item ? "gradient-accent min-h-11 rounded-lg px-3 text-left text-xs font-semibold text-primary-foreground" : "glass min-h-11 rounded-lg px-3 text-left text-xs text-muted-foreground",
							children: item
						}, item))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Admin sections",
					className: "hidden gap-1 lg:grid",
					children: tabs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab(item),
						"aria-current": tab === item ? "page" : void 0,
						className: tab === item ? "gradient-accent min-h-11 rounded-lg px-3 text-left text-sm font-semibold text-primary-foreground" : "glass-soft min-h-11 rounded-lg px-3 text-left text-sm text-muted-foreground hover:text-foreground",
						children: item
					}, item))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void api.signOut(),
					className: "glass-soft inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Log out"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 lg:col-start-2 lg:row-start-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						tab === "Homepage" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomepagePanel, {}),
						tab === "Statistics" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatisticsPanel, {}),
						tab === "Process" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessPanel, {}),
						tab === "Founder" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FounderPanel, {}),
						tab === "Services" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesPanel, {}),
						tab === "Portfolio" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortfolioPanel, {}),
						tab === "Clients" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientsPanel, { region: "domestic" }),
						tab === "International Clients" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientsPanel, { region: "international" }),
						tab === "Reviews" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewsPanel, {}),
						tab === "News" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsPanel, {}),
						tab === "Contact" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactPanel, {}),
						tab === "Leads" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadsPanel, {}),
						tab === "Media" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPanel, {}),
						tab === "Users" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersPanel, {})
					] }, tab)
				})
			})
		]
	}) })] });
}
function AdminLogin() {
	const store = useSiteContent();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (store.isAdmin) navigate({ to: "/admin" });
	}, [navigate, store.isAdmin]);
	const submit = async (event) => {
		event.preventDefault();
		setSubmitting(true);
		try {
			await api.signIn(email, password);
			if (!await api.checkAdmin()) {
				await api.signOut();
				toast.error("This account does not have admin access.");
				return;
			}
			toast.success("Welcome back.");
			await navigate({ to: "/admin" });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Login failed.");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[100svh] items-center justify-center px-5 pt-28 pb-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
			onSubmit: (event) => void submit(event),
			initial: {
				opacity: 0,
				y: 30,
				scale: .96
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			transition: {
				duration: .6,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: "glass w-full max-w-md rounded-3xl p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "gradient-accent grid size-12 place-items-center rounded-2xl text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 font-display text-2xl font-bold",
					children: "Admin sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Sign in with an administrator account provisioned for this site."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							onChange: (event) => setEmail(event.target.value),
							placeholder: "Email",
							autoComplete: "username",
							required: true,
							className: "w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							value: password,
							onChange: (event) => setPassword(event.target.value),
							placeholder: "Password",
							autoComplete: "current-password",
							required: true,
							className: "w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
							whileHover: { scale: 1.02 },
							whileTap: { scale: .98 },
							type: "submit",
							disabled: submitting,
							className: "gradient-accent w-full rounded-xl py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60",
							children: submitting ? "Signing in…" : "Sign in"
						})
					]
				})
			]
		})
	});
}
function HomepagePanel() {
	const { content, saveSection } = useSiteContent();
	const [eyebrow, setEyebrow] = (0, import_react.useState)(content.settings.heroEyebrow);
	const [headline, setHeadline] = (0, import_react.useState)(content.settings.heroHeadline);
	const [sub, setSub] = (0, import_react.useState)(content.settings.heroSubheading);
	const [buttonText, setButtonText] = (0, import_react.useState)(content.settings.heroButtonText);
	const [buttonLink, setButtonLink] = (0, import_react.useState)(content.settings.heroButtonLink);
	const [aboutTitle, setAboutTitle] = (0, import_react.useState)(content.settings.aboutTitle);
	const [aboutBody, setAboutBody] = (0, import_react.useState)(content.settings.aboutBody);
	const [ctaHeadline, setCtaHeadline] = (0, import_react.useState)(content.settings.ctaHeadline);
	const [ctaText, setCtaText] = (0, import_react.useState)(content.settings.ctaText);
	const save = async () => {
		if (!headline.trim() || !buttonText.trim() || !(buttonLink.startsWith("/") || buttonLink.startsWith("https://"))) {
			toast.error("Add a headline, button label, and a relative or HTTPS link.");
			return;
		}
		try {
			await saveSection("settings", {
				...content.settings,
				heroEyebrow: eyebrow.trim(),
				heroHeadline: headline.trim(),
				heroSubheading: sub,
				heroButtonText: buttonText.trim(),
				heroButtonLink: buttonLink.trim(),
				aboutTitle,
				aboutBody,
				ctaHeadline,
				ctaText
			});
			toast.success("Homepage content updated.");
		} catch {
			toast.error("Could not save homepage content.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Homepage",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hero eyebrow",
				value: eyebrow,
				onChange: setEyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hero headline",
				value: headline,
				onChange: setHeadline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hero subheading",
				value: sub,
				onChange: setSub,
				textarea: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Hero button text",
					value: buttonText,
					onChange: setButtonText
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Hero button link",
					value: buttonLink,
					onChange: setButtonLink
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "About title",
				value: aboutTitle,
				onChange: setAboutTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "About body",
				value: aboutBody,
				onChange: setAboutBody,
				textarea: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Call-to-action headline",
				value: ctaHeadline,
				onChange: setCtaHeadline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Call-to-action text",
				value: ctaText,
				onChange: setCtaText,
				textarea: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { onClick: save })
		]
	});
}
function SaveButton({ onClick, label = "Save changes" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		type: "button",
		whileHover: { scale: 1.02 },
		whileTap: { scale: .98 },
		onClick,
		className: "gradient-accent rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground",
		children: label
	});
}
function StatisticsPanel() {
	const { content, saveSection } = useSiteContent();
	const [draft, setDraft] = (0, import_react.useState)(content.settings);
	const save = async () => {
		if ([
			draft.yearsExperience,
			draft.projectsCompleted,
			draft.teamTotal
		].some((value) => value < 0)) {
			toast.error("Statistics cannot be negative.");
			return;
		}
		try {
			await saveSection("settings", draft);
			toast.success("Statistics updated.");
		} catch {
			toast.error("Could not save statistics.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Statistics",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Years experience",
						type: "number",
						value: String(draft.yearsExperience),
						onChange: (value) => setDraft({
							...draft,
							yearsExperience: Number(value) || 0
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Projects completed",
						type: "number",
						value: String(draft.projectsCompleted),
						onChange: (value) => setDraft({
							...draft,
							projectsCompleted: Number(value) || 0
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Ongoing projects",
						value: draft.ongoingProjects,
						onChange: (ongoingProjects) => setDraft({
							...draft,
							ongoingProjects
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Team total",
						type: "number",
						value: String(draft.teamTotal),
						onChange: (value) => setDraft({
							...draft,
							teamTotal: Number(value) || 0
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: "Team breakdown"
					}),
					draft.teamBreakdown.map((member, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-[1fr_8rem_auto] sm:items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Role",
								value: member.label,
								onChange: (label) => setDraft({
									...draft,
									teamBreakdown: draft.teamBreakdown.map((row, rowIndex) => rowIndex === index ? {
										...row,
										label
									} : row)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Count",
								value: member.count,
								onChange: (count) => setDraft({
									...draft,
									teamBreakdown: draft.teamBreakdown.map((row, rowIndex) => rowIndex === index ? {
										...row,
										count
									} : row)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setDraft({
									...draft,
									teamBreakdown: draft.teamBreakdown.filter((_, rowIndex) => rowIndex !== index)
								}),
								className: "min-h-11 rounded-lg px-3 text-sm text-destructive hover:bg-destructive/10",
								children: "Remove"
							})
						]
					}, `${member.label}-${index}`)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setDraft({
							...draft,
							teamBreakdown: [...draft.teamBreakdown, {
								label: "New role",
								count: "0"
							}]
						}),
						className: "glass-soft min-h-11 rounded-lg px-4 text-sm",
						children: "Add team role"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { onClick: () => void save() })
		]
	});
}
function ProcessPanel() {
	const { content, saveSection } = useSiteContent();
	const [steps, setSteps] = (0, import_react.useState)(content.process);
	const update = (index, key, value) => {
		setSteps((current) => current.map((step, stepIndex) => stepIndex === index ? {
			...step,
			[key]: value
		} : step));
	};
	const move = (index, direction) => {
		const target = index + direction;
		if (target < 0 || target >= steps.length) return;
		setSteps((current) => {
			const reordered = [...current];
			const currentStep = reordered[index];
			const targetStep = reordered[target];
			if (!currentStep || !targetStep) return current;
			reordered[index] = targetStep;
			reordered[target] = currentStep;
			return reordered;
		});
	};
	const save = async () => {
		if (steps.some((step) => !step.label.trim() || !step.title.trim())) {
			toast.error("Each process step needs a label and title.");
			return;
		}
		try {
			await saveSection("process", steps);
			toast.success("Process steps updated.");
		} catch {
			toast.error("Could not save process steps.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Process steps",
		children: [steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-soft grid gap-3 rounded-xl p-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Step number",
					value: step.step,
					onChange: (value) => update(index, "step", value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Label",
					value: step.label,
					onChange: (value) => update(index, "label", value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Title",
					value: step.title,
					onChange: (value) => update(index, "title", value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Description",
					value: step.text,
					onChange: (value) => update(index, "text", value),
					textarea: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2 sm:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: index === 0,
							onClick: () => move(index, -1),
							className: "glass-soft min-h-10 rounded-lg px-3 text-sm disabled:opacity-40",
							children: "Move up"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: index === steps.length - 1,
							onClick: () => move(index, 1),
							className: "glass-soft min-h-10 rounded-lg px-3 text-sm disabled:opacity-40",
							children: "Move down"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								if (window.confirm(`Delete process step ${step.step}?`)) setSteps((current) => current.filter((_, stepIndex) => stepIndex !== index));
							},
							className: "min-h-10 rounded-lg px-3 text-sm text-destructive hover:bg-destructive/10",
							children: "Delete step"
						})
					]
				})
			]
		}, `${step.step}-${index}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setSteps((current) => [...current, {
					step: String(current.length + 1).padStart(2, "0"),
					label: "New step",
					title: "Step title",
					text: ""
				}]),
				className: "glass-soft min-h-11 rounded-lg px-4 text-sm",
				children: "Add step"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { onClick: () => void save() })]
		})]
	});
}
function FounderPanel() {
	const { content, updateFounder } = useSiteContent();
	const [draft, setDraft] = (0, import_react.useState)(content.founder);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Founder section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				value: draft.name,
				onChange: (name) => setDraft({
					...draft,
					name
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				value: draft.title,
				onChange: (title) => setDraft({
					...draft,
					title
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
				label: "Founder photo",
				value: draft.photo,
				onChange: (photo) => setDraft({
					...draft,
					photo
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Bio",
				value: draft.bio,
				onChange: (bio) => setDraft({
					...draft,
					bio
				}),
				textarea: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tagline",
				value: draft.highlight,
				onChange: (highlight) => setDraft({
					...draft,
					highlight
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Quote",
				value: draft.quote,
				onChange: (quote) => setDraft({
					...draft,
					quote
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "LinkedIn",
				value: draft.linkedin,
				onChange: (linkedin) => setDraft({
					...draft,
					linkedin
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Email",
				value: draft.email,
				onChange: (email) => setDraft({
					...draft,
					email
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Phone",
				type: "tel",
				value: draft.phone,
				onChange: (phone) => setDraft({
					...draft,
					phone
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Website",
				type: "url",
				value: draft.website,
				onChange: (website) => setDraft({
					...draft,
					website
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Credit",
				value: draft.credit,
				onChange: (credit) => setDraft({
					...draft,
					credit
				}),
				textarea: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { onClick: () => void updateFounder(draft).then(() => toast.success("Founder section updated."), () => toast.error("Could not save founder details.")) })
		]
	});
}
function ServicesPanel() {
	const { content, upsertService, removeService } = useSiteContent();
	const [draft, setDraft] = (0, import_react.useState)(content.services[0] ?? null);
	const [isNew, setIsNew] = (0, import_react.useState)(false);
	const startNew = () => {
		setDraft({
			id: `cat-${Date.now()}`,
			slug: "",
			title: "",
			icon: "Sparkles",
			short: "",
			media: "",
			subcategories: []
		});
		setIsNew(true);
	};
	const save = async () => {
		if (!draft?.title.trim()) {
			toast.error("Add a service category title.");
			return;
		}
		try {
			await upsertService({
				...draft,
				slug: slugify(draft.title)
			});
			setIsNew(false);
			toast.success("Services saved.");
		} catch {
			toast.error("Could not save services.");
		}
	};
	const updateSubcategory = (id, key, value) => {
		setDraft((current) => current ? {
			...current,
			subcategories: current.subcategories.map((item) => item.id === id ? {
				...item,
				[key]: value,
				...key === "title" ? { slug: slugify(value) } : {}
			} : item)
		} : current);
	};
	const updateService = (subcategoryId, serviceId, key, value) => {
		setDraft((current) => current ? {
			...current,
			subcategories: current.subcategories.map((subcategory) => subcategory.id === subcategoryId ? {
				...subcategory,
				services: subcategory.services.map((service) => service.id === serviceId ? {
					...service,
					[key]: value,
					...key === "title" ? { slug: slugify(value) } : {}
				} : service)
			} : subcategory)
		} : current);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Services",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [content.services.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setDraft(category);
					setIsNew(false);
				},
				className: draft?.id === category.id ? "gradient-accent min-h-11 rounded-lg px-3 text-sm text-primary-foreground" : "glass-soft min-h-11 rounded-lg px-3 text-sm",
				children: category.title
			}, category.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: startNew,
				className: "glass-soft min-h-11 rounded-lg px-3 text-sm",
				children: "Add category"
			})]
		}), draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Category title",
							value: draft.title,
							onChange: (title) => setDraft({
								...draft,
								title,
								slug: slugify(title)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Icon name",
							value: draft.icon,
							onChange: (icon) => setDraft({
								...draft,
								icon
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Short description",
							value: draft.short,
							onChange: (short) => setDraft({
								...draft,
								short
							}),
							textarea: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
							label: "Category image",
							value: draft.media,
							onChange: (media) => setDraft({
								...draft,
								media
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: "Sub-categories and services"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setDraft({
								...draft,
								subcategories: [...draft.subcategories, {
									id: `sub-${Date.now()}`,
									slug: "new-subcategory",
									title: "New sub-category",
									short: "",
									services: []
								}]
							}),
							className: "glass-soft min-h-10 rounded-lg px-3 text-sm",
							children: "Add sub-category"
						})]
					}), draft.subcategories.map((subcategory) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-soft min-w-0 space-y-3 rounded-xl p-3 sm:p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Sub-category title",
									value: subcategory.title,
									onChange: (value) => updateSubcategory(subcategory.id, "title", value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Description",
									value: subcategory.short,
									onChange: (value) => updateSubcategory(subcategory.id, "short", value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-muted-foreground",
									children: "Services"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setDraft({
										...draft,
										subcategories: draft.subcategories.map((item) => item.id === subcategory.id ? {
											...item,
											services: [...item.services, {
												id: `service-${Date.now()}`,
												slug: "new-service",
												title: "New service",
												short: "",
												description: "",
												media: "",
												features: []
											}]
										} : item)
									}),
									className: "glass min-h-10 rounded-lg px-3 text-sm",
									children: "Add service"
								})]
							}),
							subcategory.services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid min-w-0 gap-3 border-t border-border/60 pt-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Service title",
										value: service.title,
										onChange: (value) => updateService(subcategory.id, service.id, "title", value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Short description",
										value: service.short,
										onChange: (value) => updateService(subcategory.id, service.id, "short", value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Description",
										value: service.description,
										onChange: (value) => updateService(subcategory.id, service.id, "description", value),
										textarea: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
										label: "Service image",
										value: service.media,
										onChange: (media) => updateService(subcategory.id, service.id, "media", media)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setDraft({
											...draft,
											subcategories: draft.subcategories.map((item) => item.id === subcategory.id ? {
												...item,
												services: item.services.filter((entry) => entry.id !== service.id)
											} : item)
										}),
										className: "min-h-10 justify-self-start text-sm text-destructive",
										children: "Delete service"
									})
								]
							}, service.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									if (window.confirm(`Delete ${subcategory.title}?`)) setDraft({
										...draft,
										subcategories: draft.subcategories.filter((item) => item.id !== subcategory.id)
									});
								},
								className: "min-h-10 text-sm text-destructive",
								children: "Delete sub-category"
							})
						]
					}, subcategory.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
						onClick: () => void save(),
						label: isNew ? "Add category" : "Save category"
					}), !isNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowActions, { onDelete: () => void removeService(draft.id).then(() => {
						setDraft(content.services.find((item) => item.id !== draft.id) ?? null);
						toast.success("Category deleted.");
					}, () => toast.error("Could not delete category.")) }) : null]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "No service categories yet."
		})]
	});
}
function PortfolioPanel() {
	const { content, upsertPortfolio, removePortfolio } = useSiteContent();
	const makeDraft = () => ({
		id: `p-${Date.now()}`,
		title: "",
		client: "",
		category: "Web",
		image: "",
		video: "",
		gallery: [],
		description: "",
		tech: [],
		year: String((/* @__PURE__ */ new Date()).getFullYear()),
		url: "",
		published: true,
		sortOrder: content.portfolio.length
	});
	const [draft, setDraft] = (0, import_react.useState)(makeDraft);
	const [isNew, setIsNew] = (0, import_react.useState)(true);
	const save = async () => {
		if (!draft.title.trim() || !draft.client.trim()) {
			toast.error("Project title and client are required.");
			return;
		}
		try {
			await upsertPortfolio({
				...draft,
				title: draft.title.trim(),
				client: draft.client.trim()
			});
			setIsNew(false);
			toast.success("Project saved.");
		} catch {
			toast.error("Could not save project.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Portfolio",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setDraft(makeDraft());
						setIsNew(true);
					},
					className: "glass-soft min-h-11 rounded-lg px-4 text-sm",
					children: "Add project"
				}), content.portfolio.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setDraft(item);
						setIsNew(false);
					},
					className: draft.id === item.id && !isNew ? "gradient-accent min-h-11 rounded-lg px-3 text-sm text-primary-foreground" : "glass-soft min-h-11 rounded-lg px-3 text-sm",
					children: item.title || "Untitled project"
				}, item.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Project title",
						value: draft.title,
						onChange: (title) => setDraft({
							...draft,
							title
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Client",
						value: draft.client,
						onChange: (client) => setDraft({
							...draft,
							client
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Category",
						value: draft.category,
						onChange: (category) => setDraft({
							...draft,
							category
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Year",
						value: draft.year,
						onChange: (year) => setDraft({
							...draft,
							year
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Project URL",
						type: "url",
						value: draft.url ?? "",
						onChange: (url) => setDraft({
							...draft,
							url
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Display order",
						type: "number",
						value: String(draft.sortOrder ?? 0),
						onChange: (value) => setDraft({
							...draft,
							sortOrder: Number(value) || 0
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
				label: "Project image",
				value: draft.image,
				onChange: (image) => setDraft({
					...draft,
					image
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Description",
				value: draft.description,
				onChange: (description) => setDraft({
					...draft,
					description
				}),
				textarea: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Technology tags (comma separated)",
				value: draft.tech.join(", "),
				onChange: (value) => setDraft({
					...draft,
					tech: value.split(",").map((tag) => tag.trim()).filter(Boolean)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-h-11 items-center gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: draft.published !== false,
					onChange: (event) => setDraft({
						...draft,
						published: event.target.checked
					})
				}), " Published on website"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
					onClick: () => void save(),
					label: isNew ? "Add project" : "Save project"
				}), !isNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowActions, { onDelete: () => void removePortfolio(draft.id).then(() => {
					setDraft(makeDraft());
					setIsNew(true);
					toast.success("Project deleted.");
				}, () => toast.error("Could not delete project.")) }) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-2 sm:grid-cols-2",
				children: content.portfolio.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "glass-soft flex min-w-0 items-center gap-3 rounded-xl p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								item.client,
								" · ",
								item.category
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowActions, { onDelete: () => removePortfolio(item.id) })]
				}, item.id))
			})
		]
	});
}
function ClientsPanel({ region }) {
	const { content, upsertClient, removeClient } = useSiteContent();
	const makeDraft = () => ({
		id: `c-${Date.now()}`,
		name: "",
		industry: "",
		region,
		logo: "",
		details: "",
		collaboration: "",
		since: String((/* @__PURE__ */ new Date()).getFullYear()),
		website: "",
		enabled: true,
		sortOrder: content.clients.filter((client) => client.region === region).length
	});
	const [draft, setDraft] = (0, import_react.useState)(makeDraft);
	const [isNew, setIsNew] = (0, import_react.useState)(true);
	const clients = content.clients.filter((client) => client.region === region);
	const save = async () => {
		if (!draft.name.trim() || !draft.industry.trim()) {
			toast.error("Client name and industry are required.");
			return;
		}
		try {
			await upsertClient({
				...draft,
				name: draft.name.trim(),
				region
			});
			setIsNew(false);
			toast.success("Client saved.");
		} catch {
			toast.error("Could not save client.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: region === "domestic" ? "Clients in India" : "International clients",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setDraft(makeDraft());
						setIsNew(true);
					},
					className: "glass-soft min-h-11 rounded-lg px-4 text-sm",
					children: "Add client"
				}), clients.map((client) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setDraft(client);
						setIsNew(false);
					},
					className: draft.id === client.id && !isNew ? "gradient-accent min-h-11 rounded-lg px-3 text-sm text-primary-foreground" : "glass-soft min-h-11 rounded-lg px-3 text-sm",
					children: client.name
				}, client.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Client name",
						value: draft.name,
						onChange: (name) => setDraft({
							...draft,
							name
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Industry",
						value: draft.industry,
						onChange: (industry) => setDraft({
							...draft,
							industry
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Website",
						type: "url",
						value: draft.website ?? "",
						onChange: (website) => setDraft({
							...draft,
							website
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Partner since",
						value: draft.since,
						onChange: (since) => setDraft({
							...draft,
							since
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Display order",
						type: "number",
						value: String(draft.sortOrder ?? 0),
						onChange: (value) => setDraft({
							...draft,
							sortOrder: Number(value) || 0
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
				label: "Client logo",
				value: draft.logo,
				onChange: (logo) => setDraft({
					...draft,
					logo
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Description",
				value: draft.details,
				onChange: (details) => setDraft({
					...draft,
					details
				}),
				textarea: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Collaboration details",
				value: draft.collaboration,
				onChange: (collaboration) => setDraft({
					...draft,
					collaboration
				}),
				textarea: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-h-11 items-center gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: draft.enabled !== false,
					onChange: (event) => setDraft({
						...draft,
						enabled: event.target.checked
					})
				}), " Visible on website"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
					onClick: () => void save(),
					label: isNew ? "Add client" : "Save client"
				}), !isNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowActions, { onDelete: () => void removeClient(draft.id).then(() => {
					setDraft(makeDraft());
					setIsNew(true);
					toast.success("Client deleted.");
				}, () => toast.error("Could not delete client.")) }) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: clients.map((client) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "glass-soft flex items-center gap-3 rounded-xl p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: client.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: client.industry
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowActions, { onDelete: () => removeClient(client.id) })]
				}, client.id))
			})
		]
	});
}
function ReviewsPanel() {
	const store = useSiteContent();
	const [draft, setDraft] = (0, import_react.useState)({
		id: "",
		name: "",
		company: "",
		rating: 5,
		comment: "",
		fullStory: "",
		status: "pending",
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		avatar: "",
		companyLogo: "",
		sortOrder: store.reviews.length
	});
	const reset = () => setDraft({
		id: "",
		name: "",
		company: "",
		rating: 5,
		comment: "",
		fullStory: "",
		status: "pending",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	const save = async () => {
		if (!draft.name.trim() || !draft.company.trim() || !draft.comment.trim()) {
			toast.error("Reviewer, company, and testimonial text are required.");
			return;
		}
		try {
			const review = {
				...draft,
				id: draft.id || `r-${Date.now()}`,
				createdAt: draft.createdAt || (/* @__PURE__ */ new Date()).toISOString()
			};
			if (draft.id) await store.updateReview(review);
			else await store.addReview(review);
			toast.success("Testimonial saved.");
			reset();
		} catch {
			toast.error("Could not save testimonial.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Testimonials",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Client name",
						value: draft.name,
						onChange: (name) => setDraft({
							...draft,
							name
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Company",
						value: draft.company,
						onChange: (company) => setDraft({
							...draft,
							company
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Rating (1–5)",
						type: "number",
						value: String(draft.rating),
						onChange: (value) => setDraft({
							...draft,
							rating: Math.max(1, Math.min(5, Number(value) || 1))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Display order",
						type: "number",
						value: String(draft.sortOrder ?? 0),
						onChange: (value) => setDraft({
							...draft,
							sortOrder: Number(value) || 0
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs text-muted-foreground",
						children: ["Publication status", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: draft.status,
							onChange: (event) => setDraft({
								...draft,
								status: event.target.value
							}),
							className: "mt-2 min-h-11 w-full rounded-lg bg-input/60 px-3 text-sm text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "pending",
									children: "Draft / pending"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "approved",
									children: "Published"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "rejected",
									children: "Unpublished"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Testimonial",
							value: draft.comment,
							onChange: (comment) => setDraft({
								...draft,
								comment
							}),
							textarea: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full story",
							value: draft.fullStory,
							onChange: (fullStory) => setDraft({
								...draft,
								fullStory
							}),
							textarea: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
						label: "Client photo",
						value: draft.avatar ?? "",
						onChange: (avatar) => setDraft({
							...draft,
							avatar
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
						label: "Company logo",
						value: draft.companyLogo ?? "",
						onChange: (companyLogo) => setDraft({
							...draft,
							companyLogo
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
					onClick: () => void save(),
					label: draft.id ? "Save testimonial" : "Add testimonial"
				}), draft.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: reset,
					className: "glass-soft min-h-11 rounded-lg px-4 text-sm",
					children: "Cancel edit"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: store.reviews.map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "glass-soft min-w-0 rounded-xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium",
								children: [
									review.name,
									" · ",
									review.company
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: review.status === "approved" ? "rounded-full bg-primary/20 px-2.5 py-0.5 text-[11px]" : "rounded-full bg-gold/20 px-2.5 py-0.5 text-[11px] text-gold",
								children: review.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [review.rating, "★"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setDraft(review),
										className: "glass-soft min-h-10 rounded-lg px-3 text-xs",
										children: "Edit"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void store.setReviewStatus(review.id, "approved").then(() => toast.success("Testimonial published."), () => toast.error("Could not publish testimonial.")),
										className: "glass-soft rounded-lg px-3 py-1.5 text-xs",
										children: "Approve"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void store.setReviewStatus(review.id, "rejected").then(() => toast.success("Testimonial unpublished."), () => toast.error("Could not update testimonial.")),
										className: "glass-soft rounded-lg px-3 py-1.5 text-xs",
										children: "Reject"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowActions, { onDelete: () => void store.removeReview(review.id).then(() => toast.success("Testimonial deleted."), () => toast.error("Could not delete testimonial.")) })
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: review.comment
					})]
				}, review.id))
			})
		]
	});
}
function NewsPanel() {
	const store = useSiteContent();
	const { upsertNews, removeNews } = store;
	const makeDraft = () => ({
		id: "",
		title: "",
		excerpt: "",
		body: "",
		category: "Announcement",
		image: "",
		publishedAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	const [draft, setDraft] = (0, import_react.useState)(makeDraft);
	const save = async () => {
		if (!draft.title.trim()) {
			toast.error("Add a title.");
			return;
		}
		try {
			await upsertNews({
				...draft,
				id: draft.id || `n-${Date.now()}`,
				title: draft.title.trim()
			});
			toast.success("News update saved.");
			setDraft(makeDraft());
		} catch {
			toast.error("Could not save news update.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "News & updates",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				value: draft.title,
				onChange: (title) => setDraft({
					...draft,
					title
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Category",
					value: draft.category,
					onChange: (category) => setDraft({
						...draft,
						category
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Published date",
					type: "date",
					value: draft.publishedAt.slice(0, 10),
					onChange: (value) => setDraft({
						...draft,
						publishedAt: value ? (/* @__PURE__ */ new Date(`${value}T12:00:00.000Z`)).toISOString() : draft.publishedAt
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
				label: "News image",
				value: draft.image,
				onChange: (image) => setDraft({
					...draft,
					image
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Excerpt",
				value: draft.excerpt,
				onChange: (excerpt) => setDraft({
					...draft,
					excerpt
				}),
				textarea: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Article body",
				value: draft.body,
				onChange: (body) => setDraft({
					...draft,
					body
				}),
				textarea: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
					onClick: () => void save(),
					label: draft.id ? "Save update" : "Publish update"
				}), draft.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setDraft(makeDraft()),
					className: "glass-soft min-h-11 rounded-lg px-4 text-sm",
					children: "Cancel edit"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: store.news.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "glass-soft flex items-center gap-3 rounded-xl p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: post.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: post.publishedAt.slice(0, 10)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setDraft(post),
							className: "glass-soft min-h-10 rounded-lg px-3 text-xs",
							children: "Edit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowActions, { onDelete: () => removeNews(post.id) })
					]
				}, post.id))
			})
		]
	});
}
function ContactPanel() {
	const { content, updateContact } = useSiteContent();
	const [draft, setDraft] = (0, import_react.useState)(content.contact);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Contact details",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Legal business name",
				value: draft.legalName,
				onChange: (legalName) => setDraft({
					...draft,
					legalName
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Address",
				value: draft.address,
				onChange: (address) => setDraft({
					...draft,
					address
				}),
				textarea: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Phone",
				type: "tel",
				value: draft.phone,
				onChange: (phone) => setDraft({
					...draft,
					phone
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Email",
				type: "email",
				value: draft.email,
				onChange: (email) => setDraft({
					...draft,
					email
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Business hours",
				value: draft.hours,
				onChange: (hours) => setDraft({
					...draft,
					hours
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Map search query",
				value: draft.mapQuery,
				onChange: (mapQuery) => setDraft({
					...draft,
					mapQuery
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "LinkedIn URL",
				type: "url",
				value: draft.linkedin,
				onChange: (linkedin) => setDraft({
					...draft,
					linkedin
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Instagram URL",
				type: "url",
				value: draft.instagram,
				onChange: (instagram) => setDraft({
					...draft,
					instagram
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { onClick: () => void updateContact(draft).then(() => toast.success("Contact details updated."), () => toast.error("Could not save contact details.")) })
		]
	});
}
function LeadsPanel() {
	const { leads } = useSiteContent();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Form submissions & chatbot leads",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2",
			children: leads.map((lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "glass-soft rounded-xl p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary/20 px-2.5 py-0.5 text-foreground",
							children: lead.source
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lead.createdAt.slice(0, 10) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm font-medium",
						children: [
							lead.name,
							" · ",
							lead.email
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: lead.message
					})
				]
			}, lead.id))
		})
	});
}
function MediaPanel() {
	const [files, setFiles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let active = true;
		api.listMedia().then((result) => {
			if (active) setFiles(result);
		}).catch(() => {
			if (active) toast.error("Could not load media library.");
		}).finally(() => {
			if (active) setLoading(false);
		});
		return () => {
			active = false;
		};
	}, []);
	const remove = async (name) => {
		if (!window.confirm(`Delete ${name} from the media library?`)) return;
		try {
			await api.deleteMedia(name);
			setFiles((current) => current.filter((file) => file.name !== name));
			toast.success("Image deleted.");
		} catch {
			toast.error("Could not delete image.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Media library",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
				label: "Image",
				value: "",
				showUrl: false,
				onChange: (url) => {
					if (!url.split("/").pop()) return;
					api.listMedia().then(setFiles);
				}
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading images…"
			}) : null,
			!loading && files.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No uploaded images yet."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4",
				children: files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "glass-soft min-w-0 rounded-xl p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: api.getMediaUrl(file.name),
							alt: file.name,
							loading: "lazy",
							className: "aspect-square w-full rounded-lg object-contain"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 break-all text-xs text-muted-foreground",
							children: file.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void navigator.clipboard.writeText(api.getMediaUrl(file.name)).then(() => toast.success("Image URL copied."), () => toast.error("Could not copy image URL.")),
							className: "mt-2 min-h-10 text-sm text-primary hover:underline",
							children: "Copy image URL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void remove(file.name),
							className: "mt-2 min-h-10 text-sm text-destructive hover:underline",
							children: "Delete image"
						})
					]
				}, file.name))
			})
		]
	});
}
function UsersPanel() {
	const [users, setUsers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const refresh = async () => {
		try {
			setUsers(await api.getUsers());
		} catch {
			toast.error("Could not load user accounts.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	const toggleAdmin = async (userId, isAdmin) => {
		try {
			await api.setUserAdmin(userId, !isAdmin);
			await refresh();
			toast.success(isAdmin ? "Administrator access removed." : "Administrator access granted.");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not update account role.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "User accounts",
		children: [
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading accounts…"
			}) : null,
			!loading && users.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No accounts found."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "glass-soft flex min-w-0 flex-wrap items-center gap-3 rounded-xl p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "break-all text-sm font-medium",
								children: user.email
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["Created ", user.created_at.slice(0, 10)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary/15 px-3 py-1 text-xs",
							children: user.isAdmin ? "Admin" : "User"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void toggleAdmin(user.user_id, user.isAdmin),
							className: "glass-soft min-h-10 rounded-lg px-3 text-xs",
							children: user.isAdmin ? "Remove admin" : "Make admin"
						})
					]
				}, user.user_id))
			})
		]
	});
}
//#endregion
export { AdminLogin, AdminPage as component };
