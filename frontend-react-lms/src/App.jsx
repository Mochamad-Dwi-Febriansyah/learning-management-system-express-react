import "./assets/styles/global.css"
import "./assets/css/argon-dashboard.css"
import "./assets/scss/argon-dashboard.scss"
import "./assets/plugins/nucleo/css/nucleo.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Index.jsx";
import Dashboard from "./pages/Dashboard/Index.jsx";
import Profile from "./pages/Profile/Index.jsx";
import ManageSiswa from "./pages/Admin/Siswa/Index.jsx";
import ManageGuru from "./pages/Admin/Guru/Index.jsx";
import ManageKelas from "./pages/Admin/Kelas/Index.jsx";
import ManageMataPelajaran from "./pages/Admin/MataPelajaran/Index.jsx";
import ManageKelasMataPelajaran from "./pages/Admin/KelasMataPelajaran/Index.jsx";
import ManageSiswaKelas from "./pages/Admin/SiswaKelas/Index.jsx";
import ManageWaliKelas from "./pages/Admin/WaliKelas/Index.jsx";
import GMataPelajaran from "./pages/Guru/MataPelajaran/Index.jsx";
import Logout from "./features/Auth/Logout";

import ProtectedRoutes from "./features/Auth/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route element={<ProtectedRoutes/>}>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
          <Route element={<ProtectedRoutes requiredRole="ADMIN"/>}> 
            <Route path="/kelola-siswa" element={<ManageSiswa />}></Route>
            <Route path="/kelola-guru" element={<ManageGuru />}></Route>
            <Route path="/kelola-kelas" element={<ManageKelas />}></Route>
            <Route path="/kelola-mata-pelajaran" element={<ManageMataPelajaran />}></Route>
            <Route path="/kelola-kelas-mata-pelajaran" element={<ManageKelasMataPelajaran />}></Route>
            <Route path="/kelola-siswa-kelas" element={<ManageSiswaKelas />}></Route>
            <Route path="/kelola-wali-kelas" element={<ManageWaliKelas />}></Route>
          </Route>

          <Route element={<ProtectedRoutes requiredRole="GURU" />}> 
          <Route path="/g-mata-pelajaran/:mata_pelajaran_id" element={<GMataPelajaran />}></Route>
          </Route>

          <Route element={<ProtectedRoutes requiredRole="SISWA"/>}> 
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
