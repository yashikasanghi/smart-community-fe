import { gql } from "@apollo/client";

export const MY_ISSUE_COUNTS = gql`
  query MyIssueCounts {
    myIssueCounts {
      open
      inProgress
      resolved
      rejected
    }
  }
`;

export const MY_ISSUES_BY_STATUS = gql`
  query MyIssuesByStatus($status: IssueStatus!) {
    myIssuesByStatus(status: $status) {
      id
      shortDescription
      status
      images
      createdAt
    }
  }
`;

export const MY_ISSUES_LIST = gql`
  query MyIssuesList($status: IssueStatus) {
    myIssuesList(status: $status) {
      id
      shortDescription
      status
      images
      createdAt
      updatedAt
    }
  }
`;

export const ISSUE_DETAILS = gql`
  query IssueDetails($id: ID!) {
    issue(id: $id) {
      id
      shortDescription
      description
      status
      priority
      category
      createdAt
      updatedAt
      images
      comments {
        id
        userId
        userName
        text
        createdAt
      }
      location {
        address
        city
        state
        pincode
        wardId
        wardName
      }
      assignedTo {
        authorityId
        name
        wardId
      }
      createdBy {
        userId
        name
        wardId
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      id
      userId
      userName
      text
      createdAt
    }
  }
`;
