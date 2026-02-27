import { useState } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './ui/select';
import { useLanguage } from '../i18n/LanguageContext';
import { toast } from 'sonner';

interface CreateAllocationRuleProps {
  onClose: () => void;
}

interface ReceiverRow {
  id: number;
  receiverType: string;
  costCenter: string;
  department: string;
  project: string;
  percentage: number | '';
  amount: number | '';
}

const FieldLabel = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="block text-xs font-medium text-gray-500 mb-1">
    {required && <span className="text-red-500 mr-0.5">*</span>}
    {children}
  </label>
);

const FormBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border border-gray-200 rounded-md p-4 bg-white">
    <h3 className="text-xs font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">{title}</h3>
    {children}
  </div>
);

export default function CreateAllocationRule({ onClose }: CreateAllocationRuleProps) {
  const { t } = useLanguage();
  const [mainTab, setMainTab]                     = useState('main-info');
  const [autoAllocation, setAutoAllocation]       = useState(false);
  const [allowReallocation, setAllowReallocation] = useState(false);
  const [allowReverse, setAllowReverse]           = useState(true);
  const [receivers, setReceivers]                 = useState<ReceiverRow[]>([]);
  const [selectedReceivers, setSelectedReceivers] = useState<number[]>([]);

  const totalPct = receivers.reduce((s, r) => s + (Number(r.percentage) || 0), 0);
  const isValid  = totalPct === 100 || receivers.length === 0;

  const addReceiver = () =>
    setReceivers(prev => [...prev, {
      id: Date.now(), receiverType: '', costCenter: '', department: '', project: '', percentage: '', amount: '',
    }]);

  const deleteReceivers = () => {
    setReceivers(prev => prev.filter(r => !selectedReceivers.includes(r.id)));
    setSelectedReceivers([]);
  };

  const updateReceiver = <K extends keyof ReceiverRow>(id: number, field: K, value: ReceiverRow[K]) =>
    setReceivers(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));

  const handleCreate = () => {
    if (!isValid) { toast.error('Tổng tỷ lệ phân bổ phải bằng 100%'); return; }
    toast.success('Tạo quy tắc phân bổ thành công');
    onClose();
  };

  return (
    <div className="min-h-screen overflow-x-auto" style={{ backgroundColor: '#f1f5f9', padding: '24px' }}>
      <div className="bg-white rounded-lg shadow-sm" style={{ minWidth: '1552px' }}>

        {/* Document Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#eff6ff' }}>
              <svg className="w-4 h-4" style={{ color: '#0064d9' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">Tạo quy tắc phân bổ chi phí</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="h-7 text-xs px-4 gap-1.5"
              style={{ backgroundColor: '#0064d9', color: '#fff' }}
              onClick={handleCreate}
            >
              <Save className="w-3 h-3" /> Tạo quy tắc
            </Button>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
            {[
              { value: 'main-info',      label: 'Thông tin chính' },
              { value: 'financial-info', label: 'Thông tin tài chính' },
              { value: 'approval-info',  label: 'Thông tin phê duyệt' },
            ].map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 text-xs px-4 py-2.5"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── TAB 1: MAIN INFO ──────────────────────────────────────────── */}
          <TabsContent value="main-info" className="p-5">
            {/* 3 form blocks */}
            <div className="grid grid-cols-3 gap-4 mb-5">

              {/* Block 1: Thông tin quy tắc */}
              <FormBlock title="Thông tin quy tắc">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Rule ID</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="RUL-2026-007" readOnly />
                  </div>
                  <div>
                    <FieldLabel required>Tên phân bổ</FieldLabel>
                    <Input className="h-8 text-xs bg-red-50 border-red-200" placeholder="Nhập tên..." />
                  </div>
                  <div>
                    <FieldLabel required>Loại phân bổ</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200"><SelectValue placeholder="Chọn..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Tỷ lệ cố định</SelectItem>
                        <SelectItem value="revenue">Theo doanh thu</SelectItem>
                        <SelectItem value="headcount">Theo nhân viên</SelectItem>
                        <SelectItem value="area">Theo diện tích</SelectItem>
                        <SelectItem value="hour">Theo giờ máy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel required>Ngày hiệu lực</FieldLabel>
                    <Input type="date" className="h-8 text-xs bg-red-50 border-red-200" />
                  </div>
                  <div>
                    <FieldLabel>Ngày hết hạn</FieldLabel>
                    <Input type="date" className="h-8 text-xs" />
                  </div>
                  <div>
                    <FieldLabel required>Công ty</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200"><SelectValue placeholder="Chọn..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abc">CÔNG TY CP ABC</SelectItem>
                        <SelectItem value="xyz">CÔNG TY TNHH XYZ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="col-span-2">
                    <FieldLabel>Mô tả</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="Nhập mô tả..." />
                  </div>
                  <div>
                    <FieldLabel required>Trạng thái</FieldLabel>
                    <Select defaultValue="draft">
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Nháp</SelectItem>
                        <SelectItem value="active">Đang hoạt động</SelectItem>
                        <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <FieldLabel>Độ ưu tiên</FieldLabel>
                    <Input type="number" className="h-8 text-xs" defaultValue="1" min="1" max="99" />
                  </div>
                </div>
              </FormBlock>

              {/* Block 2: Thiết lập phân bổ */}
              <FormBlock title="Thiết lập phân bổ">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel required>Phương pháp phân bổ</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200"><SelectValue placeholder="Chọn..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Tỷ lệ cố định</SelectItem>
                        <SelectItem value="proportion">Theo tỷ lệ</SelectItem>
                        <SelectItem value="equal">Chia đều</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel required>Kỳ phân bổ</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200"><SelectValue placeholder="Chọn..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Hàng tháng</SelectItem>
                        <SelectItem value="quarterly">Hàng quý</SelectItem>
                        <SelectItem value="yearly">Hàng năm</SelectItem>
                        <SelectItem value="once">Một lần</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Loại chạy</FieldLabel>
                    <Select defaultValue="auto">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Tự động</SelectItem>
                        <SelectItem value="manual">Thủ công</SelectItem>
                        <SelectItem value="scheduled">Lên lịch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Phân bổ tự động</FieldLabel>
                    <div className="flex items-center h-8">
                      <Switch checked={autoAllocation} onCheckedChange={setAutoAllocation} />
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Cho phép tái phân bổ</FieldLabel>
                    <div className="flex items-center h-8">
                      <Switch checked={allowReallocation} onCheckedChange={setAllowReallocation} />
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Cho phép reverse</FieldLabel>
                    <div className="flex items-center h-8">
                      <Switch checked={allowReverse} onCheckedChange={setAllowReverse} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <FieldLabel>Cơ sở phân bổ</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Chọn..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revenue">Doanh thu</SelectItem>
                        <SelectItem value="cost">Chi phí</SelectItem>
                        <SelectItem value="headcount">Nhân viên</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Module nguồn</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Chọn..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gl">GL</SelectItem>
                        <SelectItem value="ap">AP</SelectItem>
                        <SelectItem value="fcm">FCM</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Tiền tệ</FieldLabel>
                    <Select defaultValue="vnd">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vnd">VND</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </FormBlock>

              {/* Block 3: Chi phí nguồn */}
              <FormBlock title="Chi phí nguồn">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>Yếu tố chi phí</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="CCE-..." />
                  </div>
                  <div>
                    <FieldLabel>TTCP mặc định</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Chọn..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cce001">CCE-001 Admin</SelectItem>
                        <SelectItem value="cce002">CCE-002 IT</SelectItem>
                        <SelectItem value="cce003">CCE-003 Finance</SelectItem>
                        <SelectItem value="cce004">CCE-004 Logistics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Trung tâm lợi nhuận</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="PRC-..." />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div><FieldLabel>Dự án</FieldLabel><Input className="h-8 text-xs" placeholder="PRJ-..." /></div>
                  <div><FieldLabel>Sản phẩm</FieldLabel><Input className="h-8 text-xs" placeholder="PRD-..." /></div>
                  <div>
                    <FieldLabel>Phòng ban</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Chọn..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div><FieldLabel>Tài khoản</FieldLabel><Input className="h-8 text-xs" placeholder="6XX..." /></div>
                  <div><FieldLabel>Tài khoản phụ</FieldLabel><Input className="h-8 text-xs" placeholder="..." /></div>
                  <div><FieldLabel>Phân đoạn</FieldLabel><Input className="h-8 text-xs" placeholder="SEG-..." /></div>
                </div>
              </FormBlock>
            </div>

            {/* ── Receiver Table (ONLY in main-info tab) ─────────────────── */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              {/* Header row */}
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-0 flex items-center justify-between">
                <button className="text-xs font-semibold px-3 py-2.5 border-b-2 border-blue-600 text-blue-600 bg-white">
                  Bảng nhận phân bổ
                </button>
                {!isValid && receivers.length > 0 && (
                  <span className="text-xs text-red-500 font-medium pr-3">
                    ⚠ Tổng tỷ lệ: {totalPct}% (phải bằng 100%)
                  </span>
                )}
                {isValid && receivers.length > 0 && (
                  <span className="text-xs text-green-600 font-medium pr-3">✓ Tổng: 100%</span>
                )}
              </div>

              {/* Receiver toolbar */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 bg-white">
                <Button variant="outline" size="sm" className="h-8 text-xs px-3 gap-1.5" onClick={addReceiver}>
                  <Plus className="w-3 h-3" /> + Thêm dòng
                </Button>
                <Button
                  variant="outline" size="sm"
                  className="h-8 text-xs px-3 gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={deleteReceivers}
                  disabled={selectedReceivers.length === 0}
                >
                  <Trash2 className="w-3 h-3" /> Xóa
                </Button>
                <Button
                  size="sm"
                  className="h-8 text-xs px-4 gap-1.5 bg-black hover:bg-gray-800 text-white"
                  onClick={() => toast.success('Lưu bảng nhận thành công')}
                >
                  <Save className="w-3 h-3" /> Lưu
                </Button>
              </div>

              {/* Receiver table */}
              <div className="overflow-x-auto">
                <table className="w-full erp-table">
                  <thead>
                    <tr>
                      <th className="w-10 text-center">
                        <Checkbox
                          checked={receivers.length > 0 && selectedReceivers.length === receivers.length}
                          onCheckedChange={() =>
                            setSelectedReceivers(
                              selectedReceivers.length === receivers.length ? [] : receivers.map(r => r.id)
                            )
                          }
                        />
                      </th>
                      <th className="text-left">Loại nhận</th>
                      <th className="text-left">Trung tâm chi phí</th>
                      <th className="text-left">Phòng ban</th>
                      <th className="text-left">Dự án</th>
                      <th className="text-right">Tỷ lệ (%)</th>
                      <th className="text-right">Số tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receivers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-xs text-gray-400">
                          Chưa có bảng nhận. Nhấn &quot;+ Thêm dòng&quot; để thêm.
                        </td>
                      </tr>
                    ) : (
                      receivers.map(row => (
                        <tr key={row.id} className={selectedReceivers.includes(row.id) ? 'selected' : ''}>
                          <td className="text-center">
                            <Checkbox
                              checked={selectedReceivers.includes(row.id)}
                              onCheckedChange={() =>
                                setSelectedReceivers(p =>
                                  p.includes(row.id) ? p.filter(x => x !== row.id) : [...p, row.id]
                                )
                              }
                            />
                          </td>
                          <td>
                            <Select
                              value={row.receiverType}
                              onValueChange={v => updateReceiver(row.id, 'receiverType', v)}
                            >
                              <SelectTrigger className="h-7 text-xs"><SelectValue placeholder="Chọn..." /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cost-center">Trung tâm chi phí</SelectItem>
                                <SelectItem value="department">Phòng ban</SelectItem>
                                <SelectItem value="project">Dự án</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td>
                            <Input
                              className="h-7 text-xs"
                              value={row.costCenter}
                              onChange={e => updateReceiver(row.id, 'costCenter', e.target.value)}
                              placeholder="CCE-..."
                            />
                          </td>
                          <td>
                            <Input
                              className="h-7 text-xs"
                              value={row.department}
                              onChange={e => updateReceiver(row.id, 'department', e.target.value)}
                              placeholder="Phòng ban..."
                            />
                          </td>
                          <td>
                            <Input
                              className="h-7 text-xs"
                              value={row.project}
                              onChange={e => updateReceiver(row.id, 'project', e.target.value)}
                              placeholder="PRJ-..."
                            />
                          </td>
                          <td>
                            <Input
                              type="number"
                              className="h-7 text-xs text-right"
                              value={row.percentage}
                              onChange={e =>
                                updateReceiver(row.id, 'percentage', e.target.value === '' ? '' : Number(e.target.value))
                              }
                              placeholder="0"
                              min="0"
                              max="100"
                            />
                          </td>
                          <td>
                            <Input
                              type="number"
                              className="h-7 text-xs text-right"
                              value={row.amount}
                              onChange={e =>
                                updateReceiver(row.id, 'amount', e.target.value === '' ? '' : Number(e.target.value))
                              }
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  {receivers.length > 0 && (
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td colSpan={5} className="px-3 py-2 text-xs font-semibold text-gray-600">Tổng cộng</td>
                        <td className={`px-3 py-2 text-xs font-bold text-right ${isValid ? 'text-green-600' : 'text-red-500'}`}>
                          {totalPct}%
                        </td>
                        <td className="px-3 py-2 text-xs font-semibold text-right text-gray-600">
                          {new Intl.NumberFormat('vi-VN').format(
                            receivers.reduce((s, r) => s + (Number(r.amount) || 0), 0)
                          )}
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          </TabsContent>

          {/* ── TAB 2: FINANCIAL INFO ─────────────────────────────────────── */}
          <TabsContent value="financial-info" className="p-5">
            <div className="grid grid-cols-3 gap-4">
              <FormBlock title="Thông tin tài khoản">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div><FieldLabel>Tài khoản Nợ</FieldLabel><Input className="h-8 text-xs" placeholder="6XX..." /></div>
                  <div><FieldLabel>Tài khoản Có</FieldLabel><Input className="h-8 text-xs" placeholder="6XX..." /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel>Tiền tệ</FieldLabel>
                    <Select defaultValue="vnd">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vnd">VND</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><FieldLabel>Sổ kế toán</FieldLabel><Input className="h-8 text-xs" placeholder="Ledger..." /></div>
                </div>
              </FormBlock>

              <FormBlock title="Kỳ tài chính">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div><FieldLabel>Năm tài chính</FieldLabel><Input className="h-8 text-xs" defaultValue="2026" /></div>
                  <div>
                    <FieldLabel>Kỳ kế toán</FieldLabel>
                    <Select defaultValue="02">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            Kỳ {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><FieldLabel>Đơn vị pháp nhân</FieldLabel><Input className="h-8 text-xs" placeholder="LE-..." /></div>
                  <div><FieldLabel>Phiên bản</FieldLabel><Input className="h-8 text-xs" defaultValue="v1.0" /></div>
                </div>
              </FormBlock>

              <FormBlock title="Thông tin hệ thống">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div><FieldLabel>Người tạo</FieldLabel><Input className="h-8 text-xs bg-gray-50" value="admin" readOnly /></div>
                  <div><FieldLabel>Ngày tạo</FieldLabel><Input className="h-8 text-xs bg-gray-50" value="25/02/2026" readOnly /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><FieldLabel>Người sửa cuối</FieldLabel><Input className="h-8 text-xs bg-gray-50" value="" readOnly /></div>
                  <div><FieldLabel>Ngày sửa cuối</FieldLabel><Input className="h-8 text-xs bg-gray-50" value="" readOnly /></div>
                </div>
              </FormBlock>
            </div>
          </TabsContent>

          {/* ── TAB 3: APPROVAL INFO ──────────────────────────────────────── */}
          <TabsContent value="approval-info" className="p-6">

            {/* Approval Workflow Selector */}
            <div className="mb-6">
              <h3 className="text-sm mb-4">Approval Workflow</h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm mb-1 block">
                      <span className="text-red-500">*</span> Approval Workflow
                    </Label>
                    <Select defaultValue="WF01">
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WF01">WF01 - Standard Approval</SelectItem>
                        <SelectItem value="WF02">WF02 - Express Approval</SelectItem>
                        <SelectItem value="WF03">WF03 - Department Head Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block">Workflow Description</Label>
                    <Input
                      className="h-10 bg-white"
                      value="Level 1: Manager → Level 2: Director → Level 3: CFO"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-level Approval Table */}
            <div className="mb-6">
              <h3 className="text-sm mb-4">Thông tin phê duyệt đa cấp</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50 border-b">
                      <th className="px-4 py-3 text-left text-blue-700">Level</th>
                      <th className="px-4 py-3 text-left text-blue-700">Approver</th>
                      <th className="px-4 py-3 text-left text-blue-700">Position</th>
                      <th className="px-4 py-3 text-left text-blue-700">Approval Date</th>
                      <th className="px-4 py-3 text-left text-blue-700">Comments</th>
                      <th className="px-4 py-3 text-left text-blue-700">Status</th>
                      <th className="px-4 py-3 text-left text-blue-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Level 1</td>
                      <td className="px-4 py-3">Trần Văn B</td>
                      <td className="px-4 py-3">Manager</td>
                      <td className="px-4 py-3">2026-02-20</td>
                      <td className="px-4 py-3">Đồng ý</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                          Approved
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Select disabled>
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue placeholder="Chọn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approve">Duyệt</SelectItem>
                            <SelectItem value="reject">Từ chối</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Level 2</td>
                      <td className="px-4 py-3">Lê Thị C</td>
                      <td className="px-4 py-3">Director</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Select>
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue placeholder="Chọn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approve">Duyệt</SelectItem>
                            <SelectItem value="reject">Từ chối</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Level 3</td>
                      <td className="px-4 py-3">Nguyễn Thị D</td>
                      <td className="px-4 py-3">CFO</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-500">
                          Not Started
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Select disabled>
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue placeholder="Chọn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approve">Duyệt</SelectItem>
                            <SelectItem value="reject">Từ chối</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Operation History */}
            <div className="mb-6">
              <h3 className="text-sm mb-4">Lịch sử thao tác</h3>
              <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Tạo quy tắc phân bổ</p>
                    <p className="text-xs text-gray-500">admin - 25/02/2026 09:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Gửi phê duyệt Level 1</p>
                    <p className="text-xs text-gray-500">admin - 25/02/2026 09:15</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Level 1 đã phê duyệt</p>
                    <p className="text-xs text-gray-500">Trần Văn B - 20/02/2026 14:30</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
