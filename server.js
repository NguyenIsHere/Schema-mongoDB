const mongoose = require('mongoose')

// Định nghĩa schema cho Student
const studentSchema = new mongoose.Schema({
  clerkUserID: {
    type: String,
    required: true,
    unique: true
  },
  userRole: {
    type: String,
    enum: ['student', 'teacher', 'accountant', 'manager', 'admin'],
    required: true
  },
  mongoID: {
    type: String,
    required: true,
    unique: true
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseInfo',
      required: true
    }
  ] // Danh sách các khóa học của sinh viên (mảng ObjectId tham chiếu đến CourseInfo)
})

// Định nghĩa schema cho CourseInfo
const courseInfoSchema = new mongoose.Schema({
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }, // ID khóa học, tham chiếu tới model Course
  enrollDate: {
    type: String,
    required: true,
    match: /^\d{2} \d{2} \d{4}$/ // Kiểm tra định dạng ngày "dd mm yyyy"
  },
  isPaid: {
    type: Boolean,
    required: true
  },
  paycheckIMG: {
    type: String,
    required: false,
    match: /^(http|https):\/\/[^\s$.?#].[^\s]*$/ // Đảm bảo URL hợp lệ
  }
})

// Định nghĩa schema cho Teacher
const teacherSchema = new mongoose.Schema({
  clerkUserID: {
    type: String,
    required: true,
    unique: true
  },
  userRole: {
    type: String,
    enum: ['student', 'teacher', 'accountant', 'manager', 'admin'],
    required: true
  },
  mongoID: {
    type: String,
    required: true,
    unique: true
  },
  courses: [
    {
      type: [String],
      required: true
    }
  ], // Danh sách các id khóa học giảng dạy
  monthlySalary: {
    type: Number,
    required: true,
    min: 0
  },
  courseSalary: {
    type: Number,
    required: true,
    min: 0
  },
  paycheckList: [
    {
      type: [String],
      required: true
    }
  ] // Danh sách các bill nhận lương
})

// Định nghĩa schema cho Course
const courseSchema = new mongoose.Schema({
  courseID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true
    }
  ], // Danh sách lớp học trong khóa học (mảng ObjectId tham chiếu đến Class)
  teachers: [
    {
      type: [String],
      required: true
    }
  ], // Danh sách tên các giáo viên giảng dạy khóa học
  price: {
    type: Number,
    required: true,
    min: 0
  },
  compareAtPrice: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  totalVote: {
    type: Number,
    required: true,
    min: 0
  },
  target: {
    type: [String],
    required: true
  },
  sumary: {
    type: [String],
    required: true
  },
  studentList: {
    type: [String],
    required: true,
    unique: true
  }, // Danh sách các học sinh tham gia khóa học (lưu = id)
  studentLimit: {
    type: Number,
    required: true,
    min: 1
  },
  appliedNumber: {
    type: Number,
    required: true,
    min: 0
  },
  coverIMG: {
    type: String,
    required: true,
    match: /^(http|https):\/\/[^\s$.?#].[^\s]*$/
  },
  startDate: {
    type: String,
    required: true,
    match: /^\d{2} \d{2} \d{4}$/ // Kiểm tra định dạng ngày "dd mm yyyy"
  },
  endDate: {
    type: String,
    required: true,
    match: /^\d{2} \d{2} \d{4}$/ // Kiểm tra định dạng ngày "dd mm yyyy"
  }
})

// Định nghĩa schema cho Class
const classSchema = new mongoose.Schema({
  classID: {
    type: String,
    required: true,
    unique: true
  }, // ID của lớp học
  type: {
    type: String,
    enum: ['repeat', 'oneTime'],
    required: true
  }, // Loại lớp học: lặp lại hay một lần
  schedule: {
    type: [String],
    required: true
  }, // Lịch học của lớp học
  name: {
    type: String,
    required: true
  }, // Tên buổi học
  description: {
    type: [[String]],
    required: true
  }, // Thông tin mô tả về buổi học
  teachers: {
    type: [[String]],
    required: true
  }, // Các giảng viên dạy lớp học này
  lessonList: {
    type: [String],
    required: true
  }, // Danh sách bài học trong lớp học
  progress: {
    type: Number,
    required: true,
    min: 1
  }, // Buổi học hiện tại là buổi thứ mấy
  documents: {
    type: [String],
    required: true,
    match: /^(http|https):\/\/[^\s$.?#].[^\s]*$/
  }, // Link tài liệu lớp học (phải là URL)
  isActive: {
    type: Boolean,
    required: true
  }, // Lớp học còn hoạt động hay không
  meeting: {
    type: String,
    required: true,
    match: /^(http|https):\/\/[^\s$.?#].[^\s]*$/
  }, // Đường dẫn vào meeting của lớp học
  coverIMG: {
    type: String,
    required: true,
    match: /^(http|https):\/\/[^\s$.?#].[^\s]*$/
  }, // Đường dẫn hình ảnh của lớp học
  startDate: {
    type: String,
    required: true,
    match: /^\d{2} \d{2} \d{4}$/ // Kiểm tra định dạng ngày "dd mm yyyy"
  }, // Ngày bắt đầu lớp học
  endDate: {
    type: String,
    required: true,
    match: /^\d{2} \d{2} \d{4}$/ // Kiểm tra định dạng ngày "dd mm yyyy"
  } // Ngày kết thúc lớp học
})

// Định nghĩa schema cho Salary
const salarySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['teacher', 'accountant', 'manager', 'admin'],
    required: true
  },
  receiverID: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true,
    min: 0
  }
})

// Định nghĩa schema cho Accountant
const accountantSchema = new mongoose.Schema({
  clerkUserID: {
    type: String,
    required: true,
    unique: true
  }, // ID người dùng trên hệ thống Clerk
  role: {
    type: String,
    enum: ['student', 'teacher', 'accountant', 'manager', 'admin'],
    required: true
  }, // Vai trò của người dùng
  mongoID: {
    type: String,
    required: true,
    unique: true
  }, // ID MongoDB của đối tượng
  monthlySalary: {
    type: Number,
    required: true,
    min: 0 // Lương hàng tháng
  },
  paycheckList: {
    type: [String],
    required: true // Danh sách các bill chuyển khoản
  }
})

// Định nghĩa schema cho Manager
const managerSchema = new mongoose.Schema({
  clerkUserID: {
    type: String,
    required: true,
    unique: true
  }, // ID người dùng trên hệ thống Clerk
  role: {
    type: String,
    enum: ['student', 'teacher', 'accountant', 'manager', 'admin'],
    required: true
  }, // Vai trò của người dùng
  mongoID: {
    type: String,
    required: true,
    unique: true
  }, // ID MongoDB của đối tượng
  monthlySalary: {
    type: Number,
    required: true,
    min: 0 // Lương hàng tháng
  },
  paycheckList: {
    type: [String],
    required: true // Danh sách các bill chuyển khoản
  }
})

// Định nghĩa schema cho Admin
const adminSchema = new mongoose.Schema({
  clerkUserID: {
    type: String,
    required: true,
    unique: true
  }, // ID người dùng trên hệ thống Clerk
  role: {
    type: String,
    enum: ['student', 'teacher', 'accountant', 'manager', 'admin'],
    required: true
  }, // Vai trò của người dùng
  mongoID: {
    type: String,
    required: true,
    unique: true
  }, // ID MongoDB của đối tượng
  monthlySalary: {
    type: Number,
    required: true,
    min: 0 // Lương hàng tháng
  },
  paycheckList: {
    type: [String],
    required: true // Danh sách các bill chuyển khoản
  }
})

// Tạo model từ schema
const Student = mongoose.model('Student', studentSchema)
const CourseInfo = mongoose.model('CourseInfo', courseInfoSchema)
const Teacher = mongoose.model('Teacher', teacherSchema)
const Course = mongoose.model('Course', courseSchema)
const Class = mongoose.model('Class', classSchema)

const Salary = mongoose.model('Salary', salarySchema)
const Accountant = mongoose.model('Accountant', accountantSchema)
const Manager = mongoose.model('Manager', managerSchema)
const Admin = mongoose.model('Admin', adminSchema)
