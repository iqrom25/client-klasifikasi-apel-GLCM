export const pelatihanColumns = [
    {
      name: "No",
      selector: row => row.id
    },
    {
      name: "Kelas",
      selector: row => row.kelas
    },
    {
      name: "R",
      selector: row => row.red.toFixed(4)
    },
    {
      name: "G",
      selector: row => row.green.toFixed(4)
    },
    {
      name: "B",
      selector: row => row.blue.toFixed(4)
    },
    {
      name: "Energi",
      selector: row => row.energi.toFixed(4)
    },
    {
      name: "Kontras",
      selector: row => row.kontras.toFixed(4)
    },
    {
      name: "Homogenitas",
      selector: row => row.homogenitas.toFixed(4)
    },
    {
      name: "Korelasi",
      selector: row => row.korelasi.toExponential(4)
    }
  ];