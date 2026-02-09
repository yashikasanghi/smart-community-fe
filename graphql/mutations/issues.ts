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

export const UPDATE_ISSUE_STATUS = gql`
  mutation UpdateIssueStatus($issueId: ID!, $status: IssueStatus!) {
    updateIssueStatus(issueId: $issueId, status: $status) {
      id
      status
      updatedAt
    }
  }
`;
