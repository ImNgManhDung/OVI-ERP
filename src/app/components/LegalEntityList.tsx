import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import MasterDataToolbar from "./MasterDataToolbar";
import { Search, Plus, Settings2, RotateCcw, LayoutPanelLeft } from "lucide-react";

interface LegalEntityRow {
  id: number;
  lenId: string;
  lenCode: string;
  lenName: string;
  lenDescription: string;
  ounId: string;
  relatedLenId: string;
  capitalRatio: number | string;
  coaId: string;
  address: string;
  legalRepresentative: string;
  chiefAccountant: string;
  lenType: string;
  accCurCode: string;
  language: string;
  website: string;
  phoneNumber: string;
  status: string;
  createdBy: string;
  createDate: string;
}

export default function LegalEntityList() {
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const [rows, setRows] = useState<LegalEntityRow[]>([
    {
      id: 1,
      lenId: "LEN-001",
      lenCode: "LE001",
      lenName: "Công ty TNHH ABC",
      lenDescription: "Công ty mẹ",
      ounId: "OUN-001",
      relatedLenId: "",
      capitalRatio: 100,
      coaId: "COA-001",
      address: "123 Nguyễn Văn Linh, Q7, TP.HCM",
      legalRepresentative: "Nguyễn Văn A",
      chiefAccountant: "Trần Thị B",
      lenType: "COMPANY",
      accCurCode: "VND",
      language: "VI",
      website: "www.abc.com.vn",
      phoneNumber: "028-3883-8888",
      status: "Y",
      createdBy: "admin",
      createDate: "2024-01-15",
    },
    {
      id: 2,
      lenId: "LEN-002",
      lenCode: "LE002",
      lenName: "Chi nhánh Hà Nội",
      lenDescription: "Chi nhánh miền Bắc",
      ounId: "OUN-002",
      relatedLenId: "LEN-001",
      capitalRatio: 100,
      coaId: "COA-001",
      address: "456 Láng Hạ, Đống Đa, Hà Nội",
      legalRepresentative: "Lê Văn C",
      chiefAccountant: "Phạm Thị D",
      lenType: "BRANCH",
      accCurCode: "VND",
      language: "VI",
      website: "www.abc.com.vn",
      phoneNumber: "024-3883-8888",
      status: "Y",
      createdBy: "admin",
      createDate: "2024-02-20",
    },
    {
      id: 3,
      lenId: "LEN-003",
      lenCode: "LE003",
      lenName: "Công ty con XYZ",
      lenDescription: "Công ty con góp vốn 51%",
      ounId: "OUN-003",
      relatedLenId: "LEN-001",
      capitalRatio: 51,
      coaId: "COA-002",
      address: "789 Trần Hưng Đạo, Q5, TP.HCM",
      legalRepresentative: "Hoàng Văn E",
      chiefAccountant: "Vũ Thị F",
      lenType: "SUBSIDIARY",
      accCurCode: "VND",
      language: "VI",
      website: "www.xyz.com.vn",
      phoneNumber: "028-3888-9999",
      status: "Y",
      createdBy: "admin",
      createDate: "2024-03-10",
    },
  ]);

  const addNewRow = () => {
    const newId = Math.max(...rows.map((r) => r.id), 0) + 1;
    const newRow: LegalEntityRow = {
      id: newId,
      lenId: `LEN-${String(newId).padStart(3, "0")}`,
      lenCode: `LE${String(newId).padStart(3, "0")}`,
      lenName: "",
      lenDescription: "",
      ounId: "",
      relatedLenId: "",
      capitalRatio: "",
      coaId: "",
      address: "",
      legalRepresentative: "",
      chiefAccountant: "",
      lenType: "",
      accCurCode: "VND",
      language: "VI",
      website: "",
      phoneNumber: "",
      status: "Y",
      createdBy: "admin",
      createDate: new Date().toISOString().split("T")[0],
    };
    setRows([...rows, newRow]);
  };

  const updateCell = (
    rowId: number,
    field: keyof LegalEntityRow,
    value: string,
  ) => {
    setRows(
      rows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row,
      ),
    );
  };

  const deleteSelectedRows = () => {
    setRows(
      rows.filter((row) => !selectedRows.includes(row.id)),
    );
    setSelectedRows([]);
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id],
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rows.map((r) => r.id));
    }
  };

  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      searchText === "" ||
      Object.values(row).some((val) =>
        String(val)
          .toLowerCase()
          .includes(searchText.toLowerCase()),
      );
    const matchesStatus =
      selectedStatus === "all" || row.status === selectedStatus;
    const matchesType =
      selectedType === "all" || row.lenType === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const renderCell = (
    row: LegalEntityRow,
    field: keyof LegalEntityRow,
  ) => {
    const value = row[field];

    if (field === "status") {
      return (
        <Select
          value={String(value)}
          onValueChange={(val) =>
            updateCell(row.id, field, val)
          }
        >
          <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Y">Active</SelectItem>
            <SelectItem value="N">Inactive</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    if (field === "lenType") {
      return (
        <Select
          value={String(value)}
          onValueChange={(val) =>
            updateCell(row.id, field, val)
          }
        >
          <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="COMPANY">Company</SelectItem>
            <SelectItem value="BRANCH">Branch</SelectItem>
            <SelectItem value="SUBSIDIARY">
              Subsidiary
            </SelectItem>
            <SelectItem value="JOINT_VENTURE">
              Joint Venture
            </SelectItem>
          </SelectContent>
        </Select>
      );
    }

    if (field === "accCurCode") {
      return (
        <Select
          value={String(value)}
          onValueChange={(val) =>
            updateCell(row.id, field, val)
          }
        >
          <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="VND">VND</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    if (field === "language") {
      return (
        <Select
          value={String(value)}
          onValueChange={(val) =>
            updateCell(row.id, field, val)
          }
        >
          <SelectTrigger className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="VI">Tiếng Việt</SelectItem>
            <SelectItem value="EN">English</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        type={field === "capitalRatio" ? "number" : "text"}
        value={String(value)}
        onChange={(e) =>
          updateCell(row.id, field, e.target.value)
        }
        className="h-8 border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent transition-all"
      />
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden text-gray-800">
      {/* Page Header */}
      <div className="bg-white border-b px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-blue-900">Legal Entity</h1>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Quản lý pháp nhân</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Filter Panel - Left Sidebar */}
        <div className="w-[240px] bg-white border-r flex flex-col shrink-0 p-4 shadow-sm z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-800 mb-4 uppercase tracking-wider">
            <Search className="w-3.5 h-3.5 text-blue-600" />
            Filters
          </div>

          <div className="space-y-4 overflow-y-auto flex-1 pr-1 custom-scrollbar text-xs font-bold uppercase tracking-wider text-gray-500">
            {/* Search Input */}
            <div>
              <label className="block text-[10px] mb-1.5 ml-0.5">
                Search
              </label>
              <Input
                placeholder="Code, Name, Address..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="h-8 text-[11px] bg-gray-50/50 border-gray-200 focus:bg-white transition-all shadow-none"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-[10px] mb-1.5 ml-0.5">
                Status
              </label>
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger className="h-8 text-[11px] bg-gray-50/50 border-gray-200 shadow-none font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-[11px]">All Status</SelectItem>
                  <SelectItem value="Y" className="text-[11px]">Active</SelectItem>
                  <SelectItem value="N" className="text-[11px]">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-[10px] mb-1.5 ml-0.5">
                Type
              </label>
              <Select
                value={selectedType}
                onValueChange={setSelectedType}
              >
                <SelectTrigger className="h-8 text-[11px] bg-gray-50/50 border-gray-200 shadow-none font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-[11px]">All Types</SelectItem>
                  <SelectItem value="COMPANY" className="text-[11px]">Company</SelectItem>
                  <SelectItem value="BRANCH" className="text-[11px]">Branch</SelectItem>
                  <SelectItem value="SUBSIDIARY" className="text-[11px]">Subsidiary</SelectItem>
                  <SelectItem value="JOINT_VENTURE" className="text-[11px]">Joint Venture</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Statistics Cards */}
          <div className="px-6 py-4 grid grid-cols-3 gap-4">
            <div className="bg-blue-50/40 border border-blue-100 rounded-lg p-3 flex justify-between items-center relative overflow-hidden group hover:shadow-sm transition-all h-20">
              <div className="relative z-10">
                <p className="text-[9px] font-bold text-blue-600/70 uppercase tracking-widest mb-1">Total Entities</p>
                <p className="text-2xl font-black text-blue-900 leading-none">{rows.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100/30 flex items-center justify-center relative z-10 border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse" />
              </div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-100/10 rounded-full blur-2xl" />
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 flex justify-between items-center relative overflow-hidden group hover:shadow-sm transition-all h-20">
              <div className="relative z-10">
                <p className="text-[9px] font-bold text-emerald-600/70 uppercase tracking-widest mb-1">Active</p>
                <p className="text-2xl font-black text-emerald-900 leading-none">{rows.filter(r => r.status === 'Y').length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100/30 flex items-center justify-center relative z-10 border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-100/10 rounded-full blur-2xl" />
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-3 flex justify-between items-center relative overflow-hidden group hover:shadow-sm transition-all h-20">
              <div className="relative z-10">
                <p className="text-[9px] font-bold text-purple-600/70 uppercase tracking-widest mb-1">Types</p>
                <p className="text-2xl font-black text-purple-900 leading-none">{new Set(rows.map(r => r.lenType)).size}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100/30 flex items-center justify-center relative z-10 border border-purple-100">
                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              </div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-100/10 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Grouping Bar and Toolbar */}
          <div className="px-6 pb-2">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-gray-100/50 border border-dashed border-gray-200 rounded-lg px-4 py-2 text-[11px] text-gray-400 italic flex items-center gap-2 flex-1 mr-6">
                <LayoutPanelLeft className="w-3.5 h-3.5" />
                Kéo tiêu đề một cột vào đây để nhóm một cột đó
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  onClick={addNewRow}
                  className="bg-blue-600 hover:bg-blue-700 text-[11px] font-bold px-4 h-8 rounded-md shadow-sm gap-2 whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" /> New Legal Entity
                </Button>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="h-8 w-40 pl-9 text-[11px] bg-white border-gray-200 rounded-md shadow-none focus:border-blue-500 transition-all font-medium"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-1 h-8 bg-white border border-gray-200 rounded-md px-1 ml-1 divide-x divide-gray-100">
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-blue-600 rounded-sm scale-90"><LayoutPanelLeft className="w-3 h-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-blue-600 rounded-sm scale-90"><RotateCcw className="w-3 h-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-blue-600 rounded-sm scale-90"><Settings2 className="w-3 h-3" /></Button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Toolbar (Selected Rows) */}
          {selectedRows.length > 0 && (
            <div className="mx-6 mb-2">
              <MasterDataToolbar
                searchText={searchText}
                onSearchChange={setSearchText}
                onAddRow={addNewRow}
                onDeleteRows={deleteSelectedRows}
                onSave={() => console.log("Saving Legal Entities...")}
                selectedCount={selectedRows.length}
              />
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white mx-6 mb-6 border rounded-lg shadow-sm">
            <table className="w-full text-sm min-w-[3500px]">
              <thead className="sticky top-0 z-10 font-bold uppercase tracking-tight text-[10px]">
                <tr className="bg-[#f0f7ff] border-b">
                  <th className="px-3 py-3 text-left w-12 border-r bg-[#f0f7ff] sticky left-0 z-20">
                    <Checkbox
                      checked={
                        selectedRows.length === rows.length &&
                        rows.length > 0
                      }
                      onCheckedChange={toggleAllRows}
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 bg-[#f0f7ff] sticky left-12 z-20">
                    Legal Entity ID
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 bg-[#f0f7ff] sticky left-44 z-20">
                    Code
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-64">
                    Name
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-64 font-medium uppercase">
                    Description
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32">
                    Operating Unit
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">
                    Related Entity
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32">
                    Capital Ratio (%)
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32">
                    Chart of Account
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-96 font-medium uppercase">
                    Address
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">
                    Legal Representative
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-48 font-medium uppercase">
                    Chief Accountant
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40">
                    Type
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32">
                    Currency
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32">
                    Language
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-64 font-medium uppercase">
                    Website
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-40 font-medium uppercase">
                    Phone
                  </th>
                  <th className="px-3 py-3 text-left text-blue-700 border-r w-32 font-medium uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={18}
                      className="px-3 py-12 text-center text-gray-500 bg-white shadow-inner"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-12 h-12 opacity-10" />
                        <span className="text-xs font-medium uppercase tracking-widest text-gray-300">No records found</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="px-3 py-2 border-r bg-white sticky left-0 z-10">
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onCheckedChange={() =>
                            toggleRowSelection(row.id)
                          }
                        />
                      </td>
                      <td className="px-3 py-2 border-r bg-white sticky left-12 z-10 text-[11px] font-bold text-blue-600">
                        {row.lenId}
                      </td>
                      <td className="px-3 py-2 border-r bg-white sticky left-44 z-10 text-[11px] font-bold text-gray-700">
                        {renderCell(row, "lenCode")}
                      </td>
                      <td className="px-3 py-2 border-r font-medium text-gray-800 text-[11px]">
                        {renderCell(row, "lenName")}
                      </td>
                      <td className="px-3 py-2 border-r text-[11px]">
                        {renderCell(row, "lenDescription")}
                      </td>
                      <td className="px-3 py-2 border-r text-[11px] text-center">
                        {renderCell(row, "ounId")}
                      </td>
                      <td className="px-3 py-2 border-r text-[11px]">
                        {renderCell(row, "relatedLenId")}
                      </td>
                      <td className="px-3 py-2 border-r text-[11px] text-right font-medium text-emerald-700">
                        {renderCell(row, "capitalRatio")}
                      </td>
                      <td className="px-3 py-2 border-r text-[11px] text-center">
                        {renderCell(row, "coaId")}
                      </td>
                      <td className="px-3 py-2 border-r text-[10px] text-gray-600">
                        {renderCell(row, "address")}
                      </td>
                      <td className="px-3 py-2 border-r text-[11px]">
                        {renderCell(row, "legalRepresentative")}
                      </td>
                      <td className="px-3 py-2 border-r text-[11px]">
                        {renderCell(row, "chiefAccountant")}
                      </td>
                      <td className="px-3 py-2 border-r text-[11px]">
                        {renderCell(row, "lenType")}
                      </td>
                      <td className="px-3 py-2 border-r text-[11px]">
                        {renderCell(row, "accCurCode")}
                      </td>
                      <td className="px-3 py-2 border-r text-[11px]">
                        {renderCell(row, "language")}
                      </td>
                      <td className="px-3 py-2 border-r text-[11px] text-blue-600/80">
                        {renderCell(row, "website")}
                      </td>
                      <td className="px-3 py-2 border-r text-[11px]">
                        {renderCell(row, "phoneNumber")}
                      </td>
                      <td className="px-3 py-2 border-r text-[11px]">
                        {renderCell(row, "status")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-white border-t px-6 py-2 flex items-center justify-between shrink-0">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Showing{" "}
              <span className="text-blue-600">
                {filteredRows.length}
              </span>{" "}
              of{" "}
              <span>{rows.length}</span>{" "}
              records
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}