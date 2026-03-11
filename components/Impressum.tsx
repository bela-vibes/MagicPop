
import React from 'react';
import { X } from 'lucide-react';

interface ImpressumProps {
  onClose: () => void;
}

const Impressum: React.FC<ImpressumProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-off-white dark:bg-magic-dark flex flex-col">
      <div className="flex-1 overflow-y-auto pt-24 md:pt-32 pb-12 animate-in">
        <div className="max-w-4xl mx-auto px-6 relative">
          <header className="mb-16 md:mb-24">
            <h1 className="font-archivo text-5xl md:text-8xl uppercase tracking-tighter leading-none mb-4">
              Impressum
            </h1>
            <p className="font-editorial text-2xl md:text-4xl italic opacity-60">
              Legal Notice
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 text-magic-black dark:text-off-white">
            <section className="space-y-8">
              <div>
                <h2 className="font-archivo text-xs uppercase tracking-widest opacity-30 mb-4">Anschrift</h2>
                <p className="text-xl md:text-2xl font-medium leading-relaxed">
                  Ruf und Lehrnickel GbR<br />
                  handelnd unter dem Namen “MagicPop”<br />
                  Jonasstr. 40<br />
                  12053 Berlin
                </p>
              </div>

              <div>
                <h2 className="font-archivo text-xs uppercase tracking-widest opacity-30 mb-4">Kontakt</h2>
                <p className="text-xl md:text-2xl font-medium leading-relaxed">
                  Telefon: 0152 22052860<br />
                  E-Mail: <a href="mailto:hello@magicpop.berlin" className="hover:text-magic-pink transition-colors underline decoration-magic-pink/30 underline-offset-4">hello@magicpop.berlin</a>
                </p>
              </div>

              <div>
                <h2 className="font-archivo text-xs uppercase tracking-widest opacity-30 mb-4">Vertretungsberechtigte</h2>
                <p className="text-xl md:text-2xl font-medium leading-relaxed">
                  Dennis Ruf und Béla Lehrnickel
                </p>
              </div>
            </section>

            <section className="space-y-12">
              <div>
                <h3 className="font-archivo text-lg uppercase tracking-tight mb-4">Haftungsausschluss (Disclaimer)</h3>
                <p className="text-lg opacity-60 leading-relaxed">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                </p>
              </div>

              <div>
                <h3 className="font-archivo text-lg uppercase tracking-tight mb-4">Streitbeilegung</h3>
                <p className="text-lg opacity-60 leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="hover:text-magic-pink transition-colors underline decoration-magic-pink/30 underline-offset-4">https://ec.europa.eu/consumers/odr</a>
                </p>
                <p className="text-lg opacity-60 leading-relaxed mt-4">
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </div>

              <div>
                <h3 className="font-archivo text-lg uppercase tracking-tight mb-4">Haftung für Links</h3>
                <p className="text-lg opacity-60 leading-relaxed">
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
