export async function registrarModerador(data) {
  const response = await fetch("http://localhost:8080/auth/register-mod", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al registrar moderador");
  }

  return await response.json();
}
