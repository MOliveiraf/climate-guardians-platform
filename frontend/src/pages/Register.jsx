import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        age: Number(form.age),
        user: {
          create: {
            name: form.name,
            email: form.email,
            password: form.password,
          },
        },
      }),
    });

    navigate("/login");
  };

  return (
    <div className="login-wrapper">
      <div className="card login-container">
        <h1>Cadastro</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nome"
            onChange={handleChange}
            required
          />
          <input
            name="age"
            type="number"
            placeholder="Idade"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Senha"
            onChange={handleChange}
            required
          />

          <button className="btn-primary" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
