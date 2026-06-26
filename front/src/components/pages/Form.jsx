import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    domain: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Enter a valid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.domain) newErrors.domain = "Please select a domain";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    // Show "creating your account..." toast
    const loadingToastId = toast.loading("Creating your account...");

    try {
      const res = await fetch(
        "https://resume-to-portfolio-yrlv.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ " + data.message, { id: loadingToastId });
        if (data.token) {
          console.log("Token received:", data.token);
          // Assuming localStorage is available in the browser environment
          // localStorage.setItem("token", data.token);
        }
        setFormData({ name: "", email: "", password: "", domain: "" });
        navigate("/uploads"); // Navigate to the uploads page
      } else {
        toast.error("❌ " + data.message, { id: loadingToastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Server Error", { id: loadingToastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e3a8a, #9333ea)",
        padding: 2,
      }}
    >
      <Toaster position="bottom-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: "480px" }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            color="white"
          >
            🚀 Create Your Account
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            color="rgba(255,255,255,0.8)"
            mb={3}
          >
            Join the community of developers today
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "#e0e0e0" } }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />

            <TextField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "#e0e0e0" } }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "#e0e0e0" } }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />

            <FormControl
              fullWidth
              margin="normal"
              required
              error={!!errors.domain}
            >
              <InputLabel id="domain-label" style={{ color: "#e0e0e0" }}>
                Domain
              </InputLabel>
              <Select
                labelId="domain-label"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                sx={{
                  borderRadius: "12px",
                  color: "white",
                  ".MuiSvgIcon-root": { color: "white" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "black",
                      "& .MuiMenuItem-root": {
                        color: "white",
                        "&:hover": { bgcolor: "#333" },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="frontend">Frontend</MenuItem>
                <MenuItem value="backend">Backend</MenuItem>
                <MenuItem value="fullstack">Fullstack</MenuItem>
                <MenuItem value="devops">DevOps</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
                {errors.domain}
              </Typography>
            </FormControl>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontSize: "1rem",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #06b6d4, #3b82f6, #9333ea)",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 5s ease infinite",
                  "&:hover": {
                    boxShadow: "0 0 20px rgba(147, 51, 234, 0.6)",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
              </Button>
            </motion.div>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
}
