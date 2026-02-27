import { useState } from 'react';
import { X, Play, Eye, Save, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './ui/select';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useLanguage } from '../i18n/LanguageContext';
import { toast } from 'sonner';

interface RunAllocationFormProps {
  onClose: () => void;
}

interface PreviewRow {
  id: number;
  sourceCost: string;
  receiver: string;
  percentage: number;
  allocationAmount: number;
  status: string;
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

const MOCK_PREVIEW: PreviewRow[] = [
  { id: 1, sourceCost: 'EXP-2026-00128 / Chi phí điện nước',  receiver: 'CCE-002 IT',       percentage: 25, allocationAmount: 11_250_000, status: 'Sẵn sàng' },
  { id: 2, sourceCost: 'EXP-2026-00128 / Chi phí điện nước',  receiver: 'CCE-003 Finance',   percentage: 20, allocationAmount:  9_000_000, status: 'Sẵn sàng' },
  { id: 3, sourceCost: 'EXP-2026-00128 / Chi phí điện nước',  receiver: 'CCE-005 Prod',      percentage: 35, allocationAmount: 15_750_000, status: 'Sẵn sàng' },
  { id: 4, sourceCost: 'EXP-2026-00128 / Chi phí điện nước',  receiver: 'CCE-006 Sales',     percentage: 20, allocationAmount:  9_000_000, status: 'Sẵn sàng' },
  { id: 5, sourceCost: 'EXP-2026-00119 / Chi phí thuê văn phòng', receiver: 'CCE-001 Admin', percentage: 40, allocationAmount: 48_000_000, status: 'Sẵn sàng' },
  { id: 6, sourceCost: 'EXP-2026-00119 / Chi phí thuê văn phòng', receiver: 'CCE-002 IT',    percentage: 30, allocationAmount: 36_000_000, status: 'Sẵn sàng' },
  { id: 7, sourceCost: 'EXP-2026-00119 / Chi phí thuê văn phòng', receiver: 'CCE-005 Prod',  percentage: 30, allocationAmount: 36_000_000, status: 'Sẵn sàng' },
];

const fmtCurrency = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

export default function RunAllocationForm({ onClose }: RunAllocationFormProps) {
  const { t } = useLanguage();
  const [mainTab, setMainTab]           = useState('main-info');
  const [simMode, setSimMode]           = useState(true);
  const [autoPost, setAutoPost]         = useState(false);
  const [allowAdj, setAllowAdj]         = useState(true);
  const [autoReverse, setAutoReverse]   = useState(false);
  const [scheduleRun, setScheduleRun]   = useState(false);
  const [showPreview, setShowPreview]   = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<number[]>([]);

  const totalSource    = MOCK_PREVIEW.reduce((a, r) => a + r.allocationAmount, 0);
  const totalAllocated = showPreview ? totalSource : 0;

  const togglePreviewRow = (id: number) =>
    setSelectedPreview(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleAllPreview = () =>
    setSelectedPreview(selectedPreview.length === MOCK_PREVIEW.length ? [] : MOCK_PREVIEW.map(r => r.id));

  const handlePreview = () => {
    setShowPreview(true);
    toast.success('Preview phân bổ đã tải xong — 7 dòng dữ liệu');
  };

  const handleRunAllocation = () => {
    if (!showPreview) { toast.warning('Vui lòng Preview trước khi chạy'); return; }
    toast.success('Chạy phân bổ chi phí thành công — Batch ID: BA-2026-0089');
    onClose();
  };

  return (
    <div className="min-h-screen overflow-x-auto" style={{ backgroundColor: '#f1f5f9', padding: '24px' }}>
      <div className="bg-white rounded-lg shadow-sm" style={{ minWidth: '1552px' }}>

        {/* ── Document Header ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#eff6ff' }}>
              <Play className="w-4 h-4" style={{ color: '#0064d9' }} />
            </div>
            <h2 className="text-sm font-semibold text-gray-800">Chạy phân bổ chi phí</h2>
            {simMode && (
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
                Simulation Mode
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-7 text-xs px-3 gap-1.5"
              onClick={handlePreview}>
              <Eye className="w-3 h-3" /> Preview
            </Button>
            <Button size="sm" className="h-7 text-xs px-4 gap-1.5"
              style={{ backgroundColor: '#0064d9', color: '#fff' }}
              onClick={handleRunAllocation}>
              <Play className="w-3 h-3" /> Chạy phân bổ
            </Button>
            <button onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────── */}
        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
            {[
              { value: 'main-info',      label: 'Thông tin chính' },
              { value: 'financial-info', label: 'Thông tin tài chính' },
              { value: 'approval-info',  label: 'Thông tin phê duyệt' },
            ].map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 text-xs px-4 py-2.5">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── TAB MAIN INFO ──────────────────────────────────────────── */}
          <TabsContent value="main-info" className="p-5">
            <div className="grid grid-cols-3 gap-4 mb-5">

              {/* Block 1: Batch Info */}
              <FormBlock title="Thông tin Batch">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div><FieldLabel>Allocation Batch ID</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="BA-2026-0089" readOnly />
                  </div>
                  <div><FieldLabel required>Kỳ phân bổ</FieldLabel>
                    <Select defaultValue="feb-2026">
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jan-2026">01/2026</SelectItem>
                        <SelectItem value="feb-2026">02/2026</SelectItem>
                        <SelectItem value="mar-2026">03/2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><FieldLabel required>Công ty</FieldLabel>
                    <Select defaultValue="abc">
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abc">CÔNG TY CP ABC</SelectItem>
                        <SelectItem value="xyz">CÔNG TY XYZ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div><FieldLabel>Ngày hạch toán</FieldLabel>
                    <Input type="date" className="h-8 text-xs" defaultValue="2026-02-28" />
                  </div>
                  <div><FieldLabel>Loại chạy</FieldLabel>
                    <Select defaultValue="auto">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Tự động</SelectItem>
                        <SelectItem value="manual">Thủ công</SelectItem>
                        <SelectItem value="scheduled">Lên lịch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><FieldLabel>Trạng thái</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="Draft" readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div><FieldLabel>Người tạo</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="admin" readOnly />
                  </div>
                  <div><FieldLabel>Ngày tạo</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="25/02/2026" readOnly />
                  </div>
                  <div><FieldLabel>Mô tả</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="Nhập mô tả..." />
                  </div>
                </div>
              </FormBlock>

              {/* Block 2: Allocation Scope */}
              <FormBlock title="Phạm vi phân bổ">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div><FieldLabel>Loại phân bổ</FieldLabel>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="fixed">Tỷ lệ cố định</SelectItem>
                        <SelectItem value="revenue">Số lượng</SelectItem>
                        
                      </SelectContent>
                    </Select>
                  </div>
                  <div><FieldLabel>Trung tâm lợi nhuận</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Tất cả" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả loại</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="labor">Labor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><FieldLabel>Trung tâm chi phí</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Tất cả" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="cce-001">CCE-001 Admin</SelectItem>
                        <SelectItem value="cce-002">CCE-002 IT</SelectItem>
                        <SelectItem value="cce-003">CCE-003 Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div><FieldLabel>Phân tích mở rộng</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Tất cả" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả phòng ban</SelectItem>
                        <SelectItem value="finance">Kế toán</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><FieldLabel>Dự án</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="Mã dự án..." />
                  </div>
                  <div><FieldLabel>Sản phẩm</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="Mã sản phẩm..." />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div><FieldLabel>Yếu tố chi phí</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Tất cả" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả module</SelectItem>
                        <SelectItem value="gl">GL</SelectItem>
                        <SelectItem value="ap">AP</SelectItem>
                        <SelectItem value="fcm">FCM</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><FieldLabel>Tiền tệ</FieldLabel>
                    <Select defaultValue="vnd">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vnd">VND</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><FieldLabel>Kỳ kế toán</FieldLabel>
                    <Input className="h-8 text-xs" defaultValue="02/2026" readOnly />
                  </div>
                </div>
              </FormBlock>

              {/* Block 3: Control */}
              <FormBlock title="Kiểm soát chạy">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div><FieldLabel>Simulation Mode</FieldLabel>
                    <div className="flex items-center h-8">
                      <Switch checked={simMode} onCheckedChange={setSimMode} />
                      <span className="text-xs ml-2 text-gray-500">{simMode ? 'Bật' : 'Tắt'}</span>
                    </div>
                  </div>
                  <div><FieldLabel>Auto Post</FieldLabel>
                    <div className="flex items-center h-8">
                      <Switch checked={autoPost} onCheckedChange={setAutoPost} />
                    </div>
                  </div>
                  <div><FieldLabel>Allow Adjustment</FieldLabel>
                    <div className="flex items-center h-8">
                      <Switch checked={allowAdj} onCheckedChange={setAllowAdj} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div><FieldLabel>Auto Reverse</FieldLabel>
                    <div className="flex items-center h-8">
                      <Switch checked={autoReverse} onCheckedChange={setAutoReverse} />
                    </div>
                  </div>
                  <div><FieldLabel>Schedule Run</FieldLabel>
                    <div className="flex items-center h-8">
                      <Switch checked={scheduleRun} onCheckedChange={setScheduleRun} />
                    </div>
                  </div>
                  <div><FieldLabel>Run Priority</FieldLabel>
                    <Select defaultValue="normal">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Cao</SelectItem>
                        <SelectItem value="normal">Bình thường</SelectItem>
                        <SelectItem value="low">Thấp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div><FieldLabel>Batch Group</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="GRP-01" />
                  </div>
                  <div><FieldLabel>Processing Type</FieldLabel>
                    <Select defaultValue="sequential">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sequential">Sequential</SelectItem>
                        <SelectItem value="parallel">Parallel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><FieldLabel>Version</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="v1.0" readOnly />
                  </div>
                </div>
              </FormBlock>
            </div>
          </TabsContent>

          {/* ── TAB FINANCIAL INFO ─────────────────────────────────────── */}
          <TabsContent value="financial-info" className="p-5">
            {/* Summary row */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              <FormBlock title="Tóm tắt tài chính">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div><FieldLabel>Tổng chi phí nguồn</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50 text-right font-mono"
                      value={fmtCurrency(165_000_000)} readOnly />
                  </div>
                  <div><FieldLabel>Tổng đã phân bổ</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50 text-right font-mono text-green-700"
                      value={showPreview ? fmtCurrency(totalAllocated) : '—'} readOnly />
                  </div>
                  <div><FieldLabel>Còn lại</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50 text-right font-mono text-amber-700"
                      value={showPreview ? '0' : '—'} readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div><FieldLabel>TK Nợ</FieldLabel>
                    <Input className="h-8 text-xs" defaultValue="6421" />
                  </div>
                  <div><FieldLabel>TK Có</FieldLabel>
                    <Input className="h-8 text-xs" defaultValue="3351" />
                  </div>
                  <div><FieldLabel>Tiền tệ</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="VND" readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div><FieldLabel>Tỷ giá</FieldLabel>
                    <Input className="h-8 text-xs" defaultValue="1.00" />
                  </div>
                  <div><FieldLabel>Sổ kế toán</FieldLabel>
                    <Input className="h-8 text-xs" defaultValue="PRIMARY" />
                  </div>
                  <div><FieldLabel>Kỳ tài chính</FieldLabel>
                    <Input className="h-8 text-xs bg-gray-50" defaultValue="02/2026" readOnly />
                  </div>
                </div>
              </FormBlock>

              {/* Validation info */}
              <div className="col-span-2">
                <div className="border border-gray-200 rounded-md p-4 bg-white h-full">
                  <h3 className="text-xs font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-100">Trạng thái Preview</h3>
                  {showPreview ? (
                    <div className="flex items-center gap-2 p-3 rounded-lg mb-3"
                      style={{ backgroundColor: '#f0fdf4' }}>
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-green-700">Preview hoàn tất</p>
                        <p className="text-xs text-green-600">{MOCK_PREVIEW.length} dòng phân bổ — Tổng: {fmtCurrency(totalSource)} VND</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 rounded-lg mb-3"
                      style={{ backgroundColor: '#fffbeb' }}>
                      <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <p className="text-xs text-amber-700">Nhấn Preview để xem kết quả phân bổ trước khi chạy chính thức</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Preview Table ─────────────────────────────────────────── */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-0 flex items-center justify-between">
                <button className="text-xs font-semibold px-3 py-2.5 border-b-2 border-blue-600 text-blue-600 bg-white">
                  Preview Phân bổ
                </button>
                <div className="flex items-center gap-2 py-1.5">
                  <Button size="sm" variant="outline" className="h-7 text-xs px-3 gap-1.5"
                    onClick={handlePreview}>
                    <Eye className="w-3 h-3" /> Preview
                  </Button>
                  <Button size="sm" className="h-7 text-xs px-3 gap-1.5"
                    style={{ backgroundColor: '#0064d9', color: '#fff' }}
                    onClick={handleRunAllocation}>
                    <Play className="w-3 h-3" /> Chạy phân bổ
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full erp-table">
                  <thead>
                    <tr>
                      <th className="w-10 text-center">
                        <Checkbox
                          checked={showPreview && selectedPreview.length === MOCK_PREVIEW.length}
                          onCheckedChange={toggleAllPreview}
                          disabled={!showPreview}
                        />
                      </th>
                      <th className="text-left">Chi phí nguồn</th>
                      <th className="text-left">Đối tượng nhận</th>
                      <th className="text-right">Tỷ lệ (%)</th>
                      <th className="text-right">Số tiền phân bổ (VND)</th>
                      <th className="text-center">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!showPreview ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-gray-400 text-xs">
                          Nhấn <strong>Preview</strong> để xem kết quả phân bổ
                        </td>
                      </tr>
                    ) : MOCK_PREVIEW.map(row => (
                      <tr key={row.id} className={selectedPreview.includes(row.id) ? 'selected' : ''}>
                        <td className="text-center" onClick={e => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedPreview.includes(row.id)}
                            onCheckedChange={() => togglePreviewRow(row.id)}
                          />
                        </td>
                        <td className="text-gray-700 text-xs">{row.sourceCost}</td>
                        <td className="text-gray-600">{row.receiver}</td>
                        <td className="text-right tabular-nums font-medium">{row.percentage}%</td>
                        <td className="text-right tabular-nums font-semibold text-gray-800">{fmtCurrency(row.allocationAmount)}</td>
                        <td className="text-center">
                          <span className="erp-badge-success">{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {showPreview && (
                    <tfoot>
                      <tr className="bg-gray-50 border-t border-gray-200">
                        <td colSpan={3} className="px-3 py-2 text-xs font-semibold text-gray-600">Tổng cộng</td>
                        <td className="px-3 py-2 text-right text-xs font-bold text-gray-800">100%</td>
                        <td className="px-3 py-2 text-right text-xs font-bold text-gray-800">{fmtCurrency(totalSource)}</td>
                        <td />
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          </TabsContent>

          {/* ── TAB APPROVAL INFO ─────────────────────────────────────── */}
          <TabsContent value="approval-info" className="p-5">
            <div className="grid grid-cols-3 gap-4">
              <FormBlock title="Thông tin phê duyệt">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div><FieldLabel>Người duyệt cấp 1</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="Chọn người duyệt..." />
                  </div>
                  <div><FieldLabel>Người duyệt cấp 2</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="Chọn người duyệt..." />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><FieldLabel>Ngày duyệt dự kiến</FieldLabel>
                    <Input type="date" className="h-8 text-xs" />
                  </div>
                  <div><FieldLabel>Mức ưu tiên phê duyệt</FieldLabel>
                    <Select defaultValue="normal">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Khẩn</SelectItem>
                        <SelectItem value="normal">Bình thường</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </FormBlock>
              <FormBlock title="Ghi chú phê duyệt">
                <div><FieldLabel>Ghi chú</FieldLabel>
                  <textarea className="w-full h-24 text-xs border border-gray-200 rounded px-2 py-1.5 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Nhập ghi chú phê duyệt..." />
                </div>
              </FormBlock>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
