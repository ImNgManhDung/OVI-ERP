import { useState } from 'react';
import { X, Plus, Trash2, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface CreateApprovalWorkflowProps {
  onClose: () => void;
}

interface ApprovalStep {
  id: number;
  step: number;
  approverId: string;
  approverName: string;
  position: string;
  approvalDate: string;
  comments: string;
}

const POSITIONS = [
  'Staff',
  'Team Leader',
  'Manager',
  'Senior Manager',
  'Director',
  'Vice President',
  'President',
  'CEO',
];

const MOCK_APPROVERS = [
  { id: 'EMP001', name: 'Nguyễn Văn A', position: 'Team Leader' },
  { id: 'EMP002', name: 'Trần Thị B', position: 'Manager' },
  { id: 'EMP003', name: 'Lê Văn C', position: 'Senior Manager' },
  { id: 'EMP004', name: 'Phạm Thị D', position: 'Director' },
  { id: 'EMP005', name: 'Hoàng Văn E', position: 'Vice President' },
  { id: 'EMP006', name: 'Vũ Thị F', position: 'CEO' },
];

export default function CreateApprovalWorkflow({ onClose }: CreateApprovalWorkflowProps) {
  const [workflowId, setWorkflowId] = useState('WF-005');
  const [workflowName, setWorkflowName] = useState('');
  const [description, setDescription] = useState('');

  const [approvalSteps, setApprovalSteps] = useState<ApprovalStep[]>([
    {
      id: 1,
      step: 1,
      approverId: 'EMP001',
      approverName: 'Nguyễn Văn A',
      position: 'Team Leader',
      approvalDate: '',
      comments: '',
    },
    {
      id: 2,
      step: 2,
      approverId: 'EMP002',
      approverName: 'Trần Thị B',
      position: 'Manager',
      approvalDate: '',
      comments: '',
    },
    {
      id: 3,
      step: 3,
      approverId: 'EMP004',
      approverName: 'Phạm Thị D',
      position: 'Director',
      approvalDate: '',
      comments: '',
    },
  ]);

  const [selectedSteps, setSelectedSteps] = useState<number[]>([]);

  const handleAddStep = () => {
    const newStep: ApprovalStep = {
      id: approvalSteps.length + 1,
      step: approvalSteps.length + 1,
      approverId: '',
      approverName: '',
      position: '',
      approvalDate: '',
      comments: '',
    };
    setApprovalSteps([...approvalSteps, newStep]);
  };

  const handleDeleteSteps = () => {
    const remainingSteps = approvalSteps.filter(step => !selectedSteps.includes(step.id));
    // Re-order step numbers
    const reorderedSteps = remainingSteps.map((step, index) => ({
      ...step,
      step: index + 1,
    }));
    setApprovalSteps(reorderedSteps);
    setSelectedSteps([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSteps(approvalSteps.map(step => step.id));
    } else {
      setSelectedSteps([]);
    }
  };

  const handleSelectStep = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedSteps([...selectedSteps, id]);
    } else {
      setSelectedSteps(selectedSteps.filter(stepId => stepId !== id));
    }
  };

  const updateApprovalStep = (id: number, field: keyof ApprovalStep, value: any) => {
    setApprovalSteps(approvalSteps.map(step => {
      if (step.id === id) {
        const updatedStep = { ...step, [field]: value };
        
        // Auto-fill name and position when approver ID changes
        if (field === 'approverId') {
          const approver = MOCK_APPROVERS.find(a => a.id === value);
          if (approver) {
            updatedStep.approverName = approver.name;
            updatedStep.position = approver.position;
          }
        }
        
        return updatedStep;
      }
      return step;
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto py-8">
      <div className="bg-white rounded-lg shadow-xl w-[1400px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-blue-600 text-white rounded-t-lg">
          <h2 className="text-lg font-semibold">CREATE APPROVAL WORKFLOW</h2>
          <button onClick={onClose} className="hover:bg-blue-700 rounded p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Main Info Section */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-4 pb-2 border-b">Main Info</h3>
            <div className="grid grid-cols-12 gap-4">
              {/* Workflow ID */}
              <div className="col-span-4">
                <Label className="text-sm mb-1 block">Workflow ID</Label>
                <Input
                  value={workflowId}
                  onChange={(e) => setWorkflowId(e.target.value)}
                  placeholder="Auto-generated"
                  disabled
                  className="bg-gray-100"
                />
              </div>

              {/* Workflow Name */}
              <div className="col-span-4">
                <Label className="text-sm mb-1 block">Workflow Name <span className="text-red-500">*</span></Label>
                <Input
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  placeholder="Enter workflow name"
                />
              </div>

              {/* Empty column */}
              <div className="col-span-4"></div>

              {/* Description */}
              <div className="col-span-12">
                <Label className="text-sm mb-1 block">Description</Label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter workflow description"
                  className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
              <h3 className="text-base font-semibold">Approval Steps</h3>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="default"
                  onClick={handleAddStep}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Step
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={handleDeleteSteps}
                  disabled={selectedSteps.length === 0}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-3 py-2 text-left w-10">
                        <Checkbox
                          checked={selectedSteps.length === approvalSteps.length && approvalSteps.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 w-20">Step</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 w-32">Approver ID</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Approver Name</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Position</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 w-36">Approval Date</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalSteps.map((step) => (
                      <tr key={step.id} className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <Checkbox
                            checked={selectedSteps.includes(step.id)}
                            onCheckedChange={(checked) => handleSelectStep(step.id, checked as boolean)}
                          />
                        </td>
                        <td className="px-3 py-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-medium text-xs">
                            {step.step}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={step.approverId}
                            onValueChange={(value) => updateApprovalStep(step.id, 'approverId', value)}
                          >
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {MOCK_APPROVERS.map((approver) => (
                                <SelectItem key={approver.id} value={approver.id}>
                                  {approver.id}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={step.approverName}
                            onChange={(e) => updateApprovalStep(step.id, 'approverName', e.target.value)}
                            placeholder="Approver name"
                            className="h-9 text-sm"
                            disabled
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={step.position}
                            onValueChange={(value) => updateApprovalStep(step.id, 'position', value)}
                          >
                            <SelectTrigger className="h-9 text-sm" disabled>
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              {POSITIONS.map((pos) => (
                                <SelectItem key={pos} value={pos}>
                                  {pos}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <div className="relative">
                            <Input
                              type="date"
                              value={step.approvalDate}
                              onChange={(e) => updateApprovalStep(step.id, 'approvalDate', e.target.value)}
                              className="h-9 text-sm"
                            />
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            value={step.comments}
                            onChange={(e) => updateApprovalStep(step.id, 'comments', e.target.value)}
                            placeholder="Comments"
                            className="h-9 text-sm"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Info note */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              <strong>Note:</strong> Approval steps are executed sequentially. Higher step numbers indicate higher authority levels.
              The workflow will require approval from all steps in order.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default">
            Save Workflow
          </Button>
        </div>
      </div>
    </div>
  );
}
