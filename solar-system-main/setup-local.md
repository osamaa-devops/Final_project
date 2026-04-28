# تشغيل المشروع محلياً

## المتطلبات

- **Node.js** (v18+)
- **npm** (v8+)
- **Git**

## خطوات التثبيت

### 1. استنساخ المشروع

```bash
git clone <repository-url>
cd solar-system-main
```

### 2. تثبيت المكتبات

```bash
npm install
```

### 3. تثبيت المكتبات العامة (اختياري)

للحصول على أدوات إضافية:

```bash
# لـ cross-env (مطلوب للاختبارات)
npm install --save-dev cross-env

# للتطوير (موجود بالفعل)
npm install --save-dev mocha chai chai-http nyc
```

---

## تشغيل التطبيق

### 1. التطوير (بدون قاعدة بيانات)

```bash
npm start
```

التطبيق سيعمل بـ fallback data المدمجة في الكود.

الدخول إلى: **http://localhost:3000**

### 2. مع MongoDB محلي

إذا كان لديك MongoDB مثبت:

**Windows:**

```bash
# أبدأ MongoDB service
net start MongoDB

# أضف متغيرات البيئة في PowerShell
$env:MONGO_URI="mongodb://localhost:27017/solar-system"
$env:MONGO_USERNAME="admin"
$env:MONGO_PASSWORD="password"

npm start
```

**Linux/Mac:**

```bash
mongod  # ابدأ MongoDB

export MONGO_URI="mongodb://localhost:27017/solar-system"
export MONGO_USERNAME="admin"
export MONGO_PASSWORD="password"

npm start
```

**Docker:**

```bash
# شغل MongoDB في Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# ثم شغل التطبيق
npm start
```

---

## الاختبارات

### تشغيل الاختبارات

```bash
npm test
```

### تشغيل التغطية

```bash
npm run coverage
```

النتائج ستظهر في:

- Terminal: تقرير نصي
- `coverage/lcov-report/index.html`: تقرير مفصل في المتصفح

---

## Endpoints المتاحة

### 1. الصفحة الرئيسية

```
GET /
```

تعيد HTML page بـ UI التطبيق

### 2. الحصول على معلومات الكوكب

```
POST /planet
Content-Type: application/json

{
  "id": 1
}
```

**الرد:**

```json
{
  "id": 1,
  "name": "Mercury",
  "description": "Mercury is the smallest planet...",
  "image": "images/mercury.svg"
}
```

### 3. معلومات النظام

```
GET /os
```

**الرد:**

```json
{
  "os": "hostname",
  "env": "development"
}
```

### 4. Liveness Probe

```
GET /live
```

**الرد:**

```json
{
  "status": "live"
}
```

### 5. Readiness Probe

```
GET /ready
```

**الرد:**

```json
{
  "status": "ready"
}
```

---

## متغيرات البيئة

### اختياري:

```bash
# المنفذ (الافتراضي: 3000)
PORT=3000

# قاعدة البيانات (اختياري - إذا لم يكن موجود، سيستخدم fallback data)
MONGO_URI=mongodb://localhost:27017/solar-system
MONGO_USERNAME=admin
MONGO_PASSWORD=password

# بيئة التطوير (الافتراضي: development)
NODE_ENV=development
```

---

## حل المشاكل

### المشكلة: "Cannot find module 'express'"

**الحل:**

```bash
npm install
```

### المشكلة: "Port 3000 is already in use"

**الحل:**

```bash
# غير المنفذ
PORT=3001 npm start

# أو افتل العملية القديمة (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### المشكلة: Tests fail

**الحل:**

```bash
# تأكد من أن NODE_ENV=test
npm test

# أو في PowerShell
$env:NODE_ENV="test"
npm test
```

### المشكلة: MongoDB connection error

**الحل:**
استخدم بدون MongoDB - التطبيق سيعمل بـ fallback data:

```bash
npm start
```

---

## ملاحظات هامة

1. **Fallback Data**: المشروع يعمل بدون MongoDB بفضل البيانات المدمجة في الكود
2. **SVG Images**: صور الكواكب حالياً SVG placeholders - يمكن استبدالها
3. **Local Development**: لا تحتاج MongoDB أو AWS للتطوير المحلي
4. **Testing**: الاختبارات تستخدم fallback data افتراضياً

---

## الخطوة التالية

- قراءة [README.md](./README.md) للمزيد من المعلومات
- قراءة [ARCHITECTURE.md](./ARCHITECTURE.md) لفهم البنية
- قراءة [do.md](./do.md) للمتطلبات اليدوية
