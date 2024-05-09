export type ClientType = {
  firstName: string;
  id: string;
  lastName: string;
};

export type UserType = {
  name: string;
  id: string;
};

export type OrganizationType = {};

export type ProjectType = {
  client: ClientType;
  clientBudget: string;
  createdAt: string;
  deadline: string;
  description: string;
  id: string;
  notes: string;
  organization?: OrganizationType | null;
  priority: string;
  projectEstimate: string;
  startDate: string;
  status: string;
  title: string;
  user: UserType;
};
