# إعداد MongoDB Atlas للمشروع

## ⚠️ خطوة أمان أولاً - تغيير الـ Password

لأنك أرسلت الـ password علناً، **يجب تغييره الآن**:

1. اذهب إلى: https://cloud.mongodb.com
2. اضغط **Sign In** بـ حسابك
3. اختر الـ Project الخاص بك
4. روح **Database Access** (في القائمة اليسار)
5. اضغط على الـ 3 نقاط بجانب user `osamareda170_db`
6. اختر **Edit Password**
7. اختر password جديد (مثلاً: `MySecurePass123!@#`)
8. اضغط **Update User**

---

## 📌 البيانات الحالية:

```
Cluster: my-cluster
User: osamareda170_db
Database: solar-system
Region: (تحقق من MongoDB Atlas)
```

---

## 🔑 الـ Connection String:

بعد تغيير الـ password، اضغط على **Connect** في MongoDB Atlas:

1. اختر **Connect your application**
2. اختر **Node.js** كـ Driver
3. انسخ الـ URI (شبه هكذا):

```
mongodb+srv://osamareda170_db:YOUR_NEW_PASSWORD@my-cluster.elbbxlw.mongodb.net/solar-system?retryWrites=true&w=majority
```

---

## 💾 احفظ في `.env`:

في مجلد المشروع (`f:\Final_project\solar-system-main`)، عدّل ملف `.env`:

```env
PORT=3000
MONGO_URI=mongodb+srv://osamareda170_db:YOUR_NEW_PASSWORD@my-cluster.elbbxlw.mongodb.net/solar-system?retryWrites=true&w=majority
MONGO_USERNAME=osamareda170_db
MONGO_PASSWORD=YOUR_NEW_PASSWORD
NODE_ENV=development
```

**استبدل `YOUR_NEW_PASSWORD` بـ الـ password الجديد الذي اخترته**

---

## 🚀 تشغيل التطبيق:

```powershell
cd f:\Final_project\solar-system-main
npm start
```

يجب ترى:

```
Server successfully running on port - 3000
```

---

## ✅ اختبار الاتصال:

### الطريقة 1: الـ Browser

اذهب إلى: `http://localhost:3000`

يجب ترى صفحة Solar System مع كل الكواكب

### الطريقة 2: API endpoint

```powershell
# في PowerShell terminal جديد
Invoke-WebRequest http://localhost:3000/ready | Select-Object -ExpandProperty Content
```

يجب ترد: `{"status":"ready"}`

### الطريقة 3: Post request لكوكب

```powershell
$body = @{id=1} | ConvertTo-Json
Invoke-WebRequest -Uri http://localhost:3000/planet `
  -Method POST `
  -ContentType "application/json" `
  -Body $body | Select-Object -ExpandProperty Content
```

يجب ترد معلومات عن Mercury

---

## 🔍 معلومات إضافية:

### الملفات الآمنة:

- ✅ `.env` - محلي فقط (في `.gitignore`)
- ✅ `.env.example` - نموذج بدون passwords
- ✅ `do.md` - تعليمات عامة

### عند الرفع على GitLab:

1. ❌ لا ترفع `.env` (مخفي بـ .gitignore)
2. ✅ في GitLab Settings → CI/CD → Variables أضف:
   - `MONGO_URI`
   - `MONGO_USERNAME`
   - `MONGO_PASSWORD`

---

## ❌ مشاكل شائعة:

### المشكلة: "Authentication failed"

**الحل:** تأكد من:

- الـ password صحيح
- الـ username صحيح: `osamareda170_db`
- الـ cluster name صحيح: `my-cluster`

### المشكلة: "Connection refused"

**الحل:** تأكد من:

- MongoDB Atlas IP whitelist يشمل الـ IP تبعك
- (للإنتاج: أضف `0.0.0.0/0` مؤقتاً للاختبار فقط)

### المشكلة: التطبيق يعمل لكن بدون MongoDB

**الحل:** يعمل تلقائياً بـ fallback data - هذا OK للتطوير

---

## 🆘 تحتاج مساعدة؟

اتبع هذه الخطوات بالترتيب:

1. [ ] غيّرت الـ password على MongoDB Atlas
2. [ ] نسخت الـ URI الجديد من MongoDB Atlas
3. [ ] عدّلت `.env` ملف بـ الـ URI الجديد
4. [ ] شغّلت `npm start`
5. [ ] اختبرت `http://localhost:3000`
