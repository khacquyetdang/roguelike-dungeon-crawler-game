var debugVar = false;
if (process.env.NODE_ENV === "production") {
    debugVar = false;
}

export const debug = debugVar;