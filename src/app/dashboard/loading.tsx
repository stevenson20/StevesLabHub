
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="relative z-10 w-full overflow-hidden container py-8">
      <div className="flex flex-col items-center mb-12">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-6 w-96" />
        <Skeleton className="h-10 w-full max-w-md mt-8" />
        <Skeleton className="h-10 w-48 mt-4" />
      </div>

      {/* Subjects Section Skeleton */}
      <div className="py-12">
        <div className="mx-auto mb-12 max-w-2xl text-center">
            <Skeleton className="h-10 w-72 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-lg mx-auto" />
        </div>
        <Skeleton className="h-10 w-full max-w-lg mx-auto mb-8" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[220px] w-full rounded-2xl" />
            ))}
        </div>
      </div>
    </div>
  );
}
