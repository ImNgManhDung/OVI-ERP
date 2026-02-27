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

interface CreateAssetTransactionProps {
  onClose: () => void;
}

export default function CreateAssetTransaction({ onClose }: CreateAssetTransactionProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-x-auto">
      <div className="bg-white rounded-lg shadow-sm" style={{ width: '1600px' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg">CREATE ASSET TRANSACTION</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="border rounded-lg p-4 bg-white mb-6">
            <h3 className="text-sm font-medium mb-4 pb-2 border-b text-gray-700">MAIN INFORMATION</h3>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> ATR ID
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="Auto generate" readOnly />
              </div>
              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> TRANS CODE
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="ADD0124-0001" />
              </div>
              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> TRANS TYPE
                </Label>
                <Select>
                  <SelectTrigger className="bg-pink-50 h-10">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADDITION">ADDITION</SelectItem>
                    <SelectItem value="ADJUSTMENT">ADJUSTMENT</SelectItem>
                    <SelectItem value="TRANSFER">TRANSFER</SelectItem>
                    <SelectItem value="RETIREMENT">RETIREMENT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> ASSET CODE
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="ACA001-00001" />
              </div>
              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> TRANS DATE
                </Label>
                <Input type="date" className="bg-pink-50 h-10" defaultValue="2026-02-27" />
              </div>
              <div>
                <Label className="text-sm mb-1 block">AMOUNT</Label>
                <Input type="number" className="h-10" placeholder="0" />
              </div>
              <div>
                <Label className="text-sm mb-1 block">CURRENCY</Label>
                <Select defaultValue="VND">
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VND">VND</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-1 block">DESCRIPTION</Label>
                <Input className="h-10" placeholder="Transaction description" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
