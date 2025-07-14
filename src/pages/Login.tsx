import { LoginForm } from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (loginId: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - accept any non-empty credentials
    if (loginId.trim() && password.trim()) {
      // Store user data in localStorage for demo
      localStorage.setItem("user", JSON.stringify({
        name: "John Doe", 
        loginId: loginId,
        isAuthenticated: true
      }));
      navigate("/dashboard");
      return true;
    }
    return false;
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;