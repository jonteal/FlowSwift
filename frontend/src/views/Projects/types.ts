import { ClientType } from "../Clients/types"

export type ProjectType = {
    id: string,
    title: string,
    description: string,
    status: string,
    notes: string,
    client: ClientType
    startDate: Date,
    deadline: Date,
    createdAt: Date,
    clientBudget: number,
    projectEstimate: number
  }