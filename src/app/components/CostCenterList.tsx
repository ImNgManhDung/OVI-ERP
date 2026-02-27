import { useState } from 'react';
import { Search } from 'lucide-react';
import { FilterPanel } from './FilterPanel';
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

interface CostCenterRow {
  id: number;
  cceId: string;
  coaId: string;
  lenId: string;
  depOunId: string;
  cceCode: string;
  cceName: string;
  cceDescription: string;
  cceType: string;
  cceClass: string;
  status: string;
  effectiveDateFrom: string;
  effectiveDateTo: string;
  createdBy: string;
  createDate: string;
}

export default function CostCenterList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  const [data, setData] = useState<CostCenterRow[]>([
    {
      id: 1,
      cceId: 'CCE-001',
      coaId: 'COA-001',
      lenId: 'LEN-001',
      depOunId: 'OUN-001',
      cceCode: 'CC-HR-GLOBAL',
      cceName: 'Human Resources Global',
      cceDescription: 'General HR costs for the entire organization',
      cceType: 'Detail',
      cceClass: 'Administrative',
      status: 'Y',
      effectiveDateFrom: '2025-01-01',
      effectiveDateTo: '2026-12-31',
      createdBy: 'admin',
      createDate: '2024-01-15'
    },
    {
      id: 2,
      cceId: 'CCE-002',
      coaId: 'COA-001',
      lenId: 'LEN-001',
      depOunId: 'OUN-002',
      cceCode: 'CC-IT-INFRA',
      cceName: 'IT Infrastructure',
      cceDescription: 'Costs related to IT server and network infrastructure',
      cceType: 'Summary',
      cceClass: 'Technical',
      status: 'Y',
      effectiveDateFrom: '2025-01-01',
      effectiveDateTo: '2027-12-31',
      createdBy: 'admin',
      createDate: '2024-01-16'
    },
    {
      id: 3,
      cceId: 'CCE-003',
      coaId: 'COA-002',
      lenId: 'LEN-002',
      depOunId: 'OUN-003',
      cceCode: 'CC-PROD-MANU',
      cceName: 'Production Manufacturing',
      cceDescription: 'Manufacturing and production costs',
      cceType: 'Detail',
      cceClass: 'Operational',
      status: 'Y',
      effectiveDateFrom: '2024-01-01',
      effectiveDateTo: '2028-12-31',
      createdBy: 'admin',
      createDate: '2024-02-01'
    }
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddRow = () => {
    const newRow: CostCenterRow = {
      id: Date.now(),
      cceId: '',
      coaId: '',
      lenId: '',
      depOunId: '',
      cceCode: '',
      cceName: '',
      cceDescription: '',
      cceType: 'Detail',
      cceClass: '',
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

  const updateRow = (id: number, field: keyof CostCenterRow, value: any) => {
    setData(data.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const filteredData = data.filter(row => {
    const matchesSearch = searchText === '' || Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || row.status === selectedStatus;
    const matchesType = selectedType === 'all' || row.cceType === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Filter Panel */}
      <FilterPanel
        searchValue={searchText}
        onSearchChange={setSearchText}
        showStatus={true}
        statusOptions={[
          { value: 'all', label: 'All Status' },
          { value: 'Y', label: 'Active' },
          { value: 'N', label: 'Inactive' },
          { value: 'Yes', label: 'Active' },
          { value: 'No', label: 'Inactive' },
        ]}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        showType={true}
        typeOptions={[
          {'value':'all','label':'All Types'},
          {'value':'Detail','label':'Detail'},
          {'value':'Summary','label':'Summary'},
          {'value':'Heading','label':'Heading'},
        ]}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
      {/* Page Header */}
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Cost Center Management</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Master Data</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Cost Center</span>
          </nav>
        </div>

      <MasterDataToolbar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={handleAddRow}
        onDeleteRows={handleDeleteRows}
        onSave={() => console.log('Saving Cost Centers...')}
        selectedCount={selectedRows.length}
      />

      <div className="flex-1 overflow-hidden bg-white mx-6 mb-6 border rounded-lg shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm min-w-[2600px]">
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
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32 bg-[#f0f7ff] sticky left-12 z-20">Cost Center ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Chart of Account ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Legal Entity ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Department Organization Unit ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Cost Center Code</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Cost Center Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-80">Cost Center Description</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Cost Center Type</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Cost Center Class</th>
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
                  <td colSpan={15} className="px-3 py-12 text-center text-sm text-gray-500 bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>No cost centers found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-blue-50/30 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-inherit sticky left-0 z-10">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r bg-inherit sticky left-12 z-10 text-sm font-medium text-blue-600">
                      {row.cceId}
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.coaId}
                        onChange={(e) => updateRow(row.id, 'coaId', e.target.value)}
                        className="h-7 text-sm border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                        placeholder="COA-XXX"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.lenId}
                        onChange={(e) => updateRow(row.id, 'lenId', e.target.value)}
                        className="h-7 text-sm border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                        placeholder="LEN-XXX"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.depOunId}
                        onChange={(e) => updateRow(row.id, 'depOunId', e.target.value)}
                        className="h-7 text-sm border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                        placeholder="OUN-XXX"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.cceCode}
                        onChange={(e) => updateRow(row.id, 'cceCode', e.target.value)}
                        className="h-7 text-sm border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.cceName}
                        onChange={(e) => updateRow(row.id, 'cceName', e.target.value)}
                        className="h-7 text-sm border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-medium"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.cceDescription}
                        onChange={(e) => updateRow(row.id, 'cceDescription', e.target.value)}
                        className="h-7 text-sm border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-xs"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Select
                        value={row.cceType}
                        onValueChange={(value) => updateRow(row.id, 'cceType', value)}
                      >
                        <SelectTrigger className="h-7 text-sm border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Detail">Detail</SelectItem>
                          <SelectItem value="Summary">Summary</SelectItem>
                          <SelectItem value="Heading">Heading</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Select
                        value={row.cceClass}
                        onValueChange={(value) => updateRow(row.id, 'cceClass', value)}
                      >
                        <SelectTrigger className="h-7 text-sm border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Administrative">Administrative</SelectItem>
                          <SelectItem value="Technical">Technical</SelectItem>
                          <SelectItem value="Operational">Operational</SelectItem>
                          <SelectItem value="Support">Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Select
                        value={row.status}
                        onValueChange={(value) => updateRow(row.id, 'status', value)}
                      >
                        <SelectTrigger className="h-7 text-sm border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
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
                        className="h-7 text-sm border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-xs"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        type="date"
                        value={row.effectiveDateTo}
                        onChange={(e) => updateRow(row.id, 'effectiveDateTo', e.target.value)}
                        className="h-7 text-sm border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-xs"
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

        <div className="bg-white border-t px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredData.length}</span> records
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}