export default function MaterialTypeModal({ onClose, onChoose }) {
    return (
      <div className="modal">
        <div className="modal-content wide">
          <div className="modal-header">
            <h3>Chọn loại tài liệu</h3>
            <button className="icon-btn" onClick={onClose}>✖</button>
          </div>
  
          <div className="grid-2">
            <div className="tile" onClick={() => onChoose("PDF")}>
              <div className="tile-icon">📄</div>
              <div className="tile-title">PDF</div>
            </div>
            <div className="tile" onClick={() => onChoose("H5P")}>
              <div className="tile-icon">🎯</div>
              <div className="tile-title">H5P</div>
            </div>
            <div className="tile" onClick={() => onChoose("Video")}>
              <div className="tile-icon">🎥</div>
              <div className="tile-title">Video</div>
            </div>
            <div className="tile" onClick={() => onChoose("SCORM")}>
              <div className="tile-icon">📦</div>
              <div className="tile-title">SCORM</div>
            </div>
          </div>
  
          <div className="actions">
            <button onClick={onClose}>Hủy</button>
          </div>
        </div>
      </div>
    );
  }
  