// Mirrors com.fintrack.dto.LoginRequest
export interface LoginRequest {
  username: string;
  password: string;
}

// Mirrors com.fintrack.dto.RegisterRequest
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

// Mirrors com.fintrack.dto.AuthResponse
export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  fullName: string;
}
