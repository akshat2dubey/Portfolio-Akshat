export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  security: string[];
  /** External repo/profile link. Add the exact repo URL here once published. */
  github?: string;
  /** Live demo / deploy link, when available. */
  live?: string;
  /** Anchor to a section on the site (e.g. the SecureBank deep-dive). */
  anchor?: string;
  status: "active" | "in-progress" | "planned";
  statusLabel: string;
  featured?: boolean;
}

/**
 * Project registry — add future projects here; the Projects section
 * renders every entry. Status labels keep claims honest: "active"
 * means publicly available, "planned" means on the roadmap.
 */
export const PROJECTS: Project[] = [
  {
    id: "securebank",
    name: "SecureBank Enterprise Lab",
    tagline: "End-to-end secure banking environment & cybersecurity laboratory",
    description:
      "My flagship, long-term project: nine connected stages that simulate the infrastructure, applications and security operations of a modern banking enterprise — networking, Linux hardening, threat modeling, pentesting, SIEM, incident response and DevSecOps in one ecosystem. Every stage builds on the previous one, the way real organizations design, secure and monitor their systems.",
    tech: ["Python", "Linux", "Networking", "SIEM", "DevSecOps", "Documentation"],
    security: [
      "Threat modeling",
      "Penetration testing",
      "Security monitoring",
      "Incident response",
      "Secure architecture",
    ],
    github: "https://github.com/akshat2dubey",
    anchor: "securebank",
    status: "in-progress",
    statusLabel: "Building now",
    featured: true,
  },
  {
    id: "intrusion-detection-lab",
    name: "Network Intrusion Detection Lab",
    tagline: "Detecting suspicious traffic in a controlled network",
    description:
      "A planned hands-on lab for monitoring network traffic, spotting suspicious patterns and practicing detection engineering in a safe, self-hosted environment.",
    tech: ["Linux", "Networking", "Python"],
    security: ["Detection engineering", "Traffic analysis"],
    status: "planned",
    statusLabel: "On the roadmap",
  },
  {
    id: "linux-hardening-playbook",
    name: "Linux Hardening Playbook",
    tagline: "A documented approach to securing Linux servers",
    description:
      "Planned write-up and scripts for hardening Linux servers — hardening checklists, secure configuration and audit logging, distilled into reusable documentation.",
    tech: ["Linux", "Bash", "System administration"],
    security: ["System hardening", "Secure configuration", "Auditing"],
    status: "planned",
    statusLabel: "On the roadmap",
  },
];

/** Extra small "currently building" chips shown inside the flagship card. */
export const SECUREBANK_STAGE_CHIPS = [
  "Stage 1 — BankTraffic Analyzer · building",
  "Stage 2 — SecureBank Linux Server",
  "Stage 3 — Threat Model Document",
  "Stage 4 — VulnBank App",
  "Stage 5 — BankRecon Tool",
  "Stage 6 — VulnBank Pentest Report",
  "Stage 7 — SecureBank SIEM",
  "Stage 8 — BankBreach Incident Report",
  "Stage 9 — SecureBank DevSecOps Pipeline",
];
