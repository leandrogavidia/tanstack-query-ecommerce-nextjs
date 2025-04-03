if (!process.env.NEXT_PUBLIC_API_PATH || !process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error("Missing enviroment variables, please check .env.example file.")
}

export const config = {
    apiPath: process.env.NEXT_PUBLIC_API_PATH,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    analyticsTools: process.env.NEXT_PUBLIC_ANALYTICS_TOOLS === "true",
}