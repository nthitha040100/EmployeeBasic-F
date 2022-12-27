import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function logout() {
  localStorage.setItem('token',"")
  toast.success("You have been logged out")
}

export default logout
