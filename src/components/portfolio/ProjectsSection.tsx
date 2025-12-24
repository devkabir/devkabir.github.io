import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Shield, BarChart3, ShoppingCart, Puzzle, Globe, Zap } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const ProjectsSection = () => {
  const { data, isLoading } = usePortfolioData();

  if (isLoading || !data) {
    return null;
  }

  const projects = data.projects;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return Globe;
      case "Shield":
        return Shield;
      case "BarChart3":
        return BarChart3;
      case "ShoppingCart":
        return ShoppingCart;
      case "Puzzle":
        return Puzzle;
      case "Zap":
        return Zap;
      default:
        return Puzzle;
    }
  };
  return (
    <section id="projects" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A selection of plugins and projects that showcase my expertise in WordPress development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const IconComponent = getIconComponent(project.icon);
            return (
              <Card
                key={project.title}
                className={`group border-none bg-background/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                  project.featured ? "ring-1 ring-primary/20" : ""
                }`}
              >
                <CardHeader className="relative">
                  {project.featured && (
                    <Badge className="absolute top-4 right-4 bg-primary/20 text-primary border-none">
                      Featured
                    </Badge>
                  )}
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">
                      {project.stats}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
