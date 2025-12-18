// hooks/useFinance.ts
import { useState, useEffect } from 'react';
import apiClient from '../../services/api-client';

// Types
interface FinancePageData {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  hero_title: string;
  hero_description: string;
  hero_image: string;
  features_title: string;
  features_intro: string;
  show_loan_calculator: boolean;
  show_lease_calculator: boolean;
  show_affordability_calculator: boolean;
  faq_section_title: string;
  offers_section_title: string;
  layout: string;
  features: FinanceFeature[];
}

interface FinanceFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface FinanceOffer {
  id: number;
  title: string;
  short_description: string;
  offer_type: string;
  offer_type_display: string;
  apr_rate: string;
  cashback_amount: string;
  down_payment_percent: string;
  term_months: number;
  valid_from: string;
  valid_until: string;
  featured_image: string;
  display_color: string;
  is_current: boolean;
  days_remaining: number;
}

interface FinanceFAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  category_display: string;
}

interface FinancePartner {
  id: number;
  name: string;
  logo: string;
  logo_url: string;
  description: string;
  min_apr: string;
  max_apr: string;
  apr_range: string;
}

interface FinanceDocument {
  id: number;
  title: string;
  document_type: string;
  document_type_display: string;
  description: string;
  file_url: string;
  file_size: string;
  external_url: string;
  icon: string;
}

// hooks/useFinance.ts - Update the interfaces
interface FinanceCalculator {
  id: number;
  title: string;
  calculator_type: string;
  description: string;
  example_loan_amount: number | string | null;
  example_interest_rate: number | string | null;
  example_term_months: number | string | null;
  example_down_payment: number | string | null;
  example_monthly_payment: number | string | null;
  example_total_interest?: number | string | null;
  example_total_cost?: number | string | null;
}
interface FinanceData {
  page: FinancePageData | null;
  offers: FinanceOffer[];
  faqs: FinanceFAQ[];
  partners: FinancePartner[];
  documents: FinanceDocument[];
  calculators: FinanceCalculator[];
}

interface UseFinanceReturn {
  financeData: FinanceData;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const useFinance = (): UseFinanceReturn => {
  const [financeData, setFinanceData] = useState<FinanceData>({
    page: null,
    offers: [],
    faqs: [],
    partners: [],
    documents: [],
    calculators: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

// hooks/useFinance.ts - Add console logs
const fetchFinanceData = async () => {
  try {
    console.log('🔄 [useFinance] Starting fetch...');
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    
    console.log('📡 [useFinance] Making API calls...');
    const [pageRes, offersRes, faqsRes, partnersRes, documentsRes, calculatorsRes] = await Promise.all([
      apiClient.get('/company/pages/', { 
        params: { slug: 'finance-home' },
        signal: controller.signal 
      }),
      apiClient.get('/company/offers/', { 
        params: { current_only: true },
        signal: controller.signal 
      }),
      apiClient.get('/company/faqs/', { signal: controller.signal }),
      apiClient.get('/company/partners/', { signal: controller.signal }),
      apiClient.get('/company/documents/', { signal: controller.signal }),
      apiClient.get('/company/calculators/', { signal: controller.signal })
    ]);

    console.log('✅ [useFinance] API responses received');
    console.log('📄 Page data:', pageRes.data);
    console.log('🎯 Page found:', pageRes.data?.[0] ? 'YES' : 'NO');
    
    if (pageRes.data?.[0]) {
      console.log('🏷️ Page title:', pageRes.data[0].title);
      console.log('🔗 Page slug:', pageRes.data[0].slug);
      console.log('⭐ Features count:', pageRes.data[0].features?.length || 0);
    }

    const pageData = pageRes.data?.[0] || null;
    
    setFinanceData({
      page: pageData,
      offers: offersRes.data || [],
      faqs: faqsRes.data || [],
      partners: partnersRes.data || [],
      documents: documentsRes.data || [],
      calculators: calculatorsRes.data || []
    });
    
    console.log('🎉 [useFinance] State updated successfully');
    console.log('📊 Data summary:', {
      page: !!pageData,
      offers: offersRes.data?.length || 0,
      faqs: faqsRes.data?.length || 0,
      partners: partnersRes.data?.length || 0,
      documents: documentsRes.data?.length || 0,
      calculators: calculatorsRes.data?.length || 0
    });
    
    setLoading(false);
    
  } catch (err: any) {
    console.error('❌ [useFinance] Error:', err);
    if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
      console.log('⚠️ [useFinance] Request was canceled');
      return;
    }
    
    setError(err?.message || 'Failed to load finance data');
    setLoading(false);
  }
};
  useEffect(() => {
    fetchFinanceData();
  }, []);

  return {
    financeData,
    loading,
    error,
    refresh: fetchFinanceData
  };
};

export default useFinance;