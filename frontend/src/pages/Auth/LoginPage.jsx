import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });

      if (response.data.token) {
        // const storage = rememberMe ? localStorage : sessionStorage;

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("api_token", response.data.user.api_token);

        if (rememberMe) {
          localStorage.setItem("rememberEmail", email);
          localStorage.setItem("rememberPassword", password);
        } else {
          localStorage.removeItem("rememberEmail");
          localStorage.removeItem("rememberPassword");
        }

        navigate("/dashboard");
      } else {
        alert("Login failed, please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login", error);
      alert("An error occurred during login.");
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    const savedPassword = localStorage.getItem("rememberPassword");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="flex h-screen">
      <div
        className="w-full md:w-2/3 flex items-center justify-center p-8 "
        style={{ backgroundColor: "#003050" }}
      >
        <Paper elevation={3} className="w-full max-w-md p-8">
          <Typography variant="h4" className="mb-10 font-bold text-center">
            Login
          </Typography>

          <form className="space-y-6 mt-10" onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className="flex justify-between items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember Me"
              />
              <label className="text-lg text-blue-500 hover:underline cursor-pointer">
                Forgot Password?
              </label>
            </div>

            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>

            <Typography variant="body2" className="text-center mt-2">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Register
              </a>
            </Typography>
          </form>
        </Paper>
      </div>

      {/* Right Side: Image */}
      <div className="w-full md:w-1/3">
        <img
          src="/images/image.png"
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
