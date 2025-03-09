import React, {useState} from "react";
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

const CourseLists = ({ courses, onDeleteCourse, calculateGPA }) => {
    const [open, setOpen] = useState(false); // Dialog state
    const handleCloseDialog = () => setOpen(false);
    const [loading, setLoading] = useState(false); // Loading state

    const handleOpenDialog = () => {
        setLoading(true); // Start loading
        setTimeout(() => {
            setLoading(false); // Stop loading after 2 seconds
            setOpen(true);
        }, 1000);
    };

    return (
        <div className="section2">
            <div>
                <h2 style={{textAlign:'center', marginTop:'4px'}}>Course List</h2>
                <ul style={{ borderBottom: '1px solid #ced4da', paddingBottom: '10px' }}>
                    <li>Course</li>
                    <li>Credits</li>
                    <li>Grade</li>
                    <li>Action</li>
                </ul>
                {courses.map((course, index) => (
                    <ul key={index}>
                        <li>{course.courseName}</li>
                        <li>{course.creditHours}</li>
                        <li>{course.grade}</li>
                        <li><button onClick={() => onDeleteCourse(index)}>Delete</button></li>
                    </ul>
                ))}
            </div>

            {/* 📌 GPA Check Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenDialog}
                disabled={courses.length === 0} // Disable if no courses
                style={{ marginTop: "20px", width: "100%" }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Check GPA"}
            </Button>

            {/* 📌 GPA Dialog */}
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogContent>
                    <h3>GPA: {calculateGPA().toFixed(2)}</h3>
                    {calculateGPA() > 3.5 ? (
                        <p style={{ color: "green", fontWeight: "bold"}}>
                            🎉 Congratulations! Keep up the great work! 🚀
                        </p>
                    ) : (
                        <p style={{ color: "red", fontWeight: "bold" }}>
                            📚 Keep pushing! You can improve your GPA! 💪
                        </p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}
                            color="primary"
                            variant="contained"
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CourseLists;
