import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2, Edit, AlertCircle, Search, Filter, Download, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useLending } from '../context/LendingContext';
import EditModal from '../components/EditModal';
import toast from 'react-hot-toast';

export default function History() {
  const { applications, handleDeleteApplication, fetchApplications, handleEditApplication } = useLending();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApps = applications.filter(app => {
    const matchesSearch = app._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.ownerName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.decision?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    if (status === 'Approved') return <CheckCircle className="text-green-500" size={20} />;
    if (status === 'Rejected') return <XCircle className="text-red-500" size={20} />;
    return <Clock className="text-yellow-500" size={20} />;
  };

  const getStatusColor = (status) => {
    if (status === 'Approved') return 'bg-green-100 text-green-700';
    if (status === 'Rejected') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const handleDelete = (app) => {
    setSelectedApp(app);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    const success = await handleDeleteApplication(selectedApp._id);
    setLoading(false);
    if (success) {
      setShowDeleteModal(false);
      setSelectedApp(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedApp(null);
  };

  const exportToCSV = () => {
    const headers = ['Application ID', 'Owner Name', 'PAN', 'Amount (₹)', 'Tenure', 'Credit Score', 'Status', 'Reason Codes', 'Date'];
    const csvData = filteredApps.map(app => [
      app._id,
      app.ownerName,
      app.pan,
      app.loanAmount,
      app.tenureMonths,
      app.creditScore || 'N/A',
      app.decision,
      app.reasonCodes?.join(', ') || '',
      new Date(app.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loan_applications_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported to CSV successfully!');
  };

  const stats = {
    total: applications.length,
    approved: applications.filter(a => a.decision === 'Approved').length,
    rejected: applications.filter(a => a.decision === 'Rejected').length,
    totalAmount: applications.reduce((sum, a) => sum + (a.loanAmount || 0), 0),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Edit Modal */}
      <EditModal />

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={cancelDelete}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertCircle className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold">Delete Application</h3>
              </div>
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete application from <span className="font-semibold">{selectedApp?.ownerName}</span>?
              </p>
              <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Application History</h1>
        <p className="text-gray-600">Track and manage all your loan applications</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-gray-500 text-sm">Total Applications</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 shadow">
          <p className="text-green-600 text-sm">Approved</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 shadow">
          <p className="text-red-600 text-sm">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 shadow">
          <p className="text-blue-600 text-sm">Total Amount</p>
          <p className="text-2xl font-bold text-blue-600">₹{(stats.totalAmount / 100000).toFixed(1)}L</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by ID or Owner Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl capitalize transition-all ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Owner</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tenure</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Credit Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No applications found
                   </td>
                </tr>
              ) : (
                filteredApps.map((app, i) => (
                  <motion.tr
                    key={app._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4 font-mono text-sm">
                      {app._id?.slice(-8)}
                    </td>
                    <td className="px-6 py-4 font-medium">{app.ownerName}</td>
                    <td className="px-6 py-4">₹{app.loanAmount?.toLocaleString()}</td>
                    <td className="px-6 py-4">{app.tenureMonths} months</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        app.creditScore >= 700 ? 'bg-green-100 text-green-700' :
                        app.creditScore >= 550 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {app.creditScore || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(app.decision)}
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.decision)}`}>
                          {app.decision || 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {/* ✅ EDIT BUTTON - YEH ADD KIYA */}
                        <button
                          onClick={() => handleEditApplication(app)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        {/* ✅ DELETE BUTTON */}
                        <button
                          onClick={() => handleDelete(app)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}