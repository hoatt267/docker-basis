# Product Management Frontend

Frontend React application để test CRUD API cho Product entity.

## Cài đặt

Dependencies đã được cài đặt tự động khi tạo project.

## Chạy ứng dụng

### 1. Chạy Backend (.NET API)

```bash
cd MyDockerApp
dotnet run
```

Backend sẽ chạy trên `http://localhost:5000`

### 2. Chạy Frontend (React)

Mở terminal mới:

```bash
cd product-frontend
npm run dev
```

Frontend sẽ chạy trên `http://localhost:5173`

## Tính năng

- ✅ **GET** - Xem danh sách tất cả products
- ✅ **POST** - Thêm product mới
- ✅ **PUT** - Cập nhật product
- ✅ **DELETE** - Xóa product

## API Endpoints

```
GET    /api/products       - Lấy tất cả products
GET    /api/products/{id}  - Lấy product theo ID
POST   /api/products       - Tạo product mới
PUT    /api/products/{id}  - Cập nhật product
DELETE /api/products/{id}  - Xóa product
```

## Screenshot Features

- Form nhập liệu với validation
- Grid hiển thị products với card design
- Nút Edit/Delete cho mỗi product
- Loading states và error handling
- Responsive design

## Công nghệ sử dụng

- **Frontend**: React + Vite
- **Backend**: ASP.NET Core Minimal API
- **Database**: SQL Server + Entity Framework Core
- **Styling**: Custom CSS với gradient background
