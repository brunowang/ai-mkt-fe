import {Api} from "@/api";
import {CreatePlanRequest, ListPlanRequest} from "./types";

export namespace ApiPlan {
    export const createPlan = (req: CreatePlanRequest) =>
        Api.post("/project/plan/create", {
            ...req,
        });
    export const listPlan = (req: ListPlanRequest) =>
        Api.post("/project/plan/list", {
            ...req,
        });
}
