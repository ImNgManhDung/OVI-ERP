import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import MasterDataToolbar from './MasterDataToolbar';
import { Search } from 'lucide-react';

interface LegalEntityRow {
  id: number;
  lenId: string;
  lenCode: string;
  lenName: string;
  lenDescription: string;
  ounId: string;
  relatedLenId: string;
  capitalRatio: number | string;
  coaId: string;
  address: string;
  legalRepresentative: string;
  chiefAccountant: string;
  lenType: string;
  accCurCode: string;
  language: string;
  website: string;
  phoneNumber: string;
  status: string;
  createdBy: string;
  createDate: string;
}

export default function LegalEntityList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const [rows, setRows] = useState<LegalEntityRow[]>([
    {
      id: 1,
      lenId: 'LEN-001',
      lenCode: 'LE001',
      lenName: 'Công ty TNHH ABC',
      lenDescription: 'Công ty mẹ',
      ounId: 'OUN-001',
      relatedLenId: '',
      capitalRatio: 100,
      coaId: 'COA-001',
      address: '123 Nguyễn Văn Linh, Q7, TP.HCM',
      legalRepresentative: 'Nguyễn Văn A',
      chiefAccountant: 'Trần Thị B',
      lenType: 'COMPANY',
      accCurCode: 'VND',
      language: 'VI',
      website: 'www.abc.com.vn',
      phoneNumber: '028-3883-8888',
      status: 'Y',
      createdBy: 'admin',
      createDate: '2024-01-15'
    },
    {
      id: 2,
      lenId: 'LEN-002',
      lenCode: 'LE002',
      lenName: 'Chi nhánh Hà Nội',
      lenDescription: 'Chi nhánh miền Bắc',
      ounId: 'OUN-002',
      relatedLenId: 'LEN-001',
      capitalRatio: 100,
      coaId: 'COA-001',
      address: '456 Láng Hạ, Đống Đa, Hà Nội',
      legalRepresentative: 'Lê Văn C',
      chiefAccountant: 'Phạm Thị D',
      lenType: 'BRANCH',
      accCurCode: 'VND',
      language: 'VI',
      website: 'www.abc.com.vn',
      phoneNumber: '024-3883-8888',
      status: 'Y',
      createdBy: 'admin',
      createDate: '2024-02-20'
    },
    {
      id: 3,
      lenId: 'LEN-003',
      lenCode: 'LE003',
      lenName: 'Công ty con XYZ',
      lenDescription: 'Công ty con góp vốn 51%',
      ounId: 'OUN-003',
      relatedLenId: 'LEN-001',
      capitalRatio: 51,
      coaId: 'COA-002',
      address: '789 Trần Hưng Đạo, Q5, TP.HCM',
      legalRepresentative: 'Hoàng Văn E',
      chiefAccountant: 'Vũ Thị F',
      lenType: 'SUBSIDIARY',
      accCurCode: 'VND',
      language: 'VI',
      website: 'www.xyz.com.vn',
      phoneNumber: '028-3888-9999',
      status: 'Y',
      createdBy: 'admin',
      createDate: '2024-03-10'
    }
  ]);

  const [editingCell, setEditingCell] = useState<{ rowId: number; field: keyof LegalEntityRow } | null>(null);

  const addNewRow = () => {
    const newId = Math.max(...rows.map(r => r.id), 0) + 1;
    const newRow: LegalEntityRow = {
      id: newId,
      lenId: `LEN-${String(newId).padStart(3, '0')}`,
      lenCode: `LE${String(newId).padStart(3, '0')}`,
      lenName: '',
      lenDescription: '',
      ounId: '',
      relatedLenId: '',
      capitalRatio: '',
      coaId: '',
      address: '',
      legalRepresentative: '',
      chiefAccountant: '',
      lenType: '',
      accCurCode: 'VND',
      language: 'VI',
      website: '',
      phoneNumber: '',
      status: 'Y',
      createdBy: 'admin',
      createDate: new Date().toISOString().split('T')[0]
    };
    setRows([...rows, newRow]);
  };

  const updateCell = (rowId: number, field: keyof LegalEntityRow, value: string) => {
    setRows(rows.map(row =>
      row.id === rowId ? { ...row, [field]: value } : row
    ));
  };

  const deleteSelectedRows = () => {
    setRows(rows.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rows.map(r => r.id));
    }
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Y', label: 'Active' },
    { value: 'N', label: 'Inactive' },
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'COMPANY', label: 'Company' },
    { value: 'BRANCH', label: 'Branch' },
    { value: 'SUBSIDIARY', label: 'Subsidiary' },
    { value: 'JOINT_VENTURE', label: 'Joint Venture' },
  ];

  const renderCell = (row: LegalEntityRow, field: keyof LegalEntityRow) => {
    const isEditing = editingCell?.rowId === row.id && editingCell?.field === field;
    const value = row[field];

    if (field === 'status') {
      return (
        <Select
          value={String(value)}
          onValueChange={(val) => updateCell(row.id, field, val)}
        >
          <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Y">Active</SelectItem>
            <SelectItem value="N">Inactive</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    if (field === 'lenType') {
      return (
        <Select
          value={String(value)}
          onValueChange={(val) => updateCell(row.id, field, val)}
        >
          <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="COMPANY">Company</SelectItem>
            <SelectItem value="BRANCH">Branch</SelectItem>
            <SelectItem value="SUBSIDIARY">Subsidiary</SelectItem>
            <SelectItem value="JOINT_VENTURE">Joint Venture</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    if (field === 'accCurCode') {
      return (
        <Select
          value={String(value)}
          onValueChange={(val) => updateCell(row.id, field, val)}
        >
          <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="VND">VND</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    if (field === 'language') {
      return (
        <Select
          value={String(value)}
          onValueChange={(val) => updateCell(row.id, field, val)}
        >
          <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="VI">Tiếng Việt</SelectItem>
            <SelectItem value="EN">English</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    // Inline editing for all other fields
    return (
      <Input
        type={field === 'capitalRatio' ? 'number' : 'text'}
        value={String(value)}
        onChange={(e) => updateCell(row.id, field, e.target.value)}
        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
      />
    );
  };

  const filteredRows = rows.filter(row => {
    const matchesSearch = searchText === '' || Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || row.status === selectedStatus;
    const matchesType = selectedType === 'all' || row.lenType === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Filter Panel - Left Sidebar */}
      <div className="w-[220px] bg-white border-r flex flex-col shrink-0">
        <div className="px-4 py-3 border-b">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Search className="w-4 h-4" />
            Bộ lọc
          </div>
          <p className="text-xs text-gray-400 mt-0.5">Search</p>
        </div>

        <div className="px-4 py-3 space-y-4 overflow-y-auto flex-1">
          {/* Search Input */}
          <div>
            <Input
              placeholder="Code, Name, Address..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-8 text-xs"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Y">Active</SelectItem>
                <SelectItem value="N">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="COMPANY">Company</SelectItem>
                <SelectItem value="BRANCH">Branch</SelectItem>
                <SelectItem value="SUBSIDIARY">Subsidiary</SelectItem>
                <SelectItem value="JOINT_VENTURE">Joint Venture</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Header */}
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Legal Entity Management</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Master Data</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Legal Entity</span>
          </nav>
        </div>

        {/* Master Data Toolbar */}
        <MasterDataToolbar
          searchText={searchText}
          onSearchChange={setSearchText}
          onAddRow={addNewRow}
          onDeleteRows={deleteSelectedRows}
          onSave={() => console.log('Saving Legal Entities...')}
          selectedCount={selectedRows.length}
        />

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
          <table className="w-full text-sm min-w-[3500px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#f0f7ff] border-b">
                <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-20">
                  <Checkbox
                    checked={selectedRows.length === rows.length && rows.length > 0}
                    onCheckedChange={toggleAllRows}
                  />
                </th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32 bg-[#f0f7ff] sticky left-12 z-20">Legal Entity ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Legal Entity Code</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Legal Entity Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Description</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Operating Unit ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Related Legal Entity</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Capital Ratio (%)</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Chart of Account</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-96">Address</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Legal Representative</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48">Chief Accountant</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Type</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Currency</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Language</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Website</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Phone Number</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Status</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Created By</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-32">Create Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={20} className="px-3 py-12 text-center text-gray-500 bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>No legal entities found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-10">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-10 font-bold text-blue-600">
                      {row.lenId}
                    </td>
                    <td className="px-3 py-2 border-r">{renderCell(row, 'lenCode')}</td>
                    <td className="px-3 py-2 border-r font-medium text-gray-800">{renderCell(row, 'lenName')}</td>
                    <td className="px-3 py-2 border-r">{renderCell(row, 'lenDescription')}</td>
                    <td className="px-3 py-2 border-r">{renderCell(row, 'ounId')}</td>
                    <td className="px-3 py-2 border-r">{renderCell(row, 'relatedLenId')}</td>
                    <td className="px-3 py-2 border-r text-right font-semibold text-green-700">{renderCell(row, 'capitalRatio')}</td>
                    <td className="px-3 py-2 border-r">{renderCell(row, 'coaId')}</td>
                    <td className="px-3 py-2 border-r text-xs">{renderCell(row, 'address')}</td>
                    <td className="px-3 py-2 border-r">{renderCell(row, 'legalRepresentative')}</td>
                    <td className="px-3 py-2 border-r">{renderCell(row, 'chiefAccountant')}</td>
                    <td className="px-3 py-2 border-r">{renderCell(row, 'lenType')}</td>
                    <td className="px-3 py-2 border-r">{renderCell(row, 'accCurCode')}</td>
                    <td className="px-3 py-2 border-r">{renderCell(row, 'language')}</td>
                    <td className="px-3 py-2 border-r text-xs text-blue-600">{renderCell(row, 'website')}</td>
                    <td className="px-3 py-2 border-r">{renderCell(row, 'phoneNumber')}</td>
                    <td className="px-3 py-2 border-r">{renderCell(row, 'status')}</td>
                    <td className="px-3 py-2 border-r text-xs text-gray-600">{row.createdBy}</td>
                    <td className="px-3 py-2 text-xs text-gray-600">{row.createDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-white border-t px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredRows.length}</span> of <span className="font-semibold">{rows.length}</span> records
          </div>
        </div>
      </div>
    </div>
  );
}