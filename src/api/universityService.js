import api from "./client";

export const registerUniversity = async (data) => {
  const formData = new FormData();

  formData.append("logo", data.logo);
  formData.append("university_name", data.name);
  formData.append("country", data.country);
  formData.append("city", data.city);
  formData.append("partner_type", data.partnerType);
  formData.append("programs", data.programs);
  formData.append("application_fee", `$${data.applicationFee}`);

  formData.append("status", data.status === "Active" ? "1" : "0");

  const response = await api.post("/universities", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};

export const getAllUniversity = async () => {
  const response = await api.get("/universities");
  return response.data.data;
};

export const updateUniversity = async (data) => {
  const formData = new FormData();

  if (data.logo instanceof File) {
    formData.append("logo", data.logo);
  }

  formData.append("university_name", data.name);
  formData.append("country", data.country);
  formData.append("city", data.city);
  formData.append("partner_type", data.partnerType);
  formData.append("programs", data.programs);
  formData.append("application_fee", `$${data.applicationFee}`);
  formData.append("status", data.status === "Active" ? "1" : "0");

  formData.append("_method", "PUT");

  const response = await api.post(`/universities/${data.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const deleteUniversity = async (data) => {
  try {
    const response = await api.delete(`universities/${data.id}`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to delete university:", error);
    throw error;
  }
};
