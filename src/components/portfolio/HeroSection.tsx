import { Mail, ChevronDown, Globe, Download, LinkedinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { getMailtoLink } from "@/utils/emailProtection";

const HeroSection = () => {
  const { data, isLoading } = usePortfolioData();

  const scrollToProjects = () => {
    const target = document.getElementById("projects");
    if (!target) return;

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    const distance = targetY - startY;
    const duration = 700;
    let startTime: number | null = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if (isLoading || !data) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </section>
    );
  }

  const { hero } = data;

  const getIconComponent = (type: string) => {
    switch (type) {
      case "linkedin":
        return LinkedinIcon;
      case "portfolio":
        return Globe;
      case "cv":
        return Download;
      case "email":
        return Mail;
      default:
        return Mail;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--muted)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            {hero.badge}
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
          <span className="text-foreground">{hero.name.firstName}</span>{" "}
          <span className="bg-gradient-to-r from-slate-900 via-indigo-500 to-cyan-400 dark:from-indigo-300 dark:via-sky-400 dark:to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_8px_24px_rgba(56,189,248,0.25)] dark:drop-shadow-[0_10px_26px_rgba(59,130,246,0.25)]">
            {hero.name.lastName}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in max-w-3xl mx-auto">
          {hero.tagline}
        </p>
        <p className="max-w-2xl mx-auto mb-6">
          <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/60 px-4 py-1 text-sm md:text-base font-medium text-muted-foreground">
            {hero.highlight}
          </span>
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
          {hero.socialLinks.map((link) => {
            const IconComponent = getIconComponent(link.type);
            const isPrimary = link.type === "email";
            const isDownload = link.type === "cv";
            const href = link.encoded ? getMailtoLink(link.url) : link.url;

            return (
              <a
                key={link.type}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                download={isDownload ? "Dev-Kabir-CV.pdf" : undefined}
              >
                <Button
                  variant={isPrimary ? "default" : "outline"}
                  size="lg"
                  className={isPrimary ? "gap-2" : "gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"}
                >
                  <IconComponent className="w-5 h-5" />
                  {link.label}
                </Button>
              </a>
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="lg"
          onClick={scrollToProjects}
          className="animate-bounce mt-8"
        >
          <ChevronDown className="w-6 h-6" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
