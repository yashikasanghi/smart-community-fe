export type SignupPayload = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email?: string;
  password: string;
  location: {
    pincode: string;
    wardId: string;
    wardName: string;
    address: string;
    city: string;
    state: string;
  };
};

export type Role = string;

export type RoleSelection = {
  role: Role;
  authorityAssignment?: {
    wardId: string;
  };
};

export type User = SignupPayload & RoleSelection;
