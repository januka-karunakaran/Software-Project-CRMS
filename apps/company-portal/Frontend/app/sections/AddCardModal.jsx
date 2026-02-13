"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AddCardModal({
  show,
  initialData = { title: "", tag: "", description: "", date: "", attachments: [] },
  onCancel,
  onSave
}) {
  const [form, setForm] = useState(() => ({
    ...initialData,
    date: initialData.date || new Date().toISOString().slice(0, 10)
  }));
  const fileInputRef = useRef(null);

  useEffect(() => {
    setForm({
      ...initialData,
      date: initialData.date || new Date().toISOString().slice(0, 10)
    });
  }, [initialData, show]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onCancel?.();
    };
    if (show) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, onCancel]);

  if (!show) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiles = (event) => {
    const files = Array.from(event.target.files || []);
    setForm((prev) => ({
      ...prev,
      attachments: [...(prev.attachments || []), ...files.map((file) => file.name)]
    }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files || []);
    if (files.length) {
      setForm((prev) => ({
        ...prev,
        attachments: [...(prev.attachments || []), ...files.map((file) => file.name)]
      }));
    }
  };

  const prevent = (event) => event.preventDefault();

  const handleSave = () => {
    if (!form.title?.trim()) return;
    onSave?.(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onMouseDown={onCancel} />

      <div className="relative w-full max-w-2xl mx-4 bg-[var(--surface)] rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Create New Ticket
        </h3>

        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 w-full px-3 py-2 border rounded-md"
              placeholder="Enter task details"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assign To
              </label>
              <select
                name="assignee"
                value={form.assignee || ""}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Assignee</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                name="tag"
                value={form.tag || "High"}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={form.status || "todo"}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md"
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date || ""}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Attachment
            </label>
            <div className="mt-1 flex items-center">
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={prevent}
                onDragEnter={prevent}
                onDrop={handleDrop}
                className="inline-flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer bg-white hover:bg-gray-50 text-sm text-gray-700"
              >
                <span>Upload File</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFiles}
                className="hidden"
              />
            </div>

            {form.attachments && form.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {form.attachments.map((name, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 text-sm text-gray-700 px-2 py-1 rounded-full"
                  >
                    <span className="max-w-[240px] truncate">{name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          attachments: prev.attachments.filter((_, idx) => idx !== index)
                        }))
                      }
                      className="text-gray-500 hover:text-gray-700"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-[var(--border-soft)] rounded-md text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-600)] text-white rounded-md"
            >
              Create Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
