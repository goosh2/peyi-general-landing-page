"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { quizQuestions, profiles, ProfileType } from "@/data/quiz";
import { ArrowLeft, ArrowRight, CheckCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function QuizContainer() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(quizQuestions.length).fill(-1));
    const [showResults, setShowResults] = useState(false);
    // Questions travel the way you're moving: forward exits left, back exits right.
    // Entering and leaving along the same path keeps the stepper spatially coherent.
    const [direction, setDirection] = useState(1);

    const totalSteps = quizQuestions.length;
    const progress = ((currentStep) / totalSteps) * 100;

    const handleSelect = (optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentStep] = optionIndex;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setDirection(1);
            setCurrentStep(currentStep + 1);
        } else {
            calculateResult();
        }
    };

    const handlePrevious = () => {
        setDirection(-1);
        setCurrentStep(currentStep - 1);
    };

    const calculateResult = () => {
        setShowResults(true);
    };

    // Derive profile from the sum of chosen option indices as a proxy for "AI maturity".
    let score = 0;
    let maxPossible = 0;
    answers.forEach((ans, idx) => {
        // Skip unanswered questions (ans === -1).
        if (ans !== -1) {
            score += ans;
            maxPossible += (quizQuestions[idx].options.length - 1);
        }
    });
    const percentage = maxPossible > 0 ? score / maxPossible : 0;
    let resultProfile: ProfileType = "AI Curious";
    if (percentage >= 0.35 && percentage <= 0.65) resultProfile = "AI Operator";
    if (percentage > 0.65) resultProfile = "AI Scaler";

    if (showResults) {
        const profileData = profiles[resultProfile];
        return (
            <div className="container max-w-2xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-4 mb-12">
                    <div className="text-6xl animate-bounce">{profileData.emoji}</div>
                    <h2 className="font-heading font-bold text-3xl">Your AI Readiness Profile</h2>
                    <div className={cn("text-4xl font-bold", profileData.color)}>{resultProfile}</div>
                </div>

                <div className="bg-card/40 backdrop-blur border border-white/10 rounded-2xl p-8 mb-8 space-y-6">
                    <p className="text-lg text-foreground/90 leading-relaxed font-medium">
                        {profileData.desc}
                    </p>

                    <div className="space-y-3">
                        <h3 className="font-heading font-bold text-lg text-muted-foreground uppercase tracking-widest text-sm">Action Steps</h3>
                        <ul className="space-y-3">
                            {profileData.steps.map((step, i) => (
                                <li key={i} className="flex gap-3">
                                    <CheckCircle className={cn("w-5 h-5 flex-shrink-0 mt-0.5", profileData.color)} />
                                    <span className="text-muted-foreground">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Next Step: turn the result into action */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 text-center space-y-4">
                    <h3 className="font-heading font-bold text-xl">Your next step</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        The fastest way to act on this is an AI audit&mdash;a clear map of where AI actually pays off in your business.
                    </p>
                    <Button variant="hero" size="xl" className="w-full sm:w-auto" asChild>
                        <Link href="/book">
                            <Calendar className="mr-2 w-5 h-5" /> Book AI Audit
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    const currentQ = quizQuestions[currentStep];

    return (
        <div className="container max-w-xl mx-auto py-12 px-6 flex flex-col flex-grow justify-center min-h-[60vh]">
            {/* Progress */}
            <div className="mb-12 space-y-2">
                <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <span>Question {currentStep + 1} of {totalSteps}</span>
                    <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", bounce: 0, duration: 0.45 }}
                    />
                </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={currentQ.id}
                    custom={direction}
                    initial={{ opacity: 0, x: 24 * direction }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 * direction }}
                    transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                    className="space-y-8"
                >
                    <h2 className="font-heading font-bold text-2xl md:text-3xl leading-tight">
                        {currentQ.text}
                    </h2>

                    <div className="space-y-3">
                        {currentQ.options.map((opt, idx) => {
                            const isSelected = answers[currentStep] === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(idx)}
                                    className={cn(
                                        "w-full text-left p-4 rounded-xl border-2 flex items-center gap-4 group cursor-pointer",
                                        "transition-[transform,background-color,border-color] duration-200 ease-[var(--ease-spring)]",
                                        "active:scale-[0.99] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                        isSelected
                                            ? "border-primary bg-primary/10"
                                            : "border-border bg-card/50 hover:border-primary/50 hover:bg-primary/5"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors",
                                        isSelected ? "bg-primary text-white border-primary" : "border-white/20 text-muted-foreground group-hover:border-primary/50"
                                    )}>
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                    <span className={cn("font-medium", isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>
                                        {opt}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Footer Nav */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur border-t border-border/50">
                <div className="container max-w-xl mx-auto flex justify-between items-center">
                    <Button
                        variant="ghost"
                        disabled={currentStep === 0}
                        onClick={handlePrevious}
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" /> Previous
                    </Button>

                    <Button
                        variant="hero"
                        disabled={answers[currentStep] === -1}
                        onClick={handleNext}
                    >
                        {currentStep === totalSteps - 1 ? "See My Results" : "Next"}
                        {currentStep !== totalSteps - 1 && <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
