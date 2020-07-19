import Head from 'next/head'
import { useState } from 'react'
import Arts from './../Component/arts'
import Link from 'next/link'
import { useRouter } from 'next/router'

//Promise re失敗した場合
function failedCallback(result) {
  console.log("失敗")
  return result
}

interface variables{
  value: string,
  search: string,
  stateNum: number,

}

export default function Home(props:variables) {
  //検索キーワードの状態を保存
  const [search,setSearch] = useState("Peter paul Rubens")
  const [stateNum,setStateNum] = useState(20)

  // console.log(search)

  //検索キーワードを子コンポーネントに送る
  const handleChange = (e) => {
    if(e.key === 'Enter'){
      setSearch(e.target.value)
    }
  }

  const incrementNum = () => {
    setStateNum(stateNum + 18)
  }

  return (
    <div className="container">
      <Head>
        <title>Metro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="title-mv">
          <h1 className="title">
            メトロポリタン美術館
          </h1>
          <div className="mv-box">
            <img className="mv" src={require('./image.png')} alt=""/>
            <img className="mv" src={require('./image.png')} alt=""/>
          </div>
        </div>



        <h3 style={{padding:'0 20'}}>Vermeer(フェルメール)や<br />Peter paul rubens(ピーテル・パウル・ルーベンス)<br />などの有名作品があります。<br/>英語で検索してください。</h3>

        <p>検索ワード：{search}</p>
        <input type="text" onKeyPress={handleChange} placeholder="検索キーワードを入力"/>

        <Arts ward={search} n={stateNum} />

        <div><button onClick={incrementNum}>もっと見る</button></div>
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

        @keyframes loop {
          0% {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }
        
        @keyframes loop2 {
          0% {
            transform: translateX(0);
          }
          to {
            transform: translateX(-200%);
          }
        }

        .mv-box{
          position: relative;
          display: flex;
          height: 400px;
          width: 100vw;
          overflow: hidden;
        }

        .mv-box img:first-child {
          animation: loop 60s -30s linear infinite;
        }
        
        .mv-box img:last-child {
          animation: loop2 60s linear infinite;
        }

        .mv{
          width: auto;
          height: 100%;
        }

        main {
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

        .title-mv{
          position: relative;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 48px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          z-index: 100;
          color: #fff;
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
