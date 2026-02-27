import { X } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Responsibility {
  id: string;
  code: string;
  name: string;
  cceName: string;
  companyName: string;
  ceoName: string;
  color: string;
}

interface ResponsibilityModalProps {
  open: boolean;
  onClose: () => void;
  currentResponsibility: string;
  onSelectResponsibility: (id: string) => void;
}

const responsibilities: Responsibility[] = [
  {
    id: 'ADM',
    code: 'ADM',
    name: 'Quản trị hệ thống',
    cceName: 'CCE Name',
    companyName: 'Taseco Land',
    ceoName: 'Cao Hương Giang',
    color: 'bg-blue-500',
  },
  {
    id: 'FCM',
    code: 'FCM',
    name: 'Finance & Costing Management',
    cceName: 'CCE Name',
    companyName: 'Taseco Land',
    ceoName: 'Cao Hương Giang',
    color: 'bg-blue-500',
  },
  {
    id: 'PRM',
    code: 'PRM',
    name: 'Quản lý mua hàng',
    cceName: 'CCE Name',
    companyName: 'Taseco Land',
    ceoName: 'Cao Hương Giang',
    color: 'bg-blue-500',
  },
  {
    id: 'WMM',
    code: 'WMM',
    name: 'Quản lý vật tư và kho',
    cceName: 'CCE Name',
    companyName: 'Taseco Land',
    ceoName: 'Cao Hương Giang',
    color: 'bg-blue-500',
  },
  {
    id: 'TEM',
    code: 'TEM',
    name: 'Quản lý công tác phí',
    cceName: 'CCE Name',
    companyName: 'Taseco Land',
    ceoName: 'Cao Hương Giang',
    color: 'bg-red-500',
  },
];

export default function ResponsibilityModal({
  open,
  onClose,
  currentResponsibility,
  onSelectResponsibility,
}: ResponsibilityModalProps) {
  if (!open) return null;

  const handleSelectResponsibility = (id: string) => {
    onSelectResponsibility(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-[900px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Responsibility</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Order By */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order By
            </label>
            <Select defaultValue="resp-descriptions">
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="resp-descriptions">Resp. Descriptions</SelectItem>
                <SelectItem value="resp-code">Resp. Code</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Responsibility Cards Grid */}
          <div className="grid grid-cols-4 gap-4">
            {responsibilities.map((resp) => (
              <button
                key={resp.id}
                onClick={() => handleSelectResponsibility(resp.id)}
                className={`border rounded-lg p-4 text-left hover:shadow-md transition-shadow ${
                  currentResponsibility === resp.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Icon and Code */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-full ${resp.color} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {resp.code.substring(0, 2)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-800">
                      {resp.code} - {resp.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{resp.cceName}</p>
                  </div>
                  <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {resp.id === 'FCM' ? '15326' : resp.id === 'PRM' ? '6831' : resp.id === 'WMM' ? '6840' : resp.id === 'ADM' ? '6839' : '1234'}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1 text-xs text-gray-600">
                  <p>
                    <span className="font-medium">Company Name:</span> {resp.companyName}
                  </p>
                  <p>
                    <span className="font-medium">CEO:</span> {resp.ceoName}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
