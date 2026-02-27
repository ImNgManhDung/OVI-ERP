import { useState } from 'react';
import { Search } from 'lucide-react';
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

interface CashFlowRow {
  id: number;
  cflId: string; // Số seq
  cfCode: string; // Auto-increment = CF_type + CF Class + 02 STT
  cfType: string; // LOV
  cfClass: string; // LOV
  cfCategory: string; // LOV
  cfName: string;
  isParent: boolean;
  parentId: string;
  level: string;
}

// CF Type options
const cfTypeOptions = [
  'Hoạt động kinh doanh',
  'Hoạt động đầu tư',
  'Hoạt động tài chính',
];

// CF Class options
const cfClassOptions = [
  '1. Tiền chi để mua sắm, xây dựng TSCĐ và các tài sản dài hạn khác',
  '2. Tiền thu từ thanh lý, nhượng bán TSCĐ và các tài sản dài hạn khác',
  '3. Tiền chi cho vay, mua các công cụ nợ của đơn vị khác',
  '4. Tiền thu hồi cho vay, bán lại các công cụ nợ của đơn vị khác',
  '5. Tiền chi đầu tư góp vốn vào đơn vị khác',
  '6. Tiền thu hồi đầu tư góp vốn vào đơn vị khác',
  '7. Tiền thu lãi cho vay, cổ tức và lợi nhuận được chia',
  '8. Tiền thu từ phát hành cổ phiếu, nhận vốn góp của chủ sở hữu',
  '9. Tiền trả lại vốn góp cho các chủ sở hữu, mua lại cổ phiếu của doanh nghiệp đã phát hành',
  '10. Tiền thu từ đi vay',
  '11. Tiền trả nợ gốc vay',
  '12. Tiền trả nợ gốc thuê tài chính',
  '13. Cổ tức, lợi nhuận đã trả cho chủ sở hữu',
];

// CF Category options
const cfCategoryOptions = [
  'Xây dựng',
  'Tư vấn xây dựng',
  'Tư vấn khác',
  'Trang thiết bị',
  'Văn phòng',
  'Bất động sản',
  'Dịch vụ khác',
  'Tiếp khách',
];

export default function CashFlow() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  const [cashFlows, setCashFlows] = useState<CashFlowRow[]>([
    {
      id: 1,
      cflId: '1',
      cfCode: 'HĐKD0101',
      cfType: 'Hoạt động kinh doanh',
      cfClass: '1. Tiền chi để mua sắm, xây dựng TSCĐ và các tài sản dài hạn khác',
      cfCategory: 'Xây dựng',
      cfName: 'Chi phí xây dựng cơ bản',
      isParent: true,
      parentId: '',
      level: '1',
    },
    {
      id: 2,
      cflId: '2',
      cfCode: 'HĐKD0102',
      cfType: 'Hoạt động kinh doanh',
      cfClass: '1. Tiền chi để mua sắm, xây dựng TSCĐ và các tài sản dài hạn khác',
      cfCategory: 'Trang thiết bị',
      cfName: 'Mua sắm thiết bị văn phòng',
      isParent: false,
      parentId: '1',
      level: '2',
    },
    {
      id: 3,
      cflId: '3',
      cfCode: 'HĐĐT0701',
      cfType: 'Hoạt động đầu tư',
      cfClass: '7. Tiền thu lãi cho vay, cổ tức và lợi nhuận được chia',
      cfCategory: 'Dịch vụ khác',
      cfName: 'Thu lãi cho vay',
      isParent: true,
      parentId: '',
      level: '1',
    },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddRow = () => {
    const newRow: CashFlowRow = {
      id: Date.now(),
      cflId: (cashFlows.length + 1).toString(),
      cfCode: '',
      cfType: '',
      cfClass: '',
      cfCategory: '',
      cfName: '',
      isParent: false,
      parentId: '',
      level: '1',
    };
    setCashFlows([...cashFlows, newRow]);
  };

  const handleDeleteRows = () => {
    setCashFlows(cashFlows.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const updateRow = (id: number, field: keyof CashFlowRow, value: any) => {
    setCashFlows(cashFlows.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        
        // Auto-generate CF Code when CF Type or CF Class changes
        if (field === 'cfType' || field === 'cfClass') {
          const type = field === 'cfType' ? value : row.cfType;
          const classValue = field === 'cfClass' ? value : row.cfClass;
          
          if (type && classValue) {
            // Extract type code
            let typeCode = '';
            if (type === 'Hoạt động kinh doanh') typeCode = 'HĐKD';
            else if (type === 'Hoạt động đầu tư') typeCode = 'HĐĐT';
            else if (type === 'Hoạt động tài chính') typeCode = 'HĐTC';
            
            // Extract class number (first 1-2 digits)
            const classMatch = classValue.match(/^(\d+)\./);
            const classNum = classMatch ? classMatch[1].padStart(2, '0') : '00';
            
            // Generate sequential number (01, 02, etc.)
            const seq = '01'; // This should be calculated based on existing codes
            
            updatedRow.cfCode = `${typeCode}${classNum}${seq}`;
          }
        }
        
        return updatedRow;
      }
      return row;
    }));
  };

  const filteredCashFlows = cashFlows.filter(row =>
    searchText === '' ||
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 uppercase tracking-tight">Cash Flow - FCM System</h1>
        <p className="text-sm text-gray-500 mt-1">
          Quản lý danh mục dòng tiền theo hoạt động kinh doanh, đầu tư và tài chính
        </p>
      </div>

      <MasterDataToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={handleAddRow}
        onDeleteRows={handleDeleteRows}
        onSave={() => console.log('Saving Cash Flow...')}
        selectedCount={selectedRows.length}
      />

      {/* Table */}
      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 border-b">
                <th className="px-3 py-2 text-left">
                  <Checkbox />
                </th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">CFL_ID</th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">CF CODE</th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">CF TYPE</th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">CF CLASS</th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">CF CATEGORY</th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">CF NAME</th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">IS PARENT</th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">PARENT ID</th>
                <th className="px-3 py-2 text-left text-blue-700 font-semibold">LEVEL</th>
              </tr>
            </thead>
            <tbody>
              {filteredCashFlows.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-3 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-20" />
                      <span>No data found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCashFlows.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    
                    {/* CFL_ID (Số seq - read only) */}
                    <td className="px-3 py-2">
                      <div className="h-8 flex items-center text-gray-600">
                        {row.cflId}
                      </div>
                    </td>
                    
                    {/* CF CODE (Auto-generated) */}
                    <td className="px-3 py-2">
                      <Input
                        value={row.cfCode}
                        onChange={(e) => updateRow(row.id, 'cfCode', e.target.value)}
                        className="h-8 w-32"
                        placeholder="Auto"
                      />
                    </td>
                    
                    {/* CF TYPE (LOV) */}
                    <td className="px-3 py-2">
                      <Select
                        value={row.cfType}
                        onValueChange={(value) => updateRow(row.id, 'cfType', value)}
                      >
                        <SelectTrigger className="h-8 w-48">
                          <SelectValue placeholder="Chọn loại" />
                        </SelectTrigger>
                        <SelectContent>
                          {cfTypeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    
                    {/* CF CLASS (LOV) */}
                    <td className="px-3 py-2">
                      <Select
                        value={row.cfClass}
                        onValueChange={(value) => updateRow(row.id, 'cfClass', value)}
                      >
                        <SelectTrigger className="h-8 w-96">
                          <SelectValue placeholder="Chọn phân loại" />
                        </SelectTrigger>
                        <SelectContent>
                          {cfClassOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    
                    {/* CF CATEGORY (LOV) */}
                    <td className="px-3 py-2">
                      <Select
                        value={row.cfCategory}
                        onValueChange={(value) => updateRow(row.id, 'cfCategory', value)}
                      >
                        <SelectTrigger className="h-8 w-40">
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {cfCategoryOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    
                    {/* CF NAME */}
                    <td className="px-3 py-2">
                      <Input
                        value={row.cfName}
                        onChange={(e) => updateRow(row.id, 'cfName', e.target.value)}
                        className="h-8 w-64"
                        placeholder="Nhập tên dòng tiền"
                      />
                    </td>
                    
                    {/* IS PARENT (Checkbox) */}
                    <td className="px-3 py-2">
                      <div className="flex justify-center">
                        <Checkbox
                          checked={row.isParent}
                          onCheckedChange={(checked) => updateRow(row.id, 'isParent', checked)}
                        />
                      </div>
                    </td>
                    
                    {/* PARENT ID */}
                    <td className="px-3 py-2">
                      <Input
                        value={row.parentId}
                        onChange={(e) => updateRow(row.id, 'parentId', e.target.value)}
                        className="h-8 w-24"
                        placeholder="ID"
                      />
                    </td>
                    
                    {/* LEVEL */}
                    <td className="px-3 py-2">
                      <Input
                        value={row.level}
                        onChange={(e) => updateRow(row.id, 'level', e.target.value)}
                        className="h-8 w-20"
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
            <span className="font-medium">Tổng số dòng tiền:</span>{' '}
            <span className="font-semibold text-blue-600">
              {cashFlows.length}
            </span>
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Số dòng cha:</span>{' '}
            <span className="font-semibold text-green-600">
              {cashFlows.filter(cf => cf.isParent).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}