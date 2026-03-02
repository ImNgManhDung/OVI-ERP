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

interface CreateAssetBookProps {
  onClose: () => void;
}

export default function CreateAssetBook({ onClose }: CreateAssetBookProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">CREATE ASSET BOOK</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

            {/* BLOCK 1: MAIN INFORMATION */}
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase border-b pb-2">Main Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> ABO ID</Label>
                  <Input className="bg-gray-100 h-9 text-xs" placeholder="Auto generate" readOnly />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> ASS ID</Label>
                  <Select>
                    <SelectTrigger className="bg-pink-50 h-9 text-xs"><SelectValue placeholder="Select asset..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ASS-001" className="text-xs">ASS-001 - Máy tính HP ProBook</SelectItem>
                      <SelectItem value="ASS-002" className="text-xs">ASS-002 - Xe tải Hyundai HD120</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-3">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> ACB ID</Label>
                  <Select>
                    <SelectTrigger className="bg-pink-50 h-9 text-xs"><SelectValue placeholder="Select config..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACB-001" className="text-xs">ACB-001 - Default Config VAS</SelectItem>
                      <SelectItem value="ACB-002" className="text-xs">ACB-002 - Default Config IFRS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> LEN ID</Label>
                  <Select>
                    <SelectTrigger className="bg-pink-50 h-9 text-xs"><SelectValue placeholder="Entity..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LEN-001" className="text-xs">LEN-001 - CÔNG TY ABC</SelectItem>
                      <SelectItem value="LEN-002" className="text-xs">LEN-002 - CHI NHÁNH HN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> LEDGER</Label>
                  <Select defaultValue="0L">
                    <SelectTrigger className="bg-pink-50 h-9 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0L" className="text-xs">0L (VAS)</SelectItem>
                      <SelectItem value="1L" className="text-xs">1L (INT)</SelectItem>
                      <SelectItem value="2L" className="text-xs">2L (IFRS)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">CURRENCY</Label>
                  <Select defaultValue="VND">
                    <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VND" className="text-xs">VND</SelectItem>
                      <SelectItem value="USD" className="text-xs">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* BLOCK 2: DEPRECIATION SETTINGS */}
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase border-b pb-2">Depreciation Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> DEPR START DATE</Label>
                  <Input type="date" className="bg-pink-50 h-9 text-xs" defaultValue="2024-01-01" />
                </div>

                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> LIFE MONTHS</Label>
                  <Input type="number" className="bg-pink-50 h-9 text-xs" placeholder="60" min="0" />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">DEPR MONTHS</Label>
                  <Input type="number" className="bg-gray-100 h-9 text-xs" placeholder="0" min="0" defaultValue="0" readOnly />
                </div>

                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> DEPR METHOD</Label>
                  <Select defaultValue="SL">
                    <SelectTrigger className="bg-pink-50 h-9 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SL" className="text-xs">SL (Straight Line)</SelectItem>
                      <SelectItem value="DE" className="text-xs">DE (Declining)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">IS DEPRECIATE</Label>
                  <Select defaultValue="Y">
                    <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Y" className="text-xs">Yes</SelectItem>
                      <SelectItem value="N" className="text-xs">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* BLOCK 3: FINANCIAL VALUES */}
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase border-b pb-2">Financial Values</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="text-xs mb-1 block">ORIGINAL COST</Label>
                  <Input type="number" className="h-9 text-xs" placeholder="0" min="0" />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">ACCUM DEPR</Label>
                  <Input type="number" className="bg-gray-100 h-9 text-xs" placeholder="0" readOnly />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">NET BOOK VALUE</Label>
                  <Input type="number" className="bg-gray-100 h-9 text-xs" placeholder="0" readOnly />
                </div>
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
