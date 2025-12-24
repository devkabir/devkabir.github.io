import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, LinkedinIcon, Github, MapPin, Download } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { decodeEmail } from "@/utils/emailProtection";

const ContactSection = () => {
  const { data, isLoading } = usePortfolioData();

  if (isLoading || !data) {
    return null;
  }

  const { contact } = data;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Mail":
        return Mail;
      case "Phone":
        return Phone;
      case "Linkedin":
        return LinkedinIcon;
      case "Github":
        return Github;
      case "Download":
        return Download;
      default:
        return Mail;
    }
  };
  return (
    <section id="contact" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {contact.links.map((link) => {
            const IconComponent = getIconComponent(link.icon);
            const isDownload = link.icon === "Download";
            const href = link.encoded ? `mailto:${decodeEmail(link.href)}` : link.href;
            const displayValue = link.encoded ? decodeEmail(link.value) : link.value;

            return (
              <a
                key={link.label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                download={isDownload ? "Dev-Kabir-CV.pdf" : undefined}
              >
                <Card className="border-none bg-background/50 backdrop-blur-sm hover:bg-background hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {displayValue}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground mb-8">
            <MapPin className="w-4 h-4" />
            <span>{contact.location}</span>
          </div>
        </div>

        <footer className="text-center pt-12 border-t border-border">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {contact.footer.copyright}
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            {contact.footer.tagline}
          </p>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;
