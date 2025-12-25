import { redirect } from 'next/navigation';

// Root page redirects to default locale (Turkish)
export default function RootPage() {
  redirect('/tr');
}
