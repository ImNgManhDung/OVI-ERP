import { useState } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { ActionsDropdown } from "./ActionsDropdown";

interface PermissionRow {
  id: number;
  businessCode: string;
  businessName: string;
  employeeId: string;
  employeeName: string;
  permissionType: string;
  setupDate: string;
  postedStatus: boolean;
  activeStatus: boolean;
  postDate: string;
  fiscalYear: string;
  apeId: string;
  currencyCode: string;
  exchangeRateType: string;
  exchangeDate: string;
  exchangeRate: number;
  isEditing?: boolean;
}

// Mock data for LOV
const businessOptions = [
  { id: "BIZ001", name: "Quản lý bán hàng" },
  { id: "BIZ002", name: "Quản lý mua hàng" },
  { id: "BIZ003", name: "Quản lý kho" },
  { id: "BIZ004", name: "Quản lý tài chính" },
  { id: "BIZ005", name: "Quản lý nhân sự" },
  { id: "BIZ006", name: "Quản lý công tác phí" },
];

const employeeOptions = [
  { id: "EMP001", name: "NGUYỄN VĂN A" },
  { id: "EMP002", name: "TRẦN THỊ B" },
  { id: "EMP003", name: "LÊ VĂN C" },
  { id: "EMP004", name: "PHẠM THỊ D" },
  { id: "EMP005", name: "HOÀNG VĂN E" },
];

const permissionTypeOptions = [
  "View Only",
  "View & Edit",
  "Full Access",
  "No Access",
];

const currencyOptions = ["VND", "USD", "EUR", "JPY", "CNY"];

const exchangeRateTypeOptions = [
  "Daily",
  "Monthly",
  "Fixed",
  "Custom",
];

export default function AccountPermission() {
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>(
    [],
  );
  const [permissions, setPermissions] = useState<
    PermissionRow[]
  >([
    {
      id: 1,
      businessCode: "BIZ001",
      businessName: "Quản lý bán hàng",
      employeeId: "EMP001",
      employeeName: "NGUYỄN VĂN A",
      permissionType: "View & Edit",
      setupDate: "01-12-2025",
      postedStatus: true,
      activeStatus: true,
      postDate: "01-12-2025",
      fiscalYear: "2025",
      apeId: "APE001",
      currencyCode: "VND",
      exchangeRateType: "Daily",
      exchangeDate: "01-12-2025",
      exchangeRate: 1.0,
    },
    {
      id: 2,
      businessCode: "BIZ002",
      businessName: "Quản lý mua hàng",
      employeeId: "EMP002",
      employeeName: "TRẦN THỊ B",
      permissionType: "View Only",
      setupDate: "05-12-2025",
      postedStatus: true,
      activeStatus: true,
      postDate: "05-12-2025",
      fiscalYear: "2025",
      apeId: "APE001",
      currencyCode: "VND",
      exchangeRateType: "Daily",
      exchangeDate: "05-12-2025",
      exchangeRate: 1.0,
    },
    {
      id: 3,
      businessCode: "BIZ003",
      businessName: "Quản lý kho",
      employeeId: "EMP003",
      employeeName: "LÊ VĂN C",
      permissionType: "View & Edit",
      setupDate: "10-12-2025",
      postedStatus: false,
      activeStatus: true,
      postDate: "",
      fiscalYear: "2025",
      apeId: "APE002",
      currencyCode: "VND",
      exchangeRateType: "Daily",
      exchangeDate: "10-12-2025",
      exchangeRate: 1.0,
    },
    {
      id: 4,
      businessCode: "BIZ004",
      businessName: "Quản lý tài chính",
      employeeId: "EMP004",
      employeeName: "PHẠM THỊ D",
      permissionType: "View Only",
      setupDate: "15-12-2025",
      postedStatus: true,
      activeStatus: false,
      postDate: "15-12-2025",
      fiscalYear: "2025",
      apeId: "APE001",
      currencyCode: "VND",
      exchangeRateType: "Monthly",
      exchangeDate: "01-12-2025",
      exchangeRate: 1.0,
    },
  ]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id],
    );
  };

  const handleAddRow = () => {
    const newRow: PermissionRow = {
      id: Date.now(),
      businessCode: "",
      businessName: "",
      employeeId: "",
      employeeName: "",
      permissionType: "",
      setupDate: new Date().toLocaleDateString("en-GB"),
      postedStatus: false,
      activeStatus: true,
      postDate: "",
      fiscalYear: "2025",
      apeId: "",
      currencyCode: "VND",
      exchangeRateType: "Daily",
      exchangeDate: new Date().toLocaleDateString("en-GB"),
      exchangeRate: 1.0,
      isEditing: true,
    };
    setPermissions([...permissions, newRow]);
  };

  const handleDeleteRows = () => {
    setPermissions(
      permissions.filter(
        (row) => !selectedRows.includes(row.id),
      ),
    );
    setSelectedRows([]);
  };

  const handleEditRows = () => {
    setPermissions(
      permissions.map((row) =>
        selectedRows.includes(row.id)
          ? { ...row, isEditing: true }
          : row,
      ),
    );
  };

  const handleSave = () => {
    setPermissions(
      permissions.map((row) => ({ ...row, isEditing: false })),
    );
    setSelectedRows([]);
  };

  const updateRow = (id: number, field: string, value: any) => {
    setPermissions(
      permissions.map((row) => {
        if (row.id === id) {
          const updated = { ...row, [field]: value };

          // Auto-fill business name when business code changes
          if (field === "businessCode") {
            const business = businessOptions.find(
              (biz) => biz.id === value,
            );
            updated.businessName = business ? business.name : "";
          }

          // Auto-fill employee name when employee ID changes
          if (field === "employeeId") {
            const employee = employeeOptions.find(
              (emp) => emp.id === value,
            );
            updated.employeeName = employee
              ? employee.name
              : "";
          }

          return updated;
        }
        return row;
      }),
    );
  };

  const filteredPermissions = permissions.filter(
    (row) =>
      searchText === "" ||
      Object.values(row).some((val) =>
        String(val)
          .toLowerCase()
          .includes(searchText.toLowerCase()),
      ),
  );

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          BUSINESS LEDGER PERMISSION MANAGEMENT
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Quản lý phân quyền sổ chi tiết nghiệp vụ cho nhân viên
        </p>
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
          <Button variant="outline" size="sm">
            Go
          </Button>
          <ActionsDropdown showColumns={false} />
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddRow}
          >
            <Plus className="w-4 h-4 mr-1" /> Add Row
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEditRows}
            disabled={selectedRows.length === 0}
          >
            <Edit className="w-4 h-4 mr-1" /> Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDeleteRows}
            disabled={selectedRows.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
        <Button variant="outline" size="sm">
          Reset
        </Button>
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
                <th className="px-3 py-2 text-left text-blue-700">
                  BUSINESS CODE
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  BUSINESS NAME
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  EMPLOYEE ID
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  EMPLOYEE NAME
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  PERMISSION TYPE
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  SETUP DATE
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  POSTED STATUS
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  ACTIVE STATUS
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  POST DATE
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  FISCAL YEAR
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  APE ID
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  CURRENCY CODE
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  EXC RATE TYPE
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  EXCHANGE DATE
                </th>
                <th className="px-3 py-2 text-left text-blue-700">
                  EXCHANGE RATE
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPermissions.length === 0 ? (
                <tr>
                  <td
                    colSpan={16}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 opacity-20" />
                      <span>No data found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPermissions.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-3 py-2">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() =>
                          toggleRowSelection(row.id)
                        }
                      />
                    </td>
                    <td className="px-3 py-2 text-gray-900">
                      {row.isEditing ? (
                        <Select
                          value={row.businessCode}
                          onValueChange={(value) =>
                            updateRow(
                              row.id,
                              "businessCode",
                              value,
                            )
                          }
                        >
                          <SelectTrigger className="w-[120px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {businessOptions.map((option) => (
                              <SelectItem
                                key={option.id}
                                value={option.id}
                              >
                                {option.id}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        row.businessCode
                      )}
                    </td>
                    <td className="px-3 py-2 text-gray-900">
                      {row.businessName}
                    </td>
                    <td className="px-3 py-2 text-gray-900">
                      {row.isEditing ? (
                        <Select
                          value={row.employeeId}
                          onValueChange={(value) =>
                            updateRow(
                              row.id,
                              "employeeId",
                              value,
                            )
                          }
                        >
                          <SelectTrigger className="w-[120px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {employeeOptions.map((option) => (
                              <SelectItem
                                key={option.id}
                                value={option.id}
                              >
                                {option.id}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        row.employeeId
                      )}
                    </td>
                    <td className="px-3 py-2 text-gray-900">
                      {row.employeeName}
                    </td>
                    <td className="px-3 py-2 text-gray-900">
                      {row.isEditing ? (
                        <Select
                          value={row.permissionType}
                          onValueChange={(value) =>
                            updateRow(
                              row.id,
                              "permissionType",
                              value,
                            )
                          }
                        >
                          <SelectTrigger className="w-[120px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {permissionTypeOptions.map(
                              (option) => (
                                <SelectItem
                                  key={option}
                                  value={option}
                                >
                                  {option}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      ) : (
                        row.permissionType
                      )}
                    </td>
                    <td className="px-3 py-2 text-gray-900">
                      {row.isEditing ? (
                        <Input
                          value={row.setupDate}
                          onChange={(e) =>
                            updateRow(
                              row.id,
                              "setupDate",
                              e.target.value,
                            )
                          }
                          className="w-24 h-8"
                        />
                      ) : (
                        row.setupDate
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <Checkbox checked={row.postedStatus} />
                    </td>
                    <td className="px-3 py-2">
                      <Checkbox checked={row.activeStatus} />
                    </td>
                    <td className="px-3 py-2 text-gray-900">
                      {row.postDate || "-"}
                    </td>
                    <td className="px-3 py-2 text-gray-900">
                      {row.fiscalYear}
                    </td>
                    <td className="px-3 py-2 text-gray-900">
                      {row.apeId}
                    </td>
                    <td className="px-3 py-2 text-gray-900">
                      {row.isEditing ? (
                        <Select
                          value={row.currencyCode}
                          onValueChange={(value) =>
                            updateRow(
                              row.id,
                              "currencyCode",
                              value,
                            )
                          }
                        >
                          <SelectTrigger className="w-[120px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {currencyOptions.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        row.currencyCode
                      )}
                    </td>
                    <td className="px-3 py-2 text-gray-900">
                      {row.isEditing ? (
                        <Select
                          value={row.exchangeRateType}
                          onValueChange={(value) =>
                            updateRow(
                              row.id,
                              "exchangeRateType",
                              value,
                            )
                          }
                        >
                          <SelectTrigger className="w-[120px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {exchangeRateTypeOptions.map(
                              (option) => (
                                <SelectItem
                                  key={option}
                                  value={option}
                                >
                                  {option}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      ) : (
                        row.exchangeRateType
                      )}
                    </td>
                    <td className="px-3 py-2 text-gray-900">
                      {row.isEditing ? (
                        <Input
                          value={row.exchangeDate}
                          onChange={(e) =>
                            updateRow(
                              row.id,
                              "exchangeDate",
                              e.target.value,
                            )
                          }
                          className="w-24 h-8"
                        />
                      ) : (
                        row.exchangeDate
                      )}
                    </td>
                    <td className="px-3 py-2 text-gray-900 text-right">
                      {row.isEditing ? (
                        <Input
                          value={row.exchangeRate}
                          onChange={(e) =>
                            updateRow(
                              row.id,
                              "exchangeRate",
                              parseFloat(e.target.value),
                            )
                          }
                          className="w-24 h-8"
                        />
                      ) : (
                        row.exchangeRate.toFixed(2)
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-2 border-t bg-gray-50 text-sm text-right text-gray-600">
          Total: {filteredPermissions.length}
        </div>
      </div>
    </div>
  );
}