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
          <div className="border rounded-lg p-4 bg-white mb-6">
            <h3 className="text-sm font-medium mb-4 pb-2 border-b text-gray-700">MAIN INFORMATION</h3>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              
              {/* Row 1 */}
              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> ABO ID
                </Label>
                <Input className="bg-gray-100 h-10" placeholder="Auto generate" readOnly />
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> ASS ID
                </Label>
                <Select>
                  <SelectTrigger className="bg-pink-50 h-10">
                    <SelectValue placeholder="Select asset..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ASS-001">ASS-001 - Máy tính HP ProBook</SelectItem>
                    <SelectItem value="ASS-002">ASS-002 - Xe tải Hyundai HD120</SelectItem>
                    <SelectItem value="ASS-003">ASS-003 - Máy in Canon LBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> ACB ID
                </Label>
                <Select>
                  <SelectTrigger className="bg-pink-50 h-10">
                    <SelectValue placeholder="Select config..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACB-001">ACB-001 - Default Config VAS</SelectItem>
                    <SelectItem value="ACB-002">ACB-002 - Default Config IFRS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row 2 */}
              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> LEN ID
                </Label>
                <Select>
                  <SelectTrigger className="bg-pink-50 h-10">
                    <SelectValue placeholder="Select legal entity..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LEN-001">LEN-001 - CÔNG TY ABC</SelectItem>
                    <SelectItem value="LEN-002">LEN-002 - CHI NHÁNH HN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> LEDGER
                </Label>
                <Select defaultValue="0L">
                  <SelectTrigger className="bg-pink-50 h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0L">0L (VAS)</SelectItem>
                    <SelectItem value="1L">1L (INTERNAL)</SelectItem>
                    <SelectItem value="2L">2L (IFRS)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-1 block">CURRENCY CODE</Label>
                <Select defaultValue="VND">
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VND">VND</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row 3 */}
              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> DEPR START DATE
                </Label>
                <Input type="date" className="bg-pink-50 h-10" defaultValue="2024-01-01" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> LIFE MONTHS
                </Label>
                <Input type="number" className="bg-pink-50 h-10" placeholder="60" min="0" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">DEPR MONTHS</Label>
                <Input type="number" className="h-10" placeholder="0" min="0" defaultValue="0" readOnly />
              </div>

            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 mt-4 pt-4 border-t">
              <div>
                <Label className="text-sm mb-1 block">
                  <span className="text-red-500">*</span> DEPR METHOD
                </Label>
                <Select defaultValue="SL">
                  <SelectTrigger className="bg-pink-50 h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SL">SL (Straight Line)</SelectItem>
                    <SelectItem value="DE">DE (Declining)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-1 block">ORIGINAL COST</Label>
                <Input type="number" className="h-10" placeholder="0" min="0" />
              </div>

              <div>
                <Label className="text-sm mb-1 block">IS DEPRECIATE</Label>
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

              <div>
                <Label className="text-sm mb-1 block">ACCUM DEPR</Label>
                <Input type="number" className="bg-gray-100 h-10" placeholder="0" readOnly />
              </div>

              <div>
                <Label className="text-sm mb-1 block">NET BOOK VALUE</Label>
                <Input type="number" className="bg-gray-100 h-10" placeholder="0" readOnly />
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
