function deleteRent(id) {
  if (confirm("¿Estás seguro de eliminar este alquiler?")) {
    fetch(`/rents/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) location.reload();
        else alert("Error al eliminar el alquiler.");
      })
      .catch(() => alert("Error al conectar con el servidor."));
  }
}
