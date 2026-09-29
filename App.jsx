import React, { useState } from "react";
import "./App.css";

const emptyFeedback = { q1: "", q2: "", q3: "", q4: "", q5: "" };

function App() {
        const [feedback, setFeedback] = useState(emptyFeedback);
        const [status, setStatus] = useState("");
        const [submitting, setSubmitting] = useState(false);

        const handleChange = (event) => {
                setFeedback((current) => ({
                        ...current,
                        [event.target.name]: event.target.value,
                }));
        };

        const handleSubmit = async (event) => {
                event.preventDefault();
                setSubmitting(true);
                setStatus("");

                try {
                        const response = await fetch("http://localhost:5000/api/feedback", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(feedback),
                        });

                        if (!response.ok) throw new Error("Request failed");
                        setFeedback(emptyFeedback);
                        setStatus("Feedback submitted successfully.");
                } catch (error) {
                        console.error("Error submitting feedback:", error);
                        setStatus("Could not submit feedback. Please try again.");
                } finally {
                        setSubmitting(false);
                }
        };

        return (
                <main className="container">
                        <p className="eyebrow">FEEDBACK</p>
                        <h1>Feedback Form</h1>
                        <form onSubmit={handleSubmit} className="feedback-form">
                                <label htmlFor="q1">Name</label>
                                <input id="q1" name="q1" value={feedback.q1} onChange={handleChange} required />

                                <label htmlFor="q2">Department</label>
                                <input id="q2" name="q2" value={feedback.q2} onChange={handleChange} required />

                                <label htmlFor="q3">Session Title</label>
                                <input id="q3" name="q3" value={feedback.q3} onChange={handleChange} required />

                                <label htmlFor="q4">Feedback</label>
                                <textarea id="q4" name="q4" value={feedback.q4} onChange={handleChange} required rows="4" />

                                <label htmlFor="q5">Suggestions</label>
                                <textarea id="q5" name="q5" value={feedback.q5} onChange={handleChange} rows="3" />

                                <button type="submit" disabled={submitting}>
                                        {submitting ? "Submitting..." : "Submit feedback"}
                                </button>
                                <p className="form-status" role="status" aria-live="polite">{status}</p>
                        </form>
                </main>
        );
}

export default App;
