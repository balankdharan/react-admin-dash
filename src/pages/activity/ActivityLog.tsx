import { useState } from "react";
import { useAdminStore } from "../../store/AdminStore";

const ActivityLog = () => {
  const { data, update } = useAdminStore();
  const [search, setSearch] = useState("");
  const logs = data.logs.filter((log) => log.text.toLowerCase().includes(search.toLowerCase()));

  const clear = () => {
    if (!window.confirm("Clear the whole activity log?")) return;
    update((d) => ({ ...d, logs: [] }));
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1>Logs</h1>
          <p>Everything you change in the dashboard is recorded here, newest first.</p>
        </div>
        <button className="btn danger" onClick={clear} disabled={data.logs.length === 0}>
          Clear log
        </button>
      </div>
      <div className="panel">
        <label className="field">
          <input
            placeholder="Search the log"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        {logs.length === 0 ? (
          <p className="muted logEmpty">
            {data.logs.length === 0
              ? "Nothing yet. Add a user, move a task or post something, then come back."
              : "No entries match your search."}
          </p>
        ) : (
          <table className="logTable">
            <thead>
              <tr>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="muted">{log.time}</td>
                  <td>{log.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
