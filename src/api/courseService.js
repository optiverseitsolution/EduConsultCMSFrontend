import api from "./client";

export const registerCourse = async (data) => {
  try {
    const response = await api.post("/courses", data);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const getAllCourse = async () => {
  const response = await api.get("/courses");
  return response.data.data;
};

export const updateCourse = async (data) => {
  try {
    const response = await api.put(`/courses/${data.id}`, data);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const deleteCourse = async (data) => {
  try {
    const response = await api.delete(`/courses/${data.id}`);
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const updateCourseStatus = (courseId, status) =>
  api.patch(`/courses/${courseId}/status`, { status });
