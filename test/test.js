var System = Java.type('java.lang.System')

var majesty = require('majesty');
var Paths = Java.type('java.nio.file.Paths');

var testFiles = collectTestFiles(Paths.get(rootPath).toFile());

System.setProperty('thrust.dir', `${rootPath}/../src/`);

function collectTestFiles(baseDir) {
    var testFiles = [];

    // console.log('baseDir:', baseDir.getName(), '\tGRAAL:', getEnv('GRAAL'))
    // if (baseDir.getName() == 'graaljs' && !getEnv('GRAAL')) {
    if (baseDir.getName() == 'graaljs') {
        return testFiles;
    }

    Java.from(baseDir.listFiles()).forEach(function (file) {
        if (file.isFile()) {
            if (file.getName().endsWith('.spec.js')) {
                testFiles.push('./' + Paths.get(rootPath).relativize(Paths.get(file.getPath())).toString());
            }
        } else {
            testFiles = testFiles.concat(collectTestFiles(file));
        }
    });

    return testFiles;
}

var res = majesty.run(function () {
    var testArgs = arguments;
    var ctx = this;

    testFiles.forEach(function (testFile) {
        require(testFile).apply(ctx, testArgs);
    });
})

// exit(res.failure.length);
quit(res.failure.length);
