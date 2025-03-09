import React, { useState } from 'react';
import {Alert, Snackbar} from "@mui/material";

const CourseForm = ({onAddCourse}) => {
    const [courseName, setCourseName] = useState('');
    const [creditHours, setCreditHours] = useState(0);
    const [grade, setGrade] = useState('A');
    const [showAlert, setShowAlert] = useState(false);

    const handleAddCourse = () => {
        if (courseName && creditHours > 0 && grade) {
            const newCourse = {
                courseName,
                creditHours,
                grade,
            };
            onAddCourse(newCourse);
            setCourseName('');
            setCreditHours(0);
            setGrade('A');
        }else{
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // Auto-hide alert after 3 seconds
        }
    };

    return (
        <>
        <div className="alert">
            {/* MUI Snackbar Alert */}
            <Snackbar
                open={showAlert}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="error" variant="filled">
                    Please enter a valid course details.
                </Alert>
            </Snackbar>
        </div>

        <div className="section1">
            <div>
                <p>Course</p>
                <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                />
            </div>
            <div>
                <p>Credits</p>
                <select value={creditHours} onChange={(e) => setCreditHours(Number(e.target.value))}>
                    <option value="" disabled>Credits</option>
                    {[...Array(10).keys()].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>
            <div>
                <p>Grade</p>
                <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="D-">D-</option>
                    <option value="F">F</option>
                </select>
            </div>
            <div>
                <p style={{ opacity: 0 }}>-</p>
                <button onClick={handleAddCourse}>Add</button>
            </div>
        </div>
        </>
    );
};

export default CourseForm;
