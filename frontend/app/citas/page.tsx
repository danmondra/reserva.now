import AppLayout from "@/components/AppLayout";

export default function Citas() {
  return (
    <AppLayout title="Mis Citas" showBackButton={false}>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Mis Citas
        </h2>
        <p className="text-gray-600">
          Gestiona tus citas programadas.
        </p>
      </div>
    </AppLayout>
  );
}
