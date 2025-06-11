document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const carId = btn.dataset.carId;

      if (!confirm("Are you sure you want to delete this car?")) return;

      try {
        const res = await fetch(`/cars/${carId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          window.location.href = "/cars";
        } else {
          alert("Error deleting car");
        }
      } catch (err) {
        alert("Error deleting car");
      }
    });
  });
});
