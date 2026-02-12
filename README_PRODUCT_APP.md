# 🛍️ Product CRUD Application

Ứng dụng quản lý sản phẩm với .NET Core API Backend và React Frontend.

## 📋 Mô tả

Project bao gồm:

- **Backend**: ASP.NET Core Minimal API với Entity Framework Core
- **Frontend**: React + Vite với UI đẹp mắt để test API
- **Database**: SQL Server

## 🚀 Hướng dẫn chạy

### Bước 1: Chạy Backend API

```bash
cd MyDockerApp
dotnet run
```

Backend sẽ chạy tại: **http://localhost:5000**

API Endpoints:

- `GET /api/products` - Lấy tất cả sản phẩm
- `GET /api/products/{id}` - Lấy sản phẩm theo ID
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/{id}` - Cập nhật sản phẩm
- `DELETE /api/products/{id}` - Xóa sản phẩm

### Bước 2: Chạy Frontend

Mở terminal mới:

```bash
cd product-frontend
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:5173**

Truy cập vào trình duyệt để sử dụng UI quản lý sản phẩm!

## ✨ Tính năng

### Backend API

- ✅ CRUD đầy đủ cho Product entity
- ✅ CORS configuration cho phép frontend gọi API
- ✅ Entity Framework Core với SQL Server
- ✅ Auto migration khi khởi động
- ✅ OpenAPI/Swagger documentation

### Frontend UI

- ✅ Form thêm/sửa sản phẩm với validation
- ✅ Hiển thị danh sách sản phẩm dạng card
- ✅ Chức năng Edit và Delete
- ✅ Loading states và error handling
- ✅ Responsive design
- ✅ UI đẹp với gradient background

## 🗂️ Cấu trúc Project

```
raw-project/
├── MyDockerApp/              # Backend .NET API
│   ├── Data/
│   │   └── AppDbContext.cs
│   ├── Models/
│   │   └── Product.cs
│   ├── Program.cs            # API endpoints
│   └── appsettings.json
│
└── product-frontend/         # Frontend React
    ├── src/
    │   ├── ProductManager.jsx   # Main component
    │   ├── ProductManager.css
    │   ├── App.jsx
    │   └── App.css
    └── package.json
```

## 📊 Product Model

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
}
```

## 🔧 Yêu cầu hệ thống

- **.NET SDK** (10.0 hoặc cao hơn)
- **Node.js** (18.0 hoặc cao hơn)
- **SQL Server** (hoặc cấu hình connection string trong appsettings.json)

## 🎯 Test API

### Sử dụng UI

1. Chạy cả backend và frontend
2. Truy cập http://localhost:5173
3. Sử dụng form để thêm/sửa/xóa sản phẩm

### Sử dụng HTTP Client / Postman

```bash
# GET - Lấy tất cả products
GET http://localhost:5000/api/products

# POST - Tạo product mới
POST http://localhost:5000/api/products
Content-Type: application/json

{
  "name": "iPhone 15",
  "price": 999.99,
  "description": "Latest iPhone model"
}

# PUT - Cập nhật product
PUT http://localhost:5000/api/products/1
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "price": 1199.99,
  "description": "Pro version"
}

# DELETE - Xóa product
DELETE http://localhost:5000/api/products/1
```

## 🎨 Screenshots

Frontend bao gồm:

- 📝 Form nhập liệu với các trường: Name, Price, Description
- 📋 Grid hiển thị products với card design
- ✏️ Nút Edit để chỉnh sửa
- 🗑️ Nút Delete để xóa
- 🔄 Nút Reload để tải lại danh sách
- ⚡ Real-time updates sau mỗi thao tác

## 💡 Tips

- Backend tự động chạy migration khi khởi động
- CORS đã được cấu hình cho localhost:5173 và localhost:3000
- Frontend có error handling và loading states
- Tất cả operations đều có confirm dialog (cho Delete)

## 🤝 Đóng góp

Project này được tạo để demo CRUD API cơ bản. Bạn có thể mở rộng thêm:

- Authentication/Authorization
- Pagination
- Search/Filter
- Image upload
- Export to Excel/PDF

Chúc bạn code vui vẻ! 🎉
