import React, {useEffect, useState} from 'react';
import CourseForm from './CourseForm.jsx';
import './GPACalculator.css';
import CourseLists from "./CourseLists.jsx";

const gradePoints = {
    /* Pass */
    'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00, 'B-': 2.67, 'C+': 2.33, 'C': 2.00,
    /* Pass with condition */
    'C-': 1.67, 'D+': 1.33, 'D': 1.00, 'D-': 0.67,
    /* Fail | Absent */
    'F': 0.00,
};

const GPACalculator = () => {

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = "Are you sure you want to leave? Your data will be lost.";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const [courses, setCourses] = useState([]);

    const handleAddCourse = (newCourses) => {
        setCourses([...courses, newCourses]);
    }

    const handleRemoveCourse = (index) => {
        const updatedCourses = courses.filter((course, i) => i !== index);
        setCourses(updatedCourses);
    }

    const calculateGPA = () => {
        let totalGradePoints = 0;
        let totalCreditHours = 0;

        courses.forEach((course) => {
            totalGradePoints += gradePoints[course.grade] * course.creditHours;
            totalCreditHours += course.creditHours;
        })
        return totalCreditHours === 0 ? 0 : totalGradePoints / totalCreditHours;
    }

    return (
        <div className='container'>
            <h1 style={{paddingBottom: '24px'}}>GPA Calculator</h1>
            <div className="sections-wrapper">
                {/* Section 1: Course Form */}
                <div className="section course-form-section">
                    <h2 style={{textAlign:'center', marginTop:'4px'}}>Add Course</h2>
                    <CourseForm onAddCourse={handleAddCourse}/>
                </div>

                {/* Section 2: Course Lists */}
                <div className="section course-list-section">
                    <CourseLists
                        courses={courses}
                        onDeleteCourse={(index) => handleRemoveCourse(index)}
                        calculateGPA={calculateGPA}
                    />
                </div>
            </div>
        </div>
    );
};

export default GPACalculator;
