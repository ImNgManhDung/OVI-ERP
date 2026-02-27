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

interface TransactionTypeRow {
  id: number;
  ttyCode: string;
  ttyClass: string;
  ttyName: string;
  description: string;
  postingControl: string;
  projects: boolean;
  productOrder: boolean;
  costCenter: boolean;
  stores: boolean;
  object: boolean;
  bankAccount: boolean;
  notes: string;
}

export default function TransactionTypeList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  const [data, setData] = useState<TransactionTypeRow[]>([
    { id: 1, ttyCode: '100', ttyClass: 'Nhập kho', ttyName: 'Nhập mua hàng', description: 'Dr: 15x (MAT), Cr: 3319', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 2, ttyCode: '101', ttyClass: 'Nhập kho', ttyName: 'Nhập thành phẩm', description: 'Dr: 621, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: true, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 3, ttyCode: '104', ttyClass: 'Nhập kho', ttyName: 'Nhập hàng ký gửi', description: '', postingControl: 'NON', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 4, ttyCode: '111', ttyClass: 'Nhập kho', ttyName: 'Nhập mua nội bộ', description: 'Dr: 15x, Cr: Supplier', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 5, ttyCode: '120', ttyClass: 'Nhập kho', ttyName: 'Nhập hoàn từ sản xuất', description: 'Dr: 15x (MAT), Cr: 621', postingControl: 'DUAL', projects: false, productOrder: true, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 6, ttyCode: '121', ttyClass: 'Nhập kho', ttyName: 'Nhập hoàn từ dự án, công trình', description: 'Dr: 15x (MAT), Cr: 621', postingControl: 'DUAL', projects: true, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 7, ttyCode: '123', ttyClass: 'Nhập kho', ttyName: 'Nhập hoàn ký gửi', description: 'Dr: 15x (MAT), Cr: 621', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 8, ttyCode: '124', ttyClass: 'Nhập kho', ttyName: 'Nhập hoàn sử dụng', description: 'Dr: 15x (MAT), Cr: 642', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: true, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 9, ttyCode: '125', ttyClass: 'Nhập kho', ttyName: 'Nhập trả hàng', description: 'Dr: 15x (MAT), Cr: 632', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 10, ttyCode: '126', ttyClass: 'Nhập kho', ttyName: 'Nhập phế phẩm', description: 'Dr: 15x (MAT), Cr: 621', postingControl: 'DUAL', projects: false, productOrder: true, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 11, ttyCode: '150', ttyClass: 'Nhập kho', ttyName: 'Nhập luân chuyển', description: 'Dr: 15x (MAT), Cr: 1519', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 12, ttyCode: '180', ttyClass: 'Nhập kho', ttyName: 'Nhập điều chỉnh kiểm kê', description: 'Dr: 15x (MAT), Cr: 621', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 13, ttyCode: '181', ttyClass: 'Nhập kho', ttyName: 'Nhập điều chỉnh', description: 'Dr: 15x (MAT), Cr: 338', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 14, ttyCode: '199', ttyClass: 'Nhập kho', ttyName: 'Nhập khác', description: 'Dr: 15x (MAT), Cr: 338', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 15, ttyCode: '160', ttyClass: 'Nhập kho', ttyName: 'Biên bản nghiệm thu dịch vụ mua', description: '', postingControl: 'NON', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: 'Áp dụng cho các Item type = Service, không lưu tồn kho' },
    { id: 16, ttyCode: '161', ttyClass: 'Nhập kho', ttyName: 'Chi phí trích trước Subledger', description: 'N:642,C:335', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 17, ttyCode: '200', ttyClass: 'Xuất kho', ttyName: 'Xuất bán hàng', description: 'Dr: 632, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 18, ttyCode: '201', ttyClass: 'Xuất kho', ttyName: 'Xuất sản xuất', description: 'Dr: 621, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: true, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 19, ttyCode: '202', ttyClass: 'Xuất kho', ttyName: 'Xuất dự án, công trình', description: 'Dr: 621, Cr: 15x (MAT)', postingControl: 'DUAL', projects: true, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 20, ttyCode: '203', ttyClass: 'Xuất kho', ttyName: 'Xuất bán nội bộ', description: 'Dr: 632, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 21, ttyCode: '204', ttyClass: 'Xuất kho', ttyName: 'Xuất ký gửi', description: '', postingControl: 'NON', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 22, ttyCode: '205', ttyClass: 'Xuất kho', ttyName: 'Xuất bán phế liệu', description: 'Dr: 632, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 23, ttyCode: '222', ttyClass: 'Xuất kho', ttyName: 'Xuất dùng nội bộ', description: 'Dr: 642, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: true, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 24, ttyCode: '204', ttyClass: 'Xuất kho', ttyName: 'Xuất hình thành TSCĐ', description: 'Dr: 2119, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 25, ttyCode: '250', ttyClass: 'Xuất kho', ttyName: 'Xuất luân chuyển', description: 'Dr: 1519, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 26, ttyCode: '210', ttyClass: 'Xuất kho', ttyName: 'Xuất hủy', description: 'Dr: 621, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 27, ttyCode: '211', ttyClass: 'Xuất kho', ttyName: 'Xuất hoàn ký gửi', description: '', postingControl: 'NON', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 28, ttyCode: '212', ttyClass: 'Xuất kho', ttyName: 'Xuất trả hàng', description: 'Dr: 3319, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 29, ttyCode: '281', ttyClass: 'Xuất kho', ttyName: 'Xuất điều chỉnh', description: 'Dr: 338, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 30, ttyCode: '282', ttyClass: 'Xuất kho', ttyName: 'Xuất điều chỉnh kiểm kê', description: 'Dr: 338, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 31, ttyCode: '299', ttyClass: 'Xuất kho', ttyName: 'Xuất khác', description: 'Dr: 338, Cr: 15x (MAT)', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 32, ttyCode: '260', ttyClass: 'Xuất kho', ttyName: 'Biên bản nghiệm thu dịch vụ bán', description: '', postingControl: 'NON', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: 'Áp dụng cho các Item type = Service, không lưu tồn kho' },
    { id: 33, ttyCode: '301', ttyClass: 'Thu tiền', ttyName: 'Thu đặt chỗ', description: 'Dr: Bank_acount, Cr: 3387', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 34, ttyCode: '302', ttyClass: 'Thu tiền', ttyName: 'Thu đặt cọc', description: 'Dr: Bank_account, Cr: Customer (DP)', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 35, ttyCode: '303', ttyClass: 'Thu tiền', ttyName: 'Thu công nợ', description: 'Dr: Bank_account, Cr: Customer', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 36, ttyCode: '304', ttyClass: 'Thu tiền', ttyName: 'Thu khấu trừ', description: 'Dr: GL, Cr: Customer', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 37, ttyCode: '305', ttyClass: 'Thu tiền', ttyName: 'Thu khác', description: 'Dr: Bank_account, Cr: GL', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: true, notes: '' },
    { id: 38, ttyCode: '401', ttyClass: 'Chi tiền', ttyName: 'Chi đặt chỗ', description: 'Dr: 3387, Cr: Bank_account', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 39, ttyCode: '402', ttyClass: 'Chi tiền', ttyName: 'Chi tạm ứng', description: 'Dr: Supplier(DP), Cr: Bank_account', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 40, ttyCode: '403', ttyClass: 'Chi tiền', ttyName: 'Chi công nợ', description: 'Dr: Supplier, Cr: Bank_account', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 41, ttyCode: '404', ttyClass: 'Chi tiền', ttyName: 'Chi khấu trừ', description: 'Dr: Supplier, Cr: GL', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 42, ttyCode: '405', ttyClass: 'Chi tiền', ttyName: 'Chi khác', description: 'Dr: GL, Cr: Bank_account', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: true, notes: '' },
    { id: 43, ttyCode: '501', ttyClass: 'Hóa đơn mua', ttyName: 'Hóa đơn mua trong nước', description: 'Dr: 3319, line item, Cr: Supplier', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 44, ttyCode: '502', ttyClass: 'Hóa đơn mua', ttyName: 'Hóa đơn mua nhập khẩu', description: 'Dr: line item, Cr: Supplier', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 45, ttyCode: '503', ttyClass: 'Hóa đơn mua', ttyName: 'Điều chỉnh giảm hàng hóa', description: 'Dr: 3319, Cr: Supplier', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 46, ttyCode: '504', ttyClass: 'Hóa đơn mua', ttyName: 'Điều chỉnh giảm chi phí', description: 'Dr: line item, Cr: Supplier', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 47, ttyCode: '505', ttyClass: 'Hóa đơn mua', ttyName: 'Điều chỉnh tăng hàng hóa', description: 'Dr: 3319, Cr: Supplier', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 48, ttyCode: '506', ttyClass: 'Hóa đơn mua', ttyName: 'Điều chỉnh tăng chi phí', description: 'Dr: line item, Cr: Supplier', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 49, ttyCode: '601', ttyClass: 'Hóa đơn bán', ttyName: 'Hóa đơn bán trong nước', description: 'Dr: Customer, Cr: 511', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 50, ttyCode: '602', ttyClass: 'Hóa đơn bán', ttyName: 'Hóa đơn bán xuất khẩu', description: 'Dr: Customer, Cr: 511', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 51, ttyCode: '603', ttyClass: 'Hóa đơn bán', ttyName: 'Điều chỉnh giảm hàng hóa', description: 'Dr: Customer, Cr: 632', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 52, ttyCode: '604', ttyClass: 'Hóa đơn bán', ttyName: 'Điều chỉnh giảm chi phí', description: 'Dr: Customer, Cr: 632', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 53, ttyCode: '605', ttyClass: 'Hóa đơn bán', ttyName: 'Điều chỉnh tăng hàng hóa', description: 'Dr: Customer, Cr: 632', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 54, ttyCode: '606', ttyClass: 'Hóa đơn bán', ttyName: 'Điều chỉnh tăng chi phí', description: 'Dr: Customer, Cr: 632', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 55, ttyCode: '701', ttyClass: 'Tài sản', ttyName: 'Tăng tài sản từ hóa đơn/phiếu xuất', description: 'Dr: Asset, Cr: 2119', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 56, ttyCode: '702', ttyClass: 'Tài sản', ttyName: 'Tăng tài sản thủ công', description: 'Dr: Asset, Cr: GL', postingControl: 'MANUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 57, ttyCode: '703', ttyClass: 'Tài sản', ttyName: 'Tăng tài sản từ xây dựng cơ bản', description: 'Dr: Asset, Cr: 241', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 58, ttyCode: '704', ttyClass: 'Tài sản', ttyName: 'Tăng xây dựng cơ bản', description: 'Dr: Asset in Con, Cr: 2119', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 59, ttyCode: '705', ttyClass: 'Tài sản', ttyName: 'Khấu hao tài sản', description: 'Dr: 642, Cr: Asset_depreation', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 60, ttyCode: '706', ttyClass: 'Tài sản', ttyName: 'Thanh lý bán', description: 'Dr: 632, Cr: Asset', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 61, ttyCode: '707', ttyClass: 'Tài sản', ttyName: 'Thanh lý hủy', description: 'Dr: 642, Cr: Asset', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 62, ttyCode: '901', ttyClass: 'Tổng hợp', ttyName: 'Phân bổ chi phí sản xuất', description: 'Dr: 154, Cr: 621,622,627', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 63, ttyCode: '902', ttyClass: 'Tổng hợp', ttyName: 'Kết chuyển chi phí', description: 'Dr: 911, Cr: 632, 641,642,8', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 64, ttyCode: '903', ttyClass: 'Tổng hợp', ttyName: 'Kết chuyển doanh thu', description: 'Cr: 911, Dr: 511, 512, 711', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 65, ttyCode: '904', ttyClass: 'Tổng hợp', ttyName: 'Kết chuyển lãi lỗ', description: 'Dr: 911, Cr: 412', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 66, ttyCode: '905', ttyClass: 'Tổng hợp', ttyName: 'Đánh giá CLTG cuối kỳ', description: '635/515, 413 (Dr,Cr)', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 67, ttyCode: '906', ttyClass: 'Tổng hợp', ttyName: 'Chênh lệch tỷ giá thực hiện', description: '635/515, 413 (Dr,Cr)', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 68, ttyCode: '907', ttyClass: 'Tổng hợp', ttyName: 'Bút toán thủ công', description: 'Dr: GL, Cr: GL', postingControl: 'MANUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: 'Nhập bút toán thủ công phải chọn ngày revert để đúng ngày hệ thống tự động revert bút toán này Hoặc nhập ở Biên bản nghiệm thu dịch vụ (Service approval)' },
    { id: 69, ttyCode: '908', ttyClass: 'Tổng hợp', ttyName: 'Trích trước chi phí GL', description: 'Dr: GL, Cr: GL', postingControl: 'MANUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddRow = () => {
    const newRow: TransactionTypeRow = {
      id: Date.now(),
      ttyCode: '',
      ttyClass: '',
      ttyName: '',
      description: '',
      postingControl: 'DUAL',
      projects: false,
      productOrder: false,
      costCenter: false,
      stores: false,
      object: false,
      bankAccount: false,
      notes: '',
    };
    setData([...data, newRow]);
  };

  const handleDeleteRows = () => {
    setData(data.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const updateRow = (id: number, field: keyof TransactionTypeRow, value: any) => {
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
          <h1>Transaction Type Management</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Master Data</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Transaction Type</span>
          </nav>
        </div>
      </div>

      <MasterDataToolbar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={handleAddRow}
        onDeleteRows={handleDeleteRows}
        onSave={() => console.log('Saving Transaction Types...')}
        selectedCount={selectedRows.length}
      />

      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm min-w-[2800px]">
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
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32 bg-[#f0f7ff] sticky left-12 z-20">TTY Code</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">TTY Class</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">TTY Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-80">Description</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Posting Control</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-24">Projects</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-32">Product Order</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-32">Cost Center</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-24">Stores</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-24">Object</th>
                <th className="px-3 py-3 text-center text-blue-700 font-bold uppercase border-r w-32">Bank Account</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase w-96">Note</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={13} className="px-3 py-12 text-center text-gray-500 bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>No transaction types found</span>
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
                        value={row.ttyCode}
                        onChange={(e) => updateRow(row.id, 'ttyCode', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.ttyClass}
                        onChange={(e) => updateRow(row.id, 'ttyClass', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r font-medium">
                      <Input
                        value={row.ttyName}
                        onChange={(e) => updateRow(row.id, 'ttyName', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.description}
                        onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Select
                        value={row.postingControl}
                        onValueChange={(val) => updateRow(row.id, 'postingControl', val)}
                      >
                        <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DUAL">DUAL</SelectItem>
                          <SelectItem value="AUTO">AUTO</SelectItem>
                          <SelectItem value="MANUAL">MANUAL</SelectItem>
                          <SelectItem value="NON">NON</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={row.projects}
                        onCheckedChange={(checked) => updateRow(row.id, 'projects', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={row.productOrder}
                        onCheckedChange={(checked) => updateRow(row.id, 'productOrder', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={row.costCenter}
                        onCheckedChange={(checked) => updateRow(row.id, 'costCenter', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={row.stores}
                        onCheckedChange={(checked) => updateRow(row.id, 'stores', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={row.object}
                        onCheckedChange={(checked) => updateRow(row.id, 'object', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2 border-r text-center">
                      <Checkbox
                        checked={row.bankAccount}
                        onCheckedChange={(checked) => updateRow(row.id, 'bankAccount', !!checked)}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <Input
                        value={row.notes}
                        onChange={(e) => updateRow(row.id, 'notes', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
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