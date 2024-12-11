export const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_IS_STAGING === "true"
      ? process.env.NEXT_PUBLIC_API_URL_STAGING
      : process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL;

export const mapView3d = process.env.NEXT_PUBLIC_IS_STAGING === "true";

export const propertyTaxPercentage = 0.05;
export const commissionPercentage = 0.025;
export const commissionTaxPercentage = 0.15;

export const pricingFilters = [
  {
    name: "1 million or less",
    nameAr: "مليون أو أقل",
    value: "1M_OR_LESS"
  },
  {
    name: "1 - 2.5 million",
    nameAr: "1 - 2.5 مليون",
    value: "1M_TO_2_5M"
  },
  { name: "2.5 - 3 million", nameAr: "2.5 - 3 مليون", value: "2_5M_TO_3M" },
  { name: "3 million or more", nameAr: "3 مليون أو أكثر", value: "3M_OR_MORE" }
];

export const pricingMatch = (filters: string[], price: number) => {
  let match = false;

  if (filters.includes("1M_OR_LESS") && price <= 1000000) match = true;
  if (filters.includes("1M_TO_2_5M") && price > 1000000 && price <= 2500000)
    match = true;
  if (filters.includes("2_5M_TO_3M") && price > 2500000 && price < 3000000)
    match = true;
  if (filters.includes("3M_OR_MORE") && price > 3000000) match = true;

  return match;
};

export const initialDataCustomer = {
  picture: null as File | null,
  name: "",
  email: "",
  phone: "",
  address: "",
  company: "",
  website: "",
  country: "",
  city: "",
  taxNumber: "",
  language: "",
  idNumber: "",
  nationality: "",
  bankingDetails: {
    inUse: true,
    bankName: "",
    iban: ""
  },
  tags: "",
  notes: "",
  status: "ACTIVE" as "ACTIVE" | "INACTIVE" | null,
  isSeller: true as true | false | null,
  type: "INDIVIDUAL" as "INDIVIDUAL" | "COMPANY" | null
};

export const initialDataUser = {
  name: "",
  email: "",
  picture: null as null | File,
  phone: "",
  designation: "",
  department: "",
  workPhone: "",
  workEmail: "",
  workAddress: "",
  bankAccount: "",
  dateOfBirth: "",
  otp: "",
  otpExpiredAt: "",
  contract: {
    salary: "",
    startDate: "",
    endDate: "",
    wage: "",
    houseAllowance: "",
    transportAllowance: "",
    otherAllowance: "",
    otherDeduction: ""
  },
  experiences: [] as {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null;
    description: string;
  }[],
  qualifications: [] as {
    title: string;
    institute: string;
    location: string;
    startDate: string;
    endDate: string | null;
    description: string;
  }[],
  family: [] as {
    name: string;
    relation: string;
    dateOfBirth: string;
  }[]
};
