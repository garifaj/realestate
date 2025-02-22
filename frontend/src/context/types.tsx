export type Property = {
  id: number;
  title: string;
  description: string;
  price: number;
  bedroom: number;
  bathroom: number;
  area: number;
  type: string;
  address: string;
  city: string;
  images: string[];
  agentId: number;
  agent?: Agent;
};

export type Agent = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  bio: string;
  linkedIn: string;
  profilePicture: string;
  properties: Property[];
};

export type User = {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  isAdmin: boolean;
};

export type Booking = {
  id: number;
  propertyId: number;
  property: Property;
  userId: number;
  user: User;
  bookingDate: string;
  status?: string | null;
};

export type PropertyFiltersProps = {
  cities: string[];
  propertyTypes: string[];
  agents?: Agent[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedAgent: string;
  setSelectedAgent: (agentId: string) => void;
  setSearch: (search: string) => void;
  search: string;
  showAgentFilter?: boolean;
};

export type TablePaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  colSpan: number;
};

export type ContactUs = {
  id: number;
  name: string;
  surname: string;
  email: string;
  subject: string;
  message: string;
  isAnswered: boolean;
};

export type PropertyHomeCardProps = {
  selectedCity?: string;
  selectedType?: string;
  limit?: number;
};
