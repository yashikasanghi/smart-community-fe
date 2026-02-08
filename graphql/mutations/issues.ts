import { gql } from "@apollo/client";

export const CREATE_ISSUE = gql`
  mutation CreateIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
      id
      shortDescription
      status
    }
  }
`;
