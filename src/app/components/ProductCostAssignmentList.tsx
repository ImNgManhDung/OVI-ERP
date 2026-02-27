import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import MasterDataToolbar from './MasterDataToolbar';

interface ProductCostAssignmentRow {
  id: number;
  pcaId: string;
  pcaCode: string;
  pcaName: string;
  pcaType: string;
  pcaClass: string;
  coaId: string;
  lenId: string;
  parentPcaId: string;
  level: number | string;
  matId: string;
  porId: string;
  referenceName: string;
  status: string;
  effectiveDateFrom: string;
  effectiveDateTo: string;
  createdBy: string;
  createDate: string;
}

export default function ProductCostAssignmentList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  const [data, setData] = useState<ProductCostAssignmentRow[]>([
    {
      id: 1,
      pcaId: 'PCA-001',
      pcaCode: 'PO-001',
      pcaName: 'Laptop Assembly Line A',
      pcaType: 'Production Order',
      pcaClass: 'Labor',
      coaId: 'COA-001',
      lenId: 'LEN-001',
      parentPcaId: '',
      level: 1,
      matId: 'MAT-001',
      porId: 'POR-001',
      referenceName: 'Laptop Model X Production',
      status: 'Y',
      effectiveDateFrom: '2024-01-01',
      effectiveDateTo: '2025-12-31',
      createdBy: 'admin',
      createDate: '2024-01-15'
    },
    {
      id: 2,
      pcaId: 'PCA-002',
      pcaCode: 'FG-001',
      pcaName: 'Laptop Model X - Finished Goods',
      pcaType: 'Finished Product',
      pcaClass: 'Material',
      coaId: 'COA-001',
      lenId: 'LEN-001',
      parentPcaId: 'PCA-001',
      level: 2,
      matId: 'MAT-002',
      porId: 'POR-001',
      referenceName: 'Completed laptop units ready for sale',
      status: 'Y',
      effectiveDateFrom: '2024-02-01',
      effectiveDateTo: '2025-12-31',
      createdBy: 'admin',
      createDate: '2024-01-16'
    },
    {
      id: 3,
      pcaId: 'PCA-003',
      pcaCode: 'SF-001',
      pcaName: 'Laptop Motherboard Assembly',
      pcaType: 'Semi-Finished',
      pcaClass: 'Equipment',
      coaId: 'COA-002',
      lenId: 'LEN-002',
      parentPcaId: '',
      level: 1,
      matId: 'MAT-003',
      porId: 'POR-002',
      referenceName: 'Semi-finished motherboard component',
      status: 'Y',
      effectiveDateFrom: '2024-03-01',
      effectiveDateTo: '2026-03-31',
      createdBy: 'admin',
      createDate: '2024-02-01'
    },
    {
      id: 4,
      pcaId: 'PCA-004',
      pcaCode: 'WIP-001',
      pcaName: 'Laptop Final Assembly WIP',
      pcaType: 'WIP',
      pcaClass: 'Machinery',
      coaId: 'COA-001',
      lenId: 'LEN-001',
      parentPcaId: 'PCA-001',
      level: 2,
      matId: 'MAT-004',
      porId: 'POR-001',
      referenceName: 'Work in progress - final assembly stage',
      status: 'Y',
      effectiveDateFrom: '2024-01-15',
      effectiveDateTo: '2025-12-31',
      createdBy: 'admin',
      createDate: '2024-01-20'
    }
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddRow = () => {
    const newRow: ProductCostAssignmentRow = {
      id: Date.now(),
      pcaId: '',
      pcaCode: '',
      pcaName: '',
      pcaType: 'Production Order',
      pcaClass: '',
      coaId: '',
      lenId: '',
      parentPcaId: '',
      level: '',
      matId: '',
      porId: '',
      referenceName: '',
      status: 'Y',
      effectiveDateFrom: '',
      effectiveDateTo: '',
      createdBy: '',
      createDate: ''
    };
    setData([...data, newRow]);
  };

  const handleDeleteRows = () => {
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const updateRow = (id: number, field: keyof ProductCostAssignmentRow, value: any) => {
    setData(data.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const filteredData = data.filter(row =>
    searchText === '' ||
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 uppercase tracking-tight">Product Cost Assignments</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage product cost assignments with production orders and material references
        </p>
      </div>

      <MasterDataToolbar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={handleAddRow}
        onDeleteRows={handleDeleteRows}
        onSave={() => console.log('Saving Product Cost Assignments...')}
        selectedCount={selectedRows.length}
      />

      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm min-w-[3200px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#f0f7ff] border-b">
                <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-20">
                  <Checkbox 
                    checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) setSelectedRows(filteredData.map(r => r.id));
                      else setSelectedRows([]);
                    }}
                  />
                </th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32 bg-[#f0f7ff] sticky left-12 z-20">Product Cost Assignment ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Product Cost Assignment Code</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Product Cost Assignment Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Product Cost Assignment Type</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Product Cost Assignment Class</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Chart of Account ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Legal Entity ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Parent Product Cost Assignment ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Level</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Material ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Production Order ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-80">Reference Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Status</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Effective Date From</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Effective Date To</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Created By</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-32">Create Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={18} className="px-3 py-12 text-center text-gray-500 bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>No product cost assignments found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-blue-50/50 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-inherit sticky left-0 z-10">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r bg-inherit sticky left-12 z-10 font-bold text-blue-600">
                      {row.pcaId}
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.pcaCode}
                        onChange={(e) => updateRow(row.id, 'pcaCode', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.pcaName}
                        onChange={(e) => updateRow(row.id, 'pcaName', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-medium"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Select
                        value={row.pcaType}
                        onValueChange={(value) => updateRow(row.id, 'pcaType', value)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Production Order">Production Order</SelectItem>
                          <SelectItem value="Finished Product">Finished Product</SelectItem>
                          <SelectItem value="Semi-Finished">Semi-Finished</SelectItem>
                          <SelectItem value="WIP">WIP</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Select
                        value={row.pcaClass}
                        onValueChange={(value) => updateRow(row.id, 'pcaClass', value)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Labor">Labor</SelectItem>
                          <SelectItem value="Material">Material</SelectItem>
                          <SelectItem value="Equipment">Equipment</SelectItem>
                          <SelectItem value="Machinery">Machinery</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.coaId}
                        onChange={(e) => updateRow(row.id, 'coaId', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                        placeholder="COA-XXX"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.lenId}
                        onChange={(e) => updateRow(row.id, 'lenId', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                        placeholder="LEN-XXX"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.parentPcaId}
                        onChange={(e) => updateRow(row.id, 'parentPcaId', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                        placeholder="PCA-XXX"
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Input
                        type="number"
                        value={row.level}
                        onChange={(e) => updateRow(row.id, 'level', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-center font-semibold"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.matId}
                        onChange={(e) => updateRow(row.id, 'matId', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                        placeholder="MAT-XXX"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.porId}
                        onChange={(e) => updateRow(row.id, 'porId', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                        placeholder="POR-XXX"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.referenceName}
                        onChange={(e) => updateRow(row.id, 'referenceName', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-xs"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Select
                        value={row.status}
                        onValueChange={(value) => updateRow(row.id, 'status', value)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Y">Active</SelectItem>
                          <SelectItem value="N">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        type="date"
                        value={row.effectiveDateFrom}
                        onChange={(e) => updateRow(row.id, 'effectiveDateFrom', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-xs"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        type="date"
                        value={row.effectiveDateTo}
                        onChange={(e) => updateRow(row.id, 'effectiveDateTo', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-xs"
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-xs text-gray-600">
                      {row.createdBy}
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-600">
                      {row.createDate}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between text-xs text-gray-600">
          <div>
            Showing <span className="font-semibold">{filteredData.length}</span> of <span className="font-semibold">{data.length}</span> product cost assignments
          </div>
          <div className="flex items-center gap-4">
            <span>{selectedRows.length} selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
