import React,{ useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Arts(props) {

  const [display,setDisplay] = useState([])
  const [imgload,setImageLoad] = useState({loading: false})

  async function CallArt() {
    //検索したキーワードのAPIを取得 任意のワード
    const RequestforAPI = "https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=" + props.ward
    const getMetAPI = await fetch(RequestforAPI)
    const arts = await getMetAPI.json();
    console.log(arts)

    //objectIDsを個別に分解したい
    if(arts.total !== 0){
      const map1 = await Promise.all(
        arts.objectIDs.slice(0,props.n).map(async (num) => {
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

    //promise 成功処理
    function successCallback(result) {
      setDisplay(result)
      setImageLoad({loading: true})
    }
    // console.log(display)

    //promise 失敗処理
    function failureCallBack(result) {
      setDisplay([0])
    }

  }

  function MetroComponent() {
    const lists = display.map((item,i) => {
      return(
      <li key={i}>
        <img src={item.getArtInfo2} alt={item.getArtInfo4}/>
        <p>{item.getArtInfo4}</p>
        <p>{item.getArtInfo3}</p>
      </li>
      )
    })

    return(
      <>{lists}</>
    )
  }

  // if(imgload.loading == false) {
  // }
  //メトロAPIの配列を一つずつさばく



  useEffect(() => {
    CallArt()
  },[props.ward,props.n])

  return(
    <>
      <MetroComponent />

    </>
  )
}

