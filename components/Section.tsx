
import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = "" }) => {
  return (
    <section id={id} className={`py-16 md:py-24 px-6 md:px-12 min-h-screen flex flex-col justify-center ${className}`}>
      <div className="mb-10 md:mb-16">
        <h2 className="font-archivo text-5xl md:text-[10vw] leading-[0.9] uppercase tracking-tighter mb-4 text-inherit">
          {title}
        </h2>
        {subtitle && (
          <p className="font-editorial text-2xl md:text-5xl italic opacity-60">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex-1">
        {children}
      </div>
    </section>
  );
};

export default Section;
