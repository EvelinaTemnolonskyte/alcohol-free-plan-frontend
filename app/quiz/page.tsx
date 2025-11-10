'use client';

import QuizQuestion from "../components/QuizQuestion";
import ProgressBar from "../components/ProgressBar";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Header from "../components/Header";

const questions = [
  {
    question: "What is your main reason for wanting to quit drinking?",
    options: [
      { label: "Health", icon: "/icons/not_selected/health.svg", selectedIcon: "/icons/selected/health.svg" },
      { label: "Relationships", icon: "/icons/not_selected/relationships.svg", selectedIcon: "/icons/selected/relationships.svg" },
      { label: "Control", icon: "/icons/not_selected/control.svg", selectedIcon: "/icons/selected/control.svg" },
      { label: "Money", icon: "/icons/not_selected/money.svg", selectedIcon: "/icons/selected/money.svg" },
      { label: "Performance", icon: "/icons/not_selected/performance.svg", selectedIcon: "/icons/selected/performance.svg" },
      { label: "Role model", icon: "/icons/not_selected/role_model.svg", selectedIcon: "/icons/selected/role_model.svg" },
    ],
  },
  {
    question: "What do you think is the main reason you drink?",
    options: [
      { label: "Stress or anxiety", icon: "/icons/not_selected/stress.svg", selectedIcon: "/icons/selected/stress.svg" },
      { label: "Socializing", icon: "/icons/not_selected/socializing.svg", selectedIcon: "/icons/selected/socializing.svg" },
      { label: "Relaxation", icon: "/icons/not_selected/relaxation.svg", selectedIcon: "/icons/selected/relaxation.svg" },
      { label: "Emotional escape", icon: "/icons/not_selected/emotional_escape.svg", selectedIcon: "/icons/selected/emotional_escape.svg" },
      { label: "Habit", icon: "/icons/not_selected/habit.svg", selectedIcon: "/icons/selected/habit.svg" },
      { label: "Confidence boost", icon: "/icons/not_selected/confidence_boost.svg", selectedIcon: "/icons/selected/confidence_boost.svg" },
    ],
  },
{
    question: "Do you ever drink to feel \"normal\" or fit in with others?",
    options: [
      { label: "Yes", icon: "/icons/not_selected/yes.svg", selectedIcon: "/icons/selected/yes.svg", type: "positive"},
      { label: "I am not sure", icon: "/icons/not_selected/not_sure.svg", selectedIcon: "/icons/selected/not_sure.svg", type: "neutral" },
      { label: "No", icon: "/icons/not_selected/no.svg", selectedIcon: "/icons/selected/no.svg", type: "negative" },
    ],
  },
  {
    question: "Do you sometimes feel like you're missing out if you don't participate in group activities or social events?",
    options: [
      { label: "Yes", icon: "/icons/not_selected/yes.svg", selectedIcon: "/icons/selected/yes.svg", type: "positive"},
      { label: "I am not sure", icon: "/icons/not_selected/not_sure.svg", selectedIcon: "/icons/selected/not_sure.svg", type: "neutral" },
      { label: "No", icon: "/icons/not_selected/no.svg", selectedIcon: "/icons/selected/no.svg", type: "negative" },
    ],
  },
  {
    question: "Do you often find yourself wanting to escape from your daily responsibilities or pressures?",
    options: [
      { label: "Yes", icon: "/icons/not_selected/yes.svg", selectedIcon: "/icons/selected/yes.svg", type: "positive"},
      { label: "I am not sure", icon: "/icons/not_selected/not_sure.svg", selectedIcon: "/icons/selected/not_sure.svg", type: "neutral" },
      { label: "No", icon: "/icons/not_selected/no.svg", selectedIcon: "/icons/selected/no.svg", type: "negative" },
    ],
  },
  {
    question: "Do you often seek ways to relax or unwind after a long, stressful day?",
    options: [
      { label: "Yes", icon: "/icons/not_selected/yes.svg", selectedIcon: "/icons/selected/yes.svg", type: "positive"},
      { label: "I am not sure", icon: "/icons/not_selected/not_sure.svg", selectedIcon: "/icons/selected/not_sure.svg", type: "neutral" },
      { label: "No", icon: "/icons/not_selected/no.svg", selectedIcon: "/icons/selected/no.svg", type: "negative" },
    ],
  },

];


export default function Quiz(){
    const router = useRouter();
    const [currentQuestion, setCurrentStep] = useState(0);

    const nextStep = () => {
        if(currentQuestion < questions.length - 1){
            setCurrentStep(currentQuestion + 1);
        }else{
            router.push('/checkout');
        }
    }

    const handleBack = () => {
        if(currentQuestion > 0){
            setCurrentStep(currentQuestion - 1);
        } else {
            router.push('/');
        }
    }
    return(
      
        <div className = "flex flex-col flex-1 items-center min-h-screen px-4 py-2">
            <Header 
                logoSrc="/logo.svg" 
                showBackButton={true} 
                currentStep={currentQuestion + 1} 
                totalSteps={questions.length} 
                onBack={handleBack}
            />
            <main className="flex flex-col w-full max-w-lg mx-5"> 
              <ProgressBar currentNumber={currentQuestion + 1} max={questions.length} />
              <QuizQuestion 
                  questionId={currentQuestion}
                  question={questions[currentQuestion].question}
                  options={questions[currentQuestion].options}
                  onOptionClick={nextStep}
              />
            </main>
        </div>
    );
};