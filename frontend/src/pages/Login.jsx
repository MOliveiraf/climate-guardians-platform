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
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.user.token);

      // Ativa animação
      setIsAnimating(true);

      // Aguarda 3 segundos antes de navegar
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);

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
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit">Entrar</button>
          </form>
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