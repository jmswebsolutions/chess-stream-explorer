import { useState } from 'react';
import { FaDownload, FaFileCsv, FaFileCode, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface ExportButtonProps {
  onExportCSV: () => void;
  onExportJSON: () => void;
  onExportExcel?: () => void;
  onExportPDF?: () => void;
  disabled?: boolean;
}

export const ExportButton = ({ onExportCSV, onExportJSON, onExportExcel, onExportPDF, disabled = false }: ExportButtonProps) => {
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
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaDownload aria-hidden="true" />
        <span className="hidden sm:inline">{t('header.export')}</span>
      </button>

      {isOpen && !disabled && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div 
            className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-50"
            role="menu"
            aria-label="Export format options"
          >
            <button
              onClick={() => {
                onExportCSV();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center gap-3 text-white"
              role="menuitem"
              aria-label="Export as CSV"
            >
              <FaFileCsv className="text-green-400" aria-hidden="true" />
              <span>CSV</span>
            </button>
            <button
              onClick={() => {
                onExportJSON();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center gap-3 text-white"
              role="menuitem"
              aria-label="Export as JSON"
            >
              <FaFileCode className="text-blue-400" aria-hidden="true" />
              <span>JSON</span>
            </button>
            {onExportExcel && (
              <button
                onClick={() => {
                  onExportExcel();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center gap-3 text-white"
                role="menuitem"
                aria-label="Export as Excel"
              >
                <FaFileExcel className="text-green-600" aria-hidden="true" />
                <span>Excel</span>
              </button>
            )}
            {onExportPDF && (
              <button
                onClick={() => {
                  onExportPDF();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center gap-3 text-white"
                role="menuitem"
                aria-label="Export as PDF"
              >
                <FaFilePdf className="text-red-500" aria-hidden="true" />
                <span>PDF</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
