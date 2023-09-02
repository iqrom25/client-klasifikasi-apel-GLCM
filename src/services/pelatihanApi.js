import api from "../config/api";

export const getDataLatih = () => {
    return api.get('ListDataLatih');
}

export const postDataLatih = (form) => {
    return api.post('Pelatihan',form,{
        headers:{ "Content-Type": "multipart/form-data" }
    })
}

export const postDataUji = (form) => {
    return api.post('Pengujian',form,{
        headers:{ "Content-Type": "multipart/form-data" }
    })
}

export const deleteDataLatih = ()=>{
    return api.delete('ClearDatabase');
}

export const getKFold = (fold)=>{
    return api.get('Kfold',{
        params:{fold}
    })
}