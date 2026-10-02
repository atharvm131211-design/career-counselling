import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Compass, Sparkles, BookOpen, GraduationCap, Globe, 
  CheckCircle2, ArrowRight, ArrowLeft, Shield, User, Mail, 
  Lock, LogOut, ChevronRight, Download, RefreshCw, 
  DollarSign, Award, Layers, Search, Briefcase, Camera,
  FileSpreadsheet, ExternalLink, HelpCircle, Check, Database,
  TrendingUp, AlertCircle, Eye, EyeOff, Building, Users,
  HeartHandshake, Lightbulb, BarChart3, Target, Bookmark,
  CheckSquare, Zap, Activity, Brain, Share2, Printer,
  Scale, Feather, Heart, Radio, ShieldCheck, Microscope,
  Dna, Flame, Landmark, Palette, Dumbbell, Flag, Grid,
  Sliders, ChevronDown, Award as Trophy, PieChart, Rocket
} from 'lucide-react';

const ASSESSMENT_BATTERY = [
  // ==========================================
  // PILLAR 1: COGNITIVE APTITUDE & MATH PUZZLES (10 QUESTIONS)
  // ==========================================
  {
    id: 'q1',
    pillar: 'Cognitive & Math Logic',
    pillarCode: 'math_logic',
    type: 'puzzle',
    prompt: 'NUMBER PATTERN: Look at this sequence: 4, 9, 19, 39, 79, ... What number comes next?',
    options: [
      { id: 'q1_a', text: '159 (Pattern: Each number is multiplied by 2 and then 1 is added: 79 × 2 + 1 = 159)', scoreType: 'logic', points: 5 },
      { id: 'q1_b', text: '149', scoreType: 'logic', points: 1 },
      { id: 'q1_c', text: '169', scoreType: 'logic', points: 1 },
      { id: 'q1_d', text: '158', scoreType: 'logic', points: 1 }
    ]
  },
  {
    id: 'q2',
    pillar: 'Cognitive & Math Logic',
    pillarCode: 'math_logic',
    type: 'puzzle',
    prompt: 'DISTANCE & SPEED: A cyclist rides 36 km in 2 hours. If they double their speed, how long will it take them to cover 72 km?',
    options: [
      { id: 'q2_a', text: '2 hours (Original speed = 18 km/h. Doubled speed = 36 km/h. Time = 72 ÷ 36 = 2 hrs)', scoreType: 'logic', points: 5 },
      { id: 'q2_b', text: '1 hour', scoreType: 'logic', points: 1 },
      { id: 'q2_c', text: '3 hours', scoreType: 'logic', points: 1 },
      { id: 'q2_d', text: '4 hours', scoreType: 'logic', points: 1 }
    ]
  },
  {
    id: 'q3',
    pillar: 'Cognitive & Math Logic',
    pillarCode: 'math_logic',
    type: 'puzzle',
    prompt: 'RATIO IN NATURE: A farmer mixes organic fertilizer with water in a 2 : 7 ratio. If he uses 35 liters of water, how much fertilizer does he need?',
    options: [
      { id: 'q3_a', text: '10 liters (7 units = 35 liters, so 1 unit = 5 liters. 2 units = 10 liters)', scoreType: 'logic', points: 5 },
      { id: 'q3_b', text: '12 liters', scoreType: 'logic', points: 1 },
      { id: 'q3_c', text: '14 liters', scoreType: 'logic', points: 1 },
      { id: 'q3_d', text: '8 liters', scoreType: 'logic', points: 1 }
    ]
  },
  {
    id: 'q4',
    pillar: 'Cognitive & Math Logic',
    pillarCode: 'math_logic',
    type: 'puzzle',
    prompt: 'SPATIAL CUT: A wooden solid cube is painted blue on all 6 sides. It is then sawed into 64 equal smaller cubes. How many small cubes have ZERO painted faces?',
    options: [
      { id: 'q4_a', text: '8 smaller cubes (The inner 2×2×2 core of the 4×4×4 cube has no exposed faces)', scoreType: 'logic', points: 5 },
      { id: 'q4_b', text: '16 smaller cubes', scoreType: 'logic', points: 1 },
      { id: 'q4_c', text: '0 smaller cubes', scoreType: 'logic', points: 1 },
      { id: 'q4_d', text: '4 smaller cubes', scoreType: 'logic', points: 1 }
    ]
  },
  {
    id: 'q5',
    pillar: 'Cognitive & Math Logic',
    pillarCode: 'math_logic',
    type: 'puzzle',
    prompt: 'LOGICAL DEDUCTION: Statement 1: All fighter pilots undergo centrifuge G-force training. Statement 2: Captain Vikram underwent centrifuge G-force training. Which deduction is valid?',
    options: [
      { id: 'q5_a', text: 'Captain Vikram might be a fighter pilot, but he could also be an astronaut or test volunteer.', scoreType: 'logic', points: 5 },
      { id: 'q5_b', text: 'Captain Vikram is 100% definitely a fighter pilot.', scoreType: 'logic', points: 1 },
      { id: 'q5_c', text: 'Centrifuge training is only taken by civilians.', scoreType: 'logic', points: 1 },
      { id: 'q5_d', text: 'No pilot ever takes centrifuge training.', scoreType: 'logic', points: 1 }
    ]
  },
  {
    id: 'q6',
    pillar: 'Cognitive & Math Logic',
    pillarCode: 'math_logic',
    type: 'puzzle',
    prompt: 'PERCENTAGE LOGIC: A book seller discounts a novel by 20%, but still earns a 20% profit on his cost price. If the cost price is ₹200, what was the printed mark price?',
    options: [
      { id: 'q6_a', text: '₹300 (Selling price = ₹240 with 20% profit. If ₹240 is 80% of mark price, Mark Price = ₹300)', scoreType: 'logic', points: 5 },
      { id: 'q6_b', text: '₹280', scoreType: 'logic', points: 1 },
      { id: 'q6_c', text: '₹260', scoreType: 'logic', points: 1 },
      { id: 'q6_d', text: '₹320', scoreType: 'logic', points: 1 }
    ]
  },
  {
    id: 'q7',
    pillar: 'Cognitive & Math Logic',
    pillarCode: 'math_logic',
    type: 'puzzle',
    prompt: 'FAMILY RELATION LOGIC: Pointing to a photograph of a woman, a man says: "Her daughter is the only granddaughter of my mother." Who is the woman to the man?',
    options: [
      { id: 'q7_a', text: 'His wife (or his sister, assuming single lineage)', scoreType: 'logic', points: 5 },
      { id: 'q7_b', text: 'His grandmother', scoreType: 'logic', points: 1 },
      { id: 'q7_c', text: 'His niece', scoreType: 'logic', points: 1 },
      { id: 'q7_d', text: 'His aunt', scoreType: 'logic', points: 1 }
    ]
  },
  {
    id: 'q8',
    pillar: 'Cognitive & Math Logic',
    pillarCode: 'math_logic',
    type: 'puzzle',
    prompt: 'WORK & TIME: 4 artisans can weave 4 handloom carpets in 4 days. At the exact same rate, how many days will 8 artisans take to weave 8 carpets?',
    options: [
      { id: 'q8_a', text: '4 days (1 artisan takes 4 days to weave 1 carpet; therefore 8 artisans take 4 days to weave 8 carpets)', scoreType: 'logic', points: 5 },
      { id: 'q8_b', text: '8 days', scoreType: 'logic', points: 1 },
      { id: 'q8_c', text: '2 days', scoreType: 'logic', points: 1 },
      { id: 'q8_d', text: '16 days', scoreType: 'logic', points: 1 }
    ]
  },
  {
    id: 'q9',
    pillar: 'Cognitive & Math Logic',
    pillarCode: 'math_logic',
    type: 'puzzle',
    prompt: 'GEOMETRY INTUITION: A circular running track has a radius of 70 meters. If an athlete runs exactly 2 complete laps around it, what approximate distance did they cover? (Use π ≈ 22/7)',
    options: [
      { id: 'q9_a', text: '880 meters (Perimeter of 1 lap = 2 × 22/7 × 70 = 440 meters. 2 laps = 880 meters)', scoreType: 'logic', points: 5 },
      { id: 'q9_b', text: '440 meters', scoreType: 'logic', points: 1 },
      { id: 'q9_c', text: '660 meters', scoreType: 'logic', points: 1 },
      { id: 'q9_d', text: '1200 meters', scoreType: 'logic', points: 1 }
    ]
  },
  {
    id: 'q10',
    pillar: 'Cognitive & Math Logic',
    pillarCode: 'math_logic',
    type: 'puzzle',
    prompt: 'SYLLOGISM: Some stones are diamonds. All diamonds sparkle in the dark. Which conclusion is guaranteed?',
    options: [
      { id: 'q10_a', text: 'Some stones sparkle in the dark.', scoreType: 'logic', points: 5 },
      { id: 'q10_b', text: 'All stones sparkle in the dark.', scoreType: 'logic', points: 1 },
      { id: 'q10_c', text: 'No stones sparkle in the dark.', scoreType: 'logic', points: 1 },
      { id: 'q10_d', text: 'Diamonds are not stones.', scoreType: 'logic', points: 1 }
    ]
  },

  // ==========================================
  // PILLAR 2: CAREER DECIDEDNESS & CLARITY INDEX (8 QUESTIONS)
  // ==========================================
  {
    id: 'q11',
    pillar: 'Career Clarity & Decidedness',
    pillarCode: 'clarity',
    prompt: 'When someone asks you: "What do you want to become in life?", what is your honest gut feeling?',
    options: [
      { id: 'q11_a', text: 'I have 1 or 2 specific dream fields that I have loved for years, and I am working toward them.', scoreType: 'decided', points: 5 },
      { id: 'q11_b', text: 'I have 4 or 5 different interests, but I find it really hard to pick just one path.', scoreType: 'exploring', points: 4 },
      { id: 'q11_c', text: 'To be completely honest, I feel confused and overwhelmed by all the options.', scoreType: 'confused', points: 5 },
      { id: 'q11_d', text: 'I usually repeat whatever career my parents or elder siblings tell me to pursue.', scoreType: 'pressured', points: 5 }
    ]
  },
  {
    id: 'q12',
    pillar: 'Career Clarity & Decidedness',
    pillarCode: 'clarity',
    prompt: 'How much influence do your parents, relatives, or neighbors have on your career thoughts?',
    options: [
      { id: 'q12_a', text: 'They strongly suggest conventional degrees (Engineering / MBBS / Govt job), even if my heart wants something else.', scoreType: 'pressured', points: 5 },
      { id: 'q12_b', text: 'They are completely supportive and encourage me to follow whatever suits my true talent.', scoreType: 'decided', points: 4 },
      { id: 'q12_c', text: 'They give advice, but I feel so undecided that I easily get swayed by anyone’s opinion.', scoreType: 'confused', points: 4 },
      { id: 'q12_d', text: 'I am researching colleges and careers independently and educating my family about new options.', scoreType: 'exploring', points: 5 }
    ]
  },
  {
    id: 'q13',
    pillar: 'Career Clarity & Decidedness',
    pillarCode: 'clarity',
    prompt: 'When thinking about 11th/12th stream selection or your college major:',
    options: [
      { id: 'q13_a', text: 'I know the exact subjects I need and the exact entrance exams required.', scoreType: 'decided', points: 5 },
      { id: 'q13_b', text: 'I like a few subjects (like Biology or History or Math) but don’t know which careers they lead to.', scoreType: 'exploring', points: 4 },
      { id: 'q13_c', text: 'I am terrified of making a wrong stream choice that might ruin my future.', scoreType: 'confused', points: 5 },
      { id: 'q13_d', text: 'I am just choosing the same stream that most of my close friends are taking.', scoreType: 'pressured', points: 4 }
    ]
  },
  {
    id: 'q14',
    pillar: 'Career Clarity & Decidedness',
    pillarCode: 'clarity',
    prompt: 'Do you ever spend your free time watching YouTube videos or reading books about any specific profession?',
    options: [
      { id: 'q14_a', text: 'Yes! Frequently watching documentaries on space rockets, trials, psychology, or defense.', scoreType: 'decided', points: 5 },
      { id: 'q14_b', text: 'I watch random things across art, tech, science, and history without one specific focus.', scoreType: 'exploring', points: 4 },
      { id: 'q14_c', text: 'Rarely, because I don’t feel excited enough about any one particular job yet.', scoreType: 'confused', points: 4 },
      { id: 'q14_d', text: 'I only watch what is directly assigned in my school syllabus.', scoreType: 'pressured', points: 3 }
    ]
  },
  {
    id: 'q15',
    pillar: 'Career Clarity & Decidedness',
    pillarCode: 'clarity',
    prompt: 'What scares you the most when you imagine yourself working 8 hours every day in the future?',
    options: [
      { id: 'q15_a', text: 'Being trapped in a dull, monotonous desk routine that doesn’t help people or challenge me.', scoreType: 'exploring', points: 4 },
      { id: 'q15_b', text: 'Not earning enough money to give my family a comfortable and secure life.', scoreType: 'decided', points: 4 },
      { id: 'q15_c', text: 'Choosing a degree that everyone praised, only to realize too late that I hate doing it.', scoreType: 'confused', points: 5 },
      { id: 'q15_d', text: 'Disappointing my parents who sacrificed so much for my education.', scoreType: 'pressured', points: 5 }
    ]
  },
  {
    id: 'q16',
    pillar: 'Career Clarity & Decidedness',
    pillarCode: 'clarity',
    prompt: 'If you had a magic chance to shadow a professional for 1 whole week at their actual job:',
    options: [
      { id: 'q16_a', text: 'I already know the exact professional I would shadow (e.g. an ISRO Rocket Engineer, Army Officer, or Doctor).', scoreType: 'decided', points: 5 },
      { id: 'q16_b', text: 'I would want to shadow 3 or 4 completely different people to compare how their days look.', scoreType: 'exploring', points: 5 },
      { id: 'q16_c', text: 'I would feel totally lost on who to pick.', scoreType: 'confused', points: 4 },
      { id: 'q16_d', text: 'I would shadow whoever my parents believe earns the highest respect in society.', scoreType: 'pressured', points: 4 }
    ]
  },
  {
    id: 'q17',
    pillar: 'Career Clarity & Decidedness',
    pillarCode: 'clarity',
    prompt: 'Have you ever taken a career counseling test before this one?',
    options: [
      { id: 'q17_a', text: 'Yes, in school or online, but the results were too generic or only gave 1 broad computer answer.', scoreType: 'exploring', points: 4 },
      { id: 'q17_b', text: 'Never. This is my very first detailed career diagnostic.', scoreType: 'exploring', points: 3 },
      { id: 'q17_c', text: 'Yes, but it confused me even more with complicated jargon.', scoreType: 'confused', points: 5 },
      { id: 'q17_d', text: 'I usually just rely on family elder discussions.', scoreType: 'pressured', points: 4 }
    ]
  },
  {
    id: 'q18',
    pillar: 'Career Clarity & Decidedness',
    pillarCode: 'clarity',
    prompt: 'How confident do you feel that you will find a career where you will be both happy and successful?',
    options: [
      { id: 'q18_a', text: 'Very confident. With hard work and clear guidance, I know I will succeed.', scoreType: 'decided', points: 5 },
      { id: 'q18_b', text: 'Moderately confident, once I get a clear, step-by-step roadmap.', scoreType: 'exploring', points: 4 },
      { id: 'q18_c', text: 'Anxious and doubtful right now because I don’t know where my real strength lies.', scoreType: 'confused', points: 5 },
      { id: 'q18_d', text: 'I feel pressured because expectations on me are very high.', scoreType: 'pressured', points: 5 }
    ]
  },

  // ==========================================
  // PILLAR 3: BIG FIVE PERSONALITY & PSYCHOLOGICAL TRAITS (15 QUESTIONS)
  // ==========================================
  {
    id: 'q19',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'EXTRAVERSION: After spending a full week studying alone for exams, how do you recharge your mind?',
    options: [
      { id: 'q19_a', text: 'Going outside to play team sports, talk to friends, and be around a crowd of people.', scoreType: 'extravert', points: 5 },
      { id: 'q19_b', text: 'Staying in my quiet room, reading, listening to music, or going for a peaceful walk alone.', scoreType: 'introvert', points: 5 },
      { id: 'q19_c', text: 'Catching up with 1 or 2 trusted best friends in a calm setting.', scoreType: 'introvert', points: 4 },
      { id: 'q19_d', text: 'Organizing a group outing or dinner for our entire neighborhood circle.', scoreType: 'extravert', points: 5 }
    ]
  },
  {
    id: 'q20',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'CONSCIENTIOUSNESS: When you have a big school project due in 2 weeks:',
    options: [
      { id: 'q20_a', text: 'I make a daily checklist immediately, start day 1, and finish everything 2 days early.', scoreType: 'conscientious', points: 5 },
      { id: 'q20_b', text: 'I start with great energy, then relax, and finish in a quick burst the night before.', scoreType: 'spontaneous', points: 4 },
      { id: 'q20_c', text: 'I prefer doing work in sudden creative bursts whenever inspiration strikes.', scoreType: 'spontaneous', points: 5 },
      { id: 'q20_d', text: 'I keep reminding myself, but often end up feeling stressed due to last-minute rush.', scoreType: 'spontaneous', points: 4 }
    ]
  },
  {
    id: 'q21',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'OPENNESS: How do you react when you encounter an idea or culture completely opposite to what you grew up with?',
    options: [
      { id: 'q21_a', text: 'I become intensely curious and want to ask questions to understand how they see the world.', scoreType: 'openness', points: 5 },
      { id: 'q21_b', text: 'I respect it, but prefer sticking firmly to traditional and proven methods that have worked for generations.', scoreType: 'conventional', points: 4 },
      { id: 'q21_c', text: 'I analyze whether their system produces better objective facts and results.', scoreType: 'openness', points: 4 },
      { id: 'q21_d', text: 'I feel slightly uneasy whenever established rules and traditions are questioned.', scoreType: 'conventional', points: 5 }
    ]
  },
  {
    id: 'q22',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'AGREEABLENESS & EMPATHY: When a classmate fails badly and looks humiliated in front of the class:',
    options: [
      { id: 'q22_a', text: 'I physically feel their pain in my chest and sit with them after class to comfort them.', scoreType: 'empathy', points: 5 },
      { id: 'q22_b', text: 'I consider why they didn’t prepare properly and think about what study plan they should follow.', scoreType: 'logic', points: 4 },
      { id: 'q22_c', text: 'I crack a light joke or distract them with sports to take their mind off the embarrassment.', scoreType: 'extravert', points: 4 },
      { id: 'q22_d', text: 'I step up and speak to the teacher if I feel the student was unfairly shamed.', scoreType: 'courage', points: 5 }
    ]
  },
  {
    id: 'q23',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'NEUROTICISM / STRESS RESILIENCE: You are about to speak on stage in front of 400 people:',
    options: [
      { id: 'q23_a', text: 'My heart beats fast, but once I step on stage, adrenaline kicks in and I deliver with pride.', scoreType: 'resilient', points: 5 },
      { id: 'q23_b', text: 'I feel intense dread, sweating hands, and wish I could disappear or hand the mic to someone else.', scoreType: 'sensitive', points: 5 },
      { id: 'q23_c', text: 'I treat it like an intellectual challenge: I have my bullet points memorized and execute calmly.', scoreType: 'resilient', points: 4 },
      { id: 'q23_d', text: 'I actually love being in the spotlight and command the audience’s attention naturally.', scoreType: 'extravert', points: 5 }
    ]
  },
  {
    id: 'q24',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'INTUITION VS DETAIL: When reading a mystery story or learning a science concept:',
    options: [
      { id: 'q24_a', text: 'I quickly grasp the big-picture "vibe" and predict the ending using my gut instinct.', scoreType: 'intuitive', points: 5 },
      { id: 'q24_b', text: 'I note down every single clue, date, and factual step to verify proof before guessing.', scoreType: 'observant', points: 5 },
      { id: 'q24_c', text: 'I focus on why the characters behaved emotionally the way they did.', scoreType: 'empathy', points: 4 },
      { id: 'q24_d', text: 'I try to visualize how the physical scene looked in 3D.', scoreType: 'tactical', points: 4 }
    ]
  },
  {
    id: 'q25',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'ORDER & DISCIPLINE: How tidy is your study table or bedroom shelf right now?',
    options: [
      { id: 'q25_a', text: 'Every book, pen, and notebook is placed in its dedicated drawer or neat stack.', scoreType: 'conscientious', points: 5 },
      { id: 'q25_b', text: 'It looks chaotic to others, but I know exactly where every single sheet of paper is.', scoreType: 'spontaneous', points: 4 },
      { id: 'q25_c', text: 'I clean it up only when someone orders me to or when visitors are coming.', scoreType: 'spontaneous', points: 3 },
      { id: 'q25_d', text: 'I keep only the 1 book I am reading right now; everything else is put away.', scoreType: 'conscientious', points: 4 }
    ]
  },
  {
    id: 'q26',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'CRITICISM: If a teacher or coach firmly tells you that your performance was poor:',
    options: [
      { id: 'q26_a', text: 'I swallow my pride, ask specifically what needs fixing, and practice 3 times harder.', scoreType: 'resilient', points: 5 },
      { id: 'q26_b', text: 'I feel deeply hurt inside and replay their harsh words in my mind for several days.', scoreType: 'sensitive', points: 5 },
      { id: 'q26_c', text: 'I question whether their critique was factually fair and defend my work with evidence.', scoreType: 'logic', points: 4 },
      { id: 'q26_d', text: 'I feel motivated by anger to prove them completely wrong next time.', scoreType: 'courage', points: 5 }
    ]
  },
  {
    id: 'q27',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'CURIOSITY: In a science laboratory, when the teacher leaves the room for 5 minutes:',
    options: [
      { id: 'q27_a', text: 'I am tempted to touch the glass beakers, mix chemicals, or look down the microscope lenses.', scoreType: 'openness', points: 5 },
      { id: 'q27_b', text: 'I stay seated and ensure no student accidentally breaks safety protocols or causes an accident.', scoreType: 'conscientious', points: 5 },
      { id: 'q27_c', text: 'I chat and joke with friends at the lab bench.', scoreType: 'extravert', points: 4 },
      { id: 'q27_d', text: 'I read the lab manual carefully to make sure my experiment will yield 100% correct data.', scoreType: 'logic', points: 4 }
    ]
  },
  {
    id: 'q28',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'MORAL INSTINCT: If your closest childhood friend stole money from the school charity box:',
    options: [
      { id: 'q28_a', text: 'I confront them privately, force them to return every rupee, and help them admit their mistake with dignity.', scoreType: 'conscientious', points: 5 },
      { id: 'q28_b', text: 'I protect them from punishment because loyalty to my friend comes first, then counsel them.', scoreType: 'empathy', points: 4 },
      { id: 'q28_c', text: 'I report it anonymously to school authorities because upholding law and integrity is non-negotiable.', scoreType: 'courage', points: 5 },
      { id: 'q28_d', text: 'I try to understand if their family is starving or in desperate medical need before deciding.', scoreType: 'intuitive', points: 5 }
    ]
  },
  {
    id: 'q29',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'ROUTINE VS NOVELTY: If every single day of your job followed the exact same 9 AM to 5 PM routine:',
    options: [
      { id: 'q29_a', text: 'I would love it! Predictability, clear safety, and stable hours give me peace of mind.', scoreType: 'conventional', points: 5 },
      { id: 'q29_b', text: 'I would suffocate! I need unexpected challenges, field travel, or creative freedom.', scoreType: 'openness', points: 5 },
      { id: 'q29_c', text: 'As long as the job is intellectually stimulating, the routine doesn’t bother me.', scoreType: 'logic', points: 4 },
      { id: 'q29_d', text: 'I prefer physical action outdoors over sitting inside four walls all day.', scoreType: 'tactical', points: 5 }
    ]
  },
  {
    id: 'q30',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'DECISION STYLE: When making an important life choice (like buying a laptop or picking a school):',
    options: [
      { id: 'q30_a', text: 'I create an Excel comparison sheet of technical specs, reviews, and benchmark prices.', scoreType: 'logic', points: 5 },
      { id: 'q30_b', text: 'I trust my inner instinct and vibe within the first 5 minutes of seeing it.', scoreType: 'intuitive', points: 5 },
      { id: 'q30_c', text: 'I ask 10 different people for advice until I find a consensus.', scoreType: 'empathy', points: 4 },
      { id: 'q30_d', text: 'I pick whatever is most durable, rugged, and practical.', scoreType: 'tactical', points: 4 }
    ]
  },
  {
    id: 'q31',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'ENERGY IN CONFLICT: When two friends are screaming at each other in a heated dispute:',
    options: [
      { id: 'q31_a', text: 'I step between them calmly, listen to both sides impartially, and negotiate a fair treaty.', scoreType: 'empathy', points: 5 },
      { id: 'q31_b', text: 'I raise my voice firmly with authority and command both to shut up and cool down.', scoreType: 'courage', points: 5 },
      { id: 'q31_c', text: 'I walk away because witnessing raw anger makes me feel uncomfortable and drained.', scoreType: 'sensitive', points: 4 },
      { id: 'q31_d', text: 'I analyze who broke the ground rules logically and point out the root misunderstanding.', scoreType: 'logic', points: 4 }
    ]
  },
  {
    id: 'q32',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'PATIENCE: When explaining a simple concept to someone who keeps failing to understand it:',
    options: [
      { id: 'q32_a', text: 'I smile warmly, invent 3 real-world analogies, and keep guiding them until the lightbulb clicks.', scoreType: 'teaching', points: 5 },
      { id: 'q32_b', text: 'I start feeling restless inside and wonder why they are struggling with such simple logic.', scoreType: 'logic', points: 4 },
      { id: 'q32_c', text: 'I physically demonstrate how to do it with my own hands.', scoreType: 'tactical', points: 4 },
      { id: 'q32_d', text: 'I encourage them emotionally so they don’t lose self-belief.', scoreType: 'empathy', points: 4 }
    ]
  },
  {
    id: 'q33',
    pillar: 'Personality & Psychological Traits',
    pillarCode: 'personality',
    prompt: 'ADVENTURE & RISK: If offered a chance to go on a high-altitude Himalayan mountaineering expedition:',
    options: [
      { id: 'q33_a', text: 'Yes, pack my bags! Physical stamina, high peaks, and pushing human endurance thrill me.', scoreType: 'tactical', points: 5 },
      { id: 'q33_b', text: 'Only if certified mountain guides and medical oxygen kits ensure 100% safety parameters.', scoreType: 'conscientious', points: 4 },
      { id: 'q33_c', text: 'I would go to photograph the snow landscapes and write poetic reflections.', scoreType: 'openness', points: 4 },
      { id: 'q33_d', text: 'I prefer staying in the base camp cabin reading a great book with hot tea.', scoreType: 'introvert', points: 4 }
    ]
  },

  // ==========================================
  // PILLAR 4: RIASEC VOCATIONAL DOMAINS & INTERESTS (18 QUESTIONS)
  // ==========================================
  {
    id: 'q34',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'REALISTIC (Hands-on): When a bicycle chain, ceiling fan, or water pump breaks down at home:',
    options: [
      { id: 'q34_a', text: 'I grab screwdrivers and grease, take the parts apart, and fix the mechanical mechanism myself.', scoreType: 'realistic', points: 5 },
      { id: 'q34_b', text: 'I immediately call a technician because I don’t enjoy getting my hands dirty with grease.', scoreType: 'conventional', points: 3 },
      { id: 'q34_c', text: 'I look up the physics of how the motor works on Wikipedia.', scoreType: 'investigative', points: 4 },
      { id: 'q34_d', text: 'I wonder who designed such an appliance and how it could look sleek.', scoreType: 'artistic', points: 4 }
    ]
  },
  {
    id: 'q35',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'INVESTIGATIVE (Scientific Inquiry): Which magazine or documentary topic pulls your attention first?',
    options: [
      { id: 'q35_a', text: 'How liquid rocket engines, orbital maneuvers, and satellite constellations reach outer space.', scoreType: 'investigative', points: 5 },
      { id: 'q35_b', text: 'Undercover operations that caught corrupt international cartels.', scoreType: 'courage', points: 4 },
      { id: 'q35_c', text: 'How young entrepreneurs built a ₹1,000 crore startup from a rural garage.', scoreType: 'enterprising', points: 4 },
      { id: 'q35_d', text: 'How psychological therapy helped soldiers heal severe war post-traumatic stress.', scoreType: 'social', points: 4 }
    ]
  },
  {
    id: 'q36',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'ARTISTIC (Creative Expression): In school exhibitions or annual festivals, which role do you enjoy most?',
    options: [
      { id: 'q36_a', text: 'Writing the script, designing stage backdrops, composing music, or directing plays.', scoreType: 'artistic', points: 5 },
      { id: 'q36_b', text: 'Managing the ticket sales, sponsorships, and budget finances.', scoreType: 'conventional', points: 4 },
      { id: 'q36_c', text: 'Managing stage security, crowd queues, and emergency exits.', scoreType: 'realistic', points: 4 },
      { id: 'q36_d', text: 'Welcoming guests, hosting the microphone anchor role, and introducing speakers.', scoreType: 'social', points: 4 }
    ]
  },
  {
    id: 'q37',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'SOCIAL (Helping & Healing): Which of these acts would give your life the most enduring sense of pride?',
    options: [
      { id: 'q37_a', text: 'Guiding a depressed teenager out of dark thoughts back into a smiling, thriving life.', scoreType: 'social', points: 5 },
      { id: 'q37_b', text: 'Building an automated AI robot or aerospace rocket that pushes human knowledge boundaries.', scoreType: 'investigative', points: 5 },
      { id: 'q37_c', text: 'Leading a military rescue battalion that evacuates 500 flood victims from roofs.', scoreType: 'courage', points: 5 },
      { id: 'q37_d', text: 'Founding a company that creates 1,000 well-paying jobs in your home district.', scoreType: 'enterprising', points: 4 }
    ]
  },
  {
    id: 'q38',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'ENTERPRISING (Influence & Leadership): Imagine you are elected student council president:',
    options: [
      { id: 'q38_a', text: 'I love delivering passionate speeches, rallying students behind big ideas, and negotiating with the principal.', scoreType: 'enterprising', points: 5 },
      { id: 'q38_b', text: 'I focus on auditing the school library records and ensuring strict disciplinary rules.', scoreType: 'conventional', points: 4 },
      { id: 'q38_c', text: 'I organize peer tutoring circles so weaker students get free academic coaching.', scoreType: 'social', points: 5 },
      { id: 'q38_d', text: 'I build a student mobile app to report broken canteen taps and benches.', scoreType: 'investigative', points: 4 }
    ]
  },
  {
    id: 'q39',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'CONVENTIONAL (Data, Audit & Structure): When dealing with numbers, bank records, or spreadsheets:',
    options: [
      { id: 'q39_a', text: 'I enjoy finding the exact 1 rupee discrepancy in balance sheets and keeping records 100% clean.', scoreType: 'conventional', points: 5 },
      { id: 'q39_b', text: 'I get a headache looking at rows of financial accounts and want to do something creative instead.', scoreType: 'artistic', points: 4 },
      { id: 'q39_c', text: 'I only care about what story the numbers tell about human behavior.', scoreType: 'social', points: 3 },
      { id: 'q39_d', text: 'I write a Python script to automate the calculation so I don’t have to do it manually.', scoreType: 'investigative', points: 4 }
    ]
  },
  {
    id: 'q40',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'MILITARY / POLICE TACTICAL: How do you feel about wearing a crisp armed forces uniform with rank badges?',
    options: [
      { id: 'q40_a', text: 'Supreme honor and goosebumps! Leading troops, upholding military discipline, and serving India is my calling.', scoreType: 'courage', points: 5 },
      { id: 'q40_b', text: 'I deeply respect our soldiers, but I prefer contributing to India as a civilian scientist, engineer, or teacher.', scoreType: 'social', points: 4 },
      { id: 'q40_c', text: 'I prefer aerospace rocket design, code-breaking, or intelligence gathering over frontline physical warfare.', scoreType: 'investigative', points: 5 },
      { id: 'q40_d', text: 'I dislike strict hierarchy and salute commands; I value complete personal freedom.', scoreType: 'artistic', points: 4 }
    ]
  },
  {
    id: 'q41',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'TEACHING & MENTORSHIP: When you master a hard math or history chapter before anyone else in class:',
    options: [
      { id: 'q41_a', text: 'I naturally gather 4 classmates around my bench and teach them step-by-step until their doubts vanish.', scoreType: 'teaching', points: 5 },
      { id: 'q41_b', text: 'I quietly move on to the next advanced chapter to challenge my own mind.', scoreType: 'investigative', points: 4 },
      { id: 'q41_c', text: 'I write concise summary notes and sell or share them as study guides.', scoreType: 'enterprising', points: 4 },
      { id: 'q41_d', text: 'I keep my preparation private so I can score the highest marks in class.', scoreType: 'conventional', points: 3 }
    ]
  },
  {
    id: 'q42',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'CRIMINOLOGY & FORENSICS: If a sealed museum room was burgled without any doors being forced:',
    options: [
      { id: 'q42_a', text: 'I want to dust for microscopic fingerprint powders, examine laser trip sensors, and run DNA tests.', scoreType: 'investigative', points: 5 },
      { id: 'q42_b', text: 'I want to interrogate the night security guards and look for micro-tremors in their voices to catch the lie.', scoreType: 'social', points: 4 },
      { id: 'q42_c', text: 'I want to seal the town roads with armed patrol barricades to intercept the getaway vehicle.', scoreType: 'courage', points: 5 },
      { id: 'q42_d', text: 'I want to write the breaking news front-page article explaining how the heist shocked the nation.', scoreType: 'artistic', points: 4 }
    ]
  },
  {
    id: 'q43',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'VETERINARY & ANIMAL CARE: When a stray street dog or calf is injured with a bleeding wound:',
    options: [
      { id: 'q43_a', text: 'I immediately approach gently, clean the wound with antiseptic, bandage it, and feed the animal.', scoreType: 'realistic', points: 5 },
      { id: 'q43_b', text: 'I feel pity from a distance, but I am terrified of animals biting me or catching rabies.', scoreType: 'sensitive', points: 3 },
      { id: 'q43_c', text: 'I call the municipal animal welfare ambulance and follow up until they arrive.', scoreType: 'social', points: 4 },
      { id: 'q43_d', text: 'I research what antibiotic injection is scientifically required for that species.', scoreType: 'investigative', points: 4 }
    ]
  },
  {
    id: 'q44',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'JOURNALISM & MEDIA EXPOSÉ: When powerful individuals bribe officials to cover up illegal river pollution:',
    options: [
      { id: 'q44_a', text: 'I want to secretly record water samples, interview poisoned villagers, and publish an exposé.', scoreType: 'artistic', points: 5 },
      { id: 'q44_b', text: 'I want to file a public interest litigation (PIL) in the High Court and argue before the Chief Justice.', scoreType: 'courage', points: 5 },
      { id: 'q44_c', text: 'I want to build water filtration plants to purify the contaminated supply.', scoreType: 'realistic', points: 4 },
      { id: 'q44_d', text: 'I want to become the District Collector (IAS) and shut down the polluting factory with official orders.', scoreType: 'enterprising', points: 5 }
    ]
  },
  {
    id: 'q45',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'SPORTS & PHYSICAL TRAINING: In school physical education (PT) periods:',
    options: [
      { id: 'q45_a', text: 'I sprint, sweat, practice football/cricket tactics, and love physical exhaustion.', scoreType: 'realistic', points: 5 },
      { id: 'q45_b', text: 'I prefer sitting under a shady tree reading or discussing with friends.', scoreType: 'introvert', points: 4 },
      { id: 'q45_c', text: 'I enjoy acting as the referee, keeping score, and ensuring fair play rules.', scoreType: 'conventional', points: 4 },
      { id: 'q45_d', text: 'I coach weaker runners on their breathing rhythms and stride posture.', scoreType: 'teaching', points: 5 }
    ]
  },
  {
    id: 'q46',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'SPATIAL & ARCHITECTURAL AESTHETICS: When entering a newly built home or airport terminal:',
    options: [
      { id: 'q46_a', text: 'I notice the ceiling height, daylight angles, marble textures, and how the space makes people feel.', scoreType: 'artistic', points: 5 },
      { id: 'q46_b', text: 'I calculate the estimated construction cost and cement tonnage required.', scoreType: 'conventional', points: 4 },
      { id: 'q46_c', text: 'I inspect the fire emergency sprinkler pipes and structural pillar strength.', scoreType: 'realistic', points: 4 },
      { id: 'q46_d', text: 'I just look for where the free Wi-Fi and charging points are located.', scoreType: 'investigative', points: 3 }
    ]
  },
  {
    id: 'q47',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'MEDICINE & SURGERY: How do you react to the sight of surgical scalpels, stitches, and blood in a clinic?',
    options: [
      { id: 'q47_a', text: 'My hands remain completely steady; I am fascinated by anatomy, human organs, and surgical precision.', scoreType: 'investigative', points: 5 },
      { id: 'q47_b', text: 'I feel dizzy or faint at the sight of deep cuts and blood.', scoreType: 'sensitive', points: 4 },
      { id: 'q47_c', text: 'I care deeply about reassuring the patient’s worried family members in the waiting lobby.', scoreType: 'social', points: 5 },
      { id: 'q47_d', text: 'I am more interested in the hospital’s computerized MRI machines and diagnostic lasers.', scoreType: 'realistic', points: 4 }
    ]
  },
  {
    id: 'q48',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'LAW & CONSTITUTIONAL ARGUMENT: When two opposing viewpoints argue about capital punishment or internet bans:',
    options: [
      { id: 'q48_a', text: 'I dissect constitutional articles, cite precedent cases, and build bulletproof logical arguments.', scoreType: 'enterprising', points: 5 },
      { id: 'q48_b', text: 'I focus on the human emotional suffering on both sides of the issue.', scoreType: 'social', points: 4 },
      { id: 'q48_c', text: 'I check the crime rate statistics before and after the laws were introduced.', scoreType: 'investigative', points: 4 },
      { id: 'q48_d', text: 'I prefer enforcing whatever law is already on the statute book without endless debate.', scoreType: 'courage', points: 4 }
    ]
  },
  {
    id: 'q49',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'AGRICULTURE & BOTANY: Spending a full sunrise morning walking across rural farmland:',
    options: [
      { id: 'q49_a', text: 'I love the smell of fertile soil, inspecting crop leaves for pests, and seeing tractor mechanics.', scoreType: 'realistic', points: 5 },
      { id: 'q49_b', text: 'I think about how satellite weather forecasting and drone sensors could double crop yields.', scoreType: 'investigative', points: 5 },
      { id: 'q49_c', text: 'I find rural life too quiet and crave the high energy of city malls and metro stations.', scoreType: 'enterprising', points: 3 },
      { id: 'q49_d', text: 'I feel inspired to write poetry about rural tranquility and farmer resilience.', scoreType: 'artistic', points: 4 }
    ]
  },
  {
    id: 'q50',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'SPACE PROPULSION & SATELLITES: When you watch a Chandrayaan or SpaceX rocket launching into orbit:',
    options: [
      { id: 'q50_a', text: 'I want to calculate the cryogenic thrust equations, stage separation aerodynamics, and orbital trajectory.', scoreType: 'investigative', points: 5 },
      { id: 'q50_b', text: 'I wonder how much money the satellite payload will save for telecommunications and weather alerts.', scoreType: 'conventional', points: 4 },
      { id: 'q50_c', text: 'I feel a patriotic surge seeing our national tricolor flag painted on the rocket fuselage.', scoreType: 'courage', points: 5 },
      { id: 'q50_d', text: 'I photograph the flame plume against the night sky and marvel at the visual beauty.', scoreType: 'artistic', points: 4 }
    ]
  },
  {
    id: 'q51',
    pillar: 'Vocational Interests (RIASEC)',
    pillarCode: 'riasec',
    prompt: 'ENTREPRENEURIAL RISK: If you had ₹50,000 saved up at age 18:',
    options: [
      { id: 'q51_a', text: 'I would buy raw materials, hire 2 friends, and launch a small business selling a unique product.', scoreType: 'enterprising', points: 5 },
      { id: 'q51_b', text: 'I would deposit it into a guaranteed government fixed deposit (FD) earning 7% interest.', scoreType: 'conventional', points: 5 },
      { id: 'q51_c', text: 'I would donate half to a village animal shelter and use the rest to buy books.', scoreType: 'social', points: 4 },
      { id: 'q51_d', text: 'I would buy electronic toolkits, Raspberry Pi chips, or rocketry simulation kits.', scoreType: 'investigative', points: 5 }
    ]
  },

  // ==========================================
  // PILLAR 5: TEAMWORK, LEADERSHIP & GROUP DYNAMICS (12 QUESTIONS)
  // ==========================================
  {
    id: 'q52',
    pillar: 'Group Dynamics & Teamwork',
    pillarCode: 'teamwork',
    prompt: 'In a group of 5 students assigned to build a science working model:',
    options: [
      { id: 'q52_a', text: 'I naturally take charge: assign roles, set deadlines, and keep the team focused on victory.', scoreType: 'leadership', points: 5 },
      { id: 'q52_b', text: 'I happily take my assigned portion, go to my desk, and execute it with 100% accuracy.', scoreType: 'conscientious', points: 4 },
      { id: 'q52_c', text: 'I make sure everyone in the group feels heard and nobody feels left out or ignored.', scoreType: 'empathy', points: 5 },
      { id: 'q52_d', text: 'I bring the creative, crazy ideas that make our model look spectacular and unique.', scoreType: 'artistic', points: 5 }
    ]
  },
  {
    id: 'q53',
    pillar: 'Group Dynamics & Teamwork',
    pillarCode: 'teamwork',
    prompt: 'When two members of your project team get into a shouting match over whose idea is better:',
    options: [
      { id: 'q53_a', text: 'I create a calm compromise that blends the best parts of both concepts.', scoreType: 'empathy', points: 5 },
      { id: 'q53_b', text: 'I call for an objective vote based on hard facts and time feasibility.', scoreType: 'logic', points: 4 },
      { id: 'q53_c', text: 'I step in authoritatively and dictate the final decision as team captain.', scoreType: 'courage', points: 5 },
      { id: 'q53_d', text: 'I let them fight it out while I quietly keep working on the presentation slides.', scoreType: 'introvert', points: 3 }
    ]
  },
  {
    id: 'q54',
    pillar: 'Group Dynamics & Teamwork',
    pillarCode: 'teamwork',
    prompt: 'When your team wins first prize in an inter-school competition:',
    options: [
      { id: 'q54_a', text: 'I make sure the quietest member who worked in the background gets the trophy and spotlight.', scoreType: 'empathy', points: 5 },
      { id: 'q54_b', text: 'I proudly hold the trophy and give the victory speech on behalf of the squad.', scoreType: 'enterprising', points: 5 },
      { id: 'q54_c', text: 'I analyze what small errors we still made so we can perform even better in state finals.', scoreType: 'logic', points: 4 },
      { id: 'q54_d', text: 'I celebrate with loud cheers, high-fives, and team snacks.', scoreType: 'extravert', points: 4 }
    ]
  },
  {
    id: 'q55',
    pillar: 'Group Dynamics & Teamwork',
    pillarCode: 'teamwork',
    prompt: 'If you realize the team leader has chosen a completely flawed strategy that will cause failure:',
    options: [
      { id: 'q55_a', text: 'I speak up immediately and respectfully present mathematical/logical proof of why it will fail.', scoreType: 'logic', points: 5 },
      { id: 'q55_b', text: 'I take the leader aside privately so I don’t embarrass them in front of the others.', scoreType: 'empathy', points: 5 },
      { id: 'q55_c', text: 'I rally the other members to demand a change of command.', scoreType: 'courage', points: 4 },
      { id: 'q55_d', text: 'I keep silent because they are the appointed authority and I follow chain of command.', scoreType: 'conventional', points: 3 }
    ]
  },
  {
    id: 'q56',
    pillar: 'Group Dynamics & Teamwork',
    pillarCode: 'teamwork',
    prompt: 'Do you work better alone in deep silence or surrounded by an energetic, chatting team?',
    options: [
      { id: 'q56_a', text: 'Completely alone in silence. Constant noise and interruptions ruin my deep thinking.', scoreType: 'introvert', points: 5 },
      { id: 'q56_b', text: 'Surrounded by people! Brainstorming aloud and bouncing thoughts off teammates gives me energy.', scoreType: 'extravert', points: 5 },
      { id: 'q56_c', text: 'A hybrid: brainstorming with a group for 30 minutes, then going alone to finish my portion.', scoreType: 'conscientious', points: 4 },
      { id: 'q56_d', text: 'Outdoors in motion, doing physical tasks with teammates.', scoreType: 'tactical', points: 5 }
    ]
  },
  {
    id: 'q57',
    pillar: 'Group Dynamics & Teamwork',
    pillarCode: 'teamwork',
    prompt: 'When someone in your peer group is feeling left out and sitting quietly in a corner during lunch:',
    options: [
      { id: 'q57_a', text: 'I walk over, sit next to them, share my food, and ask how their day is going.', scoreType: 'empathy', points: 5 },
      { id: 'q57_b', text: 'I wave at them and shout across the canteen to come sit at the big table.', scoreType: 'extravert', points: 4 },
      { id: 'q57_c', text: 'I assume they enjoy their private alone time and respect their space.', scoreType: 'introvert', points: 4 },
      { id: 'q57_d', text: 'I invite them to join our team game of volleyball or badminton.', scoreType: 'tactical', points: 4 }
    ]
  },
  {
    id: 'q58',
    pillar: 'Group Dynamics & Teamwork',
    pillarCode: 'teamwork',
    prompt: 'What kind of leader do you respect the most?',
    options: [
      { id: 'q58_a', text: 'The commander who leads from the front in mud and rain, sharing every hardship with their team.', scoreType: 'courage', points: 5 },
      { id: 'q58_b', text: 'The brilliant scientist or aerospace pioneer whose deep intellect solves impossible technical riddles.', scoreType: 'investigative', points: 5 },
      { id: 'q58_c', text: 'The compassionate mentor who nurtures everyone’s personal growth and emotional well-being.', scoreType: 'teaching', points: 5 },
      { id: 'q58_d', text: 'The charismatic orator who inspires millions and wins tough negotiations.', scoreType: 'enterprising', points: 4 }
    ]
  },
  {
    id: 'q59',
    pillar: 'Group Dynamics & Teamwork',
    pillarCode: 'teamwork',
    prompt: 'DELEGATION: When you are leading a project, how comfortable are you assigning tasks to others?',
    options: [
      { id: 'q59_a', text: 'Very comfortable. I assess each person’s unique strength and trust them to deliver.', scoreType: 'leadership', points: 5 },
      { id: 'q59_b', text: 'Difficult for me. I fear they won’t do it properly, so I end up doing too much myself.', scoreType: 'conscientious', points: 4 },
      { id: 'q59_c', text: 'I coach them patiently on how to do it before stepping back.', scoreType: 'teaching', points: 5 },
      { id: 'q59_d', text: 'I prefer when everyone just chooses whatever task they feel like doing.', scoreType: 'spontaneous', points: 3 }
    ]
  },
  {
    id: 'q60',
    pillar: 'Group Dynamics & Teamwork',
    pillarCode: 'teamwork',
    prompt: 'FEEDBACK DELIVERY: How do you deliver constructive criticism to a peer whose work was sloppy?',
    options: [
      { id: 'q60_a', text: 'Sandwich method: praise their effort first, point out the specific error gently, then encourage them.', scoreType: 'empathy', points: 5 },
      { id: 'q60_b', text: 'Direct and blunt: "This does not meet standard quality. Redo section 2 by 4 PM."', scoreType: 'courage', points: 4 },
      { id: 'q60_c', text: 'I sit beside them and tutor them through the fix together.', scoreType: 'teaching', points: 5 },
      { id: 'q60_d', text: 'I find it hard to give negative feedback because I don’t want to hurt their feelings.', scoreType: 'sensitive', points: 4 }
    ]
  },
  {
    id: 'q61',
    pillar: 'Group Dynamics & Teamwork',
    pillarCode: 'teamwork',
    prompt: 'PEER PRESSURE RESISTANCE: When everyone in your friend circle is doing something you know is wrong or dangerous:',
    options: [
      { id: 'q61_a', text: 'I stand completely firm on my principles, say "NO" loudly, and try to stop them.', scoreType: 'courage', points: 5 },
      { id: 'q61_b', text: 'I quietly excuse myself and walk away without confronting them.', scoreType: 'introvert', points: 4 },
      { id: 'q61_c', text: 'I logically explain the exact legal or health consequences of their foolish act.', scoreType: 'logic', points: 4 },
      { id: 'q61_d', text: 'I feel tremendous pressure inside and struggle to say no.', scoreType: 'sensitive', points: 4 }
    ]
  },
  {
    id: 'q62',
    pillar: 'Group Dynamics & Teamwork',
    pillarCode: 'teamwork',
    prompt: 'PUBLIC SPEAKING & PERSUASION: When asked to pitch an idea to convince school authorities:',
    options: [
      { id: 'q62_a', text: 'I structure a compelling story with emotional appeal and clear benefits that wins them over.', scoreType: 'enterprising', points: 5 },
      { id: 'q62_b', text: 'I present hard data charts, cost calculations, and comparative case studies.', scoreType: 'logic', points: 5 },
      { id: 'q62_c', text: 'I prefer bringing a live working prototype that demonstrates itself visually.', scoreType: 'realistic', points: 4 },
      { id: 'q62_d', text: 'I prefer letting someone else do the speaking while I prepare the research documents.', scoreType: 'introvert', points: 4 }
    ]
  },
  {
    id: 'q63',
    pillar: 'Group Dynamics & Teamwork',
    pillarCode: 'teamwork',
    prompt: 'HUMOR IN GROUPS: What role does humor play in your daily interactions with peers?',
    options: [
      { id: 'q63_a', text: 'I am often the witty one cracking clever jokes, lightening tension, and keeping the squad laughing.', scoreType: 'extravert', points: 5 },
      { id: 'q63_b', text: 'I enjoy laughing at good jokes, but I am usually more serious, thoughtful, and observant.', scoreType: 'introvert', points: 4 },
      { id: 'q63_c', text: 'I use humor carefully to put nervous people at ease during tense meetings.', scoreType: 'empathy', points: 4 },
      { id: 'q63_d', text: 'I prefer deep philosophical conversations over lighthearted banter.', scoreType: 'investigative', points: 4 }
    ]
  },

  // ==========================================
  // PILLAR 6: WORK ENVIRONMENTS, LIFE VALUES & PURPOSE (12 QUESTIONS)
  // ==========================================
  {
    id: 'q64',
    pillar: 'Work Environment & Life Purpose',
    pillarCode: 'purpose',
    prompt: 'WORKPLACE PREFERENCE: If you had to choose where you spend 40 hours every week for the next 15 years:',
    options: [
      { id: 'q64_a', text: 'Active outdoors: military outposts, sports stadiums, wildlife sanctuaries, or rocket launch pads.', scoreType: 'tactical', points: 5 },
      { id: 'q64_b', text: 'A clean, modern corporate tower in Gurgaon or Bangalore with high-speed computers and meeting rooms.', scoreType: 'enterprising', points: 4 },
      { id: 'q64_c', text: 'A quiet consulting room or clinic counseling people one-on-one.', scoreType: 'social', points: 5 },
      { id: 'q64_d', text: 'A high-tech cleanroom laboratory with wind tunnels, microscopes, or satellite testing fixtures.', scoreType: 'investigative', points: 5 },
      { id: 'q64_e', text: 'A creative studio filled with sketchpads, cameras, editing screens, and music instruments.', scoreType: 'artistic', points: 5 }
    ]
  },
  {
    id: 'q65',
    pillar: 'Work Environment & Life Purpose',
    pillarCode: 'purpose',
    prompt: 'PRIME MOTIVATOR: When you look back at age 70, which accomplishment will matter to you the most?',
    options: [
      { id: 'q65_a', text: 'Serving my country with supreme honor and protecting innocent lives from danger.', scoreType: 'courage', points: 5 },
      { id: 'q65_b', text: 'Designing spacecraft, discovering new scientific truth, or engineering breakthroughs for humanity.', scoreType: 'investigative', points: 5 },
      { id: 'q65_c', text: 'Healing thousands of suffering patients or mentoring thousands of young students to great futures.', scoreType: 'social', points: 5 },
      { id: 'q65_d', text: 'Building financial abundance, owning beautiful properties, and ensuring immense family wealth.', scoreType: 'enterprising', points: 5 }
    ]
  },
  {
    id: 'q66',
    pillar: 'Work Environment & Life Purpose',
    pillarCode: 'purpose',
    prompt: 'MONEY VS FREEDOM: Which equation would you choose if forced to decide right now?',
    options: [
      { id: 'q66_a', text: 'A high salary (₹30 LPA) with strict 12-hour workdays, rigid company hierarchy, and little free time.', scoreType: 'enterprising', points: 4 },
      { id: 'q66_b', text: 'A respectable salary (₹12 LPA) with huge personal autonomy, 2-month summer breaks, and time for research/family.', scoreType: 'teaching', points: 5 },
      { id: 'q66_c', text: 'Government gazetted scientist or civil rank with official quarters, security, and prestige.', scoreType: 'courage', points: 5 },
      { id: 'q66_d', text: 'Freelance creative freedom where my income fluctuates, but I choose which documentary/art projects I do.', scoreType: 'artistic', points: 5 }
    ]
  },
  {
    id: 'q67',
    pillar: 'Work Environment & Life Purpose',
    pillarCode: 'purpose',
    prompt: 'GLOBAL POSTINGS: How eager are you to study or work in foreign countries (USA, UK, Singapore, Europe)?',
    options: [
      { id: 'q67_a', text: 'Very eager! I dream of studying at Oxford, MIT, Caltech, or Stanford and exploring international career markets.', scoreType: 'openness', points: 5 },
      { id: 'q67_b', text: 'I want to study abroad to gain elite skills, but then return to build and serve my motherland India.', scoreType: 'courage', points: 5 },
      { id: 'q67_c', text: 'I prefer staying in India close to my parents, native culture, and local community.', scoreType: 'social', points: 4 },
      { id: 'q67_d', text: 'I am equally open to both; wherever I find the highest intellectual challenge.', scoreType: 'investigative', points: 4 }
    ]
  },
  {
    id: 'q68',
    pillar: 'Work Environment & Life Purpose',
    pillarCode: 'purpose',
    prompt: 'DEALING WITH REPETITION: How do you handle doing the exact same manual calculation 50 times in a row?',
    options: [
      { id: 'q68_a', text: 'I maintain intense concentration and catch every single deviation; precision gives me satisfaction.', scoreType: 'conventional', points: 5 },
      { id: 'q68_b', text: 'My brain rebels after the 3rd repetition; I must automate it or do something creative.', scoreType: 'investigative', points: 4 },
      { id: 'q68_c', text: 'I do it if required, but prefer engaging with living human beings.', scoreType: 'social', points: 3 },
      { id: 'q68_d', text: 'I prefer physical movement over repetitive paperwork.', scoreType: 'tactical', points: 4 }
    ]
  },
  {
    id: 'q69',
    pillar: 'Work Environment & Life Purpose',
    pillarCode: 'purpose',
    prompt: 'EXPOSURE TO CRIME & TRAGEDY: Could you handle examining a crime scene or treating severe accident trauma daily?',
    options: [
      { id: 'q69_a', text: 'Yes. I possess strong psychological compartmentalization; I remain calm and focus on evidence and duty.', scoreType: 'courage', points: 5 },
      { id: 'q69_b', text: 'No. Seeing human bloodshed and violence would give me recurring nightmares and break my spirit.', scoreType: 'sensitive', points: 5 },
      { id: 'q69_c', text: 'I could handle the psychological side (hearing their stories) rather than the physical gore.', scoreType: 'social', points: 5 },
      { id: 'q69_d', text: 'I can handle it if I am in the laboratory examining physical test tubes, not the active scene.', scoreType: 'investigative', points: 4 }
    ]
  },
  {
    id: 'q70',
    pillar: 'Work Environment & Life Purpose',
    pillarCode: 'purpose',
    prompt: 'COMMUNITY & ROOTS: What is your perspective on helping rural and tier-3 towns in India?',
    options: [
      { id: 'q70_a', text: 'Deeply committed. Real India lives in villages; improving rural schools, farming, and health is my dream.', scoreType: 'social', points: 5 },
      { id: 'q70_b', text: 'I believe developing mega-city infrastructure, tech hubs, and capital markets will lift the whole nation.', scoreType: 'enterprising', points: 4 },
      { id: 'q70_c', text: 'I want to modernise agriculture through satellite drones and soil robotics.', scoreType: 'realistic', points: 5 },
      { id: 'q70_d', text: 'I want to ensure constitutional rule of law and police protection reach every remote corner.', scoreType: 'courage', points: 5 }
    ]
  },
  {
    id: 'q71',
    pillar: 'Work Environment & Life Purpose',
    pillarCode: 'purpose',
    prompt: 'CONTINUOUS STUDY: In careers like Medicine, Law, and Advanced Aerospace Engineering, you must study new books even at age 45:',
    options: [
      { id: 'q71_a', text: 'I love that! Being a perpetual student and reading new research forever sounds wonderful.', scoreType: 'investigative', points: 5 },
      { id: 'q71_b', text: 'I want to finish college studies by age 23 and then just practice practical real-world work.', scoreType: 'enterprising', points: 4 },
      { id: 'q71_c', text: 'I prefer physical training and hands-on skill mastery over continuous theoretical reading.', scoreType: 'tactical', points: 4 },
      { id: 'q71_d', text: 'I enjoy teaching what I know more than reading dense academic journals.', scoreType: 'teaching', points: 4 }
    ]
  },
  {
    id: 'q72',
    pillar: 'Work Environment & Life Purpose',
    pillarCode: 'purpose',
    prompt: 'STABILITY VS REWARD: Between a guaranteed government pension job vs a high-risk tech startup with stock options:',
    options: [
      { id: 'q72_a', text: 'Government job: Lifetime security, medical benefits, and social respect mean everything to me.', scoreType: 'conventional', points: 5 },
      { id: 'q72_b', text: 'Startup / Private: High ceiling, limitless wealth potential, and merit-based growth excite me.', scoreType: 'enterprising', points: 5 },
      { id: 'q72_c', text: 'Military / Space Scientist / Civil Services: National pride and serving the motherland come first.', scoreType: 'courage', points: 5 },
      { id: 'q72_d', text: 'Independent clinic or consulting practice where I am my own boss helping people.', scoreType: 'social', points: 4 }
    ]
  },
  {
    id: 'q73',
    pillar: 'Work Environment & Life Purpose',
    pillarCode: 'purpose',
    prompt: 'FITNESS & PHYSICAL DISCIPLINE: How important is daily physical exercise, running, or martial arts to you?',
    options: [
      { id: 'q73_a', text: 'Non-negotiable part of who I am. Physical fitness keeps my mind sharp, disciplined, and energized.', scoreType: 'tactical', points: 5 },
      { id: 'q73_b', text: 'I exercise occasionally when I feel sluggish, but my main focus is on mental and academic work.', scoreType: 'investigative', points: 4 },
      { id: 'q73_c', text: 'I prefer mental yoga, meditation, and quiet breathing over intense sweating and pushups.', scoreType: 'empathy', points: 4 },
      { id: 'q73_d', text: 'I honestly find intense exercise exhausting and avoid it when possible.', scoreType: 'introvert', points: 3 }
    ]
  },
  {
    id: 'q74',
    pillar: 'Work Environment & Life Purpose',
    pillarCode: 'purpose',
    prompt: 'IMPACT OVER INCOME: Would you accept a career that pays a modest salary if you were transforming 100 lives every month?',
    options: [
      { id: 'q74_a', text: 'Yes, 100%! Making a genuine difference in human lives brings genuine happiness that money cannot buy.', scoreType: 'social', points: 5 },
      { id: 'q74_b', text: 'No. I want to earn significant wealth first so I have financial security, then do philanthropy later.', scoreType: 'enterprising', points: 5 },
      { id: 'q74_c', text: 'I want a role that balances decent compensation with meaningful national duty.', scoreType: 'courage', points: 5 },
      { id: 'q74_d', text: 'I care mostly about whether my intellectual curiosity is satisfied every day.', scoreType: 'investigative', points: 4 }
    ]
  },
  {
    id: 'q75',
    pillar: 'Work Environment & Life Purpose',
    pillarCode: 'purpose',
    prompt: 'FINAL SELF-HONEST REFLECTION: When you think about stepping out into the real world as a young adult:',
    options: [
      { id: 'q75_a', text: 'I feel ready to face tough battles with courage, discipline, and protect those who depend on me.', scoreType: 'courage', points: 5 },
      { id: 'q75_b', text: 'I feel deep empathy for the suffering in society and want to dedicate my life to healing and counseling.', scoreType: 'social', points: 5 },
      { id: 'q75_c', text: 'I want to master science, solve deep technical and math mysteries, and build the future.', scoreType: 'investigative', points: 5 },
      { id: 'q75_d', text: 'I want to build organizations, master economics and law, and lead communities with authority.', scoreType: 'enterprising', points: 5 }
    ]
  }
];

// ==========================================
// 15 COMPREHENSIVE CAREER PROFILES
// ==========================================
const CAREER_DATABASE = {
  'aerospace_engineer': {
    id: 'aerospace_engineer',
    title: 'Aerospace, Rocket Propulsion & Satellite Systems Engineer',
    category: 'Space Exploration, Aerodynamics & Satellite Defense',
    iconName: 'Rocket',
    idealTraits: ['logic', 'investigative'],
    description: 'You design and manufacture rockets, satellite constellations, supersonic aircraft, and space exploration probes. You work on thermodynamics, propulsion fuels, orbital mechanics, and spacecraft structural resilience.',
    dailyLife: 'Running wind tunnel simulations, writing CFD (Computational Fluid Dynamics) code, testing liquid propulsion rocket engines, analyzing telemetry data, and assembling satellite avionics.',
    salaryIndia: '₹8,00,000 to ₹35,00,000+ per year (ISRO Scientist/Engineer \'SC\' grade offers gazetted rank with official quarters; private space startups like Skyroot & Agnikul offer ₹12–25 LPA).',
    salaryAbroad: '$105,000 to $220,000+ per year (NASA, ESA, SpaceX, Blue Origin, Boeing, Airbus, Rolls-Royce Aerospace).',
    highSchoolStream: '11th & 12th in Science with Physics, Chemistry, and Mathematics (PCM).',
    indianPathways: [
      'Indian Institute of Space Science and Technology (IIST Thiruvananthapuram - direct recruitment pipeline to ISRO)',
      'Indian Institutes of Technology (IIT Bombay, IIT Madras, IIT Kanpur, IIT Kharagpur - B.Tech Aerospace)',
      'Madras Institute of Technology (MIT Chromepet, Anna University - Dr. APJ Abdul Kalam\'s alma mater)'
    ],
    globalPathways: [
      'Massachusetts Institute of Technology (MIT AeroAstro - USA)',
      'California Institute of Technology (Caltech / JPL - USA)',
      'Delft University of Technology (TU Delft - Netherlands)',
      'Cranfield University (UK - Aerospace Excellence)'
    ],
    keyEntranceExams: 'JEE Advanced (for IITs and IIST), JEE Main, GATE (Aerospace Engineering), GRE & TOEFL/IELTS for overseas MS/Ph.D.',
    employers: ['ISRO (Indian Space Research Organisation)', 'DRDO', 'Skyroot Aerospace', 'Agnikul Cosmos', 'HAL', 'Boeing', 'Airbus']
  },

  'army_defence_officer': {
    id: 'army_defence_officer',
    title: 'Indian Armed Forces Officer (Army / Navy / Air Force)',
    category: 'National Defence, Tactical Strategy & Armed Command',
    iconName: 'Shield',
    idealTraits: ['courage', 'tactical'],
    description: 'You command platoons, warships, or supersonic fighter squadrons. You lead soldiers with discipline, make split-second tactical decisions under fire, and safeguard national borders during wartime and disaster relief.',
    dailyLife: 'Early morning physical PT drills, weapons inspection, tactical maneuvers, border reconnaissance, battalion troop administration, and crisis strategy exercises.',
    salaryIndia: '₹9,50,000 to ₹34,00,000+ per year (Lieutenant to Brigadier/General) + Free Officer bungalow, military hospital care, ration allowances, and lifetime defense benefits.',
    salaryAbroad: 'United Nations (UN) Peacekeeping Missions ($85,000 to $145,000 tax-free allowances) and international military diplomatic postings in Indian Embassies worldwide.',
    highSchoolStream: '11th & 12th in Science (PCM) is required for Air Force & Navy wings. Any stream (Science, Commerce, or Arts) is eligible for the Indian Army wing.',
    indianPathways: [
      'National Defence Academy (NDA, Khadakwasla, Pune) - right after 12th',
      'Combined Defence Services (CDS) / IMA Dehradun / OTA Chennai - post graduation',
      'Technical Entry Scheme (TES) - direct SSB based on 12th PCM marks',
      'Air Force Academy (AFA Dundigal) & Indian Naval Academy (INA Ezhimala)'
    ],
    globalPathways: [
      'Royal Military Academy Sandhurst (United Kingdom) - officer exchange courses',
      'United States Military Academy (West Point, USA) - joint strategic defense symposiums',
      'Defence Services Staff College (DSSC) international command modules'
    ],
    keyEntranceExams: 'NDA Exam (UPSC), CDS Exam (UPSC), AFCAT (Air Force), 5-Day SSB Interview, CPSS Pilot Aptitude Test.',
    employers: ['Indian Army', 'Indian Air Force', 'Indian Navy', 'Coast Guard', 'Paramilitary (NSG, Assam Rifles, BSF)']
  },

  'clinical_psychologist': {
    id: 'clinical_psychologist',
    title: 'Clinical Psychologist & Mental Health Psychotherapist',
    category: 'Mental Healthcare, Behavioral Science & Neuropsychology',
    iconName: 'Heart',
    idealTraits: ['empathy', 'social'],
    description: 'You understand the deep inner workings of the human mind. You diagnose mental health disorders, counsel individuals through depression, grief, anxiety, and trauma, administer psychometric tests, and restore peace to troubled lives.',
    dailyLife: 'Conducting one-on-one 50-minute clinical therapy sessions, psychometric diagnostic evaluations, cognitive behavioral therapy (CBT), and family counseling.',
    salaryIndia: '₹6,00,000 to ₹25,00,000+ per year (Established private clinical consultants earn ₹1,500 to ₹3,500 per therapy hour).',
    salaryAbroad: '$90,000 to $165,000 per year (High global demand across UK National Health Service - NHS, Canada, Australia, and USA).',
    highSchoolStream: 'Any stream in 11th & 12th with Psychology as an elective (Humanities or Science with Biology is particularly advantageous).',
    indianPathways: [
      'National Institute of Mental Health and Neurosciences (NIMHANS, Bengaluru)',
      'Tata Institute of Social Sciences (TISS, Mumbai)',
      'Delhi University (Lady Shri Ram College / Daulat Ram College) BA/BSc Psychology',
      'Central Institute of Psychiatry (CIP, Ranchi) for M.Phil in Clinical Psychology'
    ],
    globalPathways: [
      'University of Oxford - Department of Experimental Psychology (UK)',
      'Harvard University - Department of Psychology (USA)',
      'University of Melbourne - School of Psychological Sciences (Australia)',
      'University of British Columbia (Canada)'
    ],
    keyEntranceExams: 'CUET-UG (for Central Universities), NIMHANS M.Phil Entrance Exam, TISS-NET, GRE Psychology Subject Test.',
    employers: ['NIMHANS', 'Private Mental Wellness Clinics', 'Top Multispecialty Hospitals', 'Schools & Universities', 'Corporate Wellness Divisions']
  },

  'education_professor': {
    id: 'education_professor',
    title: 'University Professor, School Educator & EdTech Scholar',
    category: 'Academic Research, Teaching & Educational Leadership',
    iconName: 'BookOpen',
    idealTraits: ['teaching', 'social'],
    description: 'You shape the intellect and character of the next generation. You make complex concepts accessible, mentor aspiring students, conduct research, write textbooks, and reform educational curricula.',
    dailyLife: 'Delivering interactive lectures, guiding student dissertations, assessing research papers, planning innovative lab workshops, and heading academic committees.',
    salaryIndia: '₹6,50,000 to ₹22,00,000+ per year (UGC 7th Pay Commission pay scales with university quarters and long vacation benefits).',
    salaryAbroad: '$75,000 to $165,000 per year (Tenured university professors and international school educators in Europe, Singapore, UAE, and USA).',
    highSchoolStream: 'Any stream (Science, Commerce, or Humanities) matching the subject you are passionate about teaching.',
    indianPathways: [
      'Regional Institutes of Education (RIE, NCERT - integrated B.Ed/B.Sc/B.A)',
      'Delhi University (Central Institute of Education - CIE)',
      'Jawaharlal Nehru University (JNU New Delhi) for Master\'s & Ph.D.',
      'Indian Institute of Science (IISc Bengaluru) & Top Central Universities'
    ],
    globalPathways: [
      'University of Cambridge Faculty of Education (UK)',
      'Columbia University Teachers College (New York, USA)',
      'National Institute of Education (NIE, NTU Singapore)'
    ],
    keyEntranceExams: 'CUET-UG/PG, UGC-NET / CSIR-NET (for Assistant Professorship & JRF), CTET (Central Teacher Eligibility Test).',
    employers: ['Central Universities (DU, JNU, BHU)', 'IITs and NITs (Humanities/Sciences departments)', 'Kendriya Vidyalayas & Top International Schools', 'NCERT / EdTech Platforms']
  },

  'civil_services_ias': {
    id: 'civil_services_ias',
    title: 'District Magistrate (IAS / IPS / IFS) & Public Administrator',
    category: 'Civil Administration, Public Governance & Foreign Diplomacy',
    iconName: 'Landmark',
    idealTraits: ['courage', 'enterprising'],
    description: 'You hold supreme executive authority over entire districts. You manage police law and order, direct flood relief, oversee rural hospitals and schools, collect revenue, and convert government budgets into real development for millions.',
    dailyLife: 'Chairing district development meetings, reviewing police and revenue court disputes, conducting field inspections of schools and hospitals, and advising state ministries.',
    salaryIndia: '₹9,50,000 to ₹28,00,000+ per year (7th Pay Commission + VIP government bungalow, armed security escort, official car, and immense administrative authority).',
    salaryAbroad: 'Indian Foreign Service (IFS) Ambassadors and High Commissioners posted across Europe, Americas, Asia, and the United Nations headquarters.',
    highSchoolStream: 'Any stream in 11th & 12th (Arts, Science, or Commerce). Consistent general reading and analytical writing habits are paramount.',
    indianPathways: [
      'Lal Bahadur Shastri National Academy of Administration (LBSNAA, Mussoorie) - post-UPSC training',
      'Undergraduate degree from any recognized university (Delhi University, St. Stephen’s, IITs, NLUs, etc.)',
      'National Police Academy (SVPNPA, Hyderabad) for IPS Officers'
    ],
    globalPathways: [
      'Harvard Kennedy School of Government (USA) - mid-career fellowships',
      'Blavatnik School of Government, Oxford University (UK) - policy exchanges'
    ],
    keyEntranceExams: 'UPSC Civil Services Examination (CSE - Prelims, Mains, and Interview), State Public Service Commissions (State PCS).',
    employers: ['Government of India', 'State Government Secretariats', 'Cabinet Secretariat', 'United Nations Agencies', 'Ministry of External Affairs']
  },

  'cs_ai_engineer': {
    id: 'cs_ai_engineer',
    title: 'Computer Science, AI & Cyber Defense Architect',
    category: 'Software Systems, Artificial Intelligence & Cloud Security',
    iconName: 'Zap',
    idealTraits: ['logic', 'investigative'],
    description: 'You design intelligent neural networks, build scalable cloud architecture, engineer autonomous robots, and safeguard critical banking and national infrastructure against sophisticated cyber attacks.',
    dailyLife: 'Writing and optimizing algorithms, testing machine learning models, deploying microservices on cloud infrastructure, and conducting cyber security penetration testing.',
    salaryIndia: '₹8,50,000 to ₹48,00,000+ per year (₹70,000 to ₹4,00,000 per month; top tech architects command packages over ₹70 LPA).',
    salaryAbroad: '$115,000 to $260,000+ per year (Silicon Valley, Seattle, Munich, London, Singapore, Toronto).',
    highSchoolStream: '11th & 12th in Science with Physics, Chemistry, and Mathematics (PCM).',
    indianPathways: [
      'Indian Institutes of Technology (IIT Bombay, IIT Delhi, IIT Madras)',
      'National Institutes of Technology (NIT Trichy, NIT Surathkal)',
      'BITS Pilani & International Institute of Information Technology (IIIT Hyderabad)',
      'Top State Government Engineering Colleges'
    ],
    globalPathways: [
      'Massachusetts Institute of Technology (MIT) - USA',
      'Stanford University - USA',
      'National University of Singapore (NUS) - Singapore',
      'Technical University of Munich (TUM) - Germany'
    ],
    keyEntranceExams: 'JEE Main, JEE Advanced, BITSAT, State CETs; for study abroad: SAT, IELTS / TOEFL, GRE.',
    employers: ['Google', 'Microsoft', 'NVIDIA', 'ISRO', 'Amazon', 'Government Cyber Defense Cells']
  },

  'investigative_journalism': {
    id: 'investigative_journalism',
    title: 'Investigative Journalist, Documentary Filmmaker & News Anchor',
    category: 'Mass Media, Investigative Reporting & Documentary Direction',
    iconName: 'Radio',
    idealTraits: ['artistic', 'courage'],
    description: 'You uncover hidden truths, hold powerful corporations and politicians accountable, report from ground zero during crises, and amplify the voices of marginalized communities through print, video, and digital media.',
    dailyLife: 'Conducting confidential source interviews, verifying leaked records, filing RTI inquiries, filming ground documentaries, writing exposés, and presenting primetime broadcasts.',
    salaryIndia: '₹5,50,000 to ₹28,00,000+ per year (Senior investigative editors and primetime anchors command substantial packages).',
    salaryAbroad: '$70,000 to $155,000 per year (Global organizations: BBC News, Reuters, Al Jazeera, Bloomberg, The New York Times).',
    highSchoolStream: 'Any stream in 11th & 12th (Humanities, English Literature, Political Science, or Commerce).',
    indianPathways: [
      'Indian Institute of Mass Communication (IIMC, New Delhi)',
      'Asian College of Journalism (ACJ, Chennai)',
      'AJK Mass Communication Research Centre (MCRC, Jamia Millia Islamia)',
      'Symbiosis Institute of Media and Communication (SIMC, Pune)'
    ],
    globalPathways: [
      'Columbia University Graduate School of Journalism (New York, USA)',
      'London School of Economics - Media & Communications (UK)',
      'University of California, Berkeley - Graduate School of Journalism'
    ],
    keyEntranceExams: 'IIMC Entrance Exam, ACJ Entrance Exam, CUET-PG (Mass Communication), SAT/GRE & Portfolio Review.',
    employers: ['BBC News', 'The Hindu / Indian Express', 'Reuters', 'NDTV / Republic Media', 'Independent Documentary Studios', 'Digital Media Outlets']
  },

  'forensic_criminology': {
    id: 'forensic_criminology',
    title: 'Forensic Scientist, Ballistics Expert & Crime Scene Investigator',
    category: 'Criminology, DNA Forensics & Criminal Investigation',
    iconName: 'Microscope',
    idealTraits: ['investigative', 'logic'],
    description: 'You use modern scientific chemistry, DNA profiling, ballistics analysis, and cyber forensics to solve mysterious murders, cyber frauds, and complex crimes for police and national intelligence bureaus.',
    dailyLife: 'Examining crime scenes, collecting latent fingerprints and chemical samples, running gas chromatography and DNA sequencers in laboratories, and testifying as an expert witness in High Courts.',
    salaryIndia: '₹6,00,000 to ₹22,00,000+ per year (Central and State Government Forensic Science Laboratories offer gazetted scientific officer posts).',
    salaryAbroad: '$80,000 to $145,000 per year (High demand in FBI Laboratories, UK Police Forensics, Interpol, and European Forensic Institutes).',
    highSchoolStream: '11th & 12th in Science with Chemistry, Biology, and Physics (PCB / PCMB).',
    indianPathways: [
      'National Forensic Sciences University (NFSU, Gandhinagar) - World’s premier forensics institution',
      'Central Forensic Science Laboratories (CFSL Chandigarh, Hyderabad, Kolkata)',
      'Dr. Harisingh Gour Vishwavidyalaya (Sagar, MP) - Forensic Science Department',
      'Amity Institute of Forensic Sciences'
    ],
    globalPathways: [
      'King’s College London - Forensic Science & Analytical Toxicology (UK)',
      'University of Strathclyde - Centre for Forensic Science (Scotland)',
      'George Washington University - Department of Forensic Sciences (USA)'
    ],
    keyEntranceExams: 'NFSU National Entrance Test (NFAT), CUET-UG/PG, GATE in Life Sciences/Chemistry, UPSC CFSL Scientific Officer Exams.',
    employers: ['Central Bureau of Investigation (CBI)', 'National Investigation Agency (NIA)', 'State Police CID Branches', 'Central Forensic Science Labs', 'Intelligence Bureau (IB)']
  },

  'chartered_accountant': {
    id: 'chartered_accountant',
    title: 'Chartered Accountant (CA) & Forensic Financial Auditor',
    category: 'Financial Management, Auditing, Capital Markets & Taxation',
    iconName: 'BarChart3',
    idealTraits: ['conventional', 'logic'],
    description: 'You control corporate finances, audit balance sheets to detect fraud, design strategic tax frameworks, and advise enterprise founders and banks on multi-crore investments and acquisitions.',
    dailyLife: 'Analyzing general ledgers, conducting statutory audits, certifying financial statements, filing corporate tax returns, and advising company boards on capital allocation.',
    salaryIndia: '₹9,00,000 to ₹45,00,000+ per year (CAs running independent firms or holding corporate CFO seats earn substantial consulting income).',
    salaryAbroad: '$110,000 to $250,000 per year (Strong global reciprocity across Dubai, London, Singapore, and Sydney).',
    highSchoolStream: '11th & 12th in Commerce with Mathematics (Science students can also easily transition).',
    indianPathways: [
      'The Institute of Chartered Accountants of India (ICAI - registered right after 12th)',
      'Shri Ram College of Commerce (SRCC, Delhi University)',
      'Indian Institutes of Management (IIM Indore/Rohtak 5-Year Integrated IPMAT Program)',
      'St. Xavier’s College (Kolkata & Mumbai)'
    ],
    globalPathways: [
      'London School of Economics (LSE) - United Kingdom',
      'Wharton School, University of Pennsylvania - USA',
      'INSEAD - France / Singapore'
    ],
    keyEntranceExams: 'CA Foundation (conducted by ICAI right after 12th), IPMAT (for IIMs after school), CFA, ACCA exams.',
    employers: ['The Big 4 (Deloitte, PwC, EY, KPMG)', 'Goldman Sachs', 'J.P. Morgan', 'HDFC Bank', 'State Bank of India']
  },

  'sports_physiotherapy': {
    id: 'sports_physiotherapy',
    title: 'Sports Scientist, Physical Conditioning Coach & Physiotherapist',
    category: 'Sports Medicine, Athletic Performance & Kinesiology',
    iconName: 'Dumbbell',
    idealTraits: ['tactical', 'social'],
    description: 'You work alongside national athletes, IPL cricketers, and Olympic competitors. You diagnose muscle tears, rehabilitate injuries, optimize athletic biomechanics, and condition champions to peak physical performance.',
    dailyLife: 'Conducting flexibility and sprint gait analysis, applying manual therapy and dry needling, designing gym conditioning routines, and traveling with sports teams to tournaments.',
    salaryIndia: '₹6,00,000 to ₹26,00,000+ per year (BCCI, IPL cricket franchises, and national sports academies offer high compensation).',
    salaryAbroad: '$85,000 to $170,000 per year (Premier League football clubs, NBA basketball teams, and Australian Sports Institutes).',
    highSchoolStream: '11th & 12th in Science with Biology (PCB) for Physiotherapy (BPT); or Physical Education for Sports Coaching.',
    indianPathways: [
      'Netaji Subhas National Institute of Sports (NSNIS, Patiala) - India’s premier sports coaching institute',
      'Sports Authority of India (SAI) Training Centres',
      'Manipal College of Health Professions (MAHE)',
      'Jamia Hamdard & Government Medical Colleges (Bachelor of Physiotherapy - BPT)'
    ],
    globalPathways: [
      'Loughborough University (UK - Ranked #1 in the World for Sports Science)',
      'University of Queensland - School of Human Movement (Australia)',
      'German Sport University Cologne (Germany)'
    ],
    keyEntranceExams: 'NEET-UG (for select allied health seats), State Allied Health Entrances, NSNIS Diploma Entrance Exam.',
    employers: ['BCCI / Indian National Cricket Team', 'Sports Authority of India (SAI)', 'IPL Franchises & ISL Football Clubs', 'Olympic Gold Quest (OGQ)', 'Top Fitness & Orthopedic Hospitals']
  },

  'corporate_law_judiciary': {
    id: 'corporate_law_judiciary',
    title: 'Corporate Legal Counsel & Judicial Magistrate (Civil Judge)',
    category: 'Corporate Advisory, Constitutional Law & Judiciary',
    iconName: 'Scale',
    idealTraits: ['enterprising', 'logic'],
    description: 'You negotiate multi-crore business agreements, defend human rights in constitutional courts, or pass fair legal judgments as a presiding judge in district and high courts.',
    dailyLife: 'Drafting commercial contracts, researching legal precedents, presenting arguments before judges, and mediating settlements between conflicting parties.',
    salaryIndia: '₹8,50,000 to ₹42,00,000+ per year (Senior advocates and partners in tier-1 law firms earn well beyond).',
    salaryAbroad: '$120,000 to $280,000 per year (Elite law firms in London, New York, Dubai, and Singapore).',
    highSchoolStream: 'Any stream in 11th & 12th (Arts, Commerce, or Science students are all equally eligible).',
    indianPathways: [
      'National Law School of India University (NLSIU Bengaluru)',
      'NALSAR University of Law (Hyderabad)',
      'The West Bengal National University of Juridical Sciences (WBNUJS Kolkata)',
      'Faculty of Law, University of Delhi'
    ],
    globalPathways: [
      'Harvard Law School - USA',
      'Oxford University Faculty of Law - United Kingdom',
      'Cambridge University - United Kingdom',
      'National University of Singapore (NUS) Faculty of Law'
    ],
    keyEntranceExams: 'CLAT (Common Law Admission Test), AILET; State Judicial Services Examination (PCS-J) for becoming a Civil Judge.',
    employers: ['Shardul Amarchand Mangaldas', 'Khaitan & Co', 'Supreme Court & High Courts', 'Tata Sons Legal', 'State Judicial Services']
  },

  'agri_veterinary_tech': {
    id: 'agri_veterinary_tech',
    title: 'Veterinary Doctor & Autonomous Agri-Tech Innovator',
    category: 'Veterinary Medicine, Drone Agriculture & Livestock Genetics',
    iconName: 'Feather',
    idealTraits: ['realistic', 'investigative'],
    description: 'You treat livestock, horses, and companion animals as a licensed veterinary surgeon, or modernize farm yields using autonomous agricultural drones, soil biotechnology, and greenhouse automation.',
    dailyLife: 'Performing veterinary surgeries on farm and domestic animals, advising farmers on soil productivity, managing drone crop spraying, and overseeing dairy processing plants.',
    salaryIndia: '₹6,50,000 to ₹25,00,000+ per year (Government Veterinary Officers receive gazetted officer rank and allowances).',
    salaryAbroad: '$85,000 to $175,000 per year (High demand in Australia, New Zealand, Canada, and Netherlands).',
    highSchoolStream: '11th & 12th in Science with Biology (PCB) for Veterinary; or PCM/PCB for Agri-Tech.',
    indianPathways: [
      'Indian Veterinary Research Institute (IVRI Bareilly)',
      'Punjab Agricultural University (PAU Ludhiana)',
      'G.B. Pant University of Agriculture & Technology (Pantnagar)',
      'State Veterinary and Animal Sciences Universities'
    ],
    globalPathways: [
      'Wageningen University & Research - Netherlands (World #1 in Agriculture)',
      'University of California, Davis - USA',
      'University of Melbourne Veterinary School - Australia'
    ],
    keyEntranceExams: 'NEET-UG (for BVSc & AH seats), ICAR AIEEA (Indian Council of Agricultural Research), State Agri Entrance Tests.',
    employers: ['State Animal Husbandry Departments', 'Amul / NDDB', 'Bayer CropScience', 'John Deere AgriTech', 'Animal Welfare Sanctuaries']
  },

  'architecture_game_design': {
    id: 'architecture_game_design',
    title: 'Architect, Spatial Urban Planner & 3D Game Environment Designer',
    category: 'Spatial Architecture, 3D Game Worlds & Ergonomic Design',
    iconName: 'Palette',
    idealTraits: ['artistic', 'realistic'],
    description: 'You conceptualize eco-friendly buildings, sustainable cities, physical consumer electronics, or virtual 3D gaming environments and cinematic animations that inspire millions.',
    dailyLife: 'Drafting 3D CAD/Blender models, testing physical building materials, supervising construction sites, and collaborating with digital visual effects teams.',
    salaryIndia: '₹6,00,000 to ₹26,00,000+ per year (Senior studio architects and game art directors earn high compensation).',
    salaryAbroad: '$85,000 to $175,000 per year (Global architecture and AAA game studios in USA, Japan, UK, and Canada).',
    highSchoolStream: '11th & 12th in Science (PCM) for B.Arch; or any stream with Mathematics for Design (NID/UCEED).',
    indianPathways: [
      'School of Planning and Architecture (SPA New Delhi / Bhopal)',
      'National Institute of Design (NID Ahmedabad)',
      'IIT Roorkee / IIT Kharagpur (Department of Architecture)',
      'Industrial Design Centre (IDC, IIT Bombay)'
    ],
    globalPathways: [
      'Architectural Association School of Architecture (AA London, UK)',
      'Rhode Island School of Design (RISD, USA)',
      'Delft University of Technology (TU Delft, Netherlands)'
    ],
    keyEntranceExams: 'NATA (National Aptitude Test in Architecture), JEE Main Paper 2 (B.Arch), UCEED (IITs Design), NID DAT.',
    employers: ['Hafeez Contractor Architects', 'Ubisoft / Electronic Arts (EA)', 'Tata Motors Design Studio', 'L&T Construction', 'Independent Design Firms']
  },

  'medicine_surgeon': {
    id: 'medicine_surgeon',
    title: 'Specialized Surgeon & Medical Doctor (MBBS / MS / MD)',
    category: 'Clinical Medicine, Neurosurgery, Cardiology & Critical Care',
    iconName: 'Activity',
    idealTraits: ['investigative', 'social'],
    description: 'You diagnose complex diseases, perform precision surgeries inside operating theatres, manage emergency trauma units, and save human lives every single day.',
    dailyLife: 'Operating room surgical procedures, morning hospital ward rounds, reviewing MRI/CT scans, prescribing pharmacotherapy, and consulting outpatient patients.',
    salaryIndia: '₹10,00,000 to ₹50,00,000+ per year (Senior consultant surgeons and specialists in private hospitals can exceed ₹1 Crore annually).',
    salaryAbroad: '$180,000 to $380,000+ per year (USA - USMLE pathway, UK - PLAB pathway, Canada, Australia).',
    highSchoolStream: '11th & 12th in Science with Physics, Chemistry, and Biology (PCB).',
    indianPathways: [
      'All India Institute of Medical Sciences (AIIMS New Delhi & Regional AIIMS)',
      'Christian Medical College (CMC Vellore)',
      'Armed Forces Medical College (AFMC Pune)',
      'Maulana Azad Medical College (MAMC New Delhi)'
    ],
    globalPathways: [
      'Johns Hopkins University School of Medicine (USA)',
      'Oxford University Medical School (UK)',
      'Karolinska Institute (Sweden)'
    ],
    keyEntranceExams: 'NEET-UG, NEET-PG / INI-CET; USMLE (for USA), PLAB/GMC (for UK).',
    employers: ['AIIMS', 'Apollo Hospitals', 'Fortis Healthcare', 'Armed Forces Medical Services', 'Global Medical Research Centers']
  },

  'aviation_pilot': {
    id: 'aviation_pilot',
    title: 'Commercial Airline Pilot & Aviation Flight Commander',
    category: 'Commercial Aviation, Aeronautical Navigation & Cockpit Command',
    iconName: 'Compass',
    idealTraits: ['tactical', 'conventional'],
    description: 'You command passenger jets (Boeing 777 / Airbus A350) across global continents. You master cockpit flight computers, navigate stormy weather systems, and ensure the safety of hundreds of passengers.',
    dailyLife: 'Pre-flight weather briefings, inspecting aircraft exterior fuselage, taxiing and flying across international air routes, and communicating with Air Traffic Control (ATC).',
    salaryIndia: '₹14,00,000 to ₹55,00,000+ per year (First Officer to Senior Line Captain packages with luxury hotel layovers).',
    salaryAbroad: '$110,000 to $270,000 per year (Major international airlines: Emirates, Qatar Airways, Singapore Airlines, Delta).',
    highSchoolStream: '11th & 12th in Science with Physics and Mathematics (PCM) is mandatory as per DGCA regulations.',
    indianPathways: [
      'Indira Gandhi Rashtriya Uran Akademi (IGRUA, Amethi) - India’s premier national flying school',
      'Air India Cadet Pilot Program',
      'IndiGo Cadet Pilot Program (CAE / Flight Training Adelaide)',
      'Government Flying Training Schools across states'
    ],
    globalPathways: [
      'CAE Oxford Aviation Academy (United Kingdom)',
      'Flight Safety International (Florida, USA)',
      'Singapore Flying College'
    ],
    keyEntranceExams: 'IGRUA Entrance Exam, DGCA Theory Exams (Navigation, Meteorology, Air Regulations), Class 1 DGCA Medical Examination.',
    employers: ['Air India', 'IndiGo', 'Emirates', 'Qatar Airways', 'Singapore Airlines', 'Indian Coast Guard']
  }
};

/* Default student roster */
const DEFAULT_STUDENTS = [
  { name: 'Rohan Sharma', email: 'rohan@example.com', password: 'password123', grade: 'Class 11th', registeredOn: '2026-09-28' },
  { name: 'Priya Patel', email: 'priya@example.com', password: 'password123', grade: 'Class 12th', registeredOn: '2026-09-29' },
  { name: 'Aarav Verma', email: 'aarav@example.com', password: 'password123', grade: 'Class 10th', registeredOn: '2026-10-01' }
];

/* Helper to render career icons */
const CareerIcon = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Rocket': return <Rocket className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Radio': return <Radio className={className} />;
    case 'Microscope': return <Microscope className={className} />;
    case 'Landmark': return <Landmark className={className} />;
    case 'Dumbbell': return <Dumbbell className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'Feather': return <Feather className={className} />;
    case 'BarChart3': return <BarChart3 className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Activity': return <Activity className={className} />;
    default: return <Compass className={className} />;
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'test' | 'evaluating' | 'report' | 'allCareers'
  
  // Persistent user session
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('deeppath_user_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Student roster
  const [studentRoster, setStudentRoster] = useState(() => {
    try {
      const saved = localStorage.getItem('deeppath_student_roster');
      return saved ? JSON.parse(saved) : DEFAULT_STUDENTS;
    } catch {
      return DEFAULT_STUDENTS;
    }
  });

  // Google Sheet integration link
  const sheetId = '1Bv16i3BDu7jZ5xq4qz7cLJGfFrfWrsoRGEdOlLO3guc';
  const defaultSheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit?usp=sharing`;
  const [sheetUrl, setSheetUrl] = useState(() => {
    return localStorage.getItem('deeppath_custom_sheet_url') || defaultSheetUrl;
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState('');

  // Founder photo
  const [founderPhoto, setFounderPhoto] = useState(() => {
    return localStorage.getItem('deeppath_founder_photo') || null;
  });
  const fileInputRef = useRef(null);

  // Auth modal
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authGrade, setAuthGrade] = useState('Class 11th');
  const [showPassword, setShowPassword] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState('');

  // Roster modal
  const [rosterModalOpen, setRosterModalOpen] = useState(false);
  const [rosterSearch, setRosterSearch] = useState('');

  // Assessment engine state (75 Questions)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { qId: { optionId, scoreType, points } }
  const [markedForReview, setMarkedForReview] = useState({}); // { qId: true }
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [evaluatingCountdown, setEvaluatingCountdown] = useState(3);
  const [assessmentReport, setAssessmentReport] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('deeppath_user_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('deeppath_user_session');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('deeppath_student_roster', JSON.stringify(studentRoster));
  }, [studentRoster]);

  useEffect(() => {
    localStorage.setItem('deeppath_custom_sheet_url', sheetUrl);
  }, [sheetUrl]);

  useEffect(() => {
    if (founderPhoto) {
      try {
        localStorage.setItem('deeppath_founder_photo', founderPhoto);
      } catch (e) {
        console.warn('Photo size exceeds storage quota.');
      }
    }
  }, [founderPhoto]);

  useEffect(() => {
    if (sheetUrl) {
      syncRosterFromGoogleSheet(sheetUrl);
    }
  }, []);

  const syncRosterFromGoogleSheet = async (urlToFetch) => {
    if (!urlToFetch) return;
    setIsSyncing(true);
    setSyncFeedback('Reading student database from Google Sheet...');

    try {
      let exportUrl = urlToFetch.trim();
      const match = exportUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        exportUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv`;
      }

      const response = await fetch(exportUrl);
      if (!response.ok) {
        throw new Error('Please ensure Google Sheet share permissions are set to "Anyone with the link can view".');
      }

      const csvData = await response.text();
      const rows = parseSheetCsv(csvData);

      if (rows.length > 0) {
        setStudentRoster(prev => {
          const map = new Map();
          prev.forEach(u => map.set(u.email.toLowerCase(), u));
          rows.forEach(u => {
            if (!map.has(u.email.toLowerCase())) {
              map.set(u.email.toLowerCase(), u);
            }
          });
          return Array.from(map.values());
        });
        setSyncFeedback(`Successfully synchronized ${rows.length} student records from Google Sheet!`);
      } else {
        setSyncFeedback('Google Sheet connected. Ready for new student registrations.');
      }
    } catch (err) {
      setSyncFeedback(`Note: Sheet sync status (${err.message}). Local storage database is active.`);
    } finally {
      setIsSyncing(false);
    }
  };

  const parseSheetCsv = (text) => {
    const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length <= 1) return [];

    const parsed = [];
    const headers = lines[0].toLowerCase();
    const startIndex = headers.includes('email') || headers.includes('timestamp') || headers.includes('name') ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
      const emailCol = cols.find(c => c.includes('@') && c.includes('.'));
      if (emailCol) {
        const email = emailCol.toLowerCase();
        const emailIdx = cols.indexOf(emailCol);
        let name = 'Student';
        if (emailIdx > 0 && cols[emailIdx - 1] && !cols[emailIdx - 1].includes('/')) {
          name = cols[emailIdx - 1];
        } else if (cols[0] && !cols[0].includes('/') && !cols[0].includes('@')) {
          name = cols[0];
        }

        let password = 'password123';
        if (cols.length > emailIdx + 1 && cols[emailIdx + 1]) {
          password = cols[emailIdx + 1];
        }

        parsed.push({
          name: name || 'Registered Student',
          email: email,
          password: password || 'password123',
          grade: 'Class 11th',
          registeredOn: new Date().toLocaleDateString('en-US')
        });
      }
    }
    return parsed;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthErrorMessage('');

    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthErrorMessage('Please enter both your registered email and password.');
      return;
    }

    const cleanEmail = authEmail.trim().toLowerCase();
    const enteredPassword = authPassword.trim();
    const matchedUser = studentRoster.find(u => u.email.toLowerCase() === cleanEmail);

    if (!matchedUser) {
      setAuthErrorMessage('Account not found in the database. Please register first to take the career test.');
      return;
    }

    if (matchedUser.password !== enteredPassword) {
      setAuthErrorMessage('Incorrect password. Please verify your password and try again.');
      return;
    }

    setCurrentUser(matchedUser);
    setAuthModalOpen(false);
    setAuthEmail('');
    setAuthPassword('');
    startAssessmentTest();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setAuthErrorMessage('');

    if (!authName.trim() || !authEmail.trim() || !authPassword.trim()) {
      setAuthErrorMessage('Please enter your full name, email, and password.');
      return;
    }

    if (!authEmail.includes('@') || !authEmail.includes('.')) {
      setAuthErrorMessage('Please enter a valid email address.');
      return;
    }

    if (authPassword.length < 4) {
      setAuthErrorMessage('Password should be at least 4 characters.');
      return;
    }

    const cleanEmail = authEmail.trim().toLowerCase();
    const alreadyRegistered = studentRoster.some(u => u.email.toLowerCase() === cleanEmail);

    if (alreadyRegistered) {
      setAuthErrorMessage('This email is already registered! Please switch to Login.');
      return;
    }

    const newStudent = {
      name: authName.trim(),
      email: cleanEmail,
      password: authPassword.trim(),
      grade: authGrade,
      registeredOn: new Date().toLocaleDateString('en-US')
    };

    setStudentRoster(prev => [newStudent, ...prev]);
    setCurrentUser(newStudent);
    setAuthModalOpen(false);
    setAuthName('');
    setAuthEmail('');
    setAuthPassword('');
    startAssessmentTest();
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleInitiateTestClick = () => {
    if (!currentUser) {
      setAuthErrorMessage('');
      setAuthMode('login');
      setAuthModalOpen(true);
    } else {
      startAssessmentTest();
    }
  };

  const startAssessmentTest = () => {
    setActiveQuestionIndex(0);
    setSelectedAnswers({});
    setMarkedForReview({});
    setCurrentView('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (qId, option) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: {
        optionId: option.id,
        scoreType: option.scoreType,
        points: option.points
      }
    }));
  };

  const toggleMarkForReview = (qId) => {
    setMarkedForReview(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = ASSESSMENT_BATTERY.length; // 75
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
  const currentQ = ASSESSMENT_BATTERY[activeQuestionIndex];

  const triggerAssessmentEvaluation = () => {
    setIsPaletteOpen(false);
    setCurrentView('evaluating');
    setEvaluatingCountdown(3);

    const timer = setInterval(() => {
      setEvaluatingCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          computeComprehensiveReport();
          return 0;
        }
        return prev - 1;
      });
    }, 900);
  };

  const computeComprehensiveReport = () => {
    const traitScores = {
      logic: 0,
      courage: 0,
      empathy: 0,
      teaching: 0,
      investigative: 0,
      artistic: 0,
      enterprising: 0,
      realistic: 0,
      conventional: 0,
      social: 0,
      tactical: 0,
      introvert: 0,
      extravert: 0,
      intuitive: 0,
      observant: 0,
      conscientious: 0,
      spontaneous: 0,
      resilient: 0,
      sensitive: 0,
      decided: 0,
      exploring: 0,
      confused: 0,
      pressured: 0
    };

    Object.values(selectedAnswers).forEach(ans => {
      if (ans.scoreType && traitScores[ans.scoreType] !== undefined) {
        traitScores[ans.scoreType] += ans.points || 5;
      }
    });

    let mathPoints = 0;
    for (let i = 1; i <= 10; i++) {
      const qAns = selectedAnswers[`q${i}`];
      if (qAns && qAns.scoreType === 'logic') {
        mathPoints += qAns.points;
      }
    }
    const mathMax = 50;
    const iqPercentile = Math.min(99, Math.max(55, Math.round((mathPoints / mathMax) * 100)));

    let clarityVerdict = 'Exploring with Keen Curiosity';
    let clarityDesc = 'You are actively comparing multiple interesting fields with genuine curiosity. You have natural strengths that will shine once you see the step-by-step roadmap.';
    let clarityColor = 'text-amber-400 bg-amber-400/10 border-amber-400/30';

    if (traitScores.confused >= 15) {
      clarityVerdict = 'Seeking Guidance / Overwhelmed State';
      clarityDesc = 'You have felt overwhelmed by too many conflicting options or fear of making a wrong stream choice. This report provides an exact, structured roadmap to remove all anxiety.';
      clarityColor = 'text-rose-400 bg-rose-400/10 border-rose-400/30';
    } else if (traitScores.pressured >= 15) {
      clarityVerdict = 'Heavy External & Parental Pressure';
      clarityDesc = 'You feel significant pressure from relatives, parents, or peer expectations to pursue traditional degrees. Remember: true success comes when your natural intellect aligns with your daily calling.';
      clarityColor = 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    } else if (traitScores.decided >= 20) {
      clarityVerdict = 'Firmly Focused & Decided';
      clarityDesc = 'You possess crystal-clear intrinsic drive and know what kind of impact you wish to create in life. Use this report to verify college paths, entrance exams, and global opportunities.';
      clarityColor = 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
    }

    const normalizedTraits = {
      'Cognitive & Mathematical Logic': Math.min(99, Math.max(45, Math.round((traitScores.logic / 45) * 100) + 15)),
      'Tactical Courage & Defence Mindset': Math.min(99, Math.max(45, Math.round((traitScores.courage / 35) * 100) + 15)),
      'Empathy, Psychology & Counseling': Math.min(99, Math.max(45, Math.round((traitScores.empathy / 35) * 100) + 15)),
      'Scientific Investigation & Aerospace': Math.min(99, Math.max(45, Math.round((traitScores.investigative / 45) * 100) + 15)),
      'Pedagogy & Knowledge Mentorship': Math.min(99, Math.max(45, Math.round((traitScores.teaching / 30) * 100) + 15)),
      'Enterprise, Law & Strategic Influence': Math.min(99, Math.max(45, Math.round((traitScores.enterprising / 35) * 100) + 15)),
      'Artistic, Narrative & Media Vision': Math.min(99, Math.max(45, Math.round((traitScores.artistic / 35) * 100) + 15)),
      'Hands-on Practical & Mechanical Mastery': Math.min(99, Math.max(45, Math.round((traitScores.realistic / 35) * 100) + 15))
    };

    const rankedCareers = Object.values(CAREER_DATABASE).map(career => {
      let careerScore = 0;
      career.idealTraits.forEach(trait => {
        careerScore += (traitScores[trait] || 0) * 3;
      });
      if (career.id === 'aerospace_engineer' || career.id === 'cs_ai_engineer') {
        careerScore += traitScores.logic * 1.6;
      }
      return {
        ...career,
        totalScore: careerScore
      };
    }).sort((a, b) => b.totalScore - a.totalScore);

    setAssessmentReport({
      iqPercentile,
      clarityVerdict,
      clarityDesc,
      clarityColor,
      primary: rankedCareers[0],
      secondary: rankedCareers[1],
      tertiary: rankedCareers[2],
      quaternary: rankedCareers[3],
      traits: normalizedTraits,
      answeredCount,
      dateFormatted: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    });

    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePhotoUploadChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please choose an image file smaller than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setFounderPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredRoster = useMemo(() => {
    if (!rosterSearch.trim()) return studentRoster;
    const term = rosterSearch.toLowerCase();
    return studentRoster.filter(s => 
      s.name.toLowerCase().includes(term) || 
      s.email.toLowerCase().includes(term) ||
      (s.grade && s.grade.toLowerCase().includes(term))
    );
  }, [studentRoster, rosterSearch]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div 
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-emerald-400 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Compass className="w-6 h-6 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                DeepPath<span className="text-amber-400">Careers</span>
              </span>
              <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400">
                75-Question Diagnostic • Aptitude, Psychology & 15 Paths
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <button 
              onClick={() => setCurrentView('home')} 
              className={`hover:text-amber-400 transition-colors ${currentView === 'home' ? 'text-amber-400' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentView('allCareers')} 
              className={`hover:text-amber-400 transition-colors ${currentView === 'allCareers' ? 'text-amber-400' : ''}`}
            >
              All 15 Professions
            </button>
            <button 
              onClick={() => {
                setCurrentView('home');
                setTimeout(() => {
                  document.getElementById('founder-desk')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }} 
              className="hover:text-amber-400 transition-colors"
            >
              Founder's Story
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setRosterModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="View Google Sheet Student Database"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Sheet Roster ({studentRoster.length})</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-xs font-bold text-amber-300 uppercase">
                  {currentUser.name?.charAt(0) || 'S'}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-slate-200 truncate max-w-[120px]">
                  {currentUser.name}
                </span>
                <button 
                  onClick={handleSignOut} 
                  title="Sign Out"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthErrorMessage('');
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-3 py-1.5 transition-colors"
              >
                Sign In
              </button>
            )}

            <button
              onClick={handleInitiateTestClick}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-110 shadow-lg shadow-amber-400/20 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Start 75-Q Test</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN BODY */}
      <main className="flex-1">

        {/* VIEW 1: HOME */}
        {currentView === 'home' && (
          <div className="space-y-24 pb-24">
            
            <section className="relative overflow-hidden pt-16 md:pt-24">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold mb-6">
                  <Brain className="w-4 h-4" />
                  <span>The 75-Question Comprehensive Assessment Engine</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.12]">
                  Discover the career that fits you best.{' '}
                  <span className="block mt-2 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                    Step by step, from school to your dream job.
                  </span>
                </h1>

                <p className="mt-8 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
                  An untimed, comprehensive diagnostic battery of 75 questions designed to uncover your full cognitive and psychological makeup:
                  10 Math & Spatial Logic Puzzles, Big-5 Personality Traits, Career Confusion Index, RIASEC Vocational Domains, 
                  and Team Dynamics across 15 diverse professions.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleInitiateTestClick}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-110 shadow-xl shadow-amber-400/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                  >
                    <span>Begin 75-Question Assessment</span>
                    <ArrowRight className="w-5 h-5 text-slate-950" />
                  </button>

                  <button
                    onClick={() => setCurrentView('allCareers')}
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm text-slate-300 hover:text-white border border-slate-800 bg-slate-900/60 hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>Explore All 15 Professions</span>
                  </button>
                </div>

                <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                      <Brain className="w-4 h-4" />
                      <span>10 Logic & Math Puzzles</span>
                    </div>
                    <p className="text-xs text-slate-400">Pattern sequences, speeds, ratios, spatial cubes & deductions.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-1">
                      <Sliders className="w-4 h-4" />
                      <span>Career Clarity Index</span>
                    </div>
                    <p className="text-xs text-slate-400">Pinpoints parental pressure, exploring curiosity, or confusion.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-sky-400 font-bold text-sm mb-1">
                      <Rocket className="w-4 h-4" />
                      <span>15 Diverse Professions</span>
                    </div>
                    <p className="text-xs text-slate-400">Aerospace, Army, Psychology, Civil Services, Pilot, Surgeon & Law.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                      <Globe className="w-4 h-4" />
                      <span>India & Abroad Routes</span>
                    </div>
                    <p className="text-xs text-slate-400">IIST, NDA, AIIMS, NIMHANS, TISS, Oxford, Sandhurst & MIT.</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Google Sheet Live Database Card */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">Google Sheet Database Connected</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Live Roster Sync
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Pre-linked to your Google Sheet: <code className="text-amber-400 font-mono text-[11px]">{sheetId.slice(0, 15)}...</code>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <a
                    href={sheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    <span>Open Sheet</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setRosterModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors"
                  >
                    <Database className="w-3.5 h-3.5 text-slate-950" />
                    <span>View Roster ({studentRoster.length})</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Founder's Desk */}
            <section id="founder-desk" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

                <div className="flex flex-col lg:flex-row items-center gap-10">
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="relative group w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-2 border-dashed border-amber-400/50 bg-slate-950 p-2 shadow-2xl flex items-center justify-center">
                      {founderPhoto ? (
                        <img 
                          src={founderPhoto} 
                          alt="Founder" 
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        <div className="w-full h-full rounded-2xl bg-slate-900 flex flex-col items-center justify-center text-center p-4">
                          <User className="w-16 h-16 text-slate-600 mb-2" />
                          <span className="text-xs font-semibold text-slate-400">Founder Photo</span>
                          <span className="text-[10px] text-slate-500 mt-1">Upload your picture here</span>
                        </div>
                      )}

                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer p-4 text-center"
                      >
                        <Camera className="w-8 h-8 text-amber-400 mb-2" />
                        <span className="text-xs font-bold text-white">Click to Upload</span>
                        <span className="text-[10px] text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                      </div>
                    </div>

                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handlePhotoUploadChange} 
                      accept="image/*" 
                      className="hidden" 
                    />

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-amber-400/40 bg-amber-400/10 text-amber-300 font-bold text-xs hover:bg-amber-400/20 transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{founderPhoto ? 'Change My Photo' : 'Upload My Photo'}</span>
                    </button>
                  </div>

                  <div className="space-y-5 text-center lg:text-left flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>A Personal Word From the Founder</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      "Every student has an extraordinary spark. They just need the right map."
                    </h2>

                    <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                      <p>
                        A fulfilled life isn’t limited to only doctor or software engineer. When I looked around, 
                        the real heroes were aerospace scientists launching rockets to the moon, army officers standing vigil on icy borders, psychologists listening patiently 
                        to wounded minds, passionate school teachers awakening curious brains, and investigative reporters 
                        uncovering the truth.
                      </p>
                      <p>
                        We built this expanded 75-question diagnostic with real math puzzles, pattern thinking, and lifelike scenarios so every young student—whether 
                        from a quiet village or a bustling city—can discover their true calling with clarity and confidence.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between border-t border-slate-800 text-xs text-slate-400 gap-2">
                      <span className="font-semibold text-slate-200">Founder & Student Mentor</span>
                      <span>DeepPath Careers Initiative • Made for every aspiring youth</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: TEST */}
        {currentView === 'test' && (
          <div className="min-h-[calc(100vh-80px)] bg-slate-950 flex flex-col justify-between p-4 sm:p-8 lg:p-12 relative">
            <div className="max-w-4xl mx-auto w-full space-y-8 flex-1 flex flex-col justify-center">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-400 font-bold text-xs">
                      {currentQ.pillar}
                    </span>
                    <span className="text-slate-400 font-semibold">
                      Question {activeQuestionIndex + 1} of {totalQuestions}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleMarkForReview(currentQ.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                        markedForReview[currentQ.id]
                          ? 'border-yellow-400 bg-yellow-400/10 text-yellow-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{markedForReview[currentQ.id] ? 'Bookmarked' : 'Bookmark'}</span>
                    </button>

                    <button
                      onClick={() => setIsPaletteOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                    >
                      <Grid className="w-3.5 h-3.5 text-amber-400" />
                      <span>Question Palette ({answeredCount}/{totalQuestions})</span>
                    </button>
                  </div>
                </div>

                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(2, progressPercent)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {currentQ.type === 'puzzle' ? '🧩 Logical Puzzle & Numerical Reasoning' : '🧠 Psychological & Situational Response'}
                  </span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug tracking-tight">
                    {currentQ.prompt}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-3.5 pt-2">
                  {currentQ.options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQ.id]?.optionId === option.id;
                    const letter = String.fromCharCode(65 + optIdx);

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelectOption(currentQ.id, option)}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                          isSelected 
                            ? 'bg-amber-400/15 border-amber-400 shadow-lg shadow-amber-400/10 text-white translate-x-1' 
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 transition-colors ${
                          isSelected 
                            ? 'bg-amber-400 text-slate-950 font-black' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : letter}
                        </div>

                        <span className="text-sm sm:text-base leading-relaxed pt-0.5">
                          {option.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <button
                  disabled={activeQuestionIndex === 0}
                  onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
                  className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentView('home')}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors hidden sm:block"
                  >
                    Save & Exit
                  </button>

                  {activeQuestionIndex < totalQuestions - 1 ? (
                    <button
                      onClick={() => setActiveQuestionIndex(prev => prev + 1)}
                      className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-black text-xs sm:text-sm hover:bg-amber-300 transition-all flex items-center gap-2 shadow-lg shadow-amber-400/20"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={triggerAssessmentEvaluation}
                      className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-xs sm:text-sm hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-emerald-400/20"
                    >
                      <span>Analyze All 75 Answers</span>
                      <Sparkles className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>

            {isPaletteOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] flex flex-col">
                  
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Assessment Question Palette (75)</h3>
                      <p className="text-xs text-slate-400">Click any number to jump directly to that question.</p>
                    </div>
                    <button 
                      onClick={() => setIsPaletteOpen(false)}
                      className="text-slate-400 hover:text-white p-1 text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-emerald-500/20 border border-emerald-500/50" />
                      <span className="text-slate-300">Answered ({answeredCount})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-yellow-400/20 border border-yellow-400/50" />
                      <span className="text-slate-300">Bookmarked</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-slate-950 border border-slate-800" />
                      <span className="text-slate-400">Unanswered ({totalQuestions - answeredCount})</span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-1">
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                      {ASSESSMENT_BATTERY.map((q, qIdx) => {
                        const isAnswered = !!selectedAnswers[q.id];
                        const isMarked = !!markedForReview[q.id];
                        const isCurrent = qIdx === activeQuestionIndex;

                        let styleClass = 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700';
                        if (isAnswered) {
                          styleClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                        }
                        if (isMarked) {
                          styleClass = 'bg-yellow-400/20 border-yellow-400 text-yellow-300 font-bold';
                        }
                        if (isCurrent) {
                          styleClass += ' ring-2 ring-amber-400';
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => {
                              setActiveQuestionIndex(qIdx);
                              setIsPaletteOpen(false);
                            }}
                            className={`h-10 rounded-xl border text-xs flex items-center justify-center transition-all ${styleClass}`}
                          >
                            {qIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    <span className="text-xs text-slate-500">
                      {answeredCount === totalQuestions ? 'All questions completed!' : `${totalQuestions - answeredCount} remaining`}
                    </span>
                    <button
                      onClick={() => setIsPaletteOpen(false)}
                      className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors"
                    >
                      Close Palette
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* VIEW 3: EVALUATING */}
        {currentView === 'evaluating' && (
          <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md w-full p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-6">
              
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-amber-400/20 border-t-amber-400 animate-spin" />
                <Brain className="w-10 h-10 text-amber-400 animate-pulse" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">Synthesizing 75 Dimensions</h3>
                <p className="text-xs text-slate-400 mt-2">
                  Calculating Cognitive Aptitude IQ, Decidedness vs Confusion Index, Big-5 traits, and matching across 15 full career paths...
                </p>
              </div>

              <div className="space-y-2 text-left bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>10 Math & Spatial Logic Puzzles</span>
                  <span className="text-emerald-400 font-bold">Percentile Solved</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Career Clarity & Parental Pressure</span>
                  <span className="text-emerald-400 font-bold">Evaluated</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Colleges (IIST, NDA, AIIMS, NIMHANS, TISS, Oxford)</span>
                  <span className="text-amber-400 font-bold">Synthesizing...</span>
                </div>
              </div>

              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Finalizing in {evaluatingCountdown}s
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: REPORT */}
        {currentView === 'report' && assessmentReport && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            
            <div className="p-8 sm:p-10 rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/10 via-slate-900 to-slate-950 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Comprehensive 75-Question Diagnostic Dossier</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-white">
                    Congratulations, {currentUser?.name || 'Student'}!
                  </h1>
                  <p className="text-sm text-slate-300 mt-1">
                    Calculated on {assessmentReport.dateFormatted} from all 75 questions. Here is your full cognitive and vocational breakdown.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>Print / Save PDF</span>
                  </button>

                  <button
                    onClick={startAssessmentTest}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retake Test</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pillar 1: Cognitive Logic & Math</span>
                  <div className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-bold border border-amber-400/20">
                    Aptitude Battery
                  </div>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">{assessmentReport.iqPercentile}th</span>
                  <span className="text-sm text-emerald-400 font-bold">National Percentile Fit</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Evaluated from the 10 numerical sequences, speed-time, ratio logic, 3D painted cubes, and deductive syllogisms. 
                  Demonstrates sharp analytical precision and strong problem-solving capacity.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pillar 2: Decidedness vs Confusion</span>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${assessmentReport.clarityColor}`}>
                    {assessmentReport.clarityVerdict}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white">
                  {assessmentReport.clarityVerdict}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {assessmentReport.clarityDesc}
                </p>
              </div>

            </div>

            <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/50 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Psychological & Vocational Trait Spectrum</h3>
                <p className="text-xs text-slate-400 mt-0.5">Scored from your choices across the 75 dilemmas, teamwork responses, and vocational callings.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {Object.entries(assessmentReport.traits).map(([traitKey, score]) => (
                  <div key={traitKey} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2">
                      <span className="truncate pr-2">{traitKey}</span>
                      <span className="text-amber-400 font-mono">{score}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl border-2 border-amber-400/60 bg-slate-900/80 relative space-y-8 shadow-2xl shadow-amber-400/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 mt-1">
                    <CareerIcon name={assessmentReport.primary.iconName} className="w-7 h-7 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-amber-400">#1 Top Recommended Calling</span>
                    <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                      {assessmentReport.primary.title}
                    </h2>
                    <span className="text-xs font-semibold text-slate-400 mt-1 block">
                      {assessmentReport.primary.category}
                    </span>
                  </div>
                </div>

                <div className="px-5 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-right">
                  <div className="text-3xl font-black">98%</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider">Aptitude Fit</div>
                </div>
              </div>

              <p className="text-base text-slate-200 leading-relaxed font-normal">
                {assessmentReport.primary.description}
              </p>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  What A Normal Workday Looks Like:
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {assessmentReport.primary.dailyLife}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                    <span className="font-black text-amber-400 text-sm">₹</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Salary Growth in India</span>
                    <p className="text-sm font-bold text-white mt-1">{assessmentReport.primary.salaryIndia}</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center shrink-0">
                    <span className="font-black text-emerald-400 text-sm">$</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Global Packages & Opportunities</span>
                    <p className="text-sm font-bold text-white mt-1">{assessmentReport.primary.salaryAbroad}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-amber-400" />
                  <span>Educational Roadmap & College Pathways</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-amber-400 uppercase">11th & 12th Standard Stream</span>
                    <p className="text-sm text-slate-200">{assessmentReport.primary.highSchoolStream}</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase">Entrance Exams to Prepare For</span>
                    <p className="text-sm text-slate-200">{assessmentReport.primary.keyEntranceExams}</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-sky-400 uppercase">Premier Indian Institutions</span>
                    <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                      {assessmentReport.primary.indianPathways.map((col, cIdx) => (
                        <li key={cIdx}>{col}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase">World Renowned Global Universities</span>
                    <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                      {assessmentReport.primary.globalPathways.map((col, cIdx) => (
                        <li key={cIdx}>{col}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Notable Organizations & Employers:
                </span>
                <div className="flex flex-wrap gap-2">
                  {assessmentReport.primary.employers.map((emp, eIdx) => (
                    <span key={eIdx} className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300">
                      {emp}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            <div className="space-y-6 pt-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Strong Runner-Up Career Callings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[assessmentReport.secondary, assessmentReport.tertiary, assessmentReport.quaternary].map((career, cIdx) => (
                  <div key={career.id} className="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-amber-400 uppercase">Match #{cIdx + 2}</span>
                        <span className="text-xs font-bold text-emerald-400">{95 - cIdx * 3}% Fit</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                          <CareerIcon name={career.iconName} className="w-5 h-5 text-amber-400" />
                        </div>
                        <h4 className="text-base font-bold text-white">{career.title}</h4>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                        {career.description}
                      </p>
                    </div>

                    <div className="text-xs text-slate-400 pt-3 border-t border-slate-800/80 space-y-1">
                      <div><strong className="text-slate-300">11th/12th:</strong> {career.highSchoolStream}</div>
                      <div><strong className="text-slate-300">India Salary:</strong> {career.salaryIndia}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-8">
              <button
                onClick={() => setCurrentView('home')}
                className="px-8 py-3.5 rounded-2xl border border-slate-800 bg-slate-900 text-slate-300 font-bold text-sm hover:text-white hover:bg-slate-800 transition-colors"
              >
                Return to Homepage
              </button>
            </div>

          </div>
        )}

        {/* VIEW 5: ALL 15 CAREERS */}
        {currentView === 'allCareers' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black text-white">
                Directory of All 15 Diverse Professions
              </h1>
              <p className="text-sm sm:text-base text-slate-400">
                Explore every career path beyond ordinary stereotypes—from Aerospace Rocket Engineers and Army Officers to Commercial Airline Pilots and Surgeons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(CAREER_DATABASE).map((career) => (
                <div key={career.id} className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                      <CareerIcon name={career.iconName} className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                        {career.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1.5">{career.title}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {career.description}
                  </p>

                  <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                    <div><strong className="text-amber-400">High School Stream:</strong> {career.highSchoolStream}</div>
                    <div><strong className="text-emerald-400">India Salary:</strong> {career.salaryIndia}</div>
                    <div><strong className="text-sky-400">Abroad Outlook:</strong> {career.salaryAbroad}</div>
                    <div><strong className="text-indigo-400">Entrance Exams:</strong> {career.keyEntranceExams}</div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleInitiateTestClick}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 transition-colors"
                    >
                      Take 75-Q Assessment to Check Fit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* AUTH MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6">
            
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 text-sm font-bold"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-2xl font-black text-white">
                {authMode === 'login' ? 'Student Sign In' : 'New Student Registration'}
              </h3>
              <p className="text-xs text-slate-400">
                {authMode === 'login' 
                  ? 'Enter your registered credentials to launch the test.' 
                  : 'Register your account to save your assessment results.'}
              </p>
            </div>

            <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setAuthErrorMessage(''); }}
                className={`py-2 rounded-lg transition-colors ${authMode === 'login' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('register'); setAuthErrorMessage(''); }}
                className={`py-2 rounded-lg transition-colors ${authMode === 'register' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                Register
              </button>
            </div>

            {authErrorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span className="leading-relaxed">{authErrorMessage}</span>
              </div>
            )}

            <form onSubmit={authMode === 'login' ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    placeholder="student@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Current Class / Grade</label>
                  <select
                    value={authGrade}
                    onChange={(e) => setAuthGrade(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Class 9th">Class 9th</option>
                    <option value="Class 10th">Class 10th</option>
                    <option value="Class 11th">Class 11th</option>
                    <option value="Class 12th">Class 12th</option>
                    <option value="College / Graduate">College / Graduate</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-sm hover:brightness-110 shadow-lg shadow-amber-400/20 transition-all mt-2"
              >
                {authMode === 'login' ? 'Sign In & Launch Test' : 'Register & Start Test'}
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-slate-500">
              {authMode === 'login' ? (
                <span>
                  Don't have an account yet?{' '}
                  <button 
                    onClick={() => { setAuthMode('register'); setAuthErrorMessage(''); }}
                    className="text-amber-400 hover:underline font-bold"
                  >
                    Register here
                  </button>
                </span>
              ) : (
                <span>
                  Already registered in database?{' '}
                  <button 
                    onClick={() => { setAuthMode('login'); setAuthErrorMessage(''); }}
                    className="text-amber-400 hover:underline font-bold"
                  >
                    Sign in here
                  </button>
                </span>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ROSTER MODAL */}
      {rosterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-5 max-h-[90vh] flex flex-col">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Student Database Roster</h3>
                  <p className="text-xs text-slate-400">Total Registered: {studentRoster.length} students</p>
                </div>
              </div>

              <button 
                onClick={() => setRosterModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={rosterSearch}
                  onChange={(e) => setRosterSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => syncRosterFromGoogleSheet(sheetUrl)}
                  disabled={isSyncing}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Sheet'}</span>
                </button>

                <a
                  href={sheetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Edit in Google</span>
                </a>
              </div>
            </div>

            {syncFeedback && (
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                {syncFeedback}
              </div>
            )}

            <div className="flex-1 overflow-y-auto border border-slate-800 rounded-2xl bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold sticky top-0">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Email Address</th>
                    <th className="p-3">Grade</th>
                    <th className="p-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredRoster.map((st, sIdx) => (
                    <tr key={sIdx} className="hover:bg-slate-900/40">
                      <td className="p-3 font-semibold text-white">{st.name}</td>
                      <td className="p-3 text-slate-400">{st.email}</td>
                      <td className="p-3 text-amber-400 font-medium">{st.grade || 'Class 11th'}</td>
                      <td className="p-3 text-right text-slate-500">{st.registeredOn}</td>
                    </tr>
                  ))}
                  {filteredRoster.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-slate-500">
                        No students match your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setRosterModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-slate-400">DeepPath Careers Platform</span>
          </div>
          <div>
            Built with 75 holistic diagnostic questions and 15 diverse professions for all students.
          </div>
          <div className="text-slate-600">
            Connected with Google Spreadsheet ID: {sheetId.slice(0, 8)}...
          </div>
        </div>
      </footer>

    </div>
  );
}
