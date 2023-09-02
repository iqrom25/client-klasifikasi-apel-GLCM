export const pengujianColumns = [
    {
      name: "No",
      selector: (row,idx) => idx + 1
    },
    {
      name: "Jarak",
      selector: row => row.jarak.toFixed(4)
    },
    {
      name: "Kelas",
      selector: row => row.dataLatih.kelas
    },
    {
      name: "R",
      selector: row => row.dataLatih.red.toFixed(4)
    },
    {
      name: "G",
      selector: row => row.dataLatih.green.toFixed(4)
    },
    {
      name: "B",
      selector: row => row.dataLatih.blue.toFixed(4)
    },
    {
      name: "Energi",
      selector: row => row.dataLatih.energi.toFixed(4)
    },
    {
      name: "Kontras",
      selector: row => row.dataLatih.kontras.toFixed(4)
    },
    {
      name: "Homogenitas",
      selector: row => row.dataLatih.homogenitas.toFixed(4)
    },
    {
      name: "Korelasi",
      selector: row => row.dataLatih.korelasi.toExponential(4)  
    }
  ];