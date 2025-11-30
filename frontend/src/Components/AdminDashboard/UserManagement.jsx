import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faSpinner,
  faSearch,
  faUserShield,
  faUser,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import { mockAPI } from "../../services/mockData";
import UserModal from "./UserModal";
import toast from "react-hot-toast";

const UserManagement = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Load Data when Role changes
  useEffect(() => {
    loadUsers();
  }, [roleFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await mockAPI.users.getAll();
      setUsers(response.data.data.users);
    } catch (error) {
      console.error(error);
      toast.error(isRTL ? "فشل تحميل المستخدمين" : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (
      !window.confirm(
        isRTL
          ? "هل أنت متأكد من حذف هذا المستخدم؟"
          : "Are you sure you want to delete this user?"
      )
    ) {
      return;
    }

    try {
      console.log("Deleting user with id:", id);
      toast.success(isRTL ? "تم حذف المستخدم" : "User deleted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || isRTL
          ? "فشل حذف المستخدم"
          : "Failed to delete user"
      );
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      console.log("Updating user role:", userId, newRole);
      toast.success(
        isRTL ? "تم تحديث دور المستخدم" : "User role updated successfully"
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (error) {
      toast.error(
        isRTL ? "فشل تحديث دور المستخدم" : "Failed to update user role"
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">
          {isRTL ? "إدارة المستخدمين" : "Users Management"}
        </h2>
        <button
          onClick={() => {
            setEditingUser(null);
            setShowModal(true);
          }}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          {isRTL ? "إضافة مستخدم" : "Add User"}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Bar */}
          <div className="relative">
            {/* Show spinner icon if loading, otherwise show search icon */}
            <div className="absolute left-3 top-3 text-gray-400">
              {loading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="animate-spin text-yellow-500"
                />
              ) : (
                <FontAwesomeIcon icon={faSearch} />
              )}
            </div>
            <input
              type="text"
              placeholder={isRTL ? "البحث..." : "Search users..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer"
          >
            <option value="">{isRTL ? "جميع الأدوار" : "All Roles"}</option>
            <option value="user">{isRTL ? "مستخدم" : "User"}</option>
            <option value="admin">{isRTL ? "مدير" : "Admin"}</option>
            <option value="technician">{isRTL ? "فني" : "Technician"}</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
        {/* Add a slight fade effect when loading data */}
        <div
          className={`transition-opacity duration-200 ${
            loading ? "opacity-50" : "opacity-100"
          }`}
        >
          <table className="w-full hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className={`px-3 lg:px-6 py-3 ${
                    isRTL ? "text-right" : "text-left"
                  } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {isRTL ? "المستخدم" : "User"}
                </th>
                <th
                  className={`px-3 lg:px-6 py-3 ${
                    isRTL ? "text-right" : "text-left"
                  } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {isRTL ? "البريد الإلكتروني" : "Email"}
                </th>
                <th
                  className={`px-3 lg:px-6 py-3 ${
                    isRTL ? "text-right" : "text-left"
                  } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {isRTL ? "الدور" : "Role"}
                </th>
                <th
                  className={`px-3 lg:px-6 py-3 ${
                    isRTL ? "text-right" : "text-left"
                  } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {isRTL ? "الحالة" : "Status"}
                </th>
                <th
                  className={`px-3 lg:px-6 py-3 ${
                    isRTL ? "text-right" : "text-left"
                  } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {isRTL ? "الإجراءات" : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-white"
                          />
                        </div>
                      </div>
                      <div className={`${isRTL ? "mr-4" : "ml-4"}`}>
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString(isRTL ? "ar-EG" : "en-US")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    {user.phone && (
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    )}
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={
                          user.role === "admin"
                            ? faUserShield
                            : user.role === "technician"
                            ? faTools
                            : faUser
                        }
                        className={
                          user.role === "admin"
                            ? "text-purple-500"
                            : user.role === "technician"
                            ? "text-slate-600"
                            : "text-blue-500"
                        }
                      />
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "technician"
                            ? "bg-slate-100 text-slate-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {t(`role.${user.role}`)}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isActive
                        ? t("status.active")
                        : t("status.inactive")}
                    </span>
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setShowModal(true);
                          }}
                          className="text-green-600 hover:text-green-800 cursor-pointer"
                          title={isRTL ? "تعديل" : "Edit"}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                          title={isRTL ? "حذف" : "Delete"}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>

                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleUpdateUserRole(user._id, e.target.value)
                        }
                        className="text-xs border border-gray-300 rounded px-2 py-1 cursor-pointer"
                      >
                        <option value="user">
                          {isRTL ? "مستخدم" : "User"}
                        </option>
                        <option value="technician">
                          {isRTL ? "فني" : "Technician"}
                        </option>
                        <option value="admin">
                          {isRTL ? "مدير" : "Admin"}
                        </option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="md:hidden divide-y divide-gray-200">
            {users.map((user) => (
              <div
                key={user._id}
                className="relative hover:bg-gray-50 flex flex-col min-[450px]:flex-row justify-between p-6 gap-4 min-[450px]:gap-10"
              >
                <div className="flex flex-col justify-between items-start gap-4">
                  <div className="whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-white"
                          />
                        </div>
                      </div>
                      <div className={`${isRTL ? "mr-4" : "ml-4"}`}>
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString(isRTL ? "ar-EG" : "en-US")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    {user.phone && (
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-start gap-4">
                  <div className="whitespace-nowrap absolute min-[450px]:static top-3 right-3">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={
                          user.role === "admin"
                            ? faUserShield
                            : user.role === "technician"
                            ? faTools
                            : faUser
                        }
                        className={
                          user.role === "admin"
                            ? "text-purple-500"
                            : user.role === "technician"
                            ? "text-slate-600"
                            : "text-blue-500"
                        }
                      />
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "technician"
                            ? "bg-slate-100 text-slate-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {t(`role.${user.role}`)}
                      </span>
                    </div>
                  </div>
                  <div className="whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <div className="whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.isActive
                              ? t("status.active")
                              : t("status.inactive")}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setShowModal(true);
                          }}
                          className="text-green-600 hover:text-green-800 cursor-pointer"
                          title={isRTL ? "تعديل" : "Edit"}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                          title={isRTL ? "حذف" : "Delete"}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>

                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleUpdateUserRole(user._id, e.target.value)
                        }
                        className="text-xs border border-gray-300 rounded px-2 py-1 cursor-pointer"
                      >
                        <option value="user">
                          {isRTL ? "مستخدم" : "User"}
                        </option>
                        <option value="technician">
                          {isRTL ? "فني" : "Technician"}
                        </option>
                        <option value="admin">
                          {isRTL ? "مدير" : "Admin"}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {users.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {isRTL ? "لا توجد مستخدمين" : "No users found"}
          </p>
        </div>
      )}

      {/* Modal */}
      <UserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={loadUsers}
        userToEdit={editingUser}
      />
    </div>
  );
};

export default UserManagement;
