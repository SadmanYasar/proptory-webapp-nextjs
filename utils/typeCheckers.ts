import escapeStringRegexp from "escape-string-regexp";
import { AgentLogin, Listing, NewAgent, NewListing, Queries } from "./types";

type AgentFields = {
    username: unknown;
    fullname: unknown;
    password: unknown;
    phone: unknown;
    role: 'USER'
};

type ListingFields = {
    matterportId: unknown,
    name: unknown,
    address: unknown,
    description: unknown,
    bathrooms: unknown,
    bedrooms: unknown,
    price: unknown,
}

type QueryFields = {
    page?: unknown,
    search?: unknown,
    minPrice?: unknown,
    maxPrice?: unknown
}

type AgentLoginFields = Pick<AgentFields, 'username' | 'password'>;

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const toNewAgent = ({
    username,
    fullname,
    password,
    phone
}: AgentFields): NewAgent => {
    return {
        username: parseToString(username, 'username'),
        fullname: parseToString(fullname, 'fullname'),
        password: parseToString(password, 'password'),
        phone: parseToString(phone, 'phone'),
        role: 'USER'
    };
};

export const toNewLogin = ({
    username,
    password
}: AgentLoginFields): AgentLogin => {
    return {
        username: parseToString(username, 'username'),
        password: parseToString(password, 'password'),
    }
}

export const toNewListing = ({
    matterportId,
    name,
    address,
    description,
    bathrooms,
    bedrooms,
    price,
}: ListingFields): NewListing => {
    return {
        matterportId: parseToString(matterportId, 'matterportId'),
        name: parseToString(name, 'name'),
        address: parseToString(address, 'address'),
        description: parseToString(description, 'description'),
        bathrooms: parseToNumber(bathrooms, 'bathrooms'),
        bedrooms: parseToNumber(bedrooms, 'bedrooms'),
        price: parseToNumber(price, 'price'),
    };
};

// export const getValidatedQueries = ({
//     search,
//     page,
//     minPrice,
//     maxPrice
// }: QueryFields): Queries => {
//     let queries: Queries = {};

//     const newSearch: string = search ? search as string : '';
//     const $regex = escapeStringRegexp(newSearch.toString());

//     if (search) {
//         query = {
//             address: { $regex, $options: 'i' },
//         };
//     } else {
//         query = {};
//     }

//     queries.search = search ? String(search).trim() : '';

//     return {

//     }
// };

const parseToString = (str: unknown, name: string): string => {
    if (!str || !isString(str)) {
        throw new Error(`Incorrect or missing ${name}`);
    }

    return str;
};

const parseToNumber = (val: unknown, name: string): number => {
    if (!val || !isNumber(val)) {
        throw new Error(`Incorrect or missing ${name}`);
    }

    return val;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (val: unknown): val is number => {
    return typeof val === 'number' || val instanceof Number;
};