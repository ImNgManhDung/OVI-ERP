import { X, ChevronDown, Trash2 } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';

interface ApplyDocPopupProps {
  onClose: () => void;
}

interface OffsetDetailRow {
  id: number;
  stt: number;
  invoiceNumber: string;
  documentDate: string;
  dueDate: string;
  amount: number;
  currency: string;
  exchangeRate: number;
  accountedAmount: number;
  remainingAmount: number;
  remainingAccAmount: number;
  convertAmount: number;
  convertExchangeRate: number;
  offsetAmount: number;
  remainingAmountFinal: number;
}

interface OffsetAllocationRow {
  id: number;
  stt: number;
  omaNumber: number;
  odeLineNumber: number;
  fromResourceType: string;
  fromResourceId: string;
  toResourceType: string;
  toResourceId: string;
  offsetCurrency: string;
  fromDocCurrency: string;
  toDocCurrency: string;
  cvrtExchangeRateTo: number;
  cvrtExchangeRateFrom: number;
  cvrtExchangeDate: string;
  offsetAmount: number;
  fromDocAmount: number;
  fromDocAccAmount: number;
  toDocAmount: number;
  toDocAccAmount: number;
  variantAccAmount: number;
  accDebit: string;
  accCredit: string;
  postable: string;
  status: string;
}

export default function ApplyDocPopup({ onClose }: ApplyDocPopupProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedOffsetDetails, setSelectedOffsetDetails] = useState<number[]>([]);
  const [selectedOffsetMapping, setSelectedOffsetMapping] = useState<number[]>([]);

  const offsetDetailData: OffsetDetailRow[] = [
    {
      id: 1,
      stt: 1,
      invoiceNumber: '0000215',
      documentDate: '25/01/2026',
      dueDate: '30/01/2026',
      amount: 1000,
      currency: 'USD',
      exchangeRate: 25000,
      accountedAmount: 25000000,
      remainingAmount: 900,
      remainingAccAmount: 22500000,
      convertAmount: 900,
      convertExchangeRate: 25000,
      offsetAmount: 763,
      remainingAmountFinal: 137
    },
    {
      id: 2,
      stt: 2,
      invoiceNumber: '0000216',
      documentDate: '25/01/2026',
      dueDate: '25/02/2026',
      amount: 28000000,
      currency: 'VND',
      exchangeRate: 1,
      accountedAmount: 28000000,
      remainingAmount: 25000000,
      remainingAccAmount: 25000000,
      convertAmount: 988,
      convertExchangeRate: 25300,
      offsetAmount: 900,
      remainingAmountFinal: 88
    },
    {
      id: 3,
      stt: 3,
      invoiceNumber: '0000217',
      documentDate: '15/12/2025',
      dueDate: '15/01/2026',
      amount: 2000,
      currency: 'USD',
      exchangeRate: 26500,
      accountedAmount: 53000000,
      remainingAmount: 1850,
      remainingAccAmount: 49025000,
      convertAmount: 1850,
      convertExchangeRate: 26500,
      offsetAmount: 1000,
      remainingAmountFinal: 850
    },
    {
      id: 4,
      stt: 4,
      invoiceNumber: '0000218',
      documentDate: '22/12/2025',
      dueDate: '22/02/2025',
      amount: 2500,
      currency: 'EUR',
      exchangeRate: 29000,
      accountedAmount: 72500000,
      remainingAmount: 2400,
      remainingAccAmount: 69600000,
      convertAmount: 2719,
      convertExchangeRate: 25600,
      offsetAmount: 2000,
      remainingAmountFinal: 719
    },
    {
      id: 5,
      stt: 5,
      invoiceNumber: '0000219',
      documentDate: '14/11/2025',
      dueDate: '14/12/2025',
      amount: 60000000,
      currency: 'VND',
      exchangeRate: 1,
      accountedAmount: 60000000,
      remainingAmount: 55000000,
      remainingAccAmount: 55000000,
      convertAmount: 2227,
      convertExchangeRate: 24700,
      offsetAmount: 2000,
      remainingAmountFinal: 227
    },
    {
      id: 6,
      stt: 6,
      invoiceNumber: '0000220',
      documentDate: '26/10/2025',
      dueDate: '26/11/2025',
      amount: 5000,
      currency: 'USD',
      exchangeRate: 26100,
      accountedAmount: 130500000,
      remainingAmount: 4500,
      remainingAccAmount: 117450000,
      convertAmount: 4500,
      convertExchangeRate: 26100,
      offsetAmount: 1000,
      remainingAmountFinal: 3500
    }
  ];

  const offsetMappingData: OffsetAllocationRow[] = [
    {
      id: 1,
      stt: 1,
      omaNumber: 1,
      odeLineNumber: 1,
      fromResourceType: '',
      fromResourceId: 'UT/0126/0001',
      toResourceType: '',
      toResourceId: '0000215',
      offsetCurrency: 'USD',
      fromDocCurrency: 'USD',
      toDocCurrency: 'USD',
      cvrtExchangeRateTo: 25000,
      cvrtExchangeRateFrom: 25000,
      cvrtExchangeDate: '2026-01-25',
      offsetAmount: 763,
      fromDocAmount: 19914300,
      fromDocAccAmount: 19914300,
      toDocAmount: 763,
      toDocAccAmount: 19075000,
      variantAccAmount: 839300,
      accDebit: '1311',
      accCredit: '1311',
      postable: 'N',
      status: 'Active'
    },
    {
      id: 2,
      stt: 2,
      omaNumber: 1,
      odeLineNumber: 2,
      fromResourceType: '',
      fromResourceId: 'UT/0126/0001',
      toResourceType: '',
      toResourceId: '0000216',
      offsetCurrency: 'USD',
      fromDocCurrency: 'USD',
      toDocCurrency: 'VND',
      cvrtExchangeRateTo: 25300,
      cvrtExchangeRateFrom: 25300,
      cvrtExchangeDate: '2026-01-25',
      offsetAmount: 900,
      fromDocAmount: 23490000,
      fromDocAccAmount: 23490000,
      toDocAmount: 22770000,
      toDocAccAmount: 22770000,
      variantAccAmount: 720000,
      accDebit: '1311',
      accCredit: '1311',
      postable: 'N',
      status: 'Active'
    },
    {
      id: 3,
      stt: 3,
      omaNumber: 1,
      odeLineNumber: 3,
      fromResourceType: '',
      fromResourceId: 'UT/0126/0001',
      toResourceType: '',
      toResourceId: '0000217',
      offsetCurrency: 'USD',
      fromDocCurrency: 'USD',
      toDocCurrency: 'USD',
      cvrtExchangeRateTo: 26500,
      cvrtExchangeRateFrom: 26500,
      cvrtExchangeDate: '2026-01-25',
      offsetAmount: 1000,
      fromDocAmount: 26100000,
      fromDocAccAmount: 26100000,
      toDocAmount: 1000,
      toDocAccAmount: 26500000,
      variantAccAmount: 400000,
      accDebit: '1311',
      accCredit: '1311',
      postable: 'N',
      status: 'Active'
    },
    {
      id: 4,
      stt: 4,
      omaNumber: 1,
      odeLineNumber: 4,
      fromResourceType: '',
      fromResourceId: 'UT/0126/0001',
      toResourceType: '',
      toResourceId: '0000218',
      offsetCurrency: 'USD',
      fromDocCurrency: 'USD',
      toDocCurrency: 'EUR',
      cvrtExchangeRateTo: 25600,
      cvrtExchangeRateFrom: 25600,
      cvrtExchangeDate: '2026-01-25',
      offsetAmount: 2000,
      fromDocAmount: 52200000,
      fromDocAccAmount: 52200000,
      toDocAmount: 1766,
      toDocAccAmount: 51200000,
      variantAccAmount: 1000000,
      accDebit: '1311',
      accCredit: '1311',
      postable: 'N',
      status: 'Active'
    },
    {
      id: 5,
      stt: 5,
      omaNumber: 1,
      odeLineNumber: 5,
      fromResourceType: '',
      fromResourceId: 'UT/0126/0001',
      toResourceType: '',
      toResourceId: '0000219',
      offsetCurrency: 'USD',
      fromDocCurrency: 'USD',
      toDocCurrency: 'VND',
      cvrtExchangeRateTo: 24700,
      cvrtExchangeRateFrom: 24700,
      cvrtExchangeDate: '2026-01-25',
      offsetAmount: 2000,
      fromDocAmount: 52200000,
      fromDocAccAmount: 52200000,
      toDocAmount: 49400000,
      toDocAccAmount: 49400000,
      variantAccAmount: 2800000,
      accDebit: '1311',
      accCredit: '1311',
      postable: 'N',
      status: 'Active'
    },
    {
      id: 6,
      stt: 6,
      omaNumber: 1,
      odeLineNumber: 6,
      fromResourceType: '',
      fromResourceId: 'UT/0126/0001',
      toResourceType: '',
      toResourceId: '0000220',
      offsetCurrency: 'USD',
      fromDocCurrency: 'USD',
      toDocCurrency: 'USD',
      cvrtExchangeRateTo: 26100,
      cvrtExchangeRateFrom: 26100,
      cvrtExchangeDate: '2026-01-25',
      offsetAmount: 1000,
      fromDocAmount: 26100000,
      fromDocAccAmount: 26100000,
      toDocAmount: 1000,
      toDocAccAmount: 26100000,
      variantAccAmount: 0,
      accDebit: '1311',
      accCredit: '1311',
      postable: 'N',
      status: 'Active'
    }
  ];

  const toggleOffsetDetailSelection = (id: number) => {
    setSelectedOffsetDetails(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleOffsetMappingSelection = (id: number) => {
    setSelectedOffsetMapping(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl" style={{ width: '1600px', maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold">APPLY DOCUMENT</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* MAIN INFO - 3 BLOCKS */}
          <div className="flex gap-6 mb-6" style={{ width: '1552px' }}>
            
            {/* BLOCK 1 - DOCUMENT INFO - WIDTH: 440px */}
            <div style={{ width: '440px' }}>
              <h3 className="text-sm mb-4">DOCUMENT INFO</h3>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Row 1 - Document Number & Số phiếu thu */}
                <div>
                  <Label className="text-sm mb-1 block">DOCUMENT NUMBER</Label>
                  <Input className="h-10 bg-gray-100" defaultValue="VT001/12-25" disabled />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">SỐ PHIẾU THU</Label>
                  <Input className="h-10 bg-gray-100" defaultValue="VT001/12-25" disabled />
                </div>

                {/* Row 2 - Remaining Amount & Rm Accounted Amount */}
                <div>
                  <Label className="text-sm mb-1 block">REMAINING AMOUNT</Label>
                  <Input className="h-10 bg-gray-100" defaultValue="200,000,000" disabled />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">RM ACCOUNTED AMOUNT</Label>
                  <Input className="h-10 bg-gray-100" defaultValue="200,000,000" disabled />
                </div>

                {/* Row 3 - Exchange Rate & Convert Exchange Rate */}
                <div>
                  <Label className="text-sm mb-1 block">EXCHANGE RATE</Label>
                  <Input className="h-10 bg-gray-100" defaultValue="1" disabled />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">CONVERT EXCHANGE RATE</Label>
                  <Input className="h-10 bg-gray-100" defaultValue="26,100" disabled />
                </div>
              </div>
            </div>

            {/* BLOCK 2 - TRANSACTION INFO - WIDTH: 440px */}
            <div style={{ width: '440px' }}>
              <h3 className="text-sm mb-4">TRANSACTION INFO</h3>
              <div className="grid grid-cols-3 gap-4">
                
                {/* Row 1 - Transaction Type & Offset Currency */}
                <div className="col-span-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> TRANSACTION TYPE
                      </Label>
                      <Select defaultValue="receipt">
                        <SelectTrigger className="bg-pink-50 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="receipt">Phiếu thu</SelectItem>
                          <SelectItem value="payment">Phiếu chi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">
                        <span className="text-red-500">*</span> OFFSET CURRENCY
                      </Label>
                      <Select defaultValue="usd">
                        <SelectTrigger className="bg-pink-50 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vnd">VND</SelectItem>
                          <SelectItem value="usd">USD</SelectItem>
                          <SelectItem value="eur">EUR</SelectItem>
                          <SelectItem value="gbp">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Row 2 - Object Name */}
                <div className="col-span-3">
                  <Label className="text-sm mb-1 block">OBJECT NAME</Label>
                  <Input className="h-10" defaultValue="CÔNG TY TNHH ABC" />
                </div>

                {/* Row 3 - Posting Date & Posting Status */}
                <div className="col-span-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm mb-1 block">POSTING DATE</Label>
                      <Input type="date" className="h-10" defaultValue="2025-12-30" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">POSTING STATUS</Label>
                      <Select defaultValue="draft">
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="posted">Posted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BLOCK 3 - OFFSET INFO - WIDTH: 440px */}
            <div style={{ width: '440px' }}>
              <h3 className="text-sm mb-4">OFFSET INFO</h3>
              <div className="grid grid-cols-3 gap-4">
                
                {/* Row 1 - Offset ID & Offset Code */}
                <div className="col-span-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm mb-1 block">OFFSET ID</Label>
                      <Input className="h-10" placeholder="Enter offset ID" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">OFFSET CODE</Label>
                      <Input className="h-10" placeholder="Enter offset code" />
                    </div>
                  </div>
                </div>

                {/* Row 2 - Offset Name, Offset Date, Status */}
                <div>
                  <Label className="text-sm mb-1 block">OFFSET NAME</Label>
                  <Input className="h-10" placeholder="Offset name" />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">OFFSET DATE</Label>
                  <Input type="date" className="h-10" defaultValue="2025-12-30" />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">STATUS</Label>
                  <Select defaultValue="active">
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Row 3 - Offset Debit, Offset Credit, Offset Balance */}
                <div>
                  <Label className="text-sm mb-1 block">OFFSET DEBIT</Label>
                  <Input className="h-10" type="number" defaultValue="0" />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">OFFSET CREDIT</Label>
                  <Input className="h-10" type="number" defaultValue="0" />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">OFFSET BALANCE</Label>
                  <Input className="h-10 bg-gray-100" type="number" defaultValue="0" disabled />
                </div>
              </div>
            </div>
          </div>

          {/* DETAILS SECTION - SINGLE TABLE */}
          <div className="mt-6">
            <div className="border-b pb-2 mb-4">
              <h3 className="text-sm font-semibold text-blue-600">OFFSET ALLOCATION</h3>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mb-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Search All Text Columns"
                className="w-64 h-8"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button variant="outline" size="sm">Go</Button>
              <Button variant="outline" size="sm">
                Actions <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="outline" size="sm">Add Row</Button>
              <Button variant="outline" size="sm" disabled={selectedOffsetMapping.length === 0}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Unified Offset Allocation Table */}
            <div className="border rounded overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-3 py-2 text-left"><Checkbox /></th>
                    <th className="px-3 py-2 text-left text-blue-700">STT</th>
                    <th className="px-3 py-2 text-left text-blue-700">OMA NUMBER</th>
                    <th className="px-3 py-2 text-left text-blue-700">LINE NUMBER</th>
                    <th className="px-3 py-2 text-left text-blue-700">FROM RES TYPE</th>
                    <th className="px-3 py-2 text-left text-blue-700">FROM RES ID</th>
                    <th className="px-3 py-2 text-left text-blue-700">TO RES TYPE</th>
                    <th className="px-3 py-2 text-left text-blue-700">TO RES ID</th>
                    <th className="px-3 py-2 text-left text-blue-700">OFFSET CURRENCY</th>
                    <th className="px-3 py-2 text-left text-blue-700">FROM CURRENCY</th>
                    <th className="px-3 py-2 text-left text-blue-700">TO CURRENCY</th>
                    <th className="px-3 py-2 text-left text-blue-700">CVRT RATE TO</th>
                    <th className="px-3 py-2 text-left text-blue-700">CVRT RATE FROM</th>
                    <th className="px-3 py-2 text-left text-blue-700">CVRT DATE</th>
                    <th className="px-3 py-2 text-left text-blue-700">OFFSET AMOUNT</th>
                    <th className="px-3 py-2 text-left text-blue-700">FROM DOC AMT</th>
                    <th className="px-3 py-2 text-left text-blue-700">FROM DOC ACC AMT</th>
                    <th className="px-3 py-2 text-left text-blue-700">TO DOC AMT</th>
                    <th className="px-3 py-2 text-left text-blue-700">TO DOC ACC AMT</th>
                    <th className="px-3 py-2 text-left text-blue-700">VARIANT ACC AMT</th>
                    <th className="px-3 py-2 text-left text-blue-700">ACC DEBIT</th>
                    <th className="px-3 py-2 text-left text-blue-700">ACC CREDIT</th>
                    <th className="px-3 py-2 text-left text-blue-700">POSTABLE</th>
                    <th className="px-3 py-2 text-left text-blue-700">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {offsetMappingData.map(row => (
                    <tr key={row.id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <Checkbox 
                          checked={selectedOffsetMapping.includes(row.id)}
                          onCheckedChange={() => toggleOffsetMappingSelection(row.id)}
                        />
                      </td>
                      <td className="px-3 py-2 text-green-600 font-medium">{row.stt}</td>
                      <td className="px-3 py-2">
                        <Input className="h-8 w-20" type="number" defaultValue={row.omaNumber} />
                      </td>
                      <td className="px-3 py-2">
                        <Input className="h-8 w-20" type="number" defaultValue={row.odeLineNumber} />
                      </td>
                      <td className="px-3 py-2">
                        <Select defaultValue={row.fromResourceType || "RECEIPT"}>
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="RECEIPT">RECEIPT</SelectItem>
                            <SelectItem value="PAYMENT">PAYMENT</SelectItem>
                            <SelectItem value="I_INVOICE">I_INVOICE</SelectItem>
                            <SelectItem value="O_INVOICE">O_INVOICE</SelectItem>
                            <SelectItem value="I_INV_MEMO">I_INV_MEMO</SelectItem>
                            <SelectItem value="O_INV_MEMO">O_INV_MEMO</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2">
                        <Input className="h-8 w-32" defaultValue={row.fromResourceId} />
                      </td>
                      <td className="px-3 py-2">
                        <Select defaultValue={row.toResourceType || "I_INVOICE"}>
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="RECEIPT">RECEIPT</SelectItem>
                            <SelectItem value="PAYMENT">PAYMENT</SelectItem>
                            <SelectItem value="I_INVOICE">I_INVOICE</SelectItem>
                            <SelectItem value="O_INVOICE">O_INVOICE</SelectItem>
                            <SelectItem value="I_INV_MEMO">I_INV_MEMO</SelectItem>
                            <SelectItem value="O_INV_MEMO">O_INV_MEMO</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2">
                        <Input className="h-8 w-32" defaultValue={row.toResourceId} />
                      </td>
                      <td className="px-3 py-2">
                        <Select defaultValue={row.offsetCurrency}>
                          <SelectTrigger className="h-8 w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="VND">VND</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="JPY">JPY</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2">
                        <Select defaultValue={row.fromDocCurrency}>
                          <SelectTrigger className="h-8 w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="VND">VND</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="JPY">JPY</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2">
                        <Select defaultValue={row.toDocCurrency}>
                          <SelectTrigger className="h-8 w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="VND">VND</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="JPY">JPY</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2">
                        <Input className="h-8 w-28 text-right" type="number" step="0.0001" defaultValue={row.cvrtExchangeRateTo} />
                      </td>
                      <td className="px-3 py-2">
                        <Input className="h-8 w-28 text-right" type="number" step="0.0001" defaultValue={row.cvrtExchangeRateFrom} />
                      </td>
                      <td className="px-3 py-2">
                        <Input className="h-8 w-32" type="date" defaultValue={row.cvrtExchangeDate} />
                      </td>
                      <td className="px-3 py-2">
                        <Input className="h-8 w-32 text-right" type="number" defaultValue={row.offsetAmount} />
                      </td>
                      <td className="px-3 py-2 text-right">{row.fromDocAmount.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right">{row.fromDocAccAmount.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right">{row.toDocAmount.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right">{row.toDocAccAmount.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right">{row.variantAccAmount.toLocaleString()}</td>
                      <td className="px-3 py-2">
                        <Input className="h-8 w-24" defaultValue={row.accDebit} />
                      </td>
                      <td className="px-3 py-2">
                        <Input className="h-8 w-24" defaultValue={row.accCredit} />
                      </td>
                      <td className="px-3 py-2">
                        <Select defaultValue={row.postable}>
                          <SelectTrigger className="h-8 w-16">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Y">Y</SelectItem>
                            <SelectItem value="N">N</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2">
                        <Select defaultValue={row.status}>
                          <SelectTrigger className="h-8 w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Posted">Posted</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="text-right text-sm text-gray-600 mt-2">
              Total: {offsetMappingData.length}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t bg-white sticky bottom-0">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>CANCEL</Button>
            <Button variant="default">SAVE</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="default">APPLY</Button>
            <Button variant="default">CONFIRM</Button>
          </div>
        </div>
      </div>
    </div>
  );
}