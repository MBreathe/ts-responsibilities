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

        const result = await response.json();
        return key ? result[key] : result;
    } catch (error) {
        console.error('error: ', error);
    }
}
