// src/components/admin/UserManagement.js
"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Key,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, addUser, updateUser, deleteUser } from "../../app/slice/usersSlice";
import toast from "react-hot-toast";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://ggu-mtech-form-b.vercel.app"
    : "http://localhost:4000";

// Role options mapping
const ROLE_OPTIONS = [
  { value: "staff", label: "Staff" },
  { value: "hod", label: "HOD" },
  { value: "subAdmin", label: "Sub Admin" },
];

// Status options
const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function UserManagement() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users || []);

  // UI State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    role: "staff",
    status: "active",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    role: "staff",
    status: "active",
  });

  // Password States
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [editPassword, setEditPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Loading States
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Toast helper functions
  const showSuccessToast = (message) => {
    toast.success(message, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#10B981",
        color: "#fff",
        padding: "16px",
        borderRadius: "12px",
      },
      icon: "✅",
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      duration: 5000,
      position: "top-right",
      style: {
        background: "#EF4444",
        color: "#fff",
        padding: "16px",
        borderRadius: "12px",
      },
      icon: "❌",
    });
  };

  const showLoadingToast = (message) => {
    return toast.loading(message, {
      position: "top-right",
      style: {
        padding: "16px",
        borderRadius: "12px",
      },
    });
  };

  // Fetch Users - defined with useCallback
  const fetchUsers = useCallback(async () => {
    const loadingToastId = showLoadingToast("Loading users...");
    
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      toast.dismiss(loadingToastId);

      if (response.ok && data.success) {
        dispatch(setUsers(data.users));
        showSuccessToast(`Loaded ${data.users.length} users successfully`);
      } else {
        const errorMsg = data.message || "Failed to fetch users";
        setError(errorMsg);
        showErrorToast(errorMsg);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.dismiss(loadingToastId);
      const errorMsg = "Network error. Please check your connection.";
      setError(errorMsg);
      showErrorToast(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Fetch Users on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const inactiveUsers = users.filter((u) => u.status === "inactive").length;
  const adminUsers = users.filter((u) => u.role === "subAdmin").length;

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.mobileNo || "").includes(searchTerm);

    const matchesRole = selectedRole === "All" || user.role === selectedRole.toLowerCase();
    const matchesStatus =
      selectedStatus === "All" || user.status === selectedStatus.toLowerCase();

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Helper Functions
  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  const getStatusIcon = (status) => {
    return status === "active" ? (
      <CheckCircle className="w-3 h-3" />
    ) : (
      <XCircle className="w-3 h-3" />
    );
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "subAdmin":
        return "bg-purple-100 text-purple-700";
      case "hod":
        return "bg-blue-100 text-blue-700";
      case "staff":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "subAdmin":
        return "Sub Admin";
      case "hod":
        return "HOD";
      case "staff":
        return "Staff";
      default:
        return role || "Staff";
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedRole("All");
    setSelectedStatus("All");
    setCurrentPage(1);
    showSuccessToast("Filters cleared successfully");
  };

  // Create User
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.mobileNo || !formData.password) {
      showErrorToast("Please fill in all required fields");
      return;
    }

    if (formData.password.length < 6) {
      showErrorToast("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    setPasswordError("");
    const loadingToastId = showLoadingToast("Creating user...");

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      toast.dismiss(loadingToastId);

      if (response.ok && data.admin) {
        dispatch(addUser(data.admin));
        setShowCreateModal(false);
        setFormData({
          name: "",
          email: "",
          mobileNo: "",
          password: "",
          role: "staff",
          status: "active",
        });
        setShowPassword(false);
        showSuccessToast(data.message || "User created successfully!");
      } else {
        const errorMsg = data.message || "Failed to create user";
        showErrorToast(errorMsg);
        
        // Show field-specific errors if available
        if (data.errors) {
          data.errors.forEach((err) => {
            showErrorToast(err);
          });
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.dismiss(loadingToastId);
      showErrorToast("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit User
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name || "",
      email: user.email || "",
      mobileNo: user.mobileNo || "",
      password: "",
      role: user.role || "staff",
      status: user.status || "active",
    });
    setEditPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!editFormData.name || !editFormData.email || !editFormData.mobileNo) {
      showErrorToast("Please fill in all required fields");
      return;
    }

    // Validate password if provided
    if (editPassword || confirmPassword) {
      if (editPassword.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        showErrorToast("Password must be at least 6 characters");
        return;
      }
      if (editPassword !== confirmPassword) {
        setPasswordError("Passwords do not match");
        showErrorToast("Passwords do not match");
        return;
      }
    }

    setSubmitting(true);
    setPasswordError("");
    const loadingToastId = showLoadingToast("Updating user...");

    try {
      const payload = {
        name: editFormData.name,
        email: editFormData.email,
        mobileNo: editFormData.mobileNo,
        role: editFormData.role,
        status: editFormData.status,
      };

      // Only include password if it was changed
      if (editPassword) {
        payload.password = editPassword;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/users/${selectedUser._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      toast.dismiss(loadingToastId);

      if (response.ok && data.success) {
        dispatch(updateUser(data.user));
        setShowEditModal(false);
        setSelectedUser(null);
        setEditPassword("");
        setConfirmPassword("");
        showSuccessToast(data.message || "User updated successfully!");
      } else {
        const errorMsg = data.message || "Failed to update user";
        showErrorToast(errorMsg);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.dismiss(loadingToastId);
      showErrorToast("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete User
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setDeleting(true);
    const loadingToastId = showLoadingToast(`Deleting user ${selectedUser.name}...`);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${selectedUser._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      toast.dismiss(loadingToastId);

      if (response.ok && data.success) {
        dispatch(deleteUser(selectedUser._id));
        setShowDeleteModal(false);
        setSelectedUser(null);
        showSuccessToast(data.message || `User "${selectedUser.name}" deleted successfully!`);
      } else {
        const errorMsg = data.message || "Failed to delete user";
        showErrorToast(errorMsg);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.dismiss(loadingToastId);
      showErrorToast("Network error. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  // Create User Form Change Handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-secondary animate-spin mx-auto mb-4" />
          <p className="text-textmuted">Loading users...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-white rounded-2xl p-8 max-w-md shadow-lg">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-primary mb-2">Error Loading Users</h3>
          <p className="text-textmuted mb-4">{error}</p>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            User Management
          </h1>
          <p className="text-textmuted text-sm mt-1">
            Manage all users and their permissions
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-borderlight">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-textmuted">Total Users</p>
              <h3 className="text-3xl font-bold text-primary mt-1">
                {totalUsers}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-borderlight">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-textmuted">Active Users</p>
              <h3 className="text-3xl font-bold text-green-600 mt-1">
                {activeUsers}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-borderlight">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-textmuted">Inactive Users</p>
              <h3 className="text-3xl font-bold text-red-600 mt-1">
                {inactiveUsers}
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-borderlight">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-textmuted">Administrators</p>
              <h3 className="text-3xl font-bold text-purple-600 mt-1">
                {adminUsers}
              </h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-borderlight">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textmuted" />
            <input
              type="text"
              placeholder="Search by name, email, or mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="pl-4 pr-10 py-2 border border-borderlight rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
              >
                <option value="All">All Roles</option>
                <option value="subAdmin">Sub Admin</option>
                <option value="hod">HOD</option>
                <option value="staff">Staff</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textmuted pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-4 pr-10 py-2 border border-borderlight rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
              >
                <option value="All">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textmuted pointer-events-none" />
            </div>

            <button
              onClick={() => setCurrentPage(1)}
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition"
            >
              Search
            </button>

            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-borderlight rounded-lg hover:bg-gray-50 transition text-textmuted"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-borderlight overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-borderlight">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-textmuted uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-textmuted uppercase hidden sm:table-cell">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-textmuted uppercase hidden md:table-cell">
                  Mobile
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-textmuted uppercase">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-textmuted uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-textmuted uppercase hidden lg:table-cell">
                  Created On
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-textmuted uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderlight">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{user.name || "N/A"}</p>
                          <p className="text-xs text-textmuted sm:hidden">
                            {user.email || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-textmuted hidden sm:table-cell">
                      {user.email || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-textmuted hidden md:table-cell">
                      {user.mobileNo || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {getStatusIcon(user.status)}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-textmuted text-sm hidden lg:table-cell">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-textmuted">
                    <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No users found matching your search criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="px-4 py-4 border-t border-borderlight flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-textmuted">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-borderlight hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg transition ${
                        currentPage === pageNum
                          ? "bg-secondary text-white"
                          : "hover:bg-gray-100 text-textmuted"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-borderlight hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-borderlight flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-primary">Create New User</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary pr-10"
                      placeholder="Enter password (min 6 characters)"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-textmuted hover:text-secondary transition"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-borderlight rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 inline animate-spin mr-2" />
                        Creating...
                      </>
                    ) : (
                      "Create User"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-borderlight flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-primary">Edit User</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                  setEditPassword("");
                  setConfirmPassword("");
                  setPasswordError("");
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNo"
                    value={editFormData.mobileNo}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>

                {/* Password Section */}
                <div className="border-t border-borderlight pt-4 mt-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Key className="w-4 h-4 text-secondary" />
                    <h3 className="font-semibold text-primary">
                      Update Password
                    </h3>
                    <span className="text-xs text-textmuted">
                      (Optional - leave blank to keep current password)
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={editPassword}
                          onChange={(e) => {
                            setEditPassword(e.target.value);
                            if (passwordError) setPasswordError("");
                          }}
                          className="w-full px-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary pr-10"
                          placeholder="Enter new password (min 6 characters)"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-textmuted hover:text-secondary transition"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (passwordError) setPasswordError("");
                          }}
                          className="w-full px-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary pr-10"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-textmuted hover:text-secondary transition"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {passwordError && (
                      <p className="text-red-500 text-sm">{passwordError}</p>
                    )}

                    {editPassword &&
                      confirmPassword &&
                      editPassword === confirmPassword &&
                      editPassword.length >= 6 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-green-700 text-sm flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Password is valid
                        </div>
                      )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="role"
                    value={editFormData.role}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-borderlight rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedUser(null);
                      setEditPassword("");
                      setConfirmPassword("");
                      setPasswordError("");
                    }}
                    className="px-4 py-2 border border-borderlight rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 inline animate-spin mr-2" />
                        Updating...
                      </>
                    ) : (
                      "Update User"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold mb-2">Delete User</h2>
                <p className="text-textmuted">
                  Are you sure you want to delete user{" "}
                  <strong>"{selectedUser.name}"</strong>? This action cannot be
                  undone.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-borderlight flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 border border-borderlight rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 inline animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}