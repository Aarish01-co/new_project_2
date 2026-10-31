import React from 'react';
import { CheckCircle2, Clock, ListTodo, Layers, ArrowUpRight } from 'lucide-react';

export default function DashboardStats({ stats, activeStatusFilter, onStatusFilterClick }) {
  const { total, todo, inProgress, completed, completionRate } = stats;

  const statItems = [
    {
      id: 'All',
      label: 'Total Tasks',
      value: total,
      subtext: `${completed} done`,
      icon: <Layers className="w-5 h-5 text-slate-700" />,
      bgIcon: 'bg-slate-100 text-slate-700',
      activeBorder: 'border-slate-800 ring-2 ring-slate-200',
      tagColor: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'Todo',
      label: 'Pending Tasks',
      value: todo,
      subtext: total > 0 ? `${Math.round((todo / total) * 100)}% of board` : '0%',
      icon: <ListTodo className="w-5 h-5 text-amber-600" />,
      bgIcon: 'bg-amber-50 text-amber-600',
      activeBorder: 'border-amber-500 ring-2 ring-amber-100',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'In Progress',
      label: 'In Progress',
      value: inProgress,
      subtext: total > 0 ? `${Math.round((inProgress / total) * 100)}% of board` : '0%',
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      bgIcon: 'bg-blue-50 text-blue-600',
      activeBorder: 'border-blue-500 ring-2 ring-blue-100',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'Completed',
      label: 'Completed',
      value: completed,
      subtext: `${completionRate}% completion`,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      bgIcon: 'bg-emerald-50 text-emerald-600',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-100',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  return (
    <div className="w-full space-y-3">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statItems.map((item) => {
          const isActive = activeStatusFilter === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onStatusFilterClick && onStatusFilterClick(item.id)}
              className={`bg-white rounded-2xl p-4 sm:p-4.5 border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                isActive
                  ? `${item.activeBorder} bg-slate-50/50`
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
              role="button"
              tabIndex={0}
              title={`Click to filter by ${item.label}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onStatusFilterClick && onStatusFilterClick(item.id);
                }
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 tracking-wide">
                  {item.label}
                </span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.bgIcon}`}>
                  {item.icon}
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  {item.value}
                </div>
                <div className="text-[11px] font-medium text-slate-400">
                  {item.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress Bar */}
      <div className="bg-white rounded-xl p-3 border border-slate-200/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="text-xs font-semibold text-slate-700">Project Velocity</div>
          <span className="text-[11px] text-slate-400">•</span>
          <span className="text-xs text-slate-500 font-medium">
            {completed} of {total} tasks finished
          </span>
        </div>

        <div className="flex items-center gap-3 flex-1 sm:max-w-xs">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-800 shrink-0 min-w-[32px] text-right">
            {completionRate}%
          </span>
        </div>
      </div>
    </div>
  );
}
