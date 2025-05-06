const ENV = {
    RUN_MODE: "debug",
};

/**
 * 是否是开发调试环境
 *
 * 说明：调试环境下，会跳过登录授权
 */
export const isDebugEnv = ENV.RUN_MODE === "debug";
