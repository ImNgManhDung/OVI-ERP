// Updated: Asset modules with full database fields
import { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import AssetDepreciationList from './components/AssetDepreciationList';
import AssetList from './components/AssetList';
import AssetTransactionList from './components/AssetTransactionList';
import AssetSourcesList from './components/AssetSourcesList';
import { Toaster } from './components/ui/sonner';
import Dashboard from './components/Dashboard';
import TEMDashboard from './components/TEMDashboard';
import WMMDashboard from './components/WMMDashboard';
import WMMSidebar from './components/WMMSidebar';
import InvoiceList from './components/InvoiceList';
import CreateInvoice from './components/CreateInvoice';
import CreatePurchaseInvoice from './components/CreatePurchaseInvoice';
import CashReceiptList from './components/CashReceiptList';
import CreateCashReceipt from './components/CreateCashReceipt';
import BankReceiptList from './components/BankReceiptList';
import CreateBankReceipt from './components/CreateBankReceipt';
import CashPaymentList from './components/CashPaymentList';
import CreateCashPayment from './components/CreateCashPayment';
import PaymentRequestList from './components/PaymentRequestList';
import CreatePaymentRequest from './components/CreatePaymentRequest';
import AccountPermission from './components/AccountPermission';
import AccountLedger from './components/AccountLedger';
import TravelPolicy from './components/TravelPolicy';
import AccountAccountingSetupList from './components/AccountAccountingSetupList';
import DocTypeList from './components/DocTypeList';
import TransactionTypeList from './components/TransactionTypeList';
import DocsTransMappingList from './components/DocsTransMappingList';
import AccountDeterminationRuleList from './components/AccountDeterminationRuleList';
import ChartOfAccountList from './components/ChartOfAccountList';
import LegalEntityList from './components/LegalEntityList';
import PaymentTermList from './components/PaymentTermList';
import CreatePaymentTerm from './components/CreatePaymentTerm';
import ApprovalWorkflowList from './components/ApprovalWorkflowList';
import CreateApprovalWorkflow from './components/CreateApprovalWorkflow';
import CostCenterList from './components/CostCenterList';
import CostElementList from './components/CostElementList';
import ProfitCenterList from './components/ProfitCenterList';
import ProjectAssignmentList from './components/ProjectAssignmentList';
import ProductCostAssignmentList from './components/ProductCostAssignmentList';
import ExtensionAnalysisList from './components/ExtensionAnalysisList';
import CashFlow from './components/CashFlow';
import UniversalLedgerList from './components/UniversalLedgerList';
import CreateUniversalLedger from './components/CreateUniversalLedger';
import GLJournalList from './components/GLJournalList';
import GLJournalForm from './components/GLJournalForm';
import DeptClearingPopup from './components/DeptClearingPopup';
import AssetComponentsList from './components/AssetComponentsList';
import AssetFundingSourcesList from './components/AssetFundingSourcesList';
import CreateAssetFundingSource from './components/CreateAssetFundingSource';
import AssetCategoryList from './components/AssetCategoryList';
import CreateAssetCategory from './components/CreateAssetCategory';
import AssetBookList from './components/AssetBookList';
import CreateAssetBook from './components/CreateAssetBook';
import CreateAssetDepreciation from './components/CreateAssetDepreciation';
import CreateAssetTransaction from './components/CreateAssetTransaction';
import AdvanceRequestList from './components/AdvanceRequestList';
import AdvanceSettlementList from './components/AdvanceSettlementList';
import ExpensePolicy from './components/ExpensePolicy';
import TravelExpenditureRequisition from './components/TravelExpenditureRequisition';
import ExpenseDeclarationList from './components/ExpenseDeclarationList';
import Sidebar from './components/Sidebar';
import TEMSidebar from './components/TEMSidebar';
import Header from './components/Header';
import ResponsibilityModal from './components/ResponsibilityModal';
import GoodsReceiptRequirementList from './components/GoodsReceiptRequirementList';
import CreateGoodsReceiptRequirement from './components/CreateGoodsReceiptRequirement';
import GoodsIssuesRequirementList from './components/GoodsIssuesRequirementList';
import CreateGoodsIssuesRequirement from './components/CreateGoodsIssuesRequirement';
import FixedAssetList from './components/FixedAssetList';
import CreateFixedAsset from './components/CreateFixedAsset';
import CreateGoodIssue from './components/CreateGoodIssue';
import GoodIssueList from './components/GoodIssueList';
import CreateGoodReceipt from './components/CreateGoodReceipt';
import GoodReceiptList from './components/GoodReceiptList';

// ── Cost Allocation imports ──────────────────────────────────────────────────
import PendingAllocationList from './components/PendingAllocationList';
import AllocationDeclarationList from './components/AllocationDeclarationList';
import AllocationRuleList from './components/AllocationRuleList';
import CreateAllocationRule from './components/CreateAllocationRule';
import AllocationRunScreen from './components/AllocationRunScreen';
import AllocationHistoryList from './components/AllocationHistoryList';
import AllocationReverseScreen from './components/AllocationReverseScreen';

type ViewType =
  | 'dashboard'
  | 'list-sales'
  | 'create-sales'
  | 'list-purchase'
  | 'create-purchase'
  | 'list-cash-receipt'
  | 'create-cash-receipt'
  | 'list-bank-receipt'
  | 'create-bank-receipt'
  | 'list-cash-payment'
  | 'create-cash-payment'
  | 'list-payment-request'
  | 'create-payment-request'
  | 'account-permission'
  | 'account-ledger'
  | 'expense-policy'
  | 'account-accounting-setup'
  | 'doc-type'
  | 'transaction-type'
  | 'docs-trans-mapping'
  | 'acc-det-rule'
  | 'chart-of-account'
  | 'ledger-entity'
  | 'list-payment-term'
  | 'create-payment-term'
  | 'list-approval-workflow'
  | 'create-approval-workflow'
  | 'cost-center'
  | 'cost-element'
  | 'profit-center'
  | 'project-assignments'
  | 'product-cost-assignments'
  | 'extension-analysis'
  | 'cash-flow'
  | 'tem-dashboard'
  | 'advance-request'
  | 'advance-settlement'
  | 'travel-expenditure-requisition'
  | 'expense-declaration'
  | 'travel-expenditure-approval'
  | 'travel-expenditure-management'
  | 'list-universal-ledger'
  | 'create-universal-ledger'
  | 'list-gl-journal'
  | 'create-gl-journal'
  | 'dept-clearing'
  | 'assets'
  | 'list-fixed-assets'
  | 'create-fixed-asset'
  | 'asset-transactions'
  | 'asset-sources'
  | 'asset-components'
  | 'asset-funding-sources'
  | 'create-asset-funding-source'
  | 'list-asset-category'
  | 'create-asset-category'
  | 'asset-books'
  | 'create-asset-book'
  | 'asset-depreciations'
  | 'create-asset-depreciation'
  | 'create-asset-transaction'
  // WMM Views
  | 'wmm-dashboard'
  | 'wmm-material-list'
  | 'wmm-material-category'
  | 'wmm-unit-of-measure'
  | 'wmm-warehouse-location'
  | 'wmm-goods-receipt-req'
  | 'wmm-create-goods-receipt-req'
  | 'wmm-goods-issues-req'
  | 'wmm-create-goods-issues-req'
  | 'wmm-material-req-processing'
  | 'wmm-goods-receipt'
  | 'wmm-create-good-receipt'
  | 'wmm-good-issue'
  | 'wmm-create-good-issue'
  | 'wmm-goods-receipt-adjust'
  | 'wmm-goods-issues-adjust'
  | 'wmm-goods-receipt-approval'
  | 'wmm-good-issue-approval'
  // ── Cost Allocation Views ──
  | 'pending-allocation'
  | 'allocation-declaration'
  | 'allocation-rules'
  | 'create-allocation-rule'
  | 'run-allocation'
  | 'allocation-history'
  | 'reverse-allocation';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentResponsibility, setCurrentResponsibility] = useState('FCM');
  const [showResponsibilityModal, setShowResponsibilityModal] = useState(false);

  const handleNavigate = (view: string) => {
    setCurrentView(view as ViewType);
  };

  const handleResponsibilityChange = (responsibilityId: string) => {
    setCurrentResponsibility(responsibilityId);

    // Navigate to default view for each responsibility
    if (responsibilityId === 'FCM') {
      setCurrentView('dashboard');
    } else if (responsibilityId === 'TEM') {
      setCurrentView('tem-dashboard');
    } else if (responsibilityId === 'WMM') {
      setCurrentView('wmm-dashboard');
    }
  };

  const handleModuleChange = (moduleId: string) => {
    if (moduleId === 'travel-expense') {
      handleResponsibilityChange('TEM');
    } else if (moduleId === 'warehouse-material') {
      handleResponsibilityChange('WMM');
    } else if (moduleId === 'finance-costing') {
      handleResponsibilityChange('FCM');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      // FCM Views
      case 'dashboard':
        return <Dashboard />;
      case 'list-sales':
        return (
          <InvoiceList
            onCreateClick={() => setCurrentView('create-sales')}
            type="sales"
          />
        );
      case 'create-sales':
        return <CreateInvoice onClose={() => setCurrentView('list-sales')} />;
      case 'list-purchase':
        return (
          <InvoiceList
            onCreateClick={() => setCurrentView('create-purchase')}
            type="purchase"
          />
        );
      case 'create-purchase':
        return <CreatePurchaseInvoice onClose={() => setCurrentView('list-purchase')} />;
      case 'list-cash-receipt':
        return <CashReceiptList
          onCreateClick={() => setCurrentView('create-cash-receipt')}
        />;
      case 'create-cash-receipt':
        return <CreateCashReceipt onClose={() => setCurrentView('list-cash-receipt')} />;
      case 'list-bank-receipt':
        return <BankReceiptList
          onCreateClick={() => setCurrentView('create-bank-receipt')}
        />;
      case 'create-bank-receipt':
        return <CreateBankReceipt onClose={() => setCurrentView('list-bank-receipt')} />;
      case 'list-cash-payment':
        return <CashPaymentList onCreateClick={() => setCurrentView('create-cash-payment')} />;
      case 'create-cash-payment':
        return <CreateCashPayment onClose={() => setCurrentView('list-cash-payment')} />;
      case 'list-payment-request':
        return <PaymentRequestList onCreateClick={() => setCurrentView('create-payment-request')} />;
      case 'create-payment-request':
        return <CreatePaymentRequest onClose={() => setCurrentView('list-payment-request')} />;
      case 'account-permission':
        return <AccountPermission />;
      case 'account-ledger':
        return <AccountLedger />;
      case 'expense-policy':
        return <TravelPolicy />;
      case 'account-accounting-setup':
        return <AccountAccountingSetupList onBack={() => setCurrentView('dashboard')} />;
      case 'doc-type':
        return <DocTypeList />;
      case 'transaction-type':
        return <TransactionTypeList />;
      case 'docs-trans-mapping':
        return <DocsTransMappingList />;
      case 'acc-det-rule':
        return <AccountDeterminationRuleList />;
      case 'chart-of-account':
        return <ChartOfAccountList />;
      case 'ledger-entity':
        return <LegalEntityList />;
      case 'list-payment-term':
        return <PaymentTermList onCreateClick={() => setCurrentView('create-payment-term')} />;
      case 'create-payment-term':
        return <CreatePaymentTerm onClose={() => setCurrentView('list-payment-term')} />;
      case 'list-approval-workflow':
        return <ApprovalWorkflowList onCreateClick={() => setCurrentView('create-approval-workflow')} />;
      case 'create-approval-workflow':
        return <CreateApprovalWorkflow onClose={() => setCurrentView('list-approval-workflow')} />;
      case 'cost-center':
        return <CostCenterList />;
      case 'cost-element':
        return <CostElementList />;
      case 'profit-center':
        return <ProfitCenterList />;
      case 'project-assignments':
        return <ProjectAssignmentList />;
      case 'product-cost-assignments':
        return <ProductCostAssignmentList />;
      case 'extension-analysis':
        return <ExtensionAnalysisList />;
      case 'cash-flow':
        return <CashFlow />;
      case 'list-universal-ledger':
        return <UniversalLedgerList onCreateClick={() => setCurrentView('create-universal-ledger')} />;
      case 'create-universal-ledger':
        return <CreateUniversalLedger onClose={() => setCurrentView('list-universal-ledger')} />;
      case 'list-gl-journal':
        return <GLJournalList onCreateClick={() => setCurrentView('create-gl-journal')} />;
      case 'create-gl-journal':
        return <GLJournalForm onClose={() => setCurrentView('list-gl-journal')} />;
      case 'dept-clearing':
        return (
          <div className="p-6">
            <DeptClearingPopup
              type="receipt"
              onClose={() => setCurrentView('dashboard')}
            />
          </div>
        );
      case 'assets':
        return <AssetList />;
      case 'list-fixed-assets':
        return <FixedAssetList onCreateClick={() => setCurrentView('create-fixed-asset')} />;
      case 'create-fixed-asset':
        return <CreateFixedAsset onClose={() => setCurrentView('list-fixed-assets')} />;
      case 'asset-transactions':
        return <AssetTransactionList onCreateClick={() => setCurrentView('create-asset-transaction')} />;
      case 'asset-sources':
        return <AssetSourcesList />;
      case 'asset-components':
        return <AssetComponentsList />;
      case 'asset-funding-sources':
        return <AssetFundingSourcesList onCreateClick={() => setCurrentView('create-asset-funding-source')} />;
      case 'create-asset-funding-source':
        return <CreateAssetFundingSource onClose={() => setCurrentView('asset-funding-sources')} />;
      case 'list-asset-category':
        return <AssetCategoryList onCreateClick={() => setCurrentView('create-asset-category')} />;
      case 'create-asset-category':
        return <CreateAssetCategory onClose={() => setCurrentView('list-asset-category')} />;
      case 'asset-books':
        return <AssetBookList onCreateClick={() => setCurrentView('create-asset-book')} />;
      case 'create-asset-book':
        return <CreateAssetBook onClose={() => setCurrentView('asset-books')} />;
      case 'asset-depreciations':
        return <AssetDepreciationList onCreateClick={() => setCurrentView('create-asset-depreciation')} />;
      case 'create-asset-depreciation':
        return <CreateAssetDepreciation onClose={() => setCurrentView('asset-depreciations')} />;
      case 'create-asset-transaction':
        return <CreateAssetTransaction onClose={() => setCurrentView('asset-transactions')} />;

      // TEM Views
      case 'tem-dashboard':
        return <TEMDashboard />;
      case 'advance-request':
        return <AdvanceRequestList />;
      case 'advance-settlement':
        return <AdvanceSettlementList />;
      case 'travel-expenditure-requisition':
        return <TravelExpenditureRequisition />;
      case 'expense-declaration':
        return <ExpenseDeclarationList />;
      case 'travel-expenditure-approval':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Travel/expenditure approval</h1>
            <p className="text-gray-500 mt-2">Approve travel and expenditure requests</p>
          </div>
        );
      case 'travel-expenditure-management':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Travel/expenditure management</h1>
            <p className="text-gray-500 mt-2">Manage all travel and expenditures</p>
          </div>
        );

      // WMM Views
      case 'wmm-dashboard':
        return <WMMDashboard />;
      case 'wmm-material-list':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Material List</h1>
            <p className="text-gray-500 mt-2">Manage all materials</p>
          </div>
        );
      case 'wmm-material-category':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Material Category</h1>
            <p className="text-gray-500 mt-2">Manage material categories</p>
          </div>
        );
      case 'wmm-unit-of-measure':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Unit of Measure</h1>
            <p className="text-gray-500 mt-2">Manage units of measure</p>
          </div>
        );
      case 'wmm-warehouse-location':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Warehouse Location</h1>
            <p className="text-gray-500 mt-2">Manage warehouse locations</p>
          </div>
        );
      case 'wmm-goods-receipt-req':
        return (
          <GoodsReceiptRequirementList
            onCreateClick={() => setCurrentView('wmm-create-goods-receipt-req')}
          />
        );
      case 'wmm-create-goods-receipt-req':
        return (
          <CreateGoodsReceiptRequirement onClose={() => setCurrentView('wmm-goods-receipt-req')} />
        );
      case 'wmm-goods-issues-req':
        return (
          <GoodsIssuesRequirementList
            onCreateClick={() => setCurrentView('wmm-create-goods-issues-req')}
          />
        );
      case 'wmm-create-goods-issues-req':
        return (
          <CreateGoodsIssuesRequirement onClose={() => setCurrentView('wmm-goods-issues-req')} />
        );
      case 'wmm-material-req-processing':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Material Request Processing</h1>
            <p className="text-gray-500 mt-2">Process material requests</p>
          </div>
        );
      case 'wmm-goods-receipt':
        return <GoodReceiptList onCreateClick={() => setCurrentView('wmm-create-good-receipt')} />;
      case 'wmm-create-good-receipt':
        return <CreateGoodReceipt onClose={() => setCurrentView('wmm-goods-receipt')} />;
      case 'wmm-good-issue':
        return <GoodIssueList onCreateClick={() => setCurrentView('wmm-create-good-issue')} />;
      case 'wmm-create-good-issue':
        return <CreateGoodIssue onClose={() => setCurrentView('wmm-good-issue')} />;
      case 'wmm-goods-receipt-adjust':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Goods Receipt Adjust</h1>
            <p className="text-gray-500 mt-2">Adjust goods receipts</p>
          </div>
        );
      case 'wmm-goods-issues-adjust':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Goods Issues Adjust</h1>
            <p className="text-gray-500 mt-2">Adjust goods issues</p>
          </div>
        );
      case 'wmm-goods-receipt-approval':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Goods Receipt Approval</h1>
            <p className="text-gray-500 mt-2">Approve goods receipts</p>
          </div>
        );
      case 'wmm-good-issue-approval':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Good Issue Approval</h1>
            <p className="text-gray-500 mt-2">Approve good issues</p>
          </div>
        );

      // ── Cost Allocation Views ────────────────────────────────────────────
      case 'pending-allocation':
        return <PendingAllocationList onRunAllocation={() => setCurrentView('run-allocation')} />;

      case 'allocation-declaration':
        return <AllocationDeclarationList />;

      case 'allocation-rules':
        return (
          <AllocationRuleList
            onCreateClick={() => setCurrentView('create-allocation-rule')}
            onViewClick={() => setCurrentView('create-allocation-rule')}
          />
        );

      case 'create-allocation-rule':
        return <CreateAllocationRule onClose={() => setCurrentView('allocation-rules')} />;

      case 'run-allocation':
        return <AllocationRunScreen />;

      case 'allocation-history':
        return <AllocationHistoryList />;

      case 'reverse-allocation':
        return <AllocationReverseScreen onClose={() => setCurrentView('allocation-history')} />;

      default:
        return (
          <div className="flex items-center justify-center h-screen">
            <p className="text-gray-500">Chọn menu để bắt đầu</p>
          </div>
        );
    }
  };

  const renderSidebar = () => {
    if (currentResponsibility === 'TEM') {
      return (
        <TEMSidebar
          isOpen={isSidebarOpen}
          onNavigate={handleNavigate}
          currentView={currentView}
          onModuleChange={handleModuleChange}
        />
      );
    } else if (currentResponsibility === 'WMM') {
      return (
        <WMMSidebar
          isOpen={isSidebarOpen}
          onNavigate={handleNavigate}
          currentView={currentView}
          onModuleChange={handleModuleChange}
        />
      );
    }

    // FCM Sidebar (default)
    return (
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onNavigate={handleNavigate}
        currentView={currentView}
        onModuleChange={handleModuleChange}
      />
    );
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen" style={{ backgroundColor: '#f1f5f9' }}>
        <Toaster position="top-right" richColors />
        {/* Header */}
        <Header
          currentResponsibility={currentResponsibility}
          onResponsibilityClick={() => setShowResponsibilityModal(true)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Content Area */}
        <div className="pt-14 flex">
          {/* Sidebar */}
          {renderSidebar()}

          {/* Content */}
          <div
            className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[260px]' : 'ml-0'}`}
          >
            {renderContent()}
          </div>
        </div>

        {/* Responsibility Modal */}
        {showResponsibilityModal && (
          <ResponsibilityModal
            open={showResponsibilityModal}
            currentResponsibility={currentResponsibility}
            onClose={() => setShowResponsibilityModal(false)}
            onSelectResponsibility={handleResponsibilityChange}
          />
        )}
      </div>
    </LanguageProvider>
  );
}