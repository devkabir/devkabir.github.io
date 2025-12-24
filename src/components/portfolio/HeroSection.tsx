import { Linkedin, Mail, ChevronDown, Globe, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { decodeEmail, getMailtoLink } from "@/utils/emailProtection";

const HeroSection = () => {
  const { data, isLoading } = usePortfolioData();

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
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
        return Linkedin;
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
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {hero.name.lastName}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto">
          {hero.tagline}{" "}
          <span className="text-primary font-semibold">{hero.highlight}</span>
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
