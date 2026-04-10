
import React from 'react';
import { motion } from 'motion/react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = "" }) => {
  return (
    <section id={id} className={`px-6 md:px-12 min-h-[100dvh] flex flex-col justify-center ${className}`}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="mb-10 md:mb-16"
      >
        <h2 className="font-archivo text-5xl md:text-[10vw] leading-[0.9] uppercase tracking-tighter mb-4 text-inherit">
          {title}
        </h2>
        {subtitle && (
          <p className="font-editorial text-2xl md:text-5xl italic opacity-60">
            {subtitle}
          </p>
        )}
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        className="flex-1"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;
