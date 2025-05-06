export interface CreatePlanRequest {
    name: string;
}

export interface ListPlanRequest {
    user_id: string;
}

export interface Plan {
    id: string;
    name: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}
