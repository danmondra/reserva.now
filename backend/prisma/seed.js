import { PrismaClient } from '../src/generated/prisma/index.js'; // <-- ruta al cliente generado
const prisma = new PrismaClient();

async function main() {
  const categorias = [
    { nombre: "Salud", descripcion: "Servicios relacionados con la salud" },
    { nombre: "Hogar", descripcion: "Servicios del hogar" },
    { nombre: "Mascotas", descripcion: "Cuidado de mascotas" },
    { nombre: "Automotriz", descripcion: "Servicios para autos" },
    { nombre: "Eventos", descripcion: "Organización de eventos" },
    { nombre: "Transporte", descripcion: "Servicios de transporte" },
    { nombre: "Belleza", descripcion: "Servicios de belleza" },
    { nombre: "Fitness", descripcion: "Entrenamiento y gimnasio" },
    { nombre: "Educación", descripcion: "Cursos y tutorías" },
    { nombre: "Tecnología", descripcion: "Servicios de tecnología" },
    { nombre: "Legal", descripcion: "Asesoría legal" },
    { nombre: "Gastronomía", descripcion: "Alimentos y catering" }
  ];
  const usuarios = [
    { nombre: "Daniel Mondragon", email: "daniel@prueba.com", 
      password: "$2b$10$XO123BumQJvpSW00gpdDLuvTVV66ZQBnGBbpMog38ft3y4WCauOhO",
      walletAddress: "https://ilp.interledger-test.dev/proveedor-mariachis" },
    { nombre: "Jorge Juarez", email: "jorge@prueba.com",
      password: "$2b$10$iKWx4UEYD1J7NioKi5RNDOq/dJ4NxtNnx9X2lWAgzp8Em5NW7Xx2O",
      walletAddress: "https://ilp.interledger-test.dev/cliente-jorge"}
  ];

  for (const cat of categorias) {
    await prisma.categoria.create({ data: cat });
  }
  for (const user of usuarios) {
    await prisma.usuario.create({ data: user});
  }

  console.log("Seed completado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
