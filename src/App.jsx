import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Compass, Sparkles, BookOpen, GraduationCap, Globe, 
  CheckCircle2, ArrowRight, ArrowLeft, Shield, User, Mail, 
  Lock, LogOut, RefreshCw, Award, Search, Camera,
  FileSpreadsheet, ExternalLink, Check, Database,
  Sliders, Eye, EyeOff, Bookmark, Zap, Activity, Brain, 
  Printer, Scale, Feather, Heart, Radio, Microscope,
  Landmark, Palette, Dumbbell, Grid, Rocket, Plane, Anchor
} from 'lucide-react';

const ASSESSMENT_BATTERY = [
  // 1-10: COGNITIVE APTITUDE & MATH PUZZLES
  {
    id: 'q1',
    pillar: 'Cognitive & Math Logic',
    type: 'puzzle',
    prompt: 'NUMBER PATTERN: Look at this sequence: 4, 9, 19, 39, 79, ... What number comes next?',
    options: [
      { id: 'q1_a', text: '159 ', scoreType: 'logic', points: 5 },
      { id: 'q1_b', text: '149', scoreType: 'logic', points: 1 },
      { id: 'q1_c', text: '169', scoreType: 'logic', points: 1 },
      { id: 'q1_d', text: '158', scoreType: 'logic', points: 1 }
    ]
  },
  {
    id: 'q2',
    pillar: 'Cognitive & Math Logic',
    type: 'puzzle',
    prompt: 'DISTANCE & SPEED: A military reconnaissance vehicle drives 120 km at 40 km/h, then returns along the same route at 60 km/h. What is its average speed?',
    options: [
      { id: 'q2_a', text: '48 km/h ', scoreType: 'logic', points: 5 },
      { id: 'q2_b', text: '50 km/h', scoreType: 'logic', points: 1 },
      { id: 'q2_c', text: '45 km/h', scoreType: 'logic', points: 1 },
      { id: 'q2_d', text: '52 km/h', scoreType: 'logic', points: 1 }
    ]
  },
  {
    id: 'q3',
    pillar: 'Cognitive & Math Logic',
    type: 'puzzle',
    prompt: 'CIVIL STRUCTURAL RATIO: A concrete mix requires cement, sand, and gravel in a 1 : 2 : 4 ratio by volume. If an engineer uses 14 cubic meters of gravel, how much cement is needed?',
    options: [
      { id: 'q3_a', text: '3.5 cubic meters ', scoreType: 'civil', points: 5 },
      { id: 'q3_b', text: '7 cubic meters', scoreType: 'civil', points: 1 },
      { id: 'q3_c', text: '2.5 cubic meters', scoreType: 'civil', points: 1 },
      { id: 'q3_d', text: '4 cubic meters', scoreType: 'civil', points: 1 }
    ]
  },
  {
    id: 'q4',
    pillar: 'Cognitive & Math Logic',
    type: 'puzzle',
    prompt: 'SPATIAL CUT: A solid metal cube is painted black on all 6 sides and sawed into 64 equal smaller cubes. How many small cubes have ZERO black painted faces?',
    options: [
      { id: 'q4_a', text: '8 smaller cubes ', scoreType: 'logic', points: 5 },
      { id: 'q4_b', text: '16 smaller cubes', scoreType: 'logic', points: 1 },
      { id: 'q4_c', text: '0 smaller cubes', scoreType: 'logic', points: 1 },
      { id: 'q4_d', text: '4 smaller cubes', scoreType: 'logic', points: 1 }
    ]
  },
  {
    id: 'q5',
    pillar: 'Cognitive & Math Logic',
    type: 'puzzle',
    prompt: 'AERODYNAMIC LOGIC: An aircraft flies into a headwind of 50 km/h with an airspeed of 450 km/h. What is its ground speed over the territory?',
    options: [
      { id: 'q5_a', text: '400 km/h ', scoreType: 'aerospace', points: 5 },
      { id: 'q5_b', text: '500 km/h', scoreType: 'aerospace', points: 1 },
      { id: 'q5_c', text: '425 km/h', scoreType: 'aerospace', points: 1 },
      { id: 'q5_d', text: '450 km/h', scoreType: 'aerospace', points: 1 }
    ]
  },
  {
    id: 'q6',
    pillar: 'Cognitive & Math Logic',
    type: 'puzzle',
    prompt: 'PERCENTAGE MARGIN: A medical equipment manufacturer offers a 20% discount on ultrasound scanners but still makes a 20% profit on production cost. If the production cost is ₹1,00,000, what is the marked list price?',
    options: [
      { id: 'q6_a', text: '₹1,50,000 ', scoreType: 'logic', points: 5 },
      { id: 'q6_b', text: '₹1,40,000', scoreType: 'logic', points: 1 },
      { id: 'q6_c', text: '₹1,30,000', scoreType: 'logic', points: 1 },
      { id: 'q6_d', text: '₹1,60,000', scoreType: 'logic', points: 1 }
    ]
  },
  {
    id: 'q7',
    pillar: 'Cognitive & Math Logic',
    type: 'puzzle',
    prompt: 'PRESSURE DEPTH: In naval submarine navigation, hydrostatic water pressure increases by roughly 1 atmosphere for every 10 meters of depth. At 250 meters depth, what is the approximate water pressure?',
    options: [
      { id: 'q7_a', text: '25 to 26 atmospheres ', scoreType: 'navy', points: 5 },
      { id: 'q7_b', text: '15 atmospheres', scoreType: 'navy', points: 1 },
      { id: 'q7_c', text: '50 atmospheres', scoreType: 'navy', points: 1 },
      { id: 'q7_d', text: '10 atmospheres', scoreType: 'navy', points: 1 }
    ]
  },
  {
    id: 'q8',
    pillar: 'Cognitive & Math Logic',
    type: 'puzzle',
    prompt: 'ENGINEERING WORK & TIME: 6 civil engineers can complete a bridge foundation blueprint in 12 days. How many days will 9 engineers take at the same pace?',
    options: [
      { id: 'q8_a', text: '8 days ', scoreType: 'civil', points: 5 },
      { id: 'q8_b', text: '10 days', scoreType: 'civil', points: 1 },
      { id: 'q8_c', text: '6 days', scoreType: 'civil', points: 1 },
      { id: 'q8_d', text: '9 days', scoreType: 'civil', points: 1 }
    ]
  },
  {
    id: 'q9',
    pillar: 'Cognitive & Math Logic',
    type: 'puzzle',
    prompt: 'ORBITAL CIRCUMFERENCE: A satellite orbits Earth at an altitude giving it an orbit radius of 7,000 km. What distance does it travel in 1 full circular orbit? (Use π ≈ 22/7)',
    options: [
      { id: 'q9_a', text: '44,000 km ', scoreType: 'aerospace', points: 5 },
      { id: 'q9_b', text: '22,000 km', scoreType: 'aerospace', points: 1 },
      { id: 'q9_c', text: '35,000 km', scoreType: 'aerospace', points: 1 },
      { id: 'q9_d', text: '50,000 km', scoreType: 'aerospace', points: 1 }
    ]
  },
  {
    id: 'q10',
    pillar: 'Cognitive & Math Logic',
    type: 'puzzle',
    prompt: 'DEDUCTION: All combat commandos undergo intensive survival training. Some survival experts are mountaineers. Which conclusion is guaranteed?',
    options: [
      { id: 'q10_a', text: 'Some commandos might be mountaineers, but it is not 100% guaranteed for all.', scoreType: 'army', points: 5 },
      { id: 'q10_b', text: 'All mountaineers are commandos.', scoreType: 'army', points: 1 },
      { id: 'q10_c', text: 'No commando ever climbs mountains.', scoreType: 'army', points: 1 },
      { id: 'q10_d', text: 'Every survival expert is an army soldier.', scoreType: 'army', points: 1 }
    ]
  },

  // 11-20: SPECIALIZED DEFENSE BRANCHING (ARMY vs AIR FORCE vs NAVY vs AEROSPACE DEFENSE)
  {
    id: 'q11',
    pillar: 'Defense & Tactical Instincts',
    prompt: 'If you were selected for an armed forces commission, which operational theater excites your soul the most?',
    options: [
      { id: 'q11_a', text: 'The Indian Army: Ground combat, infantry battalions, tank regiments in deserts, and Siachen glacier posts.', scoreType: 'army', points: 5 },
      { id: 'q11_b', text: 'The Indian Air Force: Cockpit of a Sukhoi Su-30MKI or Rafale flying at Mach 1.8 above the clouds.', scoreType: 'airforce', points: 5 },
      { id: 'q11_c', text: 'The Indian Navy: Guided missile destroyers, aircraft carrier flight decks, and stealth submarines in the Arabian Sea.', scoreType: 'navy', points: 5 },
      { id: 'q11_d', text: 'Defense Research (DRDO/ISRO): Designing intercontinental ballistic missiles, radar domes, and military satellites.', scoreType: 'aerospace', points: 5 }
    ]
  },
  {
    id: 'q12',
    pillar: 'Defense & Tactical Instincts',
    prompt: 'In high-adrenaline crisis conditions, what kind of pressure suits your mindset best?',
    options: [
      { id: 'q12_a', text: 'Physical tactical combat: Boots on the ground, extreme endurance, leading soldiers face-to-face under fire.', scoreType: 'army', points: 5 },
      { id: 'q12_b', text: 'Split-second 3D air combat: G-force physical stress, rapid instrument cross-checks, and supersonic dogfight decisions.', scoreType: 'airforce', points: 5 },
      { id: 'q12_c', text: 'Isolated endurance & ocean warfare: Navigating deep ocean currents, sonar tracking, and weeks at sea with disciplined crews.', scoreType: 'navy', points: 5 },
      { id: 'q12_d', text: 'Engineering precision under countdown pressure: Ensuring a rocket engine does not explode during high-vibration liftoff.', scoreType: 'aerospace', points: 5 }
    ]
  },
  {
    id: 'q13',
    pillar: 'Defense & Tactical Instincts',
    prompt: 'Which technical subject would you genuinely enjoy reading manuals about during free evenings?',
    options: [
      { id: 'q13_a', text: 'Infantry assault tactics, battlefield terrain maps, artillery ballistic tables, and commando ambushes.', scoreType: 'army', points: 5 },
      { id: 'q13_b', text: 'Jet turbine aerodynamics, head-up display avionics, missile radar lock-on mechanisms, and aerial refueling.', scoreType: 'airforce', points: 5 },
      { id: 'q13_c', text: 'Naval hull hydrodynamics, sonar acoustic signatures, torpedo tracking systems, and marine diesel turbines.', scoreType: 'navy', points: 5 },
      { id: 'q13_d', text: 'Orbital mechanics, cryogenic rocket propellants, carbon composite thermal shielding, and satellite telemetry.', scoreType: 'aerospace', points: 5 }
    ]
  },
  {
    id: 'q14',
    pillar: 'Defense & Tactical Instincts',
    prompt: 'When you imagine earning national military or defense honors, which image makes your chest swell with pride?',
    options: [
      { id: 'q14_a', text: 'Wearing olive-green uniform with Para-commando balidaan badge, leading troops on the front lines.', scoreType: 'army', points: 5 },
      { id: 'q14_b', text: 'Wearing flight overalls and G-suit, walking toward your fighter jet on the tarmac before sunrise.', scoreType: 'airforce', points: 5 },
      { id: 'q14_c', text: 'Wearing crisp white naval officer uniform with gold epaulettes, saluting on the bridge of a warship.', scoreType: 'navy', points: 5 },
      { id: 'q14_d', text: 'Standing in the ISRO/DRDO mission control room as the rocket you designed successfully injects its satellite into orbit.', scoreType: 'aerospace', points: 5 }
    ]
  },

  // 15-22: MEDICAL SPECIALIZATION (SURGERY vs CARDIOLOGY vs NEUROLOGY vs PSYCHOLOGY)
  {
    id: 'q15',
    pillar: 'Medical & Healthcare Domain',
    prompt: 'When you imagine yourself in a hospital wearing a white coat, where do you feel your calling lies?',
    options: [
      { id: 'q15_a', text: 'Inside the Operating Theatre (OT): Wearing sterile green scrubs, holding a scalpel, stitching tissue, saving lives with steady hands.', scoreType: 'surgeon', points: 5 },
      { id: 'q15_b', text: 'The Cardiology / Critical Care Unit: Reading complex ECG rhythms, performing catheter stentings, stabilizing failing hearts.', scoreType: 'cardiology', points: 5 },
      { id: 'q15_c', text: 'The Neurosciences Ward: Diagnosing brain tumors, managing stroke recoveries, analyzing neural pathways and reflexes.', scoreType: 'neurology', points: 5 },
      { id: 'q15_d', text: 'The Therapy Clinic: Sitting one-on-one with troubled individuals, diagnosing behavioral disorders, guiding them through emotional healing.', scoreType: 'psychology', points: 5 }
    ]
  },
  {
    id: 'q16',
    pillar: 'Medical & Healthcare Domain',
    prompt: 'How do your hands and mind react to the sight of surgical blood, deep open incisions, and biological human organs?',
    options: [
      { id: 'q16_a', text: 'Completely steady and focused: I am captivated by human anatomy and surgical precision.', scoreType: 'surgeon', points: 5 },
      { id: 'q16_b', text: 'I prefer vascular catheters, heart monitors, and pharmaceutical interventions over open flesh incisions.', scoreType: 'cardiology', points: 5 },
      { id: 'q16_c', text: 'I am drawn to electrical impulses, brain MRI scans, and the nervous system rather than general blood work.', scoreType: 'neurology', points: 5 },
      { id: 'q16_d', text: 'I feel uncomfortable around open surgical wounds; I prefer working purely with the psychological mind and words.', scoreType: 'psychology', points: 5 }
    ]
  },
  {
    id: 'q17',
    pillar: 'Medical & Healthcare Domain',
    prompt: 'Which biological mystery would you spend 5 years in intensive university research to solve?',
    options: [
      { id: 'q17_a', text: 'Minimally invasive laparoscopic and robotic surgery techniques to eliminate post-operation infections.', scoreType: 'surgeon', points: 5 },
      { id: 'q17_b', text: 'Reversing arterial plaque blockages and developing artificial heart pumps that never wear out.', scoreType: 'cardiology', points: 5 },
      { id: 'q17_c', text: 'Curing Alzheimer\'s memory loss, repairing damaged spinal nerves, and deciphering consciousness.', scoreType: 'neurology', points: 5 },
      { id: 'q17_d', text: 'Treating severe adolescent depression, chronic anxiety, and trauma without addictive psychiatric medications.', scoreType: 'psychology', points: 5 }
    ]
  },
  {
    id: 'q18',
    pillar: 'Medical & Healthcare Domain',
    prompt: 'How do you handle patient interactions when a family is crying in severe emotional distress?',
    options: [
      { id: 'q18_a', text: 'I deliver direct, honest surgical facts calmly and rush back inside to fight for the patient\'s life on the table.', scoreType: 'surgeon', points: 4 },
      { id: 'q18_b', text: 'I explain the heart vitals, blood oxygen stats, and medication plan clearly so they understand the treatment.', scoreType: 'cardiology', points: 4 },
      { id: 'q18_c', text: 'I map out the cognitive reflexes, MRI findings, and recovery prognosis with methodical care.', scoreType: 'neurology', points: 4 },
      { id: 'q18_d', text: 'I sit down beside them, listen deeply with profound empathy, and provide psychological comfort and grounding.', scoreType: 'psychology', points: 5 }
    ]
  },

  // 19-26: ENGINEERING INFRASTRUCTURE & SPACE (AEROSPACE vs CIVIL vs COMPUTER SCIENCE)
  {
    id: 'q19',
    pillar: 'Engineering & Construction Systems',
    prompt: 'If you were given a ₹500 Crore government engineering grant, what monument of human progress would you build?',
    options: [
      { id: 'q19_a', text: 'A reusable heavy-lift rocket capable of landing satellite payloads on the lunar south pole.', scoreType: 'aerospace', points: 5 },
      { id: 'q19_b', text: 'A mega sea-link suspension bridge or high-speed mountain tunnel connecting isolated Himalayan valleys.', scoreType: 'civil', points: 5 },
      { id: 'q19_c', text: 'An autonomous AI supercomputing data center securing national defense networks against global cyber warfare.', scoreType: 'cs_ai', points: 5 },
      { id: 'q19_d', text: 'A futuristic zero-carbon smart city with green parks, renewable solar grids, and sustainable housing.', scoreType: 'architect', points: 5 }
    ]
  },
  {
    id: 'q20',
    pillar: 'Engineering & Construction Systems',
    prompt: 'What kind of failure keeps you awake at night and pushes you to double-check every calculation?',
    options: [
      { id: 'q20_a', text: 'A rocket fuel valve seal leaking under cryogenic cold, causing a catastrophic launchpad explosion.', scoreType: 'aerospace', points: 5 },
      { id: 'q20_b', text: 'A bridge foundation settling unevenly or a dam wall developing micro-cracks under hydraulic pressure.', scoreType: 'civil', points: 5 },
      { id: 'q20_c', text: 'A critical software bug allowing foreign hackers to paralyze national electricity grids or bank servers.', scoreType: 'cs_ai', points: 5 },
      { id: 'q20_d', text: 'An aesthetic building flaw that makes an entire residential tower gloomy, unlivable, and poorly ventilated.', scoreType: 'architect', points: 5 }
    ]
  },
  {
    id: 'q21',
    pillar: 'Engineering & Construction Systems',
    prompt: 'Where would you rather spend your active workdays?',
    options: [
      { id: 'q21_a', text: 'At a space launch center (Sriharikota) running telemetry simulations and inspecting rocket rocket stages.', scoreType: 'aerospace', points: 5 },
      { id: 'q21_b', text: 'Wearing a yellow hard-hat on site, inspecting massive steel rebar cages, pouring concrete, and supervising heavy cranes.', scoreType: 'civil', points: 5 },
      { id: 'q21_c', text: 'In a modern tech lab with multi-monitor workstation setups, writing neural networks, and optimizing backend systems.', scoreType: 'cs_ai', points: 5 },
      { id: 'q21_d', text: 'In an architectural design studio drawing 3D CAD blueprints, modeling miniature physical buildings, and choosing textures.', scoreType: 'architect', points: 5 }
    ]
  },
  {
    id: 'q22',
    pillar: 'Engineering & Construction Systems',
    prompt: 'When inspecting a construction site or rocket assembly hangar, what catches your sharp attention first?',
    options: [
      { id: 'q22_a', text: 'The aerodynamic wing taper, rocket nozzle expansion ratio, and lightweight carbon composite skin.', scoreType: 'aerospace', points: 5 },
      { id: 'q22_b', text: 'The soil bearing capacity, pillar depth, beam deflection, and foundation load distribution.', scoreType: 'civil', points: 5 },
      { id: 'q22_c', text: 'The digital sensor telemetry, automated PLC logic, and server network connectivity.', scoreType: 'cs_ai', points: 5 },
      { id: 'q22_d', text: 'The sunlight ingress angles, room acoustics, aesthetic exterior facade, and pedestrian walkways.', scoreType: 'architect', points: 5 }
    ]
  },

  // 23-30: CAREER DECIDEDNESS & FAMILY PRESSURE
  {
    id: 'q23',
    pillar: 'Career Clarity & Pressure',
    prompt: 'When relatives ask: "What are your future career plans?", what is your honest internal reaction?',
    options: [
      { id: 'q23_a', text: 'I have 1 or 2 specific dream vocations that I have loved for years, and I explain them with confidence.', scoreType: 'decided', points: 5 },
      { id: 'q23_b', text: 'I have 4 or 5 different interests, but I find it hard to pick just one specific career path.', scoreType: 'exploring', points: 4 },
      { id: 'q23_c', text: 'I feel deeply confused and worried because I have no clear picture of my path.', scoreType: 'confused', points: 5 },
      { id: 'q23_d', text: 'I usually repeat whatever degree my parents or elder cousins tell me to say.', scoreType: 'pressured', points: 5 }
    ]
  },
  {
    id: 'q24',
    pillar: 'Career Clarity & Pressure',
    prompt: 'How much do family expectations influence your decision regarding 11th/12th stream selection?',
    options: [
      { id: 'q24_a', text: 'They strongly insist on conventional secure options (doctor/engineer/govt job), even if my heart differs.', scoreType: 'pressured', points: 5 },
      { id: 'q24_b', text: 'They are completely supportive and encourage me to follow whatever matches my genuine skills.', scoreType: 'decided', points: 4 },
      { id: 'q24_c', text: 'I am so undecided myself that I easily adopt whatever opinion someone shares with me.', scoreType: 'confused', points: 4 },
      { id: 'q24_d', text: 'I am researching entrance exams and college roadmaps on my own and discussing them openly with my family.', scoreType: 'exploring', points: 5 }
    ]
  },
  {
    id: 'q25',
    pillar: 'Career Clarity & Pressure',
    prompt: 'What is your biggest fear when thinking about your working life at age 28?',
    options: [
      { id: 'q25_a', text: 'Getting stuck in a boring, repetitive desk job doing paperwork that creates zero impact.', scoreType: 'exploring', points: 4 },
      { id: 'q25_b', text: 'Not earning enough money to provide my parents and family with a secure, honorable life.', scoreType: 'decided', points: 4 },
      { id: 'q25_c', text: 'Studying for 5 years in a field everyone praised, only to realize I hate the daily work.', scoreType: 'confused', points: 5 },
      { id: 'q25_d', text: 'Failing to meet family expectations and letting down those who sacrificed for me.', scoreType: 'pressured', points: 5 }
    ]
  },
  {
    id: 'q26',
    pillar: 'Career Clarity & Pressure',
    prompt: 'If college entrance fee or competition was not a factor, what would you pursue without hesitation?',
    options: [
      { id: 'q26_a', text: 'Fighter pilot, naval commander, or army officer serving on national frontlines.', scoreType: 'army', points: 5 },
      { id: 'q26_b', text: 'Rocket engineer, astrophysicist, or advanced AI robotics inventor.', scoreType: 'aerospace', points: 5 },
      { id: 'q26_c', text: 'Specialized brain surgeon, cardiologist, or mental health healer.', scoreType: 'surgeon', points: 5 },
      { id: 'q26_d', text: 'High court judge, civil district magistrate (IAS), or enterprise founder.', scoreType: 'civil_services', points: 5 }
    ]
  },

  // 27-40: PSYCHOMETRIC TEMPERAMENT & WORK DYNAMICS
  {
    id: 'q27',
    pillar: 'Personality & Temperament',
    prompt: 'EXTRAVERSION: After spending 5 consecutive days studying alone for tough exams, how do you recharge?',
    options: [
      { id: 'q27_a', text: 'Playing football, running outdoors with peers, and laughing with a group.', scoreType: 'extravert', points: 5 },
      { id: 'q27_b', text: 'Staying in my quiet room, reading books, listening to music, or taking a solitary walk.', scoreType: 'introvert', points: 5 },
      { id: 'q27_c', text: 'Meeting my 1 or 2 closest friends for peaceful, deep conversation.', scoreType: 'introvert', points: 4 },
      { id: 'q27_d', text: 'Organizing an outing or festival gathering for our entire school circle.', scoreType: 'extravert', points: 5 }
    ]
  },
  {
    id: 'q28',
    pillar: 'Personality & Temperament',
    prompt: 'DISCIPLINE: When assigned a major project due in two weeks:',
    options: [
      { id: 'q28_a', text: 'I break it down into daily milestones immediately and finish 2 days ahead of schedule.', scoreType: 'conscientious', points: 5 },
      { id: 'q28_b', text: 'I start with good intentions, relax mid-way, and finish in a late-night burst of adrenaline.', scoreType: 'spontaneous', points: 4 },
      { id: 'q28_c', text: 'I work best when sudden creative inspiration strikes, rather than following rigid routines.', scoreType: 'spontaneous', points: 5 },
      { id: 'q28_d', text: 'I struggle with procrastination and feel stressed near the deadline.', scoreType: 'spontaneous', points: 4 }
    ]
  },
  {
    id: 'q29',
    pillar: 'Personality & Temperament',
    prompt: 'MORAL COURAGE: In a group project, when an older peer tries to bully a quiet classmate:',
    options: [
      { id: 'q29_a', text: 'I stand up immediately, look the bully in the eye, and firmly order them to back off.', scoreType: 'courage', points: 5 },
      { id: 'q29_b', text: 'I pull the quiet classmate away safely and report the behavior to teachers with proof.', scoreType: 'empathy', points: 4 },
      { id: 'q29_c', text: 'I logically dissect the bully\'s false claims until they feel foolish and back down.', scoreType: 'logic', points: 4 },
      { id: 'q29_d', text: 'I console the victim afterward and ensure they do not feel alone.', scoreType: 'empathy', points: 5 }
    ]
  },
  {
    id: 'q30',
    pillar: 'Personality & Temperament',
    prompt: 'PRESSURE TOLERANCE: When an unexpected emergency shatters your team\'s plan 1 hour before presentation:',
    options: [
      { id: 'q30_a', text: 'My heart rate stays steady; I take command, delegate backup tasks, and find a solution.', scoreType: 'courage', points: 5 },
      { id: 'q30_b', text: 'I analyze the root failure on paper first, calculate the fastest fix, and execute.', scoreType: 'logic', points: 5 },
      { id: 'q30_c', text: 'I check on team morale first to ensure nobody is having a panic breakdown.', scoreType: 'empathy', points: 5 },
      { id: 'q30_d', text: 'I feel deeply shaken inside and need a moment to collect my thoughts.', scoreType: 'sensitive', points: 4 }
    ]
  },
  {
    id: 'q31',
    pillar: 'Personality & Temperament',
    prompt: 'DETAIL FOCUS: How patient are you when doing repetitive mathematical verifications or safety checks?',
    options: [
      { id: 'q31_a', text: 'Extremely patient: Missing even one decimal error can cause a bridge or rocket to fail.', scoreType: 'conscientious', points: 5 },
      { id: 'q31_b', text: 'I get restless quickly; I prefer hands-on physical action or talking to people.', scoreType: 'spontaneous', points: 4 },
      { id: 'q31_c', text: 'I automate the repetitive check using code so I never have to do it manually.', scoreType: 'cs_ai', points: 5 },
      { id: 'q31_d', text: 'I can do it if required, but my heart is in creative storytelling or design.', scoreType: 'artistic', points: 4 }
    ]
  },
  {
    id: 'q32',
    pillar: 'Personality & Temperament',
    prompt: 'OUTDOOR WEATHER GRIT: How do you handle extreme physical hardship (scorching heat, monsoon mud, or freezing cold)?',
    options: [
      { id: 'q32_a', text: 'I thrive in tough elements: Outdoor grit, mud, and physical sweat make me feel alive.', scoreType: 'army', points: 5 },
      { id: 'q32_b', text: 'I don\'t mind heavy weather as long as I am inspecting a construction site or farm.', scoreType: 'civil', points: 4 },
      { id: 'q32_c', text: 'I strongly prefer modern, air-conditioned hospitals, research laboratories, or corporate towers.', scoreType: 'surgeon', points: 4 },
      { id: 'q32_d', text: 'I prefer working from a quiet study room or computer terminal.', scoreType: 'cs_ai', points: 4 }
    ]
  },

  // 33-45: VOCATIONAL PASSION & RIASEC DOMAINS
  {
    id: 'q33',
    pillar: 'Vocational Calling',
    prompt: 'When you visit a rural village or agricultural district in India, what thought grabs your mind?',
    options: [
      { id: 'q33_a', text: 'Treating injured livestock and deploying agricultural drones for soil sensors and drip irrigation.', scoreType: 'agri_vet', points: 5 },
      { id: 'q33_b', text: 'Building durable concrete canals, paved roads, and flood protection embankments for the village.', scoreType: 'civil', points: 5 },
      { id: 'q33_c', text: 'Serving as District Collector (IAS) to ensure schools, hospitals, and ration schemes reach every family.', scoreType: 'civil_services', points: 5 },
      { id: 'q33_d', text: 'Setting up free medical health camps to diagnose heart murmurs, cataracts, and nerve illnesses.', scoreType: 'cardiology', points: 5 }
    ]
  },
  {
    id: 'q34',
    pillar: 'Vocational Calling',
    prompt: 'If you had to read a 400-page book from cover to cover this weekend, which title would you pick?',
    options: [
      { id: 'q34_a', text: '"Rocket Propulsion Elements & Space Mission Architectures"', scoreType: 'aerospace', points: 5 },
      { id: 'q34_b', text: '"Principles of Trauma Surgery & Battlefield Operative Medicine"', scoreType: 'surgeon', points: 5 },
      { id: 'q34_c', text: '"The Art of Military Strategy & Battlefield Command: From NDA to Kargil"', scoreType: 'army', points: 5 },
      { id: 'q34_d', text: '"Constitutional Law of India & Landmark Supreme Court Judgments"', scoreType: 'lawyer', points: 5 }
    ]
  },
  {
    id: 'q35',
    pillar: 'Vocational Calling',
    prompt: 'Which tool or equipment would you handle with the most natural instinct and curiosity?',
    options: [
      { id: 'q35_a', text: 'A flight joystick, throttle quadrant, and radar screen.', scoreType: 'airforce', points: 5 },
      { id: 'q35_b', text: 'A precision surgical needle-holder, scalpel, and suture threads.', scoreType: 'surgeon', points: 5 },
      { id: 'q35_c', text: 'A laser surveying total station, concrete compression tester, and CAD soil blueprints.', scoreType: 'civil', points: 5 },
      { id: 'q35_d', text: 'An oscilloscope, rocket fuel injector nozzle, and cryogenic valve test rig.', scoreType: 'aerospace', points: 5 }
    ]
  },
  {
    id: 'q36',
    pillar: 'Vocational Calling',
    prompt: 'How do you feel about national uniform discipline, physical salutes, and rank hierarchy?',
    options: [
      { id: 'q36_a', text: 'Supreme honor and purpose: Living by military code, honor, and serving the motherland is the highest calling.', scoreType: 'army', points: 5 },
      { id: 'q36_b', text: 'I respect it deeply, but I prefer contributing to national strength through science, rocketry, or medicine.', scoreType: 'aerospace', points: 4 },
      { id: 'q36_c', text: 'I prefer civil governance authority like IAS/IPS over strict regimented barracks life.', scoreType: 'civil_services', points: 4 },
      { id: 'q36_d', text: 'I prefer intellectual freedom in university academia, hospitals, or private enterprise.', scoreType: 'professor', points: 4 }
    ]
  },
  {
    id: 'q37',
    pillar: 'Vocational Calling',
    prompt: 'When you hear about an earthquake striking an Indian state, where do you want to be helping?',
    options: [
      { id: 'q37_a', text: 'In Army/NDRF combat rescue boats and helicopters, pulling trapped citizens from collapsed rubble.', scoreType: 'army', points: 5 },
      { id: 'q37_b', text: 'In the emergency trauma tent performing emergency amputations and stabilizing crush injuries.', scoreType: 'surgeon', points: 5 },
      { id: 'q37_c', text: 'Inspecting damaged bridges, dams, and structural pillars to prevent catastrophic collapses.', scoreType: 'civil', points: 5 },
      { id: 'q37_d', text: 'Directing the district administration control room, food logistics, and relief funds as District Magistrate.', scoreType: 'civil_services', points: 5 }
    ]
  },

  // 38-50: LIFE PURPOSE, VALUES & WORK STYLE
  {
    id: 'q38',
    pillar: 'Life Purpose & Legacy',
    prompt: 'At age 75 looking back at your journey, what will make you feel your life had true meaning?',
    options: [
      { id: 'q38_a', text: 'I defended my motherland with honor, stood firm on our borders, and protected millions of citizens.', scoreType: 'army', points: 5 },
      { id: 'q38_b', text: 'I built spacecraft, explored the cosmos, and pushed the frontiers of scientific knowledge.', scoreType: 'aerospace', points: 5 },
      { id: 'q38_c', text: 'I operated on thousands of sick patients and pulled human beings back from the edge of death.', scoreType: 'surgeon', points: 5 },
      { id: 'q38_d', text: 'I designed bridges, highways, and infrastructure that will safely carry millions of travelers for 100 years.', scoreType: 'civil', points: 5 }
    ]
  },
  {
    id: 'q39',
    pillar: 'Life Purpose & Legacy',
    prompt: 'Which equation of reward matters to you most in your professional career?',
    options: [
      { id: 'q39_a', text: 'Supreme national honor, military respect, official quarters, and lifelong brotherly camaraderie.', scoreType: 'army', points: 5 },
      { id: 'q39_b', text: 'Intellectual breakthrough: Seeing a rocket or satellite you designed roar into orbit.', scoreType: 'aerospace', points: 5 },
      { id: 'q39_c', text: 'Medical healing: Walking out of surgery to tell a weeping family that their child is alive and will walk again.', scoreType: 'surgeon', points: 5 },
      { id: 'q39_d', text: 'Building legacy: Seeing a grand suspension bridge or highway you engineered stand proudly across a river.', scoreType: 'civil', points: 5 }
    ]
  },
  {
    id: 'q40',
    pillar: 'Life Purpose & Legacy',
    prompt: 'FINAL SELF-REFLECTION: When you close your eyes and picture yourself 10 years from now, which image makes you proudest?',
    options: [
      { id: 'q40_a', text: 'Commanding troops in uniform, or piloting a supersonic fighter jet, or commanding a naval warship.', scoreType: 'army', points: 5 },
      { id: 'q40_b', text: 'Working as a Senior ISRO/DRDO Aerospace Scientist building deep space probes and rocket engines.', scoreType: 'aerospace', points: 5 },
      { id: 'q40_c', text: 'Leading surgical procedures or treating heart and neurological conditions as an elite doctor.', scoreType: 'surgeon', points: 5 },
      { id: 'q40_d', text: 'Chief Structural Engineer building state mega-projects or leading district governance as an IAS officer.', scoreType: 'civil', points: 5 }
    ]
  }
];

// 15 COMPREHENSIVE CAREERS DATABASE
const CAREER_DATABASE = {
  'army_defence_officer': {
    id: 'army_defence_officer',
    title: 'Indian Armed Forces Officer (Army Infantry & Special Forces)',
    category: 'National Defense, Battlefield Command & Armed Strategy',
    iconName: 'Shield',
    idealTraits: ['army', 'courage'],
    description: 'Lead infantry platoons, armored tank regiments, and commando units. You command soldiers with discipline, make tactical decisions under fire, and safeguard national borders in high-altitude and desert theaters.',
    dailyLife: 'Early morning physical conditioning, tactical weapons inspection, combat simulation drills, troop administration, and border operational readiness.',
    salaryIndia: '₹9,50,000 to ₹34,00,000+ per year (Lieutenant to Brigadier/General) + Official cantonment bungalow, defense healthcare, and military pension privileges.',
    salaryAbroad: 'United Nations (UN) Peacekeeping Missions ($85,000 to $145,000 tax-free allowances) and military diplomatic postings in foreign embassies.',
    highSchoolStream: 'Any stream (Science, Commerce, or Arts) for Army wing. Physics, Chemistry & Math (PCM) recommended for technical entries.',
    indianPathways: [
      'National Defence Academy (NDA, Khadakwasla, Pune) - right after 12th',
      'Indian Military Academy (IMA Dehradun) - post graduation via CDS exam',
      'Technical Entry Scheme (TES) - direct SSB selection based on 12th PCM marks',
      'Officers Training Academy (OTA Chennai) - Short Service Commission'
    ],
    globalPathways: [
      'Royal Military Academy Sandhurst (United Kingdom) - officer exchange courses',
      'United States Military Academy (West Point, USA) - strategic command symposiums',
      'Defence Services Staff College (DSSC) international command modules'
    ],
    keyEntranceExams: 'NDA Exam (UPSC), CDS Exam (UPSC), 5-Day SSB Interview, Medical Fitness Standards.',
    employers: ['Indian Army', 'Para-Special Forces', 'Rashtriya Rifles', 'National Security Guard (NSG)', 'Assam Rifles']
  },

  'airforce_fighter_pilot': {
    id: 'airforce_fighter_pilot',
    title: 'Indian Air Force Fighter Pilot & Aeronautical Navigator',
    category: 'Aerial Combat, Supersonic Aviation & Airspace Defense',
    iconName: 'Plane',
    idealTraits: ['airforce', 'courage'],
    description: 'Pilot supersonic fighter jets (Rafale, Sukhoi Su-30MKI, Tejas) at speeds exceeding Mach 1.8. You execute precision air-to-air dogfights, tactical radar strikes, and defend Indian skies from enemy intrusions.',
    dailyLife: 'Pre-flight weather and combat briefing, high-G tactical combat sorties, supersonic instrument cross-checks, simulator flight runs, and squadron strategy reviews.',
    salaryIndia: '₹12,00,000 to ₹38,00,000+ per year (Flying Officer to Air Marshal) + Flying allowances, defense housing, and specialized flight medical care.',
    salaryAbroad: 'Joint international air combat drills (Cope India, Pitch Black Australia, Red Flag USA) and defense diplomatic attaché postings.',
    highSchoolStream: '11th & 12th in Science with Physics and Mathematics (PCM) is mandatory.',
    indianPathways: [
      'National Defence Academy (NDA Khadakwasla - Air Force Wing)',
      'Air Force Academy (AFA Dundigal, Hyderabad) - Flying Branch',
      'Air Force Common Admission Test (AFCAT) post-graduation route'
    ],
    globalPathways: [
      'Royal Air Force College Cranwell (United Kingdom)',
      'US Air Force Academy (Colorado Springs, USA)',
      'Joint international flight weapon school modules'
    ],
    keyEntranceExams: 'NDA Exam (UPSC), AFCAT, 5-Day AFSB Interview, Computerised Pilot Selection System (CPSS) Test.',
    employers: ['Indian Air Force (IAF)', 'Fighter Squadrons', 'Aircraft and Systems Testing Establishment (ASTE)', 'Surya Kiran Aerobatics']
  },

  'navy_warship_commander': {
    id: 'navy_warship_commander',
    title: 'Indian Navy Warship Surface Commander & Submariner',
    category: 'Maritime Warfare, Guided Missile Destroyers & Submarine Patrols',
    iconName: 'Anchor',
    idealTraits: ['navy', 'courage'],
    description: 'Command stealth guided-missile destroyers, aircraft carriers, or nuclear-powered attack submarines. You dominate international sea lanes, track undersea acoustic signatures, and enforce maritime sovereignty.',
    dailyLife: 'Bridge watch navigation, missile battery tracking, sonar acoustic sweeps, damage control drills, replenishment at sea, and international anti-piracy patrols.',
    salaryIndia: '₹10,50,000 to ₹35,00,000+ per year (Sub-Lieutenant to Admiral) + Submarine/Diving allowances, naval officer housing, and medical privileges.',
    salaryAbroad: 'Global naval deployments across Indo-Pacific, Gulf of Aden, and joint fleet exercises (MALABAR, Milan, Varuna) with US and French Navies.',
    highSchoolStream: '11th & 12th in Science with Physics and Mathematics (PCM) is mandatory.',
    indianPathways: [
      'Indian Naval Academy (INA Ezhimala, Kerala - 4-Year B.Tech Cadets)',
      'National Defence Academy (NDA Khadakwasla - Navy Wing)',
      'Combined Defence Services (CDS) Naval Executive Branch'
    ],
    globalPathways: [
      'Britannia Royal Naval College (Dartmouth, UK)',
      'United States Naval Academy (Annapolis, USA)',
      'International Submarine Warfare Command Courses'
    ],
    keyEntranceExams: 'NDA Exam (UPSC), INA 10+2 B.Tech Entry, CDS Exam (UPSC), 5-Day Naval SSB Interview.',
    employers: ['Indian Navy', 'Western & Eastern Naval Commands', 'Submarine Fleet', 'MARCOS (Marine Commandos)']
  },

  'aerospace_engineer': {
    id: 'aerospace_engineer',
    title: 'Aerospace, Rocket Propulsion & Satellite Systems Engineer',
    category: 'Space Exploration, Aerodynamics & Satellite Defense',
    iconName: 'Rocket',
    idealTraits: ['aerospace', 'logic'],
    description: 'Design and manufacture cryogenic rockets, lunar exploration probes, satellite constellations, and supersonic defense systems. You master aerodynamics, rocket propulsion, orbital mechanics, and thermal heat shields.',
    dailyLife: 'Running wind tunnel simulations, writing CFD (Computational Fluid Dynamics) code, testing liquid propulsion rocket engines, analyzing telemetry data, and assembling satellite avionics.',
    salaryIndia: '₹8,50,000 to ₹35,00,000+ per year (ISRO Scientist/Engineer \'SC\' grade offers gazetted rank with official quarters; private space startups offer ₹12–28 LPA).',
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
    keyEntranceExams: 'JEE Advanced (for IITs and IIST), JEE Main, GATE (Aerospace), GRE & TOEFL/IELTS for overseas MS/Ph.D.',
    employers: ['ISRO (Indian Space Research Organisation)', 'DRDO', 'Skyroot Aerospace', 'Agnikul Cosmos', 'HAL', 'Boeing', 'Airbus']
  },

  'civil_engineer': {
    id: 'civil_engineer',
    title: 'Civil & Structural Infrastructure Engineer',
    category: 'Mega Bridges, Tunnels, Dams & High-Speed Transit Systems',
    iconName: 'Building',
    idealTraits: ['civil', 'logic'],
    description: 'Design, calculate, and construct monumental suspension bridges, mountain rail tunnels, multi-tier flyovers, hydroelectric dams, and earthquake-resistant skyscrapers that serve millions for generations.',
    dailyLife: 'Reviewing soil mechanics reports, running finite element structural load software (STAAD.Pro / ETABS), inspecting high-grade concrete pouring on site, and managing heavy cranes.',
    salaryIndia: '₹7,00,000 to ₹32,00,000+ per year (L&T, Afcons, NHAI, and Central Engineering Services offer strong growth).',
    salaryAbroad: '$90,000 to $180,000 per year (High global demand across Dubai mega-projects, Australia, Canada, and UK infrastructure firms).',
    highSchoolStream: '11th & 12th in Science with Physics, Chemistry, and Mathematics (PCM).',
    indianPathways: [
      'Indian Institutes of Technology (IIT Roorkee - Asia\'s oldest civil engineering faculty)',
      'IIT Delhi / IIT Bombay / IIT Kharagpur (B.Tech Civil Engineering)',
      'National Institutes of Technology (NIT Trichy, NIT Surathkal)',
      'College of Engineering Guindy (Anna University) & VJTI Mumbai'
    ],
    globalPathways: [
      'University of California, Berkeley - Civil & Environmental Engineering (USA)',
      'Imperial College London (UK - Department of Civil and Environmental Engineering)',
      'National University of Singapore (NUS) - Civil Engineering',
      'ETH Zurich (Switzerland)'
    ],
    keyEntranceExams: 'JEE Main, JEE Advanced, GATE (Civil Engineering), UPSC Indian Engineering Services (IES/ESE).',
    employers: ['Larsen & Toubro (L&T)', 'National Highways Authority of India (NHAI)', 'Afcons Infrastructure', 'Delhi Metro (DMRC)', 'Tata Projects']
  },

  'specialized_surgeon': {
    id: 'specialized_surgeon',
    title: 'Specialized Surgeon (Trauma & Operative Surgery)',
    category: 'Operative Medicine, Trauma Care & Precision Surgical Operations',
    iconName: 'Activity',
    idealTraits: ['surgeon', 'courage'],
    description: 'Operate inside high-stakes operating rooms to repair ruptured organs, remove tumors, reattach severed vessels, and manage trauma accidents with razor-sharp physical precision.',
    dailyLife: 'Sterile scrubbing, performing 3-to-6 hour surgeries, monitoring intensive care units (ICU), reviewing pre-op diagnostic scans, and conducting post-op patient rounds.',
    salaryIndia: '₹14,00,000 to ₹65,00,000+ per year (Senior consultant surgeons in top private and trust hospitals can exceed ₹1 Crore annually).',
    salaryAbroad: '$220,000 to $450,000+ per year (USA - USMLE pathway, UK - FRCS pathway, Canada, Australia).',
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
      'Harvard Medical School (USA)',
      'Royal College of Surgeons (England/Edinburgh)'
    ],
    keyEntranceExams: 'NEET-UG, NEET-PG / INI-CET (for MS General Surgery), followed by M.Ch superspecialty examinations.',
    employers: ['AIIMS', 'Apollo Hospitals', 'Fortis Healthcare', 'Medanta The Medicity', 'Armed Forces Medical Services']
  },

  'cardiologist_specialist': {
    id: 'cardiologist_specialist',
    title: 'Cardiologist & Cardiovascular Interventionist',
    category: 'Heart Physiology, Angioplasty Stenting & Cardiac Rhythm Care',
    iconName: 'Heart',
    idealTraits: ['cardiology', 'logic'],
    description: 'Diagnose and treat heart attacks, arterial blockages, and congenital valve defects. You perform catheter angioplasties in cath-labs, implant pacemakers, and save failing hearts.',
    dailyLife: 'Conducting coronary angiographies, implanting cardiac stents, analyzing echocardiograms, managing coronary care units (CCU), and optimizing cardiovascular drugs.',
    salaryIndia: '₹15,00,000 to ₹70,00,000+ per year (Interventional cardiologists command top packages across hospital networks).',
    salaryAbroad: '$240,000 to $480,000+ per year (High global demand in USA, UK, Germany, and Gulf medical centers).',
    highSchoolStream: '11th & 12th in Science with Physics, Chemistry, and Biology (PCB).',
    indianPathways: [
      'AIIMS New Delhi (DM Cardiology)',
      'Postgraduate Institute of Medical Education & Research (PGIMER Chandigarh)',
      'Sri Jayadeva Institute of Cardiovascular Sciences (Bengaluru)',
      'King Edward Memorial Hospital (KEM Mumbai)'
    ],
    globalPathways: [
      'Cleveland Clinic Lerner College of Medicine (USA - World #1 in Cardiology)',
      'Mayo Clinic Alix School of Medicine (USA)',
      'Imperial College Healthcare NHS Trust (UK)'
    ],
    keyEntranceExams: 'NEET-UG (MBBS) -> NEET-PG (MD Internal Medicine) -> NEET-SS / INI-SS (DM Cardiology).',
    employers: ['Narayana Health', 'Asian Heart Institute', 'Apollo Heart Centres', 'Max Healthcare', 'Government Medical Colleges']
  },

  'neurologist_physician': {
    id: 'neurologist_physician',
    title: 'Neurologist & Cognitive Neuroscientist',
    category: 'Brain Physiology, Stroke Management & Central Nervous Systems',
    iconName: 'Brain',
    idealTraits: ['neurology', 'logic'],
    description: 'Solve intricate mysteries of the human brain, spinal cord, and peripheral nerves. You diagnose strokes, epilepsy, Parkinson\'s disease, memory loss, and neuromuscular disorders.',
    dailyLife: 'Analyzing brain MRI/CT scans, interpreting EEG wave recordings, conducting cranial nerve reflex tests, and managing acute stroke thrombolysis units.',
    salaryIndia: '₹13,00,000 to ₹60,00,000+ per year (High demand in specialized neuro-centers and academic medical faculties).',
    salaryAbroad: '$210,000 to $420,000+ per year (Elite academic hospitals across USA, Switzerland, and UK).',
    highSchoolStream: '11th & 12th in Science with Physics, Chemistry, and Biology (PCB).',
    indianPathways: [
      'National Institute of Mental Health and Neurosciences (NIMHANS, Bengaluru)',
      'Sree Chitra Tirunal Institute for Medical Sciences and Technology (Trivandrum)',
      'AIIMS New Delhi (DM Neurology)',
      'PGIMER Chandigarh'
    ],
    globalPathways: [
      'UCL Queen Square Institute of Neurology (London, UK)',
      'Johns Hopkins Department of Neurology (USA)',
      'Karolinska Institute (Sweden)'
    ],
    keyEntranceExams: 'NEET-UG (MBBS) -> NEET-PG (MD Medicine/Pediatrics) -> NEET-SS (DM Neurology).',
    employers: ['NIMHANS Bengaluru', 'Apollo Institute of Neurosciences', 'Manipal Hospitals', 'Sir Ganga Ram Hospital', 'Research Institutes']
  },

  'clinical_psychologist': {
    id: 'clinical_psychologist',
    title: 'Clinical Psychologist & Mental Health Psychotherapist',
    category: 'Mental Health, Behavioral Science & Psychotherapy',
    iconName: 'Heart',
    idealTraits: ['psychology', 'empathy'],
    description: 'Diagnose mental health conditions, guide individuals through depression, grief, anxiety, and trauma, administer psychometric assessments, and restore peace to troubled minds.',
    dailyLife: 'Conducting one-on-one 50-minute clinical therapy sessions, psychometric diagnostic evaluations, cognitive behavioral therapy (CBT), and family counseling.',
    salaryIndia: '₹6,00,000 to ₹25,00,000+ per year (Private clinical consultants earn ₹1,500 to ₹3,500 per therapy hour).',
    salaryAbroad: '$90,000 to $165,000 per year (High demand across UK NHS, Canada, Australia, and USA).',
    highSchoolStream: 'Any stream in 11th & 12th with Psychology as an elective (Humanities or Science with Biology preferred).',
    indianPathways: [
      'NIMHANS Bengaluru (M.Phil / Psy.D in Clinical Psychology)',
      'Tata Institute of Social Sciences (TISS Mumbai)',
      'Delhi University (Lady Shri Ram College / Daulat Ram College)',
      'Central Institute of Psychiatry (CIP Ranchi)'
    ],
    globalPathways: [
      'University of Oxford - Department of Experimental Psychology (UK)',
      'Harvard University - Department of Psychology (USA)',
      'University of Melbourne - School of Psychological Sciences (Australia)'
    ],
    keyEntranceExams: 'CUET-UG/PG, NIMHANS M.Phil Entrance Exam, RCI Licensing Examination.',
    employers: ['NIMHANS', 'Private Mental Wellness Clinics', 'Top Multispecialty Hospitals', 'Schools & Universities']
  },

  'civil_services_ias': {
    id: 'civil_services_ias',
    title: 'District Magistrate (IAS / IPS / IFS) & Public Administrator',
    category: 'Civil Administration, Law Enforcement & Public Governance',
    iconName: 'Landmark',
    idealTraits: ['civil_services', 'courage'],
    description: 'Hold supreme executive authority over entire administrative districts. You manage police law and order, direct disaster relief, supervise rural hospitals and schools, and drive government policy.',
    dailyLife: 'Chairing district development meetings, reviewing police and revenue court disputes, conducting field inspections, and advising state ministries.',
    salaryIndia: '₹9,50,000 to ₹28,00,000+ per year (7th Pay Commission Level 10 to Level 17 + VIP government bungalow, armed security escort, official car, and authority).',
    salaryAbroad: 'Indian Foreign Service (IFS) Ambassadors and High Commissioners posted across Europe, Americas, Asia, and United Nations headquarters.',
    highSchoolStream: 'Any stream in 11th & 12th (Arts, Science, or Commerce). Consistent general reading and analytical writing habits are paramount.',
    indianPathways: [
      'Lal Bahadur Shastri National Academy of Administration (LBSNAA Mussoorie) - post-UPSC training',
      'Undergraduate degree from any recognized university (Delhi University, IITs, NLUs, etc.)',
      'National Police Academy (SVPNPA Hyderabad) for IPS Officers'
    ],
    globalPathways: [
      'Harvard Kennedy School of Government (USA) - mid-career fellowships',
      'Blavatnik School of Government, Oxford University (UK) - policy exchanges'
    ],
    keyEntranceExams: 'UPSC Civil Services Examination (CSE - Prelims, Mains, and Personality Interview), State PCS.',
    employers: ['Government of India', 'State Secretariats', 'Cabinet Secretariat', 'United Nations Agencies', 'Ministry of External Affairs']
  },

  'cs_ai_engineer': {
    id: 'cs_ai_engineer',
    title: 'Computer Science, AI & Cyber Defense Architect',
    category: 'Software Systems, Artificial Intelligence & Cloud Security',
    iconName: 'Zap',
    idealTraits: ['cs_ai', 'logic'],
    description: 'Build machine learning neural networks, deploy scalable cloud microservices, develop autonomous robotics systems, and defend national banking and defense networks from cyber warfare.',
    dailyLife: 'Writing and optimizing algorithms, testing machine learning models, deploying distributed microservices, and conducting cyber security penetration testing.',
    salaryIndia: '₹8,50,000 to ₹48,00,000+ per year (Top tech architects command packages over ₹70 LPA).',
    salaryAbroad: '$115,000 to $260,000+ per year (Silicon Valley, Seattle, Munich, London, Singapore, Toronto).',
    highSchoolStream: '11th & 12th in Science with Physics, Chemistry, and Mathematics (PCM).',
    indianPathways: [
      'Indian Institutes of Technology (IIT Bombay, IIT Delhi, IIT Madras)',
      'National Institutes of Technology (NIT Trichy, NIT Surathkal)',
      'BITS Pilani & International Institute of Information Technology (IIIT Hyderabad)'
    ],
    globalPathways: [
      'Massachusetts Institute of Technology (MIT) - USA',
      'Stanford University - USA',
      'National University of Singapore (NUS) - Singapore'
    ],
    keyEntranceExams: 'JEE Main, JEE Advanced, BITSAT; for study abroad: SAT, IELTS/TOEFL, GRE.',
    employers: ['Google', 'Microsoft', 'NVIDIA', 'ISRO', 'Amazon', 'Government Cyber Defense Cells']
  },

  'corporate_lawyer': {
    id: 'corporate_lawyer',
    title: 'Corporate Legal Counsel & High Court Advocate',
    category: 'Corporate Advisory, Constitutional Law & Judiciary',
    iconName: 'Scale',
    idealTraits: ['lawyer', 'logic'],
    description: 'Negotiate multi-crore business mergers, defend human rights in constitutional courts, file public interest litigations, and progress toward the judicial magistrate bench.',
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
      'Cambridge University - United Kingdom'
    ],
    keyEntranceExams: 'CLAT (Common Law Admission Test), AILET; State Judicial Services Examination (PCS-J) for becoming a Civil Judge.',
    employers: ['Shardul Amarchand Mangaldas', 'Khaitan & Co', 'Supreme Court & High Courts', 'Tata Sons Legal']
  },

  'chartered_accountant': {
    id: 'chartered_accountant',
    title: 'Chartered Accountant (CA) & Forensic Financial Auditor',
    category: 'Financial Management, Auditing, Capital Markets & Taxation',
    iconName: 'BarChart3',
    idealTraits: ['logic', 'conscientious'],
    description: 'Control corporate balance sheets, audit financial statements to detect multi-crore fraud, design tax frameworks, and advise enterprise founders on investments and acquisitions.',
    dailyLife: 'Analyzing general ledgers, conducting statutory audits, certifying financial statements, filing corporate taxes, and advising boards on capital allocation.',
    salaryIndia: '₹9,00,000 to ₹45,00,000+ per year (Independent CA firms and corporate CFO seats earn substantial consulting income).',
    salaryAbroad: '$110,000 to $250,000 per year (Strong global reciprocity across Dubai, London, Singapore, and Sydney).',
    highSchoolStream: '11th & 12th in Commerce with Mathematics (Science students can also easily transition).',
    indianPathways: [
      'The Institute of Chartered Accountants of India (ICAI - registered right after 12th)',
      'Shri Ram College of Commerce (SRCC, Delhi University)',
      'Indian Institutes of Management (IIM Indore/Rohtak 5-Year Integrated IPMAT Program)'
    ],
    globalPathways: [
      'London School of Economics (LSE) - United Kingdom',
      'Wharton School, University of Pennsylvania - USA',
      'INSEAD - France / Singapore'
    ],
    keyEntranceExams: 'CA Foundation (conducted by ICAI right after 12th), IPMAT (for IIMs after school), CFA, ACCA exams.',
    employers: ['The Big 4 (Deloitte, PwC, EY, KPMG)', 'Goldman Sachs', 'J.P. Morgan', 'HDFC Bank', 'State Bank of India']
  },

  'agri_veterinary_tech': {
    id: 'agri_veterinary_tech',
    title: 'Veterinary Doctor & Autonomous Agri-Tech Innovator',
    category: 'Veterinary Medicine, Drone Agriculture & Livestock Genetics',
    iconName: 'Feather',
    idealTraits: ['agri_vet', 'logic'],
    description: 'Treat livestock, horses, and wildlife as a licensed veterinary surgeon, or modernize farm yields using autonomous agricultural drones, soil biotechnology, and greenhouse automation.',
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
    employers: ['State Animal Husbandry Departments', 'Amul / NDDB', 'Bayer CropScience', 'John Deere AgriTech', 'Wildlife Sanctuaries']
  },

  'architect_urban_planner': {
    id: 'architect_urban_planner',
    title: 'Architect, Spatial Urban Planner & Sustainable Designer',
    category: 'Spatial Architecture, Eco-Cities & Structural Aesthetics',
    iconName: 'Palette',
    idealTraits: ['architect', 'logic'],
    description: 'Conceptualize eco-friendly buildings, sustainable smart cities, and iconic public spaces using 3D CAD modeling, structural loads, and environmental airflow principles.',
    dailyLife: 'Drafting 3D architectural models, testing physical building materials, supervising construction site execution, and presenting plans to urban development authorities.',
    salaryIndia: '₹6,50,000 to ₹28,00,000+ per year (Principal architects and design firm founders earn substantial fees).',
    salaryAbroad: '$85,000 to $175,000 per year (Leading architectural design firms across Europe, Singapore, USA, and Japan).',
    highSchoolStream: '11th & 12th in Science with Mathematics (PCM) is mandatory for B.Arch degrees.',
    indianPathways: [
      'School of Planning and Architecture (SPA New Delhi / Bhopal / Vijayawada)',
      'IIT Roorkee / IIT Kharagpur (Department of Architecture)',
      'CEPT University (Ahmedabad)',
      'National Institute of Design (NID Ahmedabad)'
    ],
    globalPathways: [
      'Architectural Association School of Architecture (AA London, UK)',
      'MIT Department of Architecture (USA)',
      'Delft University of Technology (TU Delft, Netherlands)'
    ],
    keyEntranceExams: 'NATA (National Aptitude Test in Architecture), JEE Main Paper 2 (B.Arch).',
    employers: ['Hafeez Contractor Architects', 'CP Kukreja Associates', 'L&T Construction', 'Smart Cities Mission', 'Independent Studios']
  }
};

const DEFAULT_STUDENTS = [
  { name: 'Rohan Sharma', email: 'rohan@example.com', password: 'password123', grade: 'Class 11th', registeredOn: '2026-09-28' },
  { name: 'Priya Patel', email: 'priya@example.com', password: 'password123', grade: 'Class 12th', registeredOn: '2026-09-29' },
  { name: 'Aarav Verma', email: 'aarav@example.com', password: 'password123', grade: 'Class 10th', registeredOn: '2026-10-01' }
];

const CareerIcon = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Rocket': return <Rocket className={className} />;
    case 'Plane': return <Plane className={className} />;
    case 'Anchor': return <Anchor className={className} />;
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
    case 'Building': return <Building className={className} />;
    default: return <Compass className={className} />;
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('deeppath_user_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [studentRoster, setStudentRoster] = useState(() => {
    try {
      const saved = localStorage.getItem('deeppath_student_roster');
      return saved ? JSON.parse(saved) : DEFAULT_STUDENTS;
    } catch {
      return DEFAULT_STUDENTS;
    }
  });

  const sheetId = '1Bv16i3BDu7jZ5xq4qz7cLJGfFrfWrsoRGEdOlLO3guc';
  const defaultSheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit?usp=sharing`;
  const [sheetUrl, setSheetUrl] = useState(() => {
    return localStorage.getItem('deeppath_custom_sheet_url') || defaultSheetUrl;
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState('');

  const [founderPhoto, setFounderPhoto] = useState(() => {
    return localStorage.getItem('deeppath_founder_photo') || null;
  });
  const fileInputRef = useRef(null);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authGrade, setAuthGrade] = useState('Class 11th');
  const [showPassword, setShowPassword] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState('');

  const [rosterModalOpen, setRosterModalOpen] = useState(false);
  const [rosterSearch, setRosterSearch] = useState('');

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
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
  const totalQuestions = ASSESSMENT_BATTERY.length;
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
      army: 0,
      airforce: 0,
      navy: 0,
      aerospace: 0,
      civil: 0,
      surgeon: 0,
      cardiology: 0,
      neurology: 0,
      psychology: 0,
      civil_services: 0,
      cs_ai: 0,
      lawyer: 0,
      agri_vet: 0,
      architect: 0,
      introvert: 0,
      extravert: 0,
      conscientious: 0,
      spontaneous: 0,
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
      if (qAns && qAns.points) {
        mathPoints += qAns.points;
      }
    }
    const mathMax = 50;
    const iqPercentile = Math.min(99, Math.max(55, Math.round((mathPoints / mathMax) * 100)));

    let clarityVerdict = 'Exploring with Keen Curiosity';
    let clarityDesc = 'You are actively comparing multiple interesting fields with genuine curiosity. You have natural strengths that will shine once you see the step-by-step roadmap.';
    let clarityColor = 'text-amber-400 bg-amber-400/10 border-amber-400/30';

    if (traitScores.confused >= 10) {
      clarityVerdict = 'Seeking Guidance / Overwhelmed State';
      clarityDesc = 'You have felt overwhelmed by conflicting advice or fear of making a wrong stream choice. This report provides an exact, structured roadmap to remove all anxiety.';
      clarityColor = 'text-rose-400 bg-rose-400/10 border-rose-400/30';
    } else if (traitScores.pressured >= 10) {
      clarityVerdict = 'Heavy External & Parental Pressure';
      clarityDesc = 'You feel significant pressure from relatives, parents, or peer expectations to pursue traditional degrees. Remember: true success comes when your natural intellect aligns with your daily calling.';
      clarityColor = 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    } else if (traitScores.decided >= 15) {
      clarityVerdict = 'Firmly Focused & Decided';
      clarityDesc = 'You possess crystal-clear intrinsic drive and know what kind of impact you wish to create in life. Use this report to verify college paths, entrance exams, and global opportunities.';
      clarityColor = 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
    }

    const normalizedTraits = {
      'Cognitive & Mathematical Logic': Math.min(99, Math.max(45, Math.round((mathPoints / 50) * 100))),
      'Tactical Armed Forces & Command': Math.min(99, Math.max(40, (traitScores.army + traitScores.airforce + traitScores.navy + traitScores.courage) * 2 + 30)),
      'Aerospace & Space Technology': Math.min(99, Math.max(40, (traitScores.aerospace + traitScores.logic) * 2 + 30)),
      'Medical & Surgical Precision': Math.min(99, Math.max(40, (traitScores.surgeon + traitScores.cardiology + traitScores.neurology) * 2 + 30)),
      'Civil & Structural Engineering': Math.min(99, Math.max(40, (traitScores.civil + traitScores.logic) * 2 + 30)),
      'Psychological Empathy & Counseling': Math.min(99, Math.max(40, (traitScores.psychology + traitScores.empathy) * 2 + 30)),
      'Civil Administration & Law': Math.min(99, Math.max(40, (traitScores.civil_services + traitScores.lawyer) * 2 + 30)),
      'Computer Science & AI Systems': Math.min(99, Math.max(40, (traitScores.cs_ai + traitScores.logic) * 2 + 30))
    };

    const rankedCareers = Object.values(CAREER_DATABASE).map(career => {
      let careerScore = 0;
      career.idealTraits.forEach(trait => {
        careerScore += (traitScores[trait] || 0) * 4;
      });
      if (career.id.includes('airforce') || career.id.includes('aerospace')) {
        careerScore += traitScores.aerospace * 1.5;
      }
      if (career.id.includes('surgeon') || career.id.includes('cardiologist')) {
        careerScore += traitScores.surgeon * 1.5;
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
                Expanded Defense & Medical Diagnostic • 15 Disciplines
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
              <span>Start Assessment</span>
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
                  <span>Deep Diagnostic Battery across Defense, Space, Medicine & Engineering</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.12]">
                  Discover the career that fits you best.{' '}
                  <span className="block mt-2 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                    Step by step, from school to your dream job.
                  </span>
                </h1>

                <p className="mt-8 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
                  An untimed, thorough diagnostic designed to uncover your true cognitive and psychological strengths.
                  Deep specialization across the **Indian Army, Air Force, Navy**, **Aerospace & Space Technology**, **Specialized Surgery**, **Cardiology**, **Neurology**, **Civil Infrastructure**, and **Public Governance**.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleInitiateTestClick}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-110 shadow-xl shadow-amber-400/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                  >
                    <span>Begin Assessment</span>
                    <ArrowRight className="w-5 h-5 text-slate-950" />
                  </button>

                  <button
                    onClick={() => setCurrentView('allCareers')}
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm text-slate-300 hover:text-white border border-slate-800 bg-slate-900/60 hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>Explore All 15 Disciplines</span>
                  </button>
                </div>

                <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                      <Shield className="w-4 h-4" />
                      <span>Deep Defense Branches</span>
                    </div>
                    <p className="text-xs text-slate-400">Army combat command, IAF fighter aviation & Naval destroyers.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-1">
                      <Activity className="w-4 h-4" />
                      <span>Advanced Medical Wings</span>
                    </div>
                    <p className="text-xs text-slate-400">Trauma surgery, cardiology cath-labs & clinical neurology.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-sky-400 font-bold text-sm mb-1">
                      <Rocket className="w-4 h-4" />
                      <span>Space & Aerospace</span>
                    </div>
                    <p className="text-xs text-slate-400">ISRO rocketry, satellite telemetry & supersonic propulsion.</p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                      <Building className="w-4 h-4" />
                      <span>Civil Mega Infrastructure</span>
                    </div>
                    <p className="text-xs text-slate-400">High-speed rail tunnels, suspension bridges & structural loads.</p>
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
                        A fulfilled career isn't limited to a generic desk job. When I looked around, 
                        the real heroes were army commanders defending our high-altitude glaciers, IAF fighter pilots navigating supersonic skies, 
                        surgeons standing for 6 hours straight inside trauma rooms, and aerospace engineers crafting rockets for the cosmos.
                      </p>
                      <p>
                        We designed this enhanced diagnostic with targeted logic puzzles and realistic scenarios so that whether you belong to a quiet village 
                        or a busy city, you find your exact calling with step-by-step clarity.
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
                      <span>Analyze Answers</span>
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
                      <h3 className="text-lg font-bold text-white">Assessment Question Palette ({totalQuestions})</h3>
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
                <h3 className="text-2xl font-black text-white">Synthesizing Profile Dimensions</h3>
                <p className="text-xs text-slate-400 mt-2">
                  Calculating Cognitive Aptitude IQ, Defense Instincts, Medical Branching, and matching across 15 full career paths...
                </p>
              </div>

              <div className="space-y-2 text-left bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Math & Logic Aptitude</span>
                  <span className="text-emerald-400 font-bold">Percentile Solved</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Defense & Medical Scenarios</span>
                  <span className="text-emerald-400 font-bold">Evaluated</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Colleges (NDA, AIIMS, IIST, IITs, Oxford)</span>
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
                    <span>Specialized Diagnostic Dossier</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-white">
                    Congratulations, {currentUser?.name || 'Student'}!
                  </h1>
                  <p className="text-sm text-slate-300 mt-1">
                    Calculated on {assessmentReport.dateFormatted}. Here is your full cognitive and vocational breakdown.
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
                  Evaluated from the numerical sequences, spatial cubes, structural ratios, and aerodynamic reasoning questions. 
                  Demonstrates sharp analytical precision and strong technical problem-solving capacity.
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
                <h3 className="text-xl font-bold text-white">Psychological & Domain Trait Spectrum</h3>
                <p className="text-xs text-slate-400 mt-0.5">Scored from your choices across tactical dilemmas, engineering decisions, and vocational callings.</p>
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

            {/* Primary Matched Career Card */}
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
                Directory of All 15 Diverse Disciplines
              </h1>
              <p className="text-sm sm:text-base text-slate-400">
                Explore every career path—from Army Officers and IAF Fighter Pilots to Aerospace Engineers, Specialized Surgeons, and Civil Builders.
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
                      Take Assessment to Check Fit
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
            Built with dedicated branches for Defense (Army, Navy, Air Force), Aerospace & Civil Engineering, and Specialized Medicine.
          </div>
          <div className="text-slate-600">
            Connected with Google Spreadsheet ID: {sheetId.slice(0, 8)}...
          </div>
        </div>
      </footer>

    </div>
  );
}
