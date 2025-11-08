import AppLayout from "@/components/AppLayout";

export default function Buscar() {
  return (
    <AppLayout title="Buscar" showBackButton={false}>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Buscar Servicios
        </h2>
        <p className="text-gray-600">
          Encuentra profesionales y servicios disponibles.
        </p>
      </div>
    </AppLayout>
  );
}
