import { useState } from 'react';
import { Search, Plus, Download, Upload, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

const mockData = [
  {
    id: 1,
    accountNumber: '0000000',
    accountName: 'Clearing Account',
    accountType: 'Assets',
    responsible: '',
    status: false,
    parentParty: false,
    useCostCenter: false,
    useCostElement: false,
    reconcile: false
  },
  {
    id: 2,
    accountNumber: '11',
    accountName: '3',
    accountType: 'Revenue',
    responsible: '',
    status: false,
    parentParty: false,
    useCostCenter: false,
    useCostElement: false,
    reconcile: false
  },
  {
    id: 3,
    accountNumber: '1',
    accountName: '00771568',
    accountType: 'Revenue',
    responsible: 'sử dụng tiền tiền 1 nào o',
    status: false,
    parentParty: false,
    useCostCenter: false,
    useCostElement: false,
    reconcile: false
  },
  {
    id: 4,
    accountNumber: '1112700',
    accountName: 'Tiền mặt-EUR',
    accountType: 'Assets',
    responsible: '',
    status: false,
    parentParty: false,
    useCostCenter: false,
    useCostElement: false,
    reconcile: false
  },
  {
    id: 5,
    accountNumber: '110000',
    accountName: 'Tiền mặt',
    accountType: 'Liabilities',
    responsible: '',
    status: false,
    parentParty: false,
    useCostCenter: true,
    useCostElement: false,
    reconcile: false
  },
  {
    id: 6,
    accountNumber: '1110000',
    accountName: 'Tiền mặt-Việt nam đồng',
    accountType: 'Equity',
    responsible: '',
    status: false,
    parentParty: false,
    useCostCenter: false,
    useCostElement: false,
    reconcile: false
  },
  {
    id: 7,
    accountNumber: '112000',
    accountName: 'Tiền mặt ngoại tệ',
    accountType: 'Revenue',
    responsible: '',
    status: false,
    parentParty: false,
    useCostCenter: false,
    useCostElement: false,
    reconcile: false
  },
  {
    id: 8,
    accountNumber: '1112100',
    accountName: 'Tiền mặt-USD bộ mỹ',
    accountType: 'Assets',
    responsible: '',
    status: false,
    parentParty: false,
    useCostCenter: false,
    useCostElement: false,
    reconcile: false
  }
];

export default function AccountAccountingSetupList() {
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredData = mockData.filter(item => {
    const matchesSearch = searchText === '' || 
      item.accountNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      item.accountName.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = selectedType === 'all' || item.accountType === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Account Accounting Setup</h1>
        <nav className="flex items-center gap-1.5 mt-1">
          <span className="text-xs text-gray-400">Home</span>
          <span className="text-xs text-gray-300">/</span>
          <span className="text-xs text-gray-400">Configuration</span>
          <span className="text-xs text-gray-300">/</span>
          <span className="text-xs text-blue-600">Account Accounting Setup</span>
        </nav>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white border rounded-lg p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 min-w-[400px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by Account Number or Name..."
                className="pl-10 h-9"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md h-9 min-w-[150px]"
            >
              <option value="all">All Types</option>
              <option value="Assets">Assets</option>
              <option value="Liabilities">Liabilities</option>
              <option value="Equity">Equity</option>
              <option value="Revenue">Revenue</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-1" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
              <Settings className="w-4 h-4 mr-1" />
              Bulk Update
            </Button>
          </div>
        </div>

        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 border-b">
                  <th className="px-4 py-3 text-left">
                    <Checkbox />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700">Account Number</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700">Account Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700">Account Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700">Responsible</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-blue-700">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-blue-700">Parent Party</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-blue-700">Cost Center</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-blue-700">Cost Element</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-blue-700">Reconcile</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-12 h-12 opacity-10" />
                        <span>No accounts found</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Checkbox />
                      </td>
                      <td className="px-4 py-3 text-sm font-mono font-bold text-blue-600">{item.accountNumber}</td>
                      <td className="px-4 py-3 text-sm">{item.accountName}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.accountType === 'Assets' ? 'bg-blue-100 text-blue-700' :
                          item.accountType === 'Liabilities' ? 'bg-orange-100 text-orange-700' :
                          item.accountType === 'Equity' ? 'bg-purple-100 text-purple-700' :
                          item.accountType === 'Revenue' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {item.accountType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{item.responsible || '-'}</td>
                      <td className="px-4 py-3 text-center">
                        <Checkbox checked={item.status} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Checkbox checked={item.parentParty} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Checkbox checked={item.useCostCenter} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Checkbox checked={item.useCostElement} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Checkbox checked={item.reconcile} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t bg-gray-50 text-sm text-right text-gray-600">
            Showing {filteredData.length} of {mockData.length} accounts
          </div>
        </div>
      </div>
    </div>
  );
}
