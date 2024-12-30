import Register from '@/components/Register'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Registro",
};
 
export default function page() {
  return (
    <div>
      <Register />
    </div>
  )
}

