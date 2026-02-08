import { router } from "expo-router";

export const routeToLogin = () => router.replace("/login");
export const routeToRoleSelection = () => router.replace("/role-selection");
export const routeToSignup = () => router.replace("/signup");
export const routeToCreateIssue = () => router.replace("/create-issue");
export const routeToIssueDetails = () => router.replace("/issue-details");
export const routeToIssuesList = () => router.replace("/issues-list");
export const routeToIssueSummary = () => router.replace("/issues-summary");
