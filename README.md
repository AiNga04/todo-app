# Todo App với Next.js, Redux Toolkit và Tailwind CSS

Ứng dụng quản lý công việc đơn giản được xây dựng bằng Next.js, Redux Toolkit và Tailwind CSS.

## Tính năng chính

### Quản lý công việc
- Thêm công việc mới với nội dung và deadline tùy chọn
- Chỉnh sửa nội dung và deadline của công việc
- Xóa công việc với xác nhận
- Đánh dấu hoàn thành công việc với xác nhận
- Hiển thị thời điểm tạo và hoàn thành công việc

### Deadline và thời gian
- Thêm deadline cho công việc (tùy chọn)
- Validation deadline:
  - Không thể đặt deadline trước thời điểm tạo công việc
  - Không thể đặt deadline trước thời điểm hiện tại
  - Deadline phải sau thời điểm hiện tại ít nhất 1 phút
- Hiển thị trạng thái deadline:
  - Xanh: Còn hạn
  - Vàng: Sắp hết hạn (trong vòng 24h)
  - Đỏ: Quá hạn
- Hiển thị trạng thái hoàn thành:
  - "Hoàn thành đúng hạn": Hoàn thành trước deadline
  - "Hoàn thành trễ": Hoàn thành sau deadline

### Lọc và phân trang
- Lọc công việc theo trạng thái:
  - Tất cả
  - Đã hoàn thành
  - Chưa hoàn thành
- Phân trang:
  - 15 công việc mỗi trang
  - Điều hướng giữa các trang
  - Hiển thị số trang hiện tại và tổng số trang

### Lưu trữ và giao diện
- Tự động lưu dữ liệu vào localStorage
- Giao diện responsive với Tailwind CSS
- Modal xác nhận cho các hành động quan trọng
- Thông báo lỗi rõ ràng khi:
  - Thêm công việc rỗng

## Cài đặt và chạy

1. Clone repository:
```bash
git clone https://github.com/AiNga04/todo-app.git
cd todo-app
```

2. Cài đặt dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Chạy ứng dụng:
```bash
npm run dev
# hoặc
yarn dev
```

4. Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt

## Cấu trúc dự án

```
src/
  ├── app/
  │   ├── components/          # Các component của ứng dụng
  │   │   ├── AddTodo.tsx     # Component thêm công việc mới (cũ)
  │   │   ├── TodoForm.tsx    # Component form thêm công việc mới
  │   │   ├── TodoItem.tsx    # Component hiển thị và quản lý một công việc
  │   │   ├── TodoList.tsx    # Component hiển thị danh sách công việc
  │   │   ├── TodoFilter.tsx  # Component lọc công việc
  │   │   ├── Pagination.tsx  # Component phân trang
  │   │   ├── ConfirmModal.tsx # Modal xác nhận các hành động
  │   │   └── Toast.tsx       # Component hiển thị thông báo
  │   ├── store/              # Quản lý state với Redux
  │   │   ├── store.ts        # Cấu hình Redux store
  │   │   └── todoSlice.ts    # Redux slice quản lý state todo
  │   ├── globals.css         # CSS toàn cục
  │   ├── page.tsx            # Trang chính của ứng dụng
  │   └── layout.tsx          # Layout chung
  └── ...
```

## Công nghệ sử dụng

- **Next.js**: Framework React
- **Redux Toolkit**: Quản lý state
- **Tailwind CSS**: Styling và responsive
- **TypeScript**: Type safety
- **localStorage**: Lưu trữ dữ liệu

## Hướng dẫn sử dụng

### Thêm công việc mới
1. Nhập nội dung công việc
2. (Tùy chọn) Chọn deadline
   - Deadline phải sau thời điểm hiện tại ít nhất 1 phút
3. Nhấn "Thêm" hoặc Enter
4. Nếu có lỗi (nội dung rỗng hoặc deadline không hợp lệ), thông báo lỗi sẽ hiển thị

### Quản lý công việc
1. **Chỉnh sửa**:
   - Nhấn nút "Sửa"
   - Cập nhật nội dung và/hoặc deadline
   - Nhấn "Lưu" để cập nhật

2. **Đánh dấu hoàn thành**:
   - Click vào checkbox
   - Xác nhận trong modal
   - Công việc sẽ hiển thị:
     - Thời điểm hoàn thành
     - Trạng thái hoàn thành (đúng hạn/trễ hạn)

3. **Xóa**:
   - Nhấn nút "Xóa"
   - Xác nhận trong modal

### Lọc và phân trang
1. **Lọc**:
   - Sử dụng các nút: Tất cả/Đã hoàn thành/Chưa hoàn thành
   - Danh sách sẽ tự động cập nhật

2. **Phân trang**:
   - Mỗi trang hiển thị 15 công việc
   - Sử dụng nút "Trước" và "Sau" để điều hướng
   - Hiển thị số trang hiện tại và tổng số trang