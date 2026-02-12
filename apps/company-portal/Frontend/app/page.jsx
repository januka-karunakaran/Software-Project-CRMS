"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Kanban,
  Database,
  FileEdit,
  History,
  ChevronRight,
  Bell,
  Search,
  MoreVertical,
  X,
  Plus,
  Trash2,
  CheckCircle
} from "lucide-react";
import { cn } from "./utils/cn.js";

const PRD_DATA = [
  {
    pid: "001A",
    title: "Smart Task Allocation and Tracking System",
    status: "Accepted",
    lastModified: "John Doe",
    version: "1.2"
  },
  {
    pid: "004E",
    title: "Inventory Management and Billing System",
    status: "Rejected",
    lastModified: "James",
    version: "1.0"
  },
  {
    pid: "002B",
    title: "Student Information Management System",
    status: "Accepted",
    lastModified: "Amanda",
    version: "1.1"
  }
];

const AUDIT_DATA = [
  {
    pid: "001A",
    crid: "CR-101",
    requester: "John Doe",
    date: "01/11/2025",
    status: "Approved",
    summary: "Added tracking and reporting features",
    details:
      "Client asked for new report filters, weekly export, and a summary widget on the dashboard.",
    attachmentName: "CR-101-change-request.txt"
  },
  {
    pid: "001B",
    crid: "CR-102",
    requester: "Amanda",
    date: "29/10/2025",
    status: "Rejected",
    summary: "Updated task allocation",
    details:
      "Client requested bulk reassignment, priority tags, and SLA reminders in task allocation.",
    attachmentName: "CR-102-change-request.txt"
  },
  {
    pid: "003D",
    crid: "CR-103",
    requester: "Loius",
    date: "29/05/2025",
    status: "Approved",
    summary: "Initial module details",
    details:
      "Client submitted initial module requirements, user roles, and reporting expectations.",
    attachmentName: "CR-103-change-request.txt"
  }
];

const VERSION_HISTORY = [
  {
    version: "1.0",
    date: "2023-11-13",
    description: "Initial draft created",
    author: "John Doe",
    reviewer: "Jane Watson",
    approval: "Approved"
  },
  {
    version: "1.1",
    date: "2023-11-15",
    description: "Updated task allocation module details",
    author: "John Doe",
    reviewer: "Stephan Kate",
    approval: "Pending"
  },
  {
    version: "1.2",
    date: "2023-11-18",
    description: "Added tracking and reporting features",
    author: "John Doe",
    reviewer: "Joes Louis",
    approval: "Approved"
  }
];

const DEFAULT_FUNCTIONAL_REQUIREMENTS = [
  "User authentication",
  "Task creation & Assignment",
  "Real-time collaboration",
  "Reporting & analytics"
];

const DEFAULT_PROJECT_OVERVIEW = [
  "Auto-assign tasks smartly.",
  "Tracks progress in real-time.",
  "Boosts team productivity."
];

const DEFAULT_REVIEWERS = ["Jane Watson", "Stephan kate", "Joes Louis"];

export default function Page() {
  return <App />;
}

function App() {
  const [activeTab, setActiveTab] = useState("repository");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [showChangeRequestModal, setShowChangeRequestModal] = useState(false);
  const [selectedChangeRequest, setSelectedChangeRequest] = useState(null);
  const [reviewDecision, setReviewDecision] = useState("");
  const [reviewReason, setReviewReason] = useState("");
  const [auditRequests, setAuditRequests] = useState(AUDIT_DATA);
  const [prdList, setPrdList] = useState(
    PRD_DATA.map((prd) => ({
      ...prd,
      functionalRequirements: DEFAULT_FUNCTIONAL_REQUIREMENTS,
      projectOverview: DEFAULT_PROJECT_OVERVIEW,
      reviewers: DEFAULT_REVIEWERS
    }))
  );
  const [selectedPrdId, setSelectedPrdId] = useState(PRD_DATA[0]?.pid || null);
  const [isEditingPrd, setIsEditingPrd] = useState(false);
  const [editPrdForm, setEditPrdForm] = useState({
    pid: "",
    title: "",
    lastModified: "",
    version: "",
    status: "",
    functionalRequirements: [],
    projectOverview: [],
    reviewers: []
  });
  const [formValues, setFormValues] = useState({
    projectName: "",
    author: "",
    dateSubmitted: "",
    purpose: "",
    problem: "",
    goal: "",
    inScope: "",
    outScope: "",
    mainFeatures: "",
    functionalRequirement: "",
    nonFunctionalRequirement: "",
    userRoles: "",
    riskDependencies: ""
  });
  const [stakeholders, setStakeholders] = useState([
    { role: "", name: "", responsibility: "" }
  ]);
  const [milestones, setMilestones] = useState([
    { phase: "", task: "", duration: "", responsibility: "" }
  ]);

  const selectedPrd =
    prdList.find((prd) => prd.pid === selectedPrdId) || prdList[0] || null;

  const navigateToReview = (prd) => {
    setSelectedPrdId(prd.pid);
    setIsEditingPrd(false);
    setActiveTab("details");
  };

  const openChangeRequestReview = (item) => {
    setSelectedChangeRequest(item);
    setReviewDecision("");
    setReviewReason("");
    setShowChangeRequestModal(true);
  };

  const buildChangeRequestDownload = (item) => {
    if (!item) {
      return "";
    }
    const content = [
      `Change Request ID: ${item.crid}`,
      `Project ID: ${item.pid}`,
      `Requester: ${item.requester}`,
      `Date Submitted: ${item.date}`,
      `Summary: ${item.summary}`,
      `Details: ${item.details}`
    ].join("\n");
    return `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`;
  };

  const submitChangeRequestDecision = () => {
    if (!selectedChangeRequest || !reviewDecision) {
      return;
    }
    const nextStatus = reviewDecision === "accept" ? "Approved" : "Rejected";
    setAuditRequests((prev) =>
      prev.map((item) =>
        item.crid === selectedChangeRequest.crid
          ? { ...item, status: nextStatus, reviewReason: reviewReason.trim() }
          : item
      )
    );
    setShowChangeRequestModal(false);
  };

  const startEditingPrd = () => {
    if (!selectedPrd) {
      return;
    }
    setEditPrdForm({
      pid: selectedPrd.pid,
      title: selectedPrd.title,
      lastModified: selectedPrd.lastModified,
      version: selectedPrd.version,
      status: selectedPrd.status,
      functionalRequirements: selectedPrd.functionalRequirements?.slice() || [],
      projectOverview: selectedPrd.projectOverview?.slice() || [],
      reviewers: selectedPrd.reviewers?.slice() || []
    });
    setIsEditingPrd(true);
  };

  const updateEditPrdField = (key) => (event) => {
    const { value } = event.target;
    setEditPrdForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateEditPrdArrayItem = (key, index) => (event) => {
    const { value } = event.target;
    setEditPrdForm((prev) => ({
      ...prev,
      [key]: prev[key].map((item, idx) => (idx === index ? value : item))
    }));
  };

  const addEditPrdArrayItem = (key) => {
    setEditPrdForm((prev) => ({
      ...prev,
      [key]: [...prev[key], ""]
    }));
  };

  const removeEditPrdArrayItem = (key, index) => {
    setEditPrdForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, idx) => idx !== index)
    }));
  };

  const updatePrdRecord = (pid, updates) => {
    setPrdList((prev) =>
      prev.map((prd) => (prd.pid === pid ? { ...prd, ...updates } : prd))
    );
  };

  const savePrdEdits = () => {
    if (!isEditingPrd) {
      return;
    }
    updatePrdRecord(editPrdForm.pid, {
      title: editPrdForm.title,
      lastModified: editPrdForm.lastModified,
      version: editPrdForm.version,
      functionalRequirements: editPrdForm.functionalRequirements,
      projectOverview: editPrdForm.projectOverview,
      reviewers: editPrdForm.reviewers
    });
    setIsEditingPrd(false);
  };

  const applyPrdStatus = (status) => {
    if (!selectedPrd) {
      return;
    }
    const baseRecord = isEditingPrd ? editPrdForm : selectedPrd;
    updatePrdRecord(baseRecord.pid, {
      title: baseRecord.title,
      lastModified: "You",
      version: baseRecord.version,
      functionalRequirements: baseRecord.functionalRequirements,
      projectOverview: baseRecord.projectOverview,
      reviewers: baseRecord.reviewers,
      status
    });
    setIsEditingPrd(false);
  };

  const updateFormField = (key) => (event) => {
    const { value } = event.target;
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const updateStakeholder = (index, key) => (event) => {
    const { value } = event.target;
    setStakeholders((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [key]: value } : item
      )
    );
  };

  const updateMilestone = (index, key) => (event) => {
    const { value } = event.target;
    setMilestones((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [key]: value } : item
      )
    );
  };

  const addStakeholder = () => {
    setStakeholders((prev) => [
      ...prev,
      { role: "", name: "", responsibility: "" }
    ]);
  };

  const removeStakeholder = (index) => {
    setStakeholders((prev) => prev.filter((_, idx) => idx !== index));
  };

  const addMilestone = () => {
    setMilestones((prev) => [
      ...prev,
      { phase: "", task: "", duration: "", responsibility: "" }
    ]);
  };

  const removeMilestone = (index) => {
    setMilestones((prev) => prev.filter((_, idx) => idx !== index));
  };

  const isTextFilled = (value) => value.trim().length > 0;
  const isListComplete = (items) => items.length > 0 && items.every(isTextFilled);
  const isFormComplete = Object.values(formValues).every(isTextFilled);
  const areStakeholdersComplete =
    stakeholders.length > 0 &&
    stakeholders.every(
      (item) =>
        isTextFilled(item.role) &&
        isTextFilled(item.name) &&
        isTextFilled(item.responsibility)
    );
  const areMilestonesComplete =
    milestones.length > 0 &&
    milestones.every(
      (item) =>
        isTextFilled(item.phase) &&
        isTextFilled(item.task) &&
        isTextFilled(item.duration) &&
        isTextFilled(item.responsibility)
    );
  const canSubmit = isFormComplete && areStakeholdersComplete && areMilestonesComplete;
  const canSavePrdEdits =
    !isEditingPrd ||
    (isTextFilled(editPrdForm.title) &&
      isTextFilled(editPrdForm.lastModified) &&
      isTextFilled(editPrdForm.version) &&
      isListComplete(editPrdForm.functionalRequirements) &&
      isListComplete(editPrdForm.projectOverview) &&
      isListComplete(editPrdForm.reviewers));

  const SidebarItem = ({ id, icon: Icon, label, active, onClick }) => (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-200 group",
        active
          ? "bg-[#5D57A3] text-white rounded-lg mx-2"
          : "text-gray-400 hover:text-white"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon
          size={20}
          className={cn(
            active ? "text-white" : "text-gray-400 group-hover:text-white"
          )}
        />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <ChevronRight
        size={16}
        className={cn("opacity-0 transition-opacity", active && "opacity-100")}
      />
    </div>
  );

  const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 flex-1 min-w-[200px]">
      <div className={cn("p-3 rounded-2xl", color)}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8F9FE] font-sans text-gray-800 overflow-hidden">
      <div className="w-64 bg-[#212134] text-white flex flex-col py-6">
        <div className="flex items-center gap-3 px-6 mb-10">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white rounded-lg rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
          <span className="text-2xl font-bold tracking-tight">CRMS</span>
          <MoreVertical className="ml-auto text-gray-500" size={20} />
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarItem
            id="dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="proposals"
            icon={FileText}
            label="Proposals"
            active={activeTab === "proposals"}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="create"
            icon={PlusCircle}
            label="Create project proposal"
            active={activeTab === "create"}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="kanban"
            icon={Kanban}
            label="kanban board"
            active={activeTab === "kanban"}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="repository"
            icon={Database}
            label="PRD Repository"
            active={activeTab === "repository"}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="details"
            icon={FileEdit}
            label="PRD Details& Editors"
            active={activeTab === "details"}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="audit"
            icon={History}
            label="Audit Trail & Full History"
            active={activeTab === "audit"}
            onClick={setActiveTab}
          />
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 bg-transparent">
          <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">
            {activeTab === "repository" && "PRD Repository"}
            {activeTab === "details" && "PRD Details & Editors"}
            {activeTab === "audit" && "Audit Trail & Full History"}
          </h1>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell className="text-[#5D57A3] cursor-pointer" size={24} />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F8F9FE]" />
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 pb-8">
          {activeTab === "repository" && (
            <div className="space-y-6">
              <div className="flex gap-6 items-center">
                <StatCard
                  label="Total PRDs"
                  value="55"
                  icon={FileText}
                  color="bg-green-500"
                />
                <StatCard
                  label="PRDs in review"
                  value="20"
                  icon={FileEdit}
                  color="bg-orange-400"
                />
                <StatCard
                  label="Avg. Review Time"
                  value="4s"
                  icon={History}
                  color="bg-blue-400"
                />
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-[#000080] text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/20"
                >
                  <Plus size={20} />
                  Create New PRD
                </button>
              </div>

              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                <div className="relative mb-8">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-[#F8F9FE] border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#5D57A3]/20 transition-all"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-gray-400 text-sm uppercase tracking-wider border-b border-gray-50">
                        <th className="pb-4 font-semibold px-4">PID</th>
                        <th className="pb-4 font-semibold px-4">Title</th>
                        <th className="pb-4 font-semibold px-4">Status</th>
                        <th className="pb-4 font-semibold px-4">
                          Last Modified
                        </th>
                        <th className="pb-4 font-semibold text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {prdList.map((prd) => (
                        <tr
                          key={prd.pid}
                          className="group hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-6 px-4 font-bold text-gray-700">
                            {prd.pid}
                          </td>
                          <td className="py-6 px-4 font-bold text-gray-800 max-w-xs">
                            {prd.title}
                          </td>
                          <td className="py-6 px-4">
                            <span
                              className={cn(
                                "font-medium",
                                prd.status === "Accepted"
                                  ? "text-gray-800"
                                  : "text-gray-800"
                              )}
                            >
                              {prd.status}
                            </span>
                          </td>
                          <td className="py-6 px-4 text-gray-500 font-medium">
                            {prd.lastModified}
                          </td>
                          <td className="py-6 px-4">
                            <div className="flex gap-3 justify-center">
                              <button className="bg-[#A39ED1] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#8e88c7] transition-colors">
                                View
                              </button>
                              <button
                                onClick={() => navigateToReview(prd)}
                                className="bg-[#B2EBF2] text-[#00838F] px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#80DEEA] transition-colors"
                              >
                                Review
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 flex justify-end gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50">
                    &lt;
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#5D57A3] text-white">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
                    3
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
                    4
                  </button>
                  <span className="flex items-center text-gray-400 px-1">
                    ...
                  </span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
                    40
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-8">
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => (isEditingPrd ? savePrdEdits() : startEditingPrd())}
                  className={cn(
                    "px-6 py-2 rounded-md text-sm font-semibold",
                    canSavePrdEdits
                      ? "bg-[#1A1A40] text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  )}
                  disabled={!canSavePrdEdits}
                >
                  {isEditingPrd ? "Save Changes" : "Edit Prd"}
                </button>
                <button
                  onClick={() => setShowDraftModal(true)}
                  className={cn(
                    "border px-6 py-2 rounded-md text-sm font-semibold",
                    canSavePrdEdits
                      ? "border-[#1A1A40] text-[#1A1A40]"
                      : "border-gray-300 text-gray-400 cursor-not-allowed"
                  )}
                  disabled={!canSavePrdEdits}
                >
                  Save Draft
                </button>
                <button
                  onClick={() => {
                    applyPrdStatus("Accepted");
                    setActiveTab("repository");
                  }}
                  className={cn(
                    "border px-6 py-2 rounded-md text-sm font-semibold transition-colors",
                    canSavePrdEdits
                      ? "border-[#1A1A40] text-[#1A1A40] hover:bg-[#1A1A40] hover:text-white"
                      : "border-gray-300 text-gray-400 cursor-not-allowed"
                  )}
                  disabled={!canSavePrdEdits}
                >
                  Approve
                </button>
              </div>
              {isEditingPrd && !canSavePrdEdits && (
                <p className="text-right text-xs font-semibold text-red-500">
                  Please keep at least one item in each list and fill all fields
                  before saving.
                </p>
              )}

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-[#F0EBEB] p-8 rounded-[2rem] min-h-[250px] shadow-inner">
                  <h3 className="text-[#5D57A3] font-bold text-center mb-6 text-lg border-b border-gray-300 pb-2">
                    Document Details
                  </h3>
                  <div className="space-y-4 text-gray-700 font-medium">
                    <p>PRD ID: {selectedPrd?.pid || "001A"}</p>
                    {isEditingPrd ? (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-600">
                            Product Name
                          </label>
                          <input
                            type="text"
                            value={editPrdForm.title}
                            onChange={updateEditPrdField("title")}
                            className="w-full bg-white border-none rounded-lg p-3"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-600">
                            Client Name
                          </label>
                          <input
                            type="text"
                            value={editPrdForm.lastModified}
                            onChange={updateEditPrdField("lastModified")}
                            className="w-full bg-white border-none rounded-lg p-3"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-600">
                            Current Version
                          </label>
                          <input
                            type="text"
                            value={editPrdForm.version}
                            onChange={updateEditPrdField("version")}
                            className="w-full bg-white border-none rounded-lg p-3"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <p>
                          Product Name: {selectedPrd?.title || "Smart Task Allocation and Tracking System"}
                        </p>
                        <p>Client Name: {selectedPrd?.lastModified || "John Doe"}</p>
                        <p>Current Version: {selectedPrd?.version || "1.1"}</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-[#F0EBEB] p-8 rounded-[2rem] min-h-[250px] shadow-inner">
                  <h3 className="text-[#5D57A3] font-bold text-center mb-6 text-lg border-b border-gray-300 pb-2">
                    Functional Requirements
                  </h3>
                  {isEditingPrd ? (
                    <div className="space-y-3">
                      {editPrdForm.functionalRequirements.map((item, index) => (
                        <div key={`req-${index}`} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={item}
                            onChange={updateEditPrdArrayItem(
                              "functionalRequirements",
                              index
                            )}
                            className="flex-1 bg-white border-none rounded-lg p-3"
                          />
                          {editPrdForm.functionalRequirements.length > 1 && (
                            <button
                              onClick={() =>
                                removeEditPrdArrayItem("functionalRequirements", index)
                              }
                              className="text-red-500 hover:text-red-600"
                              aria-label="Remove requirement"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addEditPrdArrayItem("functionalRequirements")}
                        className="text-xs font-semibold text-[#1A1A40]"
                      >
                        + Add Requirement
                      </button>
                    </div>
                  ) : (
                    <ul className="space-y-4 text-gray-700 font-medium">
                      {(selectedPrd?.functionalRequirements || []).map((item, index) => (
                        <li key={`req-view-${index}`} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-gray-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bg-[#F0EBEB] p-8 rounded-[2rem] min-h-[250px] shadow-inner">
                  <h3 className="text-[#5D57A3] font-bold text-center mb-6 text-lg border-b border-gray-300 pb-2">
                    Project Overview
                  </h3>
                  {isEditingPrd ? (
                    <div className="space-y-3">
                      {editPrdForm.projectOverview.map((item, index) => (
                        <div key={`overview-${index}`} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={item}
                            onChange={updateEditPrdArrayItem(
                              "projectOverview",
                              index
                            )}
                            className="flex-1 bg-white border-none rounded-lg p-3"
                          />
                          {editPrdForm.projectOverview.length > 1 && (
                            <button
                              onClick={() =>
                                removeEditPrdArrayItem("projectOverview", index)
                              }
                              className="text-red-500 hover:text-red-600"
                              aria-label="Remove overview item"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addEditPrdArrayItem("projectOverview")}
                        className="text-xs font-semibold text-[#1A1A40]"
                      >
                        + Add Overview Item
                      </button>
                    </div>
                  ) : (
                    <ul className="space-y-4 text-gray-700 font-medium list-disc list-inside">
                      {(selectedPrd?.projectOverview || []).map((item, index) => (
                        <li key={`overview-view-${index}`}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bg-[#F0EBEB] p-8 rounded-[2rem] min-h-[250px] shadow-inner">
                  <h3 className="text-[#5D57A3] font-bold text-center mb-6 text-lg border-b border-gray-300 pb-2">
                    Reviewers
                  </h3>
                  {isEditingPrd ? (
                    <div className="space-y-3">
                      {editPrdForm.reviewers.map((item, index) => (
                        <div key={`reviewer-${index}`} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={item}
                            onChange={updateEditPrdArrayItem("reviewers", index)}
                            className="flex-1 bg-white border-none rounded-lg p-3"
                          />
                          {editPrdForm.reviewers.length > 1 && (
                            <button
                              onClick={() => removeEditPrdArrayItem("reviewers", index)}
                              className="text-red-500 hover:text-red-600"
                              aria-label="Remove reviewer"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addEditPrdArrayItem("reviewers")}
                        className="text-xs font-semibold text-[#1A1A40]"
                      >
                        + Add Reviewer
                      </button>
                    </div>
                  ) : (
                    <ul className="space-y-4 text-gray-700 font-medium list-disc list-inside">
                      {(selectedPrd?.reviewers || []).map((item, index) => (
                        <li key={`reviewer-view-${index}`}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "audit" && (
            <div className="space-y-8">
              <div className="flex gap-4">
                <select className="bg-white border-none rounded-xl px-4 py-3 text-sm font-semibold shadow-sm focus:ring-2 focus:ring-[#5D57A3]/20">
                  <option>Project onboarding flow: Newest</option>
                </select>
                <select className="bg-white border-none rounded-xl px-4 py-3 text-sm font-semibold shadow-sm focus:ring-2 focus:ring-[#5D57A3]/20">
                  <option>Sort by date: Newest</option>
                </select>
                <select className="bg-white border-none rounded-xl px-4 py-3 text-sm font-semibold shadow-sm focus:ring-2 focus:ring-[#5D57A3]/20">
                  <option>Sort by name: Newest</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowVersionHistory(true)}
                  className="bg-[#1A1A40] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg"
                >
                  Document Version History
                </button>
              </div>

              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Change Request Review</h2>
                  <select className="bg-[#F8F9FE] border-none rounded-lg px-4 py-2 text-xs font-semibold">
                    <option>Short by: Newest</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-gray-300 text-xs uppercase tracking-wider">
                        <th className="pb-4 font-semibold px-4">PID</th>
                        <th className="pb-4 font-semibold px-4">CR ID</th>
                        <th className="pb-4 font-semibold px-4">Requester</th>
                        <th className="pb-4 font-semibold px-4 text-center">
                          Date submitted
                        </th>
                        <th className="pb-4 font-semibold text-center">Status</th>
                        <th className="pb-4 font-semibold text-center">
                          Proposed change summary
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {auditRequests.map((item) => (
                        <tr key={item.crid} className="group">
                          <td className="py-6 px-4 font-bold text-gray-600 text-sm">
                            {item.pid}
                          </td>
                          <td className="py-6 px-4 font-bold text-gray-700 text-sm">
                            {item.crid}
                          </td>
                          <td className="py-6 px-4 font-bold text-gray-800 text-sm">
                            {item.requester}
                          </td>
                          <td className="py-6 px-4 text-gray-500 font-medium text-sm text-center">
                            {item.date}
                          </td>
                          <td className="py-6 px-4 text-center">
                            <span className="font-bold text-sm text-gray-800">
                              {item.status}
                            </span>
                          </td>
                          <td className="py-6 px-4">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => setShowVersionHistory(true)}
                                className="border border-[#B2EBF2] text-gray-400 px-6 py-2 rounded-lg text-xs font-semibold hover:bg-cyan-50 transition-colors"
                              >
                                View
                              </button>
                              <button
                                onClick={() => openChangeRequestReview(item)}
                                className="border border-[#B2EBF2] text-teal-600 px-6 py-2 rounded-lg text-xs font-semibold hover:bg-cyan-50 transition-colors"
                              >
                                Review
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 flex justify-end gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50">
                    &lt;
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#5D57A3] text-white">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
                    3
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
                    4
                  </button>
                  <span className="flex items-center text-gray-400 px-1">...
                  </span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
                    40
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-[#F8F9FE]">
              <h2 className="text-xl font-bold text-[#1A1A40]">
                Create New PRD
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 bg-gray-200 rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <section className="space-y-4">
                <h3 className="font-bold text-gray-800 border-b pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">
                      Project Name:
                    </label>
                    <input
                      type="text"
                      value={formValues.projectName}
                      onChange={updateFormField("projectName")}
                      className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">
                      Author:
                    </label>
                    <input
                      type="text"
                      value={formValues.author}
                      onChange={updateFormField("author")}
                      className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">
                      Date submitted:
                    </label>
                    <input
                      type="text"
                      value={formValues.dateSubmitted}
                      onChange={updateFormField("dateSubmitted")}
                      className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="font-bold text-gray-800 border-b pb-2">
                  Project Overview
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">
                      Purpose:
                    </label>
                    <input
                      type="text"
                      value={formValues.purpose}
                      onChange={updateFormField("purpose")}
                      className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">
                      Problem to solve:
                    </label>
                    <input
                      type="text"
                      value={formValues.problem}
                      onChange={updateFormField("problem")}
                      className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">
                      Project Goal:
                    </label>
                    <input
                      type="text"
                      value={formValues.goal}
                      onChange={updateFormField("goal")}
                      className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-bold text-gray-800">Key Stakeholders</h3>
                  <button
                    onClick={addStakeholder}
                    className="bg-[#1A1A40] text-white text-xs px-4 py-2 rounded-md font-bold"
                  >
                    + Add Stakeholder
                  </button>
                </div>
                <div className="space-y-4">
                  {stakeholders.map((stakeholder, index) => (
                    <div key={`stakeholder-${index}`} className="space-y-3">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-600">
                            Role
                          </label>
                          <input
                            type="text"
                            value={stakeholder.role}
                            onChange={updateStakeholder(index, "role")}
                            className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-600">
                            Name
                          </label>
                          <input
                            type="text"
                            value={stakeholder.name}
                            onChange={updateStakeholder(index, "name")}
                            className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-600">
                            Responsibility
                          </label>
                          <input
                            type="text"
                            value={stakeholder.responsibility}
                            onChange={updateStakeholder(index, "responsibility")}
                            className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                          />
                        </div>
                      </div>
                      {stakeholders.length > 1 && (
                        <div className="flex justify-end">
                          <button
                            onClick={() => removeStakeholder(index)}
                            className="text-red-500 hover:text-red-600"
                            aria-label="Remove stakeholder"
                            title="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="font-bold text-gray-800 border-b pb-2">Scope</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">
                      In Scope
                    </label>
                    <input
                      type="text"
                      value={formValues.inScope}
                      onChange={updateFormField("inScope")}
                      className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">
                      Out of Scope
                    </label>
                    <input
                      type="text"
                      value={formValues.outScope}
                      onChange={updateFormField("outScope")}
                      className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                    />
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
                    Main features
                  </label>
                  <textarea
                    value={formValues.mainFeatures}
                    onChange={updateFormField("mainFeatures")}
                    className="w-full bg-[#E5E5E5] border-none rounded-lg p-4 min-h-[100px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
                    Functional Requirment
                  </label>
                  <textarea
                    value={formValues.functionalRequirement}
                    onChange={updateFormField("functionalRequirement")}
                    className="w-full bg-[#E5E5E5] border-none rounded-lg p-4 min-h-[100px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
                    Non Functional Requirment
                  </label>
                  <textarea
                    value={formValues.nonFunctionalRequirement}
                    onChange={updateFormField("nonFunctionalRequirement")}
                    className="w-full bg-[#E5E5E5] border-none rounded-lg p-4 min-h-[100px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
                    User Roles
                  </label>
                  <textarea
                    value={formValues.userRoles}
                    onChange={updateFormField("userRoles")}
                    className="w-full bg-[#E5E5E5] border-none rounded-lg p-4 min-h-[100px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
                    Risk /Dependencies
                  </label>
                  <textarea
                    value={formValues.riskDependencies}
                    onChange={updateFormField("riskDependencies")}
                    className="w-full bg-[#E5E5E5] border-none rounded-lg p-4 min-h-[100px]"
                  />
                </div>
              </div>

              <section className="space-y-4 pb-8">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-bold text-gray-800">Timeline / Milestone</h3>
                  <button
                    onClick={addMilestone}
                    className="bg-[#1A1A40] text-white text-xs px-4 py-2 rounded-md font-bold"
                  >
                    + Add Milestone
                  </button>
                </div>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={`milestone-${index}`} className="space-y-3">
                      <div className="grid grid-cols-4 gap-6">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-600">
                            Phase
                          </label>
                          <input
                            type="text"
                            value={milestone.phase}
                            onChange={updateMilestone(index, "phase")}
                            className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-600">
                            Task
                          </label>
                          <input
                            type="text"
                            value={milestone.task}
                            onChange={updateMilestone(index, "task")}
                            className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-600">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={milestone.duration}
                            onChange={updateMilestone(index, "duration")}
                            className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-600">
                            Responsibility
                          </label>
                          <input
                            type="text"
                            value={milestone.responsibility}
                            onChange={updateMilestone(index, "responsibility")}
                            className="w-full bg-[#E5E5E5] border-none rounded-lg p-3"
                          />
                        </div>
                      </div>
                      {milestones.length > 1 && (
                        <div className="flex justify-end">
                          <button
                            onClick={() => removeMilestone(index)}
                            className="text-red-500 hover:text-red-600"
                            aria-label="Remove milestone"
                            title="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="p-6 border-t flex justify-between items-center bg-[#F8F9FE]">
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-[#A3A3A3] text-white px-10 py-3 rounded-lg font-bold"
              >
                Cancel
              </button>
              <div className="flex items-center gap-4">
                {!canSubmit && (
                  <p className="text-xs font-semibold text-red-500">
                    Please fill every field, plus at least one stakeholder and
                    one milestone.
                  </p>
                )}
                <button
                  onClick={() => {
                    if (!canSubmit) {
                      return;
                    }
                    setShowCreateModal(false);
                    setActiveTab("repository");
                  }}
                  className={cn(
                    "px-10 py-3 rounded-lg font-bold shadow-lg",
                    canSubmit
                      ? "bg-[#1A1A40] text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  )}
                  disabled={!canSubmit}
                  title={!canSubmit ? "Fill all fields to enable submit" : ""}
                >
                  Submit PRD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDraftModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Save as Draft?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              This will mark the PRD as Draft and update the repository table.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDraftModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  applyPrdStatus("Draft");
                  setShowDraftModal(false);
                  setActiveTab("repository");
                }}
                className="px-5 py-2 rounded-lg bg-[#1A1A40] text-white font-semibold"
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {showChangeRequestModal && selectedChangeRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl w-full max-w-3xl p-8 shadow-2xl relative">
            <button
              onClick={() => setShowChangeRequestModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-lg p-1"
              aria-label="Close change request review"
            >
              <X size={18} />
            </button>

            <div className="flex items-start justify-between gap-6 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Change Request Review
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedChangeRequest.crid} for {selectedChangeRequest.pid}
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                {selectedChangeRequest.status}
              </span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 mb-6">
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <div>
                  <span className="block text-xs uppercase text-gray-400">
                    Requester
                  </span>
                  <span className="font-semibold text-gray-800">
                    {selectedChangeRequest.requester}
                  </span>
                </div>
                <div>
                  <span className="block text-xs uppercase text-gray-400">
                    Date submitted
                  </span>
                  <span className="font-semibold text-gray-800">
                    {selectedChangeRequest.date}
                  </span>
                </div>
                <div className="flex-1 min-w-[220px]">
                  <span className="block text-xs uppercase text-gray-400">
                    Summary
                  </span>
                  <span className="font-semibold text-gray-800">
                    {selectedChangeRequest.summary}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                {selectedChangeRequest.details}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href={buildChangeRequestDownload(selectedChangeRequest)}
                download={selectedChangeRequest.attachmentName}
                className="px-5 py-2 rounded-lg bg-[#1A1A40] text-white text-sm font-semibold hover:bg-blue-900"
              >
                Download client submission
              </a>
              <button
                onClick={() => setReviewDecision("accept")}
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-semibold border transition-colors",
                  reviewDecision === "accept"
                    ? "bg-green-600 text-white border-green-600"
                    : "border-green-200 text-green-700 hover:bg-green-50"
                )}
              >
                Accept
              </button>
              <button
                onClick={() => setReviewDecision("reject")}
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-semibold border transition-colors",
                  reviewDecision === "reject"
                    ? "bg-red-600 text-white border-red-600"
                    : "border-red-200 text-red-700 hover:bg-red-50"
                )}
              >
                Reject
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">
                Reason (sent to client)
              </label>
              <textarea
                rows={4}
                value={reviewReason}
                onChange={(event) => setReviewReason(event.target.value)}
                placeholder="Write the reason for accepting or rejecting the change request..."
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700 focus:ring-2 focus:ring-[#5D57A3]/20"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowChangeRequestModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={submitChangeRequestDecision}
                disabled={!reviewDecision || !reviewReason.trim()}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-semibold transition-colors",
                  !reviewDecision || !reviewReason.trim()
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#5D57A3] text-white hover:bg-[#4B4488]"
                )}
              >
                Submit decision
              </button>
            </div>
          </div>
        </div>
      )}

      {showVersionHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-[#F0EBEB] rounded-[2.5rem] w-full max-w-4xl p-10 relative shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => setShowVersionHistory(false)}
              className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 bg-white/50 rounded-lg p-1"
            >
              <X size={20} />
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-10">
              Version History
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs font-semibold uppercase tracking-widest border-b border-gray-200">
                    <th className="pb-6 px-4">Version</th>
                    <th className="pb-6 px-4">Date</th>
                    <th className="pb-6 px-4">Description / Changes Made</th>
                    <th className="pb-6 px-4">Author</th>
                    <th className="pb-6 px-4">Reviewer</th>
                    <th className="pb-6 px-4">Approval</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {VERSION_HISTORY.map((v, idx) => (
                    <tr key={idx} className="group">
                      <td className="py-8 px-4 font-bold text-gray-700">
                        {v.version}
                      </td>
                      <td className="py-8 px-4 font-bold text-gray-700">
                        {v.date}
                      </td>
                      <td className="py-8 px-4 font-medium text-gray-400 text-sm max-w-[200px]">
                        {v.description}
                      </td>
                      <td className="py-8 px-4 font-bold text-gray-700">
                        {v.author}
                      </td>
                      <td className="py-8 px-4 font-bold text-gray-700">
                        {v.reviewer}
                      </td>
                      <td className="py-8 px-4 font-bold text-gray-700">
                        {v.approval}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-end gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50">
                &lt;
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#5D57A3] text-white">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
                3
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
                4
              </button>
              <span className="flex items-center text-gray-400 px-1">
                ...
              </span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
                40
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50">
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
