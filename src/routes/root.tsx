import MainLayout from "@/layouts/MainLayout";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
