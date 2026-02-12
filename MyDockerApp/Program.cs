using Microsoft.EntityFrameworkCore;
using MyDockerApp.Data;
using MyDockerApp.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Thêm CORS để cho phép frontend gọi API
builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "MyPolicy",
                    policy =>
                    {
                        policy.WithOrigins(builder.Configuration["AllowedClient:ClientUri"] ?? throw new Exception("AllowedClient:ClientUri is not configured"))
                        .AllowCredentials()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
            });

// Thêm DbContext với SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Tự động cập nhật migration khi app khởi chạy
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        context.Database.Migrate(); // Tự động áp dụng các migration chưa được cập nhật
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Có lỗi xảy ra khi cập nhật database migration");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseHttpsRedirection(); // Chỉ dùng HTTPS redirect ở Development
}

// Sử dụng CORS
app.UseCors("MyPolicy");

// ===== PRODUCT API ENDPOINTS =====

// GET: Lấy tất cả products
app.MapGet("/api/products", async (AppDbContext db) =>
{
    var products = await db.Products.OrderByDescending(p => p.CreatedAt).ToListAsync();
    return Results.Ok(products);
})
.WithName("GetAllProducts")
.WithTags("Products");

// GET: Lấy product theo ID
app.MapGet("/api/products/{id}", async (int id, AppDbContext db) =>
{
    var product = await db.Products.FindAsync(id);
    return product is not null ? Results.Ok(product) : Results.NotFound(new { message = $"Product với ID {id} không tồn tại" });
})
.WithName("GetProductById")
.WithTags("Products");

// POST: Tạo product mới
app.MapPost("/api/products", async (Product product, AppDbContext db) =>
{
    product.CreatedAt = DateTime.UtcNow;
    db.Products.Add(product);
    await db.SaveChangesAsync();
    return Results.Created($"/api/products/{product.Id}", product);
})
.WithName("CreateProduct")
.WithTags("Products");

// PUT: Cập nhật product
app.MapPut("/api/products/{id}", async (int id, Product updatedProduct, AppDbContext db) =>
{
    var product = await db.Products.FindAsync(id);
    if (product is null)
        return Results.NotFound(new { message = $"Product với ID {id} không tồn tại" });

    product.Name = updatedProduct.Name;
    product.Price = updatedProduct.Price;
    product.Description = updatedProduct.Description;

    await db.SaveChangesAsync();
    return Results.Ok(product);
})
.WithName("UpdateProduct")
.WithTags("Products");

// DELETE: Xóa product
app.MapDelete("/api/products/{id}", async (int id, AppDbContext db) =>
{
    var product = await db.Products.FindAsync(id);
    if (product is null)
        return Results.NotFound(new { message = $"Product với ID {id} không tồn tại" });

    db.Products.Remove(product);
    await db.SaveChangesAsync();
    return Results.Ok(new { message = $"Đã xóa product {product.Name}" });
})
.WithName("DeleteProduct")
.WithTags("Products");

// ===== END PRODUCT API ENDPOINTS =====

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
