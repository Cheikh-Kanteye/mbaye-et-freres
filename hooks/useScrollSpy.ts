import { useState, useEffect } from "react";

const useScrollSpy = (sections: string[], homeHref: string) => {
  const [activeSection, setActiveSection] = useState<string | null>(homeHref);

  useEffect(() => {
    const handleScroll = () => {
      let foundSection = homeHref; // Default to home section
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            foundSection = `#${sectionId}`;
            break;
          }
        }
      }
      setActiveSection(foundSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections, homeHref]);

  return activeSection;
};

export default useScrollSpy;
