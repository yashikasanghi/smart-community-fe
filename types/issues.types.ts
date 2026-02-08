export type IssueDetailsData = {
  issue: {
    id: string;
    shortDescription: string;
    description: string;
    status: string;
    priority: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    images?: string[];
    comments?: {
      id: string;
      userId: string;
      userName?: string;
      text: string;
      createdAt: string;
    }[];
    location?: {
      address?: string;
      city?: string;
      state?: string;
      pincode?: string;
      wardId?: string;
      wardName?: string;
    };
    assignedTo?: {
      authorityId?: string;
      name?: string;
      wardId?: string;
    };
    createdBy?: {
      userId?: string;
      name?: string;
      wardId?: string;
    };
  };
};
