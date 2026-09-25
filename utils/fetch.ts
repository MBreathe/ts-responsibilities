export async function fetchUtil(
    url: string,
    key?: string,
    options?: RequestInit
) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const text = await response.text();
        const result = text ? JSON.parse(text) : null;

        return key ? result[key] : result;
    } catch (error) {
        console.error('error: ', error);
    }
}
