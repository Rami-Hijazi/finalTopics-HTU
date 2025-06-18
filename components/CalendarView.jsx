
import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  parseISO,
} from 'date-fns';

export default function CalendarView({ items }) {
  
  const [currentMonth] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });  
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const [selectedDate, setSelectedDate] = useState(null);

  
  const grouped = items.reduce((acc, item) => {
    const dateKey = format(parseISO(item.eventDate), 'yyyy-MM-dd');
    acc[dateKey] = acc[dateKey] || [];
    acc[dateKey].push(item);
    return acc;
  }, {});

  const rows = [];
  let day = startDate;
  while (day <= endDate) {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dateKey = format(day, 'yyyy-MM-dd');
      const isCurrent = day >= monthStart && day <= monthEnd;
      const hasItems = grouped[dateKey]?.length > 0;
      days.push(
        <div
          key={day}
          className={`h-20 p-1 flex flex-col justify-between border ${
            isCurrent ? 'bg-white' : 'bg-gray-100'
          } cursor-pointer ${hasItems ? 'border-green-500' : 'border-transparent'} hover:bg-gray-50`}
          onClick={() => setSelectedDate(isSameDay(day, selectedDate) ? null : day)}
        >
          <span className="text-sm text-gray-800">{format(day, 'd')}</span>
          {hasItems && <span className="text-xs text-green-600">{grouped[dateKey].length} RSVPs</span>}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day} className="grid grid-cols-7 gap-1 mb-1">
        {days}
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Calendar View</h2>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-600 mb-2">
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>
      {rows}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Events on {format(selectedDate, 'MMMM d, yyyy')}</h3>
          <ul className="list-disc list-inside">
            {grouped[format(selectedDate, 'yyyy-MM-dd')]?.map(item => (
              <li key={item.id} className="text-gray-800">{item.eventTitle}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
