export function useSearch(data,query){
   const searchData = data.filter((el)=>{
    return el.title.toLowerCase().includes(query.toLowerCase())|| el.category.toLowerCase().includes(query.toLowerCase())
   });
   return searchData;
}