import Image from "next/image";
import Timer from "./Timer";
import StepIndicator from "./StepIndicator";

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  logoSrc?: string;
  logoAlt?: string;
  currentStep?: number;
  totalSteps?: number;
  showTimer?: boolean;
  timeLeft?: number;
  background?: string;
}

export default function Header({
  showBackButton = false,
  onBack,
  logoSrc,
  logoAlt = "Logo",
  currentStep,
  totalSteps,
  showTimer = false,
  timeLeft,
  background,
}: HeaderProps) {
  return (
    <header className={`relative flex w-full items-center justify-between px-4 py-4 ${background}`}>
      
      <div className="flex items-center">
        {showBackButton && (
          <button onClick={onBack} className="flex items-center text-2xl">
            &larr;
          </button>
        )}
      </div>

      <div className="flex flex-1 justify-center">
        {logoSrc && (
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={60}
            height={36}
            priority
          />
        )}
      </div>

      <div className="flex items-center space-x-2">
        {currentStep !== undefined && totalSteps !== undefined && (
          <StepIndicator current={currentStep} total={totalSteps} />
        )}

        {showTimer && timeLeft !== undefined && (
          <Timer timeLeft={timeLeft} />
        )}
      </div>
    </header>
  );
}

