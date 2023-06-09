import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <section className="container  grid items-center align-items: center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col justify-items-center items-center gap-2 mt-[20%]">
        <Button variant="ghost">Cliek ME</Button>
        <div className="flex gap-4 w-[250px] h-[250px]">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[550px]" />
            <Skeleton className="h-4 w-[550px]" />
            <Skeleton className="h-4 w-[550px]" />
            <Skeleton className="h-4 w-[550px]" />
            <Skeleton className="h-4 w-[550px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
