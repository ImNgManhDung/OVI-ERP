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

interface ProjectAssignmentRow {
  id: number;
  pasId: string;
  pasCode: string;
  pasName: string;
  pasType: string;
  pasClass: string;
  coaId: string;
  lenId: string;
  parentPasId: string;
  level: number | string;
  pbdId: string;
  projId: string;
  referenceName: string;
  status: string;
  effectiveDateFrom: string;
  effectiveDateTo: string;
  createdBy: string;
  createDate: string;
}

export default function ProjectAssignmentList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  const [data, setData] = useState<ProjectAssignmentRow[]>([
    {
      id: 1,
      pasId: 'PAS-001',
      pasCode: 'PRJ-001',
      pasName: 'Infrastructure Development Phase 1',
      pasType: 'Project',
      pasClass: 'Labor',
      coaId: 'COA-001',
      lenId: 'LEN-001',
      parentPasId: '',
      level: 1,
      pbdId: 'PBD-001',
      projId: 'PROJ-001',
      referenceName: 'Foundation & Structure Works',
      status: 'Y',
      effectiveDateFrom: '2024-01-01',
      effectiveDateTo: '2025-12-31',
      createdBy: 'admin',
      createDate: '2024-01-15'
    },
    {
      id: 2,
      pasId: 'PAS-002',
      pasCode: 'WBS-001',
      pasName: 'Concrete & Steel Installation',
      pasType: 'WBS',
      pasClass: 'Material',
      coaId: 'COA-001',
      lenId: 'LEN-001',
      parentPasId: 'PAS-001',
      level: 2,
      pbdId: 'PBD-002',
      projId: 'PROJ-001',
      referenceName: 'Material procurement for foundation',
      status: 'Y',
      effectiveDateFrom: '2024-02-01',
      effectiveDateTo: '2025-06-30',
      createdBy: 'admin',
      createDate: '2024-01-16'
    },
    {
      id: 3,
      pasId: 'PAS-003',
      pasCode: 'PRJ-002',
      pasName: 'ERP System Implementation',
      pasType: 'Project',
      pasClass: 'Equipment',
      coaId: 'COA-002',
      lenId: 'LEN-002',
      parentPasId: '',
      level: 1,
      pbdId: 'PBD-003',
      projId: 'PROJ-002',
      referenceName: 'ERP Software License & Hardware',
      status: 'Y',
      effectiveDateFrom: '2024-03-01',
      effectiveDateTo: '2026-03-31',
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
    const newRow: ProjectAssignmentRow = {
      id: Date.now(),
      pasId: '',
      pasCode: '',
      pasName: '',
      pasType: 'Project',
      pasClass: '',
      coaId: '',
      lenId: '',
      parentPasId: '',
      level: '',
      pbdId: '',
      projId: '',
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

  const updateRow = (id: number, field: keyof ProjectAssignmentRow, value: any) => {
    setData(data.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const filteredData = data.filter(row => {
    const matchesSearch = searchText === '' || Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || row.status === selectedStatus;
    const matchesType = selectedType === 'all' || row.pasType === selectedType;
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
          {'value':'Project','label':'Project'},
          {'value':'Phase','label':'Phase'},
          {'value':'Task','label':'Task'},
        ]}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
      {/* Page Header */}
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Project Assignment Management</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Master Data</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Project Assignment</span>
          </nav>
        </div>

      <MasterDataToolbar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={handleAddRow}
        onDeleteRows={handleDeleteRows}
        onSave={() => console.log('Saving Project Assignments...')}
        selectedCount={selectedRows.length}
      />

      <div className="flex-1 overflow-hidden bg-white mx-6 mb-6 border rounded-lg shadow-sm">
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
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32 bg-[#f0f7ff] sticky left-12 z-20">Project Assignment ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Project Assignment Code</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Project Assignment Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Project Assignment Type</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Project Assignment Class</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Chart of Account ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Legal Entity ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Parent Project Assignment ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Level</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Project Budget Detail ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Project ID</th>
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
                      <span>No project assignments found</span>
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
                      {row.pasId}
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.pasCode}
                        onChange={(e) => updateRow(row.id, 'pasCode', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.pasName}
                        onChange={(e) => updateRow(row.id, 'pasName', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-medium"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Select
                        value={row.pasType}
                        onValueChange={(value) => updateRow(row.id, 'pasType', value)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Project">Project</SelectItem>
                          <SelectItem value="WBS">WBS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Select
                        value={row.pasClass}
                        onValueChange={(value) => updateRow(row.id, 'pasClass', value)}
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
                        value={row.parentPasId}
                        onChange={(e) => updateRow(row.id, 'parentPasId', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                        placeholder="PAS-XXX"
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
                        value={row.pbdId}
                        onChange={(e) => updateRow(row.id, 'pbdId', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                        placeholder="PBD-XXX"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.projId}
                        onChange={(e) => updateRow(row.id, 'projId', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                        placeholder="PROJ-XXX"
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
