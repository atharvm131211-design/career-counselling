import React, { useState, useEffect } from 'react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  Award,
  Sparkles,
  Database,
  Search,
  RefreshCw,
  Camera,
  Layers,
  BrainCircuit,
  Lock,
  Mail,
  User,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

// --- QUESTION BANK: 75 COMPREHENSIVE QUESTIONS ---
const QUESTIONS = [
  // 1-10: Mathematical, Logical & Spatial Puzzles
  {
    id: 1,
    pillar: "Pillar 1: Aptitude & Logic",
    q: "Find the next number in this sequence: 3, 7, 15, 31, 63, ...",
    options: [
      { text: "127 (Rule: multiply previous by 2, add 1)", traits: { logic: 10, analytical: 8 } },
      { text: "95", traits: { logic: 2 } },
      { text: "120", traits: { logic: 3 } },
      { text: "126", traits: { logic: 4 } }
    ],
    isAptitude: true,
    correctIndex: 0
  },
  {
    id: 2,
    pillar: "Pillar 1: Aptitude & Logic",
    q: "A bus travels 180 km in 3 hours at constant speed. If the driver increases speed by 20 km/h, how far will it travel in the next 3 hours?",
    options: [
      { text: "200 km", traits: { logic: 2 } },
      { text: "240 km (Speed increases from 60 to 80 km/h; 80 x 3 = 240)", traits: { logic: 10, analytical: 8 } },
      { text: "220 km", traits: { logic: 3 } },
      { text: "210 km", traits: { logic: 2 } }
    ],
    isAptitude: true,
    correctIndex: 1
  },
  {
    id: 3,
    pillar: "Pillar 1: Aptitude & Logic",
    q: "A wooden cube is painted red on all 6 sides and cut into 27 equal smaller cubes. How many small cubes have red paint on EXACTLY two sides?",
    options: [
      { text: "12 cubes (Located along the 12 edges, excluding corners)", traits: { logic: 10, spatial: 10 } },
      { text: "8 cubes", traits: { logic: 3, spatial: 3 } },
      { text: "6 cubes", traits: { logic: 3, spatial: 2 } },
      { text: "1 cube", traits: { logic: 1 } }
    ],
    isAptitude: true,
    correctIndex: 0
  },
  {
    id: 4,
    pillar: "Pillar 1: Aptitude & Logic",
    q: "Statement: 'All pilots are trained navigators. Some navigators are astronomers.' What can we deduce for sure?",
    options: [
      { text: "Every pilot is an astronomer", traits: { logic: 2 } },
      { text: "Some pilots might be astronomers, but we cannot be 100% certain", traits: { logic: 10, analytical: 8 } },
      { text: "No pilot can ever study astronomy", traits: { logic: 1 } },
      { text: "All astronomers are pilots", traits: { logic: 1 } }
    ],
    isAptitude: true,
    correctIndex: 1
  },
  {
    id: 5,
    pillar: "Pillar 1: Aptitude & Logic",
    q: "A tank has two taps. Tap A fills it in 4 hours, Tap B in 6 hours. If both open together, how long does it take?",
    options: [
      { text: "5 hours", traits: { logic: 2 } },
      { text: "2.4 hours (2 hours 24 mins)", traits: { logic: 10, analytical: 8 } },
      { text: "3 hours", traits: { logic: 3 } },
      { text: "1.5 hours", traits: { logic: 2 } }
    ],
    isAptitude: true,
    correctIndex: 1
  },
  {
    id: 6,
    pillar: "Pillar 1: Aptitude & Logic",
    q: "If 12 workers build a bridge section in 15 days, how many days will 20 workers take at the same pace?",
    options: [
      { text: "9 days (12 x 15 / 20 = 9)", traits: { logic: 10, analytical: 8 } },
      { text: "10 days", traits: { logic: 3 } },
      { text: "8 days", traits: { logic: 4 } },
      { text: "11 days", traits: { logic: 2 } }
    ],
    isAptitude: true,
    correctIndex: 0
  },
  {
    id: 7,
    pillar: "Pillar 1: Aptitude & Logic",
    q: "Looking at a clock showing 3:15, what is the exact angle between the hour and minute hands?",
    options: [
      { text: "0 degrees", traits: { logic: 2 } },
      { text: "7.5 degrees (The hour hand moves 0.5 deg per minute)", traits: { logic: 10, spatial: 9 } },
      { text: "15 degrees", traits: { logic: 3 } },
      { text: "5 degrees", traits: { logic: 2 } }
    ],
    isAptitude: true,
    correctIndex: 1
  },
  {
    id: 8,
    pillar: "Pillar 1: Aptitude & Logic",
    q: "In a code language: 'EARTH' is written as 'FBSUI'. How will 'STARS' be written?",
    options: [
      { text: "TUBST (Each letter shifted forward by +1)", traits: { logic: 10, analytical: 8 } },
      { text: "RUARS", traits: { logic: 2 } },
      { text: "TVBST", traits: { logic: 3 } },
      { text: "SUAST", traits: { logic: 2 } }
    ],
    isAptitude: true,
    correctIndex: 0
  },
  {
    id: 9,
    pillar: "Pillar 1: Aptitude & Logic",
    q: "Which word does NOT belong: Triangle, Octagon, Sphere, Pentagon, Hexagon?",
    options: [
      { text: "Sphere (3D solid figure, while others are 2D flat polygons)", traits: { logic: 10, spatial: 8 } },
      { text: "Octagon", traits: { logic: 2 } },
      { text: "Triangle", traits: { logic: 2 } },
      { text: "Pentagon", traits: { logic: 2 } }
    ],
    isAptitude: true,
    correctIndex: 0
  },
  {
    id: 10,
    pillar: "Pillar 1: Aptitude & Logic",
    q: "A shirt originally priced at Rs 800 is given a 20% discount, and then an additional 10% cash discount. Final price?",
    options: [
      { text: "Rs 560", traits: { logic: 3 } },
      { text: "Rs 576 (800 - 160 = 640; 640 - 64 = 576)", traits: { logic: 10, analytical: 8 } },
      { text: "Rs 580", traits: { logic: 2 } },
      { text: "Rs 600", traits: { logic: 2 } }
    ],
    isAptitude: true,
    correctIndex: 1
  },

  // 11-18: Career Decidedness & Family/Peer Pressure
  {
    id: 11,
    pillar: "Pillar 2: Career Decidedness & Pressure",
    q: "When relatives ask: 'What do you want to become?', how do you feel inside?",
    options: [
      { text: "I have 1 or 2 clear choices and feel excited to explain them", traits: { clarity: 10, pressure: 2 } },
      { text: "I say doctor/engineer just to satisfy them, but I'm unsure", traits: { clarity: 4, pressure: 9 } },
      { text: "I feel totally blank and worried because I have no idea", traits: { clarity: 2, pressure: 8 } },
      { text: "I like so many different fields that picking one feels impossible", traits: { clarity: 5, pressure: 4, creative: 6 } }
    ]
  },
  {
    id: 12,
    pillar: "Pillar 2: Career Decidedness & Pressure",
    q: "Are your current subject choices mainly your own passion or parents' wish?",
    options: [
      { text: "100% my personal interest and calling", traits: { clarity: 10, enterprise: 8 } },
      { text: "Mostly parents/family wish for job security", traits: { pressure: 10, clarity: 3 } },
      { text: "A balanced agreement between my family and me", traits: { clarity: 8, social: 7 } },
      { text: "I chose because my closest friends were choosing it", traits: { pressure: 7, clarity: 3 } }
    ]
  },
  {
    id: 13,
    pillar: "Pillar 2: Career Decidedness & Pressure",
    q: "If money or competition was not an obstacle, what would you choose without fear?",
    options: [
      { text: "Writing, filmmaking, theater, design, or fine arts", traits: { creative: 10, artistic: 10 } },
      { text: "Fighter pilot, army commando, or frontline police officer", traits: { defence: 10, discipline: 10 } },
      { text: "Building tech startups, software, or advanced AI robots", traits: { tech: 10, analytical: 9 } },
      { text: "Helping troubled people, teaching, or community healing", traits: { social: 10, empathy: 10 } }
    ]
  },
  {
    id: 14,
    pillar: "Pillar 2: Career Decidedness & Pressure",
    q: "How often do you stay awake late reading or watching videos about a specific topic just for fun?",
    options: [
      { text: "Almost every night — I get obsessed with learning new things", traits: { analytical: 9, creative: 8, clarity: 8 } },
      { text: "Only when school exams or test dates approach", traits: { conventional: 8 } },
      { text: "I prefer sports, gaming, and talking to friends instead", traits: { social: 8, practical: 7 } },
      { text: "I experiment with hands-on tools, repairs, or drawing", traits: { practical: 10, artistic: 8 } }
    ]
  },
  {
    id: 15,
    pillar: "Pillar 2: Career Decidedness & Pressure",
    q: "What scares you most about choosing a career right now?",
    options: [
      { text: "Getting stuck in a boring 9-to-5 desk job doing repetitive paperwork", traits: { creative: 9, enterprise: 8 } },
      { text: "Not earning enough money to support my family comfortably", traits: { enterprise: 8, conventional: 7 } },
      { text: "Failing entrance exams after years of preparation", traits: { pressure: 9 } },
      { text: "Not knowing what my real hidden talent actually is", traits: { clarity: 2, pressure: 7 } }
    ]
  },
  {
    id: 16,
    pillar: "Pillar 2: Career Decidedness & Pressure",
    q: "If everyone around you advised against your dream, would you still pursue it?",
    options: [
      { text: "Yes, I trust my conviction and will prove myself through hard work", traits: { enterprise: 10, defence: 9, discipline: 9 } },
      { text: "No, family approval and peace of mind matter more to me", traits: { social: 8, conventional: 7 } },
      { text: "I would take a safe primary career first, then pursue my dream on the side", traits: { analytical: 8, conventional: 8 } },
      { text: "I would feel very conflicted and hesitate", traits: { pressure: 8, clarity: 3 } }
    ]
  },
  {
    id: 17,
    pillar: "Pillar 2: Career Decidedness & Pressure",
    q: "How confident do you feel in your ability to master tough new skills?",
    options: [
      { text: "Very confident; give me good material and I can teach myself anything", traits: { analytical: 10, logic: 9 } },
      { text: "Confident only if I have a clear teacher explaining step-by-step", traits: { conventional: 8, social: 7 } },
      { text: "I learn best by doing with my hands, not through thick textbooks", traits: { practical: 10 } },
      { text: "I often doubt myself when concepts get difficult", traits: { pressure: 8 } }
    ]
  },
  {
    id: 18,
    pillar: "Pillar 2: Career Decidedness & Pressure",
    q: "Where do you see yourself 10 years from now?",
    options: [
      { text: "Leading an organization, running a business, or heading a department", traits: { enterprise: 10, leadership: 10 } },
      { text: "In a quiet lab or studio creating high-value intellectual work", traits: { analytical: 9, creative: 9 } },
      { text: "Out in fields, flying, defending borders, or on active fieldwork", traits: { practical: 10, defence: 10 } },
      { text: "Directly transforming underprivileged lives or running a clinic/school", traits: { social: 10, empathy: 10 } }
    ]
  },

  // 19-33: Personality, Psychology & Work Temperament
  {
    id: 19,
    pillar: "Pillar 3: Personality & Temperament",
    q: "After spending 5 hours at a noisy wedding or party, how do you feel?",
    options: [
      { text: "Exhausted; I need quiet alone time to recharge my battery", traits: { introvert: 10, analytical: 7 } },
      { text: "Energized! I want to keep hanging out and chat with more people", traits: { extrovert: 10, social: 8 } },
      { text: "Fine as long as I was with my 2 closest friends", traits: { social: 6, introvert: 5 } },
      { text: "I prefer staying home and working on my personal projects anyway", traits: { introvert: 9, creative: 8 } }
    ]
  },
  {
    id: 20,
    pillar: "Pillar 3: Personality & Temperament",
    q: "How clean and organized is your study desk or school bag right now?",
    options: [
      { text: "Very organized — every notebook and pen has its fixed place", traits: { conventional: 10, discipline: 9 } },
      { text: "Organized chaos — it looks messy to others, but I know where everything is", traits: { creative: 8, analytical: 7 } },
      { text: "Quite messy, I only organize when forced to", traits: { creative: 7 } },
      { text: "Minimalist — I keep only 1 notebook and 1 pen, nothing extra", traits: { analytical: 8, discipline: 8 } }
    ]
  },
  {
    id: 21,
    pillar: "Pillar 3: Personality & Temperament",
    q: "When a sudden emergency disrupts your weekend plans, how do you react?",
    options: [
      { text: "I instantly stay calm, assess facts, and make a plan B", traits: { defence: 9, analytical: 9, leadership: 8 } },
      { text: "I get irritated because I dislike sudden changes to my routine", traits: { conventional: 8 } },
      { text: "I quickly check on everyone involved to ensure everyone is okay emotionally", traits: { social: 10, empathy: 10 } },
      { text: "I treat it like an adventure and enjoy solving the surprise problem", traits: { enterprise: 8, practical: 8 } }
    ]
  },
  {
    id: 22,
    pillar: "Pillar 3: Personality & Temperament",
    q: "Do you make major decisions using your heart (empathy/feelings) or head (data/logic)?",
    options: [
      { text: "Head: Pure cold logic, numbers, and hard evidence", traits: { analytical: 10, logic: 10 } },
      { text: "Heart: Values, compassion, and how it impacts people", traits: { social: 10, empathy: 10 } },
      { text: "Gut instinct: A fast intuitive feeling that usually turns out right", traits: { enterprise: 9, creative: 8 } },
      { text: "Rules and precedent: Following tested guidelines and traditions", traits: { conventional: 9, discipline: 8 } }
    ]
  },
  {
    id: 23,
    pillar: "Pillar 3: Personality & Temperament",
    q: "When someone insults your hard work in front of peers, what do you do?",
    options: [
      { text: "Keep a calm poker face, analyze if their point is valid, and reply with facts", traits: { discipline: 10, analytical: 8 } },
      { text: "Defend myself boldly right then and there with firm confidence", traits: { leadership: 9, defence: 8 } },
      { text: "Feel deeply hurt inside and withdraw silently", traits: { empathy: 8, introvert: 7 } },
      { text: "Use humor or wit to defuse the tension without picking a fight", traits: { social: 9, creative: 8 } }
    ]
  },
  {
    id: 24,
    pillar: "Pillar 3: Personality & Temperament",
    q: "Which kind of task do you naturally enjoy doing the most?",
    options: [
      { text: "Dissecting a tricky puzzle, equation, or mysterious software bug", traits: { tech: 10, analytical: 10 } },
      { text: "Listening to a friend's emotional problem and helping them heal", traits: { social: 10, empathy: 10 } },
      { text: "Building, fixing, repairing, or assembling physical objects", traits: { practical: 10 } },
      { text: "Pitching an idea, convincing people, or organizing an event", traits: { enterprise: 10, leadership: 9 } }
    ]
  },
  {
    id: 25,
    pillar: "Pillar 3: Personality & Temperament",
    q: "How do you handle strict deadlines?",
    options: [
      { text: "I finish days in advance with a structured daily checklist", traits: { conventional: 10, discipline: 9 } },
      { text: "I do my best work under intense last-minute adrenaline pressure", traits: { creative: 8, enterprise: 7 } },
      { text: "I pace myself steadily without stress", traits: { analytical: 8, discipline: 8 } },
      { text: "I often struggle and procrastinate", traits: { pressure: 7 } }
    ]
  },
  {
    id: 26,
    pillar: "Pillar 3: Personality & Temperament",
    q: "Would you rather read a 300-page book or watch a 2-hour documentary?",
    options: [
      { text: "300-page book — I love deep, thorough, imaginative reading", traits: { analytical: 9, creative: 8 } },
      { text: "2-hour visual documentary — I absorb visual diagrams and audio fast", traits: { practical: 8, social: 7 } },
      { text: "Neither — I learn best by doing experiments with my hands", traits: { practical: 10 } },
      { text: "I prefer discussing ideas in a live debate with people", traits: { social: 9, enterprise: 8 } }
    ]
  },
  {
    id: 27,
    pillar: "Pillar 3: Personality & Temperament",
    q: "How comfortable are you speaking in front of an audience of 100 people?",
    options: [
      { text: "Very natural; I enjoy commanding the stage and holding attention", traits: { leadership: 10, enterprise: 9 } },
      { text: "Nervous at first, but I can deliver well if I practiced thoroughly", traits: { discipline: 8, conventional: 7 } },
      { text: "I get terrified and prefer someone else present for the group", traits: { introvert: 9 } },
      { text: "I prefer presenting one-on-one or behind a screen/camera", traits: { analytical: 8, creative: 7 } }
    ]
  },
  {
    id: 28,
    pillar: "Pillar 3: Personality & Temperament",
    q: "When learning about history or society, what interests you most?",
    options: [
      { text: "Military tactics, war strategies, and heroic leadership decisions", traits: { defence: 10, leadership: 8 } },
      { text: "Why civilizations collapsed, trade routes, and economic systems", traits: { analytical: 9, enterprise: 8 } },
      { text: "Art, architecture, literature, and how common people lived", traits: { creative: 9, artistic: 9 } },
      { text: "Human rights struggles, freedom movements, and social reform", traits: { social: 10, legal: 9 } }
    ]
  },
  {
    id: 29,
    pillar: "Pillar 3: Personality & Temperament",
    q: "Do you prefer following established guidelines or inventing your own approach?",
    options: [
      { text: "Inventing novel, unconventional paths even if there is risk", traits: { creative: 10, enterprise: 9 } },
      { text: "Following proven systems that guarantee reliable, safe results", traits: { conventional: 10, discipline: 8 } },
      { text: "Mastering the rules first, then finding clever ways to optimize them", traits: { analytical: 9, legal: 8 } },
      { text: "Adapting instinctively based on what the real-time moment requires", traits: { practical: 9, defence: 8 } }
    ]
  },
  {
    id: 30,
    pillar: "Pillar 3: Personality & Temperament",
    q: "How patient are you when doing repetitive, detailed checks (like checking numbers)?",
    options: [
      { text: "Extremely patient; I spot tiny typos and errors that everyone misses", traits: { conventional: 10, analytical: 9 } },
      { text: "I get bored after 5 minutes and want action", traits: { practical: 9, defence: 8 } },
      { text: "Moderate — if the end goal is important to me", traits: { discipline: 7 } },
      { text: "I would rather automate the checking process with a script/tool", traits: { tech: 10, analytical: 9 } }
    ]
  },
  {
    id: 31,
    pillar: "Pillar 3: Personality & Temperament",
    q: "What role do you naturally fall into during a family festival or school annual day?",
    options: [
      { text: "Stage anchor, performer, or public speaker", traits: { creative: 9, extrovert: 9 } },
      { text: "Stage manager, timing coordinator, and logistical lead", traits: { discipline: 9, enterprise: 8 } },
      { text: "Sound system, lighting, electricals, and tech setup", traits: { practical: 10, tech: 8 } },
      { text: "Quietly welcoming guests, serving food, and comforting relatives", traits: { social: 10, empathy: 9 } }
    ]
  },
  {
    id: 32,
    pillar: "Pillar 3: Personality & Temperament",
    q: "When an unfair rule is enforced by an authority figure, what is your reaction?",
    options: [
      { text: "I research the official policy book and challenge it with legal logic", traits: { legal: 10, analytical: 9 } },
      { text: "I mobilize my peers together to demand fairness respectfully", traits: { leadership: 10, social: 8 } },
      { text: "I accept it as discipline and focus on doing my duty regardless", traits: { defence: 9, discipline: 9 } },
      { text: "I find a creative workaround behind the scenes", traits: { creative: 8, enterprise: 7 } }
    ]
  },
  {
    id: 33,
    pillar: "Pillar 3: Personality & Temperament",
    q: "How do you deal with physical exhaustion or tough weather (extreme heat, cold, rain)?",
    options: [
      { text: "I love outdoor challenges; physical grit makes me feel alive", traits: { defence: 10, practical: 10 } },
      { text: "I strongly prefer clean, air-conditioned indoor office spaces", traits: { conventional: 8, analytical: 7 } },
      { text: "I don't mind as long as I am exploring nature, animals, or farms", traits: { practical: 9, social: 7 } },
      { text: "I manage fine if I'm playing competitive sports", traits: { practical: 9, discipline: 8 } }
    ]
  },

  // 34-48: Vocational Calling & RIASEC Typology
  {
    id: 34,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "If you were handed a tool kit with screwdrivers, soldering iron, and wires, what would you do?",
    options: [
      { text: "Open up a broken radio or appliance immediately to see how it works", traits: { practical: 10, tech: 8 } },
      { text: "Carefully read the safety manual and put it in a safe cabinet", traits: { conventional: 8, discipline: 7 } },
      { text: "I have no interest in mechanical tools; I prefer books or screens", traits: { analytical: 8 } },
      { text: "Use the pieces to build a sculpture or creative art installation", traits: { artistic: 9, creative: 9 } }
    ]
  },
  {
    id: 35,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "Which YouTube or documentary topic would you click first?",
    options: [
      { text: "'How Black Holes Bend Spacetime' or 'Cracking the Human Genome'", traits: { analytical: 10, logic: 8 } },
      { text: "'Special Forces Selection: Surviving the Toughest Training on Earth'", traits: { defence: 10, discipline: 9 } },
      { text: "'How a 22-Year-Old Built an $80 Million Tech Company'", traits: { enterprise: 10, leadership: 8 } },
      { text: "'Inside the Mind of Criminals: Forensic Psychology Explained'", traits: { social: 9, legal: 8, analytical: 8 } }
    ]
  },
  {
    id: 36,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "When you visit a rural village or farmlands, what catches your thoughts?",
    options: [
      { text: "How drone seeding, smart sensors, and drip irrigation could boost crop yields", traits: { practical: 10, tech: 8 } },
      { text: "How villagers can get fair legal rights, healthcare clinics, and schools", traits: { social: 10, legal: 9 } },
      { text: "The peace and scenic beauty, inspiring me to paint or photograph", traits: { artistic: 10, creative: 9 } },
      { text: "The economics: supply chains, wholesale grain mandis, and farmer profits", traits: { enterprise: 9, conventional: 8 } }
    ]
  },
  {
    id: 37,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "If you could shadow a top professional for one entire week, who would you pick?",
    options: [
      { text: "A high-court Chief Justice arguing landmark constitutional cases", traits: { legal: 10, leadership: 8 } },
      { text: "An AI researcher training supercomputers on massive neural models", traits: { tech: 10, analytical: 10 } },
      { text: "An Army Colonel commanding border security operations", traits: { defence: 10, leadership: 9 } },
      { text: "A neurosurgeon conducting delicate brain surgery", traits: { analytical: 9, discipline: 10, social: 7 } }
    ]
  },
  {
    id: 38,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "How do you feel about managing money, stocks, and financial sheets?",
    options: [
      { text: "Fascinating; I love understanding profit margins, compounding, and wealth", traits: { enterprise: 10, conventional: 9 } },
      { text: "Too dry and boring for me; I care more about science, art, or public service", traits: { creative: 8, social: 8 } },
      { text: "Useful as a tool, but not something I want to spend my life doing", traits: { practical: 7 } },
      { text: "I like the mathematical and algorithmic aspect of trading models", traits: { analytical: 10, tech: 8 } }
    ]
  },
  {
    id: 39,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "When writing an essay or project, what is your primary strength?",
    options: [
      { text: "Clear, factual structure with bullet-proof data and citations", traits: { analytical: 9, conventional: 8 } },
      { text: "Poetic storytelling, deep metaphors, and emotional resonance", traits: { artistic: 10, creative: 10 } },
      { text: "Persuasive rhetoric that convinces the reader to take urgent action", traits: { legal: 9, enterprise: 9 } },
      { text: "Step-by-step practical guides on how to make or build something", traits: { practical: 9, tech: 7 } }
    ]
  },
  {
    id: 40,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "Which daily work environment sounds most inspiring to you?",
    options: [
      { text: "A buzzing command room or sports field where fast decisions save the day", traits: { defence: 10, leadership: 8 } },
      { text: "A quiet, private study lined with books, research papers, and dual monitors", traits: { analytical: 10, introvert: 8 } },
      { text: "A bustling courtroom or board meeting defending high-stakes issues", traits: { legal: 10, enterprise: 8 } },
      { text: "A hospital, therapy clinic, or classroom helping human beings thrive", traits: { social: 10, empathy: 10 } }
    ]
  },
  {
    id: 41,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "How do you feel about working with animals and veterinary care?",
    options: [
      { text: "I love animals deeply and wouldn't mind treating injured cows, dogs, or wildlife", traits: { practical: 10, empathy: 9 } },
      { text: "I like pets, but I don't want a medical career around animal diseases", traits: { analytical: 6 } },
      { text: "I'm more interested in human psychology and human minds", traits: { social: 10, analytical: 8 } },
      { text: "I prefer machines, engines, and code over biological care", traits: { tech: 9, practical: 8 } }
    ]
  },
  {
    id: 42,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "If you had a free month with zero exams, what would you choose to create?",
    options: [
      { text: "A mobile application, web tool, or smart automation script", traits: { tech: 10, analytical: 8 } },
      { text: "A 50-page fiction novella, photo album, or animated short film", traits: { artistic: 10, creative: 10 } },
      { text: "A small campus business or selling handmade goods for real profit", traits: { enterprise: 10, practical: 8 } },
      { text: "A free tutoring camp for underprivileged village kids", traits: { social: 10, empathy: 10 } }
    ]
  },
  {
    id: 43,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "How do you feel about national uniform services (Army, Navy, Air Force, Police)?",
    options: [
      { text: "Huge respect and desire to earn the uniform, stars, and serve the motherland", traits: { defence: 10, discipline: 10 } },
      { text: "Respectful, but I prefer civilian corporate or scientific careers", traits: { analytical: 8 } },
      { text: "I would serve as an army doctor, engineer, or cyber defence specialist", traits: { defence: 8, tech: 8, practical: 8 } },
      { text: "I prefer artistic and peaceful cultural professions", traits: { creative: 8, social: 7 } }
    ]
  },
  {
    id: 44,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "When you see a stunning building or bridge, what is your initial thought?",
    options: [
      { text: "The architectural beauty, light angles, and interior aesthetic feeling", traits: { artistic: 10, creative: 9 } },
      { text: "The structural load calculation: steel weight, concrete mix, and foundations", traits: { practical: 10, analytical: 8 } },
      { text: "Who funded the project, square-foot price, and real-estate returns", traits: { enterprise: 9, conventional: 8 } },
      { text: "How accessible and comfortable it is for elderly or disabled people", traits: { social: 9, empathy: 9 } }
    ]
  },
  {
    id: 45,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "How interested are you in how the human brain and feelings operate?",
    options: [
      { text: "Extremely; I constantly observe why people lie, feel anxious, or act kindly", traits: { social: 10, analytical: 9, empathy: 10 } },
      { text: "Only interested in the biological neurons and chemistry of the brain", traits: { analytical: 10 } },
      { text: "I prefer looking forward at future goals rather than overanalyzing past feelings", traits: { enterprise: 8, practical: 7 } },
      { text: "I find human feelings unpredictable and prefer clear mathematical rules", traits: { logic: 10, tech: 9 } }
    ]
  },
  {
    id: 46,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "What role does physical fitness and athletic discipline play in your daily life?",
    options: [
      { text: "Essential: I run, work out, or play competitive sports regularly", traits: { practical: 10, defence: 9, discipline: 9 } },
      { text: "Occasional: I play on weekends for fun, but study is my main priority", traits: { discipline: 7 } },
      { text: "Minimal: I spend almost all my time on intellectual desk pursuits", traits: { analytical: 8, introvert: 7 } },
      { text: "I am passionate about becoming a sports physio, coach, or trainer", traits: { practical: 10, social: 8 } }
    ]
  },
  {
    id: 47,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "When a complex law, tax code, or constitutional clause is discussed, what do you think?",
    options: [
      { text: "I enjoy dissecting each word, finding loopholes, and arguing justice", traits: { legal: 10, analytical: 9 } },
      { text: "I want to calculate the tax numbers accurately down to the exact rupee", traits: { conventional: 10, enterprise: 8 } },
      { text: "It seems dry and tedious; I would hire a lawyer to deal with it", traits: { creative: 7 } },
      { text: "I care about whether the law protects the poor and vulnerable", traits: { social: 10, legal: 8 } }
    ]
  },
  {
    id: 48,
    pillar: "Pillar 4: Vocational Calling & RIASEC",
    q: "If an airplane hits turbulent weather, what is your mindset?",
    options: [
      { text: "I stay cool and curious about cockpit aerodynamics, airspeed, and instruments", traits: { practical: 9, defence: 8, analytical: 8 } },
      { text: "I trust the trained pilots and keep calmly reading my book", traits: { discipline: 8 } },
      { text: "I comfort the nervous passenger sitting next to me", traits: { social: 10, empathy: 9 } },
      { text: "I feel nervous and keep tracking the altitude display", traits: { pressure: 6 } }
    ]
  },

  // 49-62: Group Dynamics, Collaboration & Ethics
  {
    id: 49,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "In a 5-person group project where 2 members are slacking off, what do you do?",
    options: [
      { text: "Have a firm, private 1-on-1 talk to understand their blocker and assign clear tasks", traits: { leadership: 10, social: 8 } },
      { text: "Just do the whole project myself in anger so we don't lose marks", traits: { discipline: 8, introvert: 7 } },
      { text: "Report them directly to the teacher with timestamped evidence", traits: { legal: 9, conventional: 8 } },
      { text: "Try to make the tasks fun and collaborative so they feel motivated to join", traits: { social: 10, empathy: 9 } }
    ]
  },
  {
    id: 50,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "When two close friends are having a screaming argument, what is your role?",
    options: [
      { text: "The impartial judge: hear both sides calmly and point out who is factually right", traits: { legal: 10, analytical: 8 } },
      { text: "The peacemaker: calm their tempers and help them apologize and forgive", traits: { social: 10, empathy: 10 } },
      { text: "Stay out of it completely; it's their personal business", traits: { introvert: 8 } },
      { text: "Command them both to stop shouting immediately and focus on the task", traits: { defence: 9, leadership: 8 } }
    ]
  },
  {
    id: 51,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "Would you rather be the public face of a successful team or the secret mastermind behind the curtain?",
    options: [
      { text: "The secret mastermind: I want full strategic control without public spotlight", traits: { analytical: 10, introvert: 9 } },
      { text: "The public face: I love speaking to crowds, press, and taking responsibility", traits: { enterprise: 10, leadership: 9, extrovert: 9 } },
      { text: "A loyal core executor doing the hardest hands-on heavy lifting", traits: { practical: 9, discipline: 9 } },
      { text: "The mentor who teaches and trains younger juniors to shine", traits: { social: 10, empathy: 9 } }
    ]
  },
  {
    id: 52,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "If you catch a teammate cheating on an exam, how do you handle it?",
    options: [
      { text: "Warn them firmly that if they do it again, you will report it — honor comes first", traits: { defence: 9, discipline: 10 } },
      { text: "Quietly report to the invigilator because unfairness harms all honest students", traits: { legal: 10, conventional: 8 } },
      { text: "Talk to them after the test to find out what desperate situation pushed them to cheat", traits: { social: 10, empathy: 10 } },
      { text: "Mind my own business and focus only on my own paper", traits: { introvert: 7 } }
    ]
  },
  {
    id: 53,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "How do you convince someone who strongly disagrees with you?",
    options: [
      { text: "Present clear statistical data, graphs, and proven case studies", traits: { analytical: 10, logic: 9 } },
      { text: "Understand their personal emotional fear first, then address it warmly", traits: { social: 10, empathy: 10 } },
      { text: "Use powerful rhetoric, real-life metaphors, and compelling analogies", traits: { legal: 9, creative: 8 } },
      { text: "Demonstrate a physical working prototype: proof speaks louder than words", traits: { practical: 10, tech: 8 } }
    ]
  },
  {
    id: 54,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "What kind of leader do you admire most?",
    options: [
      { text: "A battle-hardened commander who leads from the front lines and never leaves anyone behind", traits: { defence: 10, leadership: 9 } },
      { text: "A visionary scientist or engineer who creates breakthrough technology", traits: { tech: 10, analytical: 9 } },
      { text: "A compassionate reformer like Mahatma Gandhi, Nelson Mandela, or Mother Teresa", traits: { social: 10, empathy: 10 } },
      { text: "A bold entrepreneur who builds massive global industry and wealth", traits: { enterprise: 10, leadership: 8 } }
    ]
  },
  {
    id: 55,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "If your team wins a prestigious trophy, who deserves the credit?",
    options: [
      { text: "Give 100% of the spotlight to the team and quietly smile from the background", traits: { leadership: 10, empathy: 9 } },
      { text: "Fairly acknowledge each person's exact percentage contribution", traits: { analytical: 8, legal: 8 } },
      { text: "Proudly accept the trophy as captain, then thank every sponsor and member", traits: { enterprise: 9, extrovert: 8 } },
      { text: "Celebrate with street food and music together with the crew", traits: { social: 9, practical: 8 } }
    ]
  },
  {
    id: 56,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "When a junior student comes to you crying because of bullying, what is your first action?",
    options: [
      { text: "Sit down with them, listen patiently, and ensure they feel safe and cared for", traits: { social: 10, empathy: 10 } },
      { text: "Confront the bullies directly and make sure they never dare touch the student again", traits: { defence: 10, discipline: 8 } },
      { text: "Gather proof and file a strict formal grievance with school leadership", traits: { legal: 10, conventional: 8 } },
      { text: "Teach the student practical self-defence and assertive communication techniques", traits: { practical: 9, discipline: 8 } }
    ]
  },
  {
    id: 57,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "Do you prefer working solo in complete silence or in a collaborative buzzing room?",
    options: [
      { text: "Solo in deep silence: My best ideas come when zero people interrupt me", traits: { introvert: 10, analytical: 9 } },
      { text: "Collaborative buzzing room: Bouncing ideas off energetic people sparks my creativity", traits: { extrovert: 10, creative: 8, social: 8 } },
      { text: "A small trusted trio where everyone knows their precise duty", traits: { discipline: 8, practical: 8 } },
      { text: "Doesn't matter as long as the mission is clear and goals are tracked", traits: { leadership: 8, enterprise: 8 } }
    ]
  },
  {
    id: 58,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "How do you feel about competitive rivalry with peers?",
    options: [
      { text: "I love competition; it sharpens my skills and drives me to be #1", traits: { enterprise: 10, defence: 8 } },
      { text: "I dislike rivalry; I believe in collaboration where everyone wins together", traits: { social: 10, empathy: 10 } },
      { text: "My only competition is with who I was yesterday", traits: { discipline: 9, analytical: 8 } },
      { text: "I prefer working on niche topics where there is zero competition", traits: { creative: 9, artistic: 8 } }
    ]
  },
  {
    id: 59,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "If an employer offers you 3x salary to work for a company whose ethics you distrust, what do you do?",
    options: [
      { text: "Reject it immediately: Integrity and clear conscience cannot be bought", traits: { discipline: 10, social: 9, legal: 8 } },
      { text: "Take it for 2 years, accumulate capital, then fund ethical projects", traits: { enterprise: 10, analytical: 8 } },
      { text: "Join and try to reform their corrupt practices from the inside", traits: { leadership: 9, legal: 9 } },
      { text: "Consult my mentors and family before making any rash move", traits: { conventional: 8 } }
    ]
  },
  {
    id: 60,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "When a team project crashes due to a mistake you personally made, what do you do?",
    options: [
      { text: "Step up immediately, state 'This was my error', and deliver the fix without making excuses", traits: { leadership: 10, discipline: 10 } },
      { text: "Analyze the root cause on paper first, then present a corrected model", traits: { analytical: 10, logic: 8 } },
      { text: "Feel terrible and apologize deeply to everyone affected", traits: { empathy: 9, social: 7 } },
      { text: "Try to quietly patch the bug before anyone notices", traits: { tech: 7 } }
    ]
  },
  {
    id: 61,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "How do you manage people older or more experienced than you?",
    options: [
      { text: "Respect their seniority, listen to their wisdom, and lead through humility", traits: { leadership: 10, social: 9 } },
      { text: "Rely strictly on data and objective benchmarks so age doesn't matter", traits: { analytical: 9, conventional: 8 } },
      { text: "I feel very intimidated directing older elders", traits: { introvert: 8 } },
      { text: "Clear protocols, checklists, and respectful military-style decorum", traits: { defence: 9, discipline: 9 } }
    ]
  },
  {
    id: 62,
    pillar: "Pillar 5: Teamwork & Group Dynamics",
    q: "If your friend shares an emotional secret with you, how safe is it?",
    options: [
      { text: "It goes to my grave: absolute loyalty and confidentiality", traits: { social: 10, discipline: 10, empathy: 10 } },
      { text: "Safe, unless it poses a real physical danger to their life", traits: { legal: 10, analytical: 8 } },
      { text: "I sometimes slip up if talking to my parents", traits: { social: 6 } },
      { text: "I help them write it down so they can process the trauma", traits: { creative: 8, social: 8 } }
    ]
  },

  // 63-75: Applied Scenarios & Life Purpose
  {
    id: 63,
    pillar: "Pillar 6: Practical Scenarios & Life Purpose",
    q: "At age 75 looking back at your life, what would make you feel your journey was truly successful?",
    options: [
      { text: "I served and defended my nation with honor, courage, and pride", traits: { defence: 10, discipline: 10 } },
      { text: "I unlocked scientific mysteries, invented technology, or created medical cures", traits: { analytical: 10, tech: 10 } },
      { text: "I lifted hundreds of struggling families out of poverty, distress, or illness", traits: { social: 10, empathy: 10 } },
      { text: "I built enterprises, created thousands of jobs, and established lasting institutions", traits: { enterprise: 10, leadership: 10 } }
    ]
  },
  {
    id: 64,
    pillar: "Pillar 6: Practical Scenarios & Life Purpose",
    q: "During a major flood disaster in a town, where do you naturally rush to help?",
    options: [
      { text: "In rescue boats pulling stranded citizens and animals out of the floodwaters", traits: { practical: 10, defence: 10 } },
      { text: "In the medical emergency camp bandaging wounds and administering IV fluids", traits: { practical: 9, social: 10 } },
      { text: "In the central control room managing logistics, food trucks, and communications", traits: { enterprise: 9, leadership: 9, conventional: 8 } },
      { text: "Documenting the truth on camera so the world sends urgent international relief", traits: { artistic: 9, legal: 8 } }
    ]
  },
  {
    id: 65,
    pillar: "Pillar 6: Practical Scenarios & Life Purpose",
    q: "Which kind of problem would keep your mind engaged for weeks without getting bored?",
    options: [
      { text: "Designing an autonomous robot that can navigate rough agricultural soil", traits: { tech: 10, practical: 9 } },
      { text: "Drafting a constitutional appeal that reverses an unjust court judgment", traits: { legal: 10, analytical: 9 } },
      { text: "Helping a severely traumatized teenager rebuild their confidence and smile again", traits: { social: 10, empathy: 10 } },
      { text: "Forecasting the next 5-year trend in world stock markets and global trade", traits: { enterprise: 10, analytical: 9 } }
    ]
  },
  {
    id: 66,
    pillar: "Pillar 6: Practical Scenarios & Life Purpose",
    q: "If you received a grant of 10 Lakhs INR to spend on any equipment for yourself, what do you buy?",
    options: [
      { text: "High-end compute server with multiple GPUs for deep learning and AI models", traits: { tech: 10, analytical: 9 } },
      { text: "A cinema camera, sound recording gear, and professional editing suite", traits: { artistic: 10, creative: 10 } },
      { text: "Advanced farming drone, soil moisture sensors, and greenhouse lab kit", traits: { practical: 10 } },
      { text: "A certified law and chartered accountancy research library & conference pass", traits: { legal: 9, conventional: 9 } }
    ]
  },
  {
    id: 67,
    pillar: "Pillar 6: Practical Scenarios & Life Purpose",
    q: "How do you feel about traveling and living in different remote states or countries?",
    options: [
      { text: "Thrilled! I love packing my bags, meeting strange cultures, and adapting", traits: { extrovert: 9, defence: 8, practical: 8 } },
      { text: "I prefer staying rooted close to my hometown, family, and lifelong friends", traits: { conventional: 8, introvert: 7 } },
      { text: "Fine as long as the research facility or university campus has great resources", traits: { analytical: 9 } },
      { text: "I want to work globally in major financial and tech hubs like London, NYC, or Singapore", traits: { enterprise: 10, tech: 8 } }
    ]
  },
  {
    id: 68,
    pillar: "Pillar 6: Practical Scenarios & Life Purpose",
    q: "When you read about a mysterious unsolved criminal case, what do you focus on?",
    options: [
      { text: "Forensic evidence: DNA traces, fingerprint patterns, and ballistics data", traits: { analytical: 10, logic: 9 } },
      { text: "Criminal psychology: What was the motive, childhood trauma, and psychological trigger?", traits: { social: 10, empathy: 8 } },
      { text: "Police strategy: How the investigative cordon was laid out and suspects cornered", traits: { defence: 9, leadership: 8 } },
      { text: "Courtroom trial: How the defence and prosecution lawyers presented their witnesses", traits: { legal: 10 } }
    ]
  },
  {
    id: 69,
    pillar: "Pillar 6: Practical Scenarios & Life Purpose",
    q: "If a machine you rely on suddenly makes a weird screeching noise and stops, what is your instinct?",
    options: [
      { text: "Unplug it, grab a flashlight and screwdriver, and look at the gears and belt", traits: { practical: 10, tech: 8 } },
      { text: "Check the warranty receipt, call the customer service technician, and log a ticket", traits: { conventional: 9 } },
      { text: "Look up the exact error code or symptoms on a repair forum or YouTube", traits: { analytical: 9, logic: 8 } },
      { text: "Ask someone else in the family who knows mechanics better", traits: { social: 6 } }
    ]
  },
  {
    id: 70,
    pillar: "Pillar 6: Practical Scenarios & Life Purpose",
    q: "What gives you more pride: creating a physical object you can hold, or writing an elegant digital program?",
    options: [
      { text: "A physical object: A crafted wooden table, repaired engine, or hand-drawn architectural model", traits: { practical: 10, artistic: 8 } },
      { text: "A digital program: A clean script running lightning-fast in the terminal", traits: { tech: 10, analytical: 9 } },
      { text: "A well-written persuasive legal brief or published investigative article", traits: { legal: 9, creative: 9 } },
      { text: "A child or student passing their exams because you personally coached them", traits: { social: 10, empathy: 10 } }
    ]
  },
  {
    id: 71,
    pillar: "Pillar 6: Practical Scenarios & Life Purpose",
    q: "How important is having a predictable daily routine (same waking time, fixed tasks, predictable days)?",
    options: [
      { text: "Extremely important: Predictable structure helps me stay focused and calm", traits: { conventional: 10, discipline: 9 } },
      { text: "I despise predictability: I want every single day to be a fresh, unpredictable adventure", traits: { creative: 9, defence: 8, enterprise: 8 } },
      { text: "A mix: Fixed morning habits, but flexible work challenges throughout the day", traits: { analytical: 8, leadership: 8 } },
      { text: "I adapt to whatever schedule my patients, students, or team need from me", traits: { social: 9, empathy: 9 } }
    ]
  },
  {
    id: 72,
    pillar: "Pillar 6: Practical Scenarios & Life Purpose",
    q: "If you had to teach an 8-year-old child a complex subject, how would you approach it?",
    options: [
      { text: "Turn it into an imaginative fairy tale or animated comic story", traits: { artistic: 10, creative: 10 } },
      { text: "Use real-life hands-on objects (coins, water cups, blocks) they can touch", traits: { practical: 10, social: 8 } },
      { text: "Break it down into simple logical rules and fun mini-quizzes", traits: { analytical: 9, discipline: 8 } },
      { text: "Listen to the child's questions first and let their own curiosity lead", traits: { social: 10, empathy: 10 } }
    ]
  },
  {
    id: 73,
    pillar: "Pillar 6: Practical Scenarios & Life Purpose",
    q: "How do you respond when someone lies directly to your face?",
    options: [
      { text: "I spot the micro-expressions and body language immediately and remember it quietly", traits: { analytical: 10, social: 8 } },
      { text: "I cross-question them with contradictions until they are forced to admit the truth", traits: { legal: 10, logic: 9 } },
      { text: "I feel sad for them and wonder why they felt too unsafe to tell the truth", traits: { empathy: 10, social: 9 } },
      { text: "I lose all respect for them and cut them out of my inner circle", traits: { discipline: 9 } }
    ]
  },
  {
    id: 74,
    pillar: "Pillar 6: Practical Scenarios & Life Purpose",
    q: "Would you rather earn 50 Lakhs doing work that harms the environment or 15 Lakhs creating clean green technology?",
    options: [
      { text: "15 Lakhs for clean green tech without a doubt — values always trump money", traits: { social: 10, discipline: 9 } },
      { text: "15 Lakhs, and use innovation to scale it into a 50 Lakh business cleanly", traits: { enterprise: 10, tech: 8 } },
      { text: "Money matters most early in career to secure family, then switch to ethics later", traits: { enterprise: 8, conventional: 7 } },
      { text: "I would dedicate myself to enforcing strict environmental laws against violators", traits: { legal: 10, defence: 8 } }
    ]
  },
  {
    id: 75,
    pillar: "Pillar 6: Practical Scenarios & Life Purpose",
    q: "Final question: When you close your eyes, which mental image fills your chest with the most courage?",
    options: [
      { text: "Marching in an olive-green or white uniform saluting the national tricolor", traits: { defence: 10, discipline: 10 } },
      { text: "Watching code or algorithms you designed power systems across the globe", traits: { tech: 10, analytical: 10 } },
      { text: "Looking into the grateful eyes of a person or family whose life you saved", traits: { social: 10, empathy: 10 } },
      { text: "Standing in a high court arguing justice for those who had no voice", traits: { legal: 10, leadership: 9 } }
    ]
  }
];

// --- 14 IN-DEPTH CAREER ROADMAPS ---
const CAREER_DATABASE = {
  defence: {
    title: "Armed Forces Officer (Army / Navy / Air Force)",
    badge: "Courage, Honour & Leadership",
    matchScore: 96,
    desc: "Lead troops, pilot fighter aircraft, command naval warships, and defend the sovereign borders of the nation. Unmatched camaraderie, discipline, and service pride.",
    streams: "11th & 12th: Physics, Chemistry & Math (PCM) for Air Force/Navy; Any stream for Army.",
    indiaPath: "National Defence Academy (NDA Khadakwasla, Pune), Indian Military Academy (IMA Dehradun), Air Force Academy (Dundigal), INA Ezhimala via CDS / AFCAT.",
    abroadPath: "Royal Military Academy Sandhurst (UK), West Point (USMA, USA), Australian Defence Force Academy.",
    exams: "NDA Exam (UPSC), CDS (Combined Defence Services), AFCAT, SSB 5-Day Interview.",
    salary: "Starting: ₹10 - 14 LPA (Lieutenant) | Senior Officer / General: ₹25 - 32 LPA + official accommodation, medical, rations."
  },
  psychology: {
    title: "Clinical Psychologist & Mental Health Psychotherapist",
    badge: "Empathy, Healing & Science of Mind",
    matchScore: 94,
    desc: "Diagnose psychological conditions, assist adolescents and families through distress, run psychiatric clinics, and research cognitive neurosciences.",
    streams: "11th & 12th: Any stream (Humanities / PCB preferred with Psychology).",
    indiaPath: "BA/B.Sc Psychology from Delhi University, Christ University, TISS, followed by M.Phil / Psy.D from NIMHANS Bangalore or CIP Ranchi (RCI License).",
    abroadPath: "Oxford, Harvard, King's College London, University of Toronto, University of Melbourne.",
    exams: "CUET-UG, NIMHANS Entrance, RCI Licensing Examination.",
    salary: "Starting: ₹5 - 9 LPA | Established Private Practice / Hospital Lead: ₹18 - 35 LPA ($75k - $140k abroad)."
  },
  tech: {
    title: "Computer Science & AI Systems Architect",
    badge: "Logic, Automation & Code",
    matchScore: 95,
    desc: "Build next-generation artificial intelligence models, cloud security architectures, operating systems, and high-performance algorithms.",
    streams: "11th & 12th: Physics, Chemistry, Math (PCM) + Computer Science.",
    indiaPath: "B.Tech Computer Science from IIT Bombay, IIT Delhi, BITS Pilani, IIIT Hyderabad, NIT Trichy.",
    abroadPath: "MIT, Stanford, Carnegie Mellon University (CMU), UC Berkeley, NUS Singapore.",
    exams: "JEE Main, JEE Advanced, BITSAT, SAT / GRE for overseas.",
    salary: "Starting: ₹14 - 28 LPA | Senior Staff Engineer / Silicon Valley Architect: ₹50 LPA - ₹1.5 Cr+ ($150k - $300k)."
  },
  legal: {
    title: "Corporate Legal Counsel & High Court Advocate",
    badge: "Justice, Rhetoric & Constitutional Law",
    matchScore: 93,
    desc: "Fight constitutional matters, represent public interest litigations, draft major corporate mergers, and progress towards the judicial magistrate bench.",
    streams: "11th & 12th: Any stream (Humanities / Commerce / Science with strong English).",
    indiaPath: "5-Year Integrated BA.LL.B / BBA.LL.B from NLSIU Bangalore, NALSAR Hyderabad, WBNUJS Kolkata, NLU Delhi.",
    abroadPath: "Oxford University (BCL), Harvard Law School (LLM), Cambridge, Columbia Law School.",
    exams: "CLAT (Common Law Admission Test), AILET, LSAT India, Bar Council Exam (AIBE).",
    salary: "Starting: ₹12 - 18 LPA (Tier-1 Law Firms) | Senior Designated Advocate / Partner: ₹50 LPA - ₹2 Cr+."
  },
  finance: {
    title: "Chartered Accountant & Investment Analyst",
    badge: "Forensic Numbers, Capital & Wealth",
    matchScore: 91,
    desc: "Audit corporate accounts, detect forensic financial fraud, manage multimillion-dollar investment portfolios, and guide business mergers.",
    streams: "11th & 12th: Commerce with Mathematics (or PCM).",
    indiaPath: "ICAI Chartered Accountancy (CA Foundation -> Inter -> Articleship -> CA Final), SRCC Delhi, IIM Ahmedabad.",
    abroadPath: "London School of Economics (LSE), Wharton (Penn), Stern (NYU), CFA Institute (USA).",
    exams: "CA Foundation, CUET-UG, CAT, CFA Level 1-3.",
    salary: "Starting: ₹10 - 15 LPA (Big-4 Audit) | Partner / Hedge Fund Analyst: ₹40 - 90 LPA+ ($120k - $240k)."
  },
  civilServices: {
    title: "Civil Services Officer (IAS / IPS / IFS)",
    badge: "Governance, Public Administration & Impact",
    matchScore: 95,
    desc: "Run entire administrative districts, direct police forces, implement government welfare schemes, or represent India diplomatically as an ambassador.",
    streams: "11th & 12th: Any stream (Humanities, Science, or Commerce).",
    indiaPath: "Graduation from any recognized university (IITs, DU, JNU, State Universities) followed by UPSC Civil Services Examination.",
    abroadPath: "Kennedy School of Government (Harvard), Blavatnik School of Government (Oxford) for mid-career fellowships.",
    exams: "UPSC CSE (Prelims, Mains, Personality Interview).",
    salary: "Starting: Level 10 Pay Matrix (~₹80,000/month basic + DA) with official residence, security, and administrative authority."
  },
  agriTech: {
    title: "Precision Agri-Tech Innovator & Veterinary Specialist",
    badge: "Sustainable Earth, Food Security & Animals",
    matchScore: 90,
    desc: "Deploy autonomous soil sensors, automated green houses, and manage large-scale veterinary clinics to modernize farming and animal care.",
    streams: "11th & 12th: Physics, Chemistry & Biology (PCB) or Agriculture.",
    indiaPath: "B.V.Sc & A.H (Veterinary) or B.Sc Agriculture from IVRI Bareilly, GB Pant Pantnagar, PAU Ludhiana, TNAU Coimbatore.",
    abroadPath: "Wageningen University (Netherlands), UC Davis (USA), Cornell University, Royal Veterinary College (London).",
    exams: "NEET-UG (for 15% All India Veterinary quota), ICAR AIEEA.",
    salary: "Starting: ₹6 - 10 LPA | Agri-Tech Lead / International Consultant: ₹20 - 45 LPA ($85k - $160k)."
  },
  architecture: {
    title: "Architect & Sustainable Urban Designer",
    badge: "Spatial Aesthetics, 3D Design & Cities",
    matchScore: 92,
    desc: "Design iconic buildings, green smart cities, eco-friendly homes, and virtual 3D environments using CAD and structural engineering.",
    streams: "11th & 12th: Physics, Chemistry & Math (PCM).",
    indiaPath: "B.Arch from IIT Kharagpur, IIT Roorkee, SPA Delhi, CEPT University Ahmedabad.",
    abroadPath: "Architectural Association (AA London), MIT Architecture, TU Delft, ETH Zurich.",
    exams: "NATA (National Aptitude Test in Architecture), JEE Main Paper 2.",
    salary: "Starting: ₹6 - 10 LPA | Principal Architect / Design Firm Founder: ₹25 - 60 LPA+."
  }
};

export default function App() {
  // Navigation & session state
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'auth' | 'quiz' | 'analyzing' | 'report'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [currentUser, setCurrentUser] = useState(null);

  // Authentication fields
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Roster Database state
  const [userRoster, setUserRoster] = useState([
    { name: "Demo Student", email: "student@school.edu", password: "password123", date: "2026-10-01", status: "Active" },
    { name: "Aarav Sharma", email: "aarav@gmail.com", password: "testpass", date: "2026-10-02", status: "Active" }
  ]);
  const [isRosterModalOpen, setIsRosterModalOpen] = useState(false);
  const [rosterSearch, setRosterSearch] = useState('');
  const [sheetUrl, setSheetUrl] = useState("https://docs.google.com/spreadsheets/d/1Bv16i3BDu7jZ5xq4qz7cLJGfFrfWrsoRGEdOlLO3guc/edit?usp=sharing");
  const [isSyncing, setIsSyncing] = useState(false);

  // Founder photo state
  const [founderPhoto, setFounderPhoto] = useState(null);

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState({});
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Final diagnostic results
  const [diagnosticResult, setDiagnosticResult] = useState(null);

  // Handle founder photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFounderPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Sync Google Sheet roster (CSV export endpoint)
  const syncGoogleSheet = async () => {
    setIsSyncing(true);
    try {
      const match = sheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (!match || !match[1]) {
        alert("Please enter a valid Google Sheets URL.");
        setIsSyncing(false);
        return;
      }
      const sheetId = match[1];
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
      
      const response = await fetch(csvUrl);
      if (!response.ok) throw new Error("Could not access sheet. Ensure sharing is set to 'Anyone with link can view'.");
      const text = await response.text();
      
      const rows = text.split('\n').filter(r => r.trim() !== '');
      if (rows.length > 1) {
        const fetched = [];
        for (let i = 1; i < rows.length; i++) {
          const cols = rows[i].split(',').map(c => c.replace(/^"|"$/g, '').trim());
          if (cols.length >= 2) {
            fetched.push({
              name: cols[0] || `Student #${i}`,
              email: cols[1] || "",
              password: cols[2] || "password123",
              date: cols[3] || new Date().toISOString().split('T')[0],
              status: "Synced"
            });
          }
        }
        if (fetched.length > 0) {
          setUserRoster(prev => {
            const emails = new Set(prev.map(u => u.email.toLowerCase()));
            const newUsers = fetched.filter(u => u.email && !emails.has(u.email.toLowerCase()));
            return [...newUsers, ...prev];
          });
          alert(`Success! Synced ${fetched.length} student records from your Google Sheet.`);
        }
      }
    } catch (err) {
      alert("Note: Google Sheet needs 'Anyone with link can view' permissions to sync directly in-browser. Sample demo users remain active.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Auth: Register or Login
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    const cleanEmail = authEmail.trim().toLowerCase();
    const cleanPassword = authPassword.trim();

    if (!cleanEmail || !cleanPassword) {
      setAuthError("Please fill in both email and password.");
      return;
    }

    if (authMode === 'register') {
      if (!authName.trim()) {
        setAuthError("Please enter your full name.");
        return;
      }
      const existing = userRoster.find(u => u.email.toLowerCase() === cleanEmail);
      if (existing) {
        setAuthError("This email is already registered. Please log in directly.");
        return;
      }
      const newUser = {
        name: authName.trim(),
        email: cleanEmail,
        password: cleanPassword,
        date: new Date().toISOString().split('T')[0],
        status: "Active"
      };
      setUserRoster(prev => [newUser, ...prev]);
      setCurrentUser(newUser);
      setCurrentView('quiz');
    } else {
      // Login mode
      const matched = userRoster.find(
        u => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword
      );
      if (matched) {
        setCurrentUser(matched);
        setCurrentView('quiz');
      } else {
        setAuthError("Account not found in the spreadsheet database. Please check your credentials or register above.");
      }
    }
  };

  // Quiz Answer Selection
  const handleSelectOption = (questionId, optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const toggleBookmark = (qId) => {
    setBookmarkedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Finish assessment and calculate scores
  const handleSubmitAssessment = () => {
    setCurrentView('analyzing');

    setTimeout(() => {
      // Tally traits
      const traitScores = {
        logic: 0,
        spatial: 0,
        analytical: 0,
        defence: 0,
        social: 0,
        empathy: 0,
        tech: 0,
        legal: 0,
        enterprise: 0,
        discipline: 0,
        creative: 0,
        artistic: 0,
        practical: 0,
        conventional: 0,
        leadership: 0,
        clarity: 0,
        pressure: 0
      };

      let correctAptitudeCount = 0;

      QUESTIONS.forEach(q => {
        const selectedIdx = userAnswers[q.id];
        if (selectedIdx !== undefined) {
          const selectedOption = q.options[selectedIdx];
          if (q.isAptitude && selectedIdx === q.correctIndex) {
            correctAptitudeCount += 1;
          }
          if (selectedOption.traits) {
            Object.entries(selectedOption.traits).forEach(([trait, score]) => {
              if (traitScores[trait] !== undefined) {
                traitScores[trait] += score;
              }
            });
          }
        }
      });

      // Calculate primary and secondary career recommendations
      const careerScores = [
        { key: 'tech', score: traitScores.tech + traitScores.logic + traitScores.analytical },
        { key: 'defence', score: traitScores.defence + traitScores.discipline + traitScores.leadership },
        { key: 'legal', score: traitScores.legal + traitScores.analytical + traitScores.leadership },
        { key: 'psychology', score: traitScores.social + traitScores.empathy + traitScores.analytical },
        { key: 'finance', score: traitScores.enterprise + traitScores.conventional + traitScores.logic },
        { key: 'civilServices', score: traitScores.leadership + traitScores.social + traitScores.legal },
        { key: 'agriTech', score: traitScores.practical + traitScores.tech + traitScores.empathy },
        { key: 'architecture', score: traitScores.creative + traitScores.artistic + traitScores.spatial }
      ];

      careerScores.sort((a, b) => b.score - a.score);

      const topCareer = CAREER_DATABASE[careerScores[0].key] || CAREER_DATABASE.tech;
      const secondaryCareer = CAREER_DATABASE[careerScores[1].key] || CAREER_DATABASE.defence;

      setDiagnosticResult({
        primary: topCareer,
        secondary: secondaryCareer,
        aptitudeScore: correctAptitudeCount,
        clarityScore: traitScores.clarity,
        pressureScore: traitScores.pressure,
        traitScores
      });

      setCurrentView('report');
    }, 2800);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const currentQuestion = QUESTIONS[currentQIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div 
          onClick={() => setCurrentView('landing')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              DeepPath
            </span>
            <span className="block text-[10px] tracking-wider uppercase font-semibold text-emerald-400">
              Career & Psychometrics
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRosterModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Google Sheet Roster</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-900 text-[10px] font-bold text-emerald-400">
              {userRoster.length}
            </span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                <p className="text-[10px] text-emerald-400">{currentUser.email}</p>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setCurrentView('landing');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-rose-400 transition"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthMode('login');
                setCurrentView('auth');
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg"
            >
              <span>Start Career Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* ROSTER / SPREADSHEET MODAL */}
      {isRosterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">Student Roster Database</h3>
              </div>
              <button
                onClick={() => setIsRosterModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 border-b border-slate-800 bg-slate-950/50">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="Paste Google Sheets link (Anyone with link can view)..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={syncGoogleSheet}
                  disabled={isSyncing}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-bold transition whitespace-nowrap"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Sheet'}</span>
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={rosterSearch}
                  onChange={(e) => setRosterSearch(e.target.value)}
                  placeholder="Search registered student name or email..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="rounded-xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/60 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Full Name</th>
                      <th className="p-3">Email Address</th>
                      <th className="p-3">Password</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {userRoster
                      .filter(u => 
                        u.name.toLowerCase().includes(rosterSearch.toLowerCase()) || 
                        u.email.toLowerCase().includes(rosterSearch.toLowerCase())
                      )
                      .map((u, i) => (
                        <tr key={i} className="hover:bg-slate-800/30">
                          <td className="p-3 font-medium text-white">{u.name}</td>
                          <td className="p-3 text-slate-400">{u.email}</td>
                          <td className="p-3 font-mono text-[11px] text-emerald-400/80">{u.password}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {u.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Anyone registered here can log in and take the assessment.</span>
              <button
                onClick={() => setIsRosterModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: LANDING PAGE */}
      {currentView === 'landing' && (
        <main className="flex-1 max-w-5xl mx-auto px-4 lg:px-8 py-12 space-y-16">
          {/* HERO BANNER */}
          <section className="text-center space-y-6 max-w-3xl mx-auto pt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>75-Question Comprehensive Psychometric & Aptitude Battery</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Discover the career that <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">fits you best</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Step by step, from school to your dream job. Untimed, honest, and built with plain-English questions to evaluate your natural cognitive aptitude, emotional temperament, and vocational calling.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setCurrentView('auth');
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Take the Career Test</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setIsRosterModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-sm font-semibold transition flex items-center justify-center gap-2"
              >
                <Database className="w-4 h-4 text-emerald-400" />
                <span>View Google Sheet Roster</span>
              </button>
            </div>
          </section>

          {/* FOUNDER DESK WITH PHOTO UPLOAD */}
          <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
              {/* Photo Box */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl border-2 border-dashed border-emerald-500/40 bg-slate-950 overflow-hidden flex flex-col items-center justify-center relative group shadow-xl">
                  {founderPhoto ? (
                    <img src={founderPhoto} alt="Founder" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-3">
                      <Camera className="w-8 h-8 text-emerald-400/60 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] text-slate-400 font-medium leading-tight block">
                        Upload Your Photo
                      </span>
                    </div>
                  )}
                  <label className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition text-xs font-semibold text-emerald-400">
                    <Camera className="w-5 h-5 mb-1" />
                    <span>{founderPhoto ? 'Change Photo' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                </div>
                <span className="text-[11px] font-mono text-emerald-400/80 uppercase tracking-widest">
                  Platform Founder
                </span>
              </div>

              {/* Message */}
              <div className="space-y-4 text-center md:text-left flex-1">
                <div className="inline-block px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                  Founder's Desk
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Built to guide every student toward genuine conviction.
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Too often, students are pushed into careers based solely on family pressure or vague advice that groups everyone into just two choices. 
                  Every student has a distinct blend of spatial logic, social empathy, creative intuition, and tolerance for pressure. 
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  DeepPath provides an untimed, 75-question diagnostic designed in simple, clear English. It doesn't rush you with timers—it measures who you really are and maps you to step-by-step roadmaps in India and abroad.
                </p>
              </div>
            </div>
          </section>

          {/* 6 DIAGNOSTIC PILLARS PREVIEW */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">The 6 Diagnostic Pillars</h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Carefully calibrated to reveal your cognitive baseline, emotional resilience, and vocational match.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Aptitude & Logic", q: "10 Questions", desc: "Numerical sequences, speed-distance-time, spatial 3D cubes, and logical syllogisms." },
                { title: "Career Decidedness", q: "8 Questions", desc: "Assesses family expectations, peer influence, and personal certainty." },
                { title: "Personality & Temperament", q: "15 Questions", desc: "Big-Five metrics: introversion, stress resilience, structure, and emotional judgment." },
                { title: "Vocational Calling", q: "15 Questions", desc: "RIASEC exploration across mechanics, law, healthcare, AI, defence, and design." },
                { title: "Teamwork & Ethics", q: "14 Questions", desc: "Group conflicts, handling pressure, integrity dilemmas, and frontline leadership." },
                { title: "Real Scenarios & Purpose", q: "13 Questions", desc: "Hands-on emergency reactions, lifetime legacy goals, and core values." }
              ].map((p, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-400 font-mono">0{idx + 1}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">{p.q}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">{p.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* VIEW: AUTHENTICATION MODAL / SCREEN */}
      {currentView === 'auth' && (
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                {authMode === 'login' ? 'Sign In to DeepPath' : 'Register New Student'}
              </h2>
              <p className="text-xs text-slate-400">
                {authMode === 'login'
                  ? 'Your email and password are validated against the spreadsheet database.'
                  : 'Registering adds your account to the database so you can start immediately.'}
              </p>
            </div>

            {authError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="student@school.edu"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition"
              >
                {authMode === 'login' ? 'Verify Credentials & Start Test' : 'Register & Begin Assessment'}
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-slate-400 border-t border-slate-800">
              {authMode === 'login' ? (
                <p>
                  Not in the database yet?{' '}
                  <button
                    onClick={() => {
                      setAuthError('');
                      setAuthMode('register');
                    }}
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    Register here
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{' '}
                  <button
                    onClick={() => {
                      setAuthError('');
                      setAuthMode('login');
                    }}
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    Log in directly
                  </button>
                </p>
              )}
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Quick Test Account:</span>
              <button
                onClick={() => {
                  setAuthEmail("student@school.edu");
                  setAuthPassword("password123");
                }}
                className="text-emerald-400 font-semibold hover:underline"
              >
                Autofill Demo
              </button>
            </div>
          </div>
        </main>
      )}

      {/* VIEW: FULL SCREEN QUIZ VIEW */}
      {currentView === 'quiz' && currentQuestion && (
        <main className="flex-1 flex flex-col bg-slate-950">
          {/* Top Test Header Bar */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-emerald-400 font-mono">
                QUESTION {currentQIndex + 1} OF {QUESTIONS.length}
              </span>
              <span className="hidden sm:inline text-xs text-slate-500">•</span>
              <span className="hidden sm:inline text-xs text-slate-400 font-medium">
                {currentQuestion.pillar}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleBookmark(currentQuestion.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                  bookmarkedQuestions[currentQuestion.id]
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {bookmarkedQuestions[currentQuestion.id] ? 'Bookmarked' : 'Bookmark'}
                </span>
              </button>

              <button
                onClick={() => setIsPaletteOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Question Palette ({answeredCount}/75)</span>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-1">
            <div
              className="bg-emerald-400 h-1 transition-all duration-300"
              style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question & Options Body */}
          <div className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-8 flex flex-col justify-center space-y-8">
            <div className="space-y-3">
              <span className="sm:hidden text-xs font-semibold text-emerald-400 block">
                {currentQuestion.pillar}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                {currentQuestion.q}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQuestion.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500 shadow-lg shadow-emerald-500/10 text-white'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-400 text-slate-950 font-bold text-xs'
                          : 'border-slate-700 text-slate-500 text-xs'
                      }`}
                    >
                      {isSelected ? '✓' : String.fromCharCode(65 + optIdx)}
                    </div>
                    <span className="text-sm sm:text-base leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Question Navigation Controls */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold text-slate-300 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-3">
                {currentQIndex < QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex(prev => prev + 1)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold transition shadow-md shadow-emerald-500/20"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitAssessment}
                    className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-extrabold shadow-lg shadow-emerald-400/20 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Assessment</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* PALETTE DRAWER / MODAL */}
          {isPaletteOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">Question Palette (1 to 75)</h3>
                    <p className="text-xs text-slate-400">
                      Answered: {answeredCount} | Remaining: {QUESTIONS.length - answeredCount}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPaletteOpen(false)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                    {QUESTIONS.map((q, idx) => {
                      const isAnswered = userAnswers[q.id] !== undefined;
                      const isBookmarked = bookmarkedQuestions[q.id];
                      const isCurrent = currentQIndex === idx;

                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            setCurrentQIndex(idx);
                            setIsPaletteOpen(false);
                          }}
                          className={`h-11 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center relative border ${
                            isCurrent
                              ? 'border-emerald-400 ring-2 ring-emerald-400/30 text-white'
                              : isAnswered
                              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{idx + 1}</span>
                          {isBookmarked && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-1 right-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500" /> Answered
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-slate-950 border border-slate-800" /> Unanswered
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" /> Bookmarked
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setIsPaletteOpen(false);
                      handleSubmitAssessment();
                    }}
                    className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition"
                  >
                    Finish Test
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* VIEW: ANALYZING STATE */}
      {currentView === 'analyzing' && (
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
            <BrainCircuit className="w-8 h-8 text-emerald-400 absolute inset-0 m-auto" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-2xl font-bold text-white">Synthesizing 75 Data Points...</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evaluating cognitive puzzle logic, psychological Big-Five traits, social team dynamics, and family expectation variables.
            </p>
          </div>
        </main>
      )}

      {/* VIEW: COMPREHENSIVE REPORT */}
      {currentView === 'report' && diagnosticResult && (
        <main className="flex-1 max-w-5xl mx-auto px-4 lg:px-8 py-10 space-y-12">
          {/* Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Psychometric Evaluation Completed</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Career Diagnostic Profile
                </h1>
                <p className="text-xs text-slate-400">
                  Student: <span className="text-white font-semibold">{currentUser ? currentUser.name : "Registered Student"}</span> | Assessment Date: {new Date().toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
              >
                Print / Save PDF
              </button>
            </div>
          </div>

          {/* METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">Aptitude & Logic</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">{diagnosticResult.aptitudeScore} / 10</span>
                <span className="text-xs text-slate-400">Puzzles Solved</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Cognitive aptitude percentile: {Math.round((diagnosticResult.aptitudeScore / 10) * 100)}%
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider">Personal Conviction</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">{diagnosticResult.clarityScore}</span>
                <span className="text-xs text-slate-400">Clarity Points</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Indicates independent drive vs reliance on external guidance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">Pressure Index</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">{diagnosticResult.pressureScore}</span>
                <span className="text-xs text-slate-400">External Strain</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Measures parental expectations, competition stress, and exam fear.
              </p>
            </div>
          </div>

          {/* PRIMARY CAREER MATCH */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>Primary Recommended Career Path</span>
            </h2>

            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border border-emerald-500/30 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {diagnosticResult.primary.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    {diagnosticResult.primary.title}
                  </h3>
                </div>
                <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6">
                  <span className="text-3xl font-black text-emerald-400">{diagnosticResult.primary.matchScore}%</span>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Psychometric Fit</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {diagnosticResult.primary.desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div className="space-y-1.5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-emerald-400 font-bold block uppercase text-[10px] tracking-wider">
                    School Streams (11th & 12th)
                  </span>
                  <p className="text-slate-300">{diagnosticResult.primary.streams}</p>
                </div>

                <div className="space-y-1.5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-emerald-400 font-bold block uppercase text-[10px] tracking-wider">
                    Entrance Exams
                  </span>
                  <p className="text-slate-300">{diagnosticResult.primary.exams}</p>
                </div>

                <div className="space-y-1.5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-emerald-400 font-bold block uppercase text-[10px] tracking-wider">
                    Top Indian Colleges
                  </span>
                  <p className="text-slate-300">{diagnosticResult.primary.indiaPath}</p>
                </div>

                <div className="space-y-1.5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-emerald-400 font-bold block uppercase text-[10px] tracking-wider">
                    Top Global Universities
                  </span>
                  <p className="text-slate-300">{diagnosticResult.primary.abroadPath}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                <span className="text-emerald-300 font-bold block uppercase text-[10px] tracking-wider">
                  Compensation Outlook
                </span>
                <p className="text-slate-200">{diagnosticResult.primary.salary}</p>
              </div>
            </div>
          </div>

          {/* SECONDARY ALTERNATIVE CAREER */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-teal-400" />
              <span>Secondary Alternative Career Match</span>
            </h2>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-teal-300">
                    {diagnosticResult.secondary.badge}
                  </span>
                  <h4 className="text-xl font-bold text-white mt-1.5">{diagnosticResult.secondary.title}</h4>
                </div>
                <span className="text-xl font-bold text-teal-400">{diagnosticResult.secondary.matchScore}% Match</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{diagnosticResult.secondary.desc}</p>
              <div className="text-xs text-slate-400 space-y-1">
                <p><strong className="text-slate-300">Institutions:</strong> {diagnosticResult.secondary.indiaPath}</p>
                <p><strong className="text-slate-300">Exams:</strong> {diagnosticResult.secondary.exams}</p>
              </div>
            </div>
          </div>

          {/* Retake test CTA */}
          <div className="text-center pt-6">
            <button
              onClick={() => {
                setUserAnswers({});
                setBookmarkedQuestions({});
                setCurrentQIndex(0);
                setCurrentView('quiz');
              }}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition"
            >
              Retake Assessment
            </button>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <p>© 2026 DeepPath Career Counseling Platform. Google Sheet Roster synchronization enabled.</p>
      </footer>
    </div>
  );
}
