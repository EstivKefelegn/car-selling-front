// components/finance/FinanceDocuments.tsx
import React from 'react';

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

interface FinanceDocumentsProps {
  documents: FinanceDocument[];
  isDarkMode: boolean;
}

const FinanceDocuments: React.FC<FinanceDocumentsProps> = ({
  documents,
  isDarkMode
}) => {
  if (!documents || documents.length === 0) return null;

  const getDocumentIcon = (icon: string) => {
    if (icon.startsWith('http')) return icon;
    return icon || 'fas fa-file-alt';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      required: 'bg-red-500',
      helpful: 'bg-blue-500',
      form: 'bg-green-500',
      guide: 'bg-purple-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className={`rounded-2xl p-6 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
    }`}>
      <h2 className="text-2xl font-bold mb-6">Documents & Forms</h2>
      
      <div className="space-y-4">
        {documents.map((doc) => (
          <a
            key={doc.id}
            href={doc.file_url || doc.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center p-4 rounded-lg transition-all hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-gray-800/50 hover:bg-gray-700/50' 
                : 'bg-white hover:bg-gray-100'
            } shadow-sm hover:shadow-md group`}
          >
            <div className="flex-shrink-0 mr-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                {getDocumentIcon(doc.icon).startsWith('fas') ? (
                  <i className={`${getDocumentIcon(doc.icon)} text-xl text-blue-500`}></i>
                ) : (
                  <img src={getDocumentIcon(doc.icon)} alt="" className="w-6 h-6" />
                )}
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold group-hover:text-blue-500 transition-colors">
                  {doc.title}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full text-white ${getTypeColor(doc.document_type)}`}>
                  {doc.document_type_display}
                </span>
              </div>
              
              <p className="text-sm opacity-70 mt-1 line-clamp-1">
                {doc.description}
              </p>
              
              <div className="flex items-center mt-2 text-xs opacity-60">
                {doc.file_size && (
                  <span className="mr-4">
                    <i className="fas fa-file mr-1"></i>
                    {doc.file_size}
                  </span>
                )}
                <span>
                  <i className="fas fa-download mr-1"></i>
                  Download
                </span>
              </div>
            </div>
            
            <div className="flex-shrink-0 ml-2">
              <svg className="w-5 h-5 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FinanceDocuments;