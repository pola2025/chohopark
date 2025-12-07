export interface Package {
  id: string;
  name: string;
  slug: string;
  type: "overnight" | "daytrip" | "retreat";
  pricePerPerson: number;
  capacity: {
    min: number;
    max: number;
  };
  schedule: {
    checkIn: string;
    checkOut: string;
  };
  includes: string[];
  isBest?: boolean;
  thumbnail: string;
}

export interface Inquiry {
  id?: string;
  type: "quick_inquiry" | "calculator_inquiry";
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  companyName?: string;
  desiredDate?: string;
  people: number;
  packageType?: "overnight" | "daytrip";
  totalAmount?: number;
  depositAmount?: number;
  requests?: string;
  source: string;
  createdAt?: Date;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  features: string[];
  thumbnail: string;
  icon: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  features: string[];
  tag?: string;
  tagColor?: string;
  thumbnail: string;
}

export interface Rule {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TargetCustomer {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface RefundPolicy {
  period: string;
  refund: string;
}

export interface BusinessInfo {
  name: string;
  registrationNumber: string;
  representative: string;
}
