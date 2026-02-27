import { useState } from 'react';
import { Search } from 'lucide-react';
import { FilterPanel } from './FilterPanel';
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

interface MappingRow {
  id: number;
  lenId: string;
  docType: string;
  ttyCode: string;
  ttyCategory: string;
  ttyName: string;
  description: string;
  debit: string;
  credit: string;
  postingControl: string;
  projects: boolean;
  productOrder: boolean;
  costCenter: boolean;
  stores: boolean;
  object: boolean;
  bankAccount: boolean;
  notes: string;
}

export default function DocsTransMappingList() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedType, setSelectedType] = useState('all');
  
  const [data, setData] = useState<MappingRow[]>([
    // Nhập kho
    { id: 1, lenId: '', docType: 'MR', ttyCode: '100', ttyCategory: 'Nhập kho', ttyName: 'Nhập mua hàng', description: 'Dr: 15x (MAT), Cr: 3319', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 2, lenId: '', docType: 'MR', ttyCode: '101', ttyCategory: 'Nhập kho', ttyName: 'Nhập thành phẩm', description: 'Dr: 621, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: true, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 3, lenId: '', docType: 'MR', ttyCode: '104', ttyCategory: 'Nhập kho', ttyName: 'Nhập hàng ký gửi', description: '', debit: '', credit: '', postingControl: 'NON', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 4, lenId: '', docType: 'MR', ttyCode: '111', ttyCategory: 'Nhập kho', ttyName: 'Nhập mua nội bộ', description: 'Dr: 15x, Cr: Supplier', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 5, lenId: '', docType: 'MR', ttyCode: '120', ttyCategory: 'Nhập kho', ttyName: 'Nhập hoàn từ sản xuất', description: 'Dr: 15x (MAT), Cr: 621', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: true, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 6, lenId: '', docType: 'MR', ttyCode: '121', ttyCategory: 'Nhập kho', ttyName: 'Nhập hoàn từ dự án, công trình', description: 'Dr: 15x (MAT), Cr: 621', debit: '', credit: '', postingControl: 'DUAL', projects: true, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 7, lenId: '', docType: 'MR', ttyCode: '123', ttyCategory: 'Nhập kho', ttyName: 'Nhập hoàn ký gửi', description: 'Dr: 15x (MAT), Cr: 621', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 8, lenId: '', docType: 'MR', ttyCode: '124', ttyCategory: 'Nhập kho', ttyName: 'Nhập hoàn sử dụng', description: 'Dr: 15x (MAT), Cr: 642', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: true, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 9, lenId: '', docType: 'MR', ttyCode: '125', ttyCategory: 'Nhập kho', ttyName: 'Nhập trả hàng', description: 'Dr: 15x (MAT), Cr: 632', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 10, lenId: '', docType: 'MR', ttyCode: '126', ttyCategory: 'Nhập kho', ttyName: 'Nhập phế phẩm', description: 'Dr: 15x (MAT), Cr: 621', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: true, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 11, lenId: '', docType: 'MR', ttyCode: '150', ttyCategory: 'Nhập kho', ttyName: 'Nhập luân chuyển', description: 'Dr: 15x (MAT), Cr: 1519', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 12, lenId: '', docType: 'MC', ttyCode: '180', ttyCategory: 'Nhập kho', ttyName: 'Nhập điều chỉnh kiểm kê', description: 'Dr: 15x (MAT), Cr: 621', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 13, lenId: '', docType: 'MR', ttyCode: '181', ttyCategory: 'Nhập kho', ttyName: 'Nhập điều chỉnh', description: 'Dr: 15x (MAT), Cr: 338', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 14, lenId: '', docType: 'MR', ttyCode: '199', ttyCategory: 'Nhập kho', ttyName: 'Nhập khác', description: 'Dr: 15x (MAT), Cr: 338', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 15, lenId: '', docType: 'MR', ttyCode: '160', ttyCategory: 'Nhập kho', ttyName: 'Biên bản nghiệm thu dịch vụ mua', description: '', debit: '', credit: '', postingControl: 'NON', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: 'Áp dụng cho các Item type = Service, không lưu tồn kho' },
    { id: 16, lenId: '', docType: 'MR', ttyCode: '161', ttyCategory: 'Nhập kho', ttyName: 'Chi phí trích trước Subledger', description: 'N:642,C:335', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    
    // Xuất kho
    { id: 17, lenId: '', docType: 'MI', ttyCode: '200', ttyCategory: 'Xuất kho', ttyName: 'Xuất bán hàng', description: 'Dr: 632, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 18, lenId: '', docType: 'MI', ttyCode: '201', ttyCategory: 'Xuất kho', ttyName: 'Xuất sản xuất', description: 'Dr: 621, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: true, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 19, lenId: '', docType: 'MI', ttyCode: '202', ttyCategory: 'Xuất kho', ttyName: 'Xuất dự án, công trình', description: 'Dr: 621, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: true, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 20, lenId: '', docType: 'MI', ttyCode: '203', ttyCategory: 'Xuất kho', ttyName: 'Xuất bán nội bộ', description: 'Dr: 632, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 21, lenId: '', docType: 'MI', ttyCode: '204', ttyCategory: 'Xuất kho', ttyName: 'Xuất ký gửi', description: '', debit: '', credit: '', postingControl: 'NON', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 22, lenId: '', docType: 'MI', ttyCode: '205', ttyCategory: 'Xuất kho', ttyName: 'Xuất bán phế liệu', description: 'Dr: 632, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 23, lenId: '', docType: 'MI', ttyCode: '222', ttyCategory: 'Xuất kho', ttyName: 'Xuất dùng nội bộ', description: 'Dr: 642, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: true, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 24, lenId: '', docType: 'MI', ttyCode: '204', ttyCategory: 'Xuất kho', ttyName: 'Xuất hình thành TSCĐ', description: 'Dr: 2119, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 25, lenId: '', docType: 'MI', ttyCode: '250', ttyCategory: 'Xuất kho', ttyName: 'Xuất luân chuyển', description: 'Dr: 1519, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 26, lenId: '', docType: 'MI', ttyCode: '251', ttyCategory: 'Xuất kho', ttyName: 'Xuất kiêm vận chuyển nội bộ', description: 'Dr: 1519, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 27, lenId: '', docType: 'MI', ttyCode: '210', ttyCategory: 'Xuất kho', ttyName: 'Xuất hủy', description: 'Dr: 621, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 28, lenId: '', docType: 'MI', ttyCode: '211', ttyCategory: 'Xuất kho', ttyName: 'Xuất hoàn ký gửi', description: '', debit: '', credit: '', postingControl: 'NON', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 29, lenId: '', docType: 'MI', ttyCode: '212', ttyCategory: 'Xuất kho', ttyName: 'Xuất trả hàng', description: 'Dr: 3319, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 30, lenId: '', docType: 'MI', ttyCode: '281', ttyCategory: 'Xuất kho', ttyName: 'Xuất điều chỉnh', description: 'Dr: 338, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 31, lenId: '', docType: 'MC', ttyCode: '282', ttyCategory: 'Xuất kho', ttyName: 'Xuất điều chỉnh kiểm kê', description: 'Dr: 338, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 32, lenId: '', docType: 'MI', ttyCode: '299', ttyCategory: 'Xuất kho', ttyName: 'Xuất khác', description: 'Dr: 338, Cr: 15x (MAT)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 33, lenId: '', docType: 'MI', ttyCode: '260', ttyCategory: 'Xuất kho', ttyName: 'Biên bản nghiệm thu dịch vụ bán', description: '', debit: '', credit: '', postingControl: 'NON', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: 'Áp dụng cho các Item type = Service, không lưu tồn kho' },
    
    // Thu tiền
    { id: 34, lenId: '', docType: 'CR', ttyCode: '301', ttyCategory: 'Thu tiền', ttyName: 'Thu đặt chỗ', description: 'Dr: Bank_acount, Cr: 3387', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 35, lenId: '', docType: 'CR', ttyCode: '302', ttyCategory: 'Thu tiền', ttyName: 'Thu đặt cọc', description: 'Dr: Bank_account, Cr: Customer (DP)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 36, lenId: '', docType: 'CR', ttyCode: '303', ttyCategory: 'Thu tiền', ttyName: 'Thu công nợ', description: 'Dr: Bank_account, Cr: Customer', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 37, lenId: '', docType: 'CR', ttyCode: '304', ttyCategory: 'Thu tiền', ttyName: 'Thu khấu trừ', description: 'Dr: GL, Cr: Customer', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 38, lenId: '', docType: 'CR', ttyCode: '305', ttyCategory: 'Thu tiền', ttyName: 'Thu khác', description: 'Dr: Bank_account, Cr: GL', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: true, notes: '' },
    { id: 39, lenId: '', docType: 'BR', ttyCode: '301', ttyCategory: 'Thu tiền', ttyName: 'Thu đặt chỗ', description: 'Dr: Bank_acount, Cr: 3387', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 40, lenId: '', docType: 'BR', ttyCode: '302', ttyCategory: 'Thu tiền', ttyName: 'Thu đặt cọc', description: 'Dr: Bank_account, Cr: Customer (DP)', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 41, lenId: '', docType: 'BR', ttyCode: '303', ttyCategory: 'Thu tiền', ttyName: 'Thu công nợ', description: 'Dr: Bank_account, Cr: Customer', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 42, lenId: '', docType: 'BR', ttyCode: '305', ttyCategory: 'Thu tiền', ttyName: 'Thu khác', description: 'Dr: Bank_account, Cr: GL', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: true, notes: '' },
    
    // Chi tiền
    { id: 43, lenId: '', docType: 'CP', ttyCode: '401', ttyCategory: 'Chi tiền', ttyName: 'Chi đặt chỗ', description: 'Dr: 3387, Cr: Bank_account', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 44, lenId: '', docType: 'CP', ttyCode: '402', ttyCategory: 'Chi tiền', ttyName: 'Chi tạm ứng', description: 'Dr: Supplier(DP), Cr: Bank_account', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 45, lenId: '', docType: 'CP', ttyCode: '403', ttyCategory: 'Chi tiền', ttyName: 'Chi công nợ', description: 'Dr: Supplier, Cr: Bank_account', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 46, lenId: '', docType: 'CP', ttyCode: '404', ttyCategory: 'Chi tiền', ttyName: 'Chi khấu trừ', description: 'Dr: Supplier, Cr: GL', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 47, lenId: '', docType: 'CP', ttyCode: '405', ttyCategory: 'Chi tiền', ttyName: 'Chi khác', description: 'Dr: GL, Cr: Bank_account', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: true, notes: '' },
    { id: 48, lenId: '', docType: 'BP', ttyCode: '401', ttyCategory: 'Chi tiền', ttyName: 'Chi đặt chỗ', description: 'Dr: 3387, Cr: Bank_account', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 49, lenId: '', docType: 'BP', ttyCode: '402', ttyCategory: 'Chi tiền', ttyName: 'Chi tạm ứng', description: 'Dr: Supplier(DP), Cr: Bank_account', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 50, lenId: '', docType: 'BP', ttyCode: '403', ttyCategory: 'Chi tiền', ttyName: 'Chi công nợ', description: 'Dr: Supplier, Cr: Bank_account', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: true, bankAccount: true, notes: '' },
    { id: 51, lenId: '', docType: 'BP', ttyCode: '405', ttyCategory: 'Chi tiền', ttyName: 'Chi khác', description: 'Dr: GL, Cr: Bank_account', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: true, notes: '' },
    
    // Hóa đơn mua/bán
    { id: 52, lenId: '', docType: 'PI', ttyCode: '501', ttyCategory: 'Hóa đơn mua', ttyName: 'Hóa đơn mua trong nước', description: 'Dr: 3319, line item, Cr: Supplier', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 53, lenId: '', docType: 'PI', ttyCode: '502', ttyCategory: 'Hóa đơn mua', ttyName: 'Hóa đơn mua nhập khẩu', description: 'Dr: line item, Cr: Supplier', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 54, lenId: '', docType: 'PC', ttyCode: '503', ttyCategory: 'Hóa đơn mua', ttyName: 'Điều chỉnh giảm hàng hóa', description: 'Dr: 3319, Cr: Supplier', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 55, lenId: '', docType: 'PC', ttyCode: '504', ttyCategory: 'Hóa đơn mua', ttyName: 'Điều chỉnh giảm chi phí', description: 'Dr: line item, Cr: Supplier', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 56, lenId: '', docType: 'PD', ttyCode: '505', ttyCategory: 'Hóa đơn mua', ttyName: 'Điều chỉnh tăng hàng hóa', description: 'Dr: 3319, Cr: Supplier', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 57, lenId: '', docType: 'PD', ttyCode: '506', ttyCategory: 'Hóa đơn mua', ttyName: 'Điều chỉnh tăng chi phí', description: 'Dr: line item, Cr: Supplier', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 58, lenId: '', docType: 'SI', ttyCode: '601', ttyCategory: 'Hóa đơn bán', ttyName: 'Hóa đơn bán trong nước', description: 'Dr: Customer, Cr: 511', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 59, lenId: '', docType: 'SI', ttyCode: '602', ttyCategory: 'Hóa đơn bán', ttyName: 'Hóa đơn bán xuất khẩu', description: 'Dr: Customer, Cr: 511', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 60, lenId: '', docType: 'SC', ttyCode: '603', ttyCategory: 'Hóa đơn bán', ttyName: 'Điều chỉnh giảm hàng hóa', description: 'Dr: Customer, Cr: 632', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 61, lenId: '', docType: 'SC', ttyCode: '604', ttyCategory: 'Hóa đơn bán', ttyName: 'Điều chỉnh giảm chi phí', description: 'Dr: Customer, Cr: 632', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 62, lenId: '', docType: 'SD', ttyCode: '605', ttyCategory: 'Hóa đơn bán', ttyName: 'Điều chỉnh tăng hàng hóa', description: 'Dr: Customer, Cr: 632', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    { id: 63, lenId: '', docType: 'SD', ttyCode: '606', ttyCategory: 'Hóa đơn bán', ttyName: 'Điều chỉnh tăng chi phí', description: 'Dr: Customer, Cr: 632', debit: '', credit: '', postingControl: 'DUAL', projects: false, productOrder: false, costCenter: false, stores: true, object: false, bankAccount: false, notes: '' },
    
    // Tài sản
    { id: 64, lenId: '', docType: 'AI', ttyCode: '701', ttyCategory: 'Tài sản', ttyName: 'Tăng tài sản từ hóa đơn/phiếu xuất', description: 'Dr: Asset, Cr: 2119', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 65, lenId: '', docType: 'AI', ttyCode: '702', ttyCategory: 'Tài sản', ttyName: 'Tăng tài sản thủ công', description: 'Dr: Asset, Cr: GL', debit: '', credit: '', postingControl: 'MANUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 66, lenId: '', docType: 'AI', ttyCode: '703', ttyCategory: 'Tài sản', ttyName: 'Tăng tài sản từ xây dựng cơ bản', description: 'Dr: Asset, Cr: 241', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 67, lenId: '', docType: 'AC', ttyCode: '704', ttyCategory: 'Tài sản', ttyName: 'Tăng xây dựng cơ bản', description: 'Dr: Asset in Con, Cr: 2119', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 68, lenId: '', docType: 'AD', ttyCode: '705', ttyCategory: 'Tài sản', ttyName: 'Khấu hao tài sản', description: 'Dr: 642, Cr: Asset_depreation', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 69, lenId: '', docType: 'AR', ttyCode: '706', ttyCategory: 'Tài sản', ttyName: 'Thanh lý bán', description: 'Dr: 632, Cr: Asset', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 70, lenId: '', docType: 'AR', ttyCode: '707', ttyCategory: 'Tài sản', ttyName: 'Thanh lý hủy', description: 'Dr: 642, Cr: Asset', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    
    // Tổng hợp
    { id: 71, lenId: '', docType: 'GL', ttyCode: '901', ttyCategory: 'Tổng hợp', ttyName: 'Phân bổ chi phí sản xuất', description: 'Dr: 154, Cr: 621,622,627', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 72, lenId: '', docType: 'GL', ttyCode: '902', ttyCategory: 'Tổng hợp', ttyName: 'Kết chuyển chi phí', description: 'Dr: 911, Cr: 632, 641,642,8', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 73, lenId: '', docType: 'GL', ttyCode: '903', ttyCategory: 'Tổng hợp', ttyName: 'Kết chuyển doanh thu', description: 'Cr: 911, Dr: 511, 512, 711', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 74, lenId: '', docType: 'GL', ttyCode: '904', ttyCategory: 'Tổng hợp', ttyName: 'Kết chuyển lãi lỗ', description: 'Dr: 911, Cr: 412', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 75, lenId: '', docType: 'GL', ttyCode: '905', ttyCategory: 'Tổng hợp', ttyName: 'Đánh giá CLTG cuối kỳ', description: '635/515, 413 (Dr,Cr)', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 76, lenId: '', docType: 'GL', ttyCode: '906', ttyCategory: 'Tổng hợp', ttyName: 'Chênh lệch tỷ giá thực hiện', description: '635/515, 413 (Dr,Cr)', debit: '', credit: '', postingControl: 'AUTO', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 77, lenId: '', docType: 'GL', ttyCode: '907', ttyCategory: 'Tổng hợp', ttyName: 'Bút toán thủ công', description: 'Dr: GL, Cr: GL', debit: '', credit: '', postingControl: 'MANUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: 'Nhập bút toán thủ công phải chọn ngày revert để đúng ngày hệ thống tự động revert bút toán này Hoặc nhập ở Biên bản nghiệm thu dịch vụ (Service approval)' },
    { id: 78, lenId: '', docType: 'GL', ttyCode: '908', ttyCategory: 'Tổng hợp', ttyName: 'Trích trước chi phí GL', description: 'Dr: GL, Cr: GL', debit: '', credit: '', postingControl: 'MANUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
    { id: 79, lenId: '', docType: 'BG', ttyCode: '909', ttyCategory: 'Tổng hợp', ttyName: 'Bút toán ngân sách', description: 'Dr: GL, Cr: GL', debit: '', credit: '', postingControl: 'MANUAL', projects: false, productOrder: false, costCenter: false, stores: false, object: false, bankAccount: false, notes: '' },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddRow = () => {
    const newRow: MappingRow = {
      id: Date.now(),
      lenId: '',
      docType: '',
      ttyCode: '',
      ttyCategory: '',
      ttyName: '',
      description: '',
      debit: '',
      credit: '',
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

  const updateRow = (id: number, field: keyof MappingRow, value: any) => {
    setData(data.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const filteredData = data.filter(row => {
    const matchesSearch = searchText === '' || Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesType = selectedType === 'all' || row.ttyCategory === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Filter Panel */}
      <FilterPanel
        searchValue={searchText}
        onSearchChange={setSearchText}
        showStatus={false}
        showType={true}
        typeOptions={[
          {'value':'all','label':'All Categories'},
          {'value':'AR','label':'AR'},
          {'value':'AP','label':'AP'},
          {'value':'CA','label':'CA'},
          {'value':'BA','label':'BA'},
          {'value':'GL','label':'GL'},
        ]}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
      {/* Page Header */}
        <div className="bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Docs Trans Mapping</h1>
          <nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">Home</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">Master Data</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">Docs Trans Mapping</span>
          </nav>
        </div>

      <MasterDataToolbar 
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddRow={handleAddRow}
        onDeleteRows={handleDeleteRows}
        onSave={() => console.log('Saving Mappings...')}
        selectedCount={selectedRows.length}
      />

      <div className="flex-1 overflow-hidden bg-white mx-6 mb-6 border rounded-lg shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full text-sm min-w-[3200px]">
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
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-24 bg-[#f0f7ff] sticky left-12 z-20">LEN ID</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-24 bg-[#f0f7ff] sticky left-36 z-20">Doc Type</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-32 bg-[#f0f7ff] sticky left-60 z-20">TTY Code</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">TTY Category</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-64">TTY Name</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-80">Description</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Debit</th>
                <th className="px-3 py-3 text-left text-blue-700 font-bold uppercase border-r w-40">Credit</th>
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
                  <td colSpan={17} className="px-3 py-12 text-center text-gray-500 bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-10" />
                      <span>No mappings found</span>
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
                    <td className="px-3 py-2 border-r bg-white sticky left-12 z-10">
                      <Input
                        value={row.lenId}
                        onChange={(e) => updateRow(row.id, 'lenId', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-center"
                      />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-36 z-10 font-bold text-gray-700">
                      <Input
                        value={row.docType}
                        onChange={(e) => updateRow(row.id, 'docType', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-center"
                      />
                    </td>
                    <td className="px-3 py-2 border-r bg-white sticky left-60 z-10 font-bold text-blue-600">
                      <Input
                        value={row.ttyCode}
                        onChange={(e) => updateRow(row.id, 'ttyCode', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all text-center"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.ttyCategory}
                        onChange={(e) => updateRow(row.id, 'ttyCategory', e.target.value)}
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
                      <Input
                        value={row.debit}
                        onChange={(e) => updateRow(row.id, 'debit', e.target.value)}
                        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <Input
                        value={row.credit}
                        onChange={(e) => updateRow(row.id, 'credit', e.target.value)}
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
        
        <div className="bg-white border-t px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredData.length}</span> records
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}