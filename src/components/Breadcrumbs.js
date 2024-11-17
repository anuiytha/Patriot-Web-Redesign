import { Link, useLocation } from 'react-router-dom';
import "./Breadcrumb.css";

const routeNameMap = {
    studentservices: 'Student Services',
    studentregistration: "Student Registration",
    regplan: "Registeration & Planning",
    registration: "Registration",
    personalInfo: "Personal Information",
    employeeservices: 'Employee Services',
    financialAid: "Financial Aid",
    financialAidDashboard: "Financial Aid Dashboard",
    studentprofile: "Student Profile",
    employeedashboard: "Employee Dashboard",
    employeetimesheet: "Employee Timesheet",
    studentrecords: "Student Records",
    graduationdateaccordion: "Graduation Date",
    help: "Help"


}
const Breadcrumb = () => {
    const location = useLocation();
    // Split the pathname into segments
    // location.pathname -  contains the current path eg: /product/123.
    // split("/") - splits the path into segments eg: ["", "products", "123"].
    // filter((x) => x) - removes the empty strings resulting in ["product", "123"]
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav aria-label="breadcrumb">
            <ol>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {pathnames.map((value, index) => { // pathnames.map() - iterates through each segment
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;  // if the path is /product/123, it generates /product for the first segment and /product/123 for the second.
                    const isLast = index === pathnames.length - 1;  // isLast - a boolean that checks if the current segment is the last one in the path
                    const displayName = routeNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

                    return (
                        <li key={to}>
                            {isLast ? (
                                <span>{displayName}</span>
                            ) : (
                                <Link to={to}>{displayName}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
