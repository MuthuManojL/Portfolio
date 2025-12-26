import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/Hero/HeroSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BitsAccolade } from "@/bits/BitsAccolade";
import { BitsTiltCard } from "@/bits/BitsTiltCard";
import AchievementsGallery from "@/bits/AchievementsGallery";
import { useTheme } from "@/theme/ThemeProvider";
import { ArrowRight, Zap, Trophy, Microscope } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "Smart Glasses with Speech-to-Text",
    description:
      "Wearable glasses that display real-time transcriptions of speech, enhancing communication for hearing-impaired individuals.",
    technologies: ["Embedded Systems", "ML", "Accessibility"],
    year: "2024-2025",
    icon: Microscope,
  },
  {
    id: 2,
    title: "Non-Invasive Heart Rate Monitor",
    description:
      "Real-time heart rate monitoring with cloud visualization using ThingsBoard and MQTT protocols.",
    technologies: ["IoT", "ThingsBoard", "MQTT"],
    year: "2025",
    icon: Zap,
  },
  {
    id: 3,
    title: "Pill Reminder IoT System",
    description:
      "Smart medication reminder system that improves adherence and reduces missed doses.",
    technologies: ["Proteus", "Simulation"],
    year: "2023",
    icon: Trophy,
  },
];

const SKILLS = [
  {
    category: "IoT & Embedded",
    items: ["Arduino IDE", "Embedded C", "Sensor Integration", "Signal Processing"],
  },
  {
    category: "Languages",
    items: ["C", "Vibe Coding", "Java", "Python"],
  },
  {
    category: "Tools & Platforms",
    items: ["VS Code", "GitHub", "Netlify", "FreeCAD", "KiCad"],
  },
  {
    category: "Core Concepts",
    items: ["IoT Architecture", "Cloud Communication", "Data Visualization", "Medical Devices"],
  },
];

export default function Home() {
  const { tokens } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeEnabled = document.documentElement.classList.contains("dark");
    setIsDarkMode(darkModeEnabled);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection isDarkMode={isDarkMode} />

      {/* Achievements Gallery Section */}
      <section className="relative">
        <AchievementsGallery />
      </section>

      {/* Featured Projects Section */}
      <section
        className={cn(
          "py-20 sm:py-28",
          isDarkMode 
            ? "bg-gradient-to-b from-tech-darker via-tech-dark to-tech-darker" 
            : "bg-gradient-to-b from-slate-50 via-indigo-50/30 to-slate-50"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Showcasing my work in IoT, embedded systems, and healthcare innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {FEATURED_PROJECTS.map((project) => {
              const Icon = project.icon;
              return (
                <BitsTiltCard
                  key={project.id}
                  className="h-full"
                >
                  <div className="relative overflow-hidden rounded-lg border p-6 h-full flex flex-col bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 group cursor-pointer transition-all hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-400">
                    {/* Spotlight effect - Professional blue/indigo for light, cyan for dark */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: isDarkMode 
                          ? 'radial-gradient(circle at center, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0.08) 40%, transparent 70%)'
                          : 'radial-gradient(circle at center, rgba(99, 102, 241, 0.12) 0%, rgba(79, 70, 229, 0.06) 40%, transparent 70%)'
                      }}
                    />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all",
                        isDarkMode 
                          ? "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110"
                          : "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:scale-110"
                      )}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className={cn(
                        "font-bold text-lg mb-2 transition-colors",
                        isDarkMode
                          ? "text-white group-hover:text-cyan-400"
                          : "text-slate-900 group-hover:text-indigo-600"
                      )}>{project.title}</h3>
                      
                      <p className={cn(
                        "text-sm mb-4 flex-grow",
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      )}>{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            className={cn(
                              "text-xs font-medium transition-colors",
                              isDarkMode
                                ? "bg-slate-800 text-slate-300 hover:bg-cyan-900/30 hover:text-cyan-400"
                                : "bg-slate-100 text-slate-700 hover:bg-indigo-100 hover:text-indigo-700"
                            )}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <p className={cn(
                        "text-xs mt-auto font-medium",
                        isDarkMode ? "text-slate-500" : "text-slate-500"
                      )}>{project.year}</p>
                    </div>
                  </div>
                </BitsTiltCard>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/projects">
              <Button className="gap-2">
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={cn(
        "py-20 sm:py-28",
        isDarkMode ? "" : "bg-white"
      )}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Technical proficiency across IoT, embedded systems, and medical device development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((skillGroup) => (
              <div key={skillGroup.category} className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-foreground/70 flex items-center gap-2"
                    >
                      <div
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          isDarkMode ? "bg-neon-cyan" : "bg-accent"
                        )}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accomplishments Section (moved from About) */}
      <section className={cn(
        "py-20 sm:py-28",
        isDarkMode ? "" : "bg-slate-50"
      )}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Accomplishments</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Recognition for research excellence and innovation
            </p>
          </div>

          <div
            className="p-8 md:p-12 rounded-2xl border relative overflow-hidden backdrop-blur-sm"
            style={{
              borderColor: tokens.border,
              background: tokens.gradient_card || tokens.surface,
              boxShadow: tokens.shadow_lg,
            }}
          >
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{ background: tokens.gradient_radial, zIndex: 0 }}
            />

            <div className="relative z-10">
              <BitsAccolade
                accolades={[
                  {
                    id: 1,
                    title: "Best Paper Award",
                    issuer: "NCETBT-25",
                    date: "10/2023",
                    icon: "🏆",
                    description: "Speech Transcription in Smart Glasses",
                    color: tokens.primary,
                  },
                  {
                    id: 2,
                    title: "Published Book Chapter",
                    issuer: "Elsevier (2024)",
                    date: "2024",
                    icon: "📚",
                    description: "Computational Techniques for Breast Cancer Analysis",
                    color: tokens.secondary,
                  },
                  {
                    id: 3,
                    title: "Research Excellence",
                    issuer: "International Conferences",
                    date: "2023-2025",
                    icon: "⚡",
                    description: "Multiple papers presented at international conferences",
                    color: tokens.accent,
                  },
                  {
                    id: 4,
                    title: "Internal Hackathon Winner",
                    issuer: "Dr. N.G.P Institute of Technology",
                    date: "2023",
                    icon: "🚀",
                    description: "AI Leg Concept - Team Pogues",
                    color: tokens.neon_violet,
                  },
                  {
                    id: 5,
                    title: "High Practical Explorer",
                    issuer: "Multiple Industry Internships",
                    date: "2023-2026",
                    icon: "🔬",
                    description: "Hands-on experience across IoT, R&D, and healthcare",
                    color: tokens.neon_cyan,
                  },
                  {
                    id: 6,
                    title: "Leadership Excellence",
                    issuer: "Multiple Organizations",
                    date: "2024-2025",
                    icon: "👥",
                    description: "Led clubs and events as Chairperson and Team Leader",
                    color: tokens.neon_magenta,
                  },
                ]}
                layout="grid"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div
            className={cn(
              "rounded-2xl p-8 sm:p-12 text-center",
              isDarkMode ? "bg-gradient-tech" : "bg-gradient-to-br from-accent/10 to-primary/10"
            )}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
              Interested in collaborating on innovative IoT and healthcare solutions? 
              Let's connect and explore possibilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:muthumanoj100@gmail.com">
                <Button size="lg" className="font-semibold">
                  Get in Touch
                </Button>
              </a>
              <Link to="/resume">
                <Button size="lg" variant="outline" className="font-semibold">
                  Download Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
