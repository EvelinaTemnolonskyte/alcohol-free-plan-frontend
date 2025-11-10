interface ProgressBarProps {
    currentNumber: number;
    max: number;
    progressColor?: string;
    width?: string;
}

export default function ProgressBar({currentNumber, max, progressColor = "bg-[#5349DB]", width = "w-full"} : ProgressBarProps){
    const progress = (currentNumber  / max) * 100;

    return (
        <div className={`flex items-center ${width} bg-gray-200 rounded-full h-2 overflow-hidden`}>
            <div 
                className={`${progressColor} h-2 rounded-full`}
                style={{width: `${progress}%`}}
            />
        </div>
    );
}