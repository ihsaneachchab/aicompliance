const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface RegisterPayload {
  email: string;
  fullName: string;
  password: string;
  company?: string;
  selectedService?: string;
  phone?: string;
  referral?: string;
  terms?: boolean;
  newsletter?: boolean;
}

export const Auth = {
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        } as Record<string, string>),
      });

      if (!response.ok) return false;

      const data = await response.json() as { access_token: string };
      localStorage.setItem("access_token", data.access_token);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  async register(payload: RegisterPayload): Promise<void> {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Erreur lors de l'inscription");
    }
  },
};
