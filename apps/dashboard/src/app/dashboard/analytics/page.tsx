export default function AnalyticsPage() {
  return (
    <div className="rounded-md border p-4">
      <div className="text-sm text-muted-foreground">Last 7 days visits</div>
      <div className="mt-2 grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-12 bg-muted rounded" />
        ))}
      </div>
    </div>
  );
}

