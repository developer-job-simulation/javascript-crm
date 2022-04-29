

const ytdFormatter=(revenue_ytd)=>{
    let revenue_ytd_in_str=String(revenue_ytd)
    let formatted_ytd="";
    let endIndex=revenue_ytd_in_str.length
    while(endIndex>0){
        let startIndex=(endIndex>=3)?endIndex-3:0;
        formatted_ytd=revenue_ytd_in_str.substring(startIndex,endIndex)+" "+formatted_ytd
        endIndex-=3
    }
    return formatted_ytd
}


const convertDateToReadable=(date)=>{
   const dateObject=new Date(date)
   let hh=String(dateObject.getHours())
   let mm=String(dateObject.getMinutes())
   return (hh.length===1?("0"+hh):hh)+":"+(mm.length===1?("0"+mm):mm)
}

module.exports={
    ytdFormatter,
    convertDateToReadable
}