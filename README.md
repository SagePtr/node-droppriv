## Installation

```bash
$ npm install droppriv
```

## Examples

Predefined user:
```js
require('droppriv')('user', 'group');
```

From env SETUID and SETGUID (nobody:nogroup if not set):
```js
require('droppriv')(process.env.SETUID || 'nobody', process.env.SETGID || 'nogroup');
```

If you want log droppriv:
```js
require('droppriv')(
	process.env.SETUID || 'nobody',
	process.env.SETGID || 'nogroup',
	true
);
```

Or custom logging function:
```js
var winston = require('winston');
winston.cli();
require('droppriv')(
	process.env.SETUID || 'nobody',
	process.env.SETGID || 'nogroup',
	winston.info
);
```

# Requirements

* POSIX OS (Linux, FreeBSD, etc). Does nothing on Windows (doesn't fail).
