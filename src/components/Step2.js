import { useState } from "react";
import ModuleModal from "./ModuleModal";
import LessonModal from "./LessonModal";

export default function Step2({ course, setCourse, back, next }) {
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [activeModule, setActiveModule] = useState(null);

  const addModule = (module) => {
    setCourse({
      ...course,
      modules: [...course.modules, module]
    });
  };

  // lessons là object { title, materials: [] }
  const addLesson = (moduleIndex, lessonTitle) => {
    const newModules = [...course.modules];
    if (!newModules[moduleIndex].lessons) newModules[moduleIndex].lessons = [];
    newModules[moduleIndex].lessons.push({ title: lessonTitle, materials: [] });
    setCourse({ ...course, modules: newModules });
  };

  return (
    <div className="card">
      <h2>Tạo Khóa Học Mới [2/3]</h2>

      {course.modules.map((m, i) => (
        <div key={i} className="module">
          <h4>📘 {m.name}</h4>
          <ul>
            {(m.lessons || []).map((l, j) => (
              <li key={j}>📄 {l.title}</li>
            ))}
          </ul>

          <button onClick={() => setActiveModule(i)}>+ Thêm bài học</button>
        </div>
      ))}

      <button onClick={() => setShowModuleModal(true)}>+ Thêm Module</button>

      <div className="actions">
        <button onClick={back}>← Quay lại</button>
        <button onClick={next}>Tiếp theo →</button>
      </div>

      {showModuleModal && (
        <ModuleModal
          onClose={() => setShowModuleModal(false)}
          onAdd={addModule}
        />
      )}

      {activeModule !== null && (
        <LessonModal
          onClose={() => setActiveModule(null)}
          onAdd={(lesson) => addLesson(activeModule, lesson)}
        />
      )}
    </div>
  );
}
