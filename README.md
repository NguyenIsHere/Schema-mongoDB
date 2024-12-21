# Schema-mongoDB
Cách viết schema cho các object trong mongoDB. Ví dụ:


## npm install mongoose
const mongoose = require('mongoose');

## Kết nối với MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

## Định nghĩa Schema cho Student
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Tên của sinh viên
  age: { type: Number, required: true },  // Tuổi của sinh viên
  email: { type: String, unique: true },  // Địa chỉ email, phải duy nhất
  enrolled: { type: Boolean, default: true },  // Trạng thái học
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]  // Liên kết tới Course
});

## Tạo model từ schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

# Các Data Types mà MongoDB Hỗ Trợ
1. String
Dùng để lưu trữ văn bản (chuỗi ký tự).
name: { type: String }

2. Number
Dùng để lưu trữ số (cả số nguyên và số thực).
age: { type: Number }

3. Boolean
Dùng để lưu trữ giá trị đúng hoặc sai (true/false).
isActive: { type: Boolean }

4. Date
Dùng để lưu trữ ngày tháng (date/time).
dateOfBirth: { type: Date }

5. Buffer
Dùng để lưu trữ dữ liệu nhị phân (binary data).
image: { type: Buffer }

6. ObjectId
Dùng để lưu trữ ID của các đối tượng khác trong MongoDB (thường được sử dụng để tạo mối quan hệ giữa các document).
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

7. Array
Dùng để lưu trữ mảng các giá trị. Mảng có thể chứa bất kỳ loại dữ liệu nào.
tags: { type: [String] }  // Mảng chuỗi
scores: { type: [Number] }  // Mảng số

8. Mixed
Dùng khi bạn không biết kiểu dữ liệu chính xác và muốn lưu trữ dữ liệu bất kỳ dạng nào (lưu trữ dữ liệu không có cấu trúc cố định).
data: { type: mongoose.Schema.Types.Mixed }

9. Decimal128
Lưu trữ số thực có độ chính xác cao (thường dùng cho tiền tệ, tài chính).
price: { type: mongoose.Schema.Types.Decimal128 }

10. Map
Lưu trữ các cặp key-value.
meta: { type: Map, of: String }