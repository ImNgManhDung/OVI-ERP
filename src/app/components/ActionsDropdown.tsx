import { ChevronDown, Grid3x3, Filter, FileText, BarChart3, Download, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface ActionsDropdownProps {
  onColumnsClick?: () => void;
  showColumns?: boolean;
}

export function ActionsDropdown({ onColumnsClick, showColumns = true }: ActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        Actions <ChevronDown className="w-4 h-4 ml-1" />
      </Button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute left-0 top-full mt-1 w-48 bg-white border rounded-md shadow-lg z-20">
            {showColumns && (
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                onClick={() => {
                  onColumnsClick?.();
                  setIsOpen(false);
                }}
              >
                <Grid3x3 className="w-4 h-4" />
                Columns
              </button>
            )}
            
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            
            <div className="relative group">
              <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Data
                </span>
                <ChevronDown className="w-3 h-3 -rotate-90" />
              </button>
              <div className="hidden group-hover:block absolute left-full top-0 ml-1 w-48 bg-white border rounded-md shadow-lg">
                <button className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                  Export Data
                </button>
                <button className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                  Import Data
                </button>
              </div>
            </div>
            
            <div className="relative group">
              <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Format
                </span>
                <ChevronDown className="w-3 h-3 -rotate-90" />
              </button>
              <div className="hidden group-hover:block absolute left-full top-0 ml-1 w-48 bg-white border rounded-md shadow-lg">
                <button className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                  PDF
                </button>
                <button className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                  Excel
                </button>
              </div>
            </div>
            
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
              <FileText className="w-4 h-4" />
              Selection
            </button>
            
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
              <BarChart3 className="w-4 h-4" />
              Chart
            </button>
            
            <div className="relative group">
              <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Report
                </span>
                <ChevronDown className="w-3 h-3 -rotate-90" />
              </button>
              <div className="hidden group-hover:block absolute left-full top-0 ml-1 w-48 bg-white border rounded-md shadow-lg">
                <button className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                  Summary Report
                </button>
                <button className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                  Detail Report
                </button>
              </div>
            </div>
            
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
              <Download className="w-4 h-4" />
              Download
            </button>
            
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
              <HelpCircle className="w-4 h-4" />
              Help
            </button>
          </div>
        </>
      )}
    </div>
  );
}
