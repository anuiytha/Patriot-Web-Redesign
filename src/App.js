import React from "react";
import HomePage from "./Pages/HomePage/HomePage";
import PersonalInfo from "./Pages/HomePage/PersonalInfo";
import { Routes, Route } from "react-router-dom";
import StudentServices from "./Pages/HomePage/StudentServices";
import EmployeeServices from "./Pages/HomePage/EmpServices";
import FinancialAid from "./Pages/HomePage/FinancialAid";
import Header from "./components/header";
import Registration from "./Pages/StudentServices/Registration";
import RegPlan from "./Pages/Registration/RegPlan";
import StudentRegisteration from "./Pages/Registration/StudentRegisteration";
import PersonalProfile from "./Pages/PersonalInformation/PersonalProfile";
import StudentProfile from "./Pages/StudentServices/StudentProfile";
import Help from "./Pages/help";
import EmployeeDashboard from "./Pages/Employee Services/EmployeeDashboard";
import EmployeeTimesheet from "./Pages/Employee Services/EmployeeTimesheet";
import FinancialDashboard from "./Pages/FinancialAidServices/FinancialDashboard";
import StudentRecords from "./Pages/StudentServices/StudentRecords";
import GraduationDateAccordion from "./Pages/StudentServices/GraduationDateAccordion";
import GoogleCalendar from "./components/GoogleCalender";

// import FinancialInfo from "./Pages/Financial Aid/FinancialInfo";


export default function App() {
  return (
    <div>
      {/* <div style={{ backgroundColor: '#4CAF50', minHeight: '100vh' }}> Set background color and full height */}

      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personalInfo" element={<PersonalInfo />} />
        <Route path="/studentServices" element={<StudentServices />} />
        <Route path="/employeeServices" element={<EmployeeServices />} />
        <Route path="/financialAid" element={<FinancialAid />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/regplan" element={<RegPlan />} />
        <Route path="/studentregistration" element={<StudentRegisteration />} />
        <Route path="/personalprofile" element={<PersonalProfile />} />
        <Route path="/studentprofile" element={<StudentProfile />} />
        <Route path="/help" element={<Help />} />
        <Route path="/employeedashboard" element={<EmployeeDashboard />} />
        <Route path="/employeetimesheet" element={<EmployeeTimesheet/>} />
        <Route path="/studentrecords" element={<StudentRecords />} />
        <Route path="/financialAidDashboard" element={<FinancialDashboard />} />
        <Route path="/graduationdateaccordion" element={<GraduationDateAccordion />} />
        <Route path="/googlecalendar" element={<GoogleCalendar />} />
        
       

      </Routes >
    </div >
    // </div >
  )
}