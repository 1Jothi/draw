import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/services/$category/$sub")({
  component: () => <Outlet />,
});
