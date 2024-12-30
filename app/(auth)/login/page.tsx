import Login from '@/components/Login'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Login",
};

const page = () => {
  return (
    <div>
      <Login />
    </div>
  )
}

export default page
