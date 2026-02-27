import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';

interface CreateAssetBookProps {
  onClose: () => void;
}

interface DetailRow {
  id: number;
  sip: number;
  categoryCode: string;
  deprMethod: string;
  usefulLife: number | string;
  salvageRate: number | string;
  deprRate: number | string;
}

const DEPR_METHODS = [
  { value: 'STRAIGHT_LINE', label: 'STRAIGHT LINE' },
  { value: 'DECLINING_BALANCE', label: 'DECLINING BALANCE' },
  { value: 'UNITS_OF_PRODUCTION', label: 'UNITS OF PRODUCTION' },
  { value: 'SUM_OF_YEARS', label: 'SUM OF YEARS' },
];

const MOCK_CATEGORIES = [
  { code: 'TS-MMTB', name: 'Máy móc thiết bị' },
  { code: 'TS-NVGP', name: 'Nhà và vật kiến trúc' },
  { code: 'TS-PTVT', name: 'Phương tiện vận tải' },
  { code: 'TS-CNTT', name: 'Công nghệ thông tin' },
];

export default function CreateAssetBook({ onClose }: CreateAssetBookProps) {
  const [detailRows, setDetailRows] = useState<DetailRow[]>([
    {
      id: 1,
      sip: 1,
      categoryCode: 'TS-MMTB',
      deprMethod: 'STRAIGHT_LINE',
      usefulLife: 10,
      salvageRate: 5,
      deprRate: 10
    }
  ]);

  const [selectedDetails, setSelectedDetails] = useState<number[]>([]);

  const handleAddDetailRow = () => {
    const newRow: DetailRow = {
      id: detailRows.length + 1,
      sip: detailRows.length + 1,
      categoryCode: '',
      deprMethod: 'STRAIGHT_LINE',
      usefulLife: '',
      salvageRate: '',
      deprRate: ''
    };
    setDetailRows([...detailRows, newRow]);
  };

  const handleDeleteDetailRows = () => {
    setDetailRows(detailRows.filter(row => !selectedDetails.includes(row.id)));
    setSelectedDetails([]);
  };

  const toggleDetailSelection = (id: number) => {
    setSelectedDetails(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-x-auto">
      <div className="bg-white rounded-lg shadow-sm" style={{ width: '1600px' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg">CREATE ASSET BOOK</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* MAIN INFO - 3 ROWS x 3 COLS */}
          <div className="border rounded-lg p-4 bg-white mb-6">
            <h3 className="text-sm font-medium mb-4 pb-2 border-b text-gray-700">MAIN INFORMATION</h3>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              
              {/* Row 1 */}
              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> ABO ID
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="Auto generate" readOnly />
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> BOOK CODE
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="BOOK-ACC" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> BOOK TYPE
                </Label>
                <Select>
                  <SelectTrigger className="bg-pink-50 h-10">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACCOUNTING">ACCOUNTING</SelectItem>
                    <SelectItem value="TAX">TAX</SelectItem>
                    <SelectItem value="MANAGEMENT">MANAGEMENT</SelectItem>
                    <SelectItem value="STATISTICAL">STATISTICAL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row 2 */}
              <div className="col-span-2">
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> BOOK NAME
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="Sổ kế toán" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">CURRENCY</Label>
                <Select defaultValue="VND">
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VND">VND</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row 3 */}
              <div>
                <Label className="text-sm mb-1 block">DEFAULT DEPR METHOD</Label>
                <Select defaultValue="STRAIGHT_LINE">
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPR_METHODS.map(method => (
                      <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-1 block">LEGAL ENTITY</Label>
                <Select defaultValue="LE001">
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LE001">CÔNG TY TNHH ABC</SelectItem>
                    <SelectItem value="LE002">CHI NHÁNH HÀ NỘI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-1 block">DESCRIPTION</Label>
                <Input className="h-10" placeholder="Ghi chú về sổ tài sản" />
              </div>

            </div>
          </div>

          {/* DETAILS TABLE - Category Depreciation Rules */}
          <div className="border rounded-lg bg-white">
            <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">CATEGORY DEPRECIATION RULES</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleAddDetailRow}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Row
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDeleteDetailRows}
                  disabled={selectedDetails.length === 0}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 500px)' }}>
              <table className="w-full text-sm">
                <thead className="bg-blue-50 border-b sticky top-0 z-10">
                  <tr>
                    <th className="px-3 py-3 text-left w-12 border-r">
                      <Checkbox 
                        checked={selectedDetails.length === detailRows.length && detailRows.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) setSelectedDetails(detailRows.map(r => r.id));
                          else setSelectedDetails([]);
                        }}
                      />
                    </th>
                    <th className="px-3 py-3 text-center text-blue-700 font-bold border-r w-16">SIP</th>
                    <th className="px-3 py-3 text-left text-blue-700 font-bold border-r w-64">CATEGORY CODE</th>
                    <th className="px-3 py-3 text-left text-blue-700 font-bold border-r w-64">DEPR METHOD</th>
                    <th className="px-3 py-3 text-right text-blue-700 font-bold border-r w-32">USEFUL LIFE</th>
                    <th className="px-3 py-3 text-right text-blue-700 font-bold border-r w-32">SALVAGE RATE %</th>
                    <th className="px-3 py-3 text-right text-blue-700 font-bold w-32">DEPR RATE %</th>
                  </tr>
                </thead>
                <tbody>
                  {detailRows.map((row) => (
                    <tr key={row.id} className="border-b hover:bg-blue-50/30">
                      <td className="px-3 py-2 border-r">
                        <Checkbox
                          checked={selectedDetails.includes(row.id)}
                          onCheckedChange={() => toggleDetailSelection(row.id)}
                        />
                      </td>
                      <td className="px-3 py-2 text-center border-r text-gray-600">{row.sip}</td>
                      <td className="px-3 py-2 border-r">
                        <Select value={row.categoryCode} onValueChange={(val) => {}}>
                          <SelectTrigger className="h-8 border-gray-200">
                            <SelectValue placeholder="Select category..." />
                          </SelectTrigger>
                          <SelectContent>
                            {MOCK_CATEGORIES.map(cat => (
                              <SelectItem key={cat.code} value={cat.code}>{cat.code} - {cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2 border-r">
                        <Select value={row.deprMethod} onValueChange={(val) => {}}>
                          <SelectTrigger className="h-8 border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {DEPR_METHODS.map(method => (
                              <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2 border-r">
                        <Input 
                          type="number" 
                          value={row.usefulLife} 
                          className="h-8 text-right border-gray-200" 
                          placeholder="Years"
                        />
                      </td>
                      <td className="px-3 py-2 border-r">
                        <Input 
                          type="number" 
                          value={row.salvageRate} 
                          className="h-8 text-right border-gray-200" 
                          placeholder="%"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Input 
                          type="number" 
                          value={row.deprRate} 
                          className="h-8 text-right border-gray-200" 
                          placeholder="%"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
