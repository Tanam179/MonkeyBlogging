import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import DashBoardLayout from './modules/dashboard/DashBoardLayout';
import DashBoard from './pages/DashBoard';
import PostManage from './modules/posts/PostManage';
import PostAddNew from './modules/posts/PostAddNew';
import PostDetails from './pages/PostDetail';
import CategoryManage from './modules/categories/CategoryManage';
import CategoryAddNew from './modules/categories/CategoryAddNew';
import UserManage from './modules/users/UserManage';
import UserAddNew from './modules/users/UserAddNew';
import UserProfile from './modules/users/UserProfile';
import CategoryUpdate from './modules/categories/CategoryUpdate';
import './App.css'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/sign-up" element={<Signup></Signup>}></Route>
                    <Route path="/login" element={<Login></Login>}></Route>

                    <Route path="*" element={<NotFound></NotFound>}></Route>
                    <Route path="/:slug" element={<PostDetails></PostDetails>}></Route>
                    <Route element={<DashBoardLayout></DashBoardLayout>}>
                        <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
                        <Route path="/manage/posts" element={<PostManage></PostManage>}></Route>
                        <Route path="/manage/add-post" element={<PostAddNew></PostAddNew>}></Route>
                        <Route path="/manage/categories" element={<CategoryManage></CategoryManage>}></Route>
                        <Route path="/manage/add-category" element={<CategoryAddNew></CategoryAddNew>}></Route>
                        <Route path="/manage/update-category" element={<CategoryUpdate/>}></Route>
                        <Route path="/manage/user" element={<UserManage></UserManage>}></Route>
                        <Route path="/manage/add-user" element={<UserAddNew></UserAddNew>}></Route>
                        <Route path="/profile" element={<UserProfile></UserProfile>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer pauseOnHover={false} />
        </AuthProvider>
    );
}

export default App;

