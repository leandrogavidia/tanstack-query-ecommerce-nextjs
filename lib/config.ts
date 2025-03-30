if (!process.env.NEXT_PUBLIC_API_PATH) {
    throw new Error("Missing enviroment variables.")
}

export const config = {
    apiPath: process.env.NEXT_PUBLIC_API_PATH,
    reactQueryDevtools: process.env.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS === "true"
}