import { jwtVerify } from "jose";

export default async function handler(req, res) {
  const SECRET_KEY = process.env.JWT_SECRET;
  if (!SECRET_KEY) {
    return res.status(500).json({ error: "Clave secreta no configurada" });
  }

  try {
    const token = req.body.token;
    if (!token) {
      return res.status(400).json({ error: "Token no proporcionado" });
    }

    // Verifica el token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));

    // Redirige según el rol
    if (payload.role === "admin") {
      return res.status(200).json({ redirectTo: "/dashboard/admin" });
    } else if (payload.role === "student") {
      return res.status(200).json({ redirectTo: "/dashboard/student" });
    } else {
      return res.status(403).json({ error: "Rol no autorizado" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}