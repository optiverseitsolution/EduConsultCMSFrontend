import api from "./client";

export const registerUser = (data) =>
  api.post("/register", data);

export const loginUser = (data) =>
  api.post("/login", data);

export const getProfile = () =>
  api.get("/profile");

export const updateProfile = (data) =>
  api.put("/profile", data);