import React, { useState } from 'react';

function Scheduling() {
    const [examName, setExamName] = useState('');
    const [examDate, setExamDate] = useState('');
    const [examTime, setExamTime] = useState('');
    const [password, setPassword] = useState('');
    const [scheduledExams, setScheduledExams] = useState([]);
    const [isProfessor, setIsProfessor] = useState(false);

    const handleScheduleExam = () => {
        if (!examName || !examDate || !examTime) {
            alert('All fields are required.');
            return;
        }

        if (!isProfessor) {
            alert('Please enter the professor password to schedule exams.');
            return;
        }

        const examDateTime = '${examDate} ${examTime}';

        // Update the scheduledExams state with the new exam
        setScheduledExams([...scheduledExams, { name: examName, dateTime: examDateTime }]);

        // Clear the input fields
        setExamName('');
        setExamDate('');
        setExamTime('');
    };

    const handleProfessorPassword = () => {
        if (password === 'abc') {
            setIsProfessor(true);
        } else {
            alert('Incorrect professor password.');
        }
    };

    return (
        <div>
            <h1>Exam Scheduling</h1>

            {isProfessor ? (
                <>
                    <div>
                        <label htmlFor="examName">Exam Name:</label>
                        <input type="text" id="examName" value={examName} onChange={(e) => setExamName(e.target.value)} required />
                    </div>

                    <div>
                        <label htmlFor="examDate">Exam Date:</label>
                        <input type="date" id="examDate" value={examDate} onChange={(e) => setExamDate(e.target.value)} required />
                    </div>

                    <div>
                        <label htmlFor="examTime">Exam Time:</label>
                        <input type="time" id="examTime" value={examTime} onChange={(e) => setExamTime(e.target.value)} required />
                    </div>

                    <div>
                        <button type="button" onClick={handleScheduleExam}>Schedule Exam</button>
                    </div>

                    <div>
                        <h2>Scheduled Exams</h2>
                        <ul>
                            {scheduledExams.map((exam, index) => (
                                <li key={index}>{exam.name} - {exam.dateTime}</li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <div>
                    <p>You need to enter the professor password to schedule exams:</p>
                    <input type="password" placeholder="Professor Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={handleProfessorPassword}>Enter</button>
                </div>
            )}
        </div>
    );
}

export default Scheduling;