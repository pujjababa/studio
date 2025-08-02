import GreetingGenerator from '@/components/greeting-generator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <GreetingGenerator />
    </main>
  );
}
