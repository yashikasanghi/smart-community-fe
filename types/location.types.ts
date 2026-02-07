export interface Ward {
  wardID: string;
  wardName: string;
}

export interface LocationResponse {
  state: string;
  city: string;
  wards: Ward[];
}
