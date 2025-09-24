import { createFileRoute } from "@tanstack/react-router";
import { authMiddleware } from "../lib/helper/middleware";
import { LoginContainer } from "~/components/core/auth";

export const Route = createFileRoute("/")({
  component: LoginContainer,
});
