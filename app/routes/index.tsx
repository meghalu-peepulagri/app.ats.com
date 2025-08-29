import { createFileRoute } from "@tanstack/react-router";
import { LoginContainer } from "../Components/core/auth";
import { authMiddleware } from "../lib/helper/middleware";

export const Route = createFileRoute("/")({
  component: LoginContainer,
  beforeLoad: authMiddleware
});
