import { useState } from 'react';
import { Search } from 'lucide-react';
import { FilterPanel } from './FilterPanel';
import { Checkbox } from './ui/checkbox';
import CreateAccountSetupPopup from './CreateAccountSetupPopup';
import MasterDataToolbar from './MasterDataToolbar';

interface AccountAccountingSetupListProps {
  onBack: () => void;
}

interface AccountRow {
  id: number;
  accountNumber: string;
  accountName: string;
  accountType: string;
  responsible: string;
  status: boolean;
  parentParty: boolean;
  useCostCenter: boolean;
  useCostElement: boolean;
  reconcile: boolean;
}

export default function AccountAccountingSetupList({ onBack }: AccountAccountingSetupListProps) {
  const [searchText, setSearchText] = useState('');
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const accountData: AccountRow[] = [
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
    },
    {
      id: 9,
      accountNumber: '11113000',
      accountName: 'Vàng bạc, kim loại quý, đá quý',
      accountType: 'Assets',
      responsible: '',
      status: false,
      parentParty: false,
      useCostCenter: false,
      useCostElement: false,
      reconcile: false
    },
    {
      id: 10,
      accountNumber: '1114000',
      accountName: 'Các loại tập phẩu; ký phẩu...',
      accountType: 'Assets',
      responsible: '',
      status: false,
      parentParty: false,
      useCostCenter: false,
      useCostElement: false,
      reconcile: false
    },
    {
      id: 11,
      accountNumber: '1117000',
      accountName: 'Trung Gian',
      accountType: 'Assets',
      responsible: '',
      status: false,
      parentParty: false,
      useCostCenter: false,
      useCostElement: false,
      reconcile: false
    },
    {
      id: 12,
      accountNumber: '1116000',
      accountName: 'Trung gian tiền mại-USD',
      accountType: 'Assets',
      responsible: '',
      status: false,
      parentParty: false,
      useCostCenter: false,
      useCostElement: false,
      reconcile: false
    },
    {
      id: 13,
      accountNumber: '1119000',
      accountName: 'Tạo bù dịch trung gian nội tội',
      accountType: 'Assets',
      responsible: '',
      status: false,
      parentParty: false,
      useCostCenter: false,
      useCostElement: false,
      reconcile: false
    },
    {
      id: 14,
      accountNumber: '2',
      accountName: 'TEDA',
      accountType: 'Assets',
      responsible: '',
      status: false,
      parentParty: false,
      useCostCenter: true,
      useCostElement: false,
      reconcile: false
    }
  ];

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredData = accountData.filter(row =>
    searchText === '' ||
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Filter Panel */}
      <FilterPanel
        searchValue={searchText}
        onSearchChange={setSearchText}
        showStatus={false}
        showType={false}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Header */}
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Account Accounting Setup</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Master Data</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Account Setup</span>
          </nav>
        </div>

        <MasterDataToolbar
          searchText={searchText}
          onSearchChange={setSearchText}
          onAddRow={() => setShowCreatePopup(true)}
          onDeleteRows={() => setSelectedRows([])}
          onSave={() => console.log('Saving Account Accounting Setup...')}
          selectedCount={selectedRows.length}
        />

        {/* Table */}
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
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40 bg-[#f0f7ff] sticky left-12 z-20">Account Number</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">Account Name</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Account Type</th>
                  <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-56">Responsible</th>
                  <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-24">Status</th>
                  <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-28">Parent Party</th>
                  <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-36">Use Cost Center</th>
                  <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-36">Use Cost Element</th>
                  <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase w-28">Reconcile</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-3 py-12 text-center text-gray-500 bg-white">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-12 h-12 opacity-10" />
                        <span>No accounts found</span>
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
                        {row.accountNumber}
                      </td>
                      <td className="px-3 py-2 border-r">
                        <button className="text-blue-600 hover:underline text-left">
                          {row.accountName}
                        </button>
                      </td>
                      <td className="px-3 py-2 border-r">
                        {row.accountType && (
                          <span className={`px-2 py-1 rounded text-xs font-medium ${row.accountType === 'Assets' ? 'bg-blue-100 text-blue-700' :
                              row.accountType === 'Revenue' ? 'bg-green-100 text-green-700' :
                                row.accountType === 'Liabilities' ? 'bg-yellow-100 text-yellow-700' :
                                  row.accountType === 'Equity' ? 'bg-purple-100 text-purple-700' :
                                    'bg-gray-100 text-gray-700'
                            }`}>
                            {row.accountType}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 border-r text-gray-600 text-xs">{row.responsible}</td>
                      <td className="px-3 py-2 border-r text-center">
                        <Checkbox checked={row.status} />
                      </td>
                      <td className="px-3 py-2 border-r text-center">
                        <Checkbox checked={row.parentParty} />
                      </td>
                      <td className="px-3 py-2 border-r text-center">
                        <Checkbox checked={row.useCostCenter} />
                      </td>
                      <td className="px-3 py-2 border-r text-center">
                        <Checkbox checked={row.useCostElement} />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <Checkbox checked={row.reconcile} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between text-xs text-gray-600">
            <div>
              Showing <span className="font-semibold">{filteredData.length}</span> of <span className="font-semibold">{accountData.length}</span> accounts
            </div>
            <div className="flex items-center gap-4">
              <span>{selectedRows.length} selected</span>
            </div>
          </div>
        </div>

        {/* Create Popup */}
        {showCreatePopup && (
          <CreateAccountSetupPopup onClose={() => setShowCreatePopup(false)} />
        )}
      </div>
    </div>
  );
}