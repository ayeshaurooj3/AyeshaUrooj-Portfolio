import { useEffect, useRef, useState } from "react";
import { Github, Mail, Linkedin, MapPin, Download, ExternalLink, ChevronRight, Award } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import ayeshaPhoto from "@/imports/ChatGPT_Image_Jun_12__2026__08_42_31_PM.png";

// ── Colour tokens ──────────────────────────────────────────────
const C = {
  bg: "#0A0E1A",
  surface: "#111827",
  surfaceAlt: "#0f1626",
  accent: "#00D4AA",
  secondary: "#7C3AED",
  // text: "#F0F4FF",
  muted: "#8B9CC8",
  border: "rgba(139,156,200,0.12)",
};

// ── Neural-network canvas ──────────────────────────────────────
function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const NODE_COUNT = 22;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,212,170,${0.08 * (1 - dist / 200)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,212,170,0.18)";
        ctx.fill();
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.8 }}
    />
  );
}

// ── Section wrapper ────────────────────────────────────────────
function Section({ id, children, className = "" }: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`w-full max-w-6xl mx-auto px-6 md:px-10 ${className}`}>
      {children}
    </section>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12">
      <p
        className="text-xs font-mono tracking-[0.2em] uppercase mb-3"
        style={{ color: C.accent, fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </p>
      <h2
        className="text-3xl md:text-4xl font-semibold"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.text }}
      >
        {title}
      </h2>
      <div className="mt-4 h-px w-16" style={{ background: C.accent, opacity: 0.6 }} />
    </div>
  );
}

// ── 1. HERO ────────────────────────────────────────────────────
function Hero() {
  return (
    <div
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: C.bg }}
    >
      <NeuralBackground />

      <div
        style={{
          position: "absolute", top: "30%", left: "-10%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: "10%", right: "15%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-24">
        <div className="flex flex-col-reverse md:flex-row items-center gap-14 md:gap-0">
          {/* Left copy */}
          <div className="flex-1">
            <p
              className="text-xs font-mono tracking-[0.2em] uppercase mb-5"
              style={{ color: C.accent, fontFamily: "'JetBrains Mono', monospace" }}
            >
              Available for AI/ML Roles
            </p>
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.text }}
            >
              Ayesha<br />
              <span style={{ color: C.accent }}>Urooj</span>
            </h1>
            <p
              className="text-lg md:text-xl font-medium mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.muted, letterSpacing: "0.01em" }}
            >
              AI/ML Engineer · Computer Vision · Python Developer
            </p>
            <p
              className="text-base md:text-lg mb-10 max-w-[480px] leading-relaxed"
              style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}
            >
              Building intelligent systems that see, reason, and decide.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{
                  background: C.accent,
                  color: C.bg,
                  fontFamily: "'Space Grotesk', sans-serif",
                  boxShadow: `0 0 24px rgba(0,212,170,0.25)`,
                }}
              >
                View Projects <ChevronRight size={16} />
              </a>
            
            </div>
          </div>

          {/* Right photo */}
          <div className="md:ml-auto flex-shrink-0">
            <div className="relative" style={{ width: 300, height: 300 }}>
              {/* animated glow ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -6,
                  borderRadius: "50%",
                  background: `conic-gradient(from 0deg, ${C.accent}, ${C.secondary}, ${C.accent})`,
                  animation: "spin 8s linear infinite",
                  opacity: 0.75,
                }}
              />
              {/* gap ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: "50%",
                  background: C.bg,
                }}
              />
              {/* photo */}
              <div
                style={{
                  position: "absolute",
                  inset: 6,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: C.surface,
                }}
              >
                <ImageWithFallback
                  src={ayeshaPhoto}
                  alt="Ayesha Urooj — AI/ML Engineer"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "50% 18%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── 2. ABOUT ───────────────────────────────────────────────────
const stats = [
  { value: "4.0", label: "GPA — Gold Medal" },
  { value: "3", label: "Internships" },
  { value: "10+", label: "AI Projects" },
  { value: "2+", label: "Certifications" },
];

function About() {
  return (
    <div className="py-24" style={{ background: C.surfaceAlt }}>
      <Section id="about">
        <SectionHeading label="// about" title="The engineer behind the models" />
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-base leading-relaxed mb-5" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
              Ayesha Urooj is a Computer Science graduate from Superior University Lahore,
              where she earned a 4.0 CGPA and the Gold Medal — outcomes driven by
              shipping real systems, not just acing exams.
            </p>
            <p className="text-base leading-relaxed mb-5" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
              She engineers production-grade AI: YOLO-based tumor detectors hitting 94%&nbsp;mAP,
              multi-disease veterinary classifiers, and synthetic-data pipelines that lift model
              accuracy by double digits. Her stack spans PyTorch, TensorFlow, OpenAI APIs, and
              Flask — deployed, measured, iterated.
            </p>
            <p className="text-base leading-relaxed" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
              Three internships — including AI roles at Systems Limited and Nextbridge — gave her
              production context: prompt engineering at scale, streaming inference, and 50K-sample
              training pipelines.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.value}
                className="p-6 rounded-xl flex flex-col gap-2 transition-all duration-200 hover:scale-105"
                style={{ background: C.surface, border: `1px solid ${C.border}` }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{ color: C.accent, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {s.value}
                </span>
                <span className="text-sm" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

// ── 3. SKILLS ─────────────────────────────────────────────────
const skillGroups = [
  {
    label: "ML / DL Frameworks",
    skills: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "Hugging Face"],
  },
  {
    label: "Computer Vision",
    skills: ["YOLOv8", "OpenCV", "Mask R-CNN", "DCGAN", "PIL / Pillow"],
  },
  {
    label: "Data Science",
    skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Jupyter"],
  },
  {
    label: "NLP & GenAI",
    skills: ["OpenAI API", "Prompt Engineering", "Transformers", "Text Classification"],
  },
  {
    label: "Backend & Deployment",
    skills: ["Flask", "FastAPI", "REST APIs", "Streaming Inference", "Postman"],
  },
  {
    label: "Languages",
    skills: ["Python", "PHP", "JavaScript", "SQL", "Bash"],
  },
  {
    label: "Cloud & Tools",
    skills: ["Azure", "Git", "MySQL", "VS Code", "Google Colab"],
  },
];

function Skills() {
  return (
    <div className="py-24" style={{ background: C.bg }}>
      <Section id="skills">
        <SectionHeading label="// skills" title="Technical expertise" />
        <div className="flex flex-col gap-8">
          {skillGroups.map((g) => (
            <div key={g.label}>
              <p
                className="text-xs font-mono tracking-widest uppercase mb-4"
                style={{ color: C.muted, fontFamily: "'JetBrains Mono', monospace" }}
              >
                {g.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((sk) => (
                  <span
                    key={sk}
                    className="px-4 py-1.5 rounded-full text-sm font-medium cursor-default transition-all duration-200 hover:scale-105"
                    style={{
                      border: `1px solid ${C.border}`,
                      color: C.text,
                      fontFamily: "'Inter', sans-serif",
                      background: C.surface,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = C.accent;
                      el.style.boxShadow = `0 0 10px rgba(0,212,170,0.2)`;
                      el.style.color = C.accent;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = C.border;
                      el.style.boxShadow = "none";
                      el.style.color = C.text;
                    }}
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ── 4. EXPERIENCE ─────────────────────────────────────────────
const experiences = [
  {
    company: "Systems Limited",
    role: "AI Intern",
    period: "Jul 2025 – Sep 2025",
    type: "ai",
    points: [
      "Built a production OpenAI API chatbot with streaming inference and custom prompt chains",
      "Engineered multi-turn conversation flows with context-window management",
      "Applied prompt engineering techniques to reduce hallucination rate by ~30%",
    ],
    stack: ["OpenAI API", "Python", "Streaming", "Prompt Engineering"],
  },
  {
    company: "Nextbridge Ltd.",
    role: "AI/ML Trainee",
    period: "Jun 2025 – Jul 2025",
    type: "ai",
    points: [
      "Designed and maintained ML training pipelines processing 50,000+ samples",
      "Achieved 92% model accuracy on structured classification tasks",
      "Preprocessed, augmented, and versioned datasets for reproducible experiments",
    ],
    stack: ["Python", "scikit-learn", "Pandas", "NumPy"],
  },
  {
    company: "PITB",
    role: "Web Development Intern",
    period: "Jun 2024 – Aug 2024",
    type: "web",
    points: [
      "Developed government-scale internal tools with PHP/MySQL backend",
      "Collaborated with cross-functional teams on citizen-facing portal features",
      "Optimized SQL queries, reducing page load times on data-heavy dashboards",
    ],
    stack: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
  },
];

function Experience() {
  return (
    <div className="py-24" style={{ background: C.surfaceAlt }}>
      <Section id="experience">
        <SectionHeading label="// experience" title="Where the work happened" />
        <div className="relative">
          <div
            className="absolute left-5 top-0 bottom-0 w-px hidden md:block"
            style={{ background: C.border }}
          />
          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <div key={i} className="md:pl-14 relative">
                <div
                  className="absolute left-[14px] top-2 w-3 h-3 rounded-full hidden md:block"
                  style={{
                    background: exp.type === "ai" ? C.accent : C.secondary,
                    boxShadow: `0 0 10px ${exp.type === "ai" ? C.accent : C.secondary}`,
                  }}
                />
                <div
                  className="p-6 rounded-xl transition-all duration-200 hover:translate-y-[-2px]"
                  style={{ background: C.surface, border: `1px solid ${C.border}` }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3
                        className="text-lg font-semibold mb-0.5"
                        style={{ color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="text-sm font-medium"
                        style={{
                          color: exp.type === "ai" ? C.accent : C.secondary,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <span
                      className="text-xs font-mono px-3 py-1 rounded-full"
                      style={{
                        background: C.muted + "18",
                        color: C.muted,
                        fontFamily: "'JetBrains Mono', monospace",
                        border: `1px solid ${C.border}`,
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2 mb-5">
                    {exp.points.map((pt, j) => (
                      <li
                        key={j}
                        className="text-sm leading-relaxed flex items-start gap-2"
                        style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}
                      >
                        <span style={{ color: C.accent, marginTop: 2, flexShrink: 0 }}>›</span>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          color: C.muted,
                          border: `1px solid ${C.border}`,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

// ── 5. PROJECTS ───────────────────────────────────────────────
const projects = [
  {
    name: "Brain Tumor Detection",
    description:
      "Dual-model pipeline combining YOLOv8 for detection and Mask R-CNN for instance segmentation on MRI scans. Trained on a curated clinical dataset with advanced augmentation.",
    stack: ["YOLOv8", "Mask R-CNN", "PyTorch", "OpenCV"],
    metric: "94% mAP",
    metricLabel: "detection accuracy",
    accent: C.accent,
  },
  {
    name: "VetVision — Vet AI",
    description:
      "Multi-class CNN classifier for veterinary disease diagnosis spanning 12+ animal conditions. Deployed as a Flask REST API with real-time image upload and inference.",
    stack: ["TensorFlow", "Keras", "Flask", "REST API"],
    metric: "90%+",
    metricLabel: "across 12 diseases",
    github: "https://github.com/ayeshaurooj3/Vet-Vision",
    accent: C.secondary,
  },
  {
    name: "DiagnomiX",
    description:
      "Disease prediction platform using classical ML models (SVM, Random Forest, Gradient Boosting) on symptom-based inputs. Explainability layer for clinical interpretability.",
    stack: ["scikit-learn", "Python", "Flask", "XGBoost"],
    metric: "90%+",
    metricLabel: "prediction accuracy",
    github: "https://github.com/ayeshaurooj3/FYP-16-DiagnomiX-AI",
    accent: C.accent,
  },
  {
    name: "Skin Disease CNN",
    description:
      "Custom convolutional network trained on 3,000+ dermatology images across multiple skin condition classes. Includes test-time augmentation for robust predictions.",
    stack: ["Keras", "CNN", "NumPy", "Matplotlib"],
    metric: "91% accuracy",
    metricLabel: "on 3,000+ images",
    accent: C.secondary,
  },
  {
    name: "Medical DGAN Augmentation",
    description:
      "Deep Convolutional GAN generating synthetic medical images to address dataset imbalance. Produced 10K+ high-fidelity samples that improved downstream classifier performance.",
    stack: ["PyTorch", "DCGAN", "Python", "NumPy"],
    metric: "+12% accuracy",
    metricLabel: "lift via 10K+ synth images",
    accent: C.accent,
  },
  {
    name: "CareLink E-Pharmacy",
    description:
      "Full-stack online pharmacy platform with inventory management, prescription uploads, and order tracking. Built to handle concurrent users at health-facility scale.",
    stack: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
    metric: "Full-stack",
    metricLabel: "production health platform",
    github: "https://github.com/ayeshaurooj3/CareLink",
    accent: C.secondary,
  },
];

function Projects() {
  return (
    <div className="py-24" style={{ background: C.bg }}>
      <Section id="projects">
        <SectionHeading label="// projects" title="Systems shipped, outcomes measured" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div
              key={p.name}
              className="p-6 rounded-xl flex flex-col gap-4 cursor-default"
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = p.accent;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = `0 8px 32px ${p.accent}22`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = C.border;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <h3
                  className="text-base font-semibold leading-snug"
                  style={{ color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {p.name}
                </h3>
                <div className="flex-shrink-0 text-right">
                  <div
                    className="text-sm font-bold"
                    style={{ color: p.accent, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {p.metric}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                    {p.metricLabel}
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed flex-1" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                {p.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ border: `1px solid ${C.border}`, color: C.muted, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={p.github}
                className="inline-flex items-center gap-2 text-sm font-medium mt-1 transition-colors duration-150"
                style={{ color: p.accent, fontFamily: "'Inter', sans-serif" }}
              >
                <Github size={14} /> GitHub <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ── 6. CERTIFICATIONS ─────────────────────────────────────────
const certs = [
  { name: "Microsoft Azure AI-900", issuer: "Microsoft", icon: "☁️", highlight: true },
  { name: "Harvard CS50 2025", issuer: "Harvard / edX", icon: "🎓", highlight: false },
  { name: "AI with Python", issuer: "Great Learning", icon: "🐍", highlight: false },
  { name: "AI/ML Certification", issuer: "NAVTTC", icon: "🇵🇰", highlight: false },
  { name: "Microsoft Office Specialist", issuer: "Microsoft", icon: "📊", highlight: false },
  { name: "Google Ads Certified", issuer: "Google", icon: "📈", highlight: false },
  { name: "Gold Medal — 4.0 CGPA", issuer: "Superior University", icon: "🥇", highlight: true },
];

function Certifications() {
  return (
    <div className="py-24" style={{ background: C.surfaceAlt }}>
      <Section id="certifications">
        <SectionHeading label="// credentials" title="Recognition & certifications" />
        <div
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {certs.map((c) => (
            <div
              key={c.name}
              className="flex-shrink-0 p-5 rounded-xl flex flex-col items-center text-center gap-3 w-48 transition-all duration-200 hover:scale-105 cursor-default"
              style={{
                background: C.surface,
                border: `1px solid ${c.highlight ? C.accent : C.border}`,
                boxShadow: c.highlight ? `0 0 18px rgba(0,212,170,0.15)` : "none",
              }}
            >
              <div className="text-3xl">{c.icon}</div>
              <div>
                <p
                  className="text-xs font-semibold leading-snug mb-1"
                  style={{ color: c.highlight ? C.accent : C.text, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {c.name}
                </p>
                <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                  {c.issuer}
                </p>
              </div>
              {c.highlight && <Award size={14} style={{ color: C.accent }} />}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs" style={{ color: C.muted, fontFamily: "'Inter', sans-serif", opacity: 0.6 }}>
          Scroll to see all →
        </p>
      </Section>
    </div>
  );
}

// ── 7. CONTACT ────────────────────────────────────────────────
function Contact() {
  return (
    <div className="py-24" style={{ background: C.bg }}>
      <Section id="contact">
        <SectionHeading label="// contact" title="Let's build something together" />
        <p className="text-base mb-10 max-w-lg" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
          Open to AI/ML roles, research collaborations, and freelance projects.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <a
            href="mailto:uroojayesha107@gmail.com"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-200 hover:scale-105"
            style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.text, fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = C.accent;
              el.style.boxShadow = `0 0 16px rgba(0,212,170,0.15)`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = C.border;
              el.style.boxShadow = "none";
            }}
          >
            <Mail size={18} style={{ color: C.accent }} />
            <div>
              <p className="text-xs" style={{ color: C.muted }}>Email</p>
              <p className="text-sm font-medium">uroojayesha107@gmail.com</p>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/ayeshaurooj107"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-200 hover:scale-105"
            style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.text, fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = C.secondary;
              el.style.boxShadow = `0 0 16px rgba(124,58,237,0.15)`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = C.border;
              el.style.boxShadow = "none";
            }}
          >
            <Linkedin size={18} style={{ color: C.secondary }} />
            <div>
              <p className="text-xs" style={{ color: C.muted }}>LinkedIn</p>
              <p className="text-sm font-medium">ayeshaurooj107</p>
            </div>
          </a>

          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-xl"
            style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.text, fontFamily: "'Inter', sans-serif" }}
          >
            <MapPin size={18} style={{ color: C.muted }} />
            <div>
              <p className="text-xs" style={{ color: C.muted }}>Location</p>
              <p className="text-sm font-medium">Lahore, Pakistan</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ── NAV ───────────────────────────────────────────────────────
const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? `${C.bg}ee` : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-base font-bold tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.accent }}
        >
          AU<span style={{ color: C.muted }}>.dev</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm transition-colors duration-150"
              style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.text)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = C.muted)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 hover:scale-105"
            style={{ background: C.accent, color: C.bg, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Hire Me
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className="block w-5 h-0.5 transition-transform duration-200"
            style={{ background: C.text, transform: menuOpen ? "rotate(45deg) translate(2px, 7px)" : "" }}
          />
          <span
            className="block w-5 h-0.5 transition-opacity duration-200"
            style={{ background: C.text, opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 transition-transform duration-200"
            style={{ background: C.text, transform: menuOpen ? "rotate(-45deg) translate(2px, -7px)" : "" }}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: `${C.bg}f5` }}>
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-base py-1"
              style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── FOOTER ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-8 text-center" style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
      <p className="text-xs" style={{ color: C.muted, fontFamily: "'JetBrains Mono', monospace" }}>
        © 2026 Ayesha Urooj · Lahore, Pakistan ·{" "}
        <span style={{ color: C.accent }}>uroojayesha107@gmail.com</span>
      </p>
    </footer>
  );
}

// ── ROOT ──────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen" style={{ background: C.bg, fontFamily: "'Inter', sans-serif", color: C.text }}>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
