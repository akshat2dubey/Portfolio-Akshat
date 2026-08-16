export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // lucide icon key, resolved in the component
  blurb: string;
  skills: string[];
}

/**
 * Skill groupings. Deliberately plain labels — no "expert" claims.
 * Depth is communicated through the SecureBank project, not adjectives.
 */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    icon: "shield",
    blurb: "The core discipline I'm building my career around.",
    skills: [
      "Cybersecurity fundamentals",
      "Network security",
      "Threat modeling",
      "Vulnerability assessment",
      "Penetration-testing concepts",
      "Security documentation",
      "Security architecture",
      "Incident response concepts",
      "SIEM concepts",
      "DevSecOps",
      "Secure system design",
    ],
  },
  {
    id: "systems",
    title: "Systems & Infrastructure",
    icon: "server",
    blurb: "The ground layer every secure system stands on.",
    skills: [
      "Linux",
      "Networking",
      "Linux server security",
      "System administration fundamentals",
      "Secure infrastructure concepts",
    ],
  },
  {
    id: "programming",
    title: "Programming",
    icon: "code",
    blurb: "Building, breaking, and automating with code.",
    skills: [
      "C",
      "C++",
      "Python",
      "Basic web development",
      "Data Structures & Algorithms fundamentals",
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    icon: "terminal",
    blurb: "The daily toolchain of a security-minded developer.",
    skills: ["Git", "GitHub", "VS Code", "MinGW / GCC", "Command-line tools"],
  },
  {
    id: "engineering",
    title: "Engineering Skills",
    icon: "wrench",
    blurb: "How I approach problems and ship work.",
    skills: [
      "Problem solving",
      "System design fundamentals",
      "Technical documentation",
      "Project planning",
      "Security analysis",
      "Research",
      "Team collaboration",
      "Rapid prototyping",
    ],
  },
];

/** Topics currently being deepened through SecureBank + practice. */
export const CURRENT_FOCUS = [
  "DevSecOps",
  "SIEM & log analysis",
  "Incident response",
  "Pentesting methodology",
  "Secure architecture",
];
