import api from "./client";

// POST: Add a new consultancy
export const registerConsultancy = async (data) => {
  try {
    // We use multipart/form-data because we are sending a picture (logo)
    const response = await api.post("/consultancies", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

// GET: Fetch all consultancies
export const getAllConsultancies = async () => {
  try {
    const response = await api.get("/consultancies");
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

// PUT: Update an existing consultancy
export const updateConsultancy = async (id, data) => {
  try {
    // We use POST here because multipart/form-data doesn't work with PUT in many backends
    // We add _method: "PUT" to the FormData in the component (see Step 2)
    const response = await api.post(`/consultancies/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

// 
// export const updateConsultancyStatus = async (id, status) => {
//   try {
//     const response = await api.patch(`/consultancies/${id}/status`, { status });
//     return response.data.data;
//   } catch (err) {
//     throw err;
//   }
// };

// DELETE: Remove a consultancy
export const deleteConsultancy = async (id) => {
  try {
    await api.delete(`/consultancies/${id}`);
  } catch (err) {
    throw err;
  }
};
