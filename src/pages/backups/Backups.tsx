import { ChangeEvent, useRef, useState } from "react";
import { AdminData, defaultData, useAdminStore } from "../../store/AdminStore";

const Backups = () => {
  const { data, replaceAll } = useAdminStore();
  const fileInput = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState("");

  const counts = [
    ["Users", data.users.length],
    ["Products", data.products.length],
    ["Orders", data.orders.length],
    ["Posts", data.posts.length],
    ["Tasks", data.kanban.length],
    ["Events", data.events.length],
    ["Messages", data.messages.length],
  ];

  const download = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `admin-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Backup downloaded.");
  };

  const restore = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as Partial<AdminData>;
      if (!Array.isArray(parsed.users) || !Array.isArray(parsed.products)) {
        throw new Error("not a backup");
      }
      replaceAll({ ...defaultData(), ...parsed, session: data.session }, `Restored backup ${file.name}`);
      setNotice(`Restored ${file.name}.`);
    } catch {
      setNotice("That file isn't a backup from this dashboard.");
    }
  };

  const reset = () => {
    if (!window.confirm("Reset everything to the demo data? Your changes will be lost.")) return;
    replaceAll({ ...defaultData(), session: data.session }, "Reset to demo data");
    setNotice("Everything is back to the demo data.");
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1>Backups</h1>
          <p>All data is saved in this browser. Download a copy, restore one, or start over.</p>
        </div>
      </div>
      <div className="panel">
        <h2>What's saved</h2>
        <div className="countGrid">
          {counts.map(([name, count]) => (
            <div key={name}>
              <strong>{count}</strong>
              <span className="muted">{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="panel backupActions">
        <button className="btn" onClick={download}>
          Download backup
        </button>
        <button className="btn secondary" onClick={() => fileInput.current?.click()}>
          Restore from file
        </button>
        <button className="btn danger" onClick={reset}>
          Reset to demo data
        </button>
        <input ref={fileInput} type="file" accept="application/json" hidden onChange={restore} />
      </div>
      {notice && <p className="muted">{notice}</p>}
    </div>
  );
};

export default Backups;
