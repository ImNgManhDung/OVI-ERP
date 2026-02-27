import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';

interface CreateAccountSetupPopupProps {
  onClose: () => void;
}

export default function CreateAccountSetupPopup({ onClose }: CreateAccountSetupPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl" style={{ width: '600px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">CRUD Accounting account setup</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Row 1: Account Name & Pre ID */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-sm mb-1 block">
                <span className="text-red-500">*</span> Account Name
              </Label>
              <Input className="bg-pink-50 h-10" placeholder="Enter account name" />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Pre ID</Label>
              <Input className="h-10" placeholder="Enter pre ID" />
            </div>
          </div>

          {/* Row 2: Responsible & Change Pre ID */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-sm mb-1 block">Responsible</Label>
              <Select>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select responsible" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user1">User 1</SelectItem>
                  <SelectItem value="user2">User 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-1 block">Change Pre ID</Label>
              <Select>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select change pre ID" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id1">ID 1</SelectItem>
                  <SelectItem value="id2">ID 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Account Type & Account Number */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-sm mb-1 block">
                <span className="text-red-500">*</span> Account Type
              </Label>
              <Select>
                <SelectTrigger className="bg-pink-50 h-10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assets">Assets</SelectItem>
                  <SelectItem value="liabilities">Liabilities</SelectItem>
                  <SelectItem value="equity">Equity</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-1 block">
                <span className="text-red-500">*</span> Account Number
              </Label>
              <Input className="bg-pink-50 h-10" placeholder="Enter number" />
            </div>
          </div>

          {/* Row 4: Status */}
          <div className="mb-4">
            <Label className="text-sm mb-1 block">
              <span className="text-red-500">*</span> Status
            </Label>
            <Select defaultValue="yes">
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 5: Reconcile, Parent Party, Use Cost Center, Use Cost Element */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <Label className="text-sm mb-1 block">Reconcile</Label>
              <div className="flex items-center h-10">
                <Switch />
              </div>
            </div>
            <div>
              <Label className="text-sm mb-1 block">
                <span className="text-red-500">*</span> Parent Party
              </Label>
              <div className="flex items-center h-10">
                <Switch defaultChecked />
              </div>
            </div>
            <div>
              <Label className="text-sm mb-1 block">Use Cost Center</Label>
              <div className="flex items-center h-10">
                <Switch />
              </div>
            </div>
            <div>
              <Label className="text-sm mb-1 block">Use Cost Element</Label>
              <div className="flex items-center h-10">
                <Switch />
              </div>
            </div>
          </div>

          {/* Audit Info Section */}
          <div className="mt-6 pt-4 border-t">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label className="text-sm mb-1 block text-gray-600">Created By</Label>
                <p className="text-sm font-medium">giangch</p>
              </div>
              <div>
                <Label className="text-sm mb-1 block text-gray-600">Create Date</Label>
                <p className="text-sm font-medium">27/01/2026</p>
              </div>
              <div>
                <Label className="text-sm mb-1 block text-gray-600">Modified By</Label>
                <p className="text-sm font-medium">giangch</p>
              </div>
              <div>
                <Label className="text-sm mb-1 block text-gray-600">Modify Date</Label>
                <p className="text-sm font-medium">27/01/2026</p>
              </div>
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