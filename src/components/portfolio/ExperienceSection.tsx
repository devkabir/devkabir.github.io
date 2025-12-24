import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const ExperienceSection = () => {
  const { data, isLoading } = usePortfolioData();

  if (isLoading || !data) {
    return null;
  }

  const experiences = data.experience;
  return (
    <section id="experience" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-muted transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.company + exp.period}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 ring-4 ring-background" />

                <div className="md:w-1/2" />

                <Card
                  className={`md:w-1/2 ml-8 md:ml-0 border-none bg-muted/50 hover:bg-muted/80 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 ${
                    exp.current ? "ring-2 ring-primary/20" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                      {exp.current && (
                        <Badge variant="default" className="ml-2 text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xl">{exp.role}</div>
                        <div className="text-sm text-muted-foreground font-normal">
                          {exp.company}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight) => (
                        <Badge
                          key={highlight}
                          variant="outline"
                          className="text-xs"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
