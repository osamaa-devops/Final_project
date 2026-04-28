
# مهام يدوية تحتاج إلى إجراء يدوي

هذا الملف يحتوي على جميع المهام التي تحتاج تنفيذاً يدوياً ولا يمكن تنفيذها تلقائياً

## 1️⃣ إعداد MongoDB

### Option A: استخدام MongoDB Atlas (موصى به للإنتاج)

- انشئ حساب على [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- أنشئ cluster جديد
- احصل على connection string
- أنشئ user و password للوصول
- احفظ البيانات في متغيرات البيئة:
  ```bash
  MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/solar-system
  MONGO_USERNAME=your-username
  MONGO_PASSWORD=your-password
  ```

### Option B: استخدام MongoDB محلي (للتطوير)

```bash
# Windows
mongod.exe

# Linux
mongod

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**ملاحظة:** المشروع يعمل بدون MongoDB باستخدام fallback data المدمجة في الكود

---

## 2️⃣ إعداد AWS (لـ Deployment)

### أ. الـ Credentials

- انشئ AWS IAM user جديد
- احصل على `AWS_ACCESS_KEY_ID` و `AWS_SECRET_ACCESS_KEY`
- احفظها في مكان آمن

### ب. Terraform

```bash
cd terraform/
# تعديل terraform.tfvars
cp terraform.tfvars.example terraform.tfvars
# استكمل القيم:
# - aws_region
# - cluster_name
# - vpc_cidr
# - private_subnets
# - public_subnets

# التشغيل
terraform init
terraform plan
terraform apply
```

### ج. ECR Repository

- انشئ ECR repository في AWS
- احصل على URI
- استخدمه في CI/CD

---

## 3️⃣ إعداد GitHub

### أ. GitHub Secrets

أضف هذه الـ secrets في repo settings:

```
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>
AWS_REGION=us-east-1
EKS_CLUSTER_NAME=solar-system-cluster
ECR_REPOSITORY=solar-system
MONGO_URI=<your-mongodb-uri>
MONGO_USERNAME=<your-username>
MONGO_PASSWORD=<your-password>
```

### ب. Kubernetes Secrets (اختياري)

```bash
kubectl create secret generic mongo-db-creds \
  --from-literal=MONGO_URI='your-mongodb-uri' \
  --from-literal=MONGO_USERNAME='your-username' \
  --from-literal=MONGO_PASSWORD='your-password' \
  -n production
```

---

## 4️⃣ الصور (Images)

### ملاحظة مهمة:

الصور الحالية هي **SVG placeholders**. يمكنك:

1. **استبدالها بصور حقيقية:**
   - ضع صور عالية الجودة في مجلد `images/`
   - استخدم أسماء الملفات ذاتها: `mercury.png`, `venus.png`, إلخ
   - أو عدّل `app.js` لتغيير امتدادات الملفات

2. **استخدام CDN:**
   - انسخ رابط الصور من CDN
   - أضفه في `app.js` في `fallbackPlanets` array

3. **استخدام URL خارجي:**
   - احصل على رابط مباشر لكل كوكب
   - عدّل الخاصية `image` في `app.js`

---

## 5️⃣ الخلفية

الملف الحالي `images/background.svg` هو placeholder. يمكنك:

1. استبداله برسمة أفضل للنظام الشمسي
2. استخدام صورة من Unsplash أو Pexels
3. تحديث الرابط في `index.html`

---

## 6️⃣ DNS و HTTPS (للإنتاج)

1. استخدم Route53 أو registrar آخر لـ DNS
2. أضف certificate من ACM أو Let's Encrypt
3. اربط الـ load balancer باسم النطاق

---

## 7️⃣ الـ Monitoring و Logging

اختياري لكن موصى به:

- تفعيل CloudWatch من AWS
- إضافة application logging
- إعداد alerts للأخطاء

---

## ✅ Checklist

قبل الـ deployment للإنتاج:

- [ ] MongoDB URI و credentials جاهزة
- [ ] AWS account و IAM user تم إنشاؤهما
- [ ] Terraform variables معبأة
- [ ] GitHub Secrets مضافة
- [ ] صور الكواكب استبدلت بصور حقيقية
- [ ] Domain و SSL certificate جاهزة
- [ ] Kubernetes manifests مراجعة
- [ ] CI/CD pipeline تجربة
- [ ] Load balancer يعمل بشكل صحيح

---

## 🔗 مراجع مفيدة

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [AWS EKS Guide](https://docs.aws.amazon.com/eks/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
