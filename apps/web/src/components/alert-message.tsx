import { useState, useEffect, FC } from "react";
import {
  InformationCircleIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { Alert, AlertDescription, AlertTitle, AlertType } from "./ui/alert";
import { XIcon } from "lucide-react";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

interface AlertProgressProps {
  alertType: AlertType;
  progress: number;
}

const AlertProgress: FC<AlertProgressProps> = ({ alertType, progress }) => {
  switch (alertType) {
    case "success":
      return <Progress value={progress} color="bg-foreground dark:bg-white" />;
    case "error":
      return (
        <Progress
          value={progress}
          color="bg-red-700 text-red-700 dark:bg-red-600"
        />
      );
    case "warning":
      return <Progress value={progress} color="bg-yellow-600" />;
    case "info":
      return <Progress value={progress} color="bg-blue-600 dark:bg-blue-400" />;
  }
};

interface AlertMessageComponentProps {
  message: string;
  alertTitle: string;
  alertType: AlertType;
  onClose: () => void;
  duration?: number;
  className?: string;
}

const AlertMessage: FC<AlertMessageComponentProps> = ({
  message,
  alertTitle,
  alertType,
  onClose,
  duration,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration && duration > 0) {
      const interval = duration / 100;
      const timerId = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress - 1;
          if (nextProgress <= 0) {
            clearInterval(timerId);
            setIsOpen(false);
            onClose();
            return 0;
          }
          return nextProgress;
        });
      }, interval);

      return () => clearInterval(timerId);
    }
  }, [duration, onClose]);

  useEffect(() => {
    if (!isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const icons = {
    [AlertType.SUCCESS]: CheckCircleIcon,
    [AlertType.WARNING]: ExclamationCircleIcon,
    [AlertType.ERROR]: ExclamationTriangleIcon,
    [AlertType.INFO]: InformationCircleIcon,
  };

  const IconComponent = icons[alertType];

  const alertClasses = cn(
    "fixed top-4 left-1/2 transform -translate-x-1/2 max-w-lg w-full", // default classes
    className, // additional classes
  );

  return (
    <Alert variant={alertType} className={alertClasses}>
      <div className="mb-2 flex justify-between">
        <div className="flex items-center">
          <IconComponent className="h-6 w-6" />
          <div className="ml-3">
            <AlertTitle>{alertTitle}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="ml-4">
          <XIcon size="24" />
        </button>
      </div>
      {duration && duration > 0 && (
        <AlertProgress progress={progress} alertType={alertType} />
      )}
    </Alert>
  );
};

export default AlertMessage;
