import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Award, FileCheck, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Ensuring highest standards in all audit processes"
  },
  {
    icon: Award,
    title: "Certified Excellence",
    description: "Industry-recognized compliance certifications"
  },
  {
    icon: FileCheck,
    title: "Documentation",
    description: "Comprehensive audit trail and reporting"
  },
  {
    icon: CheckCircle2,
    title: "Standards Adherence",
    description: "Full compliance with international regulations"
  }
];

export const ISOComplianceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="iso" ref={ref} className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ISO Compliance 1990
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our commitment to ISO standards ensures that every audit validation meets the highest 
            international quality benchmarks. We adhere to rigorous quality control processes, 
            providing you with reliable, accurate, and compliant audit solutions that stand up to 
            global standards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full shadow-card hover:shadow-soft transition-smooth border-border/50 hover:border-primary/20">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
