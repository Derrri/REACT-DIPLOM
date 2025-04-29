import React, { useState, useContext } from "react";
import { DataContext } from "./../DataContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useContext(DataContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isAuthenticated = await loginAdmin(login, password);
    setLoading(false);

    if (isAuthenticated) {
      navigate("/admin/control-center");
    } else {
      setError("Неверные учётные данные");
    }
  };

  return (
    <main className="login__main">
      <div className="login__main_header">
        <h2 className="login__main_header-text">Авторизация</h2>
      </div>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__label">
          <span className="label__text">E-mail</span>
          <input
            type="email"
            name="login"
            className="login__input login__email"
            placeholder="example@domain.xyz"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </label>
        <label className="login__label">
          <span className="label__text">Пароль</span>
          <input
            type="password"
            name="password"
            className="login__input login__password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <div className="error-message">{error}</div>}
        <button
          className="login__button button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Вход..." : "Авторизоваться"}
        </button>
      </form>
    </main>
  );
};

export default Login;
