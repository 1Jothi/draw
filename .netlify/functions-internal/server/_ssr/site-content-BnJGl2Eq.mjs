import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-IAoNMzjn.mjs";
import { a as defaultContent, r as api } from "./api-Dw9fxolT.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-content-BnJGl2Eq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Site content store — loads live content from the backend and exposes
* admin mutations. Visitors see defaults instantly, then live data.
*/
var SiteContentContext = (0, import_react.createContext)(null);
function SiteContentProvider({ children }) {
	const [content, setContent] = (0, import_react.useState)(defaultContent);
	const [reviews, setReviews] = (0, import_react.useState)([]);
	const [news, setNews] = (0, import_react.useState)([]);
	const [leads, setLeads] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [userEmail, setUserEmail] = (0, import_react.useState)(null);
	const [authReady, setAuthReady] = (0, import_react.useState)(false);
	const reloadReviews = (0, import_react.useCallback)(async () => {
		try {
			setReviews(await api.getReviews());
		} catch (error) {
			console.error(error);
		}
	}, []);
	const reloadNews = (0, import_react.useCallback)(async () => {
		try {
			setNews(await api.getNews());
		} catch (error) {
			console.error(error);
		}
	}, []);
	const reloadLeads = (0, import_react.useCallback)(async () => {
		try {
			setLeads(await api.getLeads());
		} catch (error) {
			console.error(error);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		Promise.allSettled([
			api.getContent(),
			api.getReviews(),
			api.getNews()
		]).then(([c, r, n]) => {
			if (cancelled) return;
			if (c.status === "fulfilled") setContent(c.value);
			if (r.status === "fulfilled") setReviews(r.value);
			if (n.status === "fulfilled") setNews(n.value);
			setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const resolve = async (email) => {
			setUserEmail(email);
			const admin = email ? await api.checkAdmin() : false;
			setIsAdmin(admin);
			setAuthReady(true);
			if (admin) {
				reloadReviews();
				reloadLeads();
			} else setLeads([]);
		};
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "INITIAL_SESSION") setTimeout(() => resolve(session?.user.email ?? null), 0);
		});
		return () => data.subscription.unsubscribe();
	}, [reloadLeads, reloadReviews]);
	const saveSection = (0, import_react.useCallback)(async (key, value) => {
		await api.saveSection(key, value);
		setContent((current) => ({
			...current,
			[key]: value
		}));
	}, []);
	const updateFounder = (0, import_react.useCallback)((value) => saveSection("founder", value), [saveSection]);
	const updateContact = (0, import_react.useCallback)((value) => saveSection("contact", value), [saveSection]);
	const upsertService = (0, import_react.useCallback)((value) => saveSection("services", content.services.some((item) => item.id === value.id) ? content.services.map((item) => item.id === value.id ? value : item) : [...content.services, value]), [content.services, saveSection]);
	const removeService = (0, import_react.useCallback)((id) => saveSection("services", content.services.filter((item) => item.id !== id)), [content.services, saveSection]);
	const upsertPortfolio = (0, import_react.useCallback)((value) => saveSection("portfolio", content.portfolio.some((item) => item.id === value.id) ? content.portfolio.map((item) => item.id === value.id ? value : item) : [...content.portfolio, value]), [content.portfolio, saveSection]);
	const removePortfolio = (0, import_react.useCallback)((id) => saveSection("portfolio", content.portfolio.filter((item) => item.id !== id)), [content.portfolio, saveSection]);
	const upsertClient = (0, import_react.useCallback)((value) => saveSection("clients", content.clients.some((item) => item.id === value.id) ? content.clients.map((item) => item.id === value.id ? value : item) : [...content.clients, value]), [content.clients, saveSection]);
	const removeClient = (0, import_react.useCallback)((id) => saveSection("clients", content.clients.filter((item) => item.id !== id)), [content.clients, saveSection]);
	const addReview = (0, import_react.useCallback)(async (value) => {
		await api.saveReview({
			...value,
			isNew: true
		});
		await reloadReviews();
	}, [reloadReviews]);
	const updateReview = (0, import_react.useCallback)(async (value) => {
		await api.saveReview(value);
		await reloadReviews();
	}, [reloadReviews]);
	const setReviewStatus = (0, import_react.useCallback)(async (id, status) => {
		const review = reviews.find((item) => item.id === id);
		if (!review) return;
		await api.saveReview({
			...review,
			status
		});
		await reloadReviews();
	}, [reloadReviews, reviews]);
	const removeReview = (0, import_react.useCallback)(async (id) => {
		await api.deleteReview(id);
		await reloadReviews();
	}, [reloadReviews]);
	const upsertNews = (0, import_react.useCallback)(async (value) => {
		await api.saveNews({
			...value,
			id: value.id
		});
		await reloadNews();
	}, [reloadNews]);
	const removeNews = (0, import_react.useCallback)(async (id) => {
		await api.deleteNews(id);
		await reloadNews();
	}, [reloadNews]);
	const value = (0, import_react.useMemo)(() => ({
		content,
		reviews,
		news,
		leads,
		loading,
		isAdmin,
		userEmail,
		authReady,
		saveSection,
		updateFounder,
		updateContact,
		upsertService,
		removeService,
		upsertPortfolio,
		removePortfolio,
		upsertClient,
		removeClient,
		addReview,
		updateReview,
		setReviewStatus,
		removeReview,
		upsertNews,
		removeNews,
		reloadReviews,
		reloadNews,
		reloadLeads
	}), [
		content,
		reviews,
		news,
		leads,
		loading,
		isAdmin,
		userEmail,
		authReady,
		saveSection,
		updateFounder,
		updateContact,
		upsertService,
		removeService,
		upsertPortfolio,
		removePortfolio,
		upsertClient,
		removeClient,
		addReview,
		updateReview,
		setReviewStatus,
		removeReview,
		upsertNews,
		removeNews,
		reloadReviews,
		reloadNews,
		reloadLeads
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteContentContext.Provider, {
		value,
		children
	});
}
function useSiteContent() {
	const ctx = (0, import_react.useContext)(SiteContentContext);
	if (!ctx) throw new Error("useSiteContent must be used inside <SiteContentProvider>");
	return ctx;
}
var approvedReviews = (reviews) => reviews.filter((r) => r.status === "approved");
//#endregion
export { approvedReviews as n, useSiteContent as r, SiteContentProvider as t };
