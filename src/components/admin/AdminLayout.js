import { Outlet } from "react-router-dom";
import MiniDrawer from "./Drawer";

export default function AdminLayout({ onLogout }) {
  return (
    <>
      <MiniDrawer onLogout={onLogout} />
    </>
  );
}