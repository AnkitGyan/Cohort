// import { Children, useState } from 'react';
// import './App.css';
// import { Link, BrowserRouter, Routes, Route, useNavigate, Outlet } from 'react-router-dom'
import RefFun from "./RefFun"

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <BrowserRouter>
//     <Routes>
//       <Route path='/' element = {<Layout></Layout>}>
//       <Route path= "/neet/online-coaching-class-11th" element = {<Class11Program/>}/>
//       <Route path= "/neet/online-coaching-class-12th" element = {<Class12Program/>}/>
//       <Route path="/" element={<Landing/>}/>
//       <Route path='*' element={<ErrorElement/>}/>
//       </Route>
//     </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// function Landing(){
//   return <div>
//     Welcome to allen
//     <Link to="/">Allen</Link>
//      |
//      <Link to="/neet/online-coaching-class-11th">Allen 11th</Link>
//      |
//      <Link to="/neet/online-coaching-class-12th">Allen 12th</Link>
//   </div>
// }

// function Class11Program(){
//   return <div>
//     Neet Program for class 11th
//   </div>
// }

// function Class12Program(){
//   return <div>
//     Neet Program for class 12th
//   </div>
// }

// function ErrorElement() {
//   return (
//     <div>
//       Sorry, page not found
//     </div>
//   );
// }

// function Layout(){
//   return (
//     <>
//    <h1>header</h1>
//    <Outlet/>
//   <h1>footer</h1>
//   </>
//   );
// }

function  App(){
  return(<>
  <RefFun/>
  </>)
}
export default App
