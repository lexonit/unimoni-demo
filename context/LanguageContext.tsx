
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar & Common
    'nav.home': 'Home',
    'nav.beneficiary': 'Beneficiary',
    'nav.transactions': 'Transactions',
    'nav.uploadDocs': 'Upload Docs',
    'nav.locate': 'Locate & Find',
    'nav.moreServices': 'More services',
    'nav.logout': 'Logout',
    'nav.profile': 'My Profile',
    'nav.settings': 'Settings',
    'nav.customerCare': 'CustomerCare No',
    'nav.hi': 'HI',
    
    // Dashboard / Transfer
    'dash.title.amount': 'How would you like to send?',
    'dash.title.recipient': 'Who are you sending to?',
    'dash.chooseService': 'Choose service',
    'dash.service.cash': 'Cash Pick Up',
    'dash.service.bank': 'Bank Transfer',
    'dash.service.wallet': 'Wallet Transfer',
    'dash.amountLabel': 'How much amount would you transfer?',
    'dash.youSend': 'You sent',
    'dash.recipientGets': 'Recipient gets',
    'dash.summary': 'Transfer Summary',
    'dash.next': 'Next Step',
    'dash.back': 'Back',
    'dash.confirm': 'Confirm & Pay',
    
    // Sidebar
    'side.support': 'Support',
    'side.helpCenter': 'Help Center',
  },
  ar: {
    // Navbar & Common
    'nav.home': 'الرئيسية',
    'nav.beneficiary': 'المستفيدون',
    'nav.transactions': 'المعاملات',
    'nav.uploadDocs': 'رفع المستندات',
    'nav.locate': 'المواقع والفروع',
    'nav.moreServices': 'خدمات أخرى',
    'nav.logout': 'تسجيل الخروج',
    'nav.profile': 'ملفي الشخصي',
    'nav.settings': 'الإعدادات',
    'nav.customerCare': 'خدمة العملاء',
    'nav.hi': 'أهلاً',
    
    // Dashboard / Transfer
    'dash.title.amount': 'كيف ترغب في الإرسال؟',
    'dash.title.recipient': 'إلى من ترسل؟',
    'dash.chooseService': 'اختر الخدمة',
    'dash.service.cash': 'استلام نقدي',
    'dash.service.bank': 'تحويل بنكي',
    'dash.service.wallet': 'محفظة رقمية',
    'dash.amountLabel': 'ما هو المبلغ الذي تود تحويله؟',
    'dash.youSend': 'أنت ترسل',
    'dash.recipientGets': 'المستلم يحصل على',
    'dash.summary': 'ملخص التحويل',
    'dash.next': 'الخطوة التالية',
    'dash.back': 'رجوع',
    'dash.confirm': 'تأكيد ودفع',
    
    // Sidebar
    'side.support': 'الدعم',
    'side.helpCenter': 'مركز المساعدة',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('unimoni_lang') as Language) || 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('unimoni_lang', newLang);
  };

  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      <div className={isRTL ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within LanguageProvider');
  return context;
};
