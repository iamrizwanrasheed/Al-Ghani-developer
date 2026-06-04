export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-24 lg:px-6">
      <div className="h-14 w-14 animate-spin rounded-full border-2 border-[color:var(--emerald)]/20 border-t-[color:var(--emerald)]" />
    </div>
  );
}
