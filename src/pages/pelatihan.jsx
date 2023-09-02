import React from "react";
import Table from "../components/table";
import Swal from "sweetalert2";
import { deleteDataLatih, getDataLatih, postDataLatih } from "../services/pelatihanApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/loading";
import { GOOD_QUALITY, BAD_QUALITY } from "../const/pelatihan/jenis";
import Spinner from "../components/spinner";

const Pelatihan = () => {
  const [loading, setLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const [data, setData] = React.useState([]);
  const [jenisPelatihan, setJenisPelatihan] = React.useState(GOOD_QUALITY);
  const [folder, setFolder] = React.useState("-");
  const [dataLatih, setDataLatih] = React.useState(null);
  const inputSelectFolderRef = React.useRef();
  const { isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["dataLatih"],
    queryFn: getDataLatih,
    onSuccess: (result) => {
      setData(result.data.data);
    }
  });
  const postMutation = useMutation(postDataLatih, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataLatih"] });
    },
    onError: (error) => {
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
  const deleteMutation = useMutation(deleteDataLatih, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataLatih"] });
    },
    onError: (error) => {
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



  React.useEffect(() => {
    if (postMutation.isLoading) {
      setLoading(true);
    }

    if(postMutation.isSuccess){
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    if (deleteMutation.isLoading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    
  }, [postMutation.isLoading,deleteMutation.isLoading,postMutation.isSuccess]);

  const handleChange = (e) => {
    setJenisPelatihan(e.target.value);
  };

  const handleChangeInput = (e) => {
    const files = e.target?.files;
    const folderName = files?.[0]?.webkitRelativePath.split("/");

    setFolder(folderName?.[0] ?? "-");
    setDataLatih(files);

    
  };

  const handleSelectFolderClick = (e) => {
    inputSelectFolderRef.current.click();
  };

  const handleProsesClick = (e) => {
    const form = new FormData();

    for (let i = 0; i < dataLatih.length; i++) {
      form.append(`DataLatih`, dataLatih[i]);
    }
    form.append("JenisPelatihan", jenisPelatihan);
    postMutation.mutate(form);

    setDataLatih([]);
    setFolder("-");
  };

  const handleDelete = async (e) => {
   const response = await Swal.fire({
      title: "Apakah anda yakin ?",
      text: "data yang telah dihapus tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText:"Batal"
    })
      
    if (response.isConfirmed) {
        deleteMutation.mutate();
      }

  };

  return (
    <div className="row my-2">
      <div className="col-6 ms-3">
        <button
          className="btn btn-folder custom-btn-shadow my-3"
          onClick={handleSelectFolderClick}
        >
          Pilih Folder Data Latih
        </button>
        <p>Nama Folder : {folder}</p>
        <input
          type="file"
          className="d-none"
          webkitdirectory=""
          mozdirectory=""
          ref={inputSelectFolderRef}
          onChange={handleChangeInput}
        
        />
        <div className="jenis-pelatihan ">
          <div className="radio-pilihan">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="jenisPelatihan"
                value={GOOD_QUALITY}
                onChange={handleChange}
                checked={jenisPelatihan === GOOD_QUALITY}
              />
              <label className="form-check-label">
                Kualitas Apel Manalagi Baik
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="jenisPelatihan"
                value={BAD_QUALITY}
                onChange={handleChange}
                checked={jenisPelatihan === BAD_QUALITY}
              />
              <label className="form-check-label">
                Kualitas Apel Manalagi Buruk
              </label>
            </div>
          </div>
        </div>
        <button
          className="btn btn-proses custom-btn-shadow mt-3"
          onClick={handleProsesClick}
          disabled={folder === "-"}
        >
          Proses
        </button>
      </div>
      <div className="col-12 mt-4 px-4">
        <h5 className="ms-3">Database</h5>
        {isLoading ? <Spinner />: null}
        {isError ? (
          <h5 className="text-center">Error : {error.message}</h5>
        ) : null}
        {isSuccess ? <Table data={data} type={"pelatihan"} /> : null}
        {data.length > 0 ? (
          <button
            className="btn btn-clear custom-btn-shadow my-2"
            onClick={handleDelete}
          >
            Bersihkan data latih
          </button>
        ) : null}
      </div>
      {loading ? <Loading /> : null}
    </div>
  );
};

export default Pelatihan;
