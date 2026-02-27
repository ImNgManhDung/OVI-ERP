import { useState } from 'react';
import { X, Trash2, Plus } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { toast } from 'sonner';

interface CreateAssetCategoryProps {
  onClose: () => void;
}

interface BookDefault {
  id: number;
  acbId: string;
  lenId: string;
  ledger: '0L' | '2L' | '1L' | '';
  lifeMonths: number | string;
  deprMethod: string;
  isDepreciate: 'Y' | 'N';
}

export default function CreateAssetCategory({ onClose }: CreateAssetCategoryProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Main Info Fields
  const [acaId] = useState('ACA-006');
  const [categoryCode, setCategoryCode] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [parentId, setParentId] = useState('');
  const [level, setLevel] = useState('1');
  const [assetType, setAssetType] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState('Y');
  const [assetAccId, setAssetAccId] = useState('');
  const [deprAccId, setDeprAccId] = useState('');
  const [expenseAccId, setExpenseAccId] = useState('');
  const [disposalLossAccId, setDisposalLossAccId] = useState('');
  const [disposalGainAccId, setDisposalGainAccId] = useState('');

  // Details (Book Defaults)
  const [bookDefaults, setBookDefaults] = useState<BookDefault[]>([
    {
      id: 1,
      acbId: 'ACB-001',
      lenId: 'LE-001',
      ledger: '0L',
      lifeMonths: 120,
      deprMethod: 'STRAIGHT_LINE',
      isDepreciate: 'Y'
    }
  ]);

  const handleSave = () => {
    if (!categoryCode || !categoryName || !assetType || !assetAccId || !deprAccId || !expenseAccId) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Asset category created successfully");
    onClose();
  };

  const handleAddRow = () => {
    const newId = bookDefaults.length > 0 ? Math.max(...bookDefaults.map(r => r.id)) + 1 : 1;
    const newRow: BookDefault = {
      id: newId,
      acbId: `ACB-${String(newId).padStart(3, '0')}`,
      lenId: '',
      ledger: '',
      lifeMonths: '',
      deprMethod: '',
      isDepreciate: 'Y'
    };
    setBookDefaults([...bookDefaults, newRow]);
  };

  const handleDeleteRows = () => {
    setBookDefaults(bookDefaults.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const updateRow = (id: number, field: keyof BookDefault, value: any) => {
    setBookDefaults(bookDefaults.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-x-auto">
      <div className="bg-white rounded-lg shadow-sm" style={{ width: '1600px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800">Create Asset Category</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Main Info - 3 Columns Layout */}
          <div className="flex gap-6 mb-6" style={{ width: '1552px' }}>
            {/* Column 1: Basic Info */}
            <div style={{ width: '440px' }}>
              <h3 className="text-sm mb-4">Basic Information</h3>
              <div className="grid grid-cols-3 gap-4">
                {/* Row 1: ACA ID + Asset Category Code */}
                <div className="col-span-3 grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm mb-1 block">ACA ID</Label>
                    <Input
                      value={acaId}
                      className="h-10 bg-gray-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Asset Category Code
                    </Label>
                    <Input
                      value={categoryCode}
                      onChange={(e) => setCategoryCode(e.target.value)}
                      placeholder="e.g., TS-MMTB"
                      className="bg-pink-50 h-10"
                    />
                  </div>
                </div>

                {/* Row 2: Asset Category Name + Asset Type */}
                <div className="col-span-3 grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Asset Category Name
                    </Label>
                    <Input
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="e.g., Máy móc thiết bị"
                      className="bg-pink-50 h-10"
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Asset Type
                    </Label>
                    <Select value={assetType} onValueChange={setAssetType}>
                      <SelectTrigger className="bg-pink-50 h-10">
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TANGIBLE">TANGIBLE (Hữu hình)</SelectItem>
                        <SelectItem value="INTANGIBLE">INTANGIBLE (Vô hình)</SelectItem>
                        <SelectItem value="CIP">CIP (XDCB dở dang)</SelectItem>
                        <SelectItem value="PREPAID">PREPAID (Trả trước)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 3: Description */}
                <div className="col-span-3">
                  <Label className="text-sm mb-1 block">Description</Label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description..."
                    className="h-10"
                  />
                </div>
              </div>
            </div>

            {/* Column 2: Hierarchy & Accounts */}
            <div style={{ width: '440px' }}>
              <h3 className="text-sm mb-4">Hierarchy & Accounts</h3>
              <div className="grid grid-cols-3 gap-4">
                {/* Row 1: Parent Category + Level */}
                <div className="col-span-2">
                  <Label className="text-sm mb-1 block">Parent Category</Label>
                  <Select value={parentId} onValueChange={setParentId}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="TS-COHDINH">TS Cố định</SelectItem>
                      <SelectItem value="TS-HUUHINH">TS Hữu hình</SelectItem>
                      <SelectItem value="TS-VOHINH">TS Vô hình</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm mb-1 block">Level</Label>
                  <Input
                    type="number"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="h-10"
                  />
                </div>

                {/* Row 2: Asset Acc + Depr Acc + Expense Acc */}
                <div>
                  <Label className="text-sm mb-1 block">
                    <span className="text-red-500">*</span> Asset Acc
                  </Label>
                  <Input
                    value={assetAccId}
                    onChange={(e) => setAssetAccId(e.target.value)}
                    placeholder="211"
                    className="bg-pink-50 h-10 font-mono"
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">
                    <span className="text-red-500">*</span> Depr Acc
                  </Label>
                  <Input
                    value={deprAccId}
                    onChange={(e) => setDeprAccId(e.target.value)}
                    placeholder="214"
                    className="bg-pink-50 h-10 font-mono"
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">
                    <span className="text-red-500">*</span> Expense Acc
                  </Label>
                  <Input
                    value={expenseAccId}
                    onChange={(e) => setExpenseAccId(e.target.value)}
                    placeholder="641"
                    className="bg-pink-50 h-10 font-mono"
                  />
                </div>

                {/* Row 3: Disposal Loss + Disposal Gain + Is Active */}
                <div>
                  <Label className="text-sm mb-1 block">Disposal Loss</Label>
                  <Input
                    value={disposalLossAccId}
                    onChange={(e) => setDisposalLossAccId(e.target.value)}
                    placeholder="811"
                    className="h-10 font-mono"
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">Disposal Gain</Label>
                  <Input
                    value={disposalGainAccId}
                    onChange={(e) => setDisposalGainAccId(e.target.value)}
                    placeholder="711"
                    className="h-10 font-mono"
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">Is Active</Label>
                  <div className="flex items-center h-10">
                    <Switch
                      checked={isActive === 'Y'}
                      onCheckedChange={(checked) => setIsActive(checked ? 'Y' : 'N')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Additional Information (Empty) */}
            <div style={{ width: '440px' }}>
              {/* Reserved for future use */}
            </div>
          </div>

          {/* Book Defaults Details - Nested Tabs */}
          <div className="mt-6">
            <Tabs defaultValue="book-defaults" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="book-defaults"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
                >
                  Book Defaults
                </TabsTrigger>
              </TabsList>

              <TabsContent value="book-defaults" className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleAddRow}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Row
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleDeleteRows}
                    disabled={selectedRows.length === 0}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete Selected
                  </Button>
                  <div className="flex-1"></div>
                  <Button 
                    size="sm"
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Save
                  </Button>
                </div>

                {/* Table */}
                <div className="border rounded-lg overflow-hidden bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-blue-50 border-b">
                          <th className="px-3 py-2 text-left border-r w-10">
                            <Checkbox 
                              checked={selectedRows.length === bookDefaults.length && bookDefaults.length > 0}
                              onCheckedChange={(checked) => {
                                if (checked) setSelectedRows(bookDefaults.map(r => r.id));
                                else setSelectedRows([]);
                              }}
                            />
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase border-r">SIP</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase border-r">ACB ID</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase border-r">Legal Entity</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase border-r">Ledger</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase border-r">Life Months</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase border-r">Depr Method</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Is Depreciate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookDefaults.map((row, index) => (
                          <tr key={row.id} className="border-b hover:bg-gray-50">
                            <td className="px-3 py-2 border-r">
                              <Checkbox
                                checked={selectedRows.includes(row.id)}
                                onCheckedChange={() => toggleRowSelection(row.id)}
                              />
                            </td>
                            <td className="px-3 py-2 border-r text-gray-600">{index + 1}</td>
                            <td className="px-3 py-2 border-r">
                              <Input
                                value={row.acbId}
                                className="h-8 border-0 bg-transparent text-xs"
                                readOnly
                              />
                            </td>
                            <td className="px-3 py-2 border-r">
                              <Select
                                value={row.lenId}
                                onValueChange={(val) => updateRow(row.id, 'lenId', val)}
                              >
                                <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                                  <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="LE-001">LE-001 - Công ty ABC</SelectItem>
                                  <SelectItem value="LE-002">LE-002 - Chi nhánh HN</SelectItem>
                                  <SelectItem value="LE-003">LE-003 - Chi nhánh HCM</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-3 py-2 border-r">
                              <Select
                                value={row.ledger}
                                onValueChange={(val) => updateRow(row.id, 'ledger', val)}
                              >
                                <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                                  <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0L">0L - VAS</SelectItem>
                                  <SelectItem value="2L">2L - IFRS</SelectItem>
                                  <SelectItem value="1L">1L - INTERNAL</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-3 py-2 border-r">
                              <Input
                                type="number"
                                value={row.lifeMonths}
                                onChange={(e) => updateRow(row.id, 'lifeMonths', e.target.value)}
                                className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs"
                                placeholder="120"
                              />
                            </td>
                            <td className="px-3 py-2 border-r">
                              <Select
                                value={row.deprMethod}
                                onValueChange={(val) => updateRow(row.id, 'deprMethod', val)}
                              >
                                <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                                  <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="STRAIGHT_LINE">STRAIGHT LINE</SelectItem>
                                  <SelectItem value="DECLINING_BALANCE">DECLINING BALANCE</SelectItem>
                                  <SelectItem value="MANUAL">MANUAL</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-3 py-2">
                              <Select
                                value={row.isDepreciate}
                                onValueChange={(val) => updateRow(row.id, 'isDepreciate', val as 'Y' | 'N')}
                              >
                                <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Y">Yes</SelectItem>
                                  <SelectItem value="N">No</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}