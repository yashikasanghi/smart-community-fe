import { router } from "expo-router";

export const routeToLogin = () => router.replace("/login");
export const routeToRoleSelection = () => router.replace("/role-selection");
export const routeToSignup = () => router.replace("/signup");
export const routeToCreateIssue = () => router.replace("/create-issue");
export const routeToIssueDetails = (issueId?: string) =>
  router.replace(issueId ? `/issue-details?issueId=${issueId}` : "/issue-details");
export const routeToIssuesList = (status?: string) =>
  router.replace(status ? `/issues-list?status=${status}` : "/issues-list");
export const routeToIssueSummary = () => router.replace("/issues-summary");
export const routeToDashboard = () => router.replace("/dashboard");
export const routeToIssueDensity = () => router.replace("/issue-density");
export const routeToNotifications = () => router.push("/notifications");
export const routeToProfile = () => router.replace("/profile");
export const routeToWelcome = () => router.replace("/welcome");
