import { Search, RotateCcw, CheckCircle, FileText, AlertTriangle, Calendar, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import StatsCard from './StatsCard';
import { ActionsDropdown } from './ActionsDropdown';

interface UniversalLedgerListProps {
  onCreateClick: () => void;
}

const ledgers = [
  {
    uleId: '1000001',
    lenId: '101',
    ledger: '0L',
    docNumber: 'UL2026-00001',
    fiscalYear: '2026',
    docItem: '1',
    docType: 'UL',
    ttyId: '1001',
    postingDate: '02/02/2026',
    docDate: '02/02/2026',
    accId: '1111',
    drCrInd: 'D',
    amount: 1000000,
    currency: 'VND',
    exchangeRate: 1,
    exchangeDate: '02/02/2026',
    exchangeType: 'M',
    accAmount: 1000000,
    accCurrency: 'VND',
    groupAmount: null,
    groupCurrency: '',
    objectId: '10001',
    objectType: 'C',
    assId: '',
    matId: '',
    prodId: 'PROD01',
    stoId: '',
    sarId: '',
    cceId: 'CCE01',
    pceId: 'PCE01',
    celId: 'CEL01',
    enaId: 'ENA01',
    projId: 'PROJ01',
    quantity: 10,
    uomId: 'PCS',
    icFlag: 'N',
    icLenId: '',
    offsetAccId: '131',
    sourceType: 'INV',
    refDocId: 'INV20260202001',
    refDocNo: 'INV/2026/001',
    refContractNo: 'CON-001',
    reversedId: '',
    status: 'Posted',
    createdBy: 'NGUYENVANA',
    createDate: '2026-02-02',
    modifiedBy: '',
    modifyDate: ''
  },
  {
    uleId: '1000002',
    lenId: '101',
    ledger: '0L',
    docNumber: 'UL2026-00001',
    fiscalYear: '2026',
    docItem: '2',
    docType: 'UL',
    ttyId: '1001',
    postingDate: '02/02/2026',
    docDate: '02/02/2026',
    accId: '1311',
    drCrInd: 'C',
    amount: -1000000,
    currency: 'VND',
    exchangeRate: 1,
    exchangeDate: '02/02/2026',
    exchangeType: 'M',
    accAmount: -1000000,
    accCurrency: 'VND',
    groupAmount: null,
    groupCurrency: '',
    objectId: '10001',
    objectType: 'C',
    assId: '',
    matId: '',
    prodId: 'PROD01',
    stoId: '',
    sarId: '',
    cceId: 'CCE01',
    pceId: 'PCE01',
    celId: 'CEL01',
    enaId: 'ENA01',
    projId: 'PROJ01',
    quantity: 10,
    uomId: 'PCS',
    icFlag: 'N',
    icLenId: '',
    offsetAccId: '1111',
    sourceType: 'INV',
    refDocId: 'INV20260202001',
    refDocNo: 'INV/2026/001',
    refContractNo: 'CON-001',
    reversedId: '',
    status: 'Draft',
    createdBy: 'NGUYENVANA',
    createDate: '2026-02-02',
    modifiedBy: '',
    modifyDate: ''
  }
];

export default function UniversalLedgerList({ onCreateClick }: UniversalLedgerListProps) {
  return (
    <div className="p-6 overflow-x-auto">
      <div style={{ width: '1552px' }}>
        {/* Page Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800 uppercase tracking-tight">Danh sách sổ cái tổng hợp (Universal Ledgers)</h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Posted"
            value={1}
            icon={CheckCircle}
            bgColor="text-green-500"
            iconBgColor="bg-green-50"
          />
          <StatsCard
            title="Draft"
            value={1}
            icon={FileText}
            bgColor="text-gray-500"
            iconBgColor="bg-gray-50"
          />
          <StatsCard
            title="Pending Approval"
            value={0}
            icon={AlertTriangle}
            bgColor="text-yellow-500"
            iconBgColor="bg-yellow-50"
          />
          <StatsCard
            title="New This Week"
            value={2}
            icon={Calendar}
            bgColor="text-blue-500"
            iconBgColor="bg-blue-50"
          />
        </div>

        {/* Header Filters */}
        <div className="bg-white border rounded-lg mb-4 p-4 shadow-sm">
          <div className="grid grid-cols-10 gap-4 mb-4">
            <div className="col-span-2">
              <label className="block text-sm mb-1 text-gray-600">Batch Number</label>
              <Input placeholder="Enter batch number" className="h-10" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm mb-1 text-gray-600">Document Type</label>
              <Select>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="ul">Universal Ledger</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm mb-1 text-gray-600">Reference Doc ID</label>
              <Input placeholder="Enter Reference Doc ID" className="h-10" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm mb-1 text-gray-600">From Date</label>
              <Input type="date" className="h-10" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm mb-1 text-gray-600">To Date</label>
              <Input type="date" className="h-10" />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline">Clear All Filter</Button>
            <Button variant="default" onClick={onCreateClick} className="bg-black hover:bg-gray-800 text-white border-none rounded-md px-6">
               Create Universal Ledger
            </Button>
          </div>
        </div>

        {/* Search and Actions Bar */}
        <div className="bg-white border rounded-t-lg p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search All Text Columns"
              className="w-64 h-8"
            />
            <Button variant="outline" size="sm" className="h-8">Go</Button>
            <Button variant="outline" size="sm" className="h-8">
              Actions <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <RotateCcw className="w-4 h-4 mr-1" /> Reset
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[6500px]">
              <thead>
                <tr className="bg-blue-50 border-b">
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase sticky left-0 bg-blue-50 z-20 border-r w-32">ULE ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">LEN ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Ledger</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-48">Document Number</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Fiscal Year</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Document Item</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Document Type</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Transaction Type ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Posting Date</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Document Date</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Account ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">DR CR Indicator</th>
                  <th className="px-4 py-3 text-right text-blue-700 font-semibold uppercase border-r w-40">Amount</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Currency</th>
                  <th className="px-4 py-3 text-right text-blue-700 font-semibold uppercase border-r w-32">Exchange Rate</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Exchange Date</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Exchange Type</th>
                  <th className="px-4 py-3 text-right text-blue-700 font-semibold uppercase border-r w-40">Accounted Amount</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Accounted Currency</th>
                  <th className="px-4 py-3 text-right text-blue-700 font-semibold uppercase border-r w-40">Group Amount</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Group Currency</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Object ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Object Type</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Asset ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Material ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Product ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Store ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Storage Area ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Cost Center ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Profit Center ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Cost Element ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-56">Extension Analysis ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Project ID</th>
                  <th className="px-4 py-3 text-right text-blue-700 font-semibold uppercase border-r w-32">Quantity</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">UOM ID</th>
                  <th className="px-4 py-3 text-center text-blue-700 font-semibold uppercase border-r w-24">IC Flag</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">IC Legal Entity ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Offset Account ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Source Type</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-48">Reference Doc ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-48">Reference Doc No</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-48">Reference Contract No</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Reversed ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-32">Status</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Created By</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Create Date</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Modified By</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase border-r w-40">Modify Date</th>
                </tr>
              </thead>
              <tbody>
                {ledgers.map((ledger, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                    <td className="px-4 py-3 sticky left-0 bg-white z-10 border-r">{ledger.uleId}</td>
                    <td className="px-4 py-3 border-r">{ledger.lenId}</td>
                    <td className="px-4 py-3 border-r">{ledger.ledger}</td>
                    <td className="px-4 py-3 border-r font-mono">{ledger.docNumber}</td>
                    <td className="px-4 py-3 border-r">{ledger.fiscalYear}</td>
                    <td className="px-4 py-3 border-r">{ledger.docItem}</td>
                    <td className="px-4 py-3 border-r">{ledger.docType}</td>
                    <td className="px-4 py-3 border-r">{ledger.ttyId}</td>
                    <td className="px-4 py-3 border-r">{ledger.postingDate}</td>
                    <td className="px-4 py-3 border-r">{ledger.docDate}</td>
                    <td className="px-4 py-3 border-r">{ledger.accId}</td>
                    <td className="px-4 py-3 border-r">{ledger.drCrInd}</td>
                    <td className="px-4 py-3 text-right font-mono border-r">{ledger.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 border-r">{ledger.currency}</td>
                    <td className="px-4 py-3 text-right border-r">{ledger.exchangeRate}</td>
                    <td className="px-4 py-3 border-r">{ledger.exchangeDate}</td>
                    <td className="px-4 py-3 border-r">{ledger.exchangeType}</td>
                    <td className="px-4 py-3 text-right font-mono border-r">{ledger.accAmount.toLocaleString()}</td>
                    <td className="px-4 py-3 border-r">{ledger.accCurrency}</td>
                    <td className="px-4 py-3 text-right font-mono border-r">{ledger.groupAmount?.toLocaleString() || ''}</td>
                    <td className="px-4 py-3 border-r">{ledger.groupCurrency}</td>
                    <td className="px-4 py-3 border-r">{ledger.objectId}</td>
                    <td className="px-4 py-3 border-r">{ledger.objectType}</td>
                    <td className="px-4 py-3 border-r">{ledger.assId}</td>
                    <td className="px-4 py-3 border-r">{ledger.matId}</td>
                    <td className="px-4 py-3 border-r">{ledger.prodId}</td>
                    <td className="px-4 py-3 border-r">{ledger.stoId}</td>
                    <td className="px-4 py-3 border-r">{ledger.sarId}</td>
                    <td className="px-4 py-3 border-r">{ledger.cceId}</td>
                    <td className="px-4 py-3 border-r">{ledger.pceId}</td>
                    <td className="px-4 py-3 border-r">{ledger.celId}</td>
                    <td className="px-4 py-3 border-r">{ledger.enaId}</td>
                    <td className="px-4 py-3 border-r">{ledger.projId}</td>
                    <td className="px-4 py-3 text-right border-r">{ledger.quantity}</td>
                    <td className="px-4 py-3 border-r">{ledger.uomId}</td>
                    <td className="px-4 py-3 text-center border-r">{ledger.icFlag}</td>
                    <td className="px-4 py-3 border-r">{ledger.icLenId}</td>
                    <td className="px-4 py-3 border-r">{ledger.offsetAccId}</td>
                    <td className="px-4 py-3 border-r">{ledger.sourceType}</td>
                    <td className="px-4 py-3 border-r">{ledger.refDocId}</td>
                    <td className="px-4 py-3 border-r">{ledger.refDocNo}</td>
                    <td className="px-4 py-3 border-r">{ledger.refContractNo}</td>
                    <td className="px-4 py-3 border-r">{ledger.reversedId}</td>
                    <td className="px-4 py-3 border-r">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        ledger.status === 'Posted' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {ledger.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-r">{ledger.createdBy}</td>
                    <td className="px-4 py-3 border-r">{ledger.createDate}</td>
                    <td className="px-4 py-3 border-r">{ledger.modifiedBy}</td>
                    <td className="px-4 py-3 border-r">{ledger.modifyDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t bg-gray-50 text-right text-gray-600 font-medium">
            Total Records: {ledgers.length}
          </div>
        </div>
      </div>
    </div>
  );
}