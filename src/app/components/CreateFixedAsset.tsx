import { useState, useEffect } from 'react';
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
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';

interface CreateFixedAssetProps {
  onClose: () => void;
}

interface AssetComponentRow {
  id: number;
  acoId: string;
  assId: string;
  parentId: string;
  level: number;
  componentName: string;
  quantity: number;
  costPrice: number;
  serialNumber: string;
  barcode: string;
  warrantyExpire: string;
  warrantyObjId: string;
  calibStartDate: string;
  calibEndDate: string;
  calibObjId: string;
  alertDate: number;
  imageUrl: string;
}

const MOCK_ASSET_CATEGORIES = [
  { id: 'ACA-001', name: 'Máy móc thiết bị' },
  { id: 'ACA-002', name: 'Nhà xưởng' },
  { id: 'ACA-003', name: 'Phương tiện vận tải' },
  { id: 'ACA-004', name: 'Thiết bị văn phòng' },
];

const MOCK_LOCATIONS = [
  { id: 'LOC-001', name: 'Tầng 1 - Phòng IT' },
  { id: 'LOC-002', name: 'Tầng 2 - Phòng Kế toán' },
  { id: 'LOC-003', name: 'Kho A' },
];

const MOCK_COST_CENTERS = [
  { id: 'CCE-001', name: 'Phòng IT' },
  { id: 'CCE-002', name: 'Phòng Kế toán' },
  { id: 'CCE-003', name: 'Phòng Kinh doanh' },
];

const MOCK_EMPLOYEES = [
  { id: 'EMP-001', name: 'Nguyễn Văn A' },
  { id: 'EMP-002', name: 'Trần Thị B' },
  { id: 'EMP-003', name: 'Lê Văn C' },
];

const MOCK_PROJECTS = [
  { id: 'PROJ-001', name: 'Dự án A' },
  { id: 'PROJ-002', name: 'Dự án B' },
  { id: 'PROJ-003', name: 'Dự án C' },
];

const MOCK_SUPPLIERS = [
  { id: 'SUP-001', name: 'FPT Shop' },
  { id: 'SUP-002', name: 'Thế Giới Di Động' },
  { id: 'SUP-003', name: 'Nguyễn Kim' },
];

export default function CreateFixedAsset({ onClose }: CreateFixedAssetProps) {
  const [activeTab, setActiveTab] = useState('main-info');
  const [searchText, setSearchText] = useState('');
  const [complete, setComplete] = useState(false);
  const [posted, setPosted] = useState(false);

  const [components, setComponents] = useState<AssetComponentRow[]>([
    {
      id: 1,
      acoId: 'ACO-001',
      assId: 'ASS-001',
      parentId: '',
      level: 1,
      componentName: 'Mainboard ASUS ROG',
      quantity: 1,
      costPrice: 5500000,
      serialNumber: 'MB-2024-001',
      barcode: '8934567890123',
      warrantyExpire: '2026-12-31',
      warrantyObjId: 'SUP-001',
      calibStartDate: '2024-01-15',
      calibEndDate: '2025-01-15',
      calibObjId: 'SUP-001',
      alertDate: 30,
      imageUrl: ''
    },
    {
      id: 2,
      acoId: 'ACO-002',
      assId: 'ASS-001',
      parentId: 'ACO-001',
      level: 2,
      componentName: 'CPU Intel Core i7-13700K',
      quantity: 1,
      costPrice: 9800000,
      serialNumber: 'CPU-2024-045',
      barcode: '8934567890456',
      warrantyExpire: '2027-06-30',
      warrantyObjId: 'SUP-002',
      calibStartDate: '',
      calibEndDate: '',
      calibObjId: '',
      alertDate: 60,
      imageUrl: ''
    }
  ]);

  const [selectedComponents, setSelectedComponents] = useState<number[]>([]);

  // Calculate total asset value from components
  const totalAssetValue = components.reduce((sum, row) => sum + (row.quantity * row.costPrice), 0);

  const handleAddComponentRow = () => {
    const newId = components.length > 0 ? Math.max(...components.map(r => r.id)) + 1 : 1;
    const newRow: AssetComponentRow = {
      id: newId,
      acoId: `ACO-${String(newId).padStart(3, '0')}`,
      assId: '',
      parentId: '',
      level: 1,
      componentName: '',
      quantity: 1,
      costPrice: 0,
      serialNumber: '',
      barcode: '',
      warrantyExpire: '',
      warrantyObjId: '',
      calibStartDate: '',
      calibEndDate: '',
      calibObjId: '',
      alertDate: 30,
      imageUrl: ''
    };
    setComponents([...components, newRow]);
  };

  const handleDeleteComponentRows = () => {
    setComponents(components.filter(row => !selectedComponents.includes(row.id)));
    setSelectedComponents([]);
  };

  const toggleComponentSelection = (id: number) => {
    setSelectedComponents(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredComponents = components.filter(row =>
    searchText === '' ||
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const getStatus = () => {
    if (posted) return 'ACTIVE';
    if (complete) return 'INACTIVE';
    return 'DRAFT';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-x-auto">
      <div className="bg-white rounded-lg shadow-sm" style={{ width: '1600px' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800">Create Fixed Asset</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 px-6">
            <TabsTrigger
              value="main-info"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
              style={{ width: '440px' }}
            >
              Main Info
            </TabsTrigger>
            <TabsTrigger
              value="approval-info"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 ml-6"
              style={{ width: '440px' }}
            >
              Approval Info
            </TabsTrigger>
          </TabsList>

          {/* Main Info Tab */}
          <TabsContent value="main-info" className="p-0">
            {/* 3 DATA BLOCKS */}
            <div className="flex gap-6 mb-6 px-6 mt-6" style={{ width: '1600px' }}>
              {/* Block 1: Asset Information - 3x3 grid (3 rows only) */}
              <div style={{ width: '440px' }}>
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="text-sm font-medium mb-3 pb-2 border-b text-gray-700">ASSET INFORMATION</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Row 1 */}
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">
                        <span className="text-red-500">*</span> Asset ID
                      </Label>
                      <Input className="bg-pink-50 h-10" placeholder="Auto" disabled />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm mb-1 block text-gray-700">
                        <span className="text-red-500">*</span> Asset Code
                      </Label>
                      <Input className="bg-pink-50 h-10" placeholder="ACA001-00001" />
                    </div>
                    
                    {/* Row 2 */}
                    <div className="col-span-2">
                      <Label className="text-sm mb-1 block text-gray-700">
                        <span className="text-red-500">*</span> Asset Name
                      </Label>
                      <Input className="bg-pink-50 h-10" placeholder="Tên tài sản" />
                    </div>
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">
                        <span className="text-red-500">*</span> Category
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-pink-50 h-10">
                          <SelectValue placeholder="Chọn" />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_ASSET_CATEGORIES.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Row 3 */}
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Serial Number</Label>
                      <Input className="h-10" placeholder="SN-XXX" />
                    </div>
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Barcode</Label>
                      <Input className="h-10" placeholder="BC-XXX" />
                    </div>
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Parent Asset</Label>
                      <Input className="h-10" placeholder="Optional" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Block 2: Physical Information - 3x3 grid (3 rows only) */}
              <div style={{ width: '440px' }}>
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="text-sm font-medium mb-3 pb-2 border-b text-gray-700">PHYSICAL INFORMATION</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Row 1 */}
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Model</Label>
                      <Input className="h-10" placeholder="Model" />
                    </div>
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Manufacturer</Label>
                      <Input className="h-10" placeholder="Nhà SX" />
                    </div>
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Origin</Label>
                      <Select>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Quốc gia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vietnam">Vietnam</SelectItem>
                          <SelectItem value="China">China</SelectItem>
                          <SelectItem value="Japan">Japan</SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Row 2 */}
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Use Start Date</Label>
                      <Input type="date" className="h-10" />
                    </div>
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Status</Label>
                      <Select defaultValue={getStatus()}>
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1"></div>
                    
                    {/* Row 3 */}
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Complete</Label>
                      <div className="flex items-center h-10">
                        <Switch checked={complete} onCheckedChange={setComplete} />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Post</Label>
                      <div className="flex items-center h-10">
                        <Switch checked={posted} onCheckedChange={setPosted} />
                      </div>
                    </div>
                    <div className="col-span-1"></div>
                  </div>
                </div>
              </div>

              {/* Block 3: Location & Assignment - 3x3 grid (3 rows only) */}
              <div style={{ width: '440px' }}>
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="text-sm font-medium mb-3 pb-2 border-b text-gray-700">LOCATION & ASSIGNMENT</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Row 1 */}
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Location</Label>
                      <Select>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Vị trí" />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_LOCATIONS.map(loc => (
                            <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Cost Center</Label>
                      <Select>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="CC" />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_COST_CENTERS.map(cc => (
                            <SelectItem key={cc.id} value={cc.id}>{cc.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Employee</Label>
                      <Select>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Người" />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_EMPLOYEES.map(emp => (
                            <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Row 2 */}
                    <div className="col-span-1">
                      <Label className="text-sm mb-1 block text-gray-700">Project</Label>
                      <Select>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Dự án" />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_PROJECTS.map(proj => (
                            <SelectItem key={proj.id} value={proj.id}>{proj.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm mb-1 block text-gray-700">
                        <span className="text-red-500">*</span> Total Asset Value
                      </Label>
                      <Input
                        className="bg-yellow-50 h-10 font-semibold"
                        value={totalAssetValue.toLocaleString('vi-VN')}
                        disabled
                      />
                    </div>
                    
                    {/* Row 3 - Empty or can add more fields later */}
                    <div className="col-span-3"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Components Details Section */}
            <div className="mt-6 px-6">
              <h3 className="text-sm font-medium mb-3 text-gray-700">ASSET COMPONENTS DETAILS</h3>
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
                <Button variant="outline" size="sm" onClick={handleAddComponentRow}>Add Row</Button>
                <Button variant="outline" size="sm" onClick={handleDeleteComponentRows} disabled={selectedComponents.length === 0}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="border rounded overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50 border-b">
                      <th className="px-3 py-2 text-left">
                        <Checkbox />
                      </th>
                      <th className="px-3 py-2 text-left text-blue-700">Component ID</th>
                      <th className="px-3 py-2 text-left text-blue-700">Asset ID</th>
                      <th className="px-3 py-2 text-left text-blue-700">Parent ID</th>
                      <th className="px-3 py-2 text-left text-blue-700">Level</th>
                      <th className="px-3 py-2 text-left text-blue-700">Component Name</th>
                      <th className="px-3 py-2 text-right text-blue-700">Quantity</th>
                      <th className="px-3 py-2 text-right text-blue-700">Cost Price</th>
                      <th className="px-3 py-2 text-right text-blue-700">Total Value</th>
                      <th className="px-3 py-2 text-left text-blue-700">Serial Number</th>
                      <th className="px-3 py-2 text-left text-blue-700">Barcode</th>
                      <th className="px-3 py-2 text-left text-blue-700">Warranty Expire</th>
                      <th className="px-3 py-2 text-left text-blue-700">Warranty Supplier</th>
                      <th className="px-3 py-2 text-left text-blue-700">Calib Start</th>
                      <th className="px-3 py-2 text-left text-blue-700">Calib End</th>
                      <th className="px-3 py-2 text-left text-blue-700">Calib Supplier</th>
                      <th className="px-3 py-2 text-right text-blue-700">Alert Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComponents.map(row => (
                      <tr key={row.id} className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <Checkbox
                            checked={selectedComponents.includes(row.id)}
                            onCheckedChange={() => toggleComponentSelection(row.id)}
                          />
                        </td>
                        <td className="px-3 py-2">{row.acoId}</td>
                        <td className="px-3 py-2">{row.assId}</td>
                        <td className="px-3 py-2">{row.parentId}</td>
                        <td className="px-3 py-2">{row.level}</td>
                        <td className="px-3 py-2">{row.componentName}</td>
                        <td className="px-3 py-2 text-right">{row.quantity}</td>
                        <td className="px-3 py-2 text-right">{row.costPrice.toLocaleString('vi-VN')}</td>
                        <td className="px-3 py-2 text-right font-semibold">
                          {(row.quantity * row.costPrice).toLocaleString('vi-VN')}
                        </td>
                        <td className="px-3 py-2">{row.serialNumber}</td>
                        <td className="px-3 py-2">{row.barcode}</td>
                        <td className="px-3 py-2">{row.warrantyExpire}</td>
                        <td className="px-3 py-2">{row.warrantyObjId}</td>
                        <td className="px-3 py-2">{row.calibStartDate}</td>
                        <td className="px-3 py-2">{row.calibEndDate}</td>
                        <td className="px-3 py-2">{row.calibObjId}</td>
                        <td className="px-3 py-2 text-right">{row.alertDate}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-100 font-semibold border-t-2">
                      <td colSpan={8} className="px-3 py-2 text-right">TOTAL ASSET VALUE:</td>
                      <td className="px-3 py-2 text-right text-blue-700">
                        {totalAssetValue.toLocaleString('vi-VN')} VND
                      </td>
                      <td colSpan={8}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="text-right text-sm text-gray-600 mt-2">
                Total Components: {filteredComponents.length}
              </div>
            </div>
          </TabsContent>

          {/* Approval Info Tab */}
          <TabsContent value="approval-info" className="p-6">
            <div className="mb-6">
              <h3 className="text-sm mb-4 text-gray-700">Approval Workflow</h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm mb-1 block text-gray-700">
                      <span className="text-red-500">*</span> Approval Workflow
                    </Label>
                    <Select defaultValue="WF01">
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WF01">WF01 - Standard Approval</SelectItem>
                        <SelectItem value="WF02">WF02 - Express Approval</SelectItem>
                        <SelectItem value="WF03">WF03 - Department Head Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm mb-1 block text-gray-700">Workflow Description</Label>
                    <Input
                      className="h-10 bg-white"
                      value="Level 1: Manager → Level 2: Director → Level 3: CFO"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm mb-4 text-gray-700">Thông tin phê duyệt đa cấp</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50 border-b">
                      <th className="px-4 py-3 text-left text-blue-700">Level</th>
                      <th className="px-4 py-3 text-left text-blue-700">Approver</th>
                      <th className="px-4 py-3 text-left text-blue-700">Position</th>
                      <th className="px-4 py-3 text-left text-blue-700">Approval Date</th>
                      <th className="px-4 py-3 text-left text-blue-700">Comments</th>
                      <th className="px-4 py-3 text-left text-blue-700">Status</th>
                      <th className="px-4 py-3 text-left text-blue-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Level 1</td>
                      <td className="px-4 py-3">Trần Văn B</td>
                      <td className="px-4 py-3">Manager</td>
                      <td className="px-4 py-3">2026-01-17</td>
                      <td className="px-4 py-3">Đồng ý</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                          Approved
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Select disabled>
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue placeholder="Chọn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approve">Duyệt</SelectItem>
                            <SelectItem value="reject">Từ chối</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Level 2</td>
                      <td className="px-4 py-3">Lê Thị C</td>
                      <td className="px-4 py-3">Director</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">-</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Select>
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue placeholder="Chọn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approve">Duyệt</SelectItem>
                            <SelectItem value="reject">Từ chối</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm mb-4 text-gray-700">Lịch sử thao tác</h3>
              <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Tạo tài sản cố định</p>
                    <p className="text-xs text-gray-500">Nguyễn Văn A - 2026-02-26 09:30</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Gửi phê duyệt Level 1</p>
                    <p className="text-xs text-gray-500">Nguyễn Văn A - 2026-02-26 10:15</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Chờ phê duyệt Level 2</p>
                    <p className="text-xs text-gray-500">Đang chờ xử lý</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="default">Save Draft</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="default">Complete</Button>
            <Button variant="default" className="bg-blue-700 hover:bg-blue-800">Create Asset</Button>
          </div>
        </div>
      </div>
    </div>
  );
}