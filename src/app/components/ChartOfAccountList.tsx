import { useState } from 'react';
import { Search } from 'lucide-react';
import { FilterPanel } from './FilterPanel';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import MasterDataToolbar from './MasterDataToolbar';

interface CoaRow {
  id: number;
  coaCode: string;
  coaName: string;
  segmentSeparate: string;
  description: string;
  status: string;
}

interface ChartOfAccountListProps {}

export default function ChartOfAccountList({ }: ChartOfAccountListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [coaData, setCoaData] = useState<CoaRow[]>([
    {
      id: 1,
      coaCode: 'DEFAULT_COA',
      coaName: 'DEFAULT_COA',
      segmentSeparate: '-',
      description: 'COA Default dùn cho các tác các COA khác',
      status: 'Yes'
    },
    {
      id: 2,
      coaCode: 'COA-01',
      coaName: 'COA-01',
      segmentSeparate: '-',
      description: '',
      status: 'Yes'
    },
    {
      id: 3,
      coaCode: 'COA-04',
      coaName: 'COA-04',
      segmentSeparate: '-',
      description: '',
      status: 'Yes'
    },
    {
      id: 4,
      coaCode: 'COA-02',
      coaName: 'COA-02',
      segmentSeparate: '',
      description: '',
      status: 'No'
    },
    {
      id: 5,
      coaCode: 'COA-03',
      coaName: 'COA-03',
      segmentSeparate: '-',
      description: '',
      status: 'No'
    }
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const addNewRow = () => {
    const newId = Math.max(...coaData.map(r => r.id), 0) + 1;
    setCoaData([...coaData, {
      id: newId,
      coaCode: `COA-${String(newId).padStart(2, '0')}`,
      coaName: '',
      segmentSeparate: '-',
      description: '',
      status: 'Yes'
    }]);
  };

  const deleteSelectedRows = () => {
    setCoaData(coaData.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const updateRow = (id: number, field: keyof CoaRow, value: any) => {
    setCoaData(coaData.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const filteredData = coaData.filter(row => {
    const matchesSearch = searchText === '' || Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus = selectedStatus === 'all' || row.status === selectedStatus;
    return matchesSearch && matchesStatus;
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
        showType={false}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
      {/* Page Header */}
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Chart of Account</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Master Data</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Chart of Account</span>
          </nav>
        </div>

      <MasterDataToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={addNewRow}
        onDeleteRows={deleteSelectedRows}
        onSave={() => console.log('Saving COA...')}
        selectedCount={selectedRows.length}
      />

      <div className="flex-1 overflow-hidden bg-white mx-6 mb-6 border rounded-lg shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm">
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
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-48 bg-[#f0f7ff] sticky left-12 z-20">COA Code</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">COA Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Segment Separate</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r">Description</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-32">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-12 text-center text-gray-500 bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>No chart of accounts found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map(row => (
                  <tr key={row.id} className="border-b hover:bg-blue-50/50 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-inherit sticky left-0 z-10">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r bg-inherit sticky left-12 z-10 font-bold text-blue-600">
                      <Input
                        value={row.coaCode}
                        onChange={(e) => updateRow(row.id, 'coaCode', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.coaName}
                        onChange={(e) => updateRow(row.id, 'coaName', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all font-medium"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.segmentSeparate}
                        onChange={(e) => updateRow(row.id, 'segmentSeparate', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-center"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.description}
                        onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <Select
                        value={row.status}
                        onValueChange={(value) => updateRow(row.id, 'status', value)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Active</SelectItem>
                          <SelectItem value="No">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
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