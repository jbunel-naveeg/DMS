"use client";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border p-4">
        <div className="text-sm text-muted-foreground">Trial status</div>
        <div className="text-lg font-medium">7 days remaining</div>
      </div>
      <div className="rounded-md border p-4">
        <div className="text-sm text-muted-foreground">Site status</div>
        <div className="text-lg font-medium">Ready</div>
      </div>
    </div>
  );
}

