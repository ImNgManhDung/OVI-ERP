import fs from 'fs';
import path from 'path';

const COMPONENTS_DIR = '/Users/keith/Downloads/FIGMA/src/app/components';

// Config for each component: file, title, breadcrumb, statusField, typeField, typeOptions
const configs = [
    {
        file: 'TransactionTypeList.tsx',
        title: 'Transaction Type Management',
        breadcrumbs: ['Home', 'Master Data', 'Transaction Type'],
        statusField: null,
        typeField: {
            field: 'ttyClass', label: 'Class', options: [
                { value: 'all', label: 'All Classes' },
                { value: 'AR', label: 'AR - Receivable' },
                { value: 'AP', label: 'AP - Payable' },
                { value: 'CA', label: 'CA - Cash' },
                { value: 'BA', label: 'BA - Bank' },
                { value: 'GL', label: 'GL - General' },
            ]
        },
    },
    {
        file: 'DocsTransMappingList.tsx',
        title: 'Docs Trans Mapping',
        breadcrumbs: ['Home', 'Master Data', 'Docs Trans Mapping'],
        statusField: null,
        typeField: {
            field: 'ttyCategory', label: 'Category', options: [
                { value: 'all', label: 'All Categories' },
                { value: 'AR', label: 'AR' },
                { value: 'AP', label: 'AP' },
                { value: 'CA', label: 'CA' },
                { value: 'BA', label: 'BA' },
                { value: 'GL', label: 'GL' },
            ]
        },
    },
    {
        file: 'CostCenterList.tsx',
        title: 'Cost Center Management',
        breadcrumbs: ['Home', 'Master Data', 'Cost Center'],
        statusField: 'status',
        typeField: {
            field: 'cceType', label: 'Type', options: [
                { value: 'all', label: 'All Types' },
                { value: 'Detail', label: 'Detail' },
                { value: 'Summary', label: 'Summary' },
                { value: 'Heading', label: 'Heading' },
            ]
        },
    },
    {
        file: 'CostElementList.tsx',
        title: 'Cost Element Management',
        breadcrumbs: ['Home', 'Master Data', 'Cost Element'],
        statusField: 'status',
        typeField: {
            field: 'celType', label: 'Type', options: [
                { value: 'all', label: 'All Types' },
                { value: 'Primary', label: 'Primary' },
                { value: 'Secondary', label: 'Secondary' },
            ]
        },
    },
    {
        file: 'ProfitCenterList.tsx',
        title: 'Profit Center Management',
        breadcrumbs: ['Home', 'Master Data', 'Profit Center'],
        statusField: 'status',
        typeField: {
            field: 'pceType', label: 'Type', options: [
                { value: 'all', label: 'All Types' },
                { value: 'Detail', label: 'Detail' },
                { value: 'Summary', label: 'Summary' },
                { value: 'Heading', label: 'Heading' },
            ]
        },
    },
    {
        file: 'ExtensionAnalysisList.tsx',
        title: 'Extension Analysis Management',
        breadcrumbs: ['Home', 'Master Data', 'Extension Analysis'],
        statusField: 'status',
        typeField: {
            field: 'eanType', label: 'Type', options: [
                { value: 'all', label: 'All Types' },
                { value: 'Detail', label: 'Detail' },
                { value: 'Summary', label: 'Summary' },
            ]
        },
    },
    {
        file: 'ProjectAssignmentList.tsx',
        title: 'Project Assignment Management',
        breadcrumbs: ['Home', 'Master Data', 'Project Assignment'],
        statusField: 'status',
        typeField: {
            field: 'pasType', label: 'Type', options: [
                { value: 'all', label: 'All Types' },
                { value: 'Project', label: 'Project' },
                { value: 'Phase', label: 'Phase' },
                { value: 'Task', label: 'Task' },
            ]
        },
    },
    {
        file: 'ProductCostAssignmentList.tsx',
        title: 'Product Cost Assignment Management',
        breadcrumbs: ['Home', 'Master Data', 'Product Cost Assignment'],
        statusField: 'status',
        typeField: {
            field: 'pcaType', label: 'Type', options: [
                { value: 'all', label: 'All Types' },
                { value: 'Material', label: 'Material' },
                { value: 'ProductionOrder', label: 'Production Order' },
            ]
        },
    },
    {
        file: 'ChartOfAccountList.tsx',
        title: 'Chart of Account',
        breadcrumbs: ['Home', 'Master Data', 'Chart of Account'],
        statusField: 'status',
        typeField: null,
    },
    {
        file: 'AccountAccountingSetupList.tsx',
        title: 'Account Accounting Setup',
        breadcrumbs: ['Home', 'Master Data', 'Account Setup'],
        statusField: null,
        typeField: null,
    },
    {
        file: 'AccountDeterminationRuleList.tsx',
        title: 'Account Determination Rules',
        breadcrumbs: ['Home', 'Master Data', 'Account Determination Rules'],
        statusField: 'isActive',
        typeField: null,
    },
];

for (const config of configs) {
    const filePath = path.join(COMPONENTS_DIR, config.file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if already has FilterPanel
    if (content.includes('FilterPanel')) {
        console.log(`SKIP: ${config.file} already has FilterPanel`);
        continue;
    }

    // 1. Add FilterPanel import
    content = content.replace(
        "import { Search } from 'lucide-react';",
        "import { Search } from 'lucide-react';\nimport { FilterPanel } from './FilterPanel';"
    );

    // 2. Add state variables for filters
    const hasStatus = !!config.statusField;
    const hasType = !!config.typeField;

    // Find the function body start and add states
    if (hasStatus || hasType) {
        const stateInsert = [];
        if (hasStatus) stateInsert.push(`  const [selectedStatus, setSelectedStatus] = useState('all');`);
        if (hasType) stateInsert.push(`  const [selectedType, setSelectedType] = useState('all');`);

        // Insert after searchText state
        content = content.replace(
            /const \[selectedRows, setSelectedRows\] = useState<number\[\]>\(\[\]\);/,
            `const [selectedRows, setSelectedRows] = useState<number[]>([]);\n${stateInsert.join('\n')}`
        );
    }

    // 3. Update filter logic to include status/type
    if (hasStatus || hasType) {
        // Replace simple filter with enhanced filter
        const filterMatches = content.match(/const filteredData = data\.filter\(row\s*=>\s*\n?\s*searchText === '' \|\|\s*\n?\s*Object\.values\(row\)\.some\(val\s*=>\s*\n?\s*String\(val\)\.toLowerCase\(\)\.includes\(searchText\.toLowerCase\(\)\)\s*\n?\s*\)\s*\n?\s*\);/);

        if (filterMatches) {
            let newFilter = `const filteredData = data.filter(row => {\n    const matchesSearch = searchText === '' || Object.values(row).some(val =>\n      String(val).toLowerCase().includes(searchText.toLowerCase())\n    );`;
            if (hasStatus) {
                newFilter += `\n    const matchesStatus = selectedStatus === 'all' || row.${config.statusField} === selectedStatus;`;
            }
            if (hasType) {
                newFilter += `\n    const matchesType = selectedType === 'all' || row.${config.typeField.field} === selectedType;`;
            }
            newFilter += `\n    return matchesSearch`;
            if (hasStatus) newFilter += ` && matchesStatus`;
            if (hasType) newFilter += ` && matchesType`;
            newFilter += `;\n  });`;

            content = content.replace(filterMatches[0], newFilter);
        }

        // Also handle coaData variant
        const filterMatches2 = content.match(/const filteredData = coaData\.filter\(row\s*=>\s*\n?\s*searchText === '' \|\|\s*\n?\s*Object\.values\(row\)\.some\(val\s*=>\s*\n?\s*String\(val\)\.toLowerCase\(\)\.includes\(searchText\.toLowerCase\(\)\)\s*\n?\s*\)\s*\n?\s*\);/);

        if (filterMatches2) {
            let newFilter = `const filteredData = coaData.filter(row => {\n    const matchesSearch = searchText === '' || Object.values(row).some(val =>\n      String(val).toLowerCase().includes(searchText.toLowerCase())\n    );`;
            if (hasStatus) {
                newFilter += `\n    const matchesStatus = selectedStatus === 'all' || row.${config.statusField} === selectedStatus;`;
            }
            if (hasType) {
                newFilter += `\n    const matchesType = selectedType === 'all' || row.${config.typeField.field} === selectedType;`;
            }
            newFilter += `\n    return matchesSearch`;
            if (hasStatus) newFilter += ` && matchesStatus`;
            if (hasType) newFilter += ` && matchesType`;
            newFilter += `;\n  });`;

            content = content.replace(filterMatches2[0], newFilter);
        }
    }

    // 4. Wrap existing return with FilterPanel layout
    // Build FilterPanel JSX
    let filterPanelJSX = `<FilterPanel\n        searchValue={searchText}\n        onSearchChange={setSearchText}`;

    if (hasStatus) {
        const statusOpts = config.statusField === 'isActive'
            ? `[\n          { value: 'all', label: 'All Status' },\n          { value: 'Y', label: 'Active' },\n          { value: 'N', label: 'Inactive' },\n        ]`
            : `[\n          { value: 'all', label: 'All Status' },\n          { value: 'Y', label: 'Active' },\n          { value: 'N', label: 'Inactive' },\n          { value: 'Yes', label: 'Active' },\n          { value: 'No', label: 'Inactive' },\n        ]`;
        filterPanelJSX += `\n        showStatus={true}\n        statusOptions={${statusOpts}}\n        selectedStatus={selectedStatus}\n        onStatusChange={setSelectedStatus}`;
    } else {
        filterPanelJSX += `\n        showStatus={false}`;
    }

    if (hasType) {
        const typeOptsStr = JSON.stringify(config.typeField.options).replace(/"/g, "'").replace(/\[/g, '[\n          ').replace(/},{/g, '},\n          {').replace(/\]/g, ',\n        ]');
        filterPanelJSX += `\n        showType={true}\n        typeOptions={${typeOptsStr}}\n        selectedType={selectedType}\n        onTypeChange={setSelectedType}`;
    } else {
        filterPanelJSX += `\n        showType={false}`;
    }

    filterPanelJSX += `\n      />`;

    // Now wrap the return JSX
    // Find the return statement and wrap it
    // Pattern: return ( <div className="erp-page"> or return ( <div className="p-6">
    const returnMatch = content.match(/return\s*\(\s*\n?\s*<div className="(erp-page|p-6|flex h-screen)">/);
    if (returnMatch) {
        const oldClassName = returnMatch[1];

        // Build breadcrumb JSX
        const [bc1, bc2, bc3] = config.breadcrumbs;
        const breadcrumbJSX = `<nav className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-gray-400">${bc1}</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-gray-400">${bc2}</span>
            <span className="text-xs text-gray-300">/</span>
            <span className="text-xs text-blue-600">${bc3}</span>
          </nav>`;

        // Replace return start
        content = content.replace(
            `return (\n    <div className="${oldClassName}">`,
            `return (\n    <div className="flex h-screen bg-gray-50">\n      {/* Filter Panel */}\n      ${filterPanelJSX}\n\n      {/* Main Content */}\n      <div className="flex-1 flex flex-col overflow-hidden">`
        );

        // Replace the page header section
        // Try different header patterns
        // Pattern 1: erp-page-header
        content = content.replace(
            /\{\/\* Page Header \*\/\}\s*<div className="erp-page-header">\s*<div>\s*<h1>[^<]*<\/h1>\s*<nav[^]*?<\/nav>\s*<\/div>\s*<\/div>/,
            `{/* Page Header */}\n        <div className="bg-white border-b px-6 py-4">\n          <h1 className="text-xl font-semibold text-gray-800">${config.title}</h1>\n          ${breadcrumbJSX}\n        </div>`
        );

        // Pattern 2: mb-4 header
        content = content.replace(
            /<div className="mb-4">\s*<h1[^>]*>[^<]*<\/h1>\s*<p[^>]*>[^<]*<\/p>\s*<\/div>/,
            `{/* Page Header */}\n        <div className="bg-white border-b px-6 py-4">\n          <h1 className="text-xl font-semibold text-gray-800">${config.title}</h1>\n          ${breadcrumbJSX}\n        </div>`
        );

        // Replace table container
        content = content.replace(
            '<div className="bg-white border border-t-0 rounded-b-lg overflow-hidden shadow-sm">',
            '<div className="flex-1 overflow-hidden bg-white mx-6 mb-6 border rounded-lg shadow-sm">'
        );

        // Fix footer
        content = content.replace(
            /(<div className="px-4 py-3 border-t bg-gray-50[^"]*"[^>]*>)\s*([\s\S]*?)(<\/div>)\s*<\/div>\s*<\/div>\s*\);/,
            (match, footerOpen, footerContent, footerClose) => {
                return `<div className="bg-white border-t px-6 py-3 flex items-center justify-between">\n          <div className="text-sm text-gray-600">\n            Showing <span className="font-semibold">{filteredData.length}</span> records\n          </div>\n        </div>\n      </div>\n    </div>\n  );`
            }
        );
    }

    fs.writeFileSync(filePath, content);
    console.log(`DONE: ${config.file}`);
}

console.log('\nAll files processed!');
