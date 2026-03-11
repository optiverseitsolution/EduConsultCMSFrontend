import api from "./client";

// Get all students
export const getStudents = () => api.get("/students");

// Create new student (using FormData for file upload)
export const createStudent = (data) => {
  const formData = new FormData();

  // Append all fields to FormData
  if (data.student) formData.append("student", data.student);
  if (data.email) formData.append("email", data.email);
  if (data.profile_image) formData.append("profile_image", data.profile_image);
  if (data.course) formData.append("course", data.course);
  if (data.applied_university)
    formData.append("applied_university", data.applied_university);
  if (data.status !== undefined) formData.append("status", data.status);
  if (data.application) formData.append("application", data.application);
  if (data.counselor) formData.append("counselor", data.counselor);

  return api.post("/students", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update student (using FormData for file upload)
export const updateStudent = (studentId, data) => {
  const formData = new FormData();

  if (data.student) formData.append("student", data.student);
  if (data.email) formData.append("email", data.email);

  // Only append image if new file selected
  if (data.profile_image instanceof File) {
    formData.append("profile_image", data.profile_image);
  }

  if (data.course) formData.append("course", data.course);
  if (data.applied_university)
    formData.append("applied_university", data.applied_university);

  formData.append("status", data.status);
  formData.append("application", data.application);
  formData.append("counselor", data.counselor);

  // 🔥 IMPORTANT PART
  formData.append("_method", "PUT");

  return api.post(`/students/${studentId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update student status only
export const updateStudentStatus = (studentId, status) =>
  api.patch(`/students/${studentId}/status`, { status });

// Delete student
export const deleteStudent = (studentId) =>
  api.delete(`/students/${studentId}`);
