import Cookies from "js-cookie";

export function useCookie() {
    function getCookie(key: string) {
        try {
            return JSON.parse(Cookies.get(key) || "{}");
        } catch (e) {
            console.error("Error parsing cookie", e);
            return {};
        }
    }

    function setCookie(key: string, value: any) {
        console.log("setting cookie");
        Cookies.set(key, JSON.stringify(value), { secure: true });
    }

    function removeCookie(key: string) {
        Cookies.remove(key);
    }

    return { getCookie, setCookie, removeCookie };
}
