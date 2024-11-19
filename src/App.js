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
import StudentLocation from "./Pages/StudentProfile/StudentLocation";
import Help from "./Pages/help";
import EmployeeDashboard from "./Pages/Employee Services/EmployeeDashboard";
import EmployeeTimesheet from "./Pages/Employee Services/EmployeeTimesheet";
import FinancialDashboard from "./Pages/FinancialAidServices/FinancialDashboard";
import StudentRecords from "./Pages/StudentServices/StudentRecords";
import GraduationDateAccordion from "./Pages/StudentServices/GraduationDateAccordion";
import Breadcrumb from "./components/Breadcrumbs";
import GoogleCalendar from "./components/GoogleCalender";


// import FinancialInfo from "./Pages/Financial Aid/FinancialInfo";

export default function App() {

  return (
    <div>

      <Header />
      <Breadcrumb />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personalInfo" element={<PersonalInfo />} />
        <Route path="/studentservices" element={<StudentServices />} />
        <Route path="/employeeservices" element={<EmployeeServices />} />
        <Route path="/financialAid" element={<FinancialAid />} />
        <Route path="/studentservices/registration" element={<Registration />} />
        <Route path="/studentservices/registration/regplan" element={<RegPlan />} />
        <Route path="/studentservices/registration/regplan/studentregistration" element={<StudentRegisteration />} />
        <Route path="/personalInfo/personalprofile" element={<PersonalProfile />} />
        <Route path="/studentprofile" element={<StudentProfile />} />
        <Route path="/studentprofile/studentlocation/" element={<StudentLocation />} />

        <Route path="/help" element={<Help />} />
        <Route path="/employeeservices/employeedashboard" element={<EmployeeDashboard />} />
        <Route path="/employeetimesheet" element={<EmployeeTimesheet />} />
        <Route path="/employeedashboard" element={<EmployeeDashboard />} />
        <Route path="/employeetimesheet" element={<EmployeeTimesheet />} />
        <Route path="/studentrecords" element={<StudentRecords />} />
        <Route path="/financialAid/financialAidDashboard" element={<FinancialDashboard />} />
        <Route path="/graduationdateaccordion" element={<GraduationDateAccordion />} />
        <Route path="/googlecalendar" element={<GoogleCalendar />} />
      </Routes >

    </div >
    // </div >
  )
}