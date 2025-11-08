import AppLayout from "@/components/AppLayout";

export default function Perfil() {
  return (
    <AppLayout title="Mi Perfil" showBackButton={false}>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Mi Perfil
        </h2>
        <p className="text-gray-600">
          Administra tu información personal y configuración.
        </p>
      </div>
    </AppLayout>
  );
}
