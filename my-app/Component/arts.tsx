import React,{ useState,useEffect } from 'react'


export default function Arts(props) {

  const [display,setDisplay] = useState([])

  async function CallArt() {
    //検索したキーワードのAPIを取得 任意のワード
    const RequestforAPI = "https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=" + props.ward
    const getMetAPI = await fetch(RequestforAPI)
    //JSON指定
    const arts = await getMetAPI.json();
    console.log(arts)

    //promise 成功処理
    function successCallback(result) {
      const setItem = [...result]
      console.log(result)
      setDisplay(setItem.slice(0,20).map((art,i) =>
        <li key={i} style={{width: 'auto', height:'100%', paddingLeft: 10,paddingTop:10}}>
          <img src={art.getArtInfo2} alt="" style={{width: 400, height: 500,minHeight: 300,objectFit: 'cover'}}/>
          <p style={{wordBreak: 'break-word',textAlign: 'center' ,width: 400}}>{art.getArtInfo4}</p>
          <p style={{wordBreak: 'break-word',textAlign: 'center'}}>{art.getArtInfo3}</p>
        </li>
      ))
      console.log(display)
    }

    function failureCallBack(result) {
      setDisplay([0])
    }

    //objectIDsを個別に分解したい
    if(arts.total !== 0){
      const map1 = await Promise.all(
        arts.objectIDs.slice(0,20).map(async (num) => {
        //met APIの個別オブジェクトIDをjson出力
        const getMetAPI2 = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + num)
        const getArtInfo = await getMetAPI2.json()
        const getArtInfo2 = await getArtInfo.primaryImageSmall
        const getArtInfo3 = await getArtInfo.artistDisplayName
        const getArtInfo4 = await getArtInfo.title
        //Promiseを返す
        return {getArtInfo2 , getArtInfo3, getArtInfo4}
        })).then(successCallback,failureCallBack)
      // ↑map1の処理が終わった後は成功処理へ
      }
      console.log(arts.total)
    }





  useEffect(() => {
    CallArt()
  },[props.ward])

  return(
    <>
      {display}
    </>
  )
}

