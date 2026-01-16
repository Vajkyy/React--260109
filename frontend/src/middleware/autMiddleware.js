import { redirect } from 'react-router-dom';

async function autMiddleware() {
    const token = localStorage.getItem("token");
    if (!token){
        throw redirect("/login");
    }
}
export default autMiddleware;
