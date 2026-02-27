import { useState } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import MasterDataToolbar from './MasterDataToolbar';

interface ExpensePolicyRow {
  id: number;
  employeeId: string;
  employeeName: string;
  policyMaxValue: string;
  currencyCode: string;
  approvedAmount: string;
  requestedAmount: string;
}

const currencyOptions = ['VND', 'USD', 'EUR', 'JPY', 'SGD'];

export default function ExpensePolicy() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  const [policies, setPolicies] = useState<ExpensePolicyRow[]>([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Nguyễn Văn A',
      policyMaxValue: '15000000',
      currencyCode: 'VND',
      approvedAmount: '12000000',
      requestedAmount: '15000000',
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Trần Thị B',
      policyMaxValue: '10000000',
      currencyCode: 'VND',
      approvedAmount: '8000000',
      requestedAmount: '10000000',
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Lê Văn C',
      policyMaxValue: '8000000',
      currencyCode: 'VND',
      approvedAmount: '0',
      requestedAmount: '8000000',
    },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddRow = () => {
    const newRow: ExpensePolicyRow = {
      id: Date.now(),
      employeeId: '',
      employeeName: '',
      policyMaxValue: '0',
      currencyCode: 'VND',
      approvedAmount: '0',
      requestedAmount: '0',
    };
    setPolicies([...policies, newRow]);
  };

  const handleDeleteRows = () => {
    setPolicies(policies.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const updateRow = (id: number, field: keyof ExpensePolicyRow, value: any) => {
    setPolicies(policies.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const filteredPolicies = policies.filter(row =>
    searchText === '' ||
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const formatCurrency = (value: string, currency: string) => {
    const num = parseInt(value) || 0;
    if (currency === 'VND') {
      return num.toLocaleString('vi-VN');
    }
    return num.toLocaleString('en-US');
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">ADVANCE REGISTRATION - TEM SYSTEM</h1>
        <p className="text-sm text-gray-500 mt-1">
          Quản lý đăng ký tạm ứng chi phí công tác theo nhân viên
        </p>
      </div>

      <MasterDataToolbar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={handleAddRow}
        onDeleteRows={handleDeleteRows}
        onSave={() => console.log('Saving Expense Policies...')}
        selectedCount={selectedRows.length}
      />

      {/* Table */}
      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 border-b">
                <th className="px-3 py-2 text-left">
                  <Checkbox />
                </th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">EMPLOYEE ID</th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">EMPLOYEE NAME</th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">POLICY MAX VALUE</th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">CURRENCY</th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">SỐ TIỀN ĐƯỢC DUYỆT</th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">SỐ TIỀN ĐỀ NGHỊ</th>
              </tr>
            </thead>
            <tbody>
              {filteredPolicies.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-20" />
                      <span>No data found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPolicies.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    
                    {/* EMPLOYEE ID */}
                    <td className="px-3 py-2">
                      <Input
                        value={row.employeeId}
                        onChange={(e) => updateRow(row.id, 'employeeId', e.target.value)}
                        className="h-8 w-32"
                      />
                    </td>
                    
                    {/* EMPLOYEE NAME */}
                    <td className="px-3 py-2">
                      <Input
                        value={row.employeeName}
                        onChange={(e) => updateRow(row.id, 'employeeName', e.target.value)}
                        className="h-8 w-48"
                      />
                    </td>
                    
                    {/* POLICY MAX VALUE */}
                    <td className="px-3 py-2">
                      <Input
                        value={row.policyMaxValue}
                        onChange={(e) => updateRow(row.id, 'policyMaxValue', e.target.value)}
                        className="h-8 w-32 text-right"
                        type="number"
                      />
                    </td>
                    
                    {/* CURRENCY */}
                    <td className="px-3 py-2">
                      <Select
                        value={row.currencyCode}
                        onValueChange={(value) => updateRow(row.id, 'currencyCode', value)}
                      >
                        <SelectTrigger className="h-8 w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencyOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    
                    {/* APPROVED AMOUNT */}
                    <td className="px-3 py-2">
                      <Input
                        value={row.approvedAmount}
                        onChange={(e) => updateRow(row.id, 'approvedAmount', e.target.value)}
                        className="h-8 w-32 text-right"
                        type="number"
                      />
                    </td>
                    
                    {/* REQUESTED AMOUNT */}
                    <td className="px-3 py-2">
                      <Input
                        value={row.requestedAmount}
                        onChange={(e) => updateRow(row.id, 'requestedAmount', e.target.value)}
                        className="h-8 w-32 text-right"
                        type="number"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="bg-gray-50 border-x border-b rounded-b-lg p-4 mt-0">
        <div className="flex justify-end gap-8 text-sm">
          <div className="text-gray-600">
            <span className="font-medium">Tổng số tiền được duyệt:</span>{' '}
            <span className="font-semibold text-green-600">
              {formatCurrency(
                policies.reduce((sum, p) => sum + (parseInt(p.approvedAmount) || 0), 0).toString(),
                'VND'
              )} VND
            </span>
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Tổng số tiền đề nghị:</span>{' '}
            <span className="font-semibold text-blue-600">
              {formatCurrency(
                policies.reduce((sum, p) => sum + (parseInt(p.requestedAmount) || 0), 0).toString(),
                'VND'
              )} VND
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
