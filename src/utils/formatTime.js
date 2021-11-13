export default time => {
	const fillZero = value => value < 10 ? `0${value}` : value;
	const date = new Date(time);
	return `${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(date.getDate())} | ${fillZero(date.getHours())}:${fillZero(date.getMinutes())}`
}
