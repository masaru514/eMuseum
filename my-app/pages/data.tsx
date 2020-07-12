export async function getStaticProps() {
  const RequestforAPI = "https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=" + 'vermeer'
  const getMetAPI = await fetch(RequestforAPI)
  const arts = await getMetAPI.json();
  const b = arts.total
  console.log(b)

  return ({props: {b}})
}

export default function dd({b}) {
  return(
    <div>{b}</div>
  )
}
