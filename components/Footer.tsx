
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 text-center py-4 shadow-inner">
      <div className="container mx-auto px-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Powered by React, Tailwind CSS, and FathurDev API.
        </p>
         <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
          This is a conceptual app and is not affiliated with any official streaming service.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
