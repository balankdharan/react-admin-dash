import { FormEvent, useState } from "react";
import { useAdminStore } from "../../store/AdminStore";

const Settings = () => {
  const { data, update } = useAdminStore();
  const [form, setForm] = useState(data.settings);
  const [saved, setSaved] = useState(false);

  const save = (e: FormEvent) => {
    e.preventDefault();
    update((d) => ({ ...d, settings: form }), "Updated the admin profile");
    setSaved(true);
  };

  const change = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
    setSaved(false);
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1>Settings</h1>
          <p>Your admin profile. The name and picture show in the top bar and on your posts.</p>
        </div>
      </div>
      <form className="panel settingsForm" onSubmit={save}>
        <img src={form.avatar || "/noavatar.png"} alt="" />
        <label className="field">
          Name
          <input value={form.name} onChange={(e) => change("name", e.target.value)} required />
        </label>
        <label className="field">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => change("email", e.target.value)}
            required
          />
        </label>
        <label className="field">
          Picture URL
          <input value={form.avatar} onChange={(e) => change("avatar", e.target.value)} />
        </label>
        <div className="actions">
          <button className="btn">Save changes</button>
          {saved && <span className="muted">Saved</span>}
        </div>
      </form>
    </div>
  );
};

export default Settings;
