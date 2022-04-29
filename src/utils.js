

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

module.exports={
    ytdFormatter
}