import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Puzzle, Star } from "lucide-react";

const skills = [
  "PHP",
  "JavaScript",
  "HTML",
  "CSS",
  "MySQL",
  "WordPress",
  "CORS",
  "Google Analytics",
  "REST APIs",
  "Vue.js",
  "React",
  "WooCommerce",
  "Laravel",
];

const stats = [
  { icon: Puzzle, value: "150+", label: "Plugins Built" },
  { icon: Code2, value: "38+", label: "Fiverr Projects" },
  { icon: Star, value: "5★", label: "Client Rating" },
];

const AboutSection = () => {
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
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hi there! I'm{" "}
              <span className="text-foreground font-semibold">Dev Kabir</span>,
              a WordPress plugin developer with 4+ years of experience. I've
              built over{" "}
              <span className="text-primary font-semibold">150 plugins</span>{" "}
              that help websites work better and automate tasks for users and
              businesses.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I work with PHP, JavaScript, HTML, CSS, MySQL, and the WordPress
              ecosystem, and I build WooCommerce integrations and REST APIs.
              On Fiverr, I've completed{" "}
              <span className="text-primary font-semibold">38+ projects</span>{" "}
              with a{" "}
              <span className="text-primary font-semibold">5-star rating</span>.
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {skills.map((skill) => (
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
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="border-none bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="flex items-center gap-6 p-6">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
