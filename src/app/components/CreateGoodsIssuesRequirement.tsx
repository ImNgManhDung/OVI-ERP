import { useState } from 'react';
import { X, Plus, Trash2, Edit3, Save, ChevronDown, RotateCcw, RefreshCw } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner';
import { useLanguage } from '../i18n/LanguageContext';

interface CreateGoodsIssuesRequirementProps {
  onClose: () => void;
}

interface IGSRDRow {
  id: number;
  sip: number;
  sourceDocCode: string;
  lineType: string;
  materialCode: string;
  unitOfMeasure: string;
  materialLOT: string;
  stores: string;
  storesArea: string;
  docQuantity: number | '';
  approvedQuantity: number | '';
  price: number | '';
}

// ── Reusable field components ─────────────────────────────────────────────────

const FieldLabel = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="block text-xs font-medium text-gray-500 mb-1">
    {required && <span className="text-red-500 mr-0.5">*</span>}
    {children}
  </label>
);

const FormBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border border-gray-200 rounded-md p-4 bg-white">
    <h3 className="text-xs font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
      {title}
    </h3>
    {children}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

export default function CreateGoodsIssuesRequirement({ onClose }: CreateGoodsIssuesRequirementProps) {
  const [mainTab, setMainTab] = useState('main-info');
  const [confirmed, setConfirmed] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [igsrdRows, setIgsrdRows] = useState<IGSRDRow[]>([]);
  const { t } = useLanguage();

  const handleAddRow = () => {
    const newRow: IGSRDRow = {
      id: Date.now(),
      sip: igsrdRows.length + 1,
      sourceDocCode: '',
      lineType: '',
      materialCode: '',
      unitOfMeasure: '',
      materialLOT: '',
      stores: '',
      storesArea: '',
      docQuantity: '',
      approvedQuantity: '',
      price: '',
    };
    setIgsrdRows(prev => [...prev, newRow]);
    setEditMode(true);
  };

  const handleDeleteRows = () => {
    if (selectedRows.length === 0) return;
    setIgsrdRows(prev => prev.filter(r => !selectedRows.includes(r.id)));
    setSelectedRows([]);
    toast.success('Deleted selected row(s)');
  };

  const handleReset = () => {
    setIgsrdRows([]);
    setSelectedRows([]);
    setEditMode(false);
  };

  const toggleRow = (id: number) =>
    setSelectedRows(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const toggleAll = () =>
    setSelectedRows(selectedRows.length === igsrdRows.length ? [] : igsrdRows.map(r => r.id));

  const updateCell = (id: number, field: keyof IGSRDRow, value: string | number) => {
    setIgsrdRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleSave = () => {
    setEditMode(false);
    toast.success('Saved successfully');
  };

  const handleCreate = () => {
    toast.success('Goods Issues Requirement created successfully');
    onClose();
  };

  const filteredRows = igsrdRows.filter(row =>
    searchText === '' ||
    Object.values(row).some(v => String(v).toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div className="min-h-screen overflow-x-auto" style={{ backgroundColor: '#f1f5f9', padding: '24px' }}>
      <div className="bg-white rounded-lg shadow-sm" style={{ minWidth: '1552px' }}>

        {/* ── Document Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-800">{t.wmm.createGoodsIssuesTitle}</h2>
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
            {['main-info', 'approval-info'].map((tab, i) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 text-xs px-4 py-2.5"
              >
                {i === 0 ? t.wmm.mainInfo : t.wmm.approvalInfo}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── MAIN INFO TAB ─────────────────────────────────────────── */}
          <TabsContent value="main-info" className="p-5">

            {/* 3-column form blocks */}
            <div className="grid grid-cols-3 gap-4 mb-5">

              {/* Block 1: Proposal Information */}
              <FormBlock title={t.wmm.proposalInfo}>
                {/* Row 1: Document Type | Transaction Type | Request Number */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>{t.wmm.documentType}</FieldLabel>
                    <Select defaultValue="issues-req">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="issues-req">Issues Requirement</SelectItem>
                        <SelectItem value="receipt-req">Receipt Requirement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel required>{t.wmm.transactionType}</FieldLabel>
                    <Select defaultValue="yeu-cau-xuat-kho">
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yeu-cau-xuat-kho">Yêu cầu xuất kho</SelectItem>
                        <SelectItem value="xuat-kho-khan">Xuất kho khẩn</SelectItem>
                        <SelectItem value="xuat-noi-bo">Xuất nội bộ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>{t.wmm.requestNumberLabel}</FieldLabel>
                    <Input
                      className="h-8 text-xs bg-gray-50"
                      defaultValue="IR_2602_00003"
                      readOnly
                    />
                  </div>
                </div>

                {/* Row 2: Request Date | Required Date */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <FieldLabel>{t.wmm.requestDateLabel}</FieldLabel>
                    <Input type="date" className="h-8 text-xs" defaultValue="2026-02-25" />
                  </div>
                  <div>
                    <FieldLabel required>{t.wmm.requiredDateLabel}</FieldLabel>
                    <Input type="date" className="h-8 text-xs bg-red-50 border-red-200" defaultValue="2026-02-25" />
                  </div>
                </div>

                {/* Row 3: Reason */}
                <div>
                  <FieldLabel>{t.wmm.reasonLabel}</FieldLabel>
                  <Input className="h-8 text-xs" placeholder="..." />
                </div>
              </FormBlock>

              {/* Block 2: Proposer & Approver */}
              <FormBlock title={t.wmm.proposerApprover}>
                {/* Row 1: Requestor | Dept From | Dept To */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <FieldLabel>{t.wmm.requestorLabel}</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="Search..." />
                  </div>
                  <div>
                    <FieldLabel>{t.wmm.deptFromLabel}</FieldLabel>
                    <Select defaultValue="van-phong">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="van-phong">Văn Phòng</SelectItem>
                        <SelectItem value="san-xuat">Sản Xuất</SelectItem>
                        <SelectItem value="ky-thuat">Kỹ Thuật</SelectItem>
                        <SelectItem value="bao-tri">Bảo Trì</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>{t.wmm.deptToLabel}</FieldLabel>
                    <Select defaultValue="van-phong">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="van-phong">Văn Phòng</SelectItem>
                        <SelectItem value="san-xuat">Sản Xuất</SelectItem>
                        <SelectItem value="ky-thuat">Kỹ Thuật</SelectItem>
                        <SelectItem value="bao-tri">Bảo Trì</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 2: Confirmed toggle | Status */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel>{t.wmm.confirmedLabel}</FieldLabel>
                    <div className="flex items-center h-8">
                      <Switch
                        checked={confirmed}
                        onCheckedChange={setConfirmed}
                      />
                    </div>
                  </div>
                  <div>
                    <FieldLabel required>{t.wmm.statusLabel}</FieldLabel>
                    <Select defaultValue="unprocessed">
                      <SelectTrigger className="h-8 text-xs bg-red-50 border-red-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unprocessed">Unprocessed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </FormBlock>

              {/* Block 3: Subject Receiving Goods */}
              <FormBlock title={t.wmm.subjectReceivingGoods}>
                {/* Row: Object Code | Object Name | Address */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <FieldLabel>{t.wmm.objectCode}</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="obj-001">OBJ-001</SelectItem>
                        <SelectItem value="obj-002">OBJ-002</SelectItem>
                        <SelectItem value="obj-003">OBJ-003</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>{t.wmm.objectName}</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="" />
                  </div>
                  <div>
                    <FieldLabel>{t.wmm.address}</FieldLabel>
                    <Input className="h-8 text-xs" placeholder="" />
                  </div>
                </div>
              </FormBlock>
            </div>

            {/* ── IG_SRD Detail Section ─────────────────────────────── */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              {/* Tab label row */}
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-0">
                <button
                  className="text-xs font-semibold px-3 py-2.5 border-b-2 border-blue-600 text-blue-600 bg-white"
                >
                  IG_SRD
                </button>
              </div>

              {/* Inline toolbar */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 bg-white flex-wrap">
                {/* Search */}
                <div className="relative">
                  <Input
                    placeholder={t.wmm.searchAllColumns}
                    className="h-8 text-xs w-52 bg-gray-50 border-gray-200"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                  />
                </div>

                <Button variant="outline" size="sm" className="h-8 text-xs px-3">{t.wmm.go}</Button>

                {/* Actions dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 text-xs px-3 gap-1">
                      {t.wmm.actions} <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem className="text-xs">{t.wmm.columns}</DropdownMenuItem>
                    <DropdownMenuItem className="text-xs">{t.wmm.filter}</DropdownMenuItem>
                    <DropdownMenuItem className="text-xs">{t.wmm.export}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="w-px h-5 bg-gray-200" />

                {/* Special match actions */}
                {[
                  t.wmm.matchPurchaseContract,
                  t.wmm.matchPurchaseOrder,
                  t.wmm.matchProductionPlan,
                  t.wmm.matchInventory,
                ].map(label => (
                  <Button
                    key={label}
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs px-2.5 border-gray-200 text-gray-600 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 whitespace-nowrap"
                    onClick={() => toast.info(`${label}`)}
                  >
                    {label}
                  </Button>
                ))}

                <div className="w-px h-5 bg-gray-200" />

                {/* Edit */}
                <Button
                  variant="outline"
                  size="sm"
                  className={`h-8 text-xs px-3 gap-1.5 ${editMode ? 'border-blue-400 text-blue-600 bg-blue-50' : ''}`}
                  onClick={() => setEditMode(!editMode)}
                >
                  <Edit3 className="w-3 h-3" /> {t.wmm.edit}
                </Button>

                {/* Save */}
                <Button
                  size="sm"
                  className="h-8 text-xs px-4 bg-black hover:bg-gray-800 text-white gap-1.5"
                  onClick={handleSave}
                >
                  <Save className="w-3 h-3" /> {t.wmm.save}
                </Button>

                {/* Add Row */}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs px-3 gap-1.5"
                  onClick={handleAddRow}
                >
                  <Plus className="w-3 h-3" /> {t.wmm.addRow}
                </Button>

                {/* Delete */}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs px-3 gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 border-gray-200"
                  onClick={handleDeleteRows}
                  disabled={selectedRows.length === 0}
                >
                  <Trash2 className="w-3 h-3" /> {t.wmm.delete}
                </Button>

                {/* Reset */}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs px-3 gap-1.5 ml-auto"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-3 h-3" /> {t.wmm.reset}
                </Button>
              </div>

              {/* Detail Table */}
              <div className="overflow-x-auto">
                <table className="w-full erp-table" style={{ minWidth: '1200px' }}>
                  <thead>
                    <tr>
                      <th className="w-10 text-center">
                        <Checkbox
                          checked={igsrdRows.length > 0 && selectedRows.length === igsrdRows.length}
                          onCheckedChange={toggleAll}
                        />
                      </th>
                      <th className="text-left w-12">{t.wmm.sip}</th>
                      <th className="text-left">{t.wmm.sourceDocCode}</th>
                      <th className="text-left">{t.wmm.lineType}</th>
                      <th className="text-left">{t.wmm.materialCode}</th>
                      <th className="text-left">{t.wmm.uom}</th>
                      <th className="text-left">{t.wmm.materialLot}</th>
                      <th className="text-left">{t.wmm.stores}</th>
                      <th className="text-left">{t.wmm.storeArea}</th>
                      <th className="text-right">{t.wmm.docQuantity}</th>
                      <th className="text-right">{t.wmm.approvedQuantity}</th>
                      <th className="text-right">{t.wmm.price}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.length === 0 ? (
                      <tr>
                        <td colSpan={12} className="text-center py-12">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <RefreshCw className="w-4 h-4 text-gray-300" />
                            </div>
                            <span className="text-xs text-gray-400">{t.wmm.noDataFound}</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredRows.map(row => (
                        <tr
                          key={row.id}
                          className={selectedRows.includes(row.id) ? 'selected' : ''}
                        >
                          <td className="text-center" onClick={e => e.stopPropagation()}>
                            <Checkbox
                              checked={selectedRows.includes(row.id)}
                              onCheckedChange={() => toggleRow(row.id)}
                            />
                          </td>
                          <td className="text-gray-500 tabular-nums">{row.sip}</td>

                          {editMode ? (
                            <>
                              <td><Input className="h-7 text-xs w-28" value={row.sourceDocCode} onChange={e => updateCell(row.id, 'sourceDocCode', e.target.value)} /></td>
                              <td>
                                <Select value={row.lineType} onValueChange={v => updateCell(row.id, 'lineType', v)}>
                                  <SelectTrigger className="h-7 text-xs w-28"><SelectValue placeholder="Select..." /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="standard">Standard</SelectItem>
                                    <SelectItem value="return">Return</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td><Input className="h-7 text-xs w-28" value={row.materialCode} onChange={e => updateCell(row.id, 'materialCode', e.target.value)} placeholder="MAT-XXXX" /></td>
                              <td>
                                <Select value={row.unitOfMeasure} onValueChange={v => updateCell(row.id, 'unitOfMeasure', v)}>
                                  <SelectTrigger className="h-7 text-xs w-20"><SelectValue placeholder="Unit" /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pcs">pcs</SelectItem>
                                    <SelectItem value="kg">kg</SelectItem>
                                    <SelectItem value="L">L</SelectItem>
                                    <SelectItem value="m">m</SelectItem>
                                    <SelectItem value="set">set</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td><Input className="h-7 text-xs w-24" value={row.materialLOT} onChange={e => updateCell(row.id, 'materialLOT', e.target.value)} /></td>
                              <td>
                                <Select value={row.stores} onValueChange={v => updateCell(row.id, 'stores', v)}>
                                  <SelectTrigger className="h-7 text-xs w-28"><SelectValue placeholder="Stores" /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="wh-01">WH-01 Hà Nội</SelectItem>
                                    <SelectItem value="wh-02">WH-02 HCM</SelectItem>
                                    <SelectItem value="wh-03">WH-03 Đà Nẵng</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td><Input className="h-7 text-xs w-24" value={row.storesArea} onChange={e => updateCell(row.id, 'storesArea', e.target.value)} /></td>
                              <td><Input type="number" className="h-7 text-xs w-24 text-right" value={row.docQuantity} onChange={e => updateCell(row.id, 'docQuantity', e.target.value === '' ? '' : Number(e.target.value))} /></td>
                              <td><Input type="number" className="h-7 text-xs w-24 text-right" value={row.approvedQuantity} onChange={e => updateCell(row.id, 'approvedQuantity', e.target.value === '' ? '' : Number(e.target.value))} /></td>
                              <td><Input type="number" className="h-7 text-xs w-28 text-right" value={row.price} onChange={e => updateCell(row.id, 'price', e.target.value === '' ? '' : Number(e.target.value))} /></td>
                            </>
                          ) : (
                            <>
                              <td className="text-gray-600">{row.sourceDocCode || <span className="text-gray-300">—</span>}</td>
                              <td className="text-gray-600">{row.lineType || <span className="text-gray-300">—</span>}</td>
                              <td className="font-medium text-blue-600">{row.materialCode || <span className="text-gray-300 font-normal">—</span>}</td>
                              <td className="text-gray-600">{row.unitOfMeasure || <span className="text-gray-300">—</span>}</td>
                              <td className="text-gray-600">{row.materialLOT || <span className="text-gray-300">—</span>}</td>
                              <td className="text-gray-600">{row.stores || <span className="text-gray-300">—</span>}</td>
                              <td className="text-gray-600">{row.storesArea || <span className="text-gray-300">—</span>}</td>
                              <td className="text-right tabular-nums text-gray-700">{row.docQuantity !== '' ? row.docQuantity.toLocaleString() : <span className="text-gray-300">—</span>}</td>
                              <td className="text-right tabular-nums text-gray-700">{row.approvedQuantity !== '' ? row.approvedQuantity.toLocaleString() : <span className="text-gray-300">—</span>}</td>
                              <td className="text-right tabular-nums text-gray-700">{row.price !== '' ? Number(row.price).toLocaleString() : <span className="text-gray-300">—</span>}</td>
                            </>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Detail table footer */}
              <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/50">
                <span className="text-xs text-gray-400">
                  {igsrdRows.length} row(s)
                  {selectedRows.length > 0 && ` · ${selectedRows.length} selected`}
                </span>
              </div>
            </div>

          </TabsContent>

          {/* ── APPROVAL INFO TAB ─────────────────────────────────────── */}
          <TabsContent value="approval-info" className="p-5">

            {/* Approval Workflow Selector */}
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-gray-700 mb-3">Approval Workflow</h3>
              <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <FieldLabel required>Approval Workflow</FieldLabel>
                    <Select defaultValue="WF02">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WF01">WF01 - Standard Approval</SelectItem>
                        <SelectItem value="WF02">WF02 - Warehouse Issue Approval</SelectItem>
                        <SelectItem value="WF03">WF03 - Department Head Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <FieldLabel>Workflow Description</FieldLabel>
                    <Input
                      className="h-8 text-xs bg-white"
                      value="Level 1: Warehouse Manager → Level 2: Production Director"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-level Approval Table */}
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-gray-700 mb-3">Thông tin phê duyệt đa cấp</h3>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full erp-table">
                  <thead>
                    <tr>
                      <th className="text-left">Level</th>
                      <th className="text-left">Approver</th>
                      <th className="text-left">Position</th>
                      <th className="text-left">Approval Date</th>
                      <th className="text-left">Comments</th>
                      <th className="text-center">Status</th>
                      <th className="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-medium">Level 1</td>
                      <td>Trần Văn Bình</td>
                      <td className="text-gray-500">Warehouse Manager</td>
                      <td className="text-gray-500 tabular-nums">25/02/2026</td>
                      <td className="text-gray-500">Đồng ý xuất kho</td>
                      <td className="text-center">
                        <span className="erp-badge-success">Approved</span>
                      </td>
                      <td>
                        <Select disabled>
                          <SelectTrigger className="h-7 w-28 text-xs">
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
                      <td className="font-medium">Level 2</td>
                      <td>Lê Thị Cẩm</td>
                      <td className="text-gray-500">Production Director</td>
                      <td className="text-gray-500">—</td>
                      <td className="text-gray-500">—</td>
                      <td className="text-center">
                        <span className="erp-badge-warning">Pending</span>
                      </td>
                      <td>
                        <Select>
                          <SelectTrigger className="h-7 w-28 text-xs">
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

            {/* Activity Log */}
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-gray-700 mb-3">Lịch sử thao tác</h3>
              <div className="border border-gray-200 rounded-md p-4 bg-gray-50 space-y-3">
                {[
                  { dot: '#3b82f6', title: 'Tạo phiếu yêu cầu xuất kho',     by: 'Lê Quang Cường — 25/02/2026  08:45' },
                  { dot: '#22c55e', title: 'Gửi phê duyệt Level 1',           by: 'Lê Quang Cường — 25/02/2026  09:10' },
                  { dot: '#22c55e', title: 'Phê duyệt Level 1 — Đồng ý',      by: 'Trần Văn Bình — 25/02/2026  10:30' },
                  { dot: '#eab308', title: 'Chờ phê duyệt Level 2',           by: 'Đang chờ xử lý' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                      style={{ backgroundColor: item.dot }} />
                    <div>
                      <p className="text-xs font-medium text-gray-700">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.by}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-gray-200 bg-gray-50/50">
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-6 text-xs font-semibold"
            onClick={onClose}
          >
            Back
          </Button>
          <Button
            size="sm"
            className="h-9 px-8 text-xs font-semibold"
            style={{ backgroundColor: '#1d4ed8' }}
            onClick={handleCreate}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}