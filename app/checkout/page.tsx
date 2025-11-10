'use client';
import Image from "next/image";
import Header from "../components/Header";
import { useQuiz } from '../context/QuizContext';
import { useState, useEffect } from "react";
import Summary from "../components/SummaryCard";

export default function CheckoutPage() {
    const {gender} = useQuiz();

    const [timeLeft, setTimeLeft] = useState(15 * 60);

    const comparisonImage = gender === 'male' ? '/comparison_male.png' : '/comparison_female.png';

    const summaryData = [
        {icon: "/icons/desire_to_change.svg", characteristic: "Desire to change", value: 92, isPositive: true},
        {icon: "/icons/cravings.svg", characteristic: "Cravings", value: 84, isPositive: false},
        {icon: "/icons/mental_blocks.svg", characteristic: "Mental blocks", value: 74, isPositive: false},
        {icon: "/icons/stress_summary.svg", characteristic: "Stress", value: 52, isPositive: false},
    ];

    useEffect (() => {
        const timer = setInterval(() =>{
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 15 * 60));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return(
        <div className = "flex flex-col flex-1 items-center min-h-screen ">
            <Header logoSrc="/logo.svg" showTimer={true} timeLeft={timeLeft} background="bg-[#FFC633]"/>
            <main className="py-2 mx-5 flex flex-1 flex-col">
                <h1 className="text-2xl font-semibold text-center mb-6 mt-8">Your personalized Alcohol-Free Plan is ready!</h1>
                <div className="flex justify-center text-xs mb-6">
                    <div className="flex flex-1 border-r gap-3 pr-4 border-[#767AF9]">
                        <Image
                            src="icons/brain.svg"
                            alt="brain icon"
                            width={40}
                            height={40} 
                        />
                        <div>
                            <p className="text-[0.625rem]">Drinking patterns</p>
                            <p className="text-xs"><b>Imbalanced</b></p>
                        </div>
                    </div>
                    <div className="flex flex-1 gap-3 pl-4">
                        <Image
                            src="icons/goal.svg"
                            alt="goal icon"
                            width={40}
                            height={40} 
                        />
                        <div>
                            <p className="text-[0.625rem]">Goal</p>
                            <p className="text-xs"><b>Regain control and live alcohol-free</b></p>
                        </div>
                    </div>
                </div>
                <Image
                    src={comparisonImage}
                    alt="Comparison"
                    width={335}
                    height={240}
                    className="object-contain mx-auto mb-10"
                />
                <h1 className="text-2xl font-semibold text-center mb-6">Your Personal Summary</h1>
                {summaryData.map((item) => (
                    <Summary 
                        key={item.characteristic}
                        icon={item.icon}
                        characteristic={item.characteristic}
                        value={item.value}
                        isPositive={item.isPositive}
                    />
                ))}
            </main>
        </div>
    );
}