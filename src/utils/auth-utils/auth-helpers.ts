import { jwtDecode } from "jwt-decode";
export const isTokenExpired = (token: string): boolean => {
    if (!token) {
        return true;
    };

    const decoded: { exp: number; } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // true if expired token
    return decoded.exp < currentTime;
};
