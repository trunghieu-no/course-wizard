import { useState } from "react";

export default function ModuleModal({ onClose, onAdd }) {
  const [name, setName] = useState("");

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Thêm Module mới</h3>

        <input
          placeholder="Tên module"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <div className="actions">
          <button onClick={onClose}>Hủy</button>
          <button
            onClick={() => {
              onAdd({ name, lessons: [] });
              onClose();
            }}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
