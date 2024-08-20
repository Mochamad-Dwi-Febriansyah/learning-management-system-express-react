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
// import GTugasDetail from "./pages/Guru/TugasDetail/Index.jsx";
import GPengumpulanTugasManage from "./pages/Guru/TugasDetail/pengumpulanTugasManage.jsx";

import SMataPelajaran from "./pages/Siswa/MataPelajaran/Index.jsx";
import STugasDetail from "./pages/Siswa/TugasDetail/Index.jsx";

// import { ALogout } from "./features/Auth/useLogout";

import NotFound from "./features/Auth/NotFound.jsx";

import ProtectedRoutes from "./features/Auth/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route element={<ProtectedRoutes/>}>
            {/* <Route path="/logout" element={<ALogout />}></Route> */}
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
          <Route path="g-kelas/:kelas_id/g-mata-pelajaran/:mata_pelajaran_id" element={<GMataPelajaran />}></Route>
          {/* <Route path="/g-tugas/:tugas_id" element={<GTugasDetail />}></Route> */}
          <Route path="/g-tugas/:tugas_id/manage-pengumpulan" element={<GPengumpulanTugasManage />}></Route>
          </Route>

          <Route element={<ProtectedRoutes requiredRole="SISWA"/>}> 
          <Route path="s-kelas/:kelas_id/s-mata-pelajaran/:mata_pelajaran_id/s-guru/:guru_id" element={<SMataPelajaran />}></Route>
          <Route path="/s-tugas/:tugas_id" element={<STugasDetail />}></Route>
          
          </Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
