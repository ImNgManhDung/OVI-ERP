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

interface CreateAssetCategoryProps {
  onClose: () => void;
}

export default function CreateAssetCategory({ onClose }: CreateAssetCategoryProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">CREATE ASSET CATEGORY</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* FORM GRID: 3 BLOCKS */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

            {/* BLOCK 1: MAIN INFORMATION */}
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase border-b pb-2">Main Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> ACA ID</Label>
                  <Input className="bg-gray-100 h-9 text-xs" placeholder="Auto generate" readOnly />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> CATEGORY CODE</Label>
                  <Input className="bg-pink-50 h-9 text-xs" placeholder="TS-MMTB" />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> ASSET TYPE</Label>
                  <Select>
                    <SelectTrigger className="bg-pink-50 h-9 text-xs">
                      <SelectValue placeholder="Type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TANGIBLE" className="text-xs">TANGIBLE</SelectItem>
                      <SelectItem value="INTANGIBLE" className="text-xs">INTANGIBLE</SelectItem>
                      <SelectItem value="CIP" className="text-xs">CIP</SelectItem>
                      <SelectItem value="PREPAID" className="text-xs">PREPAID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> CATEGORY NAME</Label>
                  <Input className="bg-pink-50 h-9 text-xs" placeholder="Máy móc thiết bị" />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">PARENT ID</Label>
                  <Select>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue placeholder="Parent..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none" className="text-xs">None</SelectItem>
                      <SelectItem value="ACA-001" className="text-xs">ACA-001</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">LEVEL</Label>
                  <Input type="number" className="h-9 text-xs" defaultValue="1" min="1" max="5" />
                </div>
              </div>
            </div>

            {/* BLOCK 2: ACCOUNTING INFORMATION */}
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase border-b pb-2">Accounting Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> ASSET ACC</Label>
                  <Input className="bg-pink-50 h-9 text-xs" placeholder="211" />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> DEPR ACC</Label>
                  <Input className="bg-pink-50 h-9 text-xs" placeholder="214" />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> EXPENSE ACC</Label>
                  <Input className="bg-pink-50 h-9 text-xs" placeholder="641" />
                </div>

                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">DISPOSAL LOSS ACC</Label>
                  <Input className="h-9 text-xs" placeholder="811" />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">DISPOSAL GAIN ACC</Label>
                  <Input className="h-9 text-xs" placeholder="711" />
                </div>
              </div>
            </div>

            {/* BLOCK 3: OTHER INFORMATION */}
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase border-b pb-2">Other Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <Label className="text-xs mb-1 block">DESCRIPTION</Label>
                  <Input className="h-9 text-xs" placeholder="Mô tả loại tài sản..." />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">IS ACTIVE</Label>
                  <Select defaultValue="Y">
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Y" className="text-xs">Yes</SelectItem>
                      <SelectItem value="N" className="text-xs">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
