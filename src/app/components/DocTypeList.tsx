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

interface DocTypeRow {
  id: number;
  docType: string;
  name: string;
  nameEn: string;
  rvDocType: string;
  docCategory: string;
  range: string;
  docDesc: string;
  notes: string;
  ca: boolean;
  ba: boolean;
  ob: boolean;
  aa: boolean;
  ma: boolean;
  gl: boolean;
}

export default function DocTypeList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  const [data, setData] = useState<DocTypeRow[]>([
    { id: 1, docType: 'CR', name: 'Thu tiền mặt', nameEn: 'Cash receipt', rvDocType: 'RV', docCategory: 'CA', range: '11', docDesc: 'Tiền mặt', notes: 'Áp dụng màn hình thu tiền mặt', ca: true, ba: false, ob: false, aa: false, ma: false, gl: false },
    { id: 2, docType: 'CP', name: 'Chi tiền mặt', nameEn: 'Cash payment', rvDocType: 'RV', docCategory: 'CA', range: '12', docDesc: 'Tiền mặt', notes: 'Áp dụng màn hình chi tiền mặt', ca: true, ba: false, ob: false, aa: false, ma: false, gl: false },
    { id: 3, docType: 'CO', name: 'Khấu trừ công nợ', nameEn: 'Debt clearing', rvDocType: 'RV', docCategory: 'CA', range: '13', docDesc: 'Tiền mặt', notes: 'Áp dụng màn hình chi tiền mặt', ca: true, ba: false, ob: false, aa: false, ma: false, gl: false },
    { id: 4, docType: 'BR', name: 'Thu ngân hàng', nameEn: 'Credit note', rvDocType: 'RV', docCategory: 'BA', range: '20', docDesc: 'Ngân hàng', notes: 'Áp dụng màn hình thu ngân hàng', ca: false, ba: true, ob: false, aa: false, ma: false, gl: false },
    { id: 5, docType: 'BP', name: 'Chi ngân hàng', nameEn: 'Debit note', rvDocType: 'RV', docCategory: 'BA', range: '21', docDesc: 'Ngân hàng', notes: 'Áp dụng màn hình chi ngân hàng', ca: false, ba: true, ob: false, aa: false, ma: false, gl: false },
    { id: 6, docType: 'SI', name: 'Hóa đơn bán', nameEn: 'Sales invoice', rvDocType: 'RV', docCategory: 'AR', range: '30', docDesc: 'Phải thu', notes: 'Áp dụng màn hình hóa đơn bán ra', ca: false, ba: false, ob: true, aa: false, ma: false, gl: false },
    { id: 7, docType: 'SC', name: 'Báo có bán', nameEn: 'Sales credit memo', rvDocType: 'RV', docCategory: 'AR', range: '31', docDesc: 'Phải thu', notes: 'Áp dụng màn hình hóa đơn bán ra', ca: false, ba: false, ob: true, aa: false, ma: false, gl: false },
    { id: 8, docType: 'SD', name: 'Báo nợ bán', nameEn: 'Sales debit memo', rvDocType: 'RV', docCategory: 'AR', range: '32', docDesc: 'Phải thu', notes: 'Áp dụng màn hình hóa đơn bán ra', ca: false, ba: false, ob: true, aa: false, ma: false, gl: false },
    { id: 9, docType: 'PI', name: 'Hóa đơn mua', nameEn: 'Purchase invoice', rvDocType: 'RV', docCategory: 'AP', range: '40', docDesc: 'Phải trả', notes: 'Áp dụng màn hình hóa mua vào', ca: false, ba: false, ob: true, aa: false, ma: false, gl: false },
    { id: 10, docType: 'PC', name: 'Báo có mua', nameEn: 'Purchase credit memo', rvDocType: 'RV', docCategory: 'AP', range: '41', docDesc: 'Phải trả', notes: 'Áp dụng màn hình hóa mua vào', ca: false, ba: false, ob: true, aa: false, ma: false, gl: false },
    { id: 11, docType: 'PD', name: 'Báo nợ mua', nameEn: 'Purchaes debit memo', rvDocType: 'RV', docCategory: 'AP', range: '42', docDesc: 'Phải trả', notes: 'Áp dụng màn hình hóa mua vào', ca: false, ba: false, ob: true, aa: false, ma: false, gl: false },
    { id: 12, docType: 'AI', name: 'Tăng tài sản', nameEn: 'Asset increase', rvDocType: 'RV', docCategory: 'AA', range: '50', docDesc: 'Tài sản', notes: 'Áp dụng màn hình tăng tài sản', ca: false, ba: false, ob: false, aa: true, ma: false, gl: false },
    { id: 13, docType: 'AR', name: 'Giảm tài sản', nameEn: 'Asset redution', rvDocType: 'RV', docCategory: 'AA', range: '51', docDesc: 'Tài sản', notes: 'Áp dụng màn hình giảm tài sản', ca: false, ba: false, ob: false, aa: true, ma: false, gl: false },
    { id: 14, docType: 'AD', name: 'Khấu hao', nameEn: 'Asset depreciation', rvDocType: 'RV', docCategory: 'AA', range: '52', docDesc: 'Tài sản', notes: 'Áp dụng màn hình khấu hao tài sản', ca: false, ba: false, ob: false, aa: true, ma: false, gl: false },
    { id: 15, docType: 'AC', name: 'Xây dựng cơ bản', nameEn: 'Asset in construction', rvDocType: 'RV', docCategory: 'AA', range: '53', docDesc: 'Tài sản', notes: 'Áp dụng màn hình tăng tài sản (XDCB)', ca: false, ba: false, ob: false, aa: true, ma: false, gl: false },
    { id: 16, docType: 'MR', name: 'Nhập kho', nameEn: 'Material receipts', rvDocType: 'RV', docCategory: 'MA', range: '60', docDesc: 'Kho', notes: 'Áp dụng màn hình nhập kho', ca: false, ba: false, ob: false, aa: false, ma: true, gl: false },
    { id: 17, docType: 'MI', name: 'Xuất kho', nameEn: 'Material issues', rvDocType: 'RV', docCategory: 'MA', range: '61', docDesc: 'Kho', notes: 'Áp dụng màn hình xuất kho', ca: false, ba: false, ob: false, aa: false, ma: true, gl: false },
    { id: 18, docType: 'MC', name: 'Kiểm kê', nameEn: 'Inventory check', rvDocType: 'RV', docCategory: 'MA', range: '62', docDesc: 'Kho', notes: 'Áp dụng màn hình kiểm kê', ca: false, ba: false, ob: false, aa: false, ma: true, gl: false },
    { id: 19, docType: 'RV', name: 'Đảo chứng từ', nameEn: 'Revert', rvDocType: '', docCategory: 'RV', range: '70', docDesc: 'Đảo chứng từ', notes: 'Áp dụng các chứng từ đảo', ca: true, ba: true, ob: true, aa: true, ma: true, gl: true },
    { id: 20, docType: 'GL', name: 'Tổng hợp', nameEn: 'General Ledger', rvDocType: 'RV', docCategory: 'GL', range: '80', docDesc: 'Tổng hợp', notes: 'Áp dụng màn hình nhập bút toán thủ công', ca: false, ba: false, ob: false, aa: false, ma: false, gl: true },
    { id: 21, docType: 'BG', name: 'Ngân sách', nameEn: 'Budget', rvDocType: '', docCategory: 'GL', range: '90', docDesc: 'Tổng hợp', notes: 'Áp dụng màn hình nhập bút toán thủ công', ca: false, ba: false, ob: false, aa: false, ma: false, gl: true },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddRow = () => {
    const newRow: DocTypeRow = {
      id: Date.now(),
      docType: '',
      name: '',
      nameEn: '',
      rvDocType: '',
      docCategory: '',
      range: '',
      docDesc: '',
      notes: '',
      ca: false,
      ba: false,
      ob: false,
      aa: false,
      ma: false,
      gl: false,
    };
    setData([...data, newRow]);
  };

  const handleDeleteRows = () => {
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const updateRow = (id: number, field: keyof DocTypeRow, value: any) => {
    setData(data.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const filteredData = data.filter(row =>
    searchText === '' ||
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="erp-page">
      {/* Page Header */}
      <div className="erp-page-header">
        <div>
          <h1>Document Type Management</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Danh mục chứng từ dùng chung</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Doc Type</span>
          </nav>
        </div>
      </div>

      <MasterDataToolbar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={handleAddRow}
        onDeleteRows={handleDeleteRows}
        onSave={() => console.log('Saving Doc Types...')}
        selectedCount={selectedRows.length}
      />

      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm min-w-[3000px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#f0f7ff] border-b">
                <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-20">
                  <Checkbox 
                    checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) setSelectedRows(filteredData.map(r => r.id));
                      else setSelectedRows([]);
                    }}
                  />
                </th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32 bg-[#f0f7ff] sticky left-12 z-20">Doc Type</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-56">Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-56">Name (EN)</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">RV Doc Type</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Doc Category</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32">Range</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-56">Doc Desc</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-96">Ghi Chú</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-16">CA</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-16">BA</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-16">OB</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-16">AA</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-16">MA</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase w-16">GL</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={15} className="px-3 py-12 text-center text-gray-500 bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>No document types found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 border-r bg-white sticky left-0 z-10">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-10 font-bold text-blue-600">
                      <Input
                        value={row.docType}
                        onChange={(e) => updateRow(row.id, 'docType', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r font-medium text-gray-800">
                      <Input
                        value={row.name}
                        onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.nameEn}
                        onChange={(e) => updateRow(row.id, 'nameEn', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all italic text-gray-600"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.rvDocType}
                        onChange={(e) => updateRow(row.id, 'rvDocType', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-center"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.docCategory}
                        onChange={(e) => updateRow(row.id, 'docCategory', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-center"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.range}
                        onChange={(e) => updateRow(row.id, 'range', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-center font-mono"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.docDesc}
                        onChange={(e) => updateRow(row.id, 'docDesc', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.notes}
                        onChange={(e) => updateRow(row.id, 'notes', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={row.ca}
                        onCheckedChange={(checked) => updateRow(row.id, 'ca', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={row.ba}
                        onCheckedChange={(checked) => updateRow(row.id, 'ba', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={row.ob}
                        onCheckedChange={(checked) => updateRow(row.id, 'ob', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={row.aa}
                        onCheckedChange={(checked) => updateRow(row.id, 'aa', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={row.ma}
                        onCheckedChange={(checked) => updateRow(row.id, 'ma', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <Checkbox
                        checked={row.gl}
                        onCheckedChange={(checked) => updateRow(row.id, 'gl', !!checked)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 border-t bg-gray-50 text-xs text-right text-gray-500 font-medium">
          TOTAL RECORDS: {filteredData.length}
        </div>
      </div>
    </div>
  );
}