
import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onManageProducts: () => void;
}

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => changeLanguage('en')}
        disabled={i18n.language === 'en'}
        className={`px-3 py-1 text-sm rounded-md transition ${i18n.language === 'en' ? 'bg-brand-accent text-white' : 'bg-brand-secondary text-brand-primary hover:bg-brand-accent hover:text-white'}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button 
        onClick={() => changeLanguage('ar')}
        disabled={i18n.language === 'ar'}
        className={`px-3 py-1 text-sm rounded-md transition ${i18n.language === 'ar' ? 'bg-brand-accent text-white' : 'bg-brand-secondary text-brand-primary hover:bg-brand-accent hover:text-white'}`}
        aria-label="Switch to Arabic"
      >
        AR
      </button>
    </div>
  );
};


const Header: React.FC<HeaderProps> = ({ onManageProducts }) => {
  const { t } = useTranslation();
  
  return (
    <header className="bg-brand-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <h1 className="text-xl sm:text-2xl font-bold text-brand-secondary">
            {t('header.title')}
          </h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={onManageProducts}
              className="bg-brand-secondary text-brand-primary px-4 py-2 rounded-md hover:bg-brand-accent hover:text-white transition duration-300"
            >
              {t('header.manageProducts')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
