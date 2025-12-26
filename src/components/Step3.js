
import { useMemo, useState } from "react";
import MaterialTypeModal from "./material/MaterialTypeModal";
import H5PSelectorModal from "./material/H5PSelectorModal";

export default function Step3({ course, setCourse, back, finish }) {
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);

  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showH5PModal, setShowH5PModal] = useState(false);

  const currentModule = course.modules[currentModuleIdx];
  const currentLesson =
    currentModule && (currentModule.lessons || [])[currentLessonIdx];

  const addMaterialsToCurrentLesson = (items) => {
    if (!currentLesson) return;
    const newCourse = { ...course };
    const lm = newCourse.modules[currentModuleIdx].lessons[currentLessonIdx];
    lm.materials = [...(lm.materials || []), ...items];
    setCourse(newCourse);
  };

  const quickAddMaterial = (type) => {
    const title = window.prompt(`Nhập tiêu đề cho ${type}:`, `${type} demo`);
    if (!title) return;
    addMaterialsToCurrentLesson([{ type, title }]);
  };

  const lessonMaterials = useMemo(
    () => (currentLesson?.materials || []),
    [currentLesson]
  );

  return (
    <div className="card">
      <h2>Tạo Khóa Học Mới [3/3]</h2>

      <div className="info-line">
        <div>Thêm tài liệu học tập</div>
        <div className="sub">
          Module hiện tại: <strong>{currentModule?.name || "N/A"}</strong>{" "}
          | Bài học hiện tại: <strong>{currentLesson?.title || "N/A"}</strong>
        </div>
      </div>

      <div className="materials-box">
        <div className="materials-header">Danh sách tài liệu:</div>

        {lessonMaterials.length === 0 ? (
          <div className="empty">Chưa có tài liệu</div>
        ) : (
          <ol className="materials-list">
            {lessonMaterials.map((m, idx) => (
              <li key={idx} className="material-row">
                <span className="material-pill">{iconForType(m.type)}</span>
                <span className="material-title">
                  {m.type}: {m.title}
                  {m.id ? ` (ID: ${m.id})` : ""}
                </span>
                <span className="material-actions">[:]</span>
              </li>
            ))}
          </ol>
        )}

        <button onClick={() => setShowTypeModal(true)}>+ Thêm tài liệu</button>
      </div>

      <div className="nav-box">
        <div className="materials-header">Navigation:</div>
        <div className="nav">
          {(course.modules || []).map((m, mi) => (
            <div key={mi} className="nav-module">
              <div
                className={`nav-module-title ${
                  mi === currentModuleIdx ? "active" : ""
                }`}
                onClick={() => {
                  setCurrentModuleIdx(mi);
                  setCurrentLessonIdx(0);
                }}
              >
                Module {mi + 1} ▸ {m.name}
              </div>
              <ul className="nav-lessons">
                {(m.lessons || []).map((l, li) => (
                  <li
                    key={li}
                    className={`nav-lesson ${
                      mi === currentModuleIdx && li === currentLessonIdx
                        ? "current"
                        : ""
                    }`}
                    onClick={() => {
                      setCurrentModuleIdx(mi);
                      setCurrentLessonIdx(li);
                    }}
                  >
                    • {l.title}{" "}
                    {mi === currentModuleIdx && li === currentLessonIdx ? "✓" : ""}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="actions">
        <button onClick={back}>← Quay lại</button>
        <button onClick={finish}>Hoàn thành</button>
      </div>

      {showTypeModal && (
        <MaterialTypeModal
          onClose={() => setShowTypeModal(false)}
          onChoose={(type) => {
            setShowTypeModal(false);
            if (type === "H5P") {
              setShowH5PModal(true);
            } else {
              quickAddMaterial(type);
            }
          }}
        />
      )}

      {showH5PModal && (
        <H5PSelectorModal
          onClose={() => setShowH5PModal(false)}
          onAdd={(selectedList) => {
            const items = selectedList.map((it) => ({
              type: "H5P",
              title: it.title,
              id: it.id,
              meta: it.meta,
            }));
            addMaterialsToCurrentLesson(items);
            setShowH5PModal(false);
          }}
        />
      )}
    </div>
  );
}

function iconForType(type) {
  switch (type) {
    case "PDF":
      return "📄";
    case "Video":
      return "🎥";
    case "SCORM":
      return "📦";
    case "H5P":
      return "🎯";
    default:
      return "📁";
  }
}
