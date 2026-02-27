import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ColumnsDialog } from './ColumnsDialog';
import { ActionsDropdown } from './ActionsDropdown';

interface LedgerRow {
  id: number;
  docType: string;
  postingDate: string;
  documentDate: string;
  documentNumber: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  debitAmount: number;
  creditAmount: number;
  accountedAmount: number;
  currencyCode: string;
  objectId?: string;
  objectName?: string;
  costCenter?: string;
  project?: string;
  costElements?: string;
  products?: string;
  profitCenter?: string;
  extensionAnalysis?: string;
}

export default function AccountLedger() {
  const [searchText, setSearchText] = useState('');
  const [columnsDialogOpen, setColumnsDialogOpen] = useState(false);
  const [customerFilter, setCustomerFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  const [columnConfig, setColumnConfig] = useState([
    { id: 'docType', label: 'Doc Type', displayed: true },
    { id: 'postingDate', label: 'Posting Date', displayed: true },
    { id: 'documentDate', label: 'Document Date', displayed: true },
    { id: 'documentNumber', label: 'Document Number', displayed: true },
    { id: 'description', label: 'Description', displayed: true },
    { id: 'debitAccount', label: 'Debit Account', displayed: true },
    { id: 'creditAccount', label: 'Credit Account', displayed: true },
    { id: 'debitAmount', label: 'Debit Amount', displayed: true },
    { id: 'creditAmount', label: 'Credit Amount', displayed: true },
    { id: 'accountedAmount', label: 'Accounted Amount', displayed: true },
    { id: 'currencyCode', label: 'Currency', displayed: true },
    { id: 'objectId', label: 'Object ID', displayed: false },
    { id: 'objectName', label: 'Object Name', displayed: false },
    { id: 'costCenter', label: 'Cost Center', displayed: false },
    { id: 'project', label: 'Project', displayed: false },
    { id: 'costElements', label: 'Cost Elements', displayed: false },
    { id: 'products', label: 'Products', displayed: false },
    { id: 'profitCenter', label: 'Profit Center', displayed: false },
    { id: 'extensionAnalysis', label: 'Extension Analysis', displayed: false },
  ]);
  
  const [ledgerData] = useState<LedgerRow[]>([
    {
      id: 1,
      docType: 'SI',
      postingDate: '01-12-2025',
      documentDate: '01-12-2025',
      documentNumber: 'SI-2025-0001',
      description: 'Bán hàng cho khách hàng CÔNG TY A',
      debitAccount: '131',
      creditAccount: '511',
      debitAmount: 100000000,
      creditAmount: 0,
      accountedAmount: 100000000,
      currencyCode: 'VND',
      objectId: 'OBJ001',
      objectName: 'CÔNG TY A',
      costCenter: 'CC-001',
      project: 'PRJ-2025-A',
      costElements: 'CE-100',
      products: 'PROD-A1',
      profitCenter: 'PC-NORTH',
      extensionAnalysis: 'EA-Q4-2025'
    },
    {
      id: 2,
      docType: 'CR',
      postingDate: '05-12-2025',
      documentDate: '05-12-2025',
      documentNumber: 'CR-2025-0010',
      description: 'Thu tiền từ khách hàng CÔNG TY A',
      debitAccount: '111',
      creditAccount: '131',
      debitAmount: 0,
      creditAmount: 50000000,
      accountedAmount: 50000000,
      currencyCode: 'VND',
      objectId: 'OBJ001',
      objectName: 'CÔNG TY A',
      costCenter: 'CC-001',
      project: 'PRJ-2025-A',
      costElements: 'CE-100',
      products: 'PROD-A1',
      profitCenter: 'PC-NORTH',
      extensionAnalysis: 'EA-Q4-2025'
    },
    {
      id: 3,
      docType: 'SI',
      postingDate: '10-12-2025',
      documentDate: '10-12-2025',
      documentNumber: 'SI-2025-0015',
      description: 'Bán hàng cho khách hàng CÔNG TY B',
      debitAccount: '131',
      creditAccount: '511',
      debitAmount: 75000000,
      creditAmount: 0,
      accountedAmount: 125000000,
      currencyCode: 'VND',
      objectId: 'OBJ002',
      objectName: 'CÔNG TY B',
      costCenter: 'CC-002',
      project: 'PRJ-2025-B',
      costElements: 'CE-200',
      products: 'PROD-B2',
      profitCenter: 'PC-SOUTH',
      extensionAnalysis: 'EA-Q4-2025'
    },
    {
      id: 4,
      docType: 'CR',
      postingDate: '15-12-2025',
      documentDate: '15-12-2025',
      documentNumber: 'CR-2025-0025',
      description: 'Thu tiền từ khách hàng CÔNG TY B',
      debitAccount: '112',
      creditAccount: '131',
      debitAmount: 0,
      creditAmount: 75000000,
      accountedAmount: 50000000,
      currencyCode: 'VND',
      objectId: 'OBJ002',
      objectName: 'CÔNG TY B',
      costCenter: 'CC-002',
      project: 'PRJ-2025-B',
      costElements: 'CE-200',
      products: 'PROD-B2',
      profitCenter: 'PC-SOUTH',
      extensionAnalysis: 'EA-Q4-2025'
    },
    {
      id: 5,
      docType: 'SI',
      postingDate: '20-12-2025',
      documentDate: '20-12-2025',
      documentNumber: 'SI-2025-0028',
      description: 'Bán hàng cho khách hàng CÔNG TY C',
      debitAccount: '131',
      creditAccount: '511',
      debitAmount: 150000000,
      creditAmount: 0,
      accountedAmount: 200000000,
      currencyCode: 'VND',
      objectId: 'OBJ003',
      objectName: 'CÔNG TY C',
      costCenter: 'CC-003',
      project: 'PRJ-2025-C',
      costElements: 'CE-300',
      products: 'PROD-C3',
      profitCenter: 'PC-CENTRAL',
      extensionAnalysis: 'EA-Q4-2025'
    },
    {
      id: 6,
      docType: 'CR',
      postingDate: '25-12-2025',
      documentDate: '24-12-2025',
      documentNumber: 'CR-2025-0035',
      description: 'Thu tiền từ khách hàng CÔNG TY A - đợt 2',
      debitAccount: '111',
      creditAccount: '131',
      debitAmount: 0,
      creditAmount: 50000000,
      accountedAmount: 150000000,
      currencyCode: 'VND',
      objectId: 'OBJ001',
      objectName: 'CÔNG TY A',
      costCenter: 'CC-001',
      project: 'PRJ-2025-A',
      costElements: 'CE-100',
      products: 'PROD-A1',
      profitCenter: 'PC-NORTH',
      extensionAnalysis: 'EA-Q4-2025'
    }
  ]);

  const filteredLedger = ledgerData.filter(row =>
    searchText === '' ||
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  const visibleColumns = columnConfig.filter(col => col.displayed);

  const getCellValue = (row: LedgerRow, colId: string) => {
    const value = row[colId as keyof LedgerRow];
    
    // Format currency for amount columns
    if (['debitAmount', 'creditAmount', 'accountedAmount'].includes(colId)) {
      return typeof value === 'number' && value > 0 ? formatCurrency(value) : '-';
    }
    
    return value || '-';
  };

  const getCellClassName = (colId: string) => {
    // Right align for amount columns
    if (['debitAmount', 'creditAmount', 'accountedAmount'].includes(colId)) {
      return 'px-3 py-2 text-blue-600 text-right';
    }
    
    // Special styling for document number
    if (colId === 'documentNumber') {
      return 'px-3 py-2 text-blue-600 font-medium';
    }
    
    // Center align for currency
    if (colId === 'currencyCode') {
      return 'px-3 py-2 text-gray-900 text-center';
    }
    
    return 'px-3 py-2 text-gray-900';
  };

  const getHeaderClassName = (colId: string) => {
    if (['debitAmount', 'creditAmount', 'accountedAmount'].includes(colId)) {
      return 'px-3 py-2 text-right text-blue-700 uppercase';
    }
    
    if (colId === 'currencyCode') {
      return 'px-3 py-2 text-center text-blue-700 uppercase';
    }
    
    return 'px-3 py-2 text-left text-blue-700 uppercase';
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">BUSINESS RECEIVABLE LEDGER</h1>
        <p className="text-sm text-gray-500 mt-1">
          Sổ chi tiết nghiệp vụ phải thu
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white border rounded-lg p-4 mb-4">
        <div className="grid grid-cols-12 gap-4 items-end">
          {/* Customer Filter */}
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer
            </label>
            <Select value={customerFilter} onValueChange={setCustomerFilter}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="OBJ001">CÔNG TY A</SelectItem>
                <SelectItem value="OBJ002">CÔNG TY B</SelectItem>
                <SelectItem value="OBJ003">CÔNG TY C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* From Date */}
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <Input
              type="date"
              className="h-9"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              placeholder="dd/mm/yyyy"
            />
          </div>

          {/* To Date */}
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <Input
              type="date"
              className="h-9"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              placeholder="dd/mm/yyyy"
            />
          </div>

          {/* Action Buttons */}
          <div className="col-span-2 flex gap-2">
            <Button className="flex-1 h-9">Find</Button>
            <Button variant="outline" className="flex-1 h-9">Clear</Button>
          </div>
        </div>
      </div>

      {/* Search and Actions Bar */}
      <div className="bg-white border rounded-t-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="account-131">Account 131</SelectItem>
              <SelectItem value="account-331">Account 331</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search All Text Columns"
            className="w-64 h-8"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="outline" size="sm">Go</Button>
          <ActionsDropdown onColumnsClick={() => setColumnsDialogOpen(true)} />
          <Button variant="outline" size="sm">Export</Button>
          <Button variant="outline" size="sm">Print</Button>
        </div>
        <Button variant="outline" size="sm">Reset</Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 border-b">
                {visibleColumns.map(col => (
                  <th key={col.id} className={getHeaderClassName(col.id)}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLedger.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-20" />
                      <span>No data found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLedger.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    {visibleColumns.map(col => (
                      <td key={col.id} className={getCellClassName(col.id)}>
                        {getCellValue(row, col.id)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 border-t">
                <td className="px-3 py-3"></td>
                <td className="px-3 py-3"></td>
                <td className="px-3 py-3"></td>
                <td className="px-3 py-3 text-right font-semibold text-gray-700">TOTAL:</td>
                <td className="px-3 py-3"></td>
                <td className="px-3 py-3"></td>
                <td className="px-3 py-3 text-right font-semibold text-blue-700">
                  {formatCurrency(filteredLedger.reduce((sum, row) => sum + row.debitAmount, 0))}
                </td>
                <td className="px-3 py-3 text-right font-semibold text-blue-700">
                  {formatCurrency(filteredLedger.reduce((sum, row) => sum + row.creditAmount, 0))}
                </td>
                <td className="px-3 py-3 text-right font-semibold text-blue-700">
                  {formatCurrency(filteredLedger.reduce((sum, row) => sum + row.accountedAmount, 0))}
                </td>
                <td className="px-3 py-3"></td>
                <td className="px-3 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Total Records */}
        <div className="px-4 py-2 bg-gray-50 text-sm text-right text-gray-600 border-t">
          Total Records: {filteredLedger.length}
        </div>
      </div>

      {/* Columns Dialog */}
      <ColumnsDialog
        open={columnsDialogOpen}
        onOpenChange={setColumnsDialogOpen}
        columns={columnConfig}
        onSave={setColumnConfig}
      />
    </div>
  );
}