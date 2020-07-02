import React,{ useState,useEffect } from 'react'
import ReactLoading from 'react-loading';

export default function Arts(props) {

  const [display,setDisplay] = useState([])
  const [check,setCheck] = useState({
    isLoading: true,
    isCount: true
  })
  console.log(check.isLoading)

  //loading
  const Loading = () =>{
    //loadのstateがtrueであれば読み込み中
      return <ReactLoading type="spinningBubbles" color="#333" height={100} width={100} />
    //loadのstateがfalseであれば読み込み完了
  }
  const NoImages = () => {
    return <p>検索キーワードは見つかりませんでした。<br />人物名を入れてみてください。<br />例：gogh</p>
  }

  //call api
  async function CallArt() {
    //検索したキーワードのAPIを取得 任意のワード
    const RequestforAPI = "https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=" + props.ward
    const getMetAPI = await fetch(RequestforAPI)
    const arts = await getMetAPI.json();
    console.log(arts)

    if( check.isLoading == false){
      setCheck({ isLoading: true,isCount: true})
    }

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

    if(arts.total == 0){
      setCheck({isLoading: false, isCount: false})
      setDisplay([])
      console.log(display)
    }

    console.log(arts.total)

    //promise 成功処理
    function successCallback(result) {
      setDisplay(result)
      setCheck({isLoading: false, isCount: true})
    }

    //promise 失敗処理
    function failureCallBack() {
      return (
        <>
          <p>画像の取得に失敗しました。再度検索をしてみてください。</p>
        </>
      )
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

  useEffect(() => {
    CallArt()
  },[props.ward,props.n])

  return(
    <>
      <MetroComponent />
      {check.isLoading ? <Loading /> : null}
      {check.isCount ?  null : <NoImages />}
    </>
  )
}

