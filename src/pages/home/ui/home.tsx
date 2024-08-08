import { Sidebar } from "@/features/sidebar";
import { TableData } from "@/widgets/table-data";

export const Home = () => {
  return (
    <main className="h-[calc(100vh-80px)] w-full flex items-center justify-center">
      <TableData />
      <Sidebar />
    </main>
  );
};
