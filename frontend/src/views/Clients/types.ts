export type OrganizationType = {
    id: string,
    organizationName: string,
    userId: string
  }
  
  export type ClientType = {
    id: string,
    companyName: string,
    emailAddress: string,
    firstName: string,
    lastName: string,
    organization: OrganizationType,
    phoneNumber: string,
    status: string
  }