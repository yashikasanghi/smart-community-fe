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
