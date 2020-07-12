// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {

    //200 成功
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ name: 'まさると申します' }))


}
