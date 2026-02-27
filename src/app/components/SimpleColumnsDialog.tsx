import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

interface Column {
  key: string;
  label: string;
}

interface SimpleColumnsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: Column[];
  visibleColumns: { [key: string]: boolean };
  onVisibleColumnsChange: (visibleColumns: { [key: string]: boolean }) => void;
}

export function SimpleColumnsDialog({
  open,
  onOpenChange,
  columns,
  visibleColumns,
  onVisibleColumnsChange,
}: SimpleColumnsDialogProps) {
  const handleToggle = (key: string) => {
    onVisibleColumnsChange({
      ...visibleColumns,
      [key]: !visibleColumns[key],
    });
  };

  const handleSave = () => {
    onOpenChange(false);
  };

  const handleCancel = () => {
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
      <div className="relative bg-white rounded-lg shadow-xl w-[480px] max-h-[90vh] flex flex-col">
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
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {columns.map((col) => (
              <div
                key={col.key}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => handleToggle(col.key)}
              >
                <Checkbox
                  checked={visibleColumns[col.key]}
                  onCheckedChange={() => handleToggle(col.key)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="text-sm text-gray-700">{col.label}</span>
              </div>
            ))}
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