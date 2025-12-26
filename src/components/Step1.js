export default function Step1({ course, setCourse, next }) {
    return (
      <div className="card">
        <h2>Tạo Khóa Học Mới [1/3]</h2>
  
        <label>Tên khóa học *</label>
        <input
          value={course.title}
          onChange={e => setCourse({ ...course, title: e.target.value })}
        />
  
        <label>Mô tả</label>
        <textarea
          value={course.description}
          onChange={e =>
            setCourse({ ...course, description: e.target.value })
          }
        />
  
        <label>Thời lượng (giờ)</label>
        <input
          type="number"
          value={course.duration}
          onChange={e =>
            setCourse({ ...course, duration: e.target.value })
          }
        />
  
        <label>Danh mục</label>
        <select
          value={course.category}
          onChange={e =>
            setCourse({ ...course, category: e.target.value })
          }
        >
          <option value="">-- Chọn --</option>
          <option value="Programming">Programming</option>
          <option value="Design">Design</option>
        </select>
  
        <button onClick={next}>Tiếp theo →</button>
      </div>
    );
  }
  