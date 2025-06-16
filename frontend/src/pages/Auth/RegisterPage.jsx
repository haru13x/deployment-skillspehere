import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import countries from "../../data/countries"; // your list of countries
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    country: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        firstname: form.firstName,
        lastname: form.lastName,
        mobile: form.mobile,
        country: form.country,
        username: form.username,
        email: form.email,
        password: form.password,
      });

      // const data = await response.json();
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("api_token", response.data.token);

      navigate("/setting-up/profile");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="w-full md:w-2/3 flex items-center justify-center p-8 "
        style={{ backgroundColor: "#003050" }}
      >
        <Paper elevation={3} className="w-full max-w-md p-6 h-auto min-h-[300px] rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Create Account
          </h2>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
              <TextField
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="medium"
                className="focus:ring-blue-500"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="medium"
                className="focus:ring-blue-500"
              />
              {/* <TextField
                label="Mobile"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="medium"
                className="focus:ring-blue-500"
              /> */}
              {/* <TextField
                label="Country"
                name="country"
                value={form.country}
                onChange={handleChange}
                select
                fullWidth
                variant="outlined"
                size="medium"
              >
                {countries.map((c) => (
                  <MenuItem key={c.name} value={c.name}>
                    {c.name} ({c.code})
                  </MenuItem>
                ))}
              </TextField> */}
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="medium"
                className="focus:ring-blue-500"
              />
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                fullWidth
                variant="outlined"
                size="medium"
                className="focus:ring-blue-500"
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="medium"
                className="focus:ring-blue-500"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="medium"
                className="focus:ring-blue-500"
                error={
                  form.confirmPassword && form.confirmPassword !== form.password
                }
                helperText={
                  form.confirmPassword &&
                  form.confirmPassword !== form.password &&
                  "Passwords do not match"
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center space-y-4">
            <Typography className="text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </Typography>

            <Button
              onClick={handleRegister}
              variant="contained"
              size="large"
              className="w-1/2 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg shadow-md"
            >
              Join
            </Button>
          </div>
        </Paper>
      </div>
      <div className="w-full md:w-1/3">
        <img
          src="/images/image.png"
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
