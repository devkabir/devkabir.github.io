import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Puzzle, Star } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const AboutSection = () => {
  const { data, isLoading } = usePortfolioData();

  if (isLoading || !data) {
    return null;
  }

  const { about } = data;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Puzzle":
        return Puzzle;
      case "Code2":
        return Code2;
      case "Star":
        return Star;
      default:
        return Puzzle;
    }
  };

  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {about.introduction.map((paragraph, index) => (
              <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 pt-4">
              {about.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {about.stats.map((stat, index) => {
              const IconComponent = getIconComponent(stat.icon);
              return (
                <Card
                  key={stat.label}
                  className="border-none bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="flex items-center gap-6 p-6">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
