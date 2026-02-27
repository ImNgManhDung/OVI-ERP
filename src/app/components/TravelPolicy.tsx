import { useState } from 'react';
import { Search, ChevronDown, Plus, Trash2, Edit } from 'lucide-react';
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
import { Checkbox } from './ui/checkbox';
import { ActionsDropdown } from './ActionsDropdown';
import { SimpleColumnsDialog } from './SimpleColumnsDialog';

interface ExpensePolicyRow {
  id: number;
  expType: string; // Loại định mức
  expCode: string; // Mã định mức
  expClass: string; // Vé máy bay, tàu hỏa, tiếp khách...
  expCategory: string; // Hạng vé...
  description: string; // Auto-generated from type + class + category
  positions: string; // Chức danh
  
  // Location conditions
  locationDomestic: boolean;
  locationInternational: boolean;
  locationRegion: string; // Tỉnh thành (nếu trong nước) hoặc khu vực (nếu ngoài nước)
  
  // Value conditions
  minValue: string;
  maxValue: string;
  uom: string; // Unit of measure
  
  // Time period
  startDate: string;
  endDate: string;
  status: string; // Y/N
  
  // Policy values
  policyMinValue: string;
  policyMaxValue: string;
  currencyCode: string;
  
  isEditing?: boolean;
}

// LOV Options
const expTypeOptions = [
  'Ăn',
  'Mặc',
  'Ở',
  'Đi lại',
];

const expClassOptions = {
  'Ăn': ['Ăn sáng', 'Ăn trưa', 'Ăn tối', 'Tiếp khách'],
  'Mặc': ['Đồng phục', 'Trang phục làm việc', 'Giày dép'],
  'Ở': ['Khách sạn', 'Nhà nghỉ', 'Căn hộ dịch vụ'],
  'Đi lại': ['Vé máy bay', 'Tàu hỏa', 'Xe bus', 'Taxi', 'Xăng xe'],
};

const expCategoryOptions = {
  'Vé máy bay': ['Economy', 'Premium Economy', 'Business', 'First Class'],
  'Tàu hỏa': ['Ghế cứng', 'Ghế mềm', 'Giường nằm 4', 'Giường nằm 6'],
  'Khách sạn': ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
  'Xe bus': ['Ghế ngồi', 'Giường nằm', 'Limousine'],
  'Ăn sáng': ['Tiêu chuẩn', 'Nâng cao'],
  'Ăn trưa': ['Tiêu chuẩn', 'Nâng cao'],
  'Ăn tối': ['Tiêu chuẩn', 'Nâng cao'],
  'Tiếp khách': ['Cơ bản', 'Trang trọng', 'VIP'],
};

const positionOptions = [
  'Nhân viên',
  'Trưởng phòng',
  'Phó giám đốc',
  'Giám đốc',
  'Tổng giám đốc',
  'CEO',
];

const internationalRegionOptions = [
  'Mỹ',
  'Châu Âu',
  'Châu Á',
];

// 34 tỉnh thành Việt Nam (theo thứ tự vùng)
const domesticProvinces = [
  // Miền Bắc
  'Hà Nội',
  'Hải Phòng',
  'Quảng Ninh',
  'Bắc Ninh',
  'Hải Dương',
  'Hưng Yên',
  'Thái Bình',
  'Nam Định',
  'Ninh Bình',
  'Hà Nam',
  'Vĩnh Phúc',
  'Phú Thọ',
  'Thái Nguyên',
  'Bắc Giang',
  'Lạng Sơn',
  'Cao Bằng',
  'Lào Cai',
  'Yên Bái',
  'Điện Biên',
  'Sơn La',
  'Hòa Bình',
  'Thanh Hóa',
  'Nghệ An',
  'Hà Tĩnh',
  // Miền Trung
  'Quảng Bình',
  'Quảng Trị',
  'Thừa Thiên Huế',
  'Đà Nẵng',
  'Quảng Nam',
  'Quảng Ngãi',
  'Bình Định',
  'Phú Yên',
  'Khánh Hòa',
  'Ninh Thuận',
  'Bình Thuận',
  'Kon Tum',
  'Gia Lai',
  'Đắk Lắk',
  'Đắk Nông',
  'Lâm Đồng',
  // Miền Nam
  'TP Hồ Chí Minh',
  'Bình Phước',
  'Bình Dương',
  'Đồng Nai',
  'Bà Rịa - Vũng Tàu',
  'Tây Ninh',
  'Long An',
  'Tiền Giang',
  'Bến Tre',
  'Trà Vinh',
  'Vĩnh Long',
  'Đồng Tháp',
  'An Giang',
  'Kiên Giang',
  'Cần Thơ',
  'Hậu Giang',
  'Sóc Trăng',
  'Bạc Liêu',
  'Cà Mau',
];

const uomOptions = [
  'KM',
  'Giờ',
  'Ngày',
  'Tháng',
  'Lần',
  '%',
];

const currencyOptions = [
  'VND',
  'USD',
  'EUR',
  'JPY',
  'SGD',
];

export default function TravelPolicy() {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showColumnsDialog, setShowColumnsDialog] = useState(false);
  
  const [policies, setPolicies] = useState<ExpensePolicyRow[]>([
    {
      id: 1,
      expType: 'Đi lại',
      expCode: 'DL-001',
      expClass: 'Vé máy bay',
      expCategory: 'Business',
      description: 'Đi lại - Vé máy bay - Business',
      positions: 'Giám đốc',
      locationDomestic: true,
      locationInternational: false,
      locationRegion: '',
      minValue: '500',
      maxValue: '1000',
      uom: 'KM',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      status: 'Y',
      policyMinValue: '5000000',
      policyMaxValue: '15000000',
      currencyCode: 'VND',
    },
    {
      id: 2,
      expType: 'Ở',
      expCode: 'O-001',
      expClass: 'Khách sạn',
      expCategory: '4 sao',
      description: 'Ở - Khách sạn - 4 sao',
      positions: 'Phó giám đốc',
      locationDomestic: false,
      locationInternational: true,
      locationRegion: 'Châu Á',
      minValue: '1',
      maxValue: '10',
      uom: 'Ngày',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      status: 'Y',
      policyMinValue: '2000000',
      policyMaxValue: '5000000',
      currencyCode: 'VND',
    },
    {
      id: 3,
      expType: 'Ăn',
      expCode: 'AN-001',
      expClass: 'Tiếp khách',
      expCategory: 'Trang trọng',
      description: 'Ăn - Tiếp khách - Trang trọng',
      positions: 'Trưởng phòng',
      locationDomestic: true,
      locationInternational: false,
      locationRegion: '',
      minValue: '1',
      maxValue: '20',
      uom: 'Lần',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      status: 'Y',
      policyMinValue: '500000',
      policyMaxValue: '2000000',
      currencyCode: 'VND',
    },
  ]);

  const [visibleColumns, setVisibleColumns] = useState<{[key: string]: boolean}>({
    expType: true,
    expCode: true,
    expClass: true,
    expCategory: true,
    description: true,
    positions: true,
    locationDomestic: true,
    locationInternational: true,
    locationRegion: true,
    minValue: true,
    maxValue: true,
    uom: true,
    startDate: true,
    endDate: true,
    status: true,
    policyMinValue: true,
    policyMaxValue: true,
    currencyCode: true,
  });

  const columns = [
    { key: 'expType', label: 'Exp Type' },
    { key: 'expCode', label: 'Exp Code' },
    { key: 'expClass', label: 'Exp Class' },
    { key: 'expCategory', label: 'Exp Category' },
    { key: 'description', label: 'Description' },
    { key: 'positions', label: 'Positions' },
    { key: 'locationDomestic', label: 'Trong nước' },
    { key: 'locationInternational', label: 'Ngoài nước' },
    { key: 'locationRegion', label: 'Khu vực' },
    { key: 'minValue', label: 'Min Value' },
    { key: 'maxValue', label: 'Max Value' },
    { key: 'uom', label: 'UOM' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'status', label: 'Status' },
    { key: 'policyMinValue', label: 'Policy Min Value' },
    { key: 'policyMaxValue', label: 'Policy Max Value' },
    { key: 'currencyCode', label: 'Currency' },
  ];

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddRow = () => {
    const newRow: ExpensePolicyRow = {
      id: Date.now(),
      expType: '',
      expCode: '',
      expClass: '',
      expCategory: '',
      description: '',
      positions: '',
      locationDomestic: false,
      locationInternational: false,
      locationRegion: '',
      minValue: '',
      maxValue: '',
      uom: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      status: 'Y',
      policyMinValue: '',
      policyMaxValue: '',
      currencyCode: 'VND',
      isEditing: true
    };
    setPolicies([...policies, newRow]);
  };

  const handleDeleteRows = () => {
    setPolicies(policies.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const handleEditRows = () => {
    setPolicies(policies.map(row => 
      selectedRows.includes(row.id) ? { ...row, isEditing: true } : row
    ));
  };

  const handleSave = () => {
    setPolicies(policies.map(row => ({ ...row, isEditing: false })));
    setSelectedRows([]);
  };

  const updateRow = (id: number, field: string, value: any) => {
    setPolicies(policies.map(row => {
      if (row.id === id) {
        let updatedRow = { ...row, [field]: value };
        
        // Clear Exp Class when changing Exp Type
        if (field === 'expType') {
          updatedRow.expClass = '';
          updatedRow.expCategory = '';
        }
        
        // Clear Exp Category when changing Exp Class
        if (field === 'expClass') {
          updatedRow.expCategory = '';
        }
        
        // Auto-generate description
        if (field === 'expType' || field === 'expClass' || field === 'expCategory') {
          const type = field === 'expType' ? value : updatedRow.expType;
          const cls = field === 'expClass' ? value : updatedRow.expClass;
          const cat = field === 'expCategory' ? value : updatedRow.expCategory;
          
          if (type && cls && cat) {
            updatedRow.description = `${type} - ${cls} - ${cat}`;
          } else if (type && cls) {
            updatedRow.description = `${type} - ${cls}`;
          } else if (type) {
            updatedRow.description = type;
          }
        }
        
        // Clear region when changing location type
        if (field === 'locationDomestic' && !value) {
          updatedRow.locationRegion = '';
        }
        
        if (field === 'locationInternational' && !value) {
          updatedRow.locationRegion = '';
        }
        
        return updatedRow;
      }
      return row;
    }));
  };

  const filteredPolicies = policies.filter(row =>
    searchText === '' ||
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">EXPENSE POLICY MANAGEMENT</h1>
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
            </SelectContent>
          </Select>
          <Input
            placeholder="Search All Text Columns"
            className="w-64 h-8"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="outline" size="sm">Go</Button>
          <ActionsDropdown 
            showColumns={true}
            onColumnsClick={() => setShowColumnsDialog(true)}
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleEditRows}
            disabled={selectedRows.length === 0}
          >
            <Edit className="w-4 h-4 mr-1" /> Edit
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDeleteRows}
            disabled={selectedRows.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
          <Button variant="outline" size="sm" onClick={handleAddRow}>
            <Plus className="w-4 h-4 mr-1" /> Add Row
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-t-0 rounded-b-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 border-b">
                <th className="px-3 py-2 text-left">
                  <Checkbox />
                </th>
                {visibleColumns.expType && <th className="px-3 py-2 text-left text-blue-700">EXP TYPE</th>}
                {visibleColumns.expCode && <th className="px-3 py-2 text-left text-blue-700">EXP CODE</th>}
                {visibleColumns.expClass && <th className="px-3 py-2 text-left text-blue-700">EXP CLASS</th>}
                {visibleColumns.expCategory && <th className="px-3 py-2 text-left text-blue-700">EXP CATEGORY</th>}
                {visibleColumns.description && <th className="px-3 py-2 text-left text-blue-700">DESCRIPTION</th>}
                {visibleColumns.positions && <th className="px-3 py-2 text-left text-blue-700">POSITIONS</th>}
                {visibleColumns.locationDomestic && <th className="px-3 py-2 text-left text-blue-700">TRONG NƯỚC</th>}
                {visibleColumns.locationInternational && <th className="px-3 py-2 text-left text-blue-700">NGOÀI NƯỚC</th>}
                {visibleColumns.locationRegion && <th className="px-3 py-2 text-left text-blue-700">KHU VỰC</th>}
                {visibleColumns.minValue && <th className="px-3 py-2 text-left text-blue-700">MIN VALUE</th>}
                {visibleColumns.maxValue && <th className="px-3 py-2 text-left text-blue-700">MAX VALUE</th>}
                {visibleColumns.uom && <th className="px-3 py-2 text-left text-blue-700">UOM</th>}
                {visibleColumns.startDate && <th className="px-3 py-2 text-left text-blue-700">START DATE</th>}
                {visibleColumns.endDate && <th className="px-3 py-2 text-left text-blue-700">END DATE</th>}
                {visibleColumns.status && <th className="px-3 py-2 text-left text-blue-700">STATUS</th>}
                {visibleColumns.policyMinValue && <th className="px-3 py-2 text-left text-blue-700">POLICY MIN VALUE</th>}
                {visibleColumns.policyMaxValue && <th className="px-3 py-2 text-left text-blue-700">POLICY MAX VALUE</th>}
                {visibleColumns.currencyCode && <th className="px-3 py-2 text-left text-blue-700">CURRENCY</th>}
              </tr>
            </thead>
            <tbody>
              {filteredPolicies.length === 0 ? (
                <tr>
                  <td colSpan={19} className="px-3 py-8 text-center text-gray-500">
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
                    
                    {/* EXP TYPE */}
                    {visibleColumns.expType && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
                          <Select
                            value={row.expType}
                            onValueChange={(value) => updateRow(row.id, 'expType', value)}
                          >
                            <SelectTrigger className="h-8 w-28">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              {expTypeOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          row.expType
                        )}
                      </td>
                    )}
                    
                    {/* EXP CODE */}
                    {visibleColumns.expCode && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
                          <Input
                            value={row.expCode}
                            onChange={(e) => updateRow(row.id, 'expCode', e.target.value)}
                            className="h-8 w-28"
                          />
                        ) : (
                          row.expCode
                        )}
                      </td>
                    )}
                    
                    {/* EXP CLASS */}
                    {visibleColumns.expClass && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
                          <Select
                            value={row.expClass}
                            onValueChange={(value) => updateRow(row.id, 'expClass', value)}
                            disabled={!row.expType}
                          >
                            <SelectTrigger className="h-8 w-36">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              {(expClassOptions[row.expType as keyof typeof expClassOptions] || []).map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          row.expClass
                        )}
                      </td>
                    )}
                    
                    {/* EXP CATEGORY */}
                    {visibleColumns.expCategory && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
                          <Select
                            value={row.expCategory}
                            onValueChange={(value) => updateRow(row.id, 'expCategory', value)}
                            disabled={!row.expClass}
                          >
                            <SelectTrigger className="h-8 w-36">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              {(expCategoryOptions[row.expClass as keyof typeof expCategoryOptions] || []).map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          row.expCategory
                        )}
                      </td>
                    )}
                    
                    {/* DESCRIPTION */}
                    {visibleColumns.description && (
                      <td className="px-3 py-2">
                        {row.description}
                      </td>
                    )}
                    
                    {/* POSITIONS */}
                    {visibleColumns.positions && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
                          <Select
                            value={row.positions}
                            onValueChange={(value) => updateRow(row.id, 'positions', value)}
                          >
                            <SelectTrigger className="h-8 w-36">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              {positionOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          row.positions
                        )}
                      </td>
                    )}
                    
                    {/* LOCATION - TRONG NƯỚC */}
                    {visibleColumns.locationDomestic && (
                      <td className="px-3 py-2">
                        <Checkbox
                          checked={row.locationDomestic}
                          onCheckedChange={(checked) => updateRow(row.id, 'locationDomestic', checked)}
                          disabled={!row.isEditing}
                        />
                      </td>
                    )}
                    
                    {/* LOCATION - NGOÀI NƯỚC */}
                    {visibleColumns.locationInternational && (
                      <td className="px-3 py-2">
                        <Checkbox
                          checked={row.locationInternational}
                          onCheckedChange={(checked) => updateRow(row.id, 'locationInternational', checked)}
                          disabled={!row.isEditing}
                        />
                      </td>
                    )}
                    
                    {/* LOCATION - KHU VỰC */}
                    {visibleColumns.locationRegion && (
                      <td className="px-3 py-2">
                        {row.isEditing && (row.locationDomestic || row.locationInternational) ? (
                          <Select
                            value={row.locationRegion}
                            onValueChange={(value) => updateRow(row.id, 'locationRegion', value)}
                          >
                            <SelectTrigger className="h-8 w-36">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              {row.locationDomestic && domesticProvinces.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                              {row.locationInternational && internationalRegionOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          row.locationRegion || '-'
                        )}
                      </td>
                    )}
                    
                    {/* MIN VALUE */}
                    {visibleColumns.minValue && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
                          <Input
                            value={row.minValue}
                            onChange={(e) => updateRow(row.id, 'minValue', e.target.value)}
                            className="h-8 w-24"
                            type="number"
                          />
                        ) : (
                          row.minValue
                        )}
                      </td>
                    )}
                    
                    {/* MAX VALUE */}
                    {visibleColumns.maxValue && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
                          <Input
                            value={row.maxValue}
                            onChange={(e) => updateRow(row.id, 'maxValue', e.target.value)}
                            className="h-8 w-24"
                            type="number"
                          />
                        ) : (
                          row.maxValue
                        )}
                      </td>
                    )}
                    
                    {/* UOM */}
                    {visibleColumns.uom && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
                          <Select
                            value={row.uom}
                            onValueChange={(value) => updateRow(row.id, 'uom', value)}
                          >
                            <SelectTrigger className="h-8 w-24">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              {uomOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          row.uom
                        )}
                      </td>
                    )}
                    
                    {/* START DATE */}
                    {visibleColumns.startDate && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
                          <Input
                            type="date"
                            value={row.startDate}
                            onChange={(e) => updateRow(row.id, 'startDate', e.target.value)}
                            className="h-8 w-36"
                          />
                        ) : (
                          row.startDate
                        )}
                      </td>
                    )}
                    
                    {/* END DATE */}
                    {visibleColumns.endDate && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
                          <Input
                            type="date"
                            value={row.endDate}
                            onChange={(e) => updateRow(row.id, 'endDate', e.target.value)}
                            className="h-8 w-36"
                          />
                        ) : (
                          row.endDate
                        )}
                      </td>
                    )}
                    
                    {/* STATUS */}
                    {visibleColumns.status && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
                          <Select
                            value={row.status}
                            onValueChange={(value) => updateRow(row.id, 'status', value)}
                          >
                            <SelectTrigger className="h-8 w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Y">Y</SelectItem>
                              <SelectItem value="N">N</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className={row.status === 'Y' ? 'text-green-600' : 'text-red-600'}>
                            {row.status}
                          </span>
                        )}
                      </td>
                    )}
                    
                    {/* POLICY MIN VALUE */}
                    {visibleColumns.policyMinValue && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
                          <Input
                            value={row.policyMinValue}
                            onChange={(e) => updateRow(row.id, 'policyMinValue', e.target.value)}
                            className="h-8 w-32"
                            type="number"
                          />
                        ) : (
                          row.policyMinValue ? Number(row.policyMinValue).toLocaleString() : '-'
                        )}
                      </td>
                    )}
                    
                    {/* POLICY MAX VALUE */}
                    {visibleColumns.policyMaxValue && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
                          <Input
                            value={row.policyMaxValue}
                            onChange={(e) => updateRow(row.id, 'policyMaxValue', e.target.value)}
                            className="h-8 w-32"
                            type="number"
                          />
                        ) : (
                          row.policyMaxValue ? Number(row.policyMaxValue).toLocaleString() : '-'
                        )}
                      </td>
                    )}
                    
                    {/* CURRENCY CODE */}
                    {visibleColumns.currencyCode && (
                      <td className="px-3 py-2">
                        {row.isEditing ? (
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
                        ) : (
                          row.currencyCode
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-2 border-t bg-gray-50 text-sm text-right text-gray-600">
          Total: {filteredPolicies.length}
        </div>
      </div>

      {/* Columns Dialog */}
      <SimpleColumnsDialog
        open={showColumnsDialog}
        onOpenChange={setShowColumnsDialog}
        columns={columns}
        visibleColumns={visibleColumns}
        onVisibleColumnsChange={setVisibleColumns}
      />
    </div>
  );
}