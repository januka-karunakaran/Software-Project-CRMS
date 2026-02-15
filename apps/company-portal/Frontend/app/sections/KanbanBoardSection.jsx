"use client";

import React from "react";
import {
  ArrowLeft,
  Calendar,
  MoreVertical,
  MessageSquare,
  Paperclip,
  Plus
} from "lucide-react";
import AddCardModal from "./AddCardModal.jsx";

export default function KanbanBoardSection({
  selectedProject,
  columns,
  openMenu,
  setOpenMenu,
  openForm,
  onBack,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  boardRef,
  onDelete,
  getColumnDotClass,
  openFormColumnId,
  newCardData,
  onFormCancel,
  onFormSave
}) {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
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
            {selectedProject?.name || "Smart Task Allocation and Tracking System"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track your team's tasks
          </p>
        </div>
      </div>

      <div
        ref={boardRef}
        className="flex-1 overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <div className="flex gap-6 h-full min-w-max pb-4">
          {columns.map((column) => (
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
                                    onDelete(column.id, card.id);
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
        onCancel={onFormCancel}
        onSave={(data) => onFormSave(openFormColumnId, data)}
      />
    </div>
  );
}
