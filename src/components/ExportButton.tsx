import { useState } from 'react';
import { FaDownload, FaFileCsv, FaFileCode } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface ExportButtonProps {
  onExportCSV: () => void;
  onExportJSON: () => void;
  disabled?: boolean;
}

export const ExportButton = ({ onExportCSV, onExportJSON, disabled = false }: ExportButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
          disabled
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-700 hover:bg-gray-600 text-white'
        }`}
        aria-label="Export data"
      >
        <FaDownload />
        <span className="hidden sm:inline">{t('header.export')}</span>
      </button>

      {isOpen && !disabled && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-50">
            <button
              onClick={() => {
                onExportCSV();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center gap-3 text-white"
            >
              <FaFileCsv className="text-green-400" />
              <span>CSV</span>
            </button>
            <button
              onClick={() => {
                onExportJSON();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center gap-3 text-white"
            >
              <FaFileCode className="text-blue-400" />
              <span>JSON</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
