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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">CREATE ASSET TRANSACTION</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

            {/* BLOCK 1: TRANSACTION INFORMATION */}
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase border-b pb-2">Transaction Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> ATR ID</Label>
                  <Input className="bg-gray-100 h-9 text-xs" placeholder="Auto generate" readOnly />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> TRANS CODE</Label>
                  <Input className="bg-pink-50 h-9 text-xs" placeholder="ADD0124-0001" />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> TRANS TYPE</Label>
                  <Select>
                    <SelectTrigger className="bg-pink-50 h-9 text-xs">
                      <SelectValue placeholder="Type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADDITION" className="text-xs">ADDITION</SelectItem>
                      <SelectItem value="ADJUSTMENT" className="text-xs">ADJUSTMENT</SelectItem>
                      <SelectItem value="TRANSFER" className="text-xs">TRANSFER</SelectItem>
                      <SelectItem value="RETIREMENT" className="text-xs">RETIREMENT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> ASSET CODE</Label>
                  <Input className="bg-pink-50 h-9 text-xs" placeholder="ACA001-00001" />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block"><span className="text-red-500">*</span> TRANS DATE</Label>
                  <Input type="date" className="bg-pink-50 h-9 text-xs" defaultValue="2026-02-27" />
                </div>
              </div>
            </div>

            {/* BLOCK 2: FINANCIAL DETAILS */}
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase border-b pb-2">Financial Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">AMOUNT</Label>
                  <Input type="number" className="h-9 text-xs" placeholder="0" />
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
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">OLD COST</Label>
                  <Input type="number" className="bg-gray-100 h-9 text-xs" placeholder="0" readOnly />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs mb-1 block">NEW COST</Label>
                  <Input type="number" className="bg-gray-100 h-9 text-xs" placeholder="0" readOnly />
                </div>
              </div>
            </div>

            {/* BLOCK 3: ADDITIONAL INFO */}
            <div className="border rounded-lg p-4 bg-white">
              <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase border-b pb-2">Additional Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="text-xs mb-1 block">DESCRIPTION</Label>
                  <Input className="h-9 text-xs" placeholder="Transaction description" />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">ASSET ACC</Label>
                  <Input className="h-9 text-xs" placeholder="211" />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">OFFSET ACC</Label>
                  <Input className="h-9 text-xs" placeholder="331" />
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
