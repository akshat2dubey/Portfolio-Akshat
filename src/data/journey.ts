export interface JourneyStep {
  title: string;
  description: string;
  icon: string;
  /** Present/ongoing vs completed learning phase */
  current?: boolean;
}

/**
 * The learning arc: Programming → Networking → Linux → Cybersecurity →
 * Threat Modeling → Pentesting → SIEM → Incident Response → DevSecOps →
 * Secure Architecture. Later steps are being built through SecureBank.
 */
export const JOURNEY: JourneyStep[] = [
  {
    title: "Programming",
    description:
      "Started with C, C++ and Python — data structures, algorithms, and the discipline of writing and debugging code.",
    icon: "code",
  },
  {
    title: "Networking",
    description:
      "How data actually moves: protocols, addressing, ports and traffic — the substrate every attack and defense runs on.",
    icon: "network",
  },
  {
    title: "Linux",
    description:
      "The operating system of the security world. Terminals, permissions, services and the command line became home turf.",
    icon: "terminal",
  },
  {
    title: "Cybersecurity",
    description:
      "The core discipline: threats, defenses, and the mindset of thinking like both builder and attacker.",
    icon: "shield",
    current: true,
  },
  {
    title: "Threat Modeling",
    description:
      "Structured analysis of assets, attack surfaces and risks — captured in the SecureBank threat model document.",
    icon: "file-search",
  },
  {
    title: "Pentesting",
    description:
      "Controlled testing of the VulnBank application — finding, documenting and understanding vulnerabilities with evidence.",
    icon: "target",
  },
  {
    title: "SIEM",
    description:
      "Collecting logs, correlating events and visualizing threats across the SecureBank environment.",
    icon: "monitor-dot",
  },
  {
    title: "Incident Response",
    description:
      "Investigating the simulated BankBreach — timeline, root cause, containment and lessons learned.",
    icon: "siren",
  },
  {
    title: "DevSecOps",
    description:
      "Embedding security into the software lifecycle with automated scans and policy gates in the pipeline.",
    icon: "git-branch",
  },
  {
    title: "Secure Architecture",
    description:
      "Pulling it together: designing systems where security is a property of the architecture, not an afterthought.",
    icon: "layers",
  },
];

/** Milestones that are true today — nothing invented. */
export const CURRENT_MILESTONES = [
  "Computer Science & Engineering student",
  "Cybersecurity-focused learning path",
  "Built a structured multi-stage SecureBank security project",
  "Practical focus on networking and security",
  "Hands-on work with Linux and security tooling",
  "Building cybersecurity documentation and system architecture",
  "Participating in hackathon / project-based development",
  "Developing Git & GitHub and software engineering skills",
];

/** Clearly-labeled future goals, not achievements. */
export const FUTURE_GOALS = [
  "Security certifications",
  "A security internship",
  "Completing the full SecureBank 9-stage build",
  "CTF participation and write-ups",
  "Open-source security contributions",
  "Specializing deeper in DevSecOps and SIEM",
];
