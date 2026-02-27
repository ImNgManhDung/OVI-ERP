import { useState } from 'react';
import { Search } from 'lucide-react';
import MasterDataToolbar from './MasterDataToolbar';

interface ApprovalWorkflowListProps {
  onCreateClick: () => void;
}

// Mock data
const workflows = [
  {
    workflowId: 'WF-001',
    workflowName: 'Purchase Invoice Approval',
    description: 'Standard approval workflow for purchase invoices',
    totalSteps: 3,
    status: 'Active',
    createdDate: '01/01/2026',
  },
  {
    workflowId: 'WF-002',
    workflowName: 'Sales Invoice Approval',
    description: 'Standard approval workflow for sales invoices',
    totalSteps: 2,
    status: 'Active',
    createdDate: '05/01/2026',
  },
  {
    workflowId: 'WF-003',
    workflowName: 'Payment Request Approval',
    description: 'Multi-level approval for payment requests',
    totalSteps: 4,
    status: 'Active',
    createdDate: '10/01/2026',
  },
  {
    workflowId: 'WF-004',
    workflowName: 'Travel Expense Approval',
    description: 'Approval workflow for travel expense requisitions',
    totalSteps: 3,
    status: 'Inactive',
    createdDate: '15/01/2026',
  },
];

export default function ApprovalWorkflowList({ onCreateClick }: ApprovalWorkflowListProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredWorkflows = workflows.filter(w =>
    searchText === '' ||
    Object.values(w).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 uppercase tracking-tight">
          Approval Workflow Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure multi-level approval workflows for documents and transactions
        </p>
      </div>

      <MasterDataToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={onCreateClick}
        onDeleteRows={() => setSelectedRows([])}
        onSave={() => console.log('Saving Approval Workflows...')}
        selectedCount={selectedRows.length}
      />

      {/* Table */}
      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#f0f7ff] border-b">
                <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-20">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedRows.length === filteredWorkflows.length && filteredWorkflows.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedRows(filteredWorkflows.map(w => w.workflowId));
                      else setSelectedRows([]);
                    }}
                  />
                </th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32 bg-[#f0f7ff] sticky left-12 z-20">Workflow ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-72">Workflow Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r">Description</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-32">Total Steps</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Status</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-36">Created Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkflows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-12 text-center text-gray-500 bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>No approval workflows found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredWorkflows.map((workflow) => (
                  <tr key={workflow.workflowId} className="border-b hover:bg-blue-50/50 transition-colors bg-white">
                    <td className="px-3 py-2 border-r bg-inherit sticky left-0 z-10">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedRows.includes(workflow.workflowId)}
                        onChange={() => toggleRowSelection(workflow.workflowId)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r bg-inherit sticky left-12 z-10 font-bold text-blue-600">
                      <button className="hover:underline" onClick={onCreateClick}>
                        {workflow.workflowId}
                      </button>
                    </td>
                    <td className="px-3 py-2 border-r font-medium text-gray-800">{workflow.workflowName}</td>
                    <td className="px-3 py-2 border-r text-gray-600">{workflow.description}</td>
                    <td className="px-3 py-2 border-r text-center font-semibold">{workflow.totalSteps}</td>
                    <td className="px-3 py-2 border-r">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        workflow.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {workflow.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-600">{workflow.createdDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between text-xs text-gray-600">
          <div>
            Showing <span className="font-semibold">{filteredWorkflows.length}</span> of <span className="font-semibold">{workflows.length}</span> workflows
          </div>
          <div className="flex items-center gap-4">
            <span>{selectedRows.length} selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}