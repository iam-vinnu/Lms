import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const courseApi = createApi({
    reducerPath:"courseApi",
    baseQuery:fetchBaseQuery({
        
    })
})