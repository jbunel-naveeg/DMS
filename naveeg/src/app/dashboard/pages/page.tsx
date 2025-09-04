export default function PagesPage() {
  const pages = ["Home", "About", "Contact"];
  return (
    <div className="rounded-md border p-4">
      <div className="font-medium">Pages</div>
      <ul className="mt-2 list-disc pl-6 text-sm">
        {pages.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

