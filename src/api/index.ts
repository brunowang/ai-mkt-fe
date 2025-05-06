import { isDebugEnv } from "@/constants/env";
import { IApiResponse, ApiResponse } from "./types";

export namespace Api {
    export async function post<T = void>(path: string, body?: unknown): Promise<IApiResponse<T>> {
        try {
            const request =
                body == null ? "" : typeof body === "object" ? JSON.stringify(body) : `${body}`;
            const response = await apiFetch(path, {
                headers: new Headers({
                    ["Content-Type"]: "application/json",
                }),
                method: "POST",
                body: request,
            });

            if (!response) {
                console.error("api request failed.");
                return new ApiResponse(-1, "api response failed.", undefined);
            }

            const rawData = await response.json();
            const resp = new ApiResponse<T>(rawData.code, rawData.msg, rawData.data);
            return resp;
        } catch (error) {
            console.error("api request error:", error);
            return new ApiResponse(-110, `api request error: ${error}`, undefined);
        }
    }
}

// api 请求
async function apiFetch(path: string, option: any): Promise<Response | undefined> {
    // 开发模式，下跳过登录验证
    if (isDebugEnv) {
        // 如果在开发环境中没有用户信息，使用模拟数据而不是重定向
        if (localStorage.getItem("user") == null) {
            const mockUser = {
                user_info: {
                    name: "Dev",
                    en_name: "dev",
                    user_id: "dev_id",
                    avatar_thumb: "",
                },
                access_key: "dev_token",
            };
            localStorage.setItem("user", JSON.stringify(mockUser));
        }
    } else {
        // 生产环境保持原有逻辑
        if (localStorage.getItem("user") == null) {
            window.location.href = "/";
            return;
        }
    }

    const apiUrl = `http://127.0.0.1:8000${path}`;

    const response = await fetch(apiUrl, {
        ...option,
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user") || "{}").access_key || "",
            "Content-Type": "application/json; charset=utf-8",
        },
    });

    if (response.status === 401) {
        localStorage.removeItem("user");
        window.location.reload();
        return;
    }

    return response;
}
