/* ----------------------------- Core Imports ----------------------------- */
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db_conn');

/* ------------------------------- Routers -------------------------------- */
// Auth / Users
const loginRouter = require('./routes/user');
const masterUserApi = require('./routes/master_user');
const userRoleApi = require('./routes/user_role_api');
const MasterRole = require('./routes/master_role_api');
const userDtlsRouter = require('./routes/user_dtls');

// Masters
const collegeRoutes = require('./routes/master_college_api');
const collegeGroupRoutes = require('./routes/collegeGroup');
const courseRoutes = require('./routes/master_course_api');
const subjectRoutes = require('./routes/master_subject_api');
const masterDeptsRoutes = require('./routes/master_depts');
const collegeAcadYearRoutes = require('./routes/master_acadyear_api');
const subjectCourseRoutes = require('./routes/subject_course_api');
const mastermenuRoutes = require('./routes/menu_master_api');
const masterSubjectTeacherRoutes = require('./routes/subject_teacher_api');

// Student / Teacher
const studentRoutes = require('./routes/master_student_api');
const teacherRoutes = require('./routes/master_teacher_api');
const teacherDtlsApi = require('./routes/teacher_dtls_api');
const studentMasterRoutes = require('./routes/student_master');         // bulk up
const teacherMasterRoutes = require('./routes/teacher_master_bulk_up'); // bulk up
const studentInformationRouter = require('./routes/student_information');
const studentAyRoutes = require('./routes/student_ay');

// Classroom / Routine / Availability
const classroomAPI = require('./routes/classroomapi');
const DailyRoutine = require('./routes/college_daily_routine_api');
const collegedailyroutineRoutes = require('./routes/college_daily_routine_api'); // same module, different mount
const teacherAvailabilityRoutes = require('./routes/teacher_availbility_api');

// Course offering & registration
const courseofferingRoutes = require('./routes/course_offering_api');
const courseregistrationRoutes = require('./routes/course_registration_api');

// Exams
const collegeexamroutineRoutes = require('./routes/college_exam_routine_api');
const examroutineRoutes = require('./routes/college_exam_routine_api'); // alias
const ExamResult = require('./routes/college_exam_result_api');         // keep ONE exam-result router
// const examResultApi = require('./routes/exam_result_api');           // 🚫 duplicate of exam-result — removed

// Electives
const subjectelecRoutes = require('./routes/subjectelec');

// Attendance
const CollegeAttendenceManager = require('./routes/college_attendance_api');
const EmployeeAttendanceManager = require('./routes/employee_attendance_api');
const calendarattendance = require('./routes/calendar-attendance');

// Finance / CMS
const cmsFeeStructure = require('./routes/cmsFeeStructure');
const cmsPayment = require('./routes/cmsPayment');
const cmsStudentFeeInvoice = require('./routes/cmsStudentFeeInvoice');
const cmsStuScholarship = require('./routes/cmsStuScholarship');
const finMasterStudnet = require('./routes/fin_master_studnet');

// Misc utilities
const chartDataApi = require('./routes/chart_data');
const smsDeviceRoutes = require('./routes/smsDeviceRoutes');
const whiteboardCmsApi = require('./routes/whiteboard_cms_api');
const auditLogRoutes = require('./routes/audit_log_api');
const demandLettersRouter = require('./routes/demandLetters');
const teacherInfoApi = require('./routes/teacher_inform_api');
const leaveApplicationRouter = require('./routes/leave_application');

/* -------------------------------- App ----------------------------------- */
const app = express();
const PORT = process.env.PORT || 9090;

/* ------------------------------- CORS ----------------------------------- */
// Open CORS as per your second snippet (note: credentials + "*" is ignored by browsers)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

/* ------------------------------ Parsers --------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* --------------------------- Static Assets ------------------------------ */
// Serve uploads from project-root/uploads_bg
app.use('/uploads_bg', express.static(path.join(__dirname, 'uploads_bg')));

/* -------------------------------- Routes -------------------------------- */
// Health
app.get('/', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Auth / Users
app.use('/login', loginRouter);
app.use('/api', masterUserApi);
app.use('/api/user-role', userRoleApi);
app.use('/api/master-role', MasterRole);
app.use('/api/user-dtls', userDtlsRouter);

// Masters
app.use('/master-college', collegeRoutes);
app.use('/api/college-group', collegeGroupRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/master-depts', masterDeptsRoutes);
app.use('/api/master-acadyear', collegeAcadYearRoutes);
app.use('/api/subject-course', subjectCourseRoutes);
app.use('/api/menu-master', mastermenuRoutes);
app.use('/api/subject-teacher', masterSubjectTeacherRoutes);

// Student / Teacher
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/teacher-dtls', teacherDtlsApi);
app.use('/api/students-up', studentMasterRoutes);
app.use('/api/teacher-master-bulk-up', teacherMasterRoutes);
app.use('/api/student-information', studentInformationRouter);
app.use('/api/student-ay', studentAyRoutes);

// Classroom / Routine / Availability
app.use('/api/class-room', classroomAPI);
app.use('/api/daily-routine', DailyRoutine);
app.use('/api/college-daily-routine', collegedailyroutineRoutes);
app.use('/api/teacher-availability-manager', teacherAvailabilityRoutes);

// Course offering & registration
app.use('/api/course-offering', courseofferingRoutes);
app.use('/api/course-registration', courseregistrationRoutes);

// Exams
app.use('/api/college-exam-routine', collegeexamroutineRoutes);
app.use('/api/exam-routine-manager', examroutineRoutes);
app.use('/api/exam-result', ExamResult); // single source of truth

// Electives
app.use('/api/subject-elective', subjectelecRoutes);

// Attendance
app.use('/api/CollegeAttendenceManager', CollegeAttendenceManager);
app.use('/api/employee-attendance', EmployeeAttendanceManager);
app.use('/api/calendar-attendance', calendarattendance);

// Finance / CMS
app.use('/api/cms-fee-structure', cmsFeeStructure);
app.use('/api/cms-payments', cmsPayment);
app.use('/api/cms-student-fee-invoice', cmsStudentFeeInvoice);
app.use('/api/cms-stu-scholarship', cmsStuScholarship);
app.use('/api/fin-master-student', finMasterStudnet);

// Misc
app.use('/api/chart-data', chartDataApi);
app.use('/api/sms-device', smsDeviceRoutes);
app.use('/api/whiteboard-cms', whiteboardCmsApi);
app.use('/api/audit-logs', auditLogRoutes);
app.use('/api/demand-letters', demandLettersRouter);
app.use('/api/teacher-info', teacherInfoApi);
app.use('/api/leave-application', leaveApplicationRouter);

/* ----------------------- DB Check & Server Start ------------------------ */
db.query('SELECT NOW()')
  .then(({ rows }) => {
    console.log('✅ Connected to Postgres at', rows[0].now);
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Could not connect to Postgres:', err);
    process.exit(1);
  });
