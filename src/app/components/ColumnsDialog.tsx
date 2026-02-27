import { useState, useEffect } from 'react';
import { X, ChevronUp, ChevronDown, Menu, Grid3x3 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

interface ColumnConfig {
  id: string;
  label: string;
  displayed: boolean;
}

interface ColumnsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: ColumnConfig[];
  onSave: (columns: ColumnConfig[]) => void;
}

export function ColumnsDialog({ open, onOpenChange, columns, onSave }: ColumnsDialogProps) {
  const [localColumns, setLocalColumns] = useState<ColumnConfig[]>(columns);
  const [selectedColumn, setSelectedColumn] = useState<ColumnConfig | null>(null);
  const [columnName, setColumnName] = useState('');
  const [minWidth, setMinWidth] = useState('50');

  useEffect(() => {
    setLocalColumns(columns);
  }, [columns, open]);

  useEffect(() => {
    if (selectedColumn) {
      setColumnName(selectedColumn.label);
    }
  }, [selectedColumn]);

  const handleToggle = (id: string) => {
    setLocalColumns(prev =>
      prev.map(col => col.id === id ? { ...col, displayed: !col.displayed } : col)
    );
  };

  const handleSave = () => {
    onSave(localColumns);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setLocalColumns(columns);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={handleCancel}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl w-[580px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="text-base font-semibold">Columns</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[400px]">
          {/* Left Panel - Column List */}
          <div className="w-[250px] border-r flex flex-col">
            {/* Tabs */}
            <div className="flex border-b">
              <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50">
                Displayed
              </button>
              <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Column
              </button>
            </div>

            {/* Column List */}
            <div className="flex-1 overflow-y-auto">
              {localColumns.map((col) => (
                <div
                  key={col.id}
                  className={`flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer ${
                    selectedColumn?.id === col.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedColumn(col)}
                >
                  <Checkbox
                    checked={col.displayed}
                    onCheckedChange={() => handleToggle(col.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-sm text-gray-700">{col.label}</span>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="border-t p-2 flex gap-1">
              <button className="p-1 hover:bg-gray-100 rounded" title="Move up">
                <ChevronUp className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded" title="Move down">
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded ml-auto" title="More options">
                <Menu className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded" title="Grid view">
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Panel - Column Details */}
          <div className="flex-1 p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Column
                </label>
                <Input
                  value={columnName}
                  onChange={(e) => setColumnName(e.target.value)}
                  className="w-full"
                  disabled={!selectedColumn}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Column Width (Pixel)
                </label>
                <Input
                  type="number"
                  value={minWidth}
                  onChange={(e) => setMinWidth(e.target.value)}
                  className="w-full"
                  disabled={!selectedColumn}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-3 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
