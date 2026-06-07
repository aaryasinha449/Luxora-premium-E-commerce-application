import { useAuth } from "../store";

export async function luxeFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = useAuth.getState().token;

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Ensure JSON requests have Content-Type header
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    console.warn("Session expired or unauthorized (401). Clearing credentials.");
    useAuth.getState().logout();
    
    // Redirect to login if on client side and not already there
    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
    }
  }

  return response;
}
