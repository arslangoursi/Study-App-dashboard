import { CSSProperties, ChangeEvent, Dispatch, ReactNode } from "react";

import { SetStateAction } from "jotai";
import { ToastOptions } from "react-toastify";

export interface IMarker {
  number: string;
  logoIcon: string | null;
  latitude: number | null;
  longitude: number | null;
  description: {
    en: string | null;
    ar: string | null;
  } | null;
  area: number | null;
  name: {
    en: string | null;
    ar: string | null;
  } | null;
}

export interface ILinks {
  label: string;
  labelAr: string;
  children: {
    href: string;
    label: string;
    labelAr: string;
    icon: ReactNode;
    preloadLink?: string;
  }[];
}

export interface ChartUser {
  id: string;
  picture: string;
  name: string;
  email: string;
  designation: string;
  department: string;
  status: string;
  children?: ChartUser[];
}

export interface IListingAction {
  name: string;
  onClick: () => void;
  icon: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  sale?: boolean;
}

export interface IData<T> {
  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;
}

export interface IReferral {
  id: string;
  name: string;
  number: string;
  expiredAt: Date;
  createdAt: Date;
}

export interface IProjects {
  id: string;
  number: string;
  name: {
    en: string;
    ar: string;
  };
  area: string;
  city: {
    en: string;
    ar: string;
  };
  logo: {
    en: string;
    ar: string;
  };
  status: "Visible" | "Hidden";
  completion: number;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
}

export interface IApplications {
  id: string;
  number: string;
  project: {
    en: string;
    ar: string;
  };
  name: string;
  picture: string;
  map: {
    en: string;
    ar: string;
  };
  properties: string[];
  status: string;
  lastUpdatedBy: string;
  lastUpdatedDate: Date;
  createdBy: string;
  createdDate: Date;
  firstActionAt: Date | null;
}

export interface ITransactions {
  id: string;
  number: string;
  status: string;
  updatedAt: Date;
  actionBy: string | null | undefined;
  createdAt: Date;
  invoiceId: string;
  amount: number;
}

export interface IDashboardLayout {
  children: ReactNode;
  links: ILinks[];
}

export interface IEmail {
  from: string;
  to: string;
  subject: string;
  react: any;
}

export interface IUsers {
  id: string;
  name: string;
  email: string;
  picture: string;
  designation: string;
  department: string;
  status: string;
}

export interface IPopup<T> {
  onClose: () => void;
  onSubmit: ({ data, isEdit }: { data: T; isEdit: boolean }) => void;
  isEdit?: boolean;
  initialData?: T;
}

export interface IAnalytics {
  id: string;
  path: string;
  ipAddress: string;
  browser: string;
  os: string;
  language: string;
  country: string;
  region: string;
  city: string;
  screenResolution: string;
  timezone: string;
  cookiesEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReferralAnalytics {
  name: string;
  number: string;
  expiredAt: string;
  analytics: {
    id: string;
    ipAddress: string;
    browser: string;
    os: string;
    language: string;
    country: string;
    region: string;
    city: string;
    screenResolution: string;
    timezone: string;
    cookiesEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export interface IUser {
  id: string;
  number: string;
  name: string;
  email: string;
  picture: string;
  phone: string;
  designation: string;
  department: string;
  workPhone: string;
  workEmail: string;
  workAddress: string;
  bankAccount: string;
  dateOfBirth: string;
  status: string;
  hasContentEditAccess: boolean;
  userContract: {
    salary: number;
    startDate: Date;
    endDate: Date | null;
    wage: number;
    houseAllowance: number;
    transportAllowance: number;
    otherAllowance: number;
    otherDeduction: number;
  };
  userQualifications: [];
  userExperiences: [];
  userFamily: [];
}

export interface ISales {
  id: string;
  number: string;
  project: {
    en: string;
    ar: string;
  };
  map: {
    en: string;
    ar: string;
  };
  properties: string[];
  status: string;
  amount: number;
  createdDate: string;
}

export interface IPurchases {
  id: string;
  number: string;
  project: {
    en: string;
    ar: string;
  };
  map: {
    en: string;
    ar: string;
  };
  properties: string[];
  amount: number;
  purchaseDate: string | null;
  lastUpdatedDate: string;
}

export interface ICustomers {
  id: string;
  name: string;
  email: string;
  picture: string;
  phone: string;
  type: string;
  tags: string[];
  spent: number;
  bought: number;
  status: string;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
}

export interface ICustomerDetail {
  id: string;
  number: string;
  name: string;
  email: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  country: string;
  zipCode: string;
  language: string;
  company: string;
  website: string;
  nationality: string;
  address: string;
  idNumber: string;
  city: string;
  picture: string;
  phone: string;
  type: "Company" | "Individual";
  tags: string[];
  spent: number;
  isSeller: boolean;
  taxNumber: number;
  remaining: number;
  bought: number;
  status: "ACTIVE" | "INACTIVE";
  lastUpdatedBy: string;
  lastUpdatedDate: string;
  paidAmount: number;
  remainingAmount: number;
}

export interface ITextArea {
  help?: string;
  example?: string;
  label?: string;
  id?: string;
  error?: boolean;
  type?: string;
  secure?: boolean;
  style?: CSSProperties;
  defaultOptions?: string;
  prefix?: string;
  isRtl?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  [x: string]: any;
}

export interface IOption {
  value: any;
  label: string;
}

export interface ISelect {
  placeholder?: string;
  options: IOption[];
  value?: IOption | IOption[] | null;
  onChange?: (newValue: any) => void;
  label: string;
  isMulti?: boolean;
  disabled?: boolean;
}

export interface IRightBoxMenuWrapper {
  data: Record<string, any>[];
  title: string;
  info: string;
  buttonTitle: string;
  onAdd: () => void;
  actions: {
    title: string;
    onClick: (data: any) => void;
  }[];
}

export interface IRightBoxMenuEntry {
  children: ReactNode;
  actions: { title: string; onClick: (data: any) => void }[];
  data: any;
}

export interface IListingTabs {
  tabs: {
    name: string;
    number: number;
  }[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export interface IReminder {
  id: string;
  title: string;
  description: string;
  reminderAt: string;
  isDone: boolean;
  user: { name: string };
  files: string[];
  createdAt: string;
  updatedAt: string;
  parentId: string;
}

export interface IDevelopment {
  id: string;
  title: string;
  description: string;
  files: string[];
  startedAt: string;
  expectedAt: string;
  isDone: boolean;
}

export interface IMap {
  id: string;
  number: string;
  name: {
    en: string;
    ar: string;
  };
  type: string;
  logo: string;
  status: string;
  completion: number;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
}

export interface IProjectDetails {
  id: string;
  number: string;
  name: {
    en: string;
    ar: string;
  };
  area: string;
  city: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  timeline: number;
  user: { name: string; id: string };
  updatedAt: string;
  createdAt: string;
  visible: boolean;
}

export interface GEOJSON {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: number[][][];
}

export interface Properties {
  name: string;
  description: Description | undefined;
  styleUrl: string;
  fillOpacity: number;
  fill: string;
  "stroke-opacity": number;
  stroke: string;
  strokeWidth: number;
}

export interface Description {
  "@type": string;
  value: string;
}

export interface IListingAnalyticsCard {
  title: string;
  value: number;
  color: string;
  icon: ReactNode;
}

export interface SWROptions {
  keepPreviousData?: boolean;
  [key: string]: any;
}

export interface IDateRange {
  left?: boolean;
  value?: {
    startDate: Date;
    endDate: Date;
  } | null;
  disabled?: boolean;
  onChange?: (value: { startDate: Date; endDate: Date }) => void;
  reverse?: boolean;
  style?: Object;
  label?: string;
}

export interface UseActionParams<TArgs = any, TData = any> {
  promise: (args: TArgs, signal?: AbortSignal) => Promise<{ data: TData }>;
  successMessage?: string;
  errorMessage?: string;
  mutatePath?: string;
  goBack?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
  logError?: (error: Error) => void;
  retryCount?: number;
  successToastOptions?: ToastOptions;
  errorToastOptions?: ToastOptions;
  needsConfirmation?: boolean;
}

export interface IMap3dApartment {
  id: string;
  unit: string;
  status: string;
  details: {
    entity: string;
    batch: string | null;
    area: string | null;
    unitPrice: number | null;
    images: string[];
    tower: string;
    numberOfBedrooms: number | null;
    asset3dFiles: string[];
    link360: string;
  };
}

export interface IAddToCartButton {
  id: string;
  entity: string;
  batch: string | null;
  area: string | null;
  unitPrice: number | null;
  images: string[];
  status?: string;
}

export interface ISiteContent {
  id: string;
  number: string;
  name: {
    en: string | null;
    ar: string | null;
  } | null;
  logo: {
    en: string | null;
    ar: string | null;
  } | null;
  description: {
    en: string | null;
    ar: string | null;
  } | null;
  city: {
    en: string | null;
    ar: string | null;
  } | null;
  area: number | null;
  numberOfEntity?: number;
  nameOfEntity?: {
    en: string | null;
    ar: string | null;
  } | null;
  banner?: string;
  picture?: string;
  slides: string[];
  status: "ON_SALE" | "SOLD_OUT" | "COMING_SOON";
  visible: boolean;
  actionBy: {
    name: string | null;
  };
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMapLand {
  lands: {
    id: string;
    plot: string;
    status: string;
    details: {
      entity: string;
      batch: string | null;
      area: string | null;
      unitPrice: number | null;
      images: string[];
    };
  }[];
  geoJson: string;
}

export interface ILocalizedOption {
  value: string;
  label: {
    en: string;
    ar: string;
  };
}

export interface MessageSenderParams {
  sendTo: "phone" | "email" | "both" | "none";
  subject: string;
  messageText: string;
  phone?: string;
  email?: string;
  from?: string;
}

export interface ProjectProps {
  index: number;
  image: string;
  manageModal: (show: boolean, index: number, x: number, y: number) => void;
  year: string;
  location: string;
}

export interface ISiteAnalyticsCard {
  title: string;
  loading?: boolean;
  data: {
    key: string;
    clicks: number;
    visits: number;
  }[];
}

export interface RangeTwoLabeledProps {
  values: number[];
  setValues: (values: number[]) => void;
  min: number;
  max: number;
  type?: "price" | "area";
}

export interface IInput {
  label: string;
  id?: string;
  value: string;
  type?: string;
  error?: string;
  onChange: (e: any) => void;
  autoFocus?: boolean;
  required?: boolean;
  style?: CSSProperties;
}

export interface IPropertyDetails {
  isApartment?: boolean;
  data?: {
    id: string;
    entity: string;
    batch: string | null;
    area: string | null;
    unitPrice: number | null;
    images: string[];
    status?: string;
  };
  children: ReactNode;
}

export interface IListingTable {
  style?: Object;
  children: ReactNode;
  actions?: IListingAction[];
  selectedRows?: string[];
  setSelectedRows?: (value: string[]) => void;
  sortData?: {
    key: string;
    order: "asc" | "desc";
  };
  setSortData?: (value: { key: string; order: "asc" | "desc" }) => void;
  headerItems: {
    key: string;
    name: string;
    nameAr: string;
    hasImage?: boolean;
    style?: CSSProperties;
  }[];
  data: any[];
  onAdd?: () => void;
  isFetchingData?: boolean;
  isStale?: boolean;
  noCheckbox?: boolean;
}

export interface IListingGrid {
  children: ReactNode;
  actions: IListingAction[];
  selectedRows?: string[];
  setSelectedRows: (value: string[]) => void;
  data: any[];
  isFetchingData?: boolean;
  isStale?: boolean;
}
export interface IRoom {
  id: string;
  number: string;
  name: {
    en: string;
    ar: string;
  };
  noOfFiles: number;
  link360: string;
  createdAt: string;
  updatedAt: string;
}
