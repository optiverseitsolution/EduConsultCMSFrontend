import api from "./client";

export const registerUser = async (data) => {
  try {
    const response = await api.post("/users", data);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data.data;
};

export const deleteUser = async (data) => {
  try {
    const response = await api.delete(`/users/${data.id}`);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (data) => {
  try {
    const payload = {
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
    };

    if (data.password) {
      payload.password = data.password;
    }

    const response = await api.put(`/users/${data.id}`, payload);

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const updateUserStatus = (userId, status) =>
  api.patch(`/users/${userId}/status`, { status });
