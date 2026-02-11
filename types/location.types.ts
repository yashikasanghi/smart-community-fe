export interface Ward {
  wardId: string;
  wardName: string;
}

export interface LocationResponse {
  state: string;
  city: string;
  wards: Ward[];
}
