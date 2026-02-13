export type QuizQuestion = {
    id: number;
    text: string;
    options: string[];
};

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        text: "How are you currently using AI (if at all)?",
        options: [
            "Not using AI yet",
            "Occasionally (ChatGPT, images, writing)",
            "Regularly for tasks (content, emails, ideas)",
            "Embedded in workflows (automation, CRM, voice AI)"
        ]
    },
    {
        id: 2,
        text: "Where does your business lose the most time each week?",
        options: [
            "Admin / emails / follow-ups",
            "Marketing & content creation",
            "Lead handling & customer responses",
            "Operations & internal processes",
            "I'm not sure"
        ]
    },
    {
        id: 3,
        text: "Where does your business data live today?",
        options: [
            "Spreadsheets / documents",
            "CRM or industry software",
            "Multiple tools that don't talk to each other",
            "I'm not sure / it's messy"
        ]
    },
    {
        id: 4,
        text: "How do customers usually contact you?",
        options: [
            "Phone calls",
            "Email",
            "Social media / DMs",
            "Website forms",
            "All of the above"
        ]
    },
    {
        id: 5,
        text: "If AI could take one task off your plate today, what would it be?",
        options: [
            "Responding to inquiries",
            "Creating marketing content",
            "Scheduling / reminders",
            "Research & analysis",
            "I don't know what's possible yet"
        ]
    },
    {
        id: 6,
        text: "What's your biggest hesitation about AI?",
        options: [
            "Cost",
            "Complexity",
            "Accuracy / trust",
            "Losing the human touch",
            "I'm not hesitant"
        ]
    },
    {
        id: 7,
        text: "What's your primary goal for the next 6–12 months?",
        options: [
            "Save time",
            "Get more leads",
            "Improve customer experience",
            "Scale without hiring",
            "All of the above"
        ]
    }
];

export type ProfileType = "AI Curious" | "AI Operator" | "AI Scaler";

export const profiles: Record<ProfileType, { emoji: string; color: string; desc: string; steps: string[]; resource: string }> = {
    "AI Curious": {
        emoji: "🟢",
        color: "text-emerald-500",
        desc: "Clarity and quick wins—not more tools. Your biggest opportunity is understanding where AI fits into your daily work so it saves time immediately without disrupting your business.",
        steps: ["Use AI as a thinking assistant (emails, summaries, outlines)", "Focus on one repetitive task this week", "Avoid learning multiple tools at once"],
        resource: "Download: Top AI Tools for Small Businesses"
    },
    "AI Operator": {
        emoji: "🔵",
        color: "text-blue-500",
        desc: "Consistency and structure. You're already using AI—the next step is turning it into repeatable workflows instead of one-off tasks.",
        steps: ["Create 3–5 standard prompts you reuse weekly", "Document one AI-assisted workflow", "Use AI to analyze competitors and positioning"],
        resource: "Download: AI Competitor Research Starter Guide"
    },
    "AI Scaler": {
        emoji: "🟣",
        color: "text-purple-500",
        desc: "Leverage. You're ready to use AI systems that operate without your constant involvement.",
        steps: ["Identify one high-leverage bottleneck", "Replace manual steps with AI workflows", "Keep humans focused on decisions and relationships"],
        resource: "Download: AI Video Generation for Product & Service Marketing"
    }
}
