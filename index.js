function fnOrReturn(fn, text) {
	return fn ? fn(text) : text;
}

module.exports = function (uid, gid, log) {
	if (log && typeof log !== 'function')
		log = function(text) {
			console.log('Drop privileges', text);
		}
	if (uid != null && /^\d+$/.test(uid))
		uid = parseInt(uid);
	if (gid != null && /^\d+$/.test(gid))
		gid = parseInt(gid);
	if (!process.getuid)
		return fnOrReturn(log, 'Failed: not in POSIX');
	if (process.getuid() != 0)
		return fnOrReturn(log, 'Failed: must be root to do this');
	if (gid != null) {
		process.setgid(gid);
	}
	if (uid != null) {
		process.initgroups(uid, gid ? gid : process.getgid()); 
		process.setuid(uid);
	}
	return fnOrReturn(log, ['Running with uid=', process.getuid(), ', guid=', process.getgid(), ', groups=', process.getgroups().join(',')].join(''));
}
