import Head from 'next/head'
import { useState,useEffect } from 'react'
import Arts from './../Component/arts'


//Promise re失敗した場合
function failedCallback(result) {
  console.log("失敗")
  return result
}


export default function Home() {
  const [display,setDisplay] = useState([])
  const [asyncbox,setAsyncbox] = useState([])

  async function CallApi() {

    //検索したキーワードのAPIを取得 今回はsunflowers
    const getMetAPI = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers")
    //JSON指定
    const arts = await getMetAPI.json();

    //promise 成功処理
    function successCallback(result) {
      const setItem = [...result]
      setDisplay([...display,result])
      setDisplay(result.map((art,i) =>
        <li key={i} style={{width: 'auto', paddingLeft: 10,paddingTop:10}}><img src={art} alt="" style={{width: 200, height: '100%',minHeight: 300,objectFit: 'cover'}}/></li>
      ))
    }

    //objectIDsを個別に分解したい
    const map1 = await Promise.all(arts.objectIDs.map(async (num) => {
      //met APIの個別オブジェクトIDをjson出力
      const getMetAPI2 = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + num)
      const getArtInfo = await getMetAPI2.json()
      const getArtInfo2 = await getArtInfo.primaryImageSmall
      //Promiseを返す
      return getArtInfo2
    })).then(successCallback)
    //↑map1の処理が終わった後は成功処理へ
  }    



  useEffect(() => {
    CallApi()
  },[])

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          世界の美術作品を検索(仮)
        </h1>
        <p>
          今はメトロポリタン美術館の一部のみ表示
        </p>

        <ul style={{listStyleType: "none", display: 'flex',width: '100%',flexWrap:'wrap'}}>
          {display}
        </ul>
      </main>

      <footer>
        <a
          href="https://masaru514.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by masaru514
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
