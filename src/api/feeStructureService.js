import api from "./client";

export const registerFee = async (data) => {
  try {
    const response = await api.post("/fee-structures", data);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const getAllFeeStructures = async () => {
  try {
    const response = await api.get("/fee-structures/");
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const updateFeeStructure = async (data) => {
  try {
    const response = await api.put(`/fee-structures/${data.id}`, data);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const deletFeeStructure = async (data) => {
  try {
    await api.delete(`/fee-structures/${data.id}`);
  } catch (err) {
    throw err;
  }
};
