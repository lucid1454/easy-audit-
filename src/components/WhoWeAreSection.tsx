import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import teamIllustration from "@/assets/team-illustration.jpg";

export const WhoWeAreSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 gradient-soft dark:gradient-soft-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-foreground"
            >
              Who We Are
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                Since 2018, <span className="font-semibold text-foreground">SolidPro Engineering Support Private Limited</span> has leveraged its advanced engineering and software capability heritage to become one of the foremost global engineering design services providers. Our 'Engineering DNA' sets us apart as we have helped our patrons thrive in the face of disruption while setting trends in talent representation by supporting and inspiring youngsters.
              </p>

              <p>
                As technology further shifts the balance of power in favour of talented engineers offering more possibilities for innovation, SolidPro is uniquely positioned to establish exciting opportunities for our employees, clients, and partners around the globe. We actively bring together and promote diverse and young talents to drive exciting changes and reshape the engineering landscapes digitally.
              </p>

              <p>
                Selected by employees as the <span className="font-semibold text-primary">Most Loved Workplace</span>, SolidPro's globally deployed multi-disciplinary and hybrid teams serve customers in more than 4 countries across five continents. We help make the future real for clients and communities around the world. We power engineering and technology trends to expand - businesses, education and health platforms improving people's lives with our innovative engineering and design solutions.
              </p>
            </motion.div>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-soft">
              <img
                src={teamIllustration}
                alt="Professional engineering team collaboration"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
