import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const LeetDaily = () => {
    const [question, setQuestion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [userProgress, setUserProgress] = useState([]);
    const [isProgressLoading, setIsProgressLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://alfa-leetcode-api.onrender.com/dailyQuestion')
            .then(res => res.json())
            .then(data => {
                setQuestion(data.data.activeDailyCodingChallengeQuestion);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching question:', error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        const loadUserProgress = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:3000/user-progress/${user.email}`);
                    setUserProgress(response.data.questions);

                    if (question) {
                        const isCompleted = response.data.questions.some(
                            q => q.qid === question.question.questionFrontendId
                        );
                        setCompleted(isCompleted);
                    }
                } catch (error) {
                    console.error('Error loading progress:', error);
                }
            }
            setIsProgressLoading(false);
        };

        loadUserProgress();
    }, [question]);

    const handleComplete = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Please login to mark questions as complete');
            navigate('/login');
            return;
        }

        try {
            await axios.post('http://localhost:3000/complete-question', {
                email: user.email,
                question: {
                    date: question.date,
                    qid: question.question.questionFrontendId,
                    title: question.question.title
                }
            });
            setCompleted(!completed);
        } catch (error) {
            console.error('Error marking question complete:', error);
            alert('Failed to mark question as complete');
        }
    };

    const getHeatmapData = () => {
        return userProgress.map(q => ({
            date: q.date,
            count: 1
        }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4 py-8 max-w-4xl"
        >
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-2xl font-bold text-white">Daily LeetCode Challenge</h1>
                    <button
                        onClick={handleComplete}
                        className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${completed ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
                            } transition-colors`}
                    >
                        <FaCheckCircle />
                        <span>{completed ? 'Completed' : 'Mark Complete'}</span>
                    </button>
                </div>

                {question && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl text-blue-400">
                                #{question.question.questionFrontendId} - {question.question.title}
                            </h2>
                            <a
                                href={`https://leetcode.com${question.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-blue-500 hover:text-blue-400"
                            >
                                <span>Solve Challenge</span>
                                <FaExternalLinkAlt />
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {question.question.topicTags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>

                        <div className="text-gray-400">
                            Question ID: {question.question.questionId}
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mt-6">
                <h2 className="text-xl font-bold text-white mb-4">Your Progress</h2>
                {isProgressLoading ? (
                    <div className="flex justify-center">
                        <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <CalendarHeatmap
                            startDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
                            endDate={new Date()}
                            values={getHeatmapData()}
                            classForValue={(value) => {
                                if (!value) return 'color-empty';
                                return `color-github-${value.count}`;
                            }}
                            titleForValue={(value) => {
                                if (!value) return 'No submissions';
                                return `${value.count} submission(s) on ${value.date}`;
                            }}
                        />
                        <style>{`
                            .react-calendar-heatmap text {
                                fill: #aaa;
                                font-size: 10px;
                            }
                            .react-calendar-heatmap .color-empty {
                                fill: #1f2937;
                            }
                            .react-calendar-heatmap .color-github-1 {
                                fill: #0e4429;
                            }
                            .react-calendar-heatmap rect {
                                rx: 2;
                            }
                        `}</style>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default LeetDaily;
