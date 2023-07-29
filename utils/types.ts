export interface Agent {
    id: string;
    username: string;
    fullname: string;
    password: string;
    phone: string;
    role?: 'USER'
}

export interface Listing {
    [x: string]: any;
    id: string;
    agentContact: string,
    matterportId: string,
    name: string,
    description: string,
    address: string,
    bathrooms: number,
    bedrooms: number,
    price: number
}

export interface Queries {
    page?: string,
    search?: string,
    minPrice?: number,
    maxPrice?: number
}

export type NewAgent = Omit<Agent, 'id'>;
export type NewListing = Omit<Listing, 'id' | 'agentContact'>;
export type AgentLogin = Pick<Agent, 'username' | 'password'>;