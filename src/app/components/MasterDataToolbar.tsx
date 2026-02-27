import React from 'react';
import { Search, Plus, Trash2, Edit3, Save, ChevronDown, Grid, Filter, Database, Layout, Square, BarChart3, FileText, Download, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from './ui/dropdown-menu';
import { useLanguage } from '../i18n/LanguageContext';

interface MasterDataToolbarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  onAddRow: () => void;
  onDeleteRows: () => void;
  onSave: () => void;
  selectedCount: number;
  extraActions?: React.ReactNode;
  addRowLabel?: string;
}

export default function MasterDataToolbar({
  searchText,
  onSearchChange,
  onAddRow,
  onDeleteRows,
  onSave,
  selectedCount,
  extraActions,
  addRowLabel,
}: MasterDataToolbarProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white border rounded-t-lg p-2.5 flex items-center shadow-sm gap-2">
      {/* All Dropdown */}
      <Select defaultValue="all">
        <SelectTrigger className="w-[100px] h-9 bg-gray-50 border-gray-200">
          <SelectValue placeholder={t.common.all} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t.common.all}</SelectItem>
        </SelectContent>
      </Select>

      {/* Search Input */}
      <div className="relative w-64">
        <Input
          placeholder={t.common.searchAllColumns}
          className="h-9 pr-10 bg-white border-gray-200"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Go Button */}
      <Button variant="outline" size="sm" className="h-9 px-4 font-medium border-gray-200">
        {t.common.go}
      </Button>

      {/* Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 px-3 gap-1 font-medium border-gray-200">
            {t.common.actions} <ChevronDown className="w-4 h-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem className="gap-2">
            <Grid className="w-4 h-4" /> {t.common.columns}
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Filter className="w-4 h-4" /> {t.common.filter}
          </DropdownMenuItem>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <Database className="w-4 h-4" /> {t.common.data}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>{t.common.import}</DropdownMenuItem>
                <DropdownMenuItem>{t.common.export}</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <Layout className="w-4 h-4" /> Format
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Conditional Formatting</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem className="gap-2">
            <Square className="w-4 h-4" /> Selection
          </DropdownMenuItem>
          
          <DropdownMenuItem className="gap-2">
            <BarChart3 className="w-4 h-4" /> Chart
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <FileText className="w-4 h-4" /> {t.common.report}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Summary Report</DropdownMenuItem>
                <DropdownMenuItem>Detailed Report</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem className="gap-2">
            <Download className="w-4 h-4" /> {t.common.download}
          </DropdownMenuItem>
          
          <DropdownMenuItem className="gap-2 border-t mt-1 pt-1">
            <HelpCircle className="w-4 h-4" /> {t.common.help}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Separator */}
      <div className="w-px h-5 bg-gray-200 mx-0.5" />

      {/* Extra Actions (page-specific) */}
      {extraActions}

      {/* Edit Button */}
      <Button variant="outline" size="sm" className="h-9 px-4 gap-2 font-medium border-gray-200">
        <Edit3 className="w-4 h-4" /> {t.common.edit}
      </Button>

      {/* Save Button */}
      <Button 
        variant="default" 
        size="sm" 
        className="h-9 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
        onClick={onSave}
      >
        {t.common.save}
      </Button>

      {/* Delete Button */}
      <Button 
        variant="outline" 
        size="sm" 
        className="h-9 px-4 gap-2 font-medium border-gray-200 text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={onDeleteRows}
        disabled={selectedCount === 0}
      >
        <Trash2 className="w-4 h-4" /> {t.common.delete}
      </Button>

      {/* Add Row Button */}
      <Button 
        variant="default" 
        size="sm" 
        className="h-9 px-4 gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
        onClick={onAddRow}
      >
        <Plus className="w-4 h-4" /> {addRowLabel || t.common.addRow}
      </Button>
      
    </div>
  );
}