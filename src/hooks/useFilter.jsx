export function useFilter(data,callBack,qr){
    const filteredData=data.filter((item)=>{
        if(qr!=''){
            return callBack(item) === qr;
        }else{
            return item
        }
    });

   return filteredData;
}