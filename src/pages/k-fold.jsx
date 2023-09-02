import React from "react";
import Swal from "sweetalert2";
import { getKFold } from "../services/pelatihanApi";
import { useMutation } from "@tanstack/react-query";
import Loading from "../components/loading";

const KFold = props => {
  const { fold } = props;
  const [dataDetailKfold, setDataDetailKfold] = React.useState([]);
  const [dataRataRata,setDataRataRata] = React.useState({})
  const [loading,setLoading] = React.useState(false);
  const kFoldMutation = useMutation(getKFold, {
    onSuccess: result => {
        setDataDetailKfold(result.data.data.hasilKFold);
        setDataRataRata(result.data.data)
    },
    onError: error => {
      const response = error.response.data;
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: `Error : ${response.code}`,
          text: response.message
        });
      }, 1000);
    }
  });

  const handleSubmit = e => {
    if(fold < 1)
    return Swal.fire({
        icon: "error",
        title: `Error`,
        text: 'Fold minimal 1'
    });

    kFoldMutation.mutate(fold);
  };


  React.useEffect(()=>{
    if(kFoldMutation.isLoading){
        setLoading(true);
    }

    if(kFoldMutation.isSuccess){
        setTimeout(() => {
            setLoading(false);
          }, 1000);
    }

  },[kFoldMutation.isLoading,kFoldMutation.isSuccess])

  return (
    <div>
      <button
        className="btn btn-proses custom-btn-shadow "
        style={{ margin: "4rem 2rem" }}
        onClick={handleSubmit}
      >
        Mulai Pengujian K-Fold
      </button>
      
    <div className={`table-kfold ${dataDetailKfold.length !== 0 && !loading? '':'d-none'}`}>
      <div className="col-12 mt-4 px-4">
        <h5 className="ms-3">Detail Tiap Fold</h5>
        <div className="card bg-white">
          <table
            className="table table-striped bordered "
            style={{
              overflowY: "scroll",
              width: "100%",
              height: "20rem",
              display: "block"
            }}
          >
            <thead>
              <tr className="text-center">
                <th>Fold</th>
                <th>Id Data</th>
                <th>Hasil</th>
                <th>Aktual</th>
                <th>Jarak</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {dataDetailKfold.map((hasilKFold, i) => {
                const detail = hasilKFold.detail;
                const jumlahData = detail.length;
                const result = detail.map((obj, j) => {
                  return (
                    <tr key={`detail[${i},${j}]`}>
                      {j === 0
                        ? <td width={"17%"} rowSpan={jumlahData}>
                            {i + 1}
                          </td>
                        : null}
                      <td width={"20%"}>
                        {obj.id}
                      </td>
                      <td width={"20%"}>
                        {obj.hasil}
                      </td>
                      <td width={"20%"}>
                        {obj.aktual}
                      </td>
                      <td width={"20%"}>
                        {obj.jarak}
                      </td>
                      <td width={"20%"}>
                        {obj.keterangan ? "berhasil" : "gagal"}
                      </td>
                    </tr>
                  );
                });

                return result;
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-12 mt-4 px-4">
        <h5 className="ms-3">Rangkuman</h5>
        <div className="card bg-white">
          <table
            className="table table-striped bordered "
            style={{
              overflowY: "scroll",
              width: "100%",
              height: "20rem",
              display: "block"
            }}
          >
            <thead>
              <tr className="text-center">
                <th>Fold</th>
                <th>Akurasi Apel Manalagi Kualitas Baik</th>
                <th>Akurasi Apel Manalagi Kualitas Buruk</th>
                <th>Akurasi Total</th>
              </tr>
            </thead>
            <tbody>
              {dataDetailKfold.map((hasilKFold, i) => {
                return (
                  <tr key={`RataRata-${i}`}>
                    <td width={"25%"}>
                      {i + 1}
                    </td>
                    <td width={"25%"}>
                      {hasilKFold.akurasiApelBaik.toFixed(2)} %
                    </td>
                    <td width={"25%"}>
                      {hasilKFold.akurasiApelBuruk.toFixed(2)} %
                    </td>
                    <td width={"50%"}>
                      {hasilKFold.akurasiTotal.toFixed(2)} %
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td>Rata - rata</td>
                <td>
                  {dataRataRata?.rataRataAKurasiApelBaik?.toFixed(2)} %
                </td>
                <td>
                  {dataRataRata?.rataRataAKurasiApelBuruk?.toFixed(2)} %
                </td>
                <td>
                  {dataRataRata?.rataRataAKurasiTotal?.toFixed(2)} %
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      </div>
      {loading ? <Loading /> : null}
    </div>
  );
};

export default KFold;
