import { useState } from 'react';
import { CheckCircle, FileText, AlertTriangle, Calendar, Plus, ChevronDown, Search, RotateCcw, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import { FilterPanel } from './FilterPanel';
import { StatsCard } from './StatsCard';

interface GLJournalListProps {
  onCreateClick: () => void;
}

// Mock data for GL Journals
const glJournals = [
  {
    journalId: 'GLJ001',
    journalNumber: 'GJ-01-022600001',
    batchNumber: 'B001',
    lenId: 'FPT-SOFT',
    description: 'Điều chỉnh chi phí lương tháng 01/2026',
    docType: 'GENERAL',
    docDate: '01/02/2026',
    postingDate: '01/02/2026',
    currency: 'VND',
    amount: 125000000,
    approved: 'Y',
    posting: 'P',
    status: 'posted'
  },
  {
    journalId: 'GLJ002',
    journalNumber: 'GJ-02-022600002',
    batchNumber: 'B002',
    lenId: 'FPT-RETAIL',
    description: 'Hạch toán phân bổ chi phí trả trước',
    docType: 'ADJUSTMENT',
    docDate: '02/02/2026',
    postingDate: '02/02/2026',
    currency: 'VND',
    amount: 45000000,
    approved: 'N',
    posting: 'N',
    status: 'unposted'
  },
  {
    journalId: 'GLJ003',
    journalNumber: 'GJ-01-022600003',
    batchNumber: 'B003',
    lenId: 'FPT-SOFT',
    description: 'Kết chuyển lãi lỗ quý 1',
    docType: 'CLOSING',
    docDate: '03/02/2026',
    postingDate: '03/02/2026',
    currency: 'VND',
    amount: 1250000000,
    approved: 'Y',
    posting: 'N',
    status: 'error'
  }
];

const ActionsDropdown = () => (
  <Button variant="outline" size="sm" className="h-8">
    <MoreVertical className="w-4 h-4 mr-1" /> Actions
  </Button>
);

export default function GLJournalList({ onCreateClick }: GLJournalListProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Calculate KPI values
  const paidCount = glJournals.filter(journal => journal.status === 'posted').length;
  const unpaidCount = glJournals.filter(journal => journal.status === 'unposted').length;
  const overdueCount = glJournals.filter(journal => journal.status === 'error').length;
  
  // Calculate "Not Due Yet (Last 7 days)"
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const notDueYetCount = glJournals.filter(journal => {
    const journalDate = new Date(journal.date.split('-').reverse().join('-'));
    return journal.status !== 'error' && journalDate >= sevenDaysAgo;
  }).length;

  const filterOptions = [
    {
      label: 'From Date',
      type: 'date' as const,
      value: '2025-12-01',
    },
    {
      label: 'To Date',
      type: 'date' as const,
      value: '2025-12-31',
    },
    {
      label: 'Status',
      type: 'select' as const,
      options: ['All', 'Posted', 'Unposted', 'Error'],
      value: 'All',
    },
    {
      label: 'Journal Type',
      type: 'select' as const,
      options: ['All', 'Manual', 'Auto', 'Adjustment'],
      value: 'All',
    },
  ];

  return (
    <div className="flex gap-6 p-6">
      {/* Left: Filter Panel */}
      <FilterPanel
        title="Filter Options"
        filters={filterOptions}
        onClearAll={() => console.log('Clear all filters')}
      />

      {/* Right: Main Content */}
      <div className="flex-1">
        {/* Page Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">GL JOURNAL</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="POSTED"
            value={paidCount}
            icon={CheckCircle}
            bgColor="text-green-600"
            iconBgColor="bg-green-50"
          />
          <StatsCard
            title="UNPOSTED"
            value={unpaidCount}
            icon={FileText}
            bgColor="text-orange-600"
            iconBgColor="bg-orange-50"
          />
          <StatsCard
            title="ERROR"
            value={overdueCount}
            icon={AlertTriangle}
            bgColor="text-red-600"
            iconBgColor="bg-red-50"
          />
          <StatsCard
            title="RECENT"
            value={notDueYetCount}
            icon={Calendar}
            bgColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={onCreateClick}>
            <Plus className="w-4 h-4 mr-1" />
            Create
          </Button>
        </div>

        {/* Search and Actions Bar */}
        <div className="bg-white border rounded-t-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search journals..."
                className="w-64 h-8 pl-8"
              />
            </div>
            <Button variant="secondary" size="sm" className="h-8">Go</Button>
            <ActionsDropdown />
          </div>
          <Button variant="ghost" size="sm" className="h-8">
            <RotateCcw className="w-4 h-4 mr-1" /> Reset
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50 border-b">
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase tracking-wider">Journal ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase tracking-wider">Journal Number</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase tracking-wider">LEN ID</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase tracking-wider">Posting Date</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase tracking-wider">Currency</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {glJournals.map((journal, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-medium text-blue-600">{journal.journalId}</td>
                    <td className="px-4 py-3">{journal.journalNumber}</td>
                    <td className="px-4 py-3">{journal.lenId}</td>
                    <td className="px-4 py-3 max-w-xs truncate">{journal.description}</td>
                    <td className="px-4 py-3">{journal.docType}</td>
                    <td className="px-4 py-3">{journal.postingDate}</td>
                    <td className="px-4 py-3">{journal.currency}</td>
                    <td className="px-4 py-3 text-right font-semibold">{journal.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        journal.status === 'posted' ? 'bg-green-100 text-green-700' :
                        journal.status === 'unposted' ? 'bg-gray-100 text-gray-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {journal.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-4 py-3 border-t bg-gray-50 text-xs text-right text-gray-500 font-medium">
            TOTAL RECORDS: {glJournals.length}
          </div>
        </div>
      </div>
    </div>
  );
}