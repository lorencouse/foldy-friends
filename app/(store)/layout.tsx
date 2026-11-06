import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function StoreLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-[70svh] max-w-[1440px] px-4 pb-32 sm:px-8">{children}</main>
      <SiteFooter />
    </>
  );
}
