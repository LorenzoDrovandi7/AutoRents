function deleteClient(id) {
  if (confirm("¿Estás seguro de eliminar este cliente?")) {
    fetch(`/clients/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) location.reload();
        else alert("Error al eliminar cliente.");
      })
      .catch(() => alert("Error al conectar con el servidor."));
  }
}
