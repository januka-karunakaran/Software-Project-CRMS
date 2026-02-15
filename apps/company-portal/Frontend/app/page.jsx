"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Kanban,
  Database,
  FileEdit,
  History,
  ChevronRight,
  ChevronLeft,
  Bell,
  Search,
  MoreVertical,
  X,
  Plus,
  Trash2,
  CheckCircle,
  Calendar,
  MessageSquare,
  Paperclip,
  Clock,
  ArrowLeft
} from "lucide-react";
import { cn } from "./utils/cn.js";
import DashboardSection from "./sections/DashboardSection.jsx";
import ProposalsListSection from "./sections/ProposalsListSection.jsx";
import CreateProposalSection from "./sections/CreateProposalSection.jsx";
import ProposalDetailsSection from "./sections/ProposalDetailsSection.jsx";
import KanbanOverviewSection from "./sections/KanbanOverviewSection.jsx";
import KanbanBoardSection from "./sections/KanbanBoardSection.jsx";
import VersionHistorySection from "./sections/VersionHistorySection.jsx";
import PrdRepositorySection from "./sections/PrdRepositorySection.jsx";
import PrdDetailsEditorsSection from "./sections/PrdDetailsEditorsSection.jsx";
import AuditTrailSection from "./sections/AuditTrailSection.jsx";

const INITIAL_PROJECTS = [
  {
    id: "001A",
    title: "Smart Task Allocation and Tracking System",
    status: "Accepted",
    owner: "John Doe",
    lastUpdated: "2025-11-01",
    state: "Active",
    budget: "$ 150000",
    duration: "6 Months",
    client: "Amanda"
  },
  {
    id: "002B",
    title: "Online Complain Management System",
    status: "Accepted",
    owner: "Amanda",
    lastUpdated: "2025-10-29",
    state: "Draft",
    budget: "$ 500000",
    duration: "8 Months",
    client: "Amanda"
  },
  {
    id: "003D",
    title: "Student Information Management System",
    status: "Completed",
    owner: "Louis",
    lastUpdated: "2025-05-29",
    state: "Active",
    budget: "$ 450000",
    duration: "4 Months",
    client: "Louis"
  },
  {
    id: "004E",
    title: "Inventory Management and Billing System",
    status: "Rejected",
    owner: "James",
    lastUpdated: "2025-04-29",
    state: "Inactive",
    budget: "$ 750000",
    duration: "9 Months",
    client: "James"
  }
];

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

const KANBAN_PROJECTS = [
  {
    pid: "001 A",
    name: "Smart Task Allocation and Tracking System",
    description: "A comprehensive system for task management"
  },
  {
    pid: "002 B",
    name: "Online Complain Management system",
    description: "Handle customer complaints efficiently"
  },
  {
    pid: "003 D",
    name: "Student Information Management System",
    description: "Manage student records and data"
  },
  {
    pid: "004 E",
    name: "Inventory Management and Billing System",
    description: "Track inventory and generate bills"
  },
  {
    pid: "005 F",
    name: "Human Resource Management System",
    description: "Employee management and payroll"
  },
  {
    pid: "006 G",
    name: "Customer Relationship Management",
    description: "Manage customer interactions"
  },
  {
    pid: "007 H",
    name: "Project Management Tool",
    description: "Track project progress and milestones"
  },
  {
    pid: "008 I",
    name: "Document Management System",
    description: "Store and manage documents securely"
  }
];

const KANBAN_DEFAULT_COLUMNS = [
  {
    id: "todo",
    title: "To Do",
    count: 2,
    cards: [
      {
        id: "card-1",
        title: "Design System Update",
        tag: "High",
        tagColor: "bg-red-100 text-red-700",
        description:
          "Update the design system with new color palette and typography guidelines",
        date: "Mar 15",
        comments: 3,
        attachments: 2
      },
      {
        id: "card-2",
        title: "Mobile Optimization",
        tag: "Medium",
        tagColor: "bg-yellow-100 text-yellow-700",
        description: "Optimize application performance for mobile devices",
        date: "Mar 22",
        comments: 1,
        attachments: 3
      }
    ]
  },
  {
    id: "inprogress",
    title: "In Progress",
    count: 2,
    cards: [
      {
        id: "card-3",
        title: "API Integration",
        tag: "High",
        tagColor: "bg-red-100 text-red-700",
        description: "Integrate third-party payment API for checkout process",
        date: "Mar 15",
        comments: 5,
        attachments: 1
      },
      {
        id: "card-4",
        title: "User Research",
        tag: "Medium",
        tagColor: "bg-yellow-100 text-yellow-700",
        description: "Conduct user interviews for new feature validation",
        date: "Mar 20",
        comments: 2,
        attachments: 0
      }
    ]
  },
  {
    id: "review",
    title: "Review",
    count: 3,
    cards: [
      {
        id: "card-5",
        title: "Documentation Update",
        tag: "Low",
        tagColor: "bg-green-100 text-green-700",
        description: "Update technical documentation for API endpoints",
        date: "Mar 18",
        comments: 0,
        attachments: 1
      },
      {
        id: "card-6",
        title: "Authentication Fix",
        tag: "High",
        tagColor: "bg-red-100 text-red-700",
        description: "Fix authentication error on mobile devices",
        date: "Mar 16",
        comments: 1,
        attachments: 1
      },
      {
        id: "card-7",
        title: "User Research",
        tag: "Medium",
        tagColor: "bg-yellow-100 text-yellow-700",
        description: "Conduct user interviews for new feature validation",
        date: "Mar 20",
        comments: 2,
        attachments: 0
      }
    ]
  },
  {
    id: "done",
    title: "Done",
    count: 2,
    cards: [
      {
        id: "card-8",
        title: "Dashboard Analytics",
        tag: "Medium",
        tagColor: "bg-yellow-100 text-yellow-700",
        description: "Implement new analytics dashboard with real-time data",
        date: "Mar 25",
        comments: 4,
        attachments: 2
      },
      {
        id: "card-9",
        title: "Security Audit",
        tag: "High",
        tagColor: "bg-red-100 text-red-700",
        description: "Perform comprehensive security audit of the application",
        date: "Mar 10",
        comments: 2,
        attachments: 5
      }
    ]
  }
];

const NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "PRD review assigned",
    detail: "Inventory Management PRD needs review.",
    time: "2m ago",
    unread: true
  },
  {
    id: "notif-2",
    title: "Proposal approved",
    detail: "Smart Task Allocation proposal approved.",
    time: "1h ago",
    unread: true
  },
  {
    id: "notif-3",
    title: "New change request",
    detail: "CR-103 submitted for review.",
    time: "Yesterday",
    unread: false
  }
];

export default function Page() {
  return <App />;
}

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [newProposal, setNewProposal] = useState({
    title: "",
    client: "",
    description: "",
    timelines: [],
    budget: [],
    milestones: []
  });
  const [showTimeline, setShowTimeline] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [timelineData, setTimelineData] = useState([
    { phase: "", startDate: "", endDate: "", duration: "", assignedTo: "", status: "" }
  ]);
  const [budgetData, setBudgetData] = useState([
    { item: "", description: "", quantity: "", unitPrice: "", total: "" }
  ]);
  const [detailsView, setDetailsView] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [projectBudgetData, setProjectBudgetData] = useState([]);
  const [projectTimelineData, setProjectTimelineData] = useState([]);
  const [projectMilestoneData, setProjectMilestoneData] = useState([
    { milestone: "", targetDate: "", paymentAmount: "" }
  ]);
  const [kanbanView, setKanbanView] = useState("overview");
  const [selectedKanbanPid, setSelectedKanbanPid] = useState(null);
  const [kanbanSearchTerm, setKanbanSearchTerm] = useState("");
  const [kanbanCurrentPage, setKanbanCurrentPage] = useState(1);
  const defaultKanbanColumns = useMemo(
    () =>
      KANBAN_DEFAULT_COLUMNS.map((col) => ({
        ...col,
        cards: col.cards.map((card) => ({ ...card }))
      })),
    []
  );
  const [kanbanColumns, setKanbanColumns] = useState(defaultKanbanColumns);
  const [openFormColumnId, setOpenFormColumnId] = useState(null);
  const [newCardData, setNewCardData] = useState({
    title: "",
    tag: "",
    description: ""
  });
  const [openMenu, setOpenMenu] = useState({ columnId: null, cardId: null });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const boardRef = useRef(null);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
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

  const unreadCount = notifications.filter((item) => item.unread).length;

  const kanbanFilteredProjects = useMemo(() => {
    const term = kanbanSearchTerm.toLowerCase();
    return KANBAN_PROJECTS.filter(
      (project) =>
        project.name.toLowerCase().includes(term) ||
        project.pid.toLowerCase().includes(term)
    );
  }, [kanbanSearchTerm]);

  const kanbanTotalPages =
    Math.ceil(kanbanFilteredProjects.length / 4) || 1;
  const kanbanStartIndex = (kanbanCurrentPage - 1) * 4;
  const kanbanPageProjects = kanbanFilteredProjects.slice(
    kanbanStartIndex,
    kanbanStartIndex + 4
  );

  const selectedKanbanProject = useMemo(
    () => KANBAN_PROJECTS.find((item) => item.pid === selectedKanbanPid),
    [selectedKanbanPid]
  );

  useEffect(() => {
    if (activeTab !== "kanban") {
      setKanbanView("overview");
      return;
    }
    setKanbanCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    if (kanbanView !== "board") {
      return;
    }
    const storageKey = `kanban_columns_${selectedKanbanPid || "default"}`;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setKanbanColumns(JSON.parse(saved));
      } else {
        setKanbanColumns(defaultKanbanColumns);
      }
    } catch {
      setKanbanColumns(defaultKanbanColumns);
    }
  }, [kanbanView, selectedKanbanPid, defaultKanbanColumns]);

  useEffect(() => {
    if (kanbanView !== "board") {
      return;
    }
    const storageKey = `kanban_columns_${selectedKanbanPid || "default"}`;
    try {
      const toSave = kanbanColumns.map((col) => ({
        ...col,
        count: col.cards?.length || 0
      }));
      localStorage.setItem(storageKey, JSON.stringify(toSave));
    } catch {
      // ignore storage errors
    }
  }, [kanbanColumns, kanbanView, selectedKanbanPid]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isNotificationsOpen &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
      if (
        isProfileOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationsOpen, isProfileOpen]);

  const handleCreateProposal = () => {
    const id = `00${projects.length + 1}${String.fromCharCode(65 + projects.length)}`;
    const newProj = {
      ...newProposal,
      id,
      status: "Accepted",
      owner: "Current User",
      lastUpdated: new Date().toISOString().split("T")[0],
      state: "Active",
      budget: "$ 0",
      duration: "0 Months",
      timelines: timelineData,
      budgetData: budgetData
    };
    setProjects([newProj, ...projects]);
    setActiveTab("proposals");
    setNewProposal({ title: "", client: "", description: "", timelines: [], budget: [], milestones: [] });
    setTimelineData([
      { phase: "", startDate: "", endDate: "", duration: "", assignedTo: "", status: "" }
    ]);
    setBudgetData([
      { item: "", description: "", quantity: "", unitPrice: "", total: "" }
    ]);
    setShowTimeline(false);
    setShowBudget(false);
  };

  const handleKanbanView = (project) => {
    setSelectedKanbanPid(project.pid);
    setKanbanView("board");
  };

  const handleKanbanBack = () => {
    setKanbanView("overview");
    setSelectedKanbanPid(null);
  };

  const handleKanbanPageChange = (page) => {
    if (page < 1 || page > kanbanTotalPages) return;
    setKanbanCurrentPage(page);
  };

  const getKanbanPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (kanbanTotalPages <= maxVisible) {
      for (let i = 1; i <= kanbanTotalPages; i += 1) pages.push(i);
    } else if (kanbanCurrentPage <= 3) {
      for (let i = 1; i <= 4; i += 1) pages.push(i);
      pages.push("...");
      pages.push(kanbanTotalPages);
    } else if (kanbanCurrentPage >= kanbanTotalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = kanbanTotalPages - 3; i <= kanbanTotalPages; i += 1) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = kanbanCurrentPage - 1; i <= kanbanCurrentPage + 1; i += 1) pages.push(i);
      pages.push("...");
      pages.push(kanbanTotalPages);
    }

    return pages;
  };

  const openForm = (columnId) => {
    setOpenFormColumnId(columnId);
    setNewCardData({
      title: "",
      tag: "High",
      description: "",
      date: new Date().toISOString().slice(0, 10),
      attachments: [],
      status: columnId
    });
  };

  const closeForm = () => {
    setOpenFormColumnId(null);
    setNewCardData({ title: "", tag: "", description: "" });
  };

  const handleFormSubmit = (columnId, formData) => {
    const data = formData || newCardData;
    if (!data.title?.trim()) return;

    const newCard = {
      id: `card-${Date.now()}`,
      title: data.title,
      tag: data.tag || "Medium",
      tagColor:
        data.tag === "High"
          ? "bg-red-100 text-red-700"
          : data.tag === "Low"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700",
      description: data.description || "",
      date: data.date
        ? new Date(data.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          })
        : new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          }),
      comments: 0,
      attachments:
        data.attachments && data.attachments.length
          ? data.attachments.length
          : 0,
      attachmentsData: data.attachments || []
    };

    setKanbanColumns((cols) =>
      cols.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: [...col.cards, newCard],
              count: (col.cards?.length || 0) + 1
            }
          : col
      )
    );

    closeForm();
  };

  const handleMouseDown = (event) => {
    if (event.target.closest(".kanban-card") || event.target.closest("button")) {
      return;
    }
    if (!boardRef.current) return;
    setIsDragging(true);
    setStartX(event.pageX - boardRef.current.offsetLeft);
    setScrollLeft(boardRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!isDragging || !boardRef.current) return;
    event.preventDefault();
    const x = event.pageX - boardRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    boardRef.current.scrollLeft = scrollLeft - walk;
  };

  const getColumnDotClass = (colId) => {
    switch (colId) {
      case "todo":
        return "bg-gray-400";
      case "inprogress":
        return "bg-yellow-400";
      case "review":
        return "bg-blue-400";
      case "done":
        return "bg-green-400";
      default:
        return "bg-gray-300";
    }
  };

  const handleDeleteCard = (columnId, cardId) => {
    setKanbanColumns((cols) =>
      cols.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.filter((c) => c.id !== cardId),
              count: Math.max(0, (col.cards?.length || 1) - 1)
            }
          : col
      )
    );
  };

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

  const renderDashboard = () => (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome to your Dashboard!
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-slate-700" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold">
              Total Projects
            </p>
            <p className="text-2xl font-bold">125</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold">
              Pending Approvals
            </p>
            <p className="text-2xl font-bold">20</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-blue-700" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold">
              Task Due This Week
            </p>
            <p className="text-2xl font-bold text-slate-700">
              4 <span className="text-sm font-normal">days</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab("create")}
          className="bg-[#000066] text-white p-6 rounded-3xl shadow-lg hover:bg-blue-900 transition-all flex items-center justify-center font-bold text-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Project Proposal
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-teal-800">
            Recent Project Activity
          </h2>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Sort by :</span>
            <span className="font-bold text-slate-600">Newest</span>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-300 text-xs uppercase tracking-wider border-b border-slate-50">
              <th className="pb-4 font-bold">Project Name</th>
              <th className="pb-4 font-bold">Status</th>
              <th className="pb-4 font-bold">Owner</th>
              <th className="pb-4 font-bold">Last Updated</th>
              <th className="pb-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {projects.map((proj) => (
              <tr
                key={proj.id}
                className="border-b border-slate-50 last:border-0"
              >
                <td className="py-4 font-medium text-slate-700">
                  {proj.title}
                </td>
                <td className="py-4">
                  <span
                    className={cn(
                      "font-bold",
                      proj.status === "Accepted" && "text-green-500",
                      proj.status === "Completed" && "text-slate-800",
                      proj.status === "Rejected" && "text-red-500"
                    )}
                  >
                    {proj.status}
                  </span>
                </td>
                <td className="py-4 text-slate-600">{proj.owner}</td>
                <td className="py-4 text-slate-400">{proj.lastUpdated}</td>
                <td className="py-4">
                  <span
                    className={cn(
                      "font-bold",
                      proj.state === "Active" && "text-green-600",
                      proj.state === "Draft" && "text-teal-500",
                      proj.state === "Inactive" && "text-red-500"
                    )}
                  >
                    {proj.state}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-end gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-400 hover:bg-slate-200">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-[#5D57C9] text-white">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">
            4
          </button>
          <span className="px-2 self-center">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">
            40
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-400 hover:bg-slate-200">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderCreateProposal = () => (
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
                      <th className="border border-slate-200 p-2 text-left">
                        Phase
                      </th>
                      <th className="border border-slate-200 p-2 text-left">
                        Start Date
                      </th>
                      <th className="border border-slate-200 p-2 text-left">
                        End Date
                      </th>
                      <th className="border border-slate-200 p-2 text-left">
                        Duration
                      </th>
                      <th className="border border-slate-200 p-2 text-left">
                        Assigned To
                      </th>
                      <th className="border border-slate-200 p-2 text-left">
                        Status
                      </th>
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
                      <th className="border border-slate-200 p-2 text-left">
                        Item
                      </th>
                      <th className="border border-slate-200 p-2 text-left">
                        Description
                      </th>
                      <th className="border border-slate-200 p-2 text-left">
                        Quantity
                      </th>
                      <th className="border border-slate-200 p-2 text-left">
                        Unit price
                      </th>
                      <th className="border border-slate-200 p-2 text-left">
                        Total
                      </th>
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
                      {
                        item: "",
                        description: "",
                        quantity: "",
                        unitPrice: "",
                        total: ""
                      }
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
            onClick={() =>
              setNewProposal({
                title: "",
                client: "",
                description: "",
                timelines: [],
                budget: [],
                milestones: []
              })
            }
            className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 font-bold"
          >
            Clear
          </button>
          <button
            onClick={handleCreateProposal}
            className="px-6 py-3 bg-blue-800 text-white rounded hover:bg-blue-900 font-bold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );

  const renderProposalsList = () => (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Proposals</h1>
        <button
          onClick={() => setActiveTab("create")}
          className="px-6 py-3 bg-[#000066] text-white rounded hover:bg-blue-900 font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Project Proposal
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          All Created Projects Proposals
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-slate-400 uppercase border-b border-slate-200">
                <th className="pb-4 font-bold">PID</th>
                <th className="pb-4 font-bold">Proposal name</th>
                <th className="pb-4 font-bold">Client Name</th>
                <th className="pb-4 font-bold">Budget</th>
                <th className="pb-4 font-bold">Duration</th>
                <th className="pb-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr
                  key={proj.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  <td className="py-4 font-bold text-slate-700">
                    {proj.id}
                  </td>
                  <td className="py-4 text-slate-600">{proj.title}</td>
                  <td className="py-4 text-slate-600">
                    {proj.client || "John Doe"}
                  </td>
                  <td className="py-4 text-slate-600">{proj.budget}</td>
                  <td className="py-4 text-slate-600">{proj.duration}</td>
                  <td className="py-4">
                    <button
                      onClick={() => {
                        setSelectedProject(proj);
                        setActiveTab("proposal-details");
                      }}
                      className="text-blue-600 font-bold hover:text-blue-800"
                    >
                      More details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-400 hover:bg-slate-200">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-[#5D57C9] text-white">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">
            4
          </button>
          <span className="px-2 self-center text-slate-400">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">
            40
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-400 hover:bg-slate-200">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderProposalDetails = () => {
    if (!selectedProject) return null;

    return (
      <div className="p-8 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Proposal Details</h1>
          <button
            onClick={() => {
              setActiveTab("proposals");
              setSelectedProject(null);
              setDetailsView(null);
            }}
            className="px-6 py-2 bg-slate-400 text-white rounded hover:bg-slate-500"
          >
            Back to Proposals
          </button>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">
            Proposal Details
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 uppercase font-bold mb-2">
                Project Title
              </p>
              <p className="font-semibold text-slate-700">
                {selectedProject.title}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 uppercase font-bold mb-2">
                Last Updater
              </p>
              <p className="font-semibold text-slate-700">
                {selectedProject.lastUpdated}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 uppercase font-bold mb-2">
                Proposal ID
              </p>
              <p className="font-semibold text-slate-700">
                {selectedProject.id}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 uppercase font-bold mb-2">
                Client name
              </p>
              <p className="font-semibold text-slate-700">
                {selectedProject.client || "John Doe"}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 uppercase font-bold mb-2">
                Status
              </p>
              <p className="font-semibold text-slate-700">
                {selectedProject.status}
              </p>
            </div>
            <div />
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">
            Budget and Timeline
          </h2>
          <p className="text-slate-600 mb-6">
            Project details: {selectedProject.title} is a state-of-the-art system
            designed to help teams achieve timely and manageable results with
            intelligent decision making.
          </p>
          <div className="grid grid-cols-3 gap-6">
            <button
              onClick={() => {
                setDetailsView("budget");
                setProjectBudgetData(
                  selectedProject.budgetData || [
                    { item: "", description: "", quantity: "", unitPrice: "", total: "" }
                  ]
                );
              }}
              className="px-4 py-3 bg-[#000066] text-white rounded hover:bg-blue-900 font-semibold"
            >
              Estimated Budget
            </button>
            <button
              onClick={() => {
                setDetailsView("timeline");
                setProjectTimelineData(
                  selectedProject.timelines || [
                    { phase: "", startDate: "", endDate: "", duration: "", assignedTo: "", status: "" }
                  ]
                );
              }}
              className="px-4 py-3 bg-[#000066] text-white rounded hover:bg-blue-900 font-semibold"
            >
              Estimated Timeline
            </button>
            <button
              onClick={() => setDetailsView("milestone")}
              className="px-4 py-3 bg-[#000066] text-white rounded hover:bg-blue-900 font-semibold"
            >
              Payment Milestone
            </button>
          </div>
        </div>

        {detailsView === "budget" && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 mb-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6">
              Estimated Budget
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 p-3 text-left">Item</th>
                    <th className="border border-slate-200 p-3 text-left">
                      Description
                    </th>
                    <th className="border border-slate-200 p-3 text-left">
                      Quantity
                    </th>
                    <th className="border border-slate-200 p-3 text-left">
                      Unit price
                    </th>
                    <th className="border border-slate-200 p-3 text-left">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projectBudgetData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="text"
                          value={row.item}
                          onChange={(event) => {
                            const newData = [...projectBudgetData];
                            newData[idx].item = event.target.value;
                            setProjectBudgetData(newData);
                          }}
                          placeholder="Item"
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
                        />
                      </td>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="text"
                          value={row.description}
                          onChange={(event) => {
                            const newData = [...projectBudgetData];
                            newData[idx].description = event.target.value;
                            setProjectBudgetData(newData);
                          }}
                          placeholder="Description"
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
                        />
                      </td>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="number"
                          value={row.quantity}
                          onChange={(event) => {
                            const newData = [...projectBudgetData];
                            newData[idx].quantity = event.target.value;
                            setProjectBudgetData(newData);
                          }}
                          placeholder="Quantity"
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
                        />
                      </td>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="number"
                          value={row.unitPrice}
                          onChange={(event) => {
                            const newData = [...projectBudgetData];
                            newData[idx].unitPrice = event.target.value;
                            setProjectBudgetData(newData);
                          }}
                          placeholder="Unit price"
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
                        />
                      </td>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="number"
                          value={row.total}
                          onChange={(event) => {
                            const newData = [...projectBudgetData];
                            newData[idx].total = event.target.value;
                            setProjectBudgetData(newData);
                          }}
                          placeholder="Total"
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
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
                  setProjectBudgetData([
                    ...projectBudgetData,
                    { item: "", description: "", quantity: "", unitPrice: "", total: "" }
                  ])
                }
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
              >
                Add a Row
              </button>
              <button
                onClick={() => setDetailsView(null)}
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

        {detailsView === "timeline" && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 mb-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6">
              Estimated Timeline
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 p-3 text-left">Phase</th>
                    <th className="border border-slate-200 p-3 text-left">
                      Start Date
                    </th>
                    <th className="border border-slate-200 p-3 text-left">
                      End Date
                    </th>
                    <th className="border border-slate-200 p-3 text-left">
                      Duration
                    </th>
                    <th className="border border-slate-200 p-3 text-left">
                      Assigned To
                    </th>
                    <th className="border border-slate-200 p-3 text-left">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projectTimelineData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="text"
                          value={row.phase}
                          onChange={(event) => {
                            const newData = [...projectTimelineData];
                            newData[idx].phase = event.target.value;
                            setProjectTimelineData(newData);
                          }}
                          placeholder="Phase"
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
                        />
                      </td>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="date"
                          value={row.startDate}
                          onChange={(event) => {
                            const newData = [...projectTimelineData];
                            newData[idx].startDate = event.target.value;
                            setProjectTimelineData(newData);
                          }}
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
                        />
                      </td>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="date"
                          value={row.endDate}
                          onChange={(event) => {
                            const newData = [...projectTimelineData];
                            newData[idx].endDate = event.target.value;
                            setProjectTimelineData(newData);
                          }}
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
                        />
                      </td>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="text"
                          value={row.duration}
                          onChange={(event) => {
                            const newData = [...projectTimelineData];
                            newData[idx].duration = event.target.value;
                            setProjectTimelineData(newData);
                          }}
                          placeholder="Duration"
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
                        />
                      </td>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="text"
                          value={row.assignedTo}
                          onChange={(event) => {
                            const newData = [...projectTimelineData];
                            newData[idx].assignedTo = event.target.value;
                            setProjectTimelineData(newData);
                          }}
                          placeholder="Assigned To"
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
                        />
                      </td>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="text"
                          value={row.status}
                          onChange={(event) => {
                            const newData = [...projectTimelineData];
                            newData[idx].status = event.target.value;
                            setProjectTimelineData(newData);
                          }}
                          placeholder="Status"
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
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
                  setProjectTimelineData([
                    ...projectTimelineData,
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
                onClick={() => setDetailsView(null)}
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

        {detailsView === "milestone" && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 mb-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6">
              Payment Milestone Structure
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 p-3 text-left">
                      Milestone
                    </th>
                    <th className="border border-slate-200 p-3 text-left">
                      Target Date
                    </th>
                    <th className="border border-slate-200 p-3 text-left">
                      Payment Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projectMilestoneData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="text"
                          value={row.milestone}
                          onChange={(event) => {
                            const newData = [...projectMilestoneData];
                            newData[idx].milestone = event.target.value;
                            setProjectMilestoneData(newData);
                          }}
                          placeholder="Milestone"
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
                        />
                      </td>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="date"
                          value={row.targetDate}
                          onChange={(event) => {
                            const newData = [...projectMilestoneData];
                            newData[idx].targetDate = event.target.value;
                            setProjectMilestoneData(newData);
                          }}
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
                        />
                      </td>
                      <td className="border border-slate-200 p-3">
                        <input
                          type="text"
                          value={row.paymentAmount}
                          onChange={(event) => {
                            const newData = [...projectMilestoneData];
                            newData[idx].paymentAmount = event.target.value;
                            setProjectMilestoneData(newData);
                          }}
                          placeholder="Payment Amount"
                          className="w-full p-2 bg-slate-50 rounded border border-slate-200"
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
                  setProjectMilestoneData([
                    ...projectMilestoneData,
                    { milestone: "", targetDate: "", paymentAmount: "" }
                  ])
                }
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
              >
                Add a Row
              </button>
              <button
                onClick={() => setDetailsView(null)}
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

        {detailsView === null && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-6">
              Technical Specifications
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">-</span>
                <div>
                  <p className="font-semibold text-slate-700">
                    Required Technologies
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">-</span>
                <div>
                  <p className="font-semibold text-slate-700">
                    Required Milestone Structure
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">-</span>
                <div>
                  <p className="font-semibold text-slate-700">
                    Additional teamwork
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="fileInput"
                onChange={(event) => setUploadedFile(event.target.files[0])}
                style={{ display: "none" }}
                accept="*/*"
              />
              <button
                onClick={() => document.getElementById("fileInput").click()}
                className="px-6 py-3 bg-slate-600 text-white rounded hover:bg-slate-700 font-semibold flex items-center gap-2"
              >
                <Paperclip className="w-4 h-4" />
                {uploadedFile ? uploadedFile.name : "Attach: Technical Document"}
              </button>
              {uploadedFile && (
                <span className="text-sm text-green-600 font-semibold">
                  File attached: {uploadedFile.name}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderKanbanOverview = () => (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            value={kanbanSearchTerm}
            onChange={(event) => {
              setKanbanSearchTerm(event.target.value);
              setKanbanCurrentPage(1);
            }}
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
              {kanbanPageProjects.map((project) => (
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
                      onClick={() => handleKanbanView(project)}
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

        {kanbanPageProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No projects found matching your search.</p>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[var(--border-soft)] bg-[var(--surface-muted)]">
          <button
            onClick={() => handleKanbanPageChange(kanbanCurrentPage - 1)}
            disabled={kanbanCurrentPage === 1}
            className="p-2 rounded-lg hover:bg-[var(--surface)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {getKanbanPageNumbers().map((page, index) => (
            <button
              key={`${page}-${index}`}
              onClick={() => typeof page === "number" && handleKanbanPageChange(page)}
              disabled={page === "..."}
              className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${
                page === kanbanCurrentPage
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
            onClick={() => handleKanbanPageChange(kanbanCurrentPage + 1)}
            disabled={kanbanCurrentPage === kanbanTotalPages}
            className="p-2 rounded-lg hover:bg-[var(--surface)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderKanbanBoard = () => (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleKanbanBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Overview
        </button>
        <div>
          <p className="text-gray-500 text-sm mb-1">
            Welcome back to Kanban Board!
          </p>
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedKanbanProject?.name || "Smart Task Allocation and Tracking System"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track your team's tasks
          </p>
        </div>
      </div>

      <div
        ref={boardRef}
        className="flex-1 overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-6 h-full min-w-max pb-4">
          {kanbanColumns.map((column) => (
            <div
              key={column.id}
              className="w-80 flex-shrink-0 bg-gray-100 rounded-xl flex flex-col max-h-full"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${getColumnDotClass(column.id)}`}
                  />
                  <h3 className="font-semibold text-gray-700">{column.title}</h3>
                  <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                    {column.count}
                  </span>
                </div>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    openForm(column.id);
                  }}
                  className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {column.cards.map((card) => (
                  <div
                    key={card.id}
                    className="kanban-card bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-800 text-sm">
                        {card.title}
                      </h4>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${card.tagColor}`}
                      >
                        {card.tag}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {card.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-gray-400">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>{card.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <MessageSquare className="w-3 h-3" />
                          <span>{card.comments}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Paperclip className="w-3 h-3" />
                          <span>{card.attachments}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            setOpenMenu((prev) =>
                              prev.cardId === card.id && prev.columnId === column.id
                                ? { columnId: null, cardId: null }
                                : { columnId: column.id, cardId: card.id }
                            );
                          }}
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>

                        {openMenu.cardId === card.id &&
                          openMenu.columnId === column.id && (
                            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow z-10 text-sm">
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  if (window.confirm("Delete this card?")) {
                                    handleDeleteCard(column.id, card.id);
                                  }
                                  setOpenMenu({ columnId: null, cardId: null });
                                }}
                                className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddCardModal
        show={openFormColumnId !== null}
        initialData={newCardData}
        onCancel={closeForm}
        onSave={(data) => handleFormSubmit(openFormColumnId, data)}
      />
    </div>
  );

  const renderKanbanSection = () =>
    kanbanView === "overview" ? (
      <KanbanOverviewSection
        searchTerm={kanbanSearchTerm}
        onSearch={(value) => {
          setKanbanSearchTerm(value);
          setKanbanCurrentPage(1);
        }}
        pageProjects={kanbanPageProjects}
        currentPage={kanbanCurrentPage}
        totalPages={kanbanTotalPages}
        pageNumbers={getKanbanPageNumbers()}
        onPageChange={handleKanbanPageChange}
        onView={handleKanbanView}
      />
    ) : (
      <KanbanBoardSection
        selectedProject={selectedKanbanProject}
        columns={kanbanColumns}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        openForm={openForm}
        onBack={handleKanbanBack}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        boardRef={boardRef}
        onDelete={handleDeleteCard}
        getColumnDotClass={getColumnDotClass}
        openFormColumnId={openFormColumnId}
        newCardData={newCardData}
        onFormCancel={closeForm}
        onFormSave={handleFormSubmit}
      />
    );

  const renderVersionHistory = () => (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Version History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm uppercase tracking-wider border-b border-gray-50">
                <th className="pb-6 px-4">Version</th>
                <th className="pb-6 px-4">Date</th>
                <th className="pb-6 px-4">Description</th>
                <th className="pb-6 px-4">Author</th>
                <th className="pb-6 px-4">Reviewer</th>
                <th className="pb-6 px-4">Approval</th>
              </tr>
            </thead>
            <tbody>
              {VERSION_HISTORY.map((version, idx) => (
                <tr key={idx} className="border-b border-gray-50">
                  <td className="py-4 px-4 font-semibold text-gray-700">
                    {version.version}
                  </td>
                  <td className="py-4 px-4 text-gray-600">{version.date}</td>
                  <td className="py-4 px-4 text-gray-600">
                    {version.description}
                  </td>
                  <td className="py-4 px-4 text-gray-600">{version.author}</td>
                  <td className="py-4 px-4 text-gray-600">{version.reviewer}</td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        version.approval === "Approved"
                          ? "text-emerald-600"
                          : "text-amber-600"
                      )}
                    >
                      {version.approval}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const headerTitle =
    {
      dashboard: "Dashboard",
      proposals: "Proposals",
      create: "Create Project Proposal",
      "proposal-details": "Proposal Details",
      kanban: "Kanban Board",
      repository: "PRD Repository",
      details: "PRD Details & Editors",
      audit: "Audit Trail",
      history: "Version History"
    }[activeTab] || "CRMS";

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
            label="Audit Trail"
            active={activeTab === "audit"}
            onClick={setActiveTab}
          />
          <SidebarItem
            id="history"
            icon={CheckCircle}
            label="Version History"
            active={activeTab === "history"}
            onClick={setActiveTab}
          />
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 bg-transparent">
          <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">
            {headerTitle}
          </h1>
          <div className="flex items-center gap-6">
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                onClick={() => setIsNotificationsOpen((prev) => !prev)}
                className="relative p-2 rounded-full hover:bg-white/60"
                aria-label="Notifications"
              >
                <Bell className="text-[#5D57A3]" size={24} />
                {unreadCount > 0 && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F8F9FE]" />
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden z-20">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">Notifications</p>
                    <button
                      type="button"
                      onClick={() =>
                        setNotifications((prev) =>
                          prev.map((item) => ({ ...item, unread: false }))
                        )
                      }
                      className="text-xs font-semibold text-[#5D57A3]"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-auto">
                    {notifications.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setNotifications((prev) =>
                            prev.map((n) =>
                              n.id === item.id ? { ...n, unread: false } : n
                            )
                          )
                        }
                        className={cn(
                          "w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50",
                          item.unread && "bg-[#F8F9FE]"
                        )}
                      >
                        <p className="text-sm font-semibold text-gray-800">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{item.detail}</p>
                        <p className="text-xs text-gray-400 mt-2">{item.time}</p>
                      </button>
                    ))}
                    {notifications.length === 0 && (
                      <p className="px-4 py-6 text-sm text-gray-500">
                        No notifications yet.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-3"
                aria-label="User profile"
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-lg z-20 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">Felix Adam</p>
                    <p className="text-xs text-gray-500">felix@company.com</p>
                  </div>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      className="px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      View Profile
                    </button>
                    <button
                      type="button"
                      className="px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Settings
                    </button>
                    <button
                      type="button"
                      className="px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 pb-8">
          {activeTab === "dashboard" && (
            <DashboardSection
              projects={projects}
              onCreate={() => setActiveTab("create")}
            />
          )}
          {activeTab === "proposals" && (
            <ProposalsListSection
              projects={projects}
              onCreate={() => setActiveTab("create")}
              onSelect={(proj) => {
                setSelectedProject(proj);
                setActiveTab("proposal-details");
              }}
            />
          )}
          {activeTab === "create" && (
            <CreateProposalSection
              newProposal={newProposal}
              setNewProposal={setNewProposal}
              showTimeline={showTimeline}
              setShowTimeline={setShowTimeline}
              showBudget={showBudget}
              setShowBudget={setShowBudget}
              timelineData={timelineData}
              setTimelineData={setTimelineData}
              budgetData={budgetData}
              setBudgetData={setBudgetData}
              onClear={() =>
                setNewProposal({
                  title: "",
                  client: "",
                  description: "",
                  timelines: [],
                  budget: [],
                  milestones: []
                })
              }
              onSubmit={handleCreateProposal}
            />
          )}
          {activeTab === "proposal-details" && (
            <ProposalDetailsSection
              selectedProject={selectedProject}
              onBack={() => {
                setActiveTab("proposals");
                setSelectedProject(null);
                setDetailsView(null);
              }}
              detailsView={detailsView}
              setDetailsView={setDetailsView}
              projectBudgetData={projectBudgetData}
              setProjectBudgetData={setProjectBudgetData}
              projectTimelineData={projectTimelineData}
              setProjectTimelineData={setProjectTimelineData}
              projectMilestoneData={projectMilestoneData}
              setProjectMilestoneData={setProjectMilestoneData}
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
            />
          )}
          {activeTab === "kanban" && renderKanbanSection()}
          {activeTab === "repository" && (
            <PrdRepositorySection
              prdList={prdList}
              onCreate={() => setShowCreateModal(true)}
              onReview={navigateToReview}
            />
          )}

          {activeTab === "details" && (
            <PrdDetailsEditorsSection
              selectedPrd={selectedPrd}
              isEditingPrd={isEditingPrd}
              canSavePrdEdits={canSavePrdEdits}
              editPrdForm={editPrdForm}
              updateEditPrdField={updateEditPrdField}
              updateEditPrdArrayItem={updateEditPrdArrayItem}
              addEditPrdArrayItem={addEditPrdArrayItem}
              removeEditPrdArrayItem={removeEditPrdArrayItem}
              onToggleEdit={() => (isEditingPrd ? savePrdEdits() : startEditingPrd())}
              onSaveDraft={() => setShowDraftModal(true)}
              onApprove={() => {
                applyPrdStatus("Accepted");
                setActiveTab("repository");
              }}
            />
          )}

          {activeTab === "audit" && (
            <AuditTrailSection
              auditRequests={auditRequests}
              onOpenReview={openChangeRequestReview}
              onShowVersionHistory={() => setShowVersionHistory(true)}
            />
          )}
          {activeTab === "history" && (
            <VersionHistorySection versions={VERSION_HISTORY} />
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

function AddCardModal({
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
