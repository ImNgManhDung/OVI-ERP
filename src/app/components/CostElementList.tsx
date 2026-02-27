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

interface CostElementRow {
  id: number;
  celId: string;
  coaId: string;
  lenId: string;
  celCode: string;
  celName: string;
  celDescription: string;
  parentCelId: string;
  level: number | string;
  celType: string;
  celClass: string;
  status: string;
  createdBy: string;
  createDate: string;
}

export default function CostElementList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  const [data, setData] = useState<CostElementRow[]>([
    {
      id: 1,
      celId: 'CEL-001',
      coaId: 'COA-001',
      lenId: 'LEN-001',
      celCode: 'CEL-LABOR-DIR',
      celName: 'Direct Labor',
      celDescription: 'Direct salaries and wages for production staff',
      parentCelId: '',
      level: 1,
      celType: 'Detail',
      celClass: 'Operating',
      status: 'Y',
      createdBy: 'admin',
      createDate: '2024-01-15'
    },
    {
      id: 2,
      celId: 'CEL-002',
      coaId: 'COA-001',
      lenId: 'LEN-001',
      celCode: 'CEL-LABOR-PROD',
      celName: 'Production Labor',
      celDescription: 'Labor costs for production department',
      parentCelId: 'CEL-001',
      level: 2,
      celType: 'Summary',
      celClass: 'Operating',
      status: 'Y',
      createdBy: 'admin',
      createDate: '2024-01-16'
    },
    {
      id: 3,
      celId: 'CEL-003',
      coaId: 'COA-002',
      lenId: 'LEN-002',
      celCode: 'CEL-UTILITY-IND',
      celName: 'Utilities Indirect',
      celDescription: 'Electricity, water and heating costs for office',
      parentCelId: '',
      level: 1,
      celType: 'Detail',
      celClass: 'Overhead',
      status: 'Y',
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
    const newRow: CostElementRow = {
      id: Date.now(),
      celId: '',
      coaId: '',
      lenId: '',
      celCode: '',
      celName: '',
      celDescription: '',
      parentCelId: '',
      level: '',
      celType: 'Detail',
      celClass: '',
      status: 'Y',
      createdBy: '',
      createDate: ''
    };
    setData([...data, newRow]);
  };

  const handleDeleteRows = () => {
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const updateRow = (id: number, field: keyof CostElementRow, value: any) => {
    setData(data.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const filteredData = data.filter(row => {
    const matchesSearch = searchText === '' || Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || row.status === selectedStatus;
    const matchesType = selectedType === 'all' || row.celType === selectedType;
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
          {'value':'Primary','label':'Primary'},
          {'value':'Secondary','label':'Secondary'},
        ]}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
      {/* Page Header */}
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Cost Element Management</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Master Data</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Cost Element</span>
          </nav>
        </div>

      <MasterDataToolbar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={handleAddRow}
        onDeleteRows={handleDeleteRows}
        onSave={() => console.log('Saving Cost Elements...')}
        selectedCount={selectedRows.length}
      />

      <div className="flex-1 overflow-hidden bg-white mx-6 mb-6 border rounded-lg shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full min-w-[2400px]">
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
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32 bg-[#f0f7ff] sticky left-12 z-20">Cost Element ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Chart of Account ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Legal Entity ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Cost Element Code</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Cost Element Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-80">Cost Element Description</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Parent Cost Element ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Level</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Cost Element Type</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Cost Element Class</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Status</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Created By</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-32">Create Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={14} className="px-3 py-12 text-center text-gray-500 bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>No cost elements found</span>
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
                      {row.celId}
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
                        value={row.celCode}
                        onChange={(e) => updateRow(row.id, 'celCode', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.celName}
                        onChange={(e) => updateRow(row.id, 'celName', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-medium"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.celDescription}
                        onChange={(e) => updateRow(row.id, 'celDescription', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-xs"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.parentCelId}
                        onChange={(e) => updateRow(row.id, 'parentCelId', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                        placeholder="CEL-XXX"
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
                      <Select
                        value={row.celType}
                        onValueChange={(value) => updateRow(row.id, 'celType', value)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
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
                        value={row.celClass}
                        onValueChange={(value) => updateRow(row.id, 'celClass', value)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Operating">Operating</SelectItem>
                          <SelectItem value="Overhead">Overhead</SelectItem>
                          <SelectItem value="Administrative">Administrative</SelectItem>
                          <SelectItem value="Financial">Financial</SelectItem>
                        </SelectContent>
                      </Select>
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