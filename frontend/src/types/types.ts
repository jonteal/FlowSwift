export type ClientType = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  emailAddress?: string;
  companyName?: string;
  status?: "Lead" | "Prospect" | "Current" | "Former" | "Cold"
  organization?: OrganizationType
};

export type UserType = {
  name: string;
  id: string;
  email?: string;
  manager?: string;
  managerId?: string;
  organizationId?: string;
  role?: string;
  _id: string;
};

export type OrganizationType = {
  id: string;
  organizationName: string;
  user: UserType
};

export type ProjectContainer = {
  id: string;
  state: string;
}

export type ProjectType = {
  client: ClientType;
  clientBudget: string;
  createdAt: string;
  deadline: string;
  description: string;
  id: string;
  notes: string;
  organization?: OrganizationType | null;
  priority: 'low' | 'medium' | 'high'
  projectEstimate: string;
  startDate: string;
  status:  
    "notStarted"
    | "inProgress"
    | "completed"
    | "paused"
    | "needsAttention";
  title: string;
  user: UserType;
};

export type ServiceType = {
  cost: string;
  createdAt: string;
  endDate: string;
  id: string;
  notes: string;
  paymentSchedule: string;
  project: {
    id: string;
    title: string;
  };
  service: string;
  serviceProvider: string;
  startDate: string;
  status: "on" | "off"
}

export type KanbanType = {
  id: string;
  title: string;
  description: string;
  project: ProjectType;
};

export type KanbanColumnType = {
  columnState: string;
  columnDescription: string;
  position: number;
  kanban: KanbanType
}

export type InvoiceType = {
  amount: string;
  client: {
    firstName: string;
    id: string;
    lastName: string;
  };
  createdAt: string;
  date: string;
  id: string;
  invoiceNumber: string;
  notes: string;
  project: {
    id: string;
    title: string;
  };
};

export type ClientContainerType = {
  id: string;
  state: string;
}


