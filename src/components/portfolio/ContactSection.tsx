import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Linkedin, Github, MapPin } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "dev.kabir01@gmail.com",
    href: "mailto:dev.kabir01@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+8801515232588",
    href: "tel:+8801515232588",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://www.linkedin.com/in/dev-kabir",
  },
  {
    icon: Github,
    label: "Portfolio",
    value: "devkabir.github.io",
    href: "https://devkabir.github.io/",
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Ready to start your next WordPress project? Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Card className="border-none bg-background/50 backdrop-blur-sm hover:bg-background hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <link.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {link.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {link.value}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground mb-8">
            <MapPin className="w-4 h-4" />
            <span>Barisal Sadar Upazila, Barisal, Bangladesh</span>
          </div>
        </div>

        <footer className="text-center pt-12 border-t border-border">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Dev Kabir. All rights reserved.
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            Built with passion for clean code and great user experiences.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;
