import { useState } from 'react';
import { Search, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';

interface InvoiceRow {
  id: number;
  expenseType: string;
  description: string;
  objId: string;
  objName: string;
  costCenter: string;
  projects: string;
  costElement: string;
}

interface InvoiceSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectInvoices?: (invoices: InvoiceRow[]) => void;
}

// Mock invoice data
const mockInvoices: InvoiceRow[] = [
  {
    id: 1,
    expenseType: 'Đi lại',
    description: 'Vé máy bay HN - SGN',
    objId: 'OBJ-001',
    objName: 'Nguyễn Văn A',
    costCenter: 'CC-001',
    projects: 'PRJ-2026-001',
    costElement: 'CE-Travel',
  },
  {
    id: 2,
    expenseType: 'Ở',
    description: 'Khách sạn 3 ngày',
    objId: 'OBJ-002',
    objName: 'Trần Thị B',
    costCenter: 'CC-002',
    projects: 'PRJ-2026-002',
    costElement: 'CE-Accommodation',
  },
  {
    id: 3,
    expenseType: 'Ăn',
    description: 'Tiếp khách đối tác',
    objId: 'OBJ-003',
    objName: 'Lê Văn C',
    costCenter: 'CC-001',
    projects: 'PRJ-2026-003',
    costElement: 'CE-Meals',
  },
  {
    id: 4,
    expenseType: 'Đi lại',
    description: 'Taxi đi công tác',
    objId: 'OBJ-004',
    objName: 'Phạm Thị D',
    costCenter: 'CC-003',
    projects: 'PRJ-2026-001',
    costElement: 'CE-Travel',
  },
  {
    id: 5,
    expenseType: 'Mặc',
    description: 'Đồng phục nhân viên',
    objId: 'OBJ-005',
    objName: 'Hoàng Văn E',
    costCenter: 'CC-002',
    projects: 'PRJ-2026-004',
    costElement: 'CE-Uniform',
  },
];

export function InvoiceSelectionDialog({
  open,
  onOpenChange,
  onSelectInvoices,
}: InvoiceSelectionDialogProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);

  const toggleInvoiceSelection = (id: number) => {
    setSelectedInvoices(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAllInvoices = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map(inv => inv.id));
    }
  };

  const handleConfirm = () => {
    const selected = mockInvoices.filter(inv => selectedInvoices.includes(inv.id));
    onSelectInvoices?.(selected);
    onOpenChange(false);
    setSelectedInvoices([]);
    setSearchText('');
  };

  const handleCancel = () => {
    onOpenChange(false);
    setSelectedInvoices([]);
    setSearchText('');
  };

  const filteredInvoices = mockInvoices.filter(invoice =>
    searchText === '' ||
    Object.values(invoice).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Select Invoices</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search All Text Columns"
              className="w-64 h-9"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button variant="outline" size="sm" className="h-9">Go</Button>
          </div>

          {/* Invoice Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-3 py-2 text-left w-12">
                      <Checkbox
                        checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                        onCheckedChange={toggleAllInvoices}
                      />
                    </th>
                    <th className="px-3 py-2 text-left text-blue-700 font-semibold">EXPENSE TYPE</th>
                    <th className="px-3 py-2 text-left text-blue-700 font-semibold">DESCRIPTION</th>
                    <th className="px-3 py-2 text-left text-blue-700 font-semibold">OBJ ID</th>
                    <th className="px-3 py-2 text-left text-blue-700 font-semibold">OBJ NAME</th>
                    <th className="px-3 py-2 text-left text-blue-700 font-semibold">COST CENTER</th>
                    <th className="px-3 py-2 text-left text-blue-700 font-semibold">PROJECTS</th>
                    <th className="px-3 py-2 text-left text-blue-700 font-semibold">COST ELEMENT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-16 h-16 opacity-20" />
                          <span className="text-base">No invoices found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <Checkbox
                            checked={selectedInvoices.includes(invoice.id)}
                            onCheckedChange={() => toggleInvoiceSelection(invoice.id)}
                          />
                        </td>
                        <td className="px-3 py-2">{invoice.expenseType}</td>
                        <td className="px-3 py-2">{invoice.description}</td>
                        <td className="px-3 py-2">{invoice.objId}</td>
                        <td className="px-3 py-2">{invoice.objName}</td>
                        <td className="px-3 py-2">{invoice.costCenter}</td>
                        <td className="px-3 py-2">{invoice.projects}</td>
                        <td className="px-3 py-2">{invoice.costElement}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={selectedInvoices.length === 0}
            >
              Confirm ({selectedInvoices.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}