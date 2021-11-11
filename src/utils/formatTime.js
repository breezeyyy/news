export default time => {
	const fillZero = value => value < 10 ? `0${value}` : value;
	const date = new Date(time);
	return `${date.getFullYear()}年${fillZero(date.getMonth() + 1)}月${fillZero(date.getDate())}日 ${fillZero(date.getHours())}:${fillZero(date.getMinutes())}:${fillZero(date.getSeconds())}`
}