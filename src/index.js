import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import Home from './components/Home';
import {Routes, Route} from "react-router-dom";
import About from './components/About';
import Rwr from './components/Rwr';
import About6 from './components/About6';
import About9 from './components/About9';
import About99 from './components/About99';
import About9991 from './components/About9991';
import About9992 from './components/About9992';
import About595 from './components/about595';
import About5955 from './components/about5955';
import About10 from './components/About10';
import About65 from './components/About65';
import About66 from './components/About66';
import reportWebVitals from './reportWebVitals';

const root1 = ReactDOM.createRoot(document.getElementById('root'));
const root2 = ReactDOM.createRoot(document.getElementById('root1'));
const root44 = ReactDOM.createRoot(document.getElementById('root44'));

root1.render(
  <React.StrictMode>
    <Router>
      <Routes> 
        <Route path="/welcome" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about6" element={<About6 />} />
        <Route path="/eFy2Rp4Th9Km2Lq1Ns8Xw3Zg6Vo5Sj0Fb3Te4Yr7Uq1Ix8Pm2Kn9Xs6Jz3Ob5Nh8Jr5Ft4" element={<About9 />} />
        <Route path="/dPy7Qr4Gs5Ft2Wp9Bu6Zv3Xq8Ky1Lo4Nh2Ix5Su7Jw8Tn3Rm4Fe9Ya6Hp1Gb5Jx8Vt7Yr6" element={<About99 />} />
        <Route path="/kTy3Ap7Sx5Dq9Lo2Hr4Vm1Zw8Yn6Kf3Gh7Jt2Qy8Uo5Pj9Mb4Re6Fu3Hv5Xq7Zl8Cn1Ms9" element={<About9991 />} />
        <Route path="/kTy3Ap7Sx5Dq9Lo2Hr4Vm1Zw8Yn6Kf3Gh7Jt2Qy8Uo5Pj9Mb4Re6Fu3Hv5Xq7Zl8Cn1Ms2" element={<About9992 />} />
        <Route path="/hWz5Dq8To2Xe7Hs4Mv1Yu6Jx3Ap7Kl9Pq8Ln2Fr5Vw9Gb7Zt4Ho1Ns3Dr6Ty5Fj8Km2Vx7" element={<About595 />} />
        <Route path="/gQx9Wu2Pv3Ky4Hz5Mo1En6Js8Xt3Ao7Lr4Fu5Dv2Gy9Zw6Bq8Hn3Sr7Tp4Yj5Vf2Km1Xq9" element={<About5955 />} />
        <Route path="/about10" element={<About10 />} />
        <Route path="/uploader" element={<About65 />} />
        <Route path="/display/:number" element={<About66 />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

if (root2) {
  root2.render(
    <React.StrictMode>
      <Router>
        <Routes> 
          <Route path="/pVt2Gk8Aq4Jm1Ew7Sx3Lc5Ov9Iu6Qy0Nz9Rp7Xh4Yg1Tb0Hw8Jr5Kx2Gz0Pn9" element={<Rwr />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

if (root44) {
  root44.render(
    <React.StrictMode>
      <Router>
        <Routes> 
        <Route path="/about9" element={<about9 />} />
          <Route path="/about595" element={<about595 />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}
reportWebVitals();