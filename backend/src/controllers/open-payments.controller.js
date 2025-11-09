import { createAuthenticatedClient, isFinalizedGrant, OpenPaymentsClientError } from '@interledger/open-payments';
import { readFileSync } from 'fs';
import path from 'path';

usuario.walletAddress,
    usuario.keyId,
    usuario.privateKeyPath

export const openPaymentsStatus = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(usuarioId) }
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const privatekey = readFileSync(path.resolve(usuario.privateKeyPath), 'utf-8');

    const client = await createAuthenticatedClient({
      walletAddress: usuario.walletAddress,
      keyId: usuario.keyId,
      privateKeyPath: privatekey
    });

    console.log("Cliente Open Payments creado para el usuario:", usuario.id);
    
    // const grants = await client.getGrants();

    // const grantsStatus = grants.map(grant => ({
    //   grantId: grant.id,
    //   finalized: isFinalizedGrant(grant),
    //   details: grant
    // }));

    res.status(200).json({ grants: grantsStatus });

  } catch (error) {
    // console.error(error);
    // if (error instanceof OpenPaymentsClientError) {
    //   res.status(500).json({ message: "Error en Open Payments Client", details: error.message });
    // } else {
    //   res.status(500).json({ message: "Error interno del servidor al obtener el estado de Open Payments" });
    // }
  }
} 