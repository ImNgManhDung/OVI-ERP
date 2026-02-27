import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

interface OffsetDoc {
  id: number;
  docNumber: string;
  docDate: string;
  partner: string;
  amount: number;
  remaining: number;
  type: string;
}

interface OffsetModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'sales' | 'purchase';
}

export default function OffsetModal({ isOpen, onClose, type }: OffsetModalProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedDocs, setSelectedDocs] = useState<number[]>([]);

  const docs: OffsetDoc[] = type === 'sales' 
    ? [
        { id: 1, docNumber: 'CM-001', docDate: '2026-02-01', partner: 'Customer A', amount: -5000000, remaining: -5000000, type: 'Credit Memo' },
        { id: 2, docNumber: 'PAY-102', docDate: '2026-02-03', partner: 'Customer A', amount: 10000000, remaining: 10000000, type: 'Customer Payment' },
      ]
    : [
        { id: 1, docNumber: 'DM-001', docDate: '2026-02-01', partner: 'Supplier X', amount: -2000000, remaining: -2000000, type: 'Debit Memo' },
        { id: 2, docNumber: 'VOU-505', docDate: '2026-02-02', partner: 'Supplier X', amount: 15000000, remaining: 15000000, type: 'Vendor Payment' },
      ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-[900px] max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold uppercase text-emerald-800">Offset / Debt Clearing</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 border-b bg-gray-50 flex gap-4 items-center">
          <div className="text-sm font-medium text-gray-700">Partner: <span className="text-blue-700">{type === 'sales' ? 'Customer A' : 'Supplier X'}</span></div>
          <div className="h-4 w-[1px] bg-gray-300 mx-2"></div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search credit notes, payments..." 
              className="pl-10 h-10 bg-white"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-10">Search</Button>
        </div>

        <div className="flex-1 overflow-auto p-0">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white border-b z-10">
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left w-12">
                  <Checkbox />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Doc Type</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Doc Number</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Date</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Total Amount</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Avail. for Offset</th>
              </tr>
            </thead>
            <tbody>
              {docs.map(doc => (
                <tr key={doc.id} className="border-b hover:bg-emerald-50 cursor-pointer transition-colors">
                  <td className="px-4 py-3">
                    <Checkbox 
                      checked={selectedDocs.includes(doc.id)}
                      onCheckedChange={() => {
                        setSelectedDocs(prev => prev.includes(doc.id) ? prev.filter(id => id !== doc.id) : [...prev, id])
                      }}
                    />
                  </td>
                  <td className="px-4 py-3">{doc.type}</td>
                  <td className="px-4 py-3 font-medium text-emerald-700">{doc.docNumber}</td>
                  <td className="px-4 py-3">{doc.docDate}</td>
                  <td className="px-4 py-3 text-right">{doc.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-blue-600 font-medium">{doc.remaining.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t flex justify-between items-center bg-gray-50">
          <div>
            <span className="text-sm text-gray-500 mr-4">Selected: {selectedDocs.length} items</span>
            <span className="text-sm font-semibold text-emerald-700">Total Offset: 0.00</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button className="bg-emerald-700 hover:bg-emerald-800" onClick={onClose}>Apply Offset</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
