"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  label: string;
  badgeColor: string;
  dimension: string;
  question: string;
  options: { value: number; text: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    label: "QUESTION 1 OF 10",
    badgeColor: "#6B7A3D",
    dimension: "Current Practice",
    question: "How is your business using AI today?",
    options: [
      { value: 1, text: "We don\u2019t use AI tools in the business" },
      { value: 2, text: "A few people have tried AI tools but it hasn\u2019t taken hold" },
      { value: 3, text: "We use AI regularly for specific tasks like drafting, research, or scheduling" },
      { value: 4, text: "AI is embedded in daily workflows across several parts of the business" },
      { value: 5, text: "AI is central to how we operate \u2014 it touches most of what the team does" },
    ],
  },
  {
    id: 2,
    label: "QUESTION 2 OF 10",
    badgeColor: "#B8860B",
    dimension: "Delegation",
    question: "A new project or client engagement starts. How does your team think about AI for it?",
    options: [
      { value: 1, text: "AI doesn\u2019t come up when we plan new work" },
      { value: 2, text: "Someone might suggest AI but we rarely follow through" },
      { value: 3, text: "We routinely ask which parts of the work AI could assist with" },
      { value: 4, text: "We map the project to AI capabilities before starting and assign tasks deliberately" },
      { value: 5, text: "We design projects around AI from the start \u2014 human and AI roles are defined upfront" },
    ],
  },
  {
    id: 3,
    label: "QUESTION 3 OF 10",
    badgeColor: "#C41E3A",
    dimension: "Description",
    question: "When your team asks AI to do something, how do they communicate what they need?",
    options: [
      { value: 1, text: "Simple questions \u2014 type something in and see what comes back" },
      { value: 2, text: "Some context gets added but mostly the AI figures it out" },
      { value: 3, text: "Detailed prompts with context, format requirements, and examples" },
      { value: 4, text: "Iterative: start with a prompt, review output, refine the ask based on what comes back" },
      { value: 5, text: "We\u2019ve built structured prompts or templates that the team reuses and improves over time" },
    ],
  },
  {
    id: 4,
    label: "QUESTION 4 OF 10",
    badgeColor: "#2D6A6A",
    dimension: "Discernment",
    question: "AI produces a piece of work for the business. What happens next?",
    options: [
      { value: 1, text: "It gets used as-is \u2014 we assume it\u2019s correct" },
      { value: 2, text: "Someone skims it and makes small edits if something looks off" },
      { value: 3, text: "It gets read carefully and the parts that matter are fact-checked" },
      { value: 4, text: "It\u2019s verified, edited, and shaped with domain judgment before it goes anywhere" },
      { value: 5, text: "AI output is treated as a first draft that requires our expertise to complete" },
    ],
  },
  {
    id: 5,
    label: "QUESTION 5 OF 10",
    badgeColor: "#7B68AE",
    dimension: "Diligence",
    question: "Your team wants to start using AI with client-facing work. What happens?",
    options: [
      { value: 1, text: "We\u2019d be hesitant \u2014 too risky without understanding the implications" },
      { value: 2, text: "We\u2019d want to see what other firms are doing first" },
      { value: 3, text: "We\u2019d set some guidelines and let people experiment carefully" },
      { value: 4, text: "We\u2019d establish clear protocols: what AI can and can\u2019t do, and how to review outputs" },
      { value: 5, text: "We\u2019d treat it as a workflow design project \u2014 map use cases, test, document, train the team" },
    ],
  },
  {
    id: 6,
    label: "QUESTION 6 OF 10",
    badgeColor: "#6B7A3D",
    dimension: "Current Practice",
    question: "Think about your business last week. How embedded was AI?",
    options: [
      { value: 1, text: "Not at all \u2014 AI wasn\u2019t part of anyone\u2019s work" },
      { value: 2, text: "Once or twice, by one or two people, for something specific" },
      { value: 3, text: "Several people used it, for distinct tasks" },
      { value: 4, text: "Most days, across a range of tasks and team members" },
      { value: 5, text: "Every day, as a natural part of how the business operates" },
    ],
  },
  {
    id: 7,
    label: "QUESTION 7 OF 10",
    badgeColor: "#B8860B",
    dimension: "Delegation",
    question: "What would your business NOT let AI do?",
    options: [
      { value: 1, text: "Almost anything \u2014 we prefer to keep humans in control of the work" },
      { value: 2, text: "Anything client-facing or anything involving judgment calls" },
      { value: 3, text: "Final decisions, but most of the research and drafting is fair game" },
      { value: 4, text: "Only things where the stakes of a wrong answer are very high \u2014 everything else is fine" },
      { value: 5, text: "We\u2019ve thought this through: we have a clear view of what stays human and why" },
    ],
  },
  {
    id: 8,
    label: "QUESTION 8 OF 10",
    badgeColor: "#C41E3A",
    dimension: "Description",
    question: "AI gives your team something that is not quite right. What happens?",
    options: [
      { value: 1, text: "Accept it anyway or start over manually" },
      { value: 2, text: "Try a different prompt but often give up if the second attempt misses too" },
      { value: 3, text: "Diagnose what was missing in the prompt and revise it" },
      { value: 4, text: "Break the ask into smaller pieces and iterate until the output is right" },
      { value: 5, text: "Treat the failed output as data \u2014 update the prompt library and document what works" },
    ],
  },
  {
    id: 9,
    label: "QUESTION 9 OF 10",
    badgeColor: "#2D6A6A",
    dimension: "Discernment",
    question: "How confident is your team at spotting when AI gets something wrong in your domain?",
    options: [
      { value: 1, text: "Not confident \u2014 we probably wouldn\u2019t know" },
      { value: 2, text: "We can spot obvious errors but would miss subtle ones" },
      { value: 3, text: "We can usually catch factual mistakes but struggle with reasoning errors" },
      { value: 4, text: "We\u2019re confident in our domain \u2014 we can identify errors in both facts and judgment" },
      { value: 5, text: "We actively test AI outputs against our domain knowledge and have calibrated where it fails" },
    ],
  },
  {
    id: 10,
    label: "QUESTION 10 OF 10",
    badgeColor: "#7B68AE",
    dimension: "Diligence",
    question: "Where does your business want to be with AI in 12 months?",
    options: [
      { value: 1, text: "We\u2019d like to understand the basics \u2014 right now it feels overwhelming" },
      { value: 2, text: "We want the team using AI regularly and comfortably" },
      { value: 3, text: "We want AI embedded in our core workflows \u2014 saving real time" },
      { value: 4, text: "We want the whole team fluent and AI integrated across client delivery" },
      { value: 5, text: "We want proprietary AI capabilities that competitors can\u2019t easily replicate" },
    ],
  },
];

export default function AssessQuestionsPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const handleSubmit = () => {
    if (!allAnswered) return;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("assess_answers", JSON.stringify(answers));
    }
    router.push("/assess/processing");
  };

  return (
    <div className="min-h-screen bg-bg-page">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-accent-crimson z-50" />

      {/* Centered content */}
      <div className="flex justify-center px-8 py-12">
        <div className="w-full max-w-[700px] space-y-10">

          {/* Header */}
          <div className="text-center space-y-2">
            <h1
              className="font-serif text-[36px] font-medium text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-0.5px" }}
            >
              Your Business&apos;s AI Fluency
            </h1>
            <p className="text-text-secondary text-base text-center leading-relaxed max-w-[480px] mx-auto">
              Ten questions based on Anthropic&apos;s Four Ds Framework. Pick the answer
              closest to where your business is today. No wrong answers.
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-10">
            {questions.map((q) => (
              <div key={q.id} className="space-y-3">
                {/* Label row */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-[1px]">
                    {q.label}
                  </span>
                  <span
                    className="text-[11px] font-semibold px-3 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: q.badgeColor }}
                  >
                    {q.dimension}
                  </span>
                </div>

                {/* Question text */}
                <h3
                  className="font-serif text-[22px] font-medium text-text-primary"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {q.question}
                </h3>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        answers[q.id] === opt.value
                          ? "border-accent-crimson bg-accent-crimson/5"
                          : "border-border-gray hover:border-text-tertiary"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        value={opt.value}
                        checked={answers[q.id] === opt.value}
                        onChange={() => setAnswers({ ...answers, [q.id]: opt.value })}
                        className="mt-0.5 accent-accent-crimson shrink-0"
                      />
                      <span className="text-[14px] text-text-primary leading-snug">
                        {opt.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action row */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => router.back()}
              className="h-10 px-6 rounded-lg border border-border-gray text-sm font-medium text-text-secondary hover:border-text-secondary transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`h-10 px-6 rounded-lg text-sm font-semibold text-white transition-colors ${
                allAnswered
                  ? "bg-success hover:bg-success/90"
                  : "bg-text-tertiary cursor-not-allowed"
              }`}
            >
              Get My Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
