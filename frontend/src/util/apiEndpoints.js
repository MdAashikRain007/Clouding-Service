export const BASE_URL = "http://localhost:8080/api/v1.0";

 export const apiEndpoints = {
    FETCH_FILES: `${BASE_URL}/files/my`,
    TOGGLE_FILE: (id) => `${BASE_URL}/files/${id}/toggle-public`,
    DOWNLOAD_FILE: (id) => `${BASE_URL}/files/download/${id}`,
    DOWNLOAD_FILE_INLINE: (id) => `${BASE_URL}/files/download/${id}?inline=true`,
    UPLOAD_FILES: `${BASE_URL}/files/upload`,

    PROFILE: `${BASE_URL}/profile`,
    CREDITS: `${BASE_URL}/credits`,
    TRANSACTIONS: `${BASE_URL}/transactions`,
    SUBSCRIPTIONS: `${BASE_URL}/subscriptions`,
    PURCHASE_SUBSCRIPTION: `${BASE_URL}/subscriptions/purchase`,

    PUBLIC_FILE: (id) => `${BASE_URL}/files/public/${id}`
}