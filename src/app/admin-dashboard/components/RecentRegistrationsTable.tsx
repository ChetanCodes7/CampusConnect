'use client';
import React, { useState } from 'react';
import Badge from '@/components/ui/Badge';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisHorizontalIcon,
  ChevronUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

const registrations = [
  {
    id: 'reg-001',
    studentId: 'DEU2025CS031',
    name: 'Park Min-jun',
    college: 'ICT Engineering',
    department: 'Computer Science',
    year: '1st Year',
    enrollDate: '2025.06.28',
    status: 'active',
    cgpa: null,
    email: '2025cs031@deu.ac.kr',
  },
  {
    id: 'reg-002',
    studentId: 'DEU2025BZ018',
    name: 'Lee Soo-yeon',
    college: 'Business & Economics',
    department: 'Business Administration',
    year: '1st Year',
    enrollDate: '2025.06.28',
    status: 'pending',
    cgpa: null,
    email: '2025bz018@deu.ac.kr',
  },
  {
    id: 'reg-003',
    studentId: 'DEU2024NR042',
    name: 'Choi Hye-jin',
    college: 'Nursing & Healthcare',
    department: 'Nursing Science',
    year: '2nd Year',
    enrollDate: '2025.06.27',
    status: 'active',
    cgpa: 3.72,
    email: '2024nr042@deu.ac.kr',
  },
  {
    id: 'reg-004',
    studentId: 'DEU2023ENG015',
    name: 'Kim Dong-hyun',
    college: 'Engineering',
    department: 'Mechanical Engineering',
    year: '3rd Year',
    enrollDate: '2025.06.27',
    status: 'active',
    cgpa: 3.41,
    email: '2023eng015@deu.ac.kr',
  },
  {
    id: 'reg-005',
    studentId: 'DEU2025ART009',
    name: 'Jung Ye-eun',
    college: 'Art, Design & Sport',
    department: 'Visual Design',
    year: '1st Year',
    enrollDate: '2025.06.26',
    status: 'active',
    cgpa: null,
    email: '2025art009@deu.ac.kr',
  },
  {
    id: 'reg-006',
    studentId: 'DEU2022HUM028',
    name: 'Yoon Jae-won',
    college: 'Humanities & Social',
    department: 'English Language',
    year: '4th Year',
    enrollDate: '2025.06.26',
    status: 'suspended',
    cgpa: 2.88,
    email: '2022hum028@deu.ac.kr',
  },
  {
    id: 'reg-007',
    studentId: 'DEU2024ICT055',
    name: 'Oh Sung-min',
    college: 'IT Convergence',
    department: 'IT Convergence Engineering',
    year: '2nd Year',
    enrollDate: '2025.06.25',
    status: 'active',
    cgpa: 3.65,
    email: '2024ict055@deu.ac.kr',
  },
  {
    id: 'reg-008',
    studentId: 'DEU2025MAT003',
    name: 'Han Ji-na',
    college: 'Components & Materials',
    department: 'Materials Engineering',
    year: '1st Year',
    enrollDate: '2025.06.25',
    status: 'pending',
    cgpa: null,
    email: '2025mat003@deu.ac.kr',
  },
];

const statusMap: Record<string, { variant: 'success' | 'warning' | 'danger' | 'neutral'; label: string }> = {
  active: { variant: 'success', label: 'Active' },
  pending: { variant: 'warning', label: 'Pending' },
  suspended: { variant: 'danger', label: 'Suspended' },
  inactive: { variant: 'neutral', label: 'Inactive' },
};

export default function RecentRegistrationsTable() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = registrations.filter((r) => {
    const matchSearch =
      search === '' ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.studentId.toLowerCase().includes(search.toLowerCase()) ||
      r.department.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === paginated.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginated.map((r) => r.id));
    }
  };

  return (
    <div className="card-base overflow-hidden">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-border">
        <div>
          <h2 className="section-header">Recent Registrations</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} students · updated 21:11 KST</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search students..."
              className="input-field pl-8 py-2 text-xs w-full sm:w-48"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
              className="input-field py-2 text-xs pr-8 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <FunnelIcon className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          {/* Export */}
          <button className="btn-outline py-2 px-3 text-xs flex items-center gap-1.5 flex-shrink-0">
            <ArrowDownTrayIcon className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedRows.length > 0 && (
        <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/5 border-b border-primary/10 animate-slide-up">
          <span className="text-xs font-semibold text-primary">{selectedRows.length} selected</span>
          <div className="flex items-center gap-2">
            <button className="text-xs text-success font-medium hover:underline">Approve</button>
            <span className="text-border">·</span>
            <button className="text-xs text-warning font-medium hover:underline">Suspend</button>
            <span className="text-border">·</span>
            <button className="text-xs text-danger font-medium hover:underline">Remove</button>
          </div>
          <button
            onClick={() => setSelectedRows([])}
            className="ml-auto text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left w-10">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary cursor-pointer"
                  checked={selectedRows.length === paginated.length && paginated.length > 0}
                  onChange={toggleAll}
                />
              </th>
              {['Student', 'College / Department', 'Year', 'Enrollment Date', 'CGPA', 'Status', ''].map((col, i) => (
                <th
                  key={`th-${i}`}
                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    {col}
                    {col && col !== '' && <ChevronUpDownIcon className="w-3 h-3 opacity-40" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <MagnifyingGlassIcon className="w-8 h-8 text-muted-foreground/40" />
                    <p className="text-sm font-medium text-muted-foreground">No students match your search</p>
                    <p className="text-xs text-muted-foreground">Try adjusting your search term or filter</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((reg) => {
                const status = statusMap[reg.status];
                const isSelected = selectedRows.includes(reg.id);
                return (
                  <tr
                    key={reg.id}
                    className={`hover:bg-muted/40 transition-colors ${isSelected ? 'bg-primary/5' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary cursor-pointer"
                        checked={isSelected}
                        onChange={() => toggleRow(reg.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{
                            backgroundColor: [
                              '#1B3A6B', '#10B981', '#F5A623', '#3B82F6', '#8B5CF6', '#EF4444', '#06B6D4', '#F59E0B',
                            ][registrations.findIndex((r) => r.id === reg.id) % 8],
                          }}
                        >
                          {reg.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground whitespace-nowrap">{reg.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{reg.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-foreground whitespace-nowrap">{reg.college}</p>
                      <p className="text-xs text-muted-foreground">{reg.department}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground whitespace-nowrap">{reg.year}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-muted-foreground font-mono">{reg.enrollDate}</span>
                    </td>
                    <td className="px-4 py-3">
                      {reg.cgpa !== null ? (
                        <span className={`text-sm font-semibold font-tabular ${reg.cgpa >= 3.5 ? 'text-success' : reg.cgpa >= 3.0 ? 'text-primary' : 'text-warning'}`}>
                          {reg.cgpa.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={status.variant} dot>{status.label}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="More actions"
                          aria-label={`Actions for ${reg.name}`}
                        >
                          <EllipsisHorizontalIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="More actions"
                        aria-label={`Actions for ${reg.name}`}
                      >
                        <EllipsisHorizontalIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length} registrations
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={`page-${i + 1}`}
              onClick={() => setPage(i + 1)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                page === i + 1
                  ? 'bg-primary text-white' :'text-muted-foreground hover:bg-muted'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}