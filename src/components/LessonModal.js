import { useState } from "react";

export default function LessonModal({ onClose, onAdd }) {
  const [lesson, setLesson] = useState("");

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Thêm bài học</h3>

        <input
          placeholder="Tên bài học"
          value={lesson}
          onChange={e => setLesson(e.target.value)}
        />

        <div className="actions">
          <button onClick={onClose}>Hủy</button>
          <button
            onClick={() => {
              onAdd(lesson);
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
