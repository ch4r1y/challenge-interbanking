export enum CompanyType {
  PYME = 'PYME',
  ENTERPRISE = 'CORPORATIVA',
}

export interface Company {
  id: string;
  name: string;
  type: CompanyType;
  adheredAt: Date;
}
