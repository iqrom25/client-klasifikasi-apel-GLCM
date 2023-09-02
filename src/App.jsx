import { Route, Routes, Link, useLocation } from "react-router-dom";
import React from "react";
import Pelatihan from "./pages/pelatihan";
import Pengujian from "./pages/pengujian";
import Header from "./components/header";
import Footer from "./components/footer";
import Konfigurasi from "./pages/konfigurasi";
import Kfold from "./pages/k-fold";

export default function App() {
  const location = useLocation();
  const [sudut, setSudut] = React.useState(0);
  const [kFold, setKfold] = React.useState(10);

  const handleActiveRoute = (route) => {
    if (location.pathname === "/" && route === "/pengujian")
      return "btn btn-nav custom-btn-shadow active-nav";

    return `btn btn-nav custom-btn-shadow ${
      location.pathname === route ? "active-nav" : null
    }`;
  };



  return (
    <>
      <Header />
      <div className="container">
        <div className="card custom-shadow">
          <div className="d-flex">
            <Link
              className={handleActiveRoute("/pengujian")}
              aria-current="page"
              to="/pengujian"
            >
              Pengujian
            </Link>
            <Link className={handleActiveRoute("/pelatihan")} to="/pelatihan">
              Ekstrasi Ciri
            </Link>
            <Link className={handleActiveRoute("/k-fold")} to="/k-fold">K-Fold</Link>
            <Link className={handleActiveRoute("/konfigurasi")} to="/konfigurasi">
              Konfigurasi
            </Link>
          </div>

          <Routes>
            <Route path="/" element={<Pengujian sudut = {sudut} />} />
            <Route path="/pengujian" element={<Pengujian sudut = {sudut}/>} />
            <Route path="/pelatihan" element={<Pelatihan />} />
            <Route 
              path="/konfigurasi" 
              element={
                <Konfigurasi 
                  sudut = {sudut} 
                  onChangeSudut = {setSudut} 
                  fold={kFold}
                  onChangeFold={setKfold}
                />} 
              />
              <Route path="/k-fold" element={<Kfold fold = {kFold}/>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}
