import { apolloClient } from "@/graphql/apolloClient";
import { CREATE_ISSUE } from "@/graphql/mutations/issues";

export type CreateIssueInput = {
  shortDescription: string;
  description: string;
  category: string;
  location: {
    pincode: string;
    wardId: string;
    wardName: string;
    city?: string;
    state?: string;
    address: string;
  };
};

type CreateIssueResponse = {
  createIssue: {
    id: string;
    shortDescription: string;
    status: string;
  };
};

export const createIssue = async (input: CreateIssueInput) => {
  const { data } = await apolloClient.mutate<
    CreateIssueResponse,
    { input: CreateIssueInput }
  >({
    mutation: CREATE_ISSUE,
    variables: { input },
  });

  if (!data) {
    throw new Error("Failed to create issue");
  }

  return data.createIssue;
};
