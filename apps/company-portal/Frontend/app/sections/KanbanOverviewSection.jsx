"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export default function KanbanOverviewSection({
  searchTerm,
  onSearch,
  pageProjects,
  currentPage,
  totalPages,
  pageNumbers,
  onPageChange,
  onView
}) {
  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(event) => onSearch(event.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[var(--surface-muted)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="bg-[var(--surface)] rounded-2xl shadow-sm border border-[var(--border-soft)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-muted)] border-b border-[var(--border-soft)]">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  PID
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Proposal name
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  For more
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pageProjects.map((project) => (
                <tr
                  key={project.pid}
                  className="hover:bg-[var(--surface-muted)] transition-colors"
                >
                  <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                    {project.pid}
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {project.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {project.description}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => onView(project)}
                      className="inline-flex items-center px-4 py-2 bg-[var(--accent-purple-200)] hover:bg-[var(--accent-purple)] text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pageProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No projects found matching your search.</p>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[var(--border-soft)] bg-[var(--surface-muted)]">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-[var(--surface)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {pageNumbers.map((page, index) => (
            <button
              key={`${page}-${index}`}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-[var(--primary)] text-white"
                  : page === "..."
                  ? "cursor-default text-gray-400"
                  : "hover:bg-[var(--surface)] text-gray-600"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-[var(--surface)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
