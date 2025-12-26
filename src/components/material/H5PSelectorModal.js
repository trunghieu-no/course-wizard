import { useMemo, useState } from "react";

const H5P_DATA = [
  { id: "1503165130", title: "Interactive Video: Java Intro", meta: "250 interactions" },
  { id: "1503165131", title: "Quiz: Java Basics", meta: "15 questions" },
  { id: "1503165132", title: "Fill Blanks: Variables", meta: "10 items" }
];

export default function H5PSelectorModal({ onClose, onAdd }) {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return H5P_DATA;
    return H5P_DATA.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.id.toLowerCase().includes(q)
    );
  }, [query]);

  const toggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedList = useMemo(
    () => H5P_DATA.filter((i) => selectedIds.includes(i.id)),
    [selectedIds]
  );

  return (
    <div className="modal">
      <div className="modal-content wide">
        <div className="modal-header">
          <h3>Chọn nội dung H5P</h3>
          <button className="icon-btn" onClick={onClose}>✖</button>
        </div>

        <div className="search-box">
          <label>🔎 Tìm kiếm...</label>
          <input
            placeholder="Nhập tên hoặc ID H5P"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="h5p-list">
          {filtered.map((item) => (
            <div key={item.id} className="h5p-row">
              <label>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggle(item.id)}
                />{" "}
                <strong>{item.title}</strong>
                <div className="h5p-meta">ID: {item.id} | {item.meta}</div>
              </label>
            </div>
          ))}
        </div>

        <button
          className="link-btn"
          onClick={() => alert("⤴ Upload H5P mới (mock). Tích hợp sau).")}
        >
          + Upload H5P mới
        </button>

        <div className="actions">
          <button onClick={onClose}>Hủy</button>
          <button
            onClick={() => onAdd(selectedList)}
            disabled={selectedList.length === 0}
          >
            Thêm ({selectedList.length})
          </button>
        </div>
      </div>
    </div>
  );
}
