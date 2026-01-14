// Central API config for dev/prod

function normalizeBaseUrl(url) {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export const API_BASE_URL = normalizeBaseUrl(
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000"
);

export function apiUrl(pathname) {
  if (!pathname) return API_BASE_URL;
  return `${API_BASE_URL}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}

export function authHeaders(user) {
  return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
}
