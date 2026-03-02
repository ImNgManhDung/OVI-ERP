import { useState } from 'react';
import { Plus, Search, RefreshCw, List, Grid3x3, MoreVertical, Download, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { useLanguage } from '../i18n/LanguageContext';
import { FilterPanel } from './FilterPanel';
import { StatsCard } from './StatsCard';

interface GoodReceiptRow {
    id: number;
    docNumber: string;
    docDate: string;
    warehouse: string;
    objectCode: string;
    objectName: string;
    type: string;
    totalAmount: number;
    status: string;
}

interface GoodReceiptListProps {
    onCreateClick: () => void;
}

export default function GoodReceiptList({ onCreateClick }: GoodReceiptListProps) {
    const [searchText, setSearchText] = useState('');
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const { t } = useLanguage();

    const [data] = useState<GoodReceiptRow[]>([
        {
            id: 1,
            docNumber: 'PN-2025-0882',
            docDate: '2025-01-06',
            warehouse: 'Kho Chính',
            objectCode: 'NCC-001',
            objectName: 'Tổng công ty Kim khí',
            type: 'Nhập kho',
            totalAmount: 137500000,
            status: 'Draft',
        },
        {
            id: 2,
            docNumber: 'PN-2025-0883',
            docDate: '2025-01-07',
            warehouse: 'Kho Nguyên Liệu',
            objectCode: 'NCC-042',
            objectName: 'Đại lý Sắt Thép Miền Nam',
            type: 'Nhập kho',
            totalAmount: 85200000,
            status: 'Approved',
        },
        {
            id: 3,
            docNumber: 'PN-2025-0884',
            docDate: '2025-01-08',
            warehouse: 'Kho Chính',
            objectCode: 'NCC-015',
            objectName: 'Công ty Cổ phần Xi măng',
            type: 'Nhập nội bộ',
            totalAmount: 42000000,
            status: 'Pending',
        }
    ]);

    const toggleRowSelection = (id: number) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const toggleAllRows = () => {
        if (selectedRows.length === filteredData.length && filteredData.length > 0) {
            setSelectedRows([]);
        } else {
            setSelectedRows(filteredData.map(r => r.id));
        }
    };

    const filteredData = data.filter(row => {
        const matchSearch = searchText === '' ||
            Object.values(row).some(val =>
                String(val).toLowerCase().includes(searchText.toLowerCase())
            );
        const matchStatus = statusFilter === 'all' || row.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const formatCurrency = (value: number) => value.toLocaleString('vi-VN');

    const draftCount = data.filter(r => r.status === 'Draft').length;
    const approvedCount = data.filter(r => r.status === 'Approved').length;
    const pendingCount = data.filter(r => r.status === 'Pending').length;
    const rejectedCount = data.filter(r => r.status === 'Rejected').length;

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'Draft', label: 'Draft' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Rejected', label: 'Rejected' },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Filter Panel */}
            <FilterPanel
                searchValue={searchText}
                onSearchChange={setSearchText}
                statusOptions={statusOptions}
                selectedStatus={statusFilter}
                onStatusChange={setStatusFilter}
                showStatus={true}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b px-6 py-4">
                    <h1 className="text-xl font-semibold text-gray-800 uppercase tracking-tight">{t.wmm.goodsReceipt}</h1>
                    <p className="text-sm text-gray-500 mt-1">Quản lý phiếu nhập kho và vật tư</p>
                </div>

                {/* Stats Cards */}
                <div className="bg-white border-b px-6 py-4">
                    <div className="flex items-center gap-12">
                        <StatsCard label="DRAFT" value={draftCount} color="gray" />
                        <StatsCard label="PENDING" value={pendingCount} color="orange" />
                        <StatsCard label="APPROVED" value={approvedCount} color="green" />
                        <StatsCard label="REJECTED" value={rejectedCount} color="red" />
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={onCreateClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            {t.wmm.createGoodsReceipt}
                        </Button>
                        <Button variant="outline" className="border-gray-200">
                            <Download className="w-4 h-4 mr-1" />
                            Export
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Save className="w-4 h-4 mr-1" />
                            Save
                        </Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-400"><List className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-gray-400"><Grid3x3 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-gray-400"><RefreshCw className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-gray-400"><MoreVertical className="w-4 h-4" /></Button>
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
                    <table className="w-full text-sm min-w-[1000px]">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-gray-50 border-b">
                                <th className="px-3 py-3 text-left w-12 border-r bg-gray-50 sticky left-0 z-20">
                                    <Checkbox
                                        checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                                        onCheckedChange={toggleAllRows}
                                    />
                                </th>
                                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-40 bg-gray-50 sticky left-12 z-20">Số phiếu</th>
                                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-32">Ngày nhập</th>
                                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-48">Kho</th>
                                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-64">Đối tượng</th>
                                <th className="px-3 py-3 text-left text-gray-700 font-semibold border-r w-36">Loại</th>
                                <th className="px-3 py-3 text-right text-gray-700 font-semibold border-r w-40">Tổng tiền</th>
                                <th className="px-3 py-3 text-center text-gray-700 font-semibold border-r w-28">Trạng thái</th>
                                <th className="px-3 py-3 text-center text-gray-700 font-semibold w-24">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-4 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <Search className="w-12 h-12 opacity-10" />
                                            <span>Không tìm thấy dữ liệu</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((row) => (
                                    <tr key={row.id} className="border-b hover:bg-gray-50 transition-colors bg-white">
                                        <td className="px-3 py-2 border-r bg-inherit sticky left-0 z-10">
                                            <Checkbox
                                                checked={selectedRows.includes(row.id)}
                                                onCheckedChange={() => toggleRowSelection(row.id)}
                                            />
                                        </td>
                                        <td className="px-3 py-2 border-r bg-inherit sticky left-12 z-10 font-semibold text-blue-600">
                                            {row.docNumber}
                                        </td>
                                        <td className="px-3 py-2 border-r text-gray-600 tabular-nums">{row.docDate}</td>
                                        <td className="px-3 py-2 border-r text-gray-700">{row.warehouse}</td>
                                        <td className="px-3 py-2 border-r">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">{row.objectName}</span>
                                                <span className="text-xs text-gray-400 tracking-wider font-semibold">{row.objectCode}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 border-r text-gray-600">{row.type}</td>
                                        <td className="px-3 py-2 border-r text-right tabular-nums font-semibold">{formatCurrency(row.totalAmount)}</td>
                                        <td className="px-3 py-2 border-r text-center">
                                            <span className={
                                                row.status === 'Approved' ? 'erp-badge-success' :
                                                    row.status === 'Pending' ? 'erp-badge-warning' :
                                                        row.status === 'Draft' ? 'erp-badge-neutral' :
                                                            'erp-badge-danger'
                                            }>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium text-xs"
                                            >
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="bg-white border-t px-6 py-3 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Hiển thị <span className="font-semibold">{filteredData.length}</span> trên <span className="font-semibold">{data.length}</span> kết quả
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            Tổng tiền: <span className="font-semibold text-gray-800">
                                {formatCurrency(filteredData.reduce((s, r) => s + r.totalAmount, 0))} VNĐ
                            </span>
                        </span>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" disabled>Trước</Button>
                            <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200">1</Button>
                            <Button variant="outline" size="sm" disabled>Sau</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

