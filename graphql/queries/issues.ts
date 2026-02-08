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
