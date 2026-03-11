import api from "./client";

// GET all counselors
export const getCounselors = async () => {
  const response = await api.get("/counselors");
  return response.data.data;
};

// CREATE counselor
export const createCounselor = async (data) => {
  const response = await api.post("/counselors", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

// UPDATE counselor — use POST + _method:PUT (multipart/form-data doesn't work with PUT)
export const updateCounselor = async ({ id, data }) => {
  const response = await api.post(`/counselors/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

// DELETE counselor
export const deleteCounselor = async (id) => {
  const response = await api.delete(`/counselors/${id}`);
  return response.data;
};

// UPDATE status only
export const updateCounselorStatus = async ({ id, status }) => {
  const response = await api.patch(`/counselors/${id}/status`, { status });
  return response.data.data;
};