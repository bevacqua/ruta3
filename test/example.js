var ruta3 = require('../index');
var router = ruta3();

function fn1 () {}
function fn2 () {}

router.addRoute('/', fn1);
router.addRoute('/', fn2);

console.log(router.match('/').next());
