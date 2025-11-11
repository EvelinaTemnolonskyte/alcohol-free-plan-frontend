'use client';
import {useRouter} from "next/navigation";
import Header from "./components/Header";
import { useQuiz } from './context/QuizContext';


export default function LandingPage() {
  const router = useRouter();
  const {setGender}= useQuiz();

  const options = [
    { gender: 'male', image: '/male.svg' },
    { gender: 'female', image: '/female.svg' },
  ];

  const handleSelect = (gender: string) => {
    setGender(gender);
    router.push('/quiz');
  };


  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Header logoSrc="/logo.svg" />

      <main className="flex flex-col flex-1 justify-between items-center min-h-screen mx-5">
        <div className="text-center mt-8">
          <h1 className="text-2xl font-bold">What is your gender?</h1>
          <h2 className="mt-3 text-sm">We will use it to personalize your plan</h2>
        </div>

        <div className="flex flex-1 justify-center items-center gap-3">
          {options.map((option) => (
            <div
              key={option.gender}
              onClick={() => handleSelect(option.gender)}
              className="flex flex-1 flex-col items-center border-2 rounded-lg cursor-pointer border-[#5349DB] w-[162px]"
            >
              <img
                src={option.image}
                alt={option.gender}
                className="object-cover rounded "
              />
              <span className="flex text-white font-semibold text-lg p-[20.15px] bg-[#5349DB] w-full justify-center">
                {option.gender.charAt(0).toUpperCase() + option.gender.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

}
