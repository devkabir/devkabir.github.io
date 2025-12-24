import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const TestimonialsSection = () => {
  const { data, isLoading } = usePortfolioData();

  if (isLoading || !data) {
    return null;
  }

  const testimonials = data.testimonials;
  return (
    <section id="testimonials" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Profile <span className="text-primary">Highlights</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <div className="mt-8 flex items-center justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">150+</div>
              <div className="text-muted-foreground text-sm">Plugins Developed</div>
            </div>
            <div className="h-12 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">38+</div>
              <div className="text-muted-foreground text-sm">Fiverr Projects</div>
            </div>
            <div className="h-12 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">5★</div>
              <div className="text-muted-foreground text-sm">Client Rating</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-none bg-muted/50 hover:bg-muted/80 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <CardContent className="pt-8 relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
                <p className="text-muted-foreground italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
