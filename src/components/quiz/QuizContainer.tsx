"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { quizQuestions, profiles, ProfileType } from "@/data/quiz";
import { ArrowLeft, ArrowRight, CheckCircle, Download, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function QuizContainer() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(quizQuestions.length).fill(-1));
    const [showResults, setShowResults] = useState(false);
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    const totalSteps = quizQuestions.length;
    const progress = ((currentStep) / totalSteps) * 100;

    const handleSelect = (optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentStep] = optionIndex;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            calculateResult();
        }
    };

    const calculateResult = () => {
        // Scoring Logic:
        // Simple heuristic for demo:
        // More advanced selections (later indices) => higher score
        // Total max points = 7 questions * 3 (max index if 4 options) approx.
        // Let's just sum the indices for simplicity as a proxy for "advancement"

        let score = 0;
        let maxPossible = 0;

        answers.forEach((ans, idx) => {
            score += ans; // 0 to N
            maxPossible += (quizQuestions[idx].options.length - 1);
        });

        const percentage = score / maxPossible;

        // <35% Curious, 35-65 Operator, >65 Scaler
        let profile: ProfileType = "AI Curious";
        if (percentage >= 0.35 && percentage <= 0.65) profile = "AI Operator";
        if (percentage > 0.65) profile = "AI Scaler";

        // In a real app, we'd pass this result state up or save it
        // For now we just use a local derived var in render or set state
        // To keep it simple, I'll allow the render logic to derive it from answers, but storing it is safer.
        // I'll just set showResults true, and derive profile in render.
        setShowResults(true);
    };

    // Derive profile
    let score = 0;
    let maxPossible = 0;
    answers.forEach((ans, idx) => {
        // If we haven't answered (ans=-1), valid for incomplete, but here we enforce completeness
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

                {/* Email Capture */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 text-center space-y-6">
                    {!emailSubmitted ? (
                        <>
                            <h3 className="font-heading font-bold text-xl">Get Your Customized Resource</h3>
                            <p className="text-muted-foreground">{profileData.resource}</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your work email"
                                    className="flex-1 bg-background/50 border border-white/10 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                />
                                <Button variant="hero" onClick={() => setEmailSubmitted(true)}>
                                    Send My Resource
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-4 py-4 animate-in zoom-in duration-300">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div className="font-bold text-lg">Check Your Inbox!</div>
                            <Button variant="heroOutline" size="lg">
                                <Download className="mr-2 w-4 h-4" /> Download Resource
                            </Button>
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                        <Calendar className="mr-2 w-5 h-5" /> Book a Free AI Strategy Session
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
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQ.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
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
                                        "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group",
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
                        onClick={() => setCurrentStep(currentStep - 1)}
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
