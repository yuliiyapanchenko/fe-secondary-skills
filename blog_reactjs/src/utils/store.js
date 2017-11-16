const TOKEN_KEY = 'token';
const USER_ROLES_KEY = 'user_roles';

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function getRoles() {
    return localStorage.getItem(USER_ROLES_KEY);
}

export function saveRoles(roles) {
    localStorage.setItem(USER_ROLES_KEY, roles);
}

export function removeRoles() {
    localStorage.removeItem(USER_ROLES_KEY);
}