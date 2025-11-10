'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface QuizContextType {
    gender: string | null;
    setGender : (gender: string) => void;
    answers: Record<number, string>;
    setAnswer: (questionId: number, answer: string) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({children} : {children :ReactNode}) => {
    const [gender, setGender] = useState<string | null>(null);

    const [answers, setAnswers] = useState<Record <number, string>>({});

    const setAnswer = (questionId: number, answer:string) =>{
        setAnswers((prev) => ({...prev, [questionId]: answer}));
    }
    
    return (
        <QuizContext.Provider value={{gender, setGender, answers, setAnswer}}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};