import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDTkuJ2Rt8OSira0NCJNrbNn2Q7qU6Xyv8");

const CareerPathGenerator = () => {
    const [profile, setProfile] = useState({
        name: "",
        age: "",
        education: "",
        interests: "",
        dreamJob: "",
    });

    const [careerPath, setCareerPath] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };
    const generatePath = async () => {
        setLoading(true);
        const prompt = `
    You are an AI career advisor. Generate a 3-step career path for the following student:
    - Age: ${profile.age}
    - Education Level: ${profile.education}
    - Interests: ${profile.interests}
    - Dream Career: ${profile.dreamJob}
    
    Each step should include:
    1. What to learn
    2. Skills to acquire
    3. Free online resources (1-2 links max)
    
    Use simple language.`;

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            setCareerPath(response.text());
        } catch (err) {
            setCareerPath("Error generating career path. Try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">AI Career Path Generator</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" name="name" placeholder="Your Name" value={profile.name} onChange={handleChange} className="p-3 border rounded" />
                <input type="number" name="age" placeholder="Your Age" value={profile.age} onChange={handleChange} className="p-3 border rounded" />
                <input type="text" name="education" placeholder="Education Level (e.g., 12th, UG)" value={profile.education} onChange={handleChange} className="p-3 border rounded" />
                <input type="text" name="interests" placeholder="Interests (e.g., design, tech)" value={profile.interests} onChange={handleChange} className="p-3 border rounded" />
                <input type="text" name="dreamJob" placeholder="Dream Career (e.g., UX Designer)" value={profile.dreamJob} onChange={handleChange} className="p-3 border rounded col-span-1 md:col-span-2" />
            </div>

            <button
                onClick={generatePath}
                disabled={loading}
                className={`w-full py-3 text-white font-semibold rounded ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {loading ? "Generating..." : "Generate Career Path"}
            </button>

            {careerPath && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
                    <h2 className="text-xl font-semibold mb-2">Your Personalized Career Path:</h2>
                    <p>{careerPath}</p>
                </div>
            )}
        </div>
    );
}
export default CareerPathGenerator;