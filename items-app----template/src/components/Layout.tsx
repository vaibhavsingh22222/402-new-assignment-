import React, { type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Container: React.FC<LayoutProps> = ({ children, className = "" }) => (
  <div className={`max-w-9xl mx-auto px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

interface SectionProps extends LayoutProps {}

export const Section: React.FC<SectionProps> = ({
  children,
  className = ""
}) => (
  <section className={`py-20 md:py-32 ${className}`}>
    {children}
  </section>
);