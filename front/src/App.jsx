  import React from 'react'
  import {Route, Routes} from 'react-router-dom';
  import Form from './components/pages/Form';
  import Home from './Home';
import Upload from './components/pages/Upload';

  const App = () => {
    return (
   
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Form />} />
     <Route path="/uploads" element={<Upload />} />
      
    </Routes>
   
    )
  }

  export default App
