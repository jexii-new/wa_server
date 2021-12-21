const str = "[hai,halo,hei,heyou] , selamat pagi mas imron saya disini akan"
function converStr(newStr, cb){
let result = []
  let find = findBracket(newStr); 
  let del = deleteBracket(find, newStr.split(' ')); 
  result.push(...del)
  let parse =  parseBracket(find)
  result.unshift(parse)
  cb(result.join(' '))
}
function findBracket(data){
  data = data.split(' ').filter(val => val[0] == '[')
  return data
}
function deleteBracket(data, newStr){
let result = newStr.filter(val => val != data ? val : '')
  return result ;
}

function parseBracket (data) {
	console.log(data)
	const parse = data[0].split(']').join('').split('[').join('').split(',')
	return parse[Math.floor(Math.random() * parse.length)]
}

module.exports = converStr;
