import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, XCircle, RotateCcw, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { Question } from '../types';
import { QUESTIONS } from '../content/questions';
import { UNITS } from '../content/units';
import { recordQuizAttempt } from '../lib/storage';

export const PracticePage: React.FC = () => {
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');

  // --- PRACTICE MODE STATE ---
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedDiff, setSelectedDiff] = useState<string>('all');
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Filter questions for practice
  const filteredQuestions = QUESTIONS.filter((q) => {
    const mUnit = selectedUnit === 'all' || q.unitId === selectedUnit;
    const mDiff = selectedDiff === 'all' || q.difficulty === selectedDiff;
    return mUnit && mDiff;
  });

  const handleSelectAnswer = (qId: string, ans: any) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: ans }));
    setRevealedSolutions((prev) => ({ ...prev, [qId]: true }));
  };

  // --- TIMED EXAM SIMULATOR STATE ---
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [examIndex, setExamIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<string, any>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(600); // 10 mins
  const [examConfig, setExamConfig] = useState({
    count: 8,
    timeMinutes: 10,
    unit: 'all',
  });

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (examStarted && !examFinished && timeRemainingSeconds > 0) {
      interval = setInterval(() => {
        setTimeRemainingSeconds((t) => {
          if (t <= 1) {
            setExamFinished(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [examStarted, examFinished, timeRemainingSeconds]);

  const startExam = () => {
    let pool = [...QUESTIONS];
    if (examConfig.unit !== 'all') {
      pool = pool.filter((q) => q.unitId === examConfig.unit);
    }
    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, examConfig.count);
    setExamQuestions(shuffled);
    setExamIndex(0);
    setExamAnswers({});
    setTimeRemainingSeconds(examConfig.timeMinutes * 60);
    setExamStarted(true);
    setExamFinished(false);
  };

  const finishExam = () => {
    setExamFinished(true);
    // calculate score
    let correct = 0;
    examQuestions.forEach((q) => {
      if (examAnswers[q.id] === q.correctAnswer) correct++;
    });
    const timeSpent = examConfig.timeMinutes * 60 - timeRemainingSeconds;
    recordQuizAttempt(correct, examQuestions.length, timeSpent, examConfig.unit);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header - High Contrast Academic Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-950 border border-blue-400 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-700 mb-2">
            Assessment & Exam Readiness
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white font-display">
            Question Bank & Exam Simulator
          </h1>
          <p className="text-sm text-slate-800 dark:text-slate-200 mt-2 max-w-xl leading-relaxed font-medium">
            Multiple-choice questions, boolean simplifications, numerical problems, and university viva preparation.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border-2 border-slate-300 dark:border-slate-700 shrink-0">
          <button
            onClick={() => {
              setMode('practice');
              setExamStarted(false);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'practice'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Practice Mode
          </button>
          <button
            onClick={() => setMode('exam')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'exam'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Timed Exam Simulator
          </button>
        </div>
      </div>

      {/* 1. PRACTICE MODE */}
      {mode === 'practice' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Units</option>
              {UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  Unit {u.number}: {u.title}
                </option>
              ))}
            </select>

            <select
              value={selectedDiff}
              onChange={(e) => setSelectedDiff(e.target.value)}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Viva">Viva Voce</option>
            </select>

            <span className="text-xs text-slate-400 font-mono ml-auto">
              Showing {filteredQuestions.length} questions
            </span>
          </div>

          {/* Question List */}
          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => {
              const selectedAns = userAnswers[q.id];
              const isRevealed = revealedSolutions[q.id];
              const isCorrect = selectedAns === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>
                      Q{idx + 1} · {q.topicName}
                    </span>
                    <div className="flex items-center gap-2">
                      {q.examOrigin && (
                        <span className="text-[11px] font-sans font-medium text-blue-600 dark:text-blue-400">
                          {q.examOrigin}
                        </span>
                      )}
                      <span>[{q.difficulty}]</span>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {q.question}
                  </h3>

                  {/* Options */}
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = selectedAns === opt;
                        const isThisCorrect = q.correctAnswer === opt;

                        let btnStyle =
                          'border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-950 dark:text-white hover:border-blue-600 hover:shadow-sm font-bold';
                        let badgeStyle = 'border-2 border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-black';

                        if (isRevealed) {
                          if (isThisCorrect) {
                            btnStyle = 'border-2 border-emerald-600 bg-emerald-100 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-100 font-black shadow-sm ring-2 ring-emerald-500/20';
                            badgeStyle = 'bg-emerald-600 text-white border-emerald-700 font-black';
                          } else if (isChosen) {
                            btnStyle = 'border-2 border-rose-600 bg-rose-100 dark:bg-rose-950 text-rose-950 dark:text-rose-100 font-black line-through';
                            badgeStyle = 'bg-rose-600 text-white border-rose-700 font-black';
                          } else {
                            btnStyle = 'border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-500 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectAnswer(q.id, opt)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-xs sm:text-sm text-left transition-all cursor-pointer ${btnStyle}`}
                          >
                            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs shrink-0 ${badgeStyle}`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Viva / Numerical Input */}
                  {!q.options && (
                    <div className="pt-2">
                      <button
                        onClick={() =>
                          setRevealedSolutions((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                        }
                        className="px-5 py-2.5 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-950 dark:bg-blue-950 dark:text-blue-100 font-black text-xs hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-xs"
                      >
                        {isRevealed ? 'Hide Model Answer' : 'Show Model Answer & Examiner Notes'}
                      </button>
                    </div>
                  )}

                  {/* Detailed Explanation Drawer */}
                  {isRevealed && (
                    <div
                      className={`p-5 rounded-2xl border-2 text-xs sm:text-sm space-y-2 shadow-xs ${
                        isCorrect || !q.options
                          ? 'border-emerald-500 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100'
                          : 'border-rose-500 bg-rose-50 dark:border-rose-600 dark:bg-rose-950/70 text-rose-950 dark:text-rose-100'
                      }`}
                    >
                      <div className="font-black text-sm flex items-center gap-2">
                        {isCorrect ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            <span>✓ Correct Answer!</span>
                          </>
                        ) : q.options ? (
                          <>
                            <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                            <span>✗ Incorrect Response</span>
                          </>
                        ) : (
                          <>
                            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <span>Model Answer & Solution</span>
                          </>
                        )}
                      </div>
                      <p className="leading-relaxed font-medium text-slate-900 dark:text-slate-100 pt-1">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. TIMED EXAM SIMULATOR */}
      {mode === 'exam' && (
        <div>
          {!examStarted && !examFinished && (
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm max-w-xl mx-auto space-y-6 text-center">
              <Award className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto" />
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Configure Exam Simulation
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Realistic timed testing under university & GATE exam conditions.
                </p>
              </div>

              <div className="space-y-4 text-left">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Question Count
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[5, 8, 10].map((c) => (
                      <button
                        key={c}
                        onClick={() => setExamConfig((prev) => ({ ...prev, count: c }))}
                        className={`py-2 text-xs font-semibold rounded-lg border ${
                          examConfig.count === c
                            ? 'border-blue-600 bg-blue-50 text-blue-600 font-bold'
                            : 'border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {c} Questions
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Time Limit
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[5, 10, 15].map((m) => (
                      <button
                        key={m}
                        onClick={() => setExamConfig((prev) => ({ ...prev, timeMinutes: m }))}
                        className={`py-2 text-xs font-semibold rounded-lg border ${
                          examConfig.timeMinutes === m
                            ? 'border-blue-600 bg-blue-50 text-blue-600 font-bold'
                            : 'border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {m} Minutes
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={startExam}
                className="w-full py-3 rounded-xl bg-blue-600 font-semibold text-xs text-white shadow-md hover:bg-blue-700 transition-colors"
              >
                Begin Timed Exam
              </button>
            </div>
          )}

          {/* Active Exam in Progress */}
          {examStarted && !examFinished && examQuestions.length > 0 && (
            <div className="space-y-6">
              {/* Exam Header Status Bar */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Question {examIndex + 1} of {examQuestions.length}
                </div>
                <div className="flex items-center gap-2 font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimer(timeRemainingSeconds)}</span>
                </div>
                <button
                  onClick={finishExam}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 text-xs font-semibold text-white hover:bg-rose-700 transition-colors"
                >
                  Submit Exam
                </button>
              </div>

              {/* Current Question */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-mono text-slate-400">
                    Topic: {examQuestions[examIndex].topicName}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {examQuestions[examIndex].question}
                  </h3>
                </div>

                {examQuestions[examIndex].options && (
                  <div className="space-y-2.5">
                    {examQuestions[examIndex].options?.map((opt, idx) => {
                      const isSel = examAnswers[examQuestions[examIndex].id] === opt;
                      return (
                        <button
                          key={idx}
                          onClick={() =>
                            setExamAnswers((prev) => ({
                              ...prev,
                              [examQuestions[examIndex].id]: opt,
                            }))
                          }
                          className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-xs text-left transition-colors ${
                            isSel
                              ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-200 font-semibold'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="h-5 w-5 rounded-full flex items-center justify-center font-bold text-[11px] border">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Question Navigator */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    disabled={examIndex === 0}
                    onClick={() => setExamIndex((i) => i - 1)}
                    className="px-4 py-2 rounded-lg border text-xs font-semibold disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {examQuestions.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setExamIndex(i)}
                        className={`h-7 w-7 rounded-lg text-xs font-mono font-bold ${
                          examIndex === i
                            ? 'bg-blue-600 text-white'
                            : examAnswers[examQuestions[i].id]
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  {examIndex < examQuestions.length - 1 ? (
                    <button
                      onClick={() => setExamIndex((i) => i + 1)}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={finishExam}
                      className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
                    >
                      Finish Test
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Exam Results Scorecard */}
          {examFinished && (
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm space-y-6">
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Exam Summary
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display mt-1">
                  Test Performance Scorecard
                </h2>
              </div>

              {/* Score Metric */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="rounded-xl bg-slate-50 dark:bg-slate-850 p-4">
                  <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
                    {examQuestions.filter((q) => examAnswers[q.id] === q.correctAnswer).length} /{' '}
                    {examQuestions.length}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Raw Score</div>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-850 p-4">
                  <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {Math.round(
                      (examQuestions.filter((q) => examAnswers[q.id] === q.correctAnswer).length /
                        examQuestions.length) *
                        100
                    )}
                    %
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Accuracy</div>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-850 p-4">
                  <div className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400">
                    {formatTimer(examConfig.timeMinutes * 60 - timeRemainingSeconds)}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Time Elapsed</div>
                </div>
              </div>

              {/* Review Missed Questions */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Question-by-Question Review
                </h3>
                {examQuestions.map((q, i) => {
                  const isCorrect = examAnswers[q.id] === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span>
                          Q{i + 1}: {q.question}
                        </span>
                        <span
                          className={`font-mono ${
                            isCorrect ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {isCorrect ? 'CORRECT (+1)' : 'MISSED (0)'}
                        </span>
                      </div>
                      <div className="text-slate-500">
                        Your answer: <span className="font-mono">{examAnswers[q.id] || 'Skipped'}</span> · Correct: <span className="font-mono text-emerald-600 font-bold">{String(q.correctAnswer)}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 italic pt-1">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => {
                    setExamStarted(false);
                    setExamFinished(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Take Another Test
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
