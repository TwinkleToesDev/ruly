export interface CreateUserDTO {
    full_name: string;
    role: string;
    efficiency: number;
}

export interface UserDTO {
    id: number;
    full_name: string;
    role: string;
    efficiency: number;
}

export interface GetUsersQueryDTO {
    role?: string;
    full_name?: string;
    efficiency?: number;
}

export interface UpdateUserDTO {
    full_name?: string;
    role?: string;
    efficiency?: number;
}