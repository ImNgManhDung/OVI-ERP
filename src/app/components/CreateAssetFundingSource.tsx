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

interface CreateAssetFundingSourceProps {
  onClose: () => void;
}

interface DetailRow {
  id: number;
  sip: number;
  asoId: string;
  assId: string;
  atrId: string;
  afsId: string;
  currencyCode: string;
  accAmount: number | string;
  percentage: number | string;
  offsetAccId: string;
  sourceDocType: string;
  sourceDocId: string;
  sourceDocNumber: string;
  projectId: string;
  budgetItemId: string;
}

const MOCK_ASSETS = [
  { id: 'ASS-001', name: 'Máy tính để bàn HP ProDesk' },
  { id: 'ASS-002', name: 'Máy in Canon MF244DW' },
  { id: 'ASS-003', name: 'Xe tải Hyundai HD120SL' },
  { id: 'ASS-004', name: 'Máy photocopy Ricoh MP 3055' },
];

const MOCK_ASSET_TRANSACTIONS = [
  { id: 'ATR-001', code: 'ADD0124-0001', type: 'ADDITION' },
  { id: 'ATR-002', code: 'ADJ0224-0001', type: 'ADJUSTMENT' },
  { id: 'ATR-003', code: 'TRA0324-0001', type: 'TRANSFER' },
];

const MOCK_FUNDING_SOURCES = [
  { id: 'AFS-001', name: 'Vốn chủ sở hữu' },
  { id: 'AFS-002', name: 'Vay ngân hàng' },
  { id: 'AFS-003', name: 'Ngân sách nhà nước' },
  { id: 'AFS-004', name: 'Viện trợ quốc tế' },
  { id: 'AFS-005', name: 'Thuê tài chính' },
];

const MOCK_PROJECTS = [
  { id: 'PROJ-001', name: 'Dự án A' },
  { id: 'PROJ-002', name: 'Dự án B' },
  { id: 'PROJ-003', name: 'Dự án C' },
];

const MOCK_BUDGET_ITEMS = [
  { id: 'BUD-001', name: 'Mua sắm TSCĐ' },
  { id: 'BUD-002', name: 'Nâng cấp thiết bị' },
  { id: 'BUD-003', name: 'Đầu tư XDCB' },
];

const OFFSET_ACCOUNTS = [
  { id: '111', name: 'Tiền mặt' },
  { id: '112', name: 'Tiền gửi ngân hàng' },
  { id: '331', name: 'Phải trả người bán' },
  { id: '338', name: 'Phải trả khác' },
  { id: '241', name: 'XDCB dở dang' },
  { id: '411', name: 'Vốn đầu tư của chủ sở hữu' },
];

const SOURCE_DOC_TYPES = [
  { value: 'INVOICE', label: 'INVOICE (Hóa đơn)' },
  { value: 'ISSUES', label: 'ISSUES (Xuất kho)' },
  { value: 'JOURNAL', label: 'JOURNAL (Phiếu kế toán)' },
  { value: 'MANUAL', label: 'MANUAL (Nhập thủ công)' },
];

const CURRENCIES = [
  { code: 'VND', name: 'Việt Nam Đồng' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
];

const SOURCE_TYPES = [
  { value: 'EQUITY', label: 'EQUITY (Vốn)' },
  { value: 'DEBT', label: 'DEBT (Nợ)' },
  { value: 'GRANT', label: 'GRANT (Tài trợ)' },
  { value: 'PROJECT', label: 'PROJECT (Dự án)' },
];

export default function CreateAssetFundingSource({ onClose }: CreateAssetFundingSourceProps) {
  const [detailRows, setDetailRows] = useState<DetailRow[]>([
    {
      id: 1,
      sip: 1,
      asoId: 'ASO-001',
      assId: 'ASS-001',
      atrId: 'ATR-001',
      afsId: 'AFS-001',
      currencyCode: 'VND',
      accAmount: 20000000,
      percentage: 80,
      offsetAccId: '331',
      sourceDocType: 'INVOICE',
      sourceDocId: 'INV-2024-001',
      sourceDocNumber: 'IV-2024-001',
      projectId: 'PROJ-001',
      budgetItemId: 'BUD-001'
    }
  ]);

  const [selectedDetails, setSelectedDetails] = useState<number[]>([]);

  const handleAddDetailRow = () => {
    const newRow: DetailRow = {
      id: detailRows.length + 1,
      sip: detailRows.length + 1,
      asoId: `ASO-${String(detailRows.length + 1).padStart(3, '0')}`,
      assId: '',
      atrId: '',
      afsId: '',
      currencyCode: 'VND',
      accAmount: '',
      percentage: '',
      offsetAccId: '',
      sourceDocType: '',
      sourceDocId: '',
      sourceDocNumber: '',
      projectId: '',
      budgetItemId: ''
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
          <h2 className="text-lg">CREATE ASSET FUNDING SOURCE</h2>
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
                  <span className="text-red-500">*</span> AFS ID
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="Auto generate" readOnly />
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> SOURCE CODE
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="Auto from type" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> SOURCE TYPE
                </Label>
                <Select>
                  <SelectTrigger className="bg-pink-50 h-10">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {SOURCE_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Row 2 */}
              <div className="col-span-2">
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> SOURCE NAME
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="Tên nguồn vốn" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> CREDIT ACCOUNT
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="411, 341, 414..." />
              </div>

              {/* Row 3 */}
              <div>
                <Label className="text-sm mb-1 block">TOTAL BUDGET</Label>
                <Input type="number" className="h-10" placeholder="0" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">CURRENCY</Label>
                <Select defaultValue="VND">
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map(curr => (
                      <SelectItem key={curr.code} value={curr.code}>{curr.code}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-1 block">DESCRIPTION</Label>
                <Input className="h-10" placeholder="Ghi chú về nguồn vốn" />
              </div>

            </div>
          </div>

          {/* DETAILS TABLE */}
          <div className="border rounded-lg bg-white">
            <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">FUNDING SOURCE DETAILS</h3>
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
              <table className="w-full text-sm min-w-[3200px]">
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
                    <th className="px-3 py-3 text-left text-blue-700 font-bold border-r w-32">ASO ID</th>
                    <th className="px-3 py-3 text-left text-blue-700 font-bold border-r w-48">ASSET ID</th>
                    <th className="px-3 py-3 text-left text-blue-700 font-bold border-r w-48">ASSET TRANSACTION ID</th>
                    <th className="px-3 py-3 text-left text-blue-700 font-bold border-r w-48">FUNDING SOURCE ID</th>
                    <th className="px-3 py-3 text-left text-blue-700 font-bold border-r w-24">CURRENCY</th>
                    <th className="px-3 py-3 text-right text-blue-700 font-bold border-r w-40">ACC AMOUNT</th>
                    <th className="px-3 py-3 text-right text-blue-700 font-bold border-r w-24">PERCENTAGE</th>
                    <th className="px-3 py-3 text-left text-blue-700 font-bold border-r w-40">OFFSET ACC ID</th>
                    <th className="px-3 py-3 text-left text-blue-700 font-bold border-r w-48">SOURCE DOC TYPE</th>
                    <th className="px-3 py-3 text-left text-blue-700 font-bold border-r w-40">SOURCE DOC ID</th>
                    <th className="px-3 py-3 text-left text-blue-700 font-bold border-r w-40">SOURCE DOC NUMBER</th>
                    <th className="px-3 py-3 text-left text-blue-700 font-bold border-r w-40">PROJECT ID</th>
                    <th className="px-3 py-3 text-left text-blue-700 font-bold w-40">BUDGET ITEM ID</th>
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
                      <td className="px-3 py-2 border-r font-mono text-blue-600 font-bold">{row.asoId}</td>
                      <td className="px-3 py-2 border-r">
                        <Select value={row.assId} onValueChange={(val) => {}}>
                          <SelectTrigger className="h-8 border-gray-200">
                            <SelectValue placeholder="Select asset..." />
                          </SelectTrigger>
                          <SelectContent>
                            {MOCK_ASSETS.map(asset => (
                              <SelectItem key={asset.id} value={asset.id}>{asset.id} - {asset.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2 border-r">
                        <Select value={row.atrId} onValueChange={(val) => {}}>
                          <SelectTrigger className="h-8 border-gray-200">
                            <SelectValue placeholder="Select transaction..." />
                          </SelectTrigger>
                          <SelectContent>
                            {MOCK_ASSET_TRANSACTIONS.map(atr => (
                              <SelectItem key={atr.id} value={atr.id}>{atr.code}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2 border-r">
                        <Select value={row.afsId} onValueChange={(val) => {}}>
                          <SelectTrigger className="h-8 border-gray-200">
                            <SelectValue placeholder="Select funding..." />
                          </SelectTrigger>
                          <SelectContent>
                            {MOCK_FUNDING_SOURCES.map(afs => (
                              <SelectItem key={afs.id} value={afs.id}>{afs.id} - {afs.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2 border-r">
                        <Select value={row.currencyCode} onValueChange={(val) => {}}>
                          <SelectTrigger className="h-8 border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CURRENCIES.map(curr => (
                              <SelectItem key={curr.code} value={curr.code}>{curr.code}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2 border-r">
                        <Input 
                          type="number" 
                          value={row.accAmount} 
                          className="h-8 text-right border-gray-200 font-mono" 
                        />
                      </td>
                      <td className="px-3 py-2 border-r">
                        <Input 
                          type="number" 
                          value={row.percentage} 
                          className="h-8 text-right border-gray-200" 
                          placeholder="%" 
                        />
                      </td>
                      <td className="px-3 py-2 border-r">
                        <Select value={row.offsetAccId} onValueChange={(val) => {}}>
                          <SelectTrigger className="h-8 border-gray-200">
                            <SelectValue placeholder="Select account..." />
                          </SelectTrigger>
                          <SelectContent>
                            {OFFSET_ACCOUNTS.map(acc => (
                              <SelectItem key={acc.id} value={acc.id}>{acc.id} - {acc.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2 border-r">
                        <Select value={row.sourceDocType} onValueChange={(val) => {}}>
                          <SelectTrigger className="h-8 border-gray-200">
                            <SelectValue placeholder="Select type..." />
                          </SelectTrigger>
                          <SelectContent>
                            {SOURCE_DOC_TYPES.map(type => (
                              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2 border-r">
                        <Input value={row.sourceDocId} className="h-8 border-gray-200 font-mono" />
                      </td>
                      <td className="px-3 py-2 border-r">
                        <Input value={row.sourceDocNumber} className="h-8 border-gray-200 font-mono" />
                      </td>
                      <td className="px-3 py-2 border-r">
                        <Select value={row.projectId} onValueChange={(val) => {}}>
                          <SelectTrigger className="h-8 border-gray-200">
                            <SelectValue placeholder="Select project..." />
                          </SelectTrigger>
                          <SelectContent>
                            {MOCK_PROJECTS.map(proj => (
                              <SelectItem key={proj.id} value={proj.id}>{proj.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2">
                        <Select value={row.budgetItemId} onValueChange={(val) => {}}>
                          <SelectTrigger className="h-8 border-gray-200">
                            <SelectValue placeholder="Select budget..." />
                          </SelectTrigger>
                          <SelectContent>
                            {MOCK_BUDGET_ITEMS.map(bud => (
                              <SelectItem key={bud.id} value={bud.id}>{bud.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
