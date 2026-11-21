import { FormEvent, useState } from "react";
import { isoDate, nextId, useAdminStore } from "../../store/AdminStore";
import "./calendar.scss";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Every cell of a month grid, starting on Monday, padded with the days of the
// months around it so the grid is always full weeks.
const monthGrid = (year: number, month: number) => {
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(1 - ((first.getDay() + 6) % 7));
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
};

const Calendar = () => {
  const { data, update } = useAdminStore();
  const now = new Date();
  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const [selected, setSelected] = useState(isoDate(now));
  const [title, setTitle] = useState("");

  const todayIso = isoDate(now);
  const days = monthGrid(view.year, view.month);
  const label = new Date(view.year, view.month).toLocaleString("en", {
    month: "long",
    year: "numeric",
  });

  const changeMonth = (step: number) => {
    const d = new Date(view.year, view.month + step);
    setView({ year: d.getFullYear(), month: d.getMonth() });
  };

  const addEvent = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    update(
      (d) => ({
        ...d,
        events: [...d.events, { id: nextId(d.events), date: selected, title: title.trim() }],
      }),
      `Added event "${title.trim()}" on ${selected}`
    );
    setTitle("");
  };

  const removeEvent = (id: number) =>
    update((d) => ({ ...d, events: d.events.filter((ev) => ev.id !== id) }), `Deleted event #${id}`);

  const selectedEvents = data.events.filter((ev) => ev.date === selected);

  return (
    <div className="page calendar">
      <div className="pageHeader">
        <div>
          <h1>Calendar</h1>
          <p>Pick a day to see its events or add a new one.</p>
        </div>
        <div className="monthNav">
          <button className="btn secondary" onClick={() => changeMonth(-1)}>
            ‹
          </button>
          <strong>{label}</strong>
          <button className="btn secondary" onClick={() => changeMonth(1)}>
            ›
          </button>
          <button
            className="btn secondary"
            onClick={() => {
              setView({ year: now.getFullYear(), month: now.getMonth() });
              setSelected(todayIso);
            }}
          >
            Today
          </button>
        </div>
      </div>
      <div className="calendarLayout">
        <div className="grid panel">
          {WEEKDAYS.map((day) => (
            <div className="weekday" key={day}>
              {day}
            </div>
          ))}
          {days.map((day) => {
            const iso = isoDate(day);
            const events = data.events.filter((ev) => ev.date === iso);
            const classes = [
              "day",
              day.getMonth() !== view.month ? "outside" : "",
              iso === todayIso ? "today" : "",
              iso === selected ? "selected" : "",
            ].join(" ");
            return (
              <button className={classes} key={iso} onClick={() => setSelected(iso)}>
                <span className="number">{day.getDate()}</span>
                {events.slice(0, 2).map((ev) => (
                  <span className="event" key={ev.id}>
                    {ev.title}
                  </span>
                ))}
                {events.length > 2 && <span className="more">+{events.length - 2} more</span>}
              </button>
            );
          })}
        </div>
        <div className="panel side">
          <h2>
            {new Date(`${selected}T00:00`).toLocaleDateString("en", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h2>
          {selectedEvents.length === 0 && <p className="muted">No events on this day.</p>}
          <ul>
            {selectedEvents.map((ev) => (
              <li key={ev.id}>
                <span>{ev.title}</span>
                <button className="btn small danger" onClick={() => removeEvent(ev.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={addEvent}>
            <label className="field">
              New event
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Team meeting"
              />
            </label>
            <button className="btn" disabled={!title.trim()}>
              Add event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
