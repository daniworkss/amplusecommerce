import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react'; // optional icon
export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-black cursor-pointer text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all z-50"
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>
    )
  );
}
