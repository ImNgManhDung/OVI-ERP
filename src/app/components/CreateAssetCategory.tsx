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
          {/* MAIN INFO - 3 ROWS x 3 COLS */}
          <div className="border rounded-lg p-4 bg-white mb-6">
            <h3 className="text-sm font-medium mb-4 pb-2 border-b text-gray-700">MAIN INFORMATION</h3>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              
              {/* Row 1 */}
              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> ACA ID
                </Label>
                <Input className="bg-gray-100 h-10" placeholder="Auto generate" readOnly />
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> CATEGORY CODE
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="TS-MMTB" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> ASSET TYPE
                </Label>
                <Select>
                  <SelectTrigger className="bg-pink-50 h-10">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TANGIBLE">TANGIBLE (Hữu hình)</SelectItem>
                    <SelectItem value="INTANGIBLE">INTANGIBLE (Vô hình)</SelectItem>
                    <SelectItem value="CIP">CIP (XDCB dở dang)</SelectItem>
                    <SelectItem value="PREPAID">PREPAID (Chi phí trả trước)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row 2 */}
              <div className="col-span-2">
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> CATEGORY NAME
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="Máy móc thiết bị" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">PARENT ID</Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select parent..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Root level)</SelectItem>
                    <SelectItem value="ACA-001">ACA-001 - Máy móc thiết bị</SelectItem>
                    <SelectItem value="ACA-002">ACA-002 - Nhà và vật kiến trúc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row 3 */}
              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> ASSET ACC
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="211" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> DEPR ACC
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="214" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> EXPENSE ACC
                </Label>
                <Input className="bg-pink-50 h-10" placeholder="641" />
              </div>

            </div>

            {/* Additional Fields - GL Accounts + Description */}
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 mt-4 pt-4 border-t">
              <div>
                <Label className="text-sm mb-1 block">DISPOSAL LOSS ACC</Label>
                <Input className="h-10" placeholder="811" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">DISPOSAL GAIN ACC</Label>
                <Input className="h-10" placeholder="711" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">LEVEL</Label>
                <Input type="number" className="h-10" defaultValue="1" min="1" max="5" />
              </div>

              <div className="col-span-2">
                <Label className="text-sm mb-1 block">DESCRIPTION</Label>
                <Input className="h-10" placeholder="Mô tả loại tài sản..." />
              </div>

              <div>
                <Label className="text-sm mb-1 block">IS ACTIVE</Label>
                <Select defaultValue="Y">
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
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
