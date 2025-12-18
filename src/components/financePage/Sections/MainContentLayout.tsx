// pages/finance/components/MainContentLayout.tsx
import React from 'react';
import FinancePartners from '../FinancePartners';
import FinanceDocuments from '../FinanceDocuments';
import FinanceFAQs from '../FinanceFAQs';
import HelpSection from './HelpSection';

interface MainContentLayoutProps {
  partners: any[];
  documents: any[];
  faqs: any[];
  faqTitle?: string;
  isDarkMode: boolean;
}

const MainContentLayout: React.FC<MainContentLayoutProps> = ({
  partners,
  documents,
  faqs,
  faqTitle,
  isDarkMode
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
      <div className="lg:col-span-2 space-y-8">
        <FinancePartners 
          partners={partners}
          isDarkMode={isDarkMode}
        />
      </div>

      <div className="space-y-8">
        <FinanceDocuments 
          documents={documents}
          isDarkMode={isDarkMode}
        />

        <FinanceFAQs 
          title={faqTitle || "Frequently Asked Questions"}
          faqs={faqs.slice(0, 5)}
          isDarkMode={isDarkMode}
          showViewAll={faqs.length > 5}
        />

        <HelpSection isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default MainContentLayout;