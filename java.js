
import React from 'react';
import './CourseManagement.css';

const CourseItem = ({ course, onEdit, onDelete }) => {
  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p className="course-description">
        {course.description.substring(0, 150)}{course.description.length > 150 ? '...' : ''}
      </p>
      
      <div className="course-actions">
        {/* The onEdit function will switch the view and pass the course data */}
        <button className="btn btn-primary" onClick={() => onEdit(course)}>
          Edit
        </button>
        {/* The onDelete function handles the deletion (mocked with confirmation) */}
        <button className="btn btn-danger" onClick={() => onDelete(course.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CourseItem;

// src/components/CourseManagement/CourseList.js
import React from 'react';
import CourseItem from './CourseItem';
import './CourseManagement.css';

const CourseList = ({ courses, onEdit, onDelete, onAdd }) => {
  return (
    <div className="course-list-page">
      <div className="list-header">
        <h1>Course Management</h1>
        {/* Button to switch to the "Add" view */}
        <button className="btn btn-primary" onClick={onAdd}>
          + Add New Course
        </button>
      </div>

      <div className="course-cards-container">
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseItem
              key={course.id}
              course={course}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p>No courses found. Click "Add New Course" to begin.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;

// src/components/CourseManagement/CourseForm.js
import React, { useState } from 'react';
import './CourseManagement.css';

const CourseForm = ({ course, onSubmit, onCancel }) => {
  
  const [formData, setFormData] = useState({
    id: course ? course.id : null, 
    title: course ? course.title : '',
    instructor: course ? course.instructor : '',
    description: course ? course.description : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmit(formData);
  };

  const isEditing = !!course;

  return (
    <div className="course-form-card">
      <h2>{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="title">Course Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="instructor">Instructor</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Course' : 'Create Course'}
          </button>
          <button type="button" className="btn" onClick={onCancel} style={{backgroundColor: '#ccc', color: '#333'}}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;

// src/components/CourseManagement/CourseManagementPage.js
import React, { useState } from 'react';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import './CourseManagement.css'; 


const MOCK_COURSES = [
  { id: 1, title: "Intro to React Hooks", instructor: "Alice", description: "Learn the basics of useState, useEffect, and custom hooks for managing component state and lifecycle. This course is crucial for modern frontend development.", videoCount: 5 },
  { id: 2, title: "Database Design with SQL", instructor: "Bob", description: "A deep dive into PostgreSQL schema design, normalization, and advanced SQL querying for scalable LMS data storage.", videoCount: 8 },
  { id: 3, title: "Django REST Framework API", instructor: "Charlie", description: "Building a robust and secure backend API for the LMS. Focuses on CRUD operations for courses and user authentication.", videoCount: 6 },
];

const CourseManagementPage = () => {
  
  const [courses, setCourses] = useState(MOCK_COURSES);
 
  const [view, setView] = useState('list'); 
  const [courseToEdit, setCourseToEdit] = useState(null); 

  // HANDLER: Adds a new course
  const handleAddCourse = (newCourseData) => {
    
    const newCourse = { id: Date.now(), ...newCourseData };
    setCourses(prevCourses => [...prevCourses, newCourse]);
    setView('list');
    alert(`Course added: ${newCourse.title}`);
  };

 
  const handleEditCourse = (updatedCourseData) => {
    
    setCourses(prevCourses => prevCourses.map(c =>
      c.id === updatedCourseData.id ? updatedCourseData : c
    ));
    setView('list'); 
    setCourseToEdit(null);
    alert(`Course updated: ${updatedCourseData.title}`);
  };

  // HANDLER: Deletes a course
  const handleDeleteCourse = (id) => {
    // NOTE: In a real app, you would make an API DELETE request here.
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      setCourses(prevCourses => prevCourses.filter(c => c.id !== id));
      alert('Course successfully deleted.');
    }
  };

 
  const renderContent = () => {
    if (view === 'add') {
      return (
        <CourseForm
          onSubmit={handleAddCourse}
          onCancel={() => setView('list')} 
        />
      );
    }

    if (view === 'edit' && courseToEdit) {
      return (
        <CourseForm
          course={courseToEdit} 
          onSubmit={handleEditCourse}
          onCancel={() => setView('list')} 
        />
      );
    }
    return (
      <CourseList
        courses={courses}
        onAdd={() => setView('add')} 
        onEdit={(course) => {
          setCourseToEdit(course);
          setView('edit'); 
        }}
        onDelete={handleDeleteCourse}
      />
    );
  };

  return (
    <div className="container">
      {renderContent()}
    </div>
  );
};

export default CourseManagementPage;

// src/App.js
import React from 'react';

import CourseManagementPage from './components/CourseManagement/CourseManagementPage';
import './App.css'; 

function App() {
  return (

    <CourseManagementPage />
  );
}

export default App;
