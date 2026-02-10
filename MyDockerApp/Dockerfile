# --- Stage 1: Build (Dùng SDK để compile code) ---
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copy file csproj và restore các thư viện (Nuget)
COPY *.csproj ./
RUN dotnet restore

# Copy toàn bộ code còn lại và Build ra file dll
COPY . ./
RUN dotnet publish -c Release -o out

# --- Stage 2: Runtime (Chỉ dùng Runtime để chạy, cho nhẹ) ---
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .

# Mở cổng 8080 trong container (NET 10 mặc định dùng 8080)
EXPOSE 8080

# Chạy file dll khi container khởi động
ENTRYPOINT ["dotnet", "MyDockerApp.dll"]