export type StageStatus = "in-progress" | "planned";

export interface SecureBankStage {
  number: number;
  /** Short name shown on cards */
  name: string;
  /** Full title, e.g. "Stage 1 — BankTraffic Analyzer" */
  title: string;
  icon: string;
  summary: string;
  details: string;
  concepts: string[];
  status: StageStatus;
  statusLabel: string;
}

export const SECUREBANK_STAGES: SecureBankStage[] = [
  {
    number: 1,
    name: "BankTraffic Analyzer",
    title: "Stage 1 — BankTraffic Analyzer",
    icon: "activity",
    summary: "Analyzing banking network traffic to tell normal from suspicious behavior.",
    details:
      "A traffic analysis tool/environment for the SecureBank network. It captures and inspects banking traffic to build an understanding of baseline behavior — what normal looks like — so anomalies and suspicious activity stand out.",
    concepts: ["Network analysis", "Traffic patterns", "Anomaly detection", "Python"],
    status: "in-progress",
    statusLabel: "In progress",
  },
  {
    number: 2,
    name: "SecureBank Linux Server",
    title: "Stage 2 — SecureBank Linux Server",
    icon: "server",
    summary: "A hardened Linux server representing a secure banking infrastructure component.",
    details:
      "A Linux server hardened to banking standards — least privilege, locked-down services, hardened SSH, firewall rules, audit logging — standing in for the infrastructure that hosts the banking environment.",
    concepts: ["Linux hardening", "System administration", "Server security", "Firewalling"],
    status: "planned",
    statusLabel: "Planned",
  },
  {
    number: 3,
    name: "Threat Model Document",
    title: "Stage 3 — Threat Model Document",
    icon: "file-search",
    summary: "Security threat modeling for the banking environment.",
    details:
      "A structured threat model for SecureBank: identifying assets, mapping the attack surface, enumerating threats, assessing risk, and designing mitigations before (and while) building the environment.",
    concepts: ["Threat modeling", "Asset inventory", "Risk assessment", "Mitigations"],
    status: "planned",
    statusLabel: "Planned",
  },
  {
    number: 4,
    name: "VulnBank App",
    title: "Stage 4 — VulnBank App",
    icon: "banknote",
    summary: "A deliberately vulnerable banking app used as a controlled testing target.",
    details:
      "A purpose-built vulnerable banking application. It exists as a controlled environment to practice finding and exploiting common application flaws — then verifying the fixes — without touching anything real.",
    concepts: ["Web app security", "OWASP Top 10", "Controlled testing", "Secure coding"],
    status: "planned",
    statusLabel: "Planned",
  },
  {
    number: 5,
    name: "BankRecon Tool",
    title: "Stage 5 — BankRecon Tool",
    icon: "radar",
    summary: "Reconnaissance tooling for mapping the environment's attack surface.",
    details:
      "A reconnaissance-focused tool that maps what the banking environment exposes: services, ports, headers, endpoints and other externally visible information — the foundation of any assessment.",
    concepts: ["Reconnaissance", "Attack surface mapping", "OSINT", "Enumeration"],
    status: "planned",
    statusLabel: "Planned",
  },
  {
    number: 6,
    name: "VulnBank Pentest Report",
    title: "Stage 6 — VulnBank Pentest Report",
    icon: "scroll-text",
    summary: "A professional penetration-testing report with evidence and remediation.",
    details:
      "A professional pentest report for VulnBank: methodology, discovered vulnerabilities with evidence, severity ratings, business impact, and clear remediation guidance — the kind of document a real assessment produces.",
    concepts: ["Pentest methodology", "Evidence & severity", "Reporting", "Remediation"],
    status: "planned",
    statusLabel: "Planned",
  },
  {
    number: 7,
    name: "SecureBank SIEM",
    title: "Stage 7 — SecureBank SIEM",
    icon: "monitor-dot",
    summary: "Security monitoring that collects, correlates and visualizes threats.",
    details:
      "A security monitoring environment for SecureBank: collecting logs from across the environment, detecting suspicious activity, correlating events into meaningful alerts, and visualizing threats on a dashboard.",
    concepts: ["SIEM", "Log collection", "Correlation rules", "Threat visualization"],
    status: "planned",
    statusLabel: "Planned",
  },
  {
    number: 8,
    name: "BankBreach Incident Report",
    title: "Stage 8 — BankBreach Incident Report",
    icon: "siren",
    summary: "A simulated banking breach investigation and incident-response report.",
    details:
      "A simulated breach of the SecureBank environment, investigated end-to-end: timeline reconstruction, root-cause analysis, containment and eradication steps, and lessons learned — written as a real IR report.",
    concepts: ["Incident response", "Forensic timeline", "Root-cause analysis", "Reporting"],
    status: "planned",
    statusLabel: "Planned",
  },
  {
    number: 9,
    name: "SecureBank DevSecOps Pipeline",
    title: "Stage 9 — SecureBank DevSecOps Pipeline",
    icon: "git-branch",
    summary: "A security-focused pipeline embedding checks into the software lifecycle.",
    details:
      "A development and deployment pipeline for SecureBank that bakes security in: automated scans, dependency checks, secrets detection and policy gates running at every stage of the software lifecycle.",
    concepts: ["DevSecOps", "CI/CD security", "Automated scanning", "Policy as code"],
    status: "planned",
    statusLabel: "Planned",
  },
];

export interface ArchitectureLayer {
  id: string;
  /** Short label for the node */
  label: string;
  /** Full name */
  name: string;
  icon: string;
  /** Which stage(s) power this layer */
  stageNumbers: number[];
  summary: string;
}

/** The SecureBank architecture, top (Internet) to bottom (DevSecOps). */
export const SECUREBANK_ARCHITECTURE: ArchitectureLayer[] = [
  {
    id: "internet",
    label: "Internet",
    name: "Internet — Users & Attackers",
    icon: "globe",
    stageNumbers: [],
    summary:
      "The external world: clients, partners — and adversaries. Every path into SecureBank starts here, which is why the environment maps what touches the perimeter.",
  },
  {
    id: "recon",
    label: "Reconnaissance",
    name: "Reconnaissance Layer",
    icon: "radar",
    stageNumbers: [5],
    summary:
      "BankRecon maps the attack surface the environment exposes — services, ports, headers and endpoints — before any testing begins.",
  },
  {
    id: "app",
    label: "Bank Application",
    name: "Bank Application Layer",
    icon: "banknote",
    stageNumbers: [4, 6],
    summary:
      "VulnBank, the deliberately vulnerable banking app. It is the primary target where application-level flaws are found, documented and remediated.",
  },
  {
    id: "linux",
    label: "Linux Infrastructure",
    name: "Linux Infrastructure Layer",
    icon: "server",
    stageNumbers: [2, 3],
    summary:
      "The hardened SecureBank Linux server hosting the environment — locked down, logged, and documented through the threat model.",
  },
  {
    id: "monitoring",
    label: "Security Monitoring",
    name: "Security Monitoring Layer",
    icon: "monitor-dot",
    stageNumbers: [1, 7],
    summary:
      "BankTraffic Analyzer understands normal traffic; the SecureBank SIEM collects logs from every layer for continuous visibility.",
  },
  {
    id: "detection",
    label: "Threat Detection",
    name: "Threat Detection Layer",
    icon: "activity",
    stageNumbers: [7],
    summary:
      "Correlation rules and analytics turn raw logs into alerts — distinguishing suspicious activity from normal banking behavior.",
  },
  {
    id: "response",
    label: "Incident Response",
    name: "Incident Response Layer",
    icon: "siren",
    stageNumbers: [8],
    summary:
      "The BankBreach investigation simulates a real breach: timeline reconstruction, containment, eradication, and lessons learned.",
  },
  {
    id: "devsecops",
    label: "DevSecOps",
    name: "DevSecOps Pipeline",
    icon: "git-branch",
    stageNumbers: [9],
    summary:
      "Security is embedded in the lifecycle — automated scans, dependency checks and policy gates in the deployment pipeline.",
  },
];
