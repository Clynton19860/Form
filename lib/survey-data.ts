import { LikertQuestion, TextQuestion } from './supabase'

export const likertQuestions: LikertQuestion[] = [
  // Leadership & Management (10 questions)
  {
    id: 1,
    category: "Leadership & Management",
    question: "Demonstrates strong leadership qualities",
    description: "Shows ability to guide and inspire others"
  },
  {
    id: 2,
    category: "Leadership & Management",
    question: "Provides clear direction and vision",
    description: "Communicates goals and objectives effectively"
  },
  {
    id: 3,
    category: "Leadership & Management",
    question: "Makes sound decisions under pressure",
    description: "Shows good judgment in challenging situations"
  },
  {
    id: 4,
    category: "Leadership & Management",
    question: "Delegates tasks appropriately",
    description: "Assigns work based on team members' strengths"
  },
  {
    id: 5,
    category: "Leadership & Management",
    question: "Provides constructive feedback",
    description: "Offers helpful guidance for improvement"
  },
  {
    id: 6,
    category: "Leadership & Management",
    question: "Leads by example",
    description: "Sets high standards through personal behavior"
  },
  {
    id: 7,
    category: "Leadership & Management",
    question: "Manages conflicts effectively",
    description: "Resolves disagreements professionally"
  },
  {
    id: 8,
    category: "Leadership & Management",
    question: "Encourages innovation and creativity",
    description: "Fosters new ideas and approaches"
  },
  {
    id: 9,
    category: "Leadership & Management",
    question: "Builds and maintains team morale",
    description: "Creates a positive work environment"
  },
  {
    id: 10,
    category: "Leadership & Management",
    question: "Takes responsibility for outcomes",
    description: "Owns both successes and failures"
  },

  // Communication Skills (10 questions)
  {
    id: 11,
    category: "Communication Skills",
    question: "Communicates clearly and effectively",
    description: "Expresses ideas in an understandable way"
  },
  {
    id: 12,
    category: "Communication Skills",
    question: "Listens actively to others",
    description: "Pays attention and shows understanding"
  },
  {
    id: 13,
    category: "Communication Skills",
    question: "Provides timely updates and information",
    description: "Keeps stakeholders informed of progress"
  },
  {
    id: 14,
    category: "Communication Skills",
    question: "Adapts communication style to audience",
    description: "Adjusts approach based on who they're speaking with"
  },
  {
    id: 15,
    category: "Communication Skills",
    question: "Handles difficult conversations professionally",
    description: "Manages sensitive topics with tact"
  },
  {
    id: 16,
    category: "Communication Skills",
    question: "Writes clear and concise documents",
    description: "Produces well-structured written materials"
  },
  {
    id: 17,
    category: "Communication Skills",
    question: "Presents information confidently",
    description: "Speaks with authority and clarity"
  },
  {
    id: 18,
    category: "Communication Skills",
    question: "Asks clarifying questions when needed",
    description: "Seeks understanding before proceeding"
  },
  {
    id: 19,
    category: "Communication Skills",
    question: "Provides constructive criticism",
    description: "Offers feedback that helps others improve"
  },
  {
    id: 20,
    category: "Communication Skills",
    question: "Maintains open lines of communication",
    description: "Encourages ongoing dialogue and feedback"
  },

  // Teamwork & Collaboration (10 questions)
  {
    id: 21,
    category: "Teamwork & Collaboration",
    question: "Works effectively with others",
    description: "Collaborates well in team settings"
  },
  {
    id: 22,
    category: "Teamwork & Collaboration",
    question: "Shares knowledge and resources",
    description: "Contributes to team learning and success"
  },
  {
    id: 23,
    category: "Teamwork & Collaboration",
    question: "Supports team goals and objectives",
    description: "Aligns personal efforts with team priorities"
  },
  {
    id: 24,
    category: "Teamwork & Collaboration",
    question: "Respects diverse perspectives",
    description: "Values different viewpoints and backgrounds"
  },
  {
    id: 25,
    category: "Teamwork & Collaboration",
    question: "Contributes to team decision-making",
    description: "Participates actively in group discussions"
  },
  {
    id: 26,
    category: "Teamwork & Collaboration",
    question: "Helps resolve team conflicts",
    description: "Works to find solutions to disagreements"
  },
  {
    id: 27,
    category: "Teamwork & Collaboration",
    question: "Mentors and supports colleagues",
    description: "Helps others develop their skills"
  },
  {
    id: 28,
    category: "Teamwork & Collaboration",
    question: "Celebrates team successes",
    description: "Recognizes and appreciates collective achievements"
  },
  {
    id: 29,
    category: "Teamwork & Collaboration",
    question: "Adapts to changing team dynamics",
    description: "Adjusts approach as team composition changes"
  },
  {
    id: 30,
    category: "Teamwork & Collaboration",
    question: "Builds positive relationships",
    description: "Develops trust and rapport with colleagues"
  },

  // Problem Solving & Innovation (10 questions)
  {
    id: 31,
    category: "Problem Solving & Innovation",
    question: "Identifies problems proactively",
    description: "Recognizes issues before they escalate"
  },
  {
    id: 32,
    category: "Problem Solving & Innovation",
    question: "Analyzes situations thoroughly",
    description: "Examines all aspects before making decisions"
  },
  {
    id: 33,
    category: "Problem Solving & Innovation",
    question: "Generates creative solutions",
    description: "Comes up with innovative approaches"
  },
  {
    id: 34,
    category: "Problem Solving & Innovation",
    question: "Evaluates multiple options",
    description: "Considers various alternatives before choosing"
  },
  {
    id: 35,
    category: "Problem Solving & Innovation",
    question: "Implements solutions effectively",
    description: "Executes plans with attention to detail"
  },
  {
    id: 36,
    category: "Problem Solving & Innovation",
    question: "Learns from past experiences",
    description: "Applies lessons learned to future situations"
  },
  {
    id: 37,
    category: "Problem Solving & Innovation",
    question: "Thinks strategically",
    description: "Considers long-term implications of decisions"
  },
  {
    id: 38,
    category: "Problem Solving & Innovation",
    question: "Embraces new technologies and methods",
    description: "Willing to try innovative approaches"
  },
  {
    id: 39,
    category: "Problem Solving & Innovation",
    question: "Takes calculated risks",
    description: "Makes bold decisions when appropriate"
  },
  {
    id: 40,
    category: "Problem Solving & Innovation",
    question: "Continuously improves processes",
    description: "Seeks ways to make things better"
  },

  // Professional Development (10 questions)
  {
    id: 41,
    category: "Professional Development",
    question: "Takes initiative in learning",
    description: "Proactively seeks new knowledge and skills"
  },
  {
    id: 42,
    category: "Professional Development",
    question: "Accepts feedback graciously",
    description: "Receives criticism with an open mind"
  },
  {
    id: 43,
    category: "Professional Development",
    question: "Sets and achieves personal goals",
    description: "Establishes and works toward objectives"
  },
  {
    id: 44,
    category: "Professional Development",
    question: "Stays current with industry trends",
    description: "Keeps up with developments in their field"
  },
  {
    id: 45,
    category: "Professional Development",
    question: "Shares knowledge with others",
    description: "Contributes to organizational learning"
  },
  {
    id: 46,
    category: "Professional Development",
    question: "Seeks challenging assignments",
    description: "Volunteers for difficult tasks"
  },
  {
    id: 47,
    category: "Professional Development",
    question: "Maintains professional standards",
    description: "Upholds high ethical and quality standards"
  },
  {
    id: 48,
    category: "Professional Development",
    question: "Balances work and personal life",
    description: "Manages time and priorities effectively"
  },
  {
    id: 49,
    category: "Professional Development",
    question: "Demonstrates resilience under pressure",
    description: "Maintains composure in difficult situations"
  },
  {
    id: 50,
    category: "Professional Development",
    question: "Contributes to organizational success",
    description: "Makes meaningful impact on company goals"
  }
]

export const textQuestions: TextQuestion[] = [
  {
    id: 1,
    question: "What are this person's greatest strengths?",
    description: "Please provide specific examples of what they do exceptionally well."
  },
  {
    id: 2,
    question: "What areas would you suggest for improvement?",
    description: "Please be constructive and specific about development opportunities."
  },
  {
    id: 3,
    question: "How does this person contribute to team success?",
    description: "Describe their role in helping the team achieve its goals."
  },
  {
    id: 4,
    question: "What leadership qualities does this person demonstrate?",
    description: "Share examples of their leadership in action."
  },
  {
    id: 5,
    question: "How does this person handle challenges and setbacks?",
    description: "Describe their approach to difficult situations."
  },
  {
    id: 6,
    question: "What makes this person unique or special?",
    description: "Share what sets them apart from others."
  },
  {
    id: 7,
    question: "How does this person support and develop others?",
    description: "Describe their mentoring or coaching abilities."
  },
  {
    id: 8,
    question: "What impact has this person had on the organization?",
    description: "Share examples of their contributions to company success."
  },
  {
    id: 9,
    question: "How does this person demonstrate company values?",
    description: "Provide examples of values in action."
  },
  {
    id: 10,
    question: "Additional comments or suggestions?",
    description: "Any other feedback you'd like to share."
  }
]

export const categories = Array.from(new Set(likertQuestions.map(q => q.category)))
