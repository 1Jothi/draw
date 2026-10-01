import { createFileRoute } from "@tanstack/react-router";
import { AdminLogin } from "./admin";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin sign in | Drawvax Infotech" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});