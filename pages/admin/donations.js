import { useEffect, useState } from 'react';
import Head from 'next/head';
import AdminLayout from '../../components/admin/AdminLayout';
import { ProtectRoute } from '../../contexts/AuthContext';

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // MULTIPLE FILTERS STATE
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [taxBenefitFilter, setTaxBenefitFilter] = useState('all');
  const [idProofFilter, setIdProofFilter] = useState('all');
  const [amountFilter, setAmountFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    applyMultipleFilters();
  }, [donations, searchTerm, statusFilter, taxBenefitFilter, idProofFilter, amountFilter, dateFilter, sortOrder]);

  const fetchDonations = async () => {
    try {
      const res = await fetch('/api/admin/donations');
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setDonations(list);
      setFilteredDonations(list);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching donations:', error);
      setLoading(false);
    }
  };

  const applyMultipleFilters = () => {
    let result = [...donations];

    // 1. Status Filter
    if (statusFilter !== 'all') {
      result = result.filter((d) => d.status === statusFilter);
    }

    // 2. 80G Tax Exemption Filter
    if (taxBenefitFilter !== 'all') {
      result = result.filter((d) => (d.taxBenefit || 'no') === taxBenefitFilter);
    }

    // 3. ID Proof Verification Filter
    if (idProofFilter === 'both') {
      result = result.filter((d) => (d.pancard || d.pan) && d.aadhaar);
    } else if (idProofFilter === 'pan') {
      result = result.filter((d) => d.pancard || d.pan);
    } else if (idProofFilter === 'aadhaar') {
      result = result.filter((d) => d.aadhaar);
    } else if (idProofFilter === 'missing') {
      result = result.filter((d) => !(d.pancard || d.pan) || !d.aadhaar);
    }

    // 4. Amount Range Filter
    if (amountFilter === 'under1000') {
      result = result.filter((d) => (Number(d.amount) || 0) < 1000);
    } else if (amountFilter === '1000to5000') {
      result = result.filter((d) => (Number(d.amount) || 0) >= 1000 && (Number(d.amount) || 0) <= 5000);
    } else if (amountFilter === '5000to10000') {
      result = result.filter((d) => (Number(d.amount) || 0) > 5000 && (Number(d.amount) || 0) <= 10000);
    } else if (amountFilter === 'above10000') {
      result = result.filter((d) => (Number(d.amount) || 0) > 10000);
    }

    // 5. Date Range Filter
    if (dateFilter !== 'all') {
      const now = new Date();
      result = result.filter((d) => {
        const dDate = new Date(d.createdAt || d.date || Date.now());
        if (dateFilter === 'today') {
          return dDate.toDateString() === now.toDateString();
        } else if (dateFilter === '7days') {
          return (now - dDate) <= 7 * 24 * 60 * 60 * 1000;
        } else if (dateFilter === '30days') {
          return (now - dDate) <= 30 * 24 * 60 * 60 * 1000;
        } else if (dateFilter === 'thisMonth') {
          return dDate.getMonth() === now.getMonth() && dDate.getFullYear() === now.getFullYear();
        }
        return true;
      });
    }

    // 6. Comprehensive Text Search across ALL fields
    if (searchTerm) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(
        (d) =>
          (d.donorName || '').toLowerCase().includes(q) ||
          (d.email || '').toLowerCase().includes(q) ||
          (d.mobile || '').includes(q) ||
          (d.pancard || d.pan || '').toLowerCase().includes(q) ||
          (d.aadhaar || '').toLowerCase().includes(q) ||
          (d.orderId || '').toLowerCase().includes(q) ||
          (d.paymentId || '').toLowerCase().includes(q) ||
          (d.subscriptionId || '').toLowerCase().includes(q) ||
          (d.address || '').toLowerCase().includes(q) ||
          (d.city || '').toLowerCase().includes(q) ||
          (d.state || '').toLowerCase().includes(q) ||
          (d.pincode || '').includes(q)
      );
    }

    // 7. Sort Order
    if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0));
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt || a.date || 0) - new Date(b.createdAt || b.date || 0));
    } else if (sortOrder === 'amount_high') {
      result.sort((a, b) => (Number(b.amount) || 0) - (Number(a.amount) || 0));
    } else if (sortOrder === 'amount_low') {
      result.sort((a, b) => (Number(a.amount) || 0) - (Number(b.amount) || 0));
    }

    setFilteredDonations(result);
  };

  const resetAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTaxBenefitFilter('all');
    setIdProofFilter('all');
    setAmountFilter('all');
    setDateFilter('all');
    setSortOrder('newest');
  };

  const activeFiltersCount = [
    searchTerm ? 1 : 0,
    statusFilter !== 'all' ? 1 : 0,
    taxBenefitFilter !== 'all' ? 1 : 0,
    idProofFilter !== 'all' ? 1 : 0,
    amountFilter !== 'all' ? 1 : 0,
    dateFilter !== 'all' ? 1 : 0,
    sortOrder !== 'newest' ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const getStatusBadge = (status) => {
    const statusColors = {
      success: 'bg-green-100 text-green-800 border border-green-300',
      active: 'bg-blue-100 text-blue-800 border border-blue-300',
      created: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
      pending: 'bg-gray-100 text-gray-800 border border-gray-300',
      failed: 'bg-red-100 text-red-800 border border-red-300',
      cancelled: 'bg-orange-100 text-orange-800 border border-orange-300',
    };

    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
          statusColors[status] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {(status || 'PENDING').toUpperCase()}
      </span>
    );
  };

  const exportToCSV = () => {
    const headers = [
      'Donor Name',
      'Email',
      'Mobile',
      'Amount (INR)',
      'Status',
      'PAN Card',
      'Aadhaar Card',
      '80G Benefit',
      'Razorpay Order ID',
      'Payment ID',
      'Receipt Ref',
      'Address',
      'City',
      'State',
      'Pincode',
      'Country',
      'Date & Time',
    ];

    const csvData = filteredDonations.map((d) => [
      '"' + (d.donorName || '').replace(/"/g, '""') + '"',
      '"' + (d.email || '').replace(/"/g, '""') + '"',
      '"' + (d.mobile || '') + '"',
      d.amount || 0,
      d.status || 'pending',
      '"' + (d.pancard || d.pan || '') + '"',
      '"' + (d.aadhaar || '') + '"',
      d.taxBenefit || 'no',
      '"' + (d.orderId || '') + '"',
      '"' + (d.paymentId || '') + '"',
      '"' + (d.receipt || '') + '"',
      '"' + (d.address || '').replace(/"/g, '""') + '"',
      '"' + (d.city || '').replace(/"/g, '""') + '"',
      '"' + (d.state || '').replace(/"/g, '""') + '"',
      '"' + (d.pincode || '') + '"',
      '"' + (d.country || 'India') + '"',
      '"' + new Date(d.createdAt || d.date || Date.now()).toLocaleString() + '"',
    ]);

    const csv = [headers.join(','), ...csvData.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ekarth-donations-' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalAmount = filteredDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const successfulDonations = filteredDonations.filter((d) => d.status === 'success').length;
  const total80GRequests = filteredDonations.filter((d) => d.taxBenefit === 'yes').length;
  const totalBothIdVerified = filteredDonations.filter((d) => (d.pancard || d.pan) && d.aadhaar).length;

  return (
    <ProtectRoute>
      <AdminLayout>
        <Head>
          <title>Donations &amp; 80G Compliance | Ekarth Admin</title>
        </Head>

        <div className='space-y-6'>
          {/* Top Title & Quick Actions */}
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>
                Donation Records &amp; 80G Compliance
              </h1>
              <p className='text-gray-500 text-sm mt-1'>
                Showing all form fields: Full Name, Contact, Address, PAN Card, Aadhaar Card, 80G Tax Exemption, and Razorpay IDs.
              </p>
            </div>
            <div className='flex items-center gap-2.5 flex-wrap'>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className='px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl border border-gray-300 transition cursor-pointer flex items-center gap-1.5'
                >
                  <span>Reset Filters</span>
                  <span className='w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold'>
                    {activeFiltersCount}
                  </span>
                </button>
              )}
              <button
                onClick={exportToCSV}
                className='px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-bold text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
                </svg>
                <span>Export CSV ({filteredDonations.length})</span>
              </button>
            </div>
          </div>

          {/* Metric Stats Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='bg-white p-5 rounded-2xl border border-gray-200 shadow-xs'>
              <p className='text-gray-500 text-xs font-bold uppercase tracking-wider'>Total Donors</p>
              <p className='text-2xl font-black text-gray-900 mt-1'>{filteredDonations.length}</p>
              <span className='text-xs text-gray-500'>Matching active filters</span>
            </div>

            <div className='bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs bg-emerald-50/20'>
              <p className='text-emerald-800 text-xs font-bold uppercase tracking-wider'>Successful Payments</p>
              <p className='text-2xl font-black text-emerald-700 mt-1'>{successfulDonations}</p>
              <span className='text-xs text-emerald-600'>Verified via Razorpay</span>
            </div>

            <div className='bg-white p-5 rounded-2xl border border-blue-200 shadow-xs bg-blue-50/20'>
              <p className='text-blue-800 text-xs font-bold uppercase tracking-wider'>Total Funds Raised</p>
              <p className='text-2xl font-black text-blue-700 mt-1'>
                &#8377; {totalAmount.toLocaleString('en-IN')}
              </p>
              <span className='text-xs text-blue-600'>Filtered contributions</span>
            </div>

            <div className='bg-white p-5 rounded-2xl border border-purple-200 shadow-xs bg-purple-50/20'>
              <p className='text-purple-800 text-xs font-bold uppercase tracking-wider'>Both PAN &amp; UID Verified</p>
              <div className='flex items-baseline gap-2 mt-1'>
                <span className='text-2xl font-black text-purple-700'>{totalBothIdVerified}</span>
                <span className='text-xs text-purple-600'>({total80GRequests} opted 80G)</span>
              </div>
              <span className='text-xs text-purple-600'>100% Non-Profit Compliant</span>
            </div>
          </div>

          {/* ADVANCED MULTIPLE FILTERS PANEL */}
          <div className='bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4'>
            <div className='flex items-center justify-between border-b border-gray-100 pb-3'>
              <div className='flex items-center gap-2'>
                <svg className='w-4 h-4 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
                </svg>
                <span className='text-sm font-bold text-gray-900'>Multiple Filter Controls</span>
                {activeFiltersCount > 0 && (
                  <span className='text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200'>
                    {activeFiltersCount} Active
                  </span>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className='text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer'
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Row 1: Search, Status, 80G */} 
            <div className='grid grid-cols-1 md:grid-cols-12 gap-3'>
              <div className='md:col-span-6'>
                <label className='block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1'>
                  Search Any Field (Name, Contact, Address, PAN, UID, IDs)
                </label>
                <input
                  type='text'
                  placeholder='Type to search by Name, Email, Mobile, PAN, Aadhaar, City, State, Order/Pay ID...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm'
                />
              </div>

              <div className='md:col-span-3'>
                <label className='block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1'>
                  Payment Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white'
                >
                  <option value='all'>All Statuses</option>
                  <option value='success'>Success (Completed)</option>
                  <option value='created'>Created (In Progress)</option>
                  <option value='pending'>Pending</option>
                  <option value='failed'>Failed</option>
                </select>
              </div>

              <div className='md:col-span-3'>
                <label className='block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1'>
                  80G Tax Benefit
                </label>
                <select
                  value={taxBenefitFilter}
                  onChange={(e) => setTaxBenefitFilter(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white'
                >
                  <option value='all'>All (80G Yes &amp; No)</option>
                  <option value='yes'>80G Requested (Yes)</option>
                  <option value='no'>80G Not Requested (No)</option>
                </select>
              </div>
            </div>

            {/* Row 2: ID Proof, Amount Range, Date Timeframe, Sort */} 
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1'>
              <div>
                <label className='block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1'>
                  Government ID Proof
                </label>
                <select
                  value={idProofFilter}
                  onChange={(e) => setIdProofFilter(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white'
                >
                  <option value='all'>All Records</option>
                  <option value='both'>Both PAN &amp; Aadhaar Present</option>
                  <option value='pan'>Has PAN Card</option>
                  <option value='aadhaar'>Has Aadhaar Card</option>
                  <option value='missing'>Missing either ID</option>
                </select>
              </div>

              <div>
                <label className='block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1'>
                  Donation Amount Range
                </label>
                <select
                  value={amountFilter}
                  onChange={(e) => setAmountFilter(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white'
                >
                  <option value='all'>All Amount Ranges</option>
                  <option value='under1000'>Under &#8377; 1,000</option>
                  <option value='1000to5000'>&#8377; 1,000 &ndash; &#8377; 5,000</option>
                  <option value='5000to10000'>&#8377; 5,000 &ndash; &#8377; 10,000</option>
                  <option value='above10000'>Above &#8377; 10,000</option>
                </select>
              </div>

              <div>
                <label className='block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1'>
                  Date Period
                </label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white'
                >
                  <option value='all'>All Time</option>
                  <option value='today'>Today</option>
                  <option value='7days'>Last 7 Days</option>
                  <option value='30days'>Last 30 Days</option>
                  <option value='thisMonth'>This Month</option>
                </select>
              </div>

              <div>
                <label className='block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1'>
                  Sort Order
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white'
                >
                  <option value='newest'>Newest First (Default)</option>
                  <option value='oldest'>Oldest First</option>
                  <option value='amount_high'>Amount: High to Low</option>
                  <option value='amount_low'>Amount: Low to High</option>
                </select>
              </div>
            </div>

            {/* Active filter summary bar */}
            <div className='flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100'>
              <span>
                Showing <strong className='text-gray-900'>{filteredDonations.length}</strong> of{' '}
                <strong className='text-gray-900'>{donations.length}</strong> total donations
              </span>
              <span>
                Filtered Sum: <strong className='text-emerald-700 font-bold'>&#8377; {totalAmount.toLocaleString('en-IN')}</strong>
              </span>
            </div>
          </div>

          {/* ALL DONATION DETAILS TABLE */}
          {loading ? (
            <div className='text-center py-12 bg-white rounded-2xl border border-gray-200'>
              <p className='text-gray-500 font-medium'>Loading donation records from database...</p>
            </div>
          ) : (
            <div className='bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200 text-sm'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-4 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                        Donor &amp; ID Proofs
                      </th>
                      <th className='px-4 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                        Contact
                      </th>
                      <th className='px-4 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                        Address &amp; Location
                      </th>
                      <th className='px-4 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                        Amount &amp; 80G
                      </th>
                      <th className='px-4 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-4 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                        Razorpay IDs
                      </th>
                      <th className='px-4 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                        Date &amp; Time
                      </th>
                      <th className='px-4 py-3.5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-100'>
                    {filteredDonations.length === 0 ? (
                      <tr>
                        <td colSpan='8' className='px-4 py-12 text-center text-gray-500'>
                          No matching donation records found for the selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredDonations.map((d) => {
                        const panNumber = d.pancard || d.pan;
                        const aadhaarNumber = d.aadhaar;
                        const recordDate = new Date(d.createdAt || d.date || Date.now());
                        const hasAddress = d.address || d.city || d.state || d.pincode;

                        return (
                          <tr key={d._id} className='hover:bg-gray-50/80 transition-colors'>
                            {/* 1. Donor Name & Both IDs */}
                            <td className='px-4 py-4'>
                              <div>
                                <p className='font-bold text-gray-900 text-sm'>{d.donorName}</p>
                                <div className='flex flex-wrap items-center gap-1.5 mt-1.5'>
                                  {panNumber ? (
                                    <span className='inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200'>
                                      PAN: {panNumber}
                                    </span>
                                  ) : (
                                    <span className='text-[10px] text-rose-500 italic'>No PAN</span>
                                  )}

                                  {aadhaarNumber ? (
                                    <span className='inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200'>
                                      UID: {aadhaarNumber}
                                    </span>
                                  ) : (
                                    <span className='text-[10px] text-rose-500 italic'>No UID</span>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* 2. Contact Details */}
                            <td className='px-4 py-4'>
                              <div className='text-xs'>
                                <p className='text-gray-900 font-medium break-all'>{d.email}</p>
                                <p className='text-gray-500 font-mono mt-0.5'>{d.mobile}</p>
                              </div>
                            </td>

                            {/* 3. Address & Location Details (All Form fields) */}
                            <td className='px-4 py-4 max-w-xs'>
                              {hasAddress ? (
                                <div className='text-xs text-gray-700 leading-tight space-y-0.5'>
                                  {d.address && <p className='font-medium text-gray-900 truncate'>{d.address}</p>}
                                  <p className='text-gray-500 text-[11px]'>
                                    {[d.city, d.state, d.pincode].filter(Boolean).join(', ')}
                                  </p>
                                </div>
                              ) : (
                                <span className='text-xs text-gray-400 italic'>Not provided</span>
                              )}
                            </td>

                            {/* 4. Amount & 80G Benefit Status */}
                            <td className='px-4 py-4 whitespace-nowrap'>
                              <div>
                                <span className='text-base font-extrabold text-gray-900'>
                                  &#8377; {Number(d.amount || 0).toLocaleString('en-IN')}
                                </span>
                                <div className='mt-1'>
                                  {d.taxBenefit === 'yes' ? (
                                    <span className='inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300'>
                                      80G: YES
                                    </span>
                                  ) : (
                                    <span className='inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200'>
                                      80G: NO
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* 5. Status */}
                            <td className='px-4 py-4 whitespace-nowrap'>
                              {getStatusBadge(d.status)}
                            </td>

                            {/* 6. Razorpay Gateway IDs */}
                            <td className='px-4 py-4'>
                              <div className='text-[11px] font-mono text-gray-600 space-y-0.5'>
                                {d.orderId && (
                                  <p className='truncate max-w-[160px]' title={d.orderId}>
                                    <span className='font-semibold text-gray-500'>Order:</span> {d.orderId}
                                  </p>
                                )}
                                {d.paymentId && (
                                  <p className='text-emerald-700 font-bold truncate max-w-[160px]' title={d.paymentId}>
                                    <span className='font-semibold text-gray-500'>Pay:</span> {d.paymentId}
                                  </p>
                                )}
                                {d.subscriptionId && (
                                  <p className='truncate max-w-[160px]' title={d.subscriptionId}>
                                    <span className='font-semibold text-gray-500'>Sub:</span> {d.subscriptionId}
                                  </p>
                                )}
                              </div>
                            </td>

                            {/* 7. Date & Time */}
                            <td className='px-4 py-4 whitespace-nowrap text-xs text-gray-600'>
                              <p className='font-medium text-gray-900'>{recordDate.toLocaleDateString()}</p>
                              <p className='text-gray-400 text-[11px]'>{recordDate.toLocaleTimeString()}</p>
                            </td>

                            {/* 8. Action: Full Details Popup */}
                            <td className='px-4 py-4 text-center whitespace-nowrap'>
                              <button
                                onClick={() => setSelectedDonation(d)}
                                className='px-3 py-1.5 rounded-lg text-xs font-bold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 transition cursor-pointer'
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

          {/* COMPREHENSIVE FULL DONOR MODAL */}
          {selectedDonation && (
            <div className='fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4'>
              <div className='bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100'>
                <div className='p-6 md:p-8'>
                  <div className='flex justify-between items-center pb-4 border-b border-gray-100'>
                    <div>
                      <h2 className='text-2xl font-bold text-gray-900'>Donation Full Details</h2>
                      <p className='text-xs text-gray-500 mt-0.5 font-mono'>Reference ID: {selectedDonation._id}</p>
                    </div>
                    <button
                      onClick={() => setSelectedDonation(null)}
                      className='w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition cursor-pointer'
                    >
                      &times;
                    </button>
                  </div>

                  <div className='space-y-6 pt-5'>
                    {/* Status & Amount */}
                    <div className='bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between'>
                      <div>
                        <span className='text-xs font-bold text-emerald-800 uppercase'>Donation Amount</span>
                        <p className='text-2xl font-black text-emerald-900 mt-0.5'>
                          &#8377; {Number(selectedDonation.amount || 0).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div className='text-right'>
                        <span className='text-xs text-gray-500 block mb-1'>Payment Status</span>
                        {getStatusBadge(selectedDonation.status)}
                      </div>
                    </div>

                    {/* Donor Profile & Compulsory IDs */}
                    <div>
                      <h3 className='text-xs font-black uppercase tracking-wider text-gray-400 mb-3'>
                        Donor Identity &amp; Government ID Proofs
                      </h3>
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-gray-50 p-4 rounded-2xl text-sm'>
                        <div>
                          <p className='text-xs text-gray-500 font-medium'>Full Name</p>
                          <p className='font-bold text-gray-900 mt-0.5'>{selectedDonation.donorName || '—'}</p>
                        </div>

                        <div>
                          <p className='text-xs text-gray-500 font-medium'>Email Address</p>
                          <p className='font-bold text-gray-900 mt-0.5'>{selectedDonation.email || '—'}</p>
                        </div>

                        <div>
                          <p className='text-xs text-gray-500 font-medium'>Mobile Number</p>
                          <p className='font-bold font-mono text-gray-900 mt-0.5'>{selectedDonation.mobile || '—'}</p>
                        </div>

                        <div>
                          <p className='text-xs text-gray-500 font-medium'>80G Tax Exemption Benefit</p>
                          <p className='mt-0.5 font-bold'>
                            {selectedDonation.taxBenefit === 'yes' ? (
                              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300'>
                                YES (80G Certificate Requested)
                              </span>
                            ) : (
                              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-300'>
                                NO (Not Requested)
                              </span>
                            )}
                          </p>
                        </div>

                        {/* Government ID Proofs */}
                        <div className='sm:col-span-2 pt-2 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                          <div>
                            <p className='text-xs text-gray-500 font-medium'>PAN Card Number</p>
                            <p className='font-mono font-bold text-sm text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200 mt-1'>
                              {selectedDonation.pancard || selectedDonation.pan || 'Not Provided'}
                            </p>
                          </div>

                          <div>
                            <p className='text-xs text-gray-500 font-medium'>Aadhaar Card Number</p>
                            <p className='font-mono font-bold text-sm text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200 mt-1'>
                              {selectedDonation.aadhaar || 'Not Provided'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Full Address Details */}
                    <div>
                      <h3 className='text-xs font-black uppercase tracking-wider text-gray-400 mb-2'>
                        Donor Address &amp; Location Details
                      </h3>
                      <div className='bg-gray-50 p-4 rounded-2xl text-xs text-gray-800 space-y-1'>
                        <p><span className='font-semibold text-gray-500'>Street Address:</span> {selectedDonation.address || '—'}</p>
                        <p><span className='font-semibold text-gray-500'>City:</span> {selectedDonation.city || '—'}</p>
                        <p><span className='font-semibold text-gray-500'>State:</span> {selectedDonation.state || '—'}</p>
                        <p><span className='font-semibold text-gray-500'>Pincode:</span> {selectedDonation.pincode || '—'}</p>
                        <p><span className='font-semibold text-gray-500'>Country:</span> {selectedDonation.country || 'India'}</p>
                      </div>
                    </div>

                    {/* Razorpay Gateway Information */}
                    <div>
                      <h3 className='text-xs font-black uppercase tracking-wider text-gray-400 mb-3'>
                        Razorpay Gateway Audit Information
                      </h3>
                      <div className='bg-gray-50 p-4 rounded-2xl text-xs font-mono space-y-2'>
                        <div className='flex justify-between items-center py-1 border-b border-gray-200'>
                          <span className='text-gray-500 font-sans'>Razorpay Order ID:</span>
                          <span className='font-bold text-gray-900'>{selectedDonation.orderId || '—'}</span>
                        </div>

                        <div className='flex justify-between items-center py-1 border-b border-gray-200'>
                          <span className='text-gray-500 font-sans'>Payment ID:</span>
                          <span className='font-bold text-emerald-700'>{selectedDonation.paymentId || '—'}</span>
                        </div>

                        {selectedDonation.receipt && (
                          <div className='flex justify-between items-center py-1 border-b border-gray-200'>
                            <span className='text-gray-500 font-sans'>Receipt Ref:</span>
                            <span className='font-bold text-gray-900'>{selectedDonation.receipt}</span>
                          </div>
                        )}

                        {selectedDonation.signature && (
                          <div className='py-1'>
                            <span className='text-gray-500 font-sans block mb-1'>Payment Signature:</span>
                            <p className='text-[11px] text-gray-700 bg-white p-2 rounded border border-gray-200 break-all'>
                              {selectedDonation.signature}
                            </p>
                          </div>
                        )}

                        <div className='flex justify-between items-center pt-1'>
                          <span className='text-gray-500 font-sans'>Payment Timestamp:</span>
                          <span className='text-gray-900 font-sans'>
                            {new Date(selectedDonation.createdAt || selectedDonation.date || Date.now()).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-8 pt-4 border-t border-gray-100 flex justify-end'>
                    <button
                      onClick={() => setSelectedDonation(null)}
                      className='px-5 py-2.5 bg-gray-900 hover:bg-black text-white font-bold text-xs rounded-xl transition cursor-pointer'
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