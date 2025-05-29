import { Route, Routes } from 'react-router-dom';

import HomeXR from './layouts/Home';
import Test from "./layouts/Test";
import Test2 from "./layouts/Test2";

import Virtouria_Bia from "./layouts/Virtouria/Bia";
import Virtouria_DenLong from "./layouts/Virtouria/DenLong";
import Virtouria_CuocThiDiSan from "./layouts/Virtouria/CuocThiDiSan";
import Virtouria_Gom from "./layouts/Virtouria/Gom";
import Virtouria_NTST from "./layouts/Virtouria/NTST";
import Virtouria_30thang4 from "./layouts/Virtouria/30thang4";

function App() {
  return (
    <>
      <Routes>
        <Route path='/home' element={<HomeXR/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/' element={<Test2/>}/>
        <Route path='/virtouria/bia' element={<Virtouria_Bia/>}/>
        <Route path='/virtouria/denlong' element={<Virtouria_DenLong/>}/>
        <Route path='/virtouria/cuocthidisan' element={<Virtouria_CuocThiDiSan/>}/>
        <Route path='/virtouria/gom' element={<Virtouria_Gom/>}/>
        <Route path='/virtouria/ntst' element={<Virtouria_NTST/>}/>
        <Route path='/virtouria/30thang4' element={<Virtouria_30thang4/>}/>
      </Routes>
    </>
  );
}

export default App;
