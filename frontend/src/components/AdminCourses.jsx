import React, { useState, useEffect } from "react";
import "./AdminCourses.css";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    level: "",
    rating: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/courses/")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://127.0.0.1:8000/api/courses/${editingId}/`
      : "http://127.0.0.1:8000/api/courses/";
    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editingId) {
          setCourses(courses.map((c) => (c.id === editingId ? data : c)));
        } else {
          setCourses([...courses, data]);
        }
        setFormData({
          title: "",
          description: "",
          duration: "",
          level: "",
          rating: "",
        });
        setEditingId(null);
      })
      .catch((err) => console.error("Error saving course:", err));
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      level: course.level,
      rating: course.rating,
    });
    setEditingId(course.id);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    fetch(`http://127.0.0.1:8000/api/courses/${id}/`, { method: "DELETE" })
      .then(() => setCourses(courses.filter((c) => c.id !== id)))
      .catch((err) => console.error("Error deleting course:", err));
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🎓 Course Management</h1>
        <p>Add, edit, or manage your courses from one place.</p>
      </div>

      <div className="admin-main">
        {/* Left Form */}
        <div className="admin-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g., 3 Months)"
              value={formData.duration}
              onChange={handleChange}
            />
            <input
              type="text"
              name="level"
              placeholder="Level (Beginner, Intermediate, Advanced)"
              value={formData.level}
              onChange={handleChange}
            />
            <input
              type="text"
              name="rating"
              placeholder="Rating (e.g., 4.8)"
              value={formData.rating}
              onChange={handleChange}
            />
            <button type="submit" className="submit-btn">
              {editingId ? "💾 Update Course" : "➕ Add Course"}
            </button>
          </form>
        </div>

        {/* Right Course List */}
        <div className="admin-courses">
          <h2>📚 All Courses</h2>
          <div className="course-grid">
            {courses.map((course) => (
              <div className="course-card" key={course.id}>
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p className="level">({course.level || "Beginner"})</p>
                  <p className="desc">{course.description}</p>
                  <p className="meta">
                    Duration: {course.duration} | ⭐ {course.rating}
                  </p>
                </div>

                <div className="course-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(course)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(course.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
