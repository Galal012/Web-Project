import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEye,
  faEnvelopeOpen,
} from "@fortawesome/free-solid-svg-icons";
import { mockAPI } from "../../services/mockData";
import ContactModal from "./ContactModal";
import toast from "react-hot-toast";

const ContactManagement = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [statusFilter, setStatusFilter] = useState("");

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    loadContacts();
  }, [statusFilter]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const response = await mockAPI.contacts.getAll();
      setContacts(response.data.data.contacts);
    } catch (error) {
      console.error(error);
      toast.error(isRTL ? "فشل تحميل الرسائل" : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    try {
      console.log("Deleting contact with id:", id);
      toast.success(
        isRTL ? "تم حذف الرسالة بنجاح" : "Message deleted successfully"
      );
    } catch (error) {
      toast.error(isRTL ? "فشل حذف الرسالة" : "Failed to delete message");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">
          {isRTL ? "إدارة الرسائل" : "Messages Inbox"}
        </h2>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer"
          >
            <option value="">{t("common.all")}</option>
            <option value="new">{t("status.new")}</option>
            <option value="in-progress">{t("status.in-progress")}</option>
            <option value="resolved">{t("status.resolved")}</option>
            <option value="closed">{t("status.closed")}</option>
          </select>
        </div>
      </div>

      {/* Contacts List */}
      <div
        className={`space-y-4 transition-opacity duration-200 ${
          loading ? "opacity-50" : "opacity-100"
        }`}
      >
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              {/* Sender */}
              <div className="flex items-center gap-4 min-w-[250px] flex-1">
                <div
                  className={`shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${
                    contact.status === "new"
                      ? "bg-red-50 text-red-500"
                      : "bg-blue-50 text-blue-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faEnvelopeOpen} className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    From: {contact.name} ({contact.email})
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="text-sm text-gray-500">
                {new Date(contact.createdAt).toLocaleDateString(
                  isRTL ? "ar-EG" : "en-US"
                )}
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                    contact.status
                  )}`}
                >
                  {t(`status.${contact.status}`)}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedContact(contact);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 size-7.5 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
                    title="View Details"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>

                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="text-red-500 hover:text-red-700 size-7.5 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {contacts.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          {isRTL ? "لا توجد رسائل" : "No messages found"}
        </div>
      )}

      {/* Modal */}
      <ContactModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={loadContacts}
        contact={selectedContact}
      />
    </div>
  );
};

export default ContactManagement;
