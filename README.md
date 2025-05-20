# Ứng dụng Todo với Next.js, Redux Toolkit và Tailwind CSS

Một ứng dụng Todo hiện đại được xây dựng bằng Next.js, Redux Toolkit để quản lý state, và được tạo kiểu bằng Tailwind CSS.

## Tính năng

- Thêm, sửa và xóa công việc
- Đánh dấu công việc đã hoàn thành/chưa hoàn thành
- Xác nhận trước khi xóa công việc
- Thông báo lỗi khi thêm công việc rỗng
- Lưu trữ dữ liệu bằng localStorage
- Giao diện người dùng sạch sẽ và responsive
- Hỗ trợ TypeScript

## Yêu cầu hệ thống

- Node.js phiên bản 14.x trở lên
- npm hoặc yarn

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd todo-app
```

2. Cài đặt các dependencies:
```bash
npm install
# hoặc
yarn install
```

## Chạy ứng dụng

1. Khởi động server phát triển:
```bash
npm run dev
# hoặc
yarn dev
```

2. Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt để xem ứng dụng.

## Ghi chú kỹ thuật

- Ứng dụng sử dụng Redux Toolkit để quản lý state
- Dữ liệu todo được lưu trữ trong localStorage
- Giao diện được xây dựng bằng Tailwind CSS với thiết kế hiện đại và responsive
- Sử dụng TypeScript để đảm bảo tính type-safe
- Các component được tổ chức theo cấu trúc module để dễ bảo trì
- Xử lý hydration với Next.js để tránh lỗi SSR

## Cấu trúc dự án

```
src/
  ├── app/
  │   ├── components/
  │   │   ├── AddTodo.tsx     # Component thêm công việc mới
  │   │   ├── TodoItem.tsx    # Component hiển thị một công việc
  │   │   ├── TodoList.tsx    # Component hiển thị danh sách công việc
  │   │   ├── ConfirmModal.tsx # Modal xác nhận xóa
  │   │   └── Toast.tsx       # Component hiển thị thông báo
  │   ├── store/
  │   │   ├── store.ts        # Cấu hình Redux store
  │   │   └── todoSlice.ts    # Redux slice cho todo
  │   ├── page.tsx            # Trang chính của ứng dụng
  │   └── layout.tsx          # Layout chung
  └── ...
```

## Công nghệ sử dụng

- **Next.js**: Framework React hiện đại
- **Redux Toolkit**: Quản lý state
- **Tailwind CSS**: Tạo kiểu và responsive
- **TypeScript**: Đảm bảo type safety
- **localStorage**: Lưu trữ dữ liệu cục bộ

## Hướng dẫn sử dụng

1. **Thêm công việc mới**:
   - Nhập nội dung vào ô input
   - Nhấn nút "Thêm" hoặc Enter
   - Nếu để trống, sẽ hiển thị thông báo lỗi

2. **Đánh dấu hoàn thành**:
   - Click vào checkbox bên trái công việc
   - Công việc hoàn thành sẽ được gạch ngang và đổi màu

3. **Sửa công việc**:
   - Nhấn nút "Sửa"
   - Chỉnh sửa nội dung
   - Nhấn "Lưu" để cập nhật thay đổi

4. **Xóa công việc**:
   - Nhấn nút "Xóa"
   - Xác nhận trong modal hiện ra
   - Nhấn "Xóa" để xác nhận hoặc "Hủy" để đóng

## Tính năng bổ sung

- **Xác nhận xóa**: Modal xác nhận trước khi xóa công việc
- **Thông báo lỗi**: Toast message khi thêm công việc rỗng
- **Lưu trữ tự động**: Dữ liệu được tự động lưu vào localStorage
- **Responsive**: Giao diện thích ứng với mọi kích thước màn hình