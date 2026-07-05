"use client";

import { useEffect, useState } from "react";

type CaseStudy = {
  title: string;
  role: string;
  text: string;
  note?: string;
  numbers: string[];
};

type ProjectSliderProps = {
  cases: CaseStudy[];
};

export default function ProjectSlider({ cases }: ProjectSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCase = cases[activeIndex];

  useEffect(() => {
    if (cases.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index === cases.length - 1 ? 0 : index + 1));
    }, 4600);

    return () => window.clearInterval(interval);
  }, [cases.length]);

  if (!activeCase) {
    return null;
  }

  return (
    <div className="wrap project-slider" aria-label="Case study">
      <article className="project-panel" key={activeCase.title} aria-live="polite">
        <div className="project-media">
          <strong>{activeCase.title}</strong>
          <small>Foto progetto in arrivo</small>
        </div>
        <div className="project-info">
          <p className="case-role">{activeCase.role}</p>
          <h3>{activeCase.title}</h3>
          <p>{activeCase.text}</p>
          <ul>
            {activeCase.numbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
          {activeCase.note ? <small>{activeCase.note}</small> : null}
        </div>
      </article>

      <div className="project-dots" aria-hidden="true">
        {cases.map((item, index) => (
          <span
            className={index === activeIndex ? "active" : ""}
            key={item.title}
          />
        ))}
      </div>
    </div>
  );
}
