import { useEffect, useState } from "react";
import AdminLayout from '../../components/admin/AdminLayout';
import { ProtectRoute } from '../../contexts/AuthContext';

function AdminDonations() {
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
      setDonations(data);
      setFilteredDonations(data);
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

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (d) =>
          d.donorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.mobile?.includes(searchTerm) ||
          d.subscriptionId?.includes(searchTerm) ||
          d.paymentId?.includes(searchTerm)
      );
    }

    setFilteredDonations(filtered);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      success: "bg-green-100 text-green-800",
      active: "bg-blue-100 text-blue-800",
      created: "bg-yellow-100 text-yellow-800",
      pending: "bg-gray-100 text-gray-800",
      failed: "bg-red-100 text-red-800",
      cancelled: "bg-orange-100 text-orange-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status?.toUpperCase()}
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
      "Subscription ID",
      "Payment ID",
      "Plan ID",
      "PAN",
      "Address",
      "City",
      "State",
      "Pincode",
      "Date",
    ];

    const csvData = filteredDonations.map((d) => [
      d.donorName,
      d.email,
      d.mobile,
      d.amount,
      d.status,
      d.subscriptionId || "",
      d.paymentId || "",
      d.planId || "",
      d.pan || "",
      d.address || "",
      d.city || "",
      d.state || "",
      d.pincode || "",
      new Date(d.date).toLocaleString(),
    ]);

    const csv = [headers, ...csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donations_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const totalAmount = filteredDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const successfulDonations = filteredDonations.filter((d) => d.status === "success").length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-green-700 mb-2">Payment Records</h1>
        <p className="text-gray-600">Manage and view all donation transactions</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Donations</p>
          <p className="text-2xl font-bold text-gray-800">{filteredDonations.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Successful</p>
          <p className="text-2xl font-bold text-green-600">{successfulDonations}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Amount</p>
          <p className="text-2xl font-bold text-blue-600">₹{totalAmount.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Active Subscriptions</p>
          <p className="text-2xl font-bold text-purple-600">
            {filteredDonations.filter((d) => d.status === "active").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, email, mobile, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="active">Active</option>
              <option value="created">Created</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={exportToCSV}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Export to CSV
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading donations...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Donor Details
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Payment Info
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonations.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      No donations found
                    </td>
                  </tr>
                ) : (
                  filteredDonations.map((d) => (
                    <tr key={d._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{d.donorName}</p>
                          {d.pan && (
                            <p className="text-xs text-gray-500">PAN: {d.pan}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{d.email}</p>
                          <p className="text-gray-500">{d.mobile}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-lg font-semibold text-gray-900">
                          ₹{d.amount?.toLocaleString('en-IN')}
                        </p>
                      </td>
                      <td className="px-4 py-4">{getStatusBadge(d.status)}</td>
                      <td className="px-4 py-4">
                        <div className="text-xs text-gray-600">
                          {d.subscriptionId && (
                            <p className="mb-1">
                              <span className="font-medium">Sub:</span>{" "}
                              {d.subscriptionId.substring(0, 20)}...
                            </p>
                          )}
                          {d.paymentId && (
                            <p className="mb-1">
                              <span className="font-medium">Pay:</span>{" "}
                              {d.paymentId.substring(0, 20)}...
                            </p>
                          )}
                          {d.planId && (
                            <p>
                              <span className="font-medium">Plan:</span>{" "}
                              {d.planId.substring(0, 20)}...
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">
                            {new Date(d.date).toLocaleDateString()}
                          </p>
                          <p className="text-gray-500">
                            {new Date(d.date).toLocaleTimeString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => setSelectedDonation(d)}
                          className="text-green-600 hover:text-green-900 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Donation Details Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Donation Details</h2>
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Donor Name</p>
                    <p className="font-medium">{selectedDonation.donorName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedDonation.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mobile</p>
                    <p className="font-medium">{selectedDonation.mobile}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="font-medium text-lg text-green-600">
                      ₹{selectedDonation.amount?.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedDonation.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">
                      {new Date(selectedDonation.date).toLocaleString()}
                    </p>
                  </div>
                </div>

                <hr />

                <div>
                  <h3 className="font-semibold mb-2">Payment Information</h3>
                  <div className="space-y-2 text-sm">
                    {selectedDonation.subscriptionId && (
                      <div>
                        <p className="text-gray-600">Subscription ID</p>
                        <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                          {selectedDonation.subscriptionId}
                        </p>
                      </div>
                    )}
                    {selectedDonation.paymentId && (
                      <div>
                        <p className="text-gray-600">Payment ID</p>
                        <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                          {selectedDonation.paymentId}
                        </p>
                      </div>
                    )}
                    {selectedDonation.planId && (
                      <div>
                        <p className="text-gray-600">Plan ID</p>
                        <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                          {selectedDonation.planId}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <hr />

                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedDonation.dob && (
                      <div>
                        <p className="text-gray-600">Date of Birth</p>
                        <p className="font-medium">
                          {new Date(selectedDonation.dob).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {selectedDonation.pan && (
                      <div>
                        <p className="text-gray-600">PAN Number</p>
                        <p className="font-medium">{selectedDonation.pan}</p>
                      </div>
                    )}
                  </div>
                </div>

                {(selectedDonation.address || selectedDonation.city || selectedDonation.state) && (
                  <>
                    <hr />
                    <div>
                      <h3 className="font-semibold mb-2">Address</h3>
                      <div className="text-sm space-y-1">
                        {selectedDonation.address && <p>{selectedDonation.address}</p>}
                        <p>
                          {[selectedDonation.city, selectedDonation.state, selectedDonation.pincode]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                        <p>{selectedDonation.country || "India"}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProtectedAdminDonations() {
  return (
    <ProtectRoute>
      <AdminLayout>
        <AdminDonations />
      </AdminLayout>
    </ProtectRoute>
  );
}
