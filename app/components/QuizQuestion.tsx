import {useQuiz} from '../context/QuizContext';
import Image from 'next/image';

interface Option {
    label: string;
    icon: string;
    selectedIcon: string;
    type?: string;
}

interface QuizQuestionProps {
    questionId: number;
    question: string;
    options: Option[];
    onOptionClick: () => void;
}

const getOptionStyle = (type: string | undefined, isSelected: boolean) => {
    
  const textColorClasses = isSelected ? 'text-white' : '';
  const baseBgClass = isSelected ? '' : 'bg-white '; 

  let typeSpecificClasses = '';
  switch(type){
      case 'positive':
          typeSpecificClasses = isSelected ? 'bg-[#289F67]' : 'border-[#289F67]';
          break;
      case 'neutral':
          typeSpecificClasses = isSelected ? 'bg-[#FFC633]' : 'border-[#FFC633]';
          break;
      case 'negative':
          typeSpecificClasses = isSelected ? 'bg-[#E35244]' : 'border-[#E35244]';
          break;
      default:
          typeSpecificClasses = isSelected ? 'bg-[#5349DB]' : 'border-[#F1F1F1]';
          break;
  }

  return `text-base ${baseBgClass}${typeSpecificClasses} ${textColorClasses}`;
}

export default function QuizQuestion({questionId, question, options, onOptionClick}: QuizQuestionProps) {
  const {answers, setAnswer} = useQuiz();

  const selectedAnswer = answers[questionId] || '';

  const handleClick = (optionLabel: string) => {
      setAnswer(questionId, optionLabel); 
      setTimeout(onOptionClick, 400); 
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <h2 className="text-2xl font-semibold text-center mt-8">{question}</h2>

      <div className="flex flex-col flex-1 justify-center gap-4 w-full">
        {options.map((option) => {
          const isSelected = selectedAnswer === option.label;
          const styleClass = getOptionStyle(option.type, isSelected);

          return (
            <button
              key={option.label}
              onClick={() => handleClick(option.label)}
              className={`flex items-center gap-2 rounded-lg border p-2 w-full max-w-xl ${styleClass}`}
            >
              <Image
                src={isSelected ? option.selectedIcon : option.icon}
                alt={option.label}
                width={24}
                height={24}
              />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

}