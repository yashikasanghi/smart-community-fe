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

export type RoleSelection = {
  role: string;
  authorityAssignment?: {
    wardId: string;
  };
};

export type LoginPayload = {
  loginKey: string;
  password: string;
};

export type User = SignupPayload & RoleSelection;
