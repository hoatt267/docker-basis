import { useState, useEffect } from "react";
import "./ProductManager.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/products";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load products khi component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // GET: Lấy tất cả products
  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Không thể tải danh sách sản phẩm");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // POST: Tạo product mới
  const createProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          description: formData.description,
        }),
      });
      if (!response.ok) throw new Error("Không thể tạo sản phẩm");
      await fetchProducts();
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // PUT: Cập nhật product
  const updateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          description: formData.description,
        }),
      });
      if (!response.ok) throw new Error("Không thể cập nhật sản phẩm");
      await fetchProducts();
      resetForm();
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE: Xóa product
  const deleteProduct = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Không thể xóa sản phẩm");
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Chọn product để edit
  const editProduct = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      description: product.description,
    });
    setIsEditing(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({ id: null, name: "", price: "", description: "" });
    setIsEditing(false);
  };

  const handleSubmit = isEditing ? updateProduct : createProduct;

  return (
    <div className="product-manager">
      <h1>🛍️ Quản lý Sản phẩm DONE</h1>

      {error && <div className="error-message">{error}</div>}

      {/* Form tạo/sửa product */}
      <div className="form-section">
        <h2>{isEditing ? "✏️ Sửa sản phẩm" : "➕ Thêm sản phẩm mới"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên sản phẩm:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          <div className="form-group">
            <label>Giá:</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
              placeholder="Nhập giá"
            />
          </div>
          <div className="form-group">
            <label>Mô tả:</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Nhập mô tả sản phẩm"
              rows="3"
            />
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "⏳ Đang xử lý..."
                : isEditing
                  ? "💾 Cập nhật"
                  : "➕ Thêm mới"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                ❌ Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Danh sách products */}
      <div className="products-section">
        <div className="section-header">
          <h2>📋 Danh sách sản phẩm</h2>
          <button
            className="btn btn-refresh"
            onClick={fetchProducts}
            disabled={loading}
          >
            🔄 Tải lại
          </button>
        </div>

        {loading && <div className="loading">⏳ Đang tải...</div>}

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <h3>{product.name}</h3>
                <span className="product-price">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <p className="product-description">
                {product.description || "Không có mô tả"}
              </p>
              <div className="product-meta">
                <small>ID: {product.id}</small>
                <small>
                  Tạo: {new Date(product.createdAt).toLocaleDateString("vi-VN")}
                </small>
              </div>
              <div className="product-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => editProduct(product)}
                  disabled={loading}
                >
                  ✏️ Sửa
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteProduct(product.id)}
                  disabled={loading}
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && products.length === 0 && (
          <div className="empty-state">
            <p>📭 Chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductManager;
