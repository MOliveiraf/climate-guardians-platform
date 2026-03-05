import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email,
          password,
        }
      );       

      localStorage.setItem("token", response.data.user.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Ativa animação
      setIsAnimating(true);

      // Aguarda 6 segundos antes de navegar
      setTimeout(() => {
        navigate("/dashboard");
      }, 6000);
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  }

  return (
    
    <div className="login-container">
     
      {!isAnimating ? (
        <div>
          <h1>Climate Guardians 🌍</h1>

          <form onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Entrar</button>
          </form>

          <hr />

          <p>Ainda não tem conta?</p>

          <button
            type="button"
            onClick={() => navigate("/register")}
          >
            Cadastrar
          </button>
        </div>
      ) : (
        <div className="login-animation">
          <img
            src="http://localhost:3000/images/planet-login.png"
            alt="Planet"
            className="planet-animation"
          />
          <h2>🌱 Missão iniciada...</h2>
          <p>Bem-vindo, Guardião do Clima!</p>
        </div>
      )}
    </div>
  );
}