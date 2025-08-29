import { createFileRoute } from "@tanstack/react-router";
import { LoginContainer } from "../Components/core/auth";

export const Route = createFileRoute("/")({
  component: LoginContainer
});
