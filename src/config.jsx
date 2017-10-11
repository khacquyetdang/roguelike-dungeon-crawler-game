var debugVar = false;
if (process.env.NODE_ENV === "production") {
    debugVar = false;
}

export const baseUrl = process.env.PUBLIC_URL;
export const debug = debugVar;