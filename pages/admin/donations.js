import { useEffect, useState } from "react";
import Head from 'next/head';
import AdminLayout from '../../components/admin/AdminLayout';
import { ProtectRoute } from '../../contexts/AuthContext';

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    filterDonations();
  }, [donations, searchTerm, statusFilter]);

  const fetchDonations = async () => {
    try {
      const res = await fetch("/api/admin/donations");
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setDonations(list);
      setFilteredDonations(list);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setLoading(false);
    }
  };

  const filterDonations = () => {
    let filtered = donations;

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((d) => d.status === statusFilter);
    }

    // Search filter across ALL fields: Name, Email, Mobile, PAN, Aadhaar, OrderId, PaymentId
    if (searchTerm) {
      const q = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (d) =>
          (d.donorName || "").toLowerCase().includes(q) ||
          (d.email || "").toLowerCase().includes(q) ||
          (d.mobile || "").includes(q) ||
          (d.pancard || d.pan || "").toLowerCase().includes(q) ||
          (d.aadhaar || "").toLowerCase().includes(q) ||
          (d.orderId || "").toLowerCase().includes(q) ||
          (d.paymentId || "").toLowerCase().includes(q) ||
          (d.subscriptionId || "").toLowerCase().includes(q)
      );
    }

    setFilteredDonations(filtered);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      success: "bg-green-100 text-green-800 border border-green-300",
      active: "bg-blue-100 text-blue-800 border border-blue-300",
      created: "bg-yellow-100 text-yellow-800 border border-yellow-300",
      pending: "bg-gray-100 text-gray-800 border border-gray-300",
      failed: "bg-red-100 text-red-800 border border-red-300",
      cancelled: "bg-orange-100 text-orange-800 border border-orange-300",
    };

    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {(status || "PENDING").toUpperCase()}
      </span>
    );
  };

  const exportToCSV = () => {
    const headers = [
      "Donor Name",
      "Email",
      "Mobile",
      "Amount",
      "Status",
      "PAN Card",
      "Aadhaar Card",
      "80G Benefit",
      "Order ID",
      "Payment ID",
      "Receipt",
      "Address",
      "City",
      "State",
      "Pincode",
      "Date",
    ];

    const csvData = filteredDonations.map((d) => [
      `"${(d.donorName || '').replace(/"/g, '""')}"`,
      `"${(d.email || '').replace(/"/g, '""')}"`,
      `"${d.mobile || ''}"`,
      d.amount || 0,
      d.status || 'pending',
      `"${d.pancard || d.pan || ''}"`,
      `"${d.aadhaar || ''}"`,
      d.taxBenefit || 'no',
      `"${d.orderId || ''}"`,
      `"${d.paymentId || ''}"`,
      `"${d.receipt || ''}"`,
      `"${(d.address || '').replace(/"/g, '""')}"`,
      `"${(d.city || '').replace(/"/g, '""')}"`,
      `"${(d.state || '').replace(/"/g, '""')}"`,
      `"${d.pincode || ''}"`,
      `"${new Date(d.createdAt || d.date || Date.now()).toLocaleString()}"`,
    ]);

    const csv = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donations_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalAmount = filteredDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const successfulDonations = filteredDonations.filter((d) => d.status === "success").length;
  const totalWithPan = filteredDonations.filter((d) => d.pancard || d.pan).length;
  const totalWithAadhaar = filteredDonations.filter((d) => d.aadhaar).length;

  return (
    <ProtectRoute>
      <AdminLayout>
        <Head>
          <title>Donations &amp; Compliance | Ekarth Admin</title>
        </Head>

        <div>
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Donation Records &amp; 80G Compliance</h1>
              <p className="text-gray-500 text-sm mt-1">Real-time overview of all online donations, PAN/Aadhaar identity records, and Razorpay statuses</p>
            </div>
            <button
              onClick={exportToCSV}
              className="px-4 py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export to CSV</span>
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Donors</p>
              <p className="text-2xl font-black text-gray-900 mt-1">{filteredDonations.length}</p>
              <span className="text-xs text-gray-500">All registered contributions</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs bg-emerald-50/30">
              <p className="text-emerald-800 text-xs font-bold uppercase tracking-wider">Successful Donations</p>
              <p className="text-2xl font-black text-emerald-700 mt-1">{successfulDonations}</p>
              <span className="text-xs text-emerald-600">Verified via Razorpay</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-xs bg-blue-50/30">
              <p className="text-blue-800 text-xs font-bold uppercase tracking-wider">Total Funds Raised</p>
              <p className="text-2xl font-black text-blue-700 mt-1">
                &#8377; {totalAmount.toLocaleString('en-IN')}
              </p>
              <span className="text-xs text-blue-600">Total collected amount</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-xs bg-purple-50/30">
              <p className="text-purple-800 text-xs font-bold uppercase tracking-wider">Govt ID Verified</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-purple-700">{totalWithPan + totalWithAadhaar}</span>
                <span className="text-xs text-purple-600">({totalWithPan} PAN / {totalWithAadhaar} Aadhaar)</span>
              </div>
              <span className="text-xs text-purple-600">80G Form 10BD eligible</span>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Search Any Record
                </label>
                <input
                  type="text"
                  placeholder="Search by Name, Email, Mobile, PAN, Aadhaar, Order ID, or Payment ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Status Filter
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="success">Success (Completed)</option>
                  <option value="created">Created (In Progress)</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Donations Table */}
          {loading ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500 font-medium">Loading donation records from database...</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Donor Details &amp; ID Proof
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Razorpay IDs
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Date &amp; Time
                      </th>
                      <th className="px-4 py-3.5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredDonations.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-4 py-12 text-center text-gray-500">
                          No matching donation records found.
                        </td>
                      </tr>
                    ) : (
                      filteredDonations.map((d) => {
                        const panNumber = d.pancard || d.pan;
                        const aadhaarNumber = d.aadhaar;
                        const recordDate = new Date(d.createdAt || d.date || Date.now());

                        return (
                          <tr key={d._id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="px-4 py-4">
                              <div>
                                <p className="font-bold text-gray-900 text-sm">{d.donorName}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {panNumber && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                      PAN: {panNumber}
                                    </span>
                                  )}
                                  {aadhaarNumber && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200">
                                      UID: {aadhaarNumber}
                                    </span>
                                  )}
                                  {!panNumber && !aadhaarNumber && (
                                    <span className="text-[11px] text-gray-400 italic">No ID proof</span>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-4">
                              <div className="text-xs">
                                <p className="text-gray-900 font-medium">{d.email}</p>
                                <p className="text-gray-500 font-mono mt-0.5">{d.mobile}</p>
                              </div>
                            </td>

                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className="text-base font-extrabold text-gray-900">
                                &#8377; {Number(d.amount || 0).toLocaleString('en-IN')}
                              </span>
                            </td>

                            <td className="px-4 py-4 whitespace-nowrap">
                              {getStatusBadge(d.status)}
                            </td>

                            <td className="px-4 py-4">
                              <div className="text-[11px] font-mono text-gray-600 space-y-0.5">
                                {d.orderId && (
                                  <p>
                                    <span className="font-semibold text-gray-500">Order:</span> {d.orderId}
                                  </p>
                                )}
                                {d.paymentId && (
                                  <p className="text-emerald-700 font-bold">
                                    <span className="font-semibold text-gray-500">Pay:</span> {d.paymentId}
                                  </p>
                                )}
                                {d.subscriptionId && (
                                  <p>
                                    <span className="font-semibold text-gray-500">Sub:</span> {d.subscriptionId}
                                  </p>
                                )}
                              </div>
                            </td>

                            <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-600">
                              <p className="font-medium text-gray-900">{recordDate.toLocaleDateString()}</p>
                              <p className="text-gray-400 text-[11px]">{recordDate.toLocaleTimeString()}</p>
                            </td>

                            <td className="px-4 py-4 text-center whitespace-nowrap">
                              <button
                                onClick={() => setSelectedDonation(d)}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 transition cursor-pointer"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Donation Full Details Modal */}
          {selectedDonation && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Donation Full Details</h2>
                      <p className="text-xs text-gray-500 mt-0.5">Reference ID: {selectedDonation._id}</p>
                    </div>
                    <button
                      onClick={() => setSelectedDonation(null)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="space-y-6 pt-5">
                    {/* Status and Amount Banner */}
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-emerald-800 uppercase">Donation Amount</span>
                        <p className="text-2xl font-black text-emerald-900 mt-0.5">
                          &#8377; {Number(selectedDonation.amount || 0).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500 block mb-1">Status</span>
                        {getStatusBadge(selectedDonation.status)}
                      </div>
                    </div>

                    {/* Donor & Compliance ID Proof */}
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
                        Donor Profile &amp; Government ID Proof
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-gray-50 p-4 rounded-2xl text-sm">
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Full Name</p>
                          <p className="font-bold text-gray-900 mt-0.5">{selectedDonation.donorName || '—'}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 font-medium">Email Address</p>
                          <p className="font-bold text-gray-900 mt-0.5">{selectedDonation.email || '—'}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 font-medium">Mobile Number</p>
                          <p className="font-bold font-mono text-gray-900 mt-0.5">{selectedDonation.mobile || '—'}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 font-medium">80G Tax Benefit</p>
                          <p className="font-bold text-emerald-700 mt-0.5">{(selectedDonation.taxBenefit || 'yes').toUpperCase()}</p>
                        </div>

                        <div className="sm:col-span-2 pt-2 border-t border-gray-200 flex flex-wrap gap-4">
                          <div>
                            <p className="text-xs text-gray-500 font-medium">PAN Card Number</p>
                            <p className="font-mono font-bold text-sm text-gray-900 bg-white px-3 py-1 rounded-lg border border-gray-200 mt-1 inline-block">
                              {selectedDonation.pancard || selectedDonation.pan || 'Not Provided'}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500 font-medium">Aadhaar Card Number</p>
                            <p className="font-mono font-bold text-sm text-gray-900 bg-white px-3 py-1 rounded-lg border border-gray-200 mt-1 inline-block">
                              {selectedDonation.aadhaar || 'Not Provided'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Gateway Information */}
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
                        Razorpay Gateway Information
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-2xl text-xs font-mono space-y-2">
                        <div className="flex justify-between items-center py-1 border-b border-gray-200">
                          <span className="text-gray-500 font-sans">Razorpay Order ID:</span>
                          <span className="font-bold text-gray-900">{selectedDonation.orderId || '—'}</span>
                        </div>

                        <div className="flex justify-between items-center py-1 border-b border-gray-200">
                          <span className="text-gray-500 font-sans">Payment ID:</span>
                          <span className="font-bold text-emerald-700">{selectedDonation.paymentId || '—'}</span>
                        </div>

                        {selectedDonation.receipt && (
                          <div className="flex justify-between items-center py-1 border-b border-gray-200">
                            <span className="text-gray-500 font-sans">Receipt Ref:</span>
                            <span className="font-bold text-gray-900">{selectedDonation.receipt}</span>
                          </div>
                        )}

                        {selectedDonation.signature && (
                          <div className="py-1">
                            <span className="text-gray-500 font-sans block mb-1">Payment Signature:</span>
                            <p className="text-[11px] text-gray-700 bg-white p-2 rounded border border-gray-200 break-all">
                              {selectedDonation.signature}
                            </p>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-1">
                          <span className="text-gray-500 font-sans">Created At:</span>
                          <span className="text-gray-900 font-sans">
                            {new Date(selectedDonation.createdAt || selectedDonation.date || Date.now()).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Address details */}
                    {(selectedDonation.address || selectedDonation.city || selectedDonation.state || selectedDonation.pincode) && (
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">
                          Address Details
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-2xl text-xs text-gray-700 leading-relaxed">
                          <p>{selectedDonation.address}</p>
                          <p className="font-medium mt-1">
                            {[selectedDonation.city, selectedDonation.state, selectedDonation.pincode, selectedDonation.country]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={() => setSelectedDonation(null)}
                      className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white font-bold text-xs rounded-xl transition cursor-pointer"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectRoute>
  );
}
