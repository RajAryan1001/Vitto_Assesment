import { createContext, useState, useContext, useEffect } from 'react';
import { 
  submitLoanApplication, 
  getAllApplications,
  deleteApplication,
  updateApplication
} from '../services/api';
import toast from 'react-hot-toast';

const LendingContext = createContext();

export const useLending = () => useContext(LendingContext);

export const LendingProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    pan: '',
    businessType: 'retail',
    monthlyRevenue: '',
    loanAmount: '',
    tenureMonths: '',
    purpose: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [applications, setApplications] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [editingApp, setEditingApp] = useState(null); // ✅ For update
  const [showEditModal, setShowEditModal] = useState(false); // ✅ For update

  // ✅ Fetch all applications
  const fetchApplications = async () => {
    try {
      const response = await getAllApplications();
      if (response.data.success) {
        setApplications(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [refetch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === 'pan') {
      processedValue = value.toUpperCase().replace(/\s/g, '').slice(0, 10);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: ['monthlyRevenue', 'loanAmount', 'tenureMonths'].includes(name) 
        ? (processedValue === '' ? '' : Number(processedValue)) 
        : processedValue
    }));
  };

  const submitApplication = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submissionData = {
        ...formData,
        monthlyRevenue: formData.monthlyRevenue === '' ? 0 : Number(formData.monthlyRevenue),
        loanAmount: formData.loanAmount === '' ? 0 : Number(formData.loanAmount),
        tenureMonths: formData.tenureMonths === '' ? 1 : Number(formData.tenureMonths),
      };

      const response = await submitLoanApplication(submissionData);
      const resultData = response.data?.data || response.data;
      
      setResult(resultData);
      await fetchApplications();
      setRefetch(prev => !prev);
      
      toast.success('Application processed successfully!');
    } catch (err) {
      console.error("Submission error:", err);
      let errorMessage = 'Failed to process application. Please try again.';
      
      if (err.response?.data?.details) {
        errorMessage = err.response.data.details.join(', ');
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete application
  const handleDeleteApplication = async (id) => {
    try {
      await deleteApplication(id);
      await fetchApplications();
      setRefetch(prev => !prev);
      toast.success('Application deleted successfully!');
      return true;
    } catch (error) {
      console.error("Delete error:", error);
      toast.error('Failed to delete application');
      return false;
    }
  };

  // ✅ Update application - Open modal with data
  const handleEditApplication = (app) => {
    setEditingApp(app);
    setFormData({
      ownerName: app.ownerName || '',
      pan: app.pan || '',
      businessType: app.businessType || 'retail',
      monthlyRevenue: app.monthlyRevenue || '',
      loanAmount: app.loanAmount || '',
      tenureMonths: app.tenureMonths || '',
      purpose: app.purpose || ''
    });
    setShowEditModal(true);
  };

  // ✅ Update application - Submit changes
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updateData = {
        ownerName: formData.ownerName,
        pan: formData.pan,
        businessType: formData.businessType,
        monthlyRevenue: Number(formData.monthlyRevenue),
        loanAmount: Number(formData.loanAmount),
        tenureMonths: Number(formData.tenureMonths),
        purpose: formData.purpose
      };
      
      await updateApplication(editingApp._id, updateData);
      await fetchApplications();
      setRefetch(prev => !prev);
      setShowEditModal(false);
      setEditingApp(null);
      resetForm();
      toast.success('Application updated successfully!');
    } catch (error) {
      console.error("Update error:", error);
      toast.error('Failed to update application');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      ownerName: '', pan: '', businessType: 'retail',
      monthlyRevenue: '', loanAmount: '', tenureMonths: '', purpose: ''
    });
    setResult(null);
    setError('');
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingApp(null);
    resetForm();
  };

  return (
    <LendingContext.Provider value={{
      formData,
      result,
      loading,
      error,
      applications,
      showEditModal,
      editingApp,
      handleChange,
      submitApplication,
      resetForm,
      fetchApplications,
      handleDeleteApplication,
      handleEditApplication,
      handleUpdateSubmit,
      closeEditModal
    }}>
      {children}
    </LendingContext.Provider>
  );
};