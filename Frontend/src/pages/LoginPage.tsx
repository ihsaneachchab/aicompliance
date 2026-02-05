import AuthBranding from "../components/AuthBranding";
import LoginForm from "../components/LoginForm";

export function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <AuthBranding />
      <LoginForm />
    </div>
  );
}
