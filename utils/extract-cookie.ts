export function extractCookie(cookieHeader: string,cookieName: string): string {
    const cookies = cookieHeader.split("; ");
    const cookie = cookies.map((cookie) => {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
            return value;
        }
        else {
            return "";
        }
    }).filter((x) => x);

    return cookie[0];
}