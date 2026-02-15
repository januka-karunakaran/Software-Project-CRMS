"use client";

import React from "react";

export default function CreateProposalSection({
  newProposal,
  setNewProposal,
  showTimeline,
  setShowTimeline,
  showBudget,
  setShowBudget,
  timelineData,
  setTimelineData,
  budgetData,
  setBudgetData,
  onClear,
  onSubmit
}) {
  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        New Project Proposal
      </h1>
      <div className="space-y-4 bg-white p-8 rounded-lg shadow-sm border border-slate-100">
        <div>
          <input
            value={newProposal.title}
            onChange={(event) =>
              setNewProposal({ ...newProposal, title: event.target.value })
            }
            placeholder="Project title *"
            className="w-full p-4 rounded bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <input
            value={newProposal.client}
            onChange={(event) =>
              setNewProposal({ ...newProposal, client: event.target.value })
            }
            placeholder="Client *"
            className="w-full p-4 rounded bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <textarea
            value={newProposal.description}
            onChange={(event) =>
              setNewProposal({ ...newProposal, description: event.target.value })
            }
            placeholder="Description *"
            className="w-full p-4 rounded bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
        </div>

        <div className="mt-6 border-t pt-6">
          <h3 className="font-bold text-slate-700 mb-4">Timeline *</h3>
          {showTimeline && (
            <div className="mb-4">
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 p-2 text-left">Phase</th>
                      <th className="border border-slate-200 p-2 text-left">Start Date</th>
                      <th className="border border-slate-200 p-2 text-left">End Date</th>
                      <th className="border border-slate-200 p-2 text-left">Duration</th>
                      <th className="border border-slate-200 p-2 text-left">Assigned To</th>
                      <th className="border border-slate-200 p-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timelineData.map((row, idx) => (
                      <tr key={idx}>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="text"
                            value={row.phase}
                            onChange={(event) => {
                              const newData = [...timelineData];
                              newData[idx].phase = event.target.value;
                              setTimelineData(newData);
                            }}
                            placeholder="Phase"
                            className="w-full p-1 bg-slate-50 rounded"
                          />
                        </td>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="date"
                            value={row.startDate}
                            onChange={(event) => {
                              const newData = [...timelineData];
                              newData[idx].startDate = event.target.value;
                              setTimelineData(newData);
                            }}
                            className="w-full p-1 bg-slate-50 rounded"
                          />
                        </td>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="date"
                            value={row.endDate}
                            onChange={(event) => {
                              const newData = [...timelineData];
                              newData[idx].endDate = event.target.value;
                              setTimelineData(newData);
                            }}
                            className="w-full p-1 bg-slate-50 rounded"
                          />
                        </td>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="text"
                            value={row.duration}
                            onChange={(event) => {
                              const newData = [...timelineData];
                              newData[idx].duration = event.target.value;
                              setTimelineData(newData);
                            }}
                            placeholder="Duration"
                            className="w-full p-1 bg-slate-50 rounded"
                          />
                        </td>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="text"
                            value={row.assignedTo}
                            onChange={(event) => {
                              const newData = [...timelineData];
                              newData[idx].assignedTo = event.target.value;
                              setTimelineData(newData);
                            }}
                            placeholder="Assigned To"
                            className="w-full p-1 bg-slate-50 rounded"
                          />
                        </td>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="text"
                            value={row.status}
                            onChange={(event) => {
                              const newData = [...timelineData];
                              newData[idx].status = event.target.value;
                              setTimelineData(newData);
                            }}
                            placeholder="Status"
                            className="w-full p-1 bg-slate-50 rounded"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setTimelineData([
                      ...timelineData,
                      {
                        phase: "",
                        startDate: "",
                        endDate: "",
                        duration: "",
                        assignedTo: "",
                        status: ""
                      }
                    ])
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
                >
                  Add a Row
                </button>
                <button
                  onClick={() => setShowTimeline(false)}
                  className="px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-500 font-bold"
                >
                  Move Back
                </button>
                <button
                  onClick={() => {}}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
          {!showTimeline && (
            <button
              onClick={() => setShowTimeline(true)}
              className="px-6 py-2 bg-[#000066] text-white rounded hover:bg-blue-900 font-bold"
            >
              View Timeline
            </button>
          )}
        </div>

        <div className="mt-6 border-t pt-6">
          <h3 className="font-bold text-slate-700 mb-4">Estimated Budget *</h3>
          {showBudget && (
            <div className="mb-4">
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 p-2 text-left">Item</th>
                      <th className="border border-slate-200 p-2 text-left">Description</th>
                      <th className="border border-slate-200 p-2 text-left">Quantity</th>
                      <th className="border border-slate-200 p-2 text-left">Unit price</th>
                      <th className="border border-slate-200 p-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetData.map((row, idx) => (
                      <tr key={idx}>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="text"
                            value={row.item}
                            onChange={(event) => {
                              const newData = [...budgetData];
                              newData[idx].item = event.target.value;
                              setBudgetData(newData);
                            }}
                            placeholder="Item"
                            className="w-full p-1 bg-slate-50 rounded"
                          />
                        </td>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="text"
                            value={row.description}
                            onChange={(event) => {
                              const newData = [...budgetData];
                              newData[idx].description = event.target.value;
                              setBudgetData(newData);
                            }}
                            placeholder="Description"
                            className="w-full p-1 bg-slate-50 rounded"
                          />
                        </td>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="number"
                            value={row.quantity}
                            onChange={(event) => {
                              const newData = [...budgetData];
                              newData[idx].quantity = event.target.value;
                              setBudgetData(newData);
                            }}
                            placeholder="Quantity"
                            className="w-full p-1 bg-slate-50 rounded"
                          />
                        </td>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="number"
                            value={row.unitPrice}
                            onChange={(event) => {
                              const newData = [...budgetData];
                              newData[idx].unitPrice = event.target.value;
                              setBudgetData(newData);
                            }}
                            placeholder="Unit price"
                            className="w-full p-1 bg-slate-50 rounded"
                          />
                        </td>
                        <td className="border border-slate-200 p-2">
                          <input
                            type="number"
                            value={row.total}
                            onChange={(event) => {
                              const newData = [...budgetData];
                              newData[idx].total = event.target.value;
                              setBudgetData(newData);
                            }}
                            placeholder="Total"
                            className="w-full p-1 bg-slate-50 rounded"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setBudgetData([
                      ...budgetData,
                      { item: "", description: "", quantity: "", unitPrice: "", total: "" }
                    ])
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
                >
                  Add a Row
                </button>
                <button
                  onClick={() => setShowBudget(false)}
                  className="px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-500 font-bold"
                >
                  Move Back
                </button>
                <button
                  onClick={() => {}}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
          {!showBudget && (
            <button
              onClick={() => setShowBudget(true)}
              className="px-6 py-2 bg-[#000066] text-white rounded hover:bg-blue-900 font-bold"
            >
              View Budget
            </button>
          )}
        </div>

        <div className="flex gap-4 pt-6 border-t mt-6">
          <button
            onClick={onClear}
            className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 font-bold"
          >
            Clear
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-3 bg-blue-800 text-white rounded hover:bg-blue-900 font-bold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
