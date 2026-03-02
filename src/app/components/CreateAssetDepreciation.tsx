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

interface CreateAssetDepreciationProps {
  onClose: () => void;
}

export default function CreateAssetDepreciation({ onClose }: CreateAssetDepreciationProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">CREATE ASSET DEPRECIATION</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

            {/* BLOCK 1: ASSET INFORMATION */}
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase border-b pb-2">Asset Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> ADE ID</Label>
                  <Input className="bg-gray-100 h-9 text-xs" placeholder="Auto generate" readOnly />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> ASSET CODE</Label>
                  <Input className="bg-pink-50 h-9 text-xs" placeholder="ACA001-00001" />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> BOOK CODE</Label>
                  <Select>
                    <SelectTrigger className="bg-pink-50 h-9 text-xs">
                      <SelectValue placeholder="Select book..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BOOK-ACC" className="text-xs">BOOK-ACC</SelectItem>
                      <SelectItem value="BOOK-TAX" className="text-xs">BOOK-TAX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">DEPR METHOD</Label>
                  <Input className="bg-gray-100 h-9 text-xs" placeholder="STRAIGHT_LINE" readOnly />
                </div>
              </div>
            </div>

            {/* BLOCK 2: DEPRECIATION DETAILS */}
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase border-b pb-2">Depreciation Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> PERIOD DATE</Label>
                  <Input type="date" className="bg-pink-50 h-9 text-xs" defaultValue="2026-01-31" />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">DEPR AMOUNT</Label>
                  <Input type="number" className="h-9 text-xs" placeholder="0" />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">ADJUST AMOUNT</Label>
                  <Input type="number" className="h-9 text-xs" placeholder="0" />
                </div>
              </div>
            </div>

            {/* BLOCK 3: FINANCIAL VALUES */}
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase border-b pb-2">Financial Values</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="text-xs mb-1 block">ORIGINAL COST</Label>
                  <Input type="number" className="bg-gray-100 h-9 text-xs" placeholder="0" readOnly />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">ACC DEPR AMOUNT</Label>
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
