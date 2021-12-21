

const numberVerify = (val, char, cb) => {
    val = val.replace(/-/g, '').replace(/ /g, '').replace(/[+]/g, '')
    const valSplit = val.split('')
    let res = []
    if(valSplit[0] == '6'){
        return cb(val)
    } else {

        if(valSplit[0] == '0'){
          const splice = valSplit.splice(1,99)
          res.push(...splice)
        }

        res.unshift('',"6", "2")
        const result = res.join('')
        const numbFirst = result.substring(0, 5)
        const numbSecond = result.substring(5,8)
        const numbThird = result.substring(8,11)
        const numbFourth = result.substring(11)

        return cb(numbFirst + char + numbSecond + char + numbThird + char + numbFourth)
    }
    
}
numberVerify('085882843337', '', (val) => console.log(val))
module.exports = numberVerify