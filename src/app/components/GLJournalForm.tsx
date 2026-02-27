import { useState } from 'react';
import { X, Search, ChevronDown, Trash2, Plus, CheckCircle, Clock, User, Save } from 'lucide-react';
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
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';

interface GLJournalFormProps {
  onClose: () => void;
}

export default function GLJournalForm({ onClose }: GLJournalFormProps) {
  const [activeTab, setActiveTab] = useState('main-info');
  const [isPosted, setIsPosted] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedDetails, setSelectedDetails] = useState<number[]>([]);

  const [details, setDetails] = useState([
    {
      id: 1,
      sip: 1,
      accId: '',
      amountDr: 0,
      amountCr: 0,
      accAmountDr: 0,
      accAmountCr: 0,
      description: '',
      cceIdDr: '',
      cceIdCr: '',
      projIdDr: '',
      projIdCr: '',
      objIdDr: '',
      objIdCr: '',
      prodIdDr: '',
      prodIdCr: '',
      celIdDr: '',
      celIdCr: '',
      matIdDr: '',
      matIdCr: '',
      assIdDr: '',
      assIdCr: '',
      bacIdDr: '',
      bacIdCr: ''
    }
  ]);

  const addDetailRow = () => {
    const nextSip = details.length > 0 ? Math.max(...details.map(d => d.sip)) + 1 : 1;
    setDetails([...details, {
      id: Date.now(),
      sip: nextSip,
      accId: '',
      amountDr: 0,
      amountCr: 0,
      accAmountDr: 0,
      accAmountCr: 0,
      description: '',
      cceIdDr: '',
      cceIdCr: '',
      projIdDr: '',
      projIdCr: '',
      objIdDr: '',
      objIdCr: '',
      prodIdDr: '',
      prodIdCr: '',
      celIdDr: '',
      celIdCr: '',
      matIdDr: '',
      matIdCr: '',
      assIdDr: '',
      assIdCr: '',
      bacIdDr: '',
      bacIdCr: ''
    }]);
  };

  const removeDetailRows = () => {
    if (selectedDetails.length > 0) {
      setDetails(details.filter(d => !selectedDetails.includes(d.id)));
      setSelectedDetails([]);
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedDetails(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-x-auto">
      <div className="bg-white rounded-lg shadow-sm" style={{ width: '1600px' }}>
        {/* Header - Matching CreateInvoice header style */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg">Create GL Journal</h2>
          <div className="flex items-center gap-3">
            <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 h-9">
              <Save className="w-4 h-4 mr-2" /> Save
            </Button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs - Matching CreateInvoice tabs style */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
            <TabsTrigger 
              value="main-info" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 h-10"
            >
              Main Info
            </TabsTrigger>
            <TabsTrigger 
              value="approval-info"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 h-10"
            >
              Approval Info
            </TabsTrigger>
          </TabsList>

          {/* Main Info Tab */}
          <TabsContent value="main-info" className="p-6">
            {/* Header Blocks - Matching CreateInvoice 440px width and style */}
            <div className="flex gap-6 mb-6" style={{ width: '1552px' }}>
              {/* Block 1 */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm mb-4">General Identification</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm mb-1 block">Journal ID</Label>
                    <Input className="h-10 bg-gray-50" defaultValue="GLJ-AUTO" disabled />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">Journal Number</Label>
                    <Input className="h-10 bg-pink-50" placeholder="GJ-TTY-MMYY-00001" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">Batch Number</Label>
                    <Input className="h-10" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">LEN ID</Label>
                    <Input className="h-10" />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">Description</Label>
                    <Input className="h-10" />
                  </div>
                </div>
              </div>

              {/* Block 2 */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm mb-4">Document Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm mb-1 block">Doc Type</Label>
                    <Select defaultValue="GENERAL">
                      <SelectTrigger className="h-10 bg-pink-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GENERAL">General</SelectItem>
                        <SelectItem value="ADJUSTMENT">Adjustment</SelectItem>
                        <SelectItem value="CLOSING">Closing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">Trans Type</Label>
                    <Input className="h-10" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">Source Type</Label>
                    <Input className="h-10" />
                  </div>
                  <div className="col-span-1.5" style={{ gridColumn: 'span 1.5' }}>
                    <Label className="text-sm mb-1 block">Doc Date</Label>
                    <Input type="date" className="h-10" />
                  </div>
                  <div className="col-span-1.5" style={{ gridColumn: 'span 1.5' }}>
                    <Label className="text-sm mb-1 block">Posting Date</Label>
                    <Input type="date" className="h-10" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">REF Doc ID</Label>
                    <Input className="h-10" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">REF Table</Label>
                    <Input className="h-10" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">Reversed ID</Label>
                    <Input className="h-10" />
                  </div>
                </div>
              </div>

              {/* Block 3 */}
              <div style={{ width: '440px' }}>
                <h3 className="text-sm mb-4">Financials & Posting</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm mb-1 block">Currency</Label>
                    <Input className="h-10 bg-pink-50" defaultValue="VND" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">Exchange Rate</Label>
                    <Input className="h-10" defaultValue="1" />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">Exchange Date</Label>
                    <Input type="date" className="h-10" />
                  </div>
                  <div className="col-span-3">
                    <Label className="text-sm mb-1 block">Posting Control</Label>
                    <Input className="h-10" />
                  </div>
                  <div className="col-span-1">
                    <Label className="text-sm mb-1 block">Post</Label>
                    <div className="flex items-center h-10">
                      <Switch checked={isPosted} onCheckedChange={setIsPosted} />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">Status</Label>
                    <Input className="h-10 bg-gray-100" defaultValue="DRAFT" disabled />
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section Toolbar - Matching CreateInvoice style */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Search All Text Columns"
                  className="w-64 h-8"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant="outline" size="sm">Go</Button>
                <Button variant="outline" size="sm">
                  Actions <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="outline" size="sm" onClick={addDetailRow}>Add Row</Button>
                <Button variant="outline" size="sm" onClick={removeDetailRows} disabled={selectedDetails.length === 0}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Table - Matching CreateInvoice style */}
              <div className="border rounded overflow-x-auto">
                <table className="w-full text-sm min-w-[4000px]">
                  <thead>
                    <tr className="bg-blue-50 border-b">
                      <th className="px-3 py-2 text-left w-12 sticky left-0 bg-blue-50 z-10 border-r">
                        <Checkbox 
                          checked={selectedDetails.length === details.length && details.length > 0}
                          onCheckedChange={(checked) => {
                            if (checked) setSelectedDetails(details.map(d => d.id));
                            else setSelectedDetails([]);
                          }}
                        />
                      </th>
                      <th className="px-3 py-2 text-left text-blue-700 w-16">Sip</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">ACC ID</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-48">Amount DR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-48">Amount CR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-48">Acc Amount DR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-48">Acc Amount CR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-80">Description</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Cost Center DR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Cost Center CR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Project DR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Project CR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Object DR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Object CR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Product DR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Product CR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Cost Element DR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Cost Element CR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Material DR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Material CR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Asset DR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Asset CR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Bank/Cash DR</th>
                      <th className="px-3 py-2 text-left text-blue-700 w-40">Bank/Cash CR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.map((row) => (
                      <tr key={row.id} className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2 sticky left-0 bg-white z-10 border-r">
                          <Checkbox 
                            checked={selectedDetails.includes(row.id)}
                            onCheckedChange={() => toggleSelection(row.id)}
                          />
                        </td>
                        <td className="px-3 py-2">{row.sip}</td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" placeholder="Select account..." />
                        </td>
                        <td className="px-3 py-2 text-right">
                          <Input type="number" className="h-8 text-xs text-right border-transparent hover:border-gray-300 focus:bg-white bg-transparent" defaultValue={0} />
                        </td>
                        <td className="px-3 py-2 text-right">
                          <Input type="number" className="h-8 text-xs text-right border-transparent hover:border-gray-300 focus:bg-white bg-transparent" defaultValue={0} />
                        </td>
                        <td className="px-3 py-2 text-right">
                          <Input type="number" className="h-8 text-xs text-right border-transparent hover:border-gray-300 focus:bg-white bg-transparent" defaultValue={0} />
                        </td>
                        <td className="px-3 py-2 text-right">
                          <Input type="number" className="h-8 text-xs text-right border-transparent hover:border-gray-300 focus:bg-white bg-transparent" defaultValue={0} />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-xs border-transparent hover:border-gray-300 focus:bg-white bg-transparent" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-right text-sm text-gray-600 mt-2">
                Total: {details.length}
              </div>
            </div>
          </TabsContent>

          {/* Approval Info Tab */}
          <TabsContent value="approval-info" className="p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="bg-blue-600 px-6 py-4 text-white">
                  <h3 className="font-bold uppercase tracking-widest flex items-center gap-2 text-sm">
                    <CheckCircle className="w-5 h-5" /> Quy trình phê duyệt
                  </h3>
                </div>
                <div className="p-6">
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                    
                    <div className="relative flex items-center gap-6 mb-8">
                      <div className="w-12 h-12 rounded-full bg-green-500 border-4 border-white shadow-md flex items-center justify-center text-white z-10">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1 bg-gray-50 p-4 rounded-xl border">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-800">Người tạo: Nguyễn Văn A</h4>
                          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">SUBMITTED</span>
                        </div>
                        <p className="text-sm text-gray-500">Đã khởi tạo và gửi yêu cầu phê duyệt</p>
                        <span className="text-xs text-gray-400 mt-2 block">04/02/2026 10:30</span>
                      </div>
                    </div>

                    <div className="relative flex items-center gap-6 mb-8">
                      <div className="w-12 h-12 rounded-full bg-blue-500 border-4 border-white shadow-md flex items-center justify-center text-white z-10">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1 bg-white p-4 rounded-xl border border-blue-200 shadow-sm ring-1 ring-blue-100">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-800">Phê duyệt cấp 1: Kế toán trưởng</h4>
                          <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">PENDING</span>
                        </div>
                        <p className="text-sm text-gray-600">Đang chờ xem xét chứng từ và định khoản</p>
                      </div>
                    </div>

                    <div className="relative flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center text-gray-400 z-10">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div className="flex-1 bg-gray-50/50 p-4 rounded-xl border border-dashed">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-400">Phê duyệt cuối: Ban Giám đốc</h4>
                          <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">WAITING</span>
                        </div>
                        <p className="text-sm text-gray-400 italic">Chưa đến lượt xử lý</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
                <h3 className="text-sm font-bold text-gray-700 uppercase">Ghi chú & Thảo luận</h3>
                <textarea 
                  className="w-full h-24 p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Nhập ý kiến phê duyệt hoặc phản hồi..."
                ></textarea>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                  <Button variant="default" className="bg-green-600 hover:bg-green-700">Approve</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
