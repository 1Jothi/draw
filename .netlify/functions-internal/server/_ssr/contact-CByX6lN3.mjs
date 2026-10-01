import { r as __toESM } from "../_runtime.mjs";
import { r as api } from "./api-Dw9fxolT.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as Section, t as Reveal } from "./Section-DQv6pgQf.mjs";
import { g as Mail, h as MapPin, s as Send, u as Phone, w as Clock } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-YFSUVt8T.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CByX6lN3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const { content } = useSiteContent();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		message: ""
	});
	const [sent, setSent] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submit = async (event) => {
		event.preventDefault();
		if (!form.name.trim() || !form.email.includes("@") || form.message.trim().length < 10) {
			toast.error("Please add your name, a valid email and a short message.");
			return;
		}
		setBusy(true);
		try {
			await api.submitLead({
				source: "Contact form",
				name: form.name.trim().slice(0, 120),
				email: form.email.trim().slice(0, 255),
				phone: form.phone.trim().slice(0, 40),
				message: form.message.trim().slice(0, 3e3)
			});
		} catch {
			setBusy(false);
			toast.error("Couldn't send your message. Please try again.");
			return;
		}
		setBusy(false);
		setSent(true);
		setForm({
			name: "",
			email: "",
			phone: "",
			message: ""
		});
		toast.success("Message sent — we'll reply within two business hours.");
	};
	const details = [
		{
			icon: MapPin,
			label: "Studio",
			value: content.contact.address
		},
		{
			icon: Phone,
			label: "Phone",
			value: content.contact.phone
		},
		{
			icon: Mail,
			label: "Email",
			value: content.contact.email
		},
		{
			icon: Clock,
			label: "Hours",
			value: content.contact.hours
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Contact",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Tell us what you're ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "gradient-text",
			children: "building"
		})] }),
		subtitle: "Share a few details and we'll come back with a plan, a timeline and a fixed quote within two business days."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1.1fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			direction: "left",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "glass rounded-3xl p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.name,
							onChange: (event) => setForm({
								...form,
								name: event.target.value
							}),
							placeholder: "Full name",
							className: "w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.email,
							onChange: (event) => setForm({
								...form,
								email: event.target.value
							}),
							placeholder: "Email address",
							className: "w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.phone,
						onChange: (event) => setForm({
							...form,
							phone: event.target.value
						}),
						placeholder: "Phone (optional)",
						className: "mt-4 w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: form.message,
						onChange: (event) => setForm({
							...form,
							message: event.target.value
						}),
						placeholder: "What would you like to build?",
						rows: 6,
						className: "mt-4 w-full resize-none rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: { scale: 1.02 },
						whileTap: { scale: .98 },
						disabled: busy,
						className: "gradient-accent mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60",
						children: [
							busy ? "Sending..." : "Send message",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 12,
							scale: .95
						},
						animate: {
							opacity: 1,
							y: 0,
							scale: 1
						},
						exit: { opacity: 0 },
						className: "mt-4 rounded-xl bg-primary/15 px-4 py-3 text-center text-sm font-medium",
						children: "✓ Thanks! Your message is on its way to our team."
					}) : null })
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			direction: "right",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass grid gap-4 rounded-3xl p-7 sm:grid-cols-2",
						children: details.map((detail) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-accent grid size-10 place-items-center rounded-xl text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(detail.icon, { className: "size-4.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs tracking-[0.16em] text-muted-foreground uppercase",
								children: detail.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: detail.value
							})
						] }, detail.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass flex flex-wrap gap-2 rounded-3xl p-5",
						children: [{
							label: "LinkedIn",
							url: content.contact.linkedin
						}, {
							label: "Instagram",
							url: content.contact.instagram
						}].filter((s) => s.url).map((social) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.a, {
							href: social.url,
							target: "_blank",
							rel: "noreferrer",
							whileHover: {
								y: -4,
								scale: 1.05
							},
							className: "glass-soft rounded-xl px-4 py-2.5 text-sm font-medium",
							children: social.label
						}, social.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass overflow-hidden rounded-3xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							title: "Drawvax Infotech location",
							loading: "lazy",
							className: "h-64 w-full border-0 grayscale-[35%]",
							src: `https://www.google.com/maps?q=${encodeURIComponent(content.contact.mapQuery)}&output=embed`
						})
					})
				]
			})
		})]
	}) })] });
}
//#endregion
export { ContactPage as component };
