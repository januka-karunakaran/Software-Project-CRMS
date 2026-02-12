import React, { useState } from 'react'
import { cn } from '../utils/cn'

// Simple icon wrapper using emojis
const Icons = {
  LayoutDashboard: () => '📊',
  FileText: () => '📄',
  PlusCircle: () => '➕',
  Kanban: () => '📋',
  Database: () => '💾',
  Settings: () => '⚙️',
  History: () => '📜',
  Menu: () => '☰',
  Bell: () => '🔔',
  Search: () => '🔍',
  ChevronRight: () => '▶',
  ChevronLeft: () => '◀',
}

const INITIAL_PROJECTS = [
  { id: '001A', title: 'Smart Task Allocation and Tracking System', status: 'Accepted', owner: 'John Doe', lastUpdated: '2025-11-01', state: 'Active', budget: '$ 150000', duration: '6 Months', client: 'Amanda' },
  { id: '002B', title: 'Online Complain Management System', status: 'Accepted', owner: 'Amanda', lastUpdated: '2025-10-29', state: 'Draft', budget: '$ 500000', duration: '8 Months', client: 'Amanda' },
  { id: '003D', title: 'Student Information Management System', status: 'Completed', owner: 'Louis', lastUpdated: '2025-05-29', state: 'Active', budget: '$ 450000', duration: '4 Months', client: 'Louis' },
  { id: '004E', title: 'Inventory Management and Billing System', status: 'Rejected', owner: 'James', lastUpdated: '2025-04-29', state: 'Inactive', budget: '$ 750000', duration: '9 Months', client: 'James' }
]

export default function Home() {
  const [activePage, setActivePage] = useState('dashboard')
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)
  const [projects, setProjects] = useState(INITIAL_PROJECTS)
  const [newProposal, setNewProposal] = useState({ title: '', client: '', description: '', timelines: [], budget: [], milestones: [] })
  const [showTimeline, setShowTimeline] = useState(false)
  const [showBudget, setShowBudget] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [timelineData, setTimelineData] = useState([{ phase: '', startDate: '', endDate: '', duration: '', assignedTo: '', status: '' }])
  const [budgetData, setBudgetData] = useState([{ item: '', description: '', quantity: '', unitPrice: '', total: '' }])
  const [detailsView, setDetailsView] = useState(null) // 'budget', 'timeline', 'milestone', null
  const [uploadedFile, setUploadedFile] = useState(null)
  const [projectBudgetData, setProjectBudgetData] = useState([])
  const [projectTimelineData, setProjectTimelineData] = useState([])
  const [projectMilestoneData, setProjectMilestoneData] = useState([{ milestone: '', targetDate: '', paymentAmount: '' }])

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.LayoutDashboard },
    { id: 'proposals', label: 'Proposals', icon: Icons.FileText },
    { id: 'create', label: 'Create project proposal', icon: Icons.PlusCircle },
    { id: 'proposal-details', label: 'Proposal Details', icon: Icons.FileText },
    { id: 'kanban', label: 'kanban board', icon: Icons.Kanban },
    { id: 'repository', label: 'PRD Repository', icon: Icons.Database },
    { id: 'details', label: 'PRD Details & Editors', icon: Icons.Settings },
    { id: 'history', label: 'Audit Trail & Full History', icon: Icons.History },
  ]

  const handleCreateProposal = () => {
    const id = `00${projects.length + 1}${String.fromCharCode(65 + projects.length)}`
    const newProj = {
      ...newProposal,
      id,
      status: 'Accepted',
      owner: 'Current User',
      lastUpdated: new Date().toISOString().split('T')[0],
      state: 'Active',
      budget: '$ 0',
      duration: '0 Months',
      timelines: timelineData,
      budgetData: budgetData,
    }
    setProjects([newProj, ...projects])
    setActivePage('proposals')
    setNewProposal({ title: '', client: '', description: '', timelines: [], budget: [], milestones: [] })
    setTimelineData([{ phase: '', startDate: '', endDate: '', duration: '', assignedTo: '', status: '' }])
    setBudgetData([{ item: '', description: '', quantity: '', unitPrice: '', total: '' }])
    setShowTimeline(false)
    setShowBudget(false)
  }

  const renderSidebar = () => (
    <div className={cn(
      'bg-[#1A192B] text-white transition-all duration-300 flex flex-col h-screen sticky top-0',
      isSidebarMinimized ? 'w-20' : 'w-64'
    )}>
      <div className="p-6 flex items-center justify-between">
        {!isSidebarMinimized && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-lg">📱</div>
            <span className="text-xl font-bold tracking-wider">CRMS</span>
          </div>
        )}
        <button onClick={() => setIsSidebarMinimized(!isSidebarMinimized)} className="p-1 hover:bg-white/10 rounded text-xl">
          {Icons.Menu()}
        </button>
      </div>

      <nav className="mt-8 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={cn(
              'w-full flex items-center gap-4 px-6 py-4 transition-colors relative',
              activePage === item.id ? 'bg-[#5D57C9] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5',
              isSidebarMinimized && 'justify-center px-0'
            )}
          >
            <span className="text-xl">{item.icon()}</span>
            {!isSidebarMinimized && <span className="text-sm">{item.label}</span>}
            {!isSidebarMinimized && activePage === item.id && <span className="ml-auto text-xl">{Icons.ChevronRight()}</span>}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/10">
        <div className={cn('flex items-center gap-3', isSidebarMinimized && 'justify-center')}>
          <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center font-bold text-xs">N</div>
          {!isSidebarMinimized && <span className="text-sm font-medium">User Profile</span>}
        </div>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Welcome to your Dashboard!</h1>
        <div className="flex items-center gap-4">
          <span className="text-2xl cursor-pointer">{Icons.Bell()}</span>
          <img src="https://i.pravatar.cc/150?u=1" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="profile" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl">📊</div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold">Total Projects</p>
            <p className="text-2xl font-bold">125</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">📝</div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold">Pending Approvals</p>
            <p className="text-2xl font-bold">20</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl">🕒</div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold">Task Due This Week</p>
            <p className="text-2xl font-bold text-slate-700">4 <span className="text-sm font-normal">days</span></p>
          </div>
        </div>
        <button 
          onClick={() => setActivePage('create')}
          className="bg-[#000066] text-white p-6 rounded-3xl shadow-lg hover:bg-blue-900 transition-all flex items-center justify-center font-bold text-center"
        >
          ➕ create new project proposal
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-teal-800">Recent Project Activity</h2>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Sort by : </span>
            <span className="font-bold text-slate-600">Newest</span>
          </div>
        </div>

        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">{Icons.Search()}</span>
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
              <tr key={proj.id} className="border-b border-slate-50 last:border-0">
                <td className="py-4 font-medium text-slate-700">{proj.title}</td>
                <td className="py-4">
                  <span className={cn(
                    'font-bold',
                    proj.status === 'Accepted' && 'text-green-500',
                    proj.status === 'Completed' && 'text-slate-800',
                    proj.status === 'Rejected' && 'text-red-500',
                  )}>
                    {proj.status}
                  </span>
                </td>
                <td className="py-4 text-slate-600">{proj.owner}</td>
                <td className="py-4 text-slate-400">{proj.lastUpdated}</td>
                <td className="py-4">
                  <span className={cn(
                    'font-bold',
                    proj.state === 'Active' && 'text-green-600',
                    proj.state === 'Draft' && 'text-teal-500',
                    proj.state === 'Inactive' && 'text-red-500',
                  )}>
                    {proj.state}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-6 flex justify-end gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-400 hover:bg-slate-200">{Icons.ChevronLeft()}</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-[#5D57C9] text-white">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">3</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">4</button>
          <span className="px-2 self-center">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">40</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-400 hover:bg-slate-200">{Icons.ChevronRight()}</button>
        </div>
      </div>
    </div>
  )

  const renderCreateProposal = () => (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">New Project Proposal</h1>
      <div className="space-y-4 bg-white p-8 rounded-lg shadow-sm border border-slate-100">
        {/* Basic Info Section */}
        <div>
          <input value={newProposal.title} onChange={(e)=>setNewProposal({...newProposal,title:e.target.value})} placeholder="project title *" className="w-full p-4 rounded bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        </div>
        <div>
          <input value={newProposal.client} onChange={(e)=>setNewProposal({...newProposal,client:e.target.value})} placeholder="Client *" className="w-full p-4 rounded bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        </div>
        <div>
          <textarea value={newProposal.description} onChange={(e)=>setNewProposal({...newProposal,description:e.target.value})} placeholder="Description *" className="w-full p-4 rounded bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4}></textarea>
        </div>

        {/* Timeline Section */}
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
                        <td className="border border-slate-200 p-2"><input type="text" value={row.phase} onChange={(e) => {const newData = [...timelineData]; newData[idx].phase = e.target.value; setTimelineData(newData)}} placeholder="Phase" className="w-full p-1 bg-slate-50 rounded" /></td>
                        <td className="border border-slate-200 p-2"><input type="date" value={row.startDate} onChange={(e) => {const newData = [...timelineData]; newData[idx].startDate = e.target.value; setTimelineData(newData)}} className="w-full p-1 bg-slate-50 rounded" /></td>
                        <td className="border border-slate-200 p-2"><input type="date" value={row.endDate} onChange={(e) => {const newData = [...timelineData]; newData[idx].endDate = e.target.value; setTimelineData(newData)}} className="w-full p-1 bg-slate-50 rounded" /></td>
                        <td className="border border-slate-200 p-2"><input type="text" value={row.duration} onChange={(e) => {const newData = [...timelineData]; newData[idx].duration = e.target.value; setTimelineData(newData)}} placeholder="Duration" className="w-full p-1 bg-slate-50 rounded" /></td>
                        <td className="border border-slate-200 p-2"><input type="text" value={row.assignedTo} onChange={(e) => {const newData = [...timelineData]; newData[idx].assignedTo = e.target.value; setTimelineData(newData)}} placeholder="Assigned To" className="w-full p-1 bg-slate-50 rounded" /></td>
                        <td className="border border-slate-200 p-2"><input type="text" value={row.status} onChange={(e) => {const newData = [...timelineData]; newData[idx].status = e.target.value; setTimelineData(newData)}} placeholder="Status" className="w-full p-1 bg-slate-50 rounded" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setTimelineData([...timelineData, { phase: '', startDate: '', endDate: '', duration: '', assignedTo: '', status: '' }])} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">+ Add a Row</button>
                <button onClick={() => setShowTimeline(false)} className="px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-500 font-bold">Move Back</button>
                <button onClick={() => {}} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold">Save Changes</button>
              </div>
            </div>
          )}
          {!showTimeline && (
            <button onClick={() => setShowTimeline(true)} className="px-6 py-2 bg-[#000066] text-white rounded hover:bg-blue-900 font-bold">
              View Timeline
            </button>
          )}
        </div>

        {/* Budget Section */}
        <div className="mt-6 border-t pt-6">
          <h3 className="font-bold text-slate-700 mb-4">Estimated Budget *</h3>
          {showBudget && (
            <div className="mb-4">
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 p-2 text-left">ITEM</th>
                      <th className="border border-slate-200 p-2 text-left">Description</th>
                      <th className="border border-slate-200 p-2 text-left">Quantity</th>
                      <th className="border border-slate-200 p-2 text-left">Unit price</th>
                      <th className="border border-slate-200 p-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetData.map((row, idx) => (
                      <tr key={idx}>
                        <td className="border border-slate-200 p-2"><input type="text" value={row.item} onChange={(e) => {const newData = [...budgetData]; newData[idx].item = e.target.value; setBudgetData(newData)}} placeholder="Item" className="w-full p-1 bg-slate-50 rounded" /></td>
                        <td className="border border-slate-200 p-2"><input type="text" value={row.description} onChange={(e) => {const newData = [...budgetData]; newData[idx].description = e.target.value; setBudgetData(newData)}} placeholder="Description" className="w-full p-1 bg-slate-50 rounded" /></td>
                        <td className="border border-slate-200 p-2"><input type="number" value={row.quantity} onChange={(e) => {const newData = [...budgetData]; newData[idx].quantity = e.target.value; setBudgetData(newData)}} placeholder="Quantity" className="w-full p-1 bg-slate-50 rounded" /></td>
                        <td className="border border-slate-200 p-2"><input type="number" value={row.unitPrice} onChange={(e) => {const newData = [...budgetData]; newData[idx].unitPrice = e.target.value; setBudgetData(newData)}} placeholder="Unit price" className="w-full p-1 bg-slate-50 rounded" /></td>
                        <td className="border border-slate-200 p-2"><input type="number" value={row.total} onChange={(e) => {const newData = [...budgetData]; newData[idx].total = e.target.value; setBudgetData(newData)}} placeholder="Total" className="w-full p-1 bg-slate-50 rounded" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setBudgetData([...budgetData, { item: '', description: '', quantity: '', unitPrice: '', total: '' }])} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">+ Add a Row</button>
                <button onClick={() => setShowBudget(false)} className="px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-500 font-bold">Move Back</button>
                <button onClick={() => {}} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold">Save Changes</button>
              </div>
            </div>
          )}
          {!showBudget && (
            <button onClick={() => setShowBudget(true)} className="px-6 py-2 bg-[#000066] text-white rounded hover:bg-blue-900 font-bold">
              View Budget
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t mt-6">
          <button onClick={()=>setNewProposal({ title: '', client: '', description: '', timelines: [], budget: [], milestones: [] })} className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 font-bold">Clear</button>
          <button onClick={handleCreateProposal} className="px-6 py-3 bg-blue-800 text-white rounded hover:bg-blue-900 font-bold">Submit</button>
        </div>
      </div>
    </div>
  )

  const renderProposalsList = () => (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Proposals</h1>
        <button 
          onClick={() => setActivePage('create')}
          className="px-6 py-3 bg-[#000066] text-white rounded hover:bg-blue-900 font-bold"
        >
          ➕ create new project proposal
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-6">All Created Projects Proposals</h2>
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
              {projects.map(p=> (
                <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="py-4 font-bold text-slate-700">{p.id}</td>
                  <td className="py-4 text-slate-600">{p.title}</td>
                  <td className="py-4 text-slate-600">{p.client || 'John Doe'}</td>
                  <td className="py-4 text-slate-600">{p.budget}</td>
                  <td className="py-4 text-slate-600">{p.duration}</td>
                  <td className="py-4">
                    <button 
                      onClick={() => {setSelectedProject(p); setActivePage('proposal-details')}}
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
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-400 hover:bg-slate-200">{Icons.ChevronLeft()}</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-[#5D57C9] text-white">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">3</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">4</button>
          <span className="px-2 self-center text-slate-400">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400">40</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-400 hover:bg-slate-200">{Icons.ChevronRight()}</button>
        </div>
      </div>
    </div>
  )

  const renderProposalDetails = () => {
    if (!selectedProject) return null
    
    return (
      <div className="p-8 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Proposal Details</h1>
          <button 
            onClick={() => {setActivePage('proposals'); setSelectedProject(null); setDetailsView(null)}}
            className="px-6 py-2 bg-slate-400 text-white rounded hover:bg-slate-500"
          >
            Back to Proposals
          </button>
        </div>

        {/* Proposal Header Info */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Proposal Details</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 uppercase font-bold mb-2">Project Title</p>
              <p className="font-semibold text-slate-700">{selectedProject.title}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 uppercase font-bold mb-2">Last Updater</p>
              <p className="font-semibold text-slate-700">{selectedProject.lastUpdated}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 uppercase font-bold mb-2">Proposal ID</p>
              <p className="font-semibold text-slate-700">{selectedProject.id}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 uppercase font-bold mb-2">Client name</p>
              <p className="font-semibold text-slate-700">{selectedProject.client || 'John Doe'}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 uppercase font-bold mb-2">Status</p>
              <p className="font-semibold text-slate-700">{selectedProject.status}</p>
            </div>
            <div></div>
          </div>
        </div>

        {/* View Selection Buttons */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Budget & Timeline</h2>
          <p className="text-slate-600 mb-6">Project details: {selectedProject.title} is a state-of-the-art system designed to help teams achieve timely and manageable results with intelligent decision making.</p>
          <div className="grid grid-cols-3 gap-6">
            <button 
              onClick={() => {
                setDetailsView('budget')
                setProjectBudgetData(selectedProject.budgetData || [{ item: '', description: '', quantity: '', unitPrice: '', total: '' }])
              }}
              className="px-4 py-3 bg-[#000066] text-white rounded hover:bg-blue-900 font-semibold"
            >
              Estimated Budget
            </button>
            <button 
              onClick={() => {
                setDetailsView('timeline')
                setProjectTimelineData(selectedProject.timelines || [{ phase: '', startDate: '', endDate: '', duration: '', assignedTo: '', status: '' }])
              }}
              className="px-4 py-3 bg-[#000066] text-white rounded hover:bg-blue-900 font-semibold"
            >
              Estimated Timeline
            </button>
            <button 
              onClick={() => setDetailsView('milestone')}
              className="px-4 py-3 bg-[#000066] text-white rounded hover:bg-blue-900 font-semibold"
            >
              Payment Milestone
            </button>
          </div>
        </div>

        {/* Estimated Budget View */}
        {detailsView === 'budget' && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 mb-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Estimated Budget</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 p-3 text-left">ITEM</th>
                    <th className="border border-slate-200 p-3 text-left">Description</th>
                    <th className="border border-slate-200 p-3 text-left">Quantity</th>
                    <th className="border border-slate-200 p-3 text-left">Unit price</th>
                    <th className="border border-slate-200 p-3 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {projectBudgetData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="border border-slate-200 p-3"><input type="text" value={row.item} onChange={(e) => {const newData = [...projectBudgetData]; newData[idx].item = e.target.value; setProjectBudgetData(newData)}} placeholder="Item" className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                      <td className="border border-slate-200 p-3"><input type="text" value={row.description} onChange={(e) => {const newData = [...projectBudgetData]; newData[idx].description = e.target.value; setProjectBudgetData(newData)}} placeholder="Description" className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                      <td className="border border-slate-200 p-3"><input type="number" value={row.quantity} onChange={(e) => {const newData = [...projectBudgetData]; newData[idx].quantity = e.target.value; setProjectBudgetData(newData)}} placeholder="Quantity" className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                      <td className="border border-slate-200 p-3"><input type="number" value={row.unitPrice} onChange={(e) => {const newData = [...projectBudgetData]; newData[idx].unitPrice = e.target.value; setProjectBudgetData(newData)}} placeholder="Unit price" className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                      <td className="border border-slate-200 p-3"><input type="number" value={row.total} onChange={(e) => {const newData = [...projectBudgetData]; newData[idx].total = e.target.value; setProjectBudgetData(newData)}} placeholder="Total" className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setProjectBudgetData([...projectBudgetData, { item: '', description: '', quantity: '', unitPrice: '', total: '' }])} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">+ Add a Row</button>
              <button onClick={() => setDetailsView(null)} className="px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-500 font-bold">Move Back</button>
              <button onClick={() => {}} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold">Save Changes</button>
            </div>
          </div>
        )}

        {/* Estimated Timeline View */}
        {detailsView === 'timeline' && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 mb-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Estimated Timeline</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 p-3 text-left">Phase</th>
                    <th className="border border-slate-200 p-3 text-left">Start Date</th>
                    <th className="border border-slate-200 p-3 text-left">End Date</th>
                    <th className="border border-slate-200 p-3 text-left">Duration</th>
                    <th className="border border-slate-200 p-3 text-left">Assigned To</th>
                    <th className="border border-slate-200 p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projectTimelineData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="border border-slate-200 p-3"><input type="text" value={row.phase} onChange={(e) => {const newData = [...projectTimelineData]; newData[idx].phase = e.target.value; setProjectTimelineData(newData)}} placeholder="Phase" className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                      <td className="border border-slate-200 p-3"><input type="date" value={row.startDate} onChange={(e) => {const newData = [...projectTimelineData]; newData[idx].startDate = e.target.value; setProjectTimelineData(newData)}} className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                      <td className="border border-slate-200 p-3"><input type="date" value={row.endDate} onChange={(e) => {const newData = [...projectTimelineData]; newData[idx].endDate = e.target.value; setProjectTimelineData(newData)}} className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                      <td className="border border-slate-200 p-3"><input type="text" value={row.duration} onChange={(e) => {const newData = [...projectTimelineData]; newData[idx].duration = e.target.value; setProjectTimelineData(newData)}} placeholder="Duration" className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                      <td className="border border-slate-200 p-3"><input type="text" value={row.assignedTo} onChange={(e) => {const newData = [...projectTimelineData]; newData[idx].assignedTo = e.target.value; setProjectTimelineData(newData)}} placeholder="Assigned To" className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                      <td className="border border-slate-200 p-3"><input type="text" value={row.status} onChange={(e) => {const newData = [...projectTimelineData]; newData[idx].status = e.target.value; setProjectTimelineData(newData)}} placeholder="Status" className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setProjectTimelineData([...projectTimelineData, { phase: '', startDate: '', endDate: '', duration: '', assignedTo: '', status: '' }])} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">+ Add a Row</button>
              <button onClick={() => setDetailsView(null)} className="px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-500 font-bold">Move Back</button>
              <button onClick={() => {}} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold">Save Changes</button>
            </div>
          </div>
        )}

        {/* Payment Milestone View */}
        {detailsView === 'milestone' && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 mb-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Payment Milestone Structure</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 p-3 text-left">Milestone</th>
                    <th className="border border-slate-200 p-3 text-left">Target Date</th>
                    <th className="border border-slate-200 p-3 text-left">Payment Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {projectMilestoneData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="border border-slate-200 p-3"><input type="text" value={row.milestone} onChange={(e) => {const newData = [...projectMilestoneData]; newData[idx].milestone = e.target.value; setProjectMilestoneData(newData)}} placeholder="Milestone" className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                      <td className="border border-slate-200 p-3"><input type="date" value={row.targetDate} onChange={(e) => {const newData = [...projectMilestoneData]; newData[idx].targetDate = e.target.value; setProjectMilestoneData(newData)}} className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                      <td className="border border-slate-200 p-3"><input type="text" value={row.paymentAmount} onChange={(e) => {const newData = [...projectMilestoneData]; newData[idx].paymentAmount = e.target.value; setProjectMilestoneData(newData)}} placeholder="Payment Amount" className="w-full p-2 bg-slate-50 rounded border border-slate-200" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setProjectMilestoneData([...projectMilestoneData, { milestone: '', targetDate: '', paymentAmount: '' }])} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">+ Add a Row</button>
              <button onClick={() => setDetailsView(null)} className="px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-500 font-bold">Move Back</button>
              <button onClick={() => {}} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold">Save Changes</button>
            </div>
          </div>
        )}

        {/* Technical Specifications */}
        {detailsView === null && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Technical Specifications</h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">⚫</span>
                <div>
                  <p className="font-semibold text-slate-700">Required Technologies</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">⚫</span>
                <div>
                  <p className="font-semibold text-slate-700">Required Milestone Structure</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">⚫</span>
                <div>
                  <p className="font-semibold text-slate-700">Additional teamwork</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="file" 
                id="fileInput"
                onChange={(e) => setUploadedFile(e.target.files[0])}
                style={{display: 'none'}}
                accept="*/*"
              />
              <button 
                onClick={() => document.getElementById('fileInput').click()}
                className="px-6 py-3 bg-slate-600 text-white rounded hover:bg-slate-700 font-semibold"
              >
                📎 {uploadedFile ? uploadedFile.name : 'Attach: Technical Document'}
              </button>
              {uploadedFile && (
                <span className="text-sm text-green-600 font-semibold">✓ File attached: {uploadedFile.name}</span>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex bg-gray-50">
      {renderSidebar()}
      <div className="flex-1 min-h-screen">
        {activePage === 'dashboard' && renderDashboard()}
        {activePage === 'create' && renderCreateProposal()}
        {activePage === 'proposals' && renderProposalsList()}
        {activePage === 'proposal-details' && renderProposalDetails()}
      </div>
    </div>
  )
}
