export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="mt-6">{children}</div>
    </div>
  );
}

