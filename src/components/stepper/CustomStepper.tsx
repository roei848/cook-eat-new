import React from 'react';
import './customStepper.scss';

interface CustomStepperProps {
    steps: string[];
    activeStep: number;
    onNext: () => void;
    onBack: () => void;
    onSubmit: () => void;
    children: React.ReactNode;
}

const CustomStepper: React.FC<CustomStepperProps> = ({ steps, activeStep, onNext, onBack, onSubmit, children }) => {
    return (
        <div className="stepper-wrapper">
            <div className="stepper-header">
                {steps.map((label, index) => (
                    <React.Fragment key={index}>
                        <div className="step">
                            <div className={`step-label ${activeStep === index ? 'active' : ''}`}>{label}</div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`step-progress ${activeStep > index ? 'completed' : ''}`}>
                                <div className={`step-progress-bar ${activeStep > index ? 'completed' : ''}`}></div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="stepper-content">
                {children}
            </div>
            <div className="stepper-buttons">
                <button className="back-button" onClick={onBack} disabled={activeStep === 0}>
                    Back
                </button>
                {activeStep < steps.length - 1 ? (
                    <button className="next-button" onClick={onNext}>
                        Next
                    </button>
                ) : (
                    <button className="submit-button" onClick={onSubmit}>
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default CustomStepper;
