import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSpinner,
  faSearch,
  faCalendar,
  faUser,
  faWrench,
  faHardHat,
} from "@fortawesome/free-solid-svg-icons";
import { mockAPI } from "../../services/mockData";
import BookingModal from "./BookingModal";
import toast from "react-hot-toast";

const BookingManagement = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Load Data
  useEffect(() => {
    loadBookings();
  }, [statusFilter, dateFilter]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await mockAPI.bookings.getAll();
      setBookings(response.data.data.bookings);
    } catch (error) {
      console.error(error);
      toast.error(isRTL ? "فشل تحميل الحجوزات" : "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      console.log(`Updating booking ${bookingId} to status ${newStatus}`);
      toast.success(
        isRTL ? "تم تحديث حالة الحجز" : "Booking status updated successfully"
      );
    } catch (error) {
      console.error(error);
      toast.error(
        isRTL ? "فشل تحديث حالة الحجز" : "Failed to update booking status"
      );
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();

    return (
      (booking.customer?.firstName?.toLowerCase() || "").includes(term) ||
      (booking.customer?.lastName?.toLowerCase() || "").includes(term) ||
      (booking.service?.name?.toLowerCase() || "").includes(term)
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "no-show":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    return t(`status.${status}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">
          {isRTL ? "إدارة الحجوزات" : "Bookings Management"}
        </h2>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
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
              placeholder={
                isRTL ? "البحث في الحجوزات..." : "Search bookings..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer"
          >
            <option value="">{isRTL ? "جميع الحالات" : "All Status"}</option>
            <option value="pending">{t("status.pending")}</option>
            <option value="confirmed">{t("status.confirmed")}</option>
            <option value="in-progress">{t("status.in-progress")}</option>
            <option value="completed">{t("status.completed")}</option>
            <option value="cancelled">{t("status.cancelled")}</option>
            <option value="no-show">{t("status.no-show")}</option>
          </select>

          {/* Date */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Bookings List */}
      <div
        className={`space-y-4 transition-opacity duration-200 ${
          loading ? "opacity-50" : "opacity-100"
        }`}
      >
        {filteredBookings.map((booking) => (
          <div key={booking._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex gap-6 items-center justify-between">
              <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
                {/* 1. Customer & Service */}
                <div className="flex flex-col gap-1 min-w-[200px] flex-1">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <FontAwesomeIcon icon={faUser} className="text-blue-500" />
                    {booking.customer?.firstName} {booking.customer?.lastName}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FontAwesomeIcon
                      icon={faWrench}
                      className="text-green-500"
                    />
                    {booking.service?.name || "Service Deleted"}
                  </div>
                  {booking.technician && (
                    <div className="flex items-center gap-2 text-xs text-purple-600 mt-1 bg-purple-50 w-fit px-2 py-1 rounded">
                      <FontAwesomeIcon icon={faHardHat} />
                      Tech: {booking.technician.firstName}
                    </div>
                  )}
                </div>

                {/* 2. Date & Cost */}
                <div className="flex flex-col gap-1 min-w-[150px]">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="text-gray-400"
                    />
                    {new Date(booking.appointmentDate).toLocaleDateString(
                      isRTL ? "ar-EG" : "en-US"
                    )}
                  </div>
                  <div className="text-sm text-gray-500 pl-6">
                    {booking.appointmentTime}
                  </div>
                  <div className="text-sm font-bold text-yellow-600 pl-6">
                    ${booking.estimatedCost}
                  </div>
                </div>
              </div>

              {/* 3. Status & Actions */}
              <div className="flex flex-col items-start gap-3 min-w-35">
                <div className="flex items-center gap-2">
                  {/* Manage Button */}
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 bg-blue-50 size-7.5 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
                    title={isRTL ? "إدارة الحجز" : "Manage Booking"}
                  >
                    <FontAwesomeIcon icon={faEdit} />{" "}
                  </button>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {getStatusText(booking.status)}
                  </span>
                </div>

                <select
                  value={booking.status}
                  onChange={(e) =>
                    handleUpdateBookingStatus(booking._id, e.target.value)
                  }
                  className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  <option value="pending">{t("status.pending")}</option>
                  <option value="confirmed">{t("status.confirmed")}</option>
                  <option value="in-progress">{t("status.in-progress")}</option>
                  <option value="completed">{t("status.completed")}</option>
                  <option value="cancelled">{t("status.cancelled")}</option>
                  <option value="no-show">{t("status.no-show")}</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookings.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {isRTL ? "لا توجد حجوزات" : "No bookings found"}
          </p>
        </div>
      )}

      {/* Detail Modal */}
      <BookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={loadBookings}
        booking={selectedBooking}
      />
    </div>
  );
};

export default BookingManagement;
