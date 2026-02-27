import { useState } from 'react';
import { X, ChevronDown, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface CreateChartOfAccountPopupProps {
  onClose: () => void;
}

interface AccountDetailRow {
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

export default function CreateChartOfAccountPopup({ onClose }: CreateChartOfAccountPopupProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const accountDetailData: AccountDetailRow[] = [
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
      id: 3,
      accountNumber: '1110000',
      accountName: 'Tiền mặt-Việt nam đồng',
      accountType: 'Equity',
      responsible: '',
      status: false,
      parentParty: false,
      useCostCenter: false,
      useCostElement: false,
      reconcile: false
    }
  ];

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl" style={{ width: '1400px', maxHeight: '90vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">COA_Segment_Descriptions</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          {/* Row 1: Coa Code, Coa Name, Segment Separate, Status */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <Label className="text-sm mb-1 block">
                <span className="text-red-500">*</span> Coa Code
              </Label>
              <Input className="bg-pink-50 h-9" defaultValue="COA_2026_00001" />
            </div>
            <div>
              <Label className="text-sm mb-1 block">
                <span className="text-red-500">*</span> Coa Name
              </Label>
              <Input className="bg-pink-50 h-9" />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Segment Separate</Label>
              <Input className="h-9" placeholder="-" />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Status</Label>
              <div className="flex items-center h-9">
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Row 2: Description */}
          <div className="mb-4">
            <Label className="text-sm mb-1 block">Description</Label>
            <Input className="h-9" placeholder="Enter description" />
          </div>

          {/* Details Table */}
          <div className="mt-6">
            {/* Toolbar */}
            <div className="flex items-center gap-2 mb-3">
              <Select defaultValue="all">
                <SelectTrigger className="h-8 w-24 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Input
                className="h-8 text-xs"
                placeholder="Search All Text Columns"
                style={{ width: '250px' }}
              />
              
              <Button variant="outline" size="sm" className="h-8 text-xs px-3">
                Go
              </Button>

              <Select>
                <SelectTrigger className="h-8 w-28 text-xs">
                  <SelectValue placeholder="Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="export">Export</SelectItem>
                  <SelectItem value="import">Import</SelectItem>
                  <SelectItem value="delete">Delete Selected</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="h-8 text-xs px-3">
                Edit
              </Button>

              <Button variant="outline" size="sm" className="h-8 text-xs px-3">
                Add Row
              </Button>

              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="border rounded overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-3 py-2 text-left" style={{ width: '40px' }}>
                      <Checkbox />
                    </th>
                    <th className="px-3 py-2 text-left">
                      <button className="flex items-center gap-1 text-blue-700 font-medium text-xs">
                        <span>Account Number</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="px-3 py-2 text-left text-blue-700 font-medium text-xs">Account Name</th>
                    <th className="px-3 py-2 text-left text-blue-700 font-medium text-xs">Account Type</th>
                    <th className="px-3 py-2 text-left text-blue-700 font-medium text-xs">Responsible</th>
                    <th className="px-3 py-2 text-center text-blue-700 font-medium text-xs">Status</th>
                    <th className="px-3 py-2 text-center text-blue-700 font-medium text-xs">Parent Party</th>
                    <th className="px-3 py-2 text-center text-blue-700 font-medium text-xs">Use Cost Center</th>
                    <th className="px-3 py-2 text-center text-blue-700 font-medium text-xs">Use Cost Element</th>
                    <th className="px-3 py-2 text-center text-blue-700 font-medium text-xs">Reconcile</th>
                  </tr>
                </thead>
                <tbody>
                  {accountDetailData.map(row => (
                    <tr key={row.id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onCheckedChange={() => toggleRowSelection(row.id)}
                        />
                      </td>
                      <td className="px-3 py-2 font-medium text-xs">{row.accountNumber}</td>
                      <td className="px-3 py-2 text-xs">
                        <a href="#" className="text-blue-600 hover:underline">
                          {row.accountName}
                        </a>
                      </td>
                      <td className="px-3 py-2 text-xs">
                        {row.accountType && (
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            row.accountType === 'Assets' ? 'bg-blue-100 text-blue-700' :
                            row.accountType === 'Revenue' ? 'bg-green-100 text-green-700' :
                            row.accountType === 'Liabilities' ? 'bg-yellow-100 text-yellow-700' :
                            row.accountType === 'Equity' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {row.accountType}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-gray-600 text-xs">{row.responsible}</td>
                      <td className="px-3 py-2 text-center">
                        <Checkbox checked={row.status} />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <Checkbox checked={row.parentParty} />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <Checkbox checked={row.useCostCenter} />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <Checkbox checked={row.useCostElement} />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <Checkbox checked={row.reconcile} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <div>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
          <div>
            <Button variant="default">
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}