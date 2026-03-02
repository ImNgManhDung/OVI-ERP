import { useState } from 'react';
import { Save, X, Plus, Trash2, ChevronDown, RotateCcw, Edit3, RefreshCw } from 'lucide-react';
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
import { useLanguage } from '../i18n/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from './ui/switch';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface CreateGoodIssueProps {
    onClose: () => void;
}

// ── Reusable field components (matching CreateGoodsIssuesRequirement) ────────
const FieldLabel = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
    <label className="block text-xs font-medium text-gray-500 mb-1">
        {required && <span className="text-red-500 mr-0.5">*</span>}
        {children}
    </label>
);

const FormBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border border-gray-200 rounded-md p-4 bg-white">
        <h3 className="text-xs font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100 uppercase tracking-wider">
            {title}
        </h3>
        {children}
    </div>
);

export default function CreateGoodIssue({ onClose }: CreateGoodIssueProps) {
    const { t } = useLanguage();
    const [mainTab, setMainTab] = useState('main');
    const [editMode, setEditMode] = useState(false);
    const [searchText, setSearchText] = useState('');

    return (
        <div className="min-h-screen overflow-x-auto" style={{ backgroundColor: '#f1f5f9', padding: '24px' }}>
            <div className="bg-white rounded-lg shadow-sm mx-auto" style={{ minWidth: '1552px', maxWidth: '1600px' }}>
                {/* ── Document Header ─────────────────────────────────────────── */}
                <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-200">
                    <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-tight">{t.wmm.createGoodsIssue}</h2>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* ── Main Tabs ───────────────────────────────────────────────── */}
                <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
                        <TabsTrigger value="main" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 text-xs px-6 py-2.5 font-bold uppercase">Main Info</TabsTrigger>
                        <TabsTrigger value="financial" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 text-xs px-6 py-2.5 font-bold uppercase">Financial</TabsTrigger>
                        <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 text-xs px-6 py-2.5 font-bold uppercase">Shipping</TabsTrigger>
                    </TabsList>

                    <TabsContent value="main" className="p-5 space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Block 1: Receiving Object */}
                            <FormBlock title="Đối tượng nhận hàng">
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    <div>
                                        <FieldLabel>Object Type</FieldLabel>
                                        <Select defaultValue="supplier">
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="supplier">Supplier</SelectItem>
                                                <SelectItem value="return">Trả hàng</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <FieldLabel required>Object Code</FieldLabel>
                                        <Input defaultValue="KH-001" className="h-8 text-xs" />
                                    </div>
                                    <div>
                                        <FieldLabel>Object Name</FieldLabel>
                                        <Input defaultValue="Công ty TNHH ABC" className="h-8 text-xs bg-gray-50" readOnly />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <FieldLabel>Address</FieldLabel>
                                    <Input defaultValue="123 Nguyễn Văn Linh, Q.7, TP.HCM" className="h-8 text-xs bg-gray-50" readOnly />
                                </div>
                                <div>
                                    <FieldLabel>Description</FieldLabel>
                                    <textarea className="w-full min-h-[60px] p-2 text-xs bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-none resize-none" defaultValue="Xuất hàng theo đơn hàng #SO-2025-001" />
                                </div>
                            </FormBlock>

                            {/* Block 2: Document Info */}
                            <FormBlock title="Thông tin phiếu xuất">
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    <div>
                                        <FieldLabel required>Document Type</FieldLabel>
                                        <Select defaultValue="normal" disabled>
                                            <SelectTrigger className="h-8 text-xs bg-gray-100">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="normal">Phiếu xuất kho</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <FieldLabel required>Type</FieldLabel>
                                        <Select defaultValue="out">
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="out">Xuất kho</SelectItem>
                                                <SelectItem value="transfer">Chuyển kho</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <FieldLabel required>Stores</FieldLabel>
                                        <Select defaultValue="wh01">
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="wh01">Kho Chính</SelectItem>
                                                <SelectItem value="wh02">Kho Sản Xuất</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    <div>
                                        <FieldLabel required>Stock Date</FieldLabel>
                                        <Input type="date" defaultValue="2025-01-06" className="h-8 text-xs" />
                                    </div>
                                    <div>
                                        <FieldLabel>Stock Number</FieldLabel>
                                        <Input defaultValue="PX-2025-0147" disabled className="h-8 text-xs bg-gray-50" />
                                    </div>
                                    <div>
                                        <FieldLabel required>Schedule Date</FieldLabel>
                                        <Input type="date" defaultValue="2025-01-06" className="h-8 text-xs" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <FieldLabel>Sob Document</FieldLabel>
                                        <Input placeholder="Số chứng từ gốc" className="h-8 text-xs" />
                                    </div>
                                    <div className="flex flex-col">
                                        <FieldLabel>Complete</FieldLabel>
                                        <div className="flex items-center h-8">
                                            <Checkbox id="complete" className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <FieldLabel>Approved</FieldLabel>
                                        <div className="flex items-center h-8">
                                            <Checkbox id="approve" defaultChecked className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </FormBlock>
                        </div>
                    </TabsContent>

                    <TabsContent value="financial" className="p-5 space-y-5">
                        <div className="grid grid-cols-3 gap-4">
                            {/* Card 1: Finance & Rate */}
                            <FormBlock title="Tài chính & Tỷ giá">
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    <div>
                                        <FieldLabel required>Fiscal Year</FieldLabel>
                                        <Select defaultValue="2026">
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="2025">2025</SelectItem>
                                                <SelectItem value="2026">2026</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <FieldLabel required>Account Period</FieldLabel>
                                        <Select defaultValue="01/2026">
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="01/2026">01/2026</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <FieldLabel required>Currency Code</FieldLabel>
                                        <Select defaultValue="VND">
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="VND">VND</SelectItem>
                                                <SelectItem value="USD">USD</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <FieldLabel>Rate Type</FieldLabel>
                                        <Select defaultValue="tw">
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="tw">Tỷ giá TW</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <FieldLabel>Rate Date</FieldLabel>
                                        <Input type="date" defaultValue="2025-01-06" className="h-8 text-xs" />
                                    </div>
                                    <div>
                                        <FieldLabel>Exchange Rate</FieldLabel>
                                        <Input defaultValue="24,500" className="h-8 text-xs text-right bg-gray-50" readOnly />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mt-3">
                                    <div>
                                        <FieldLabel>GL DATE</FieldLabel>
                                        <Input type="date" defaultValue="2025-01-06" className="h-8 text-xs" />
                                    </div>
                                </div>
                            </FormBlock>

                            {/* Card 2: Tax & Posting */}
                            <FormBlock title="Thuế & Posting">
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <FieldLabel>Object Code Tax</FieldLabel>
                                        <Input defaultValue="0123456789" className="h-8 text-xs" />
                                    </div>
                                    <div className="col-span-2">
                                        <FieldLabel>Object Name Tax</FieldLabel>
                                        <Input defaultValue="Công ty TNHH ABC" className="h-8 text-xs bg-gray-50 font-medium" readOnly />
                                    </div>
                                </div>
                            </FormBlock>

                            {/* Card 3: Status & Value */}
                            <FormBlock title="Trạng thái & Giá trị">
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    <div>
                                        <FieldLabel>Posting Date</FieldLabel>
                                        <Input type="date" defaultValue="2025-01-06" className="h-8 text-xs" />
                                    </div>
                                    <div>
                                        <FieldLabel>Term Date</FieldLabel>
                                        <Input type="date" defaultValue="2025-01-20" className="h-8 text-xs" />
                                    </div>
                                    <div>
                                        <FieldLabel>Status</FieldLabel>
                                        <Input defaultValue="Draft" disabled className="h-8 text-xs bg-gray-50" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    <div>
                                        <FieldLabel>Amount</FieldLabel>
                                        <Input defaultValue="45,500,000" className="h-8 text-xs text-right bg-gray-50 font-bold" readOnly />
                                    </div>
                                    <div>
                                        <FieldLabel>Tax</FieldLabel>
                                        <Input defaultValue="4,550,000" className="h-8 text-xs text-right bg-gray-50" readOnly />
                                    </div>
                                    <div>
                                        <FieldLabel>Total</FieldLabel>
                                        <Input defaultValue="50,050,050" className="h-8 text-xs text-right bg-gray-50 font-bold text-blue-600" readOnly />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <FieldLabel>Remain</FieldLabel>
                                        <Input defaultValue="187" className="h-8 text-xs text-right bg-gray-50" readOnly />
                                    </div>
                                    <div>
                                        <FieldLabel>Acc. Rem.</FieldLabel>
                                        <Input defaultValue="45,5k" className="h-8 text-xs text-right bg-gray-50" readOnly />
                                    </div>
                                    <div>
                                        <FieldLabel>Acc. Amt.</FieldLabel>
                                        <Input defaultValue="50kk" className="h-8 text-xs text-right bg-gray-50" readOnly />
                                    </div>
                                </div>
                            </FormBlock>
                        </div>
                    </TabsContent>

                    <TabsContent value="shipping" className="p-5 space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <FormBlock title="Thông tin vận chuyển">
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <FieldLabel>Shipping Method</FieldLabel>
                                        <Select defaultValue="truck">
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="truck">Xe tải</SelectItem>
                                                <SelectItem value="sea">Đường biển</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <FieldLabel>Transport Class</FieldLabel>
                                        <Select defaultValue="express">
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="express">Hỏa tốc</SelectItem>
                                                <SelectItem value="standard">Tiêu chuẩn</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <FieldLabel>Shipper</FieldLabel>
                                    <Input placeholder="Tên đơn vị vận chuyển" className="h-8 text-xs bg-gray-50" />
                                </div>
                            </FormBlock>

                            <FormBlock title="Địa chỉ giao nhận">
                                <div className="space-y-3">
                                    <div>
                                        <FieldLabel>Dispatch Address</FieldLabel>
                                        <Input defaultValue="Kho Chính - 456 Lê Văn Việt, Q.9" className="h-8 text-xs bg-gray-50" readOnly />
                                    </div>
                                    <div>
                                        <FieldLabel>Receive Address</FieldLabel>
                                        <Input defaultValue="123 Nguyễn Văn Linh, Q.7, TP.HCM" className="h-8 text-xs bg-gray-50" readOnly />
                                    </div>
                                </div>
                            </FormBlock>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* ── Details Section (Grid Area) ─────────────────────────── */}
                <div className="p-5 pt-0">
                    <Tabs defaultValue="details" className="w-full border border-gray-200 rounded-md overflow-hidden bg-white">
                        {/* Tab label row */}
                        <div className="border-b border-gray-200 bg-gray-50 px-4 flex items-center justify-between">
                            <TabsList className="bg-transparent border-none p-0 h-auto">
                                <TabsTrigger
                                    value="details"
                                    className="text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white transition-all"
                                >
                                    Details
                                </TabsTrigger>
                                <TabsTrigger
                                    value="accounting"
                                    className="text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white transition-all"
                                >
                                    Accounting
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Inline toolbar (matching CreateGoodsIssuesRequirement) */}
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 bg-white flex-wrap">
                            <div className="relative">
                                <Input
                                    placeholder="Search details..."
                                    className="h-8 text-xs w-52 bg-gray-50 border-gray-200"
                                    value={searchText}
                                    onChange={e => setSearchText(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="sm" className="h-8 text-xs px-3">GO</Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 text-xs px-3 gap-1 text-gray-600 capitalize">
                                        Actions <ChevronDown className="w-3 h-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem className="text-xs">Columns</DropdownMenuItem>
                                    <DropdownMenuItem className="text-xs">Filter</DropdownMenuItem>
                                    <DropdownMenuItem className="text-xs">Export</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="w-px h-5 bg-gray-200 mx-1" />

                            <Button
                                variant="outline"
                                size="sm"
                                className={`h-8 text-xs px-3 gap-1.5 ${editMode ? 'border-blue-400 text-blue-600 bg-blue-50' : 'text-gray-600'}`}
                                onClick={() => setEditMode(!editMode)}
                            >
                                <Edit3 className="w-3 h-3" /> Edit
                            </Button>

                            <Button size="sm" className="h-8 text-xs px-4 bg-black hover:bg-gray-800 text-white gap-1.5">
                                <Save className="w-3 h-3" /> Save
                            </Button>

                            <Button variant="outline" size="sm" className="h-8 text-xs px-3 gap-1.5 text-gray-600">
                                <Plus className="w-3 h-3" /> Add Row
                            </Button>

                            <Button variant="outline" size="sm" className="h-8 text-xs px-3 gap-1.5 text-red-600 hover:bg-red-50 border-gray-200">
                                <Trash2 className="w-3 h-3" /> Delete
                            </Button>

                            <Button variant="outline" size="sm" className="h-8 text-xs px-3 gap-1.5 ml-auto text-gray-600">
                                <RotateCcw className="w-3 h-3" /> Reset
                            </Button>
                        </div>

                        <div className="p-0">
                            <TabsContent value="details" className="m-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50 border-b">
                                                <th className="px-4 py-3 text-left font-bold text-gray-600 w-12 border-r uppercase text-[10px] tracking-wider">#</th>
                                                <th className="px-4 py-3 text-left font-bold text-gray-600 w-40 border-r uppercase text-[10px] tracking-wider">Mã vật tư</th>
                                                <th className="px-4 py-3 text-left font-bold text-gray-600 w-60 border-r uppercase text-[10px] tracking-wider">Tên vật tư</th>
                                                <th className="px-4 py-3 text-left font-bold text-gray-600 w-48 border-r uppercase text-[10px] tracking-wider">Số Lot/Serial</th>
                                                <th className="px-4 py-3 text-right font-bold text-gray-600 w-32 border-r uppercase text-[10px] tracking-wider">Đơn giá</th>
                                                <th className="px-4 py-3 text-center font-bold text-gray-600 w-24 border-r uppercase text-[10px] tracking-wider">ĐVT</th>
                                                <th className="px-4 py-3 text-right font-bold text-gray-600 w-28 border-r uppercase text-[10px] tracking-wider">SL Chứng từ</th>
                                                <th className="px-4 py-3 text-right font-bold text-gray-600 w-28 border-r uppercase text-[10px] tracking-wider">SL Thực xuất</th>
                                                <th className="px-4 py-3 text-center font-bold text-gray-600 w-20 uppercase text-[10px] tracking-wider"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-2 text-center border-r font-medium text-gray-400">1</td>
                                                <td className="px-4 py-2 border-r font-semibold text-blue-600">MAT-001</td>
                                                <td className="px-4 py-2 border-r text-gray-800">Thép tròn 10mm</td>
                                                <td className="px-4 py-2 border-r"><Input className="h-8 text-xs border-transparent hover:border-gray-200 focus:border-blue-400 bg-transparent" defaultValue="LOT-2025-001" /></td>
                                                <td className="px-4 py-2 border-r text-right tabular-nums">1,111,222</td>
                                                <td className="px-4 py-2 border-r text-center font-medium text-gray-600">KG</td>
                                                <td className="px-4 py-2 border-r"><Input className="h-8 text-xs text-right border-transparent hover:border-gray-200 focus:border-blue-400 bg-transparent tabular-nums" defaultValue="150" /></td>
                                                <td className="px-4 py-2 border-r text-right tabular-nums font-bold">150</td>
                                                <td className="px-4 py-2 text-center"><Button variant="ghost" size="icon" className="h-7 w-7 text-gray-300 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></Button></td>
                                            </tr>
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-2 text-center border-r font-medium text-gray-400">2</td>
                                                <td className="px-4 py-2 border-r font-semibold text-blue-600">MAT-045</td>
                                                <td className="px-4 py-2 border-r text-gray-800">Dây hàn 2.5mm</td>
                                                <td className="px-4 py-2 border-r"><Input className="h-8 text-xs border-transparent hover:border-gray-200 focus:border-blue-400 bg-transparent" defaultValue="LOT-2025-015" /></td>
                                                <td className="px-4 py-2 border-r text-right tabular-nums">1,111,222</td>
                                                <td className="px-4 py-2 border-r text-center font-medium text-gray-600">Roll</td>
                                                <td className="px-4 py-2 border-r"><Input className="h-8 text-xs text-right border-transparent hover:border-gray-200 focus:border-blue-400 bg-transparent tabular-nums" defaultValue="12" /></td>
                                                <td className="px-4 py-2 border-r text-right tabular-nums font-bold">12</td>
                                                <td className="px-4 py-2 text-center"><Button variant="ghost" size="icon" className="h-7 w-7 text-gray-300 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></Button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </TabsContent>

                            <TabsContent value="accounting" className="m-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse min-w-[1500px]">
                                        <thead>
                                            <tr className="bg-gray-50 border-b">
                                                <th className="px-4 py-3 text-left font-bold text-gray-600 w-12 border-r uppercase text-[10px] tracking-wider sticky left-0 bg-gray-50">#</th>
                                                <th className="px-4 py-3 text-left font-bold text-gray-600 w-32 border-r uppercase text-[10px] tracking-wider">Credit</th>
                                                <th className="px-4 py-3 text-left font-bold text-gray-600 w-32 border-r uppercase text-[10px] tracking-wider">Debit</th>
                                                <th className="px-4 py-3 text-right font-bold text-gray-600 w-40 border-r uppercase text-[10px] tracking-wider">Thành tiền</th>
                                                <th className="px-4 py-3 text-left font-bold text-gray-600 w-48 border-r uppercase text-[10px] tracking-wider">Cost Center</th>
                                                <th className="px-4 py-3 text-left font-bold text-gray-600 w-48 border-r uppercase text-[10px] tracking-wider">Cost Element</th>
                                                <th className="px-4 py-3 text-left font-bold text-gray-600 w-48 border-r uppercase text-[10px] tracking-wider">Product</th>
                                                <th className="px-4 py-3 text-left font-bold text-gray-600 w-48 border-r uppercase text-[10px] tracking-wider">Project</th>
                                                <th className="px-4 py-3 text-left font-bold text-gray-600 w-60 uppercase text-[10px] tracking-wider">Ghi chú</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-2 text-center border-r font-medium text-gray-400 sticky left-0 bg-white">1</td>
                                                <td className="px-4 py-2 border-r"><Input className="h-8 text-xs border-transparent hover:border-gray-200 focus:border-blue-400 bg-transparent font-medium" defaultValue="331" /></td>
                                                <td className="px-4 py-2 border-r"><Input className="h-8 text-xs border-transparent hover:border-gray-200 focus:border-blue-400 bg-transparent font-medium" defaultValue="" /></td>
                                                <td className="px-4 py-2 border-r text-right font-bold tabular-nums">15,000,000</td>
                                                <td className="px-4 py-2 border-r">CC01</td>
                                                <td className="px-4 py-2 border-r">CE01</td>
                                                <td className="px-4 py-2 border-r">LAPTOP</td>
                                                <td className="px-4 py-2 border-r">PRJ001</td>
                                                <td className="px-4 py-2 text-gray-500">Phải trả nhà cung cấp</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-2 text-center border-r font-medium text-gray-400 sticky left-0 bg-white">2</td>
                                                <td className="px-4 py-2 border-r"><Input className="h-8 text-xs border-transparent hover:border-gray-200 focus:border-blue-400 bg-transparent font-medium" defaultValue="" /></td>
                                                <td className="px-4 py-2 border-r"><Input className="h-8 text-xs border-transparent hover:border-gray-200 focus:border-blue-400 bg-transparent font-medium" defaultValue="632" /></td>
                                                <td className="px-4 py-2 border-r text-right font-bold tabular-nums">15,000,000</td>
                                                <td className="px-4 py-2 border-r">CC02</td>
                                                <td className="px-4 py-2 border-r">CE02</td>
                                                <td className="px-4 py-2 border-r">SERVICE</td>
                                                <td className="px-4 py-2 border-r">PRJ002</td>
                                                <td className="px-4 py-2 text-gray-500">Giá vốn hàng mua</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr className="bg-blue-50/50 font-bold">
                                                <td colSpan={3} className="px-4 py-2 text-right uppercase text-[10px] tracking-widest text-gray-500">Tổng cộng</td>
                                                <td className="px-4 py-2 text-right text-blue-700 tabular-nums border-r">30,000,000</td>
                                                <td colSpan={5}></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>

                {/* ── Page Footer ──────────────────────────────────────────────────── */}
                <div className="flex items-center justify-between px-6 py-3.5 border-t border-gray-200 bg-gray-50/50">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-6 text-xs font-semibold text-gray-600"
                        onClick={onClose}
                    >
                        Back
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-6 text-xs font-semibold text-blue-600 border-blue-200 bg-blue-50"
                        >
                            Save Draft
                        </Button>
                        <Button
                            size="sm"
                            className="h-9 px-8 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white"
                        >
                            {t.wmm.createGoodsIssue}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
