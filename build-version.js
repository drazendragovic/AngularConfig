console.log("Postavljanje verzije - pocetak.");

var fs = require('fs');
var data = fs.readFileSync('./package.json', { encoding: 'utf8' });
var packageJson = JSON.parse(data);

try {
   // var buildType = process.env.NPM_BUILD;
   // buildType = buildType == "main" ? "" : "-eprod";
   var buildVersion = process.env.BUILD_VERSION;
   var buildVersionParts = buildVersion.split(".");
   packageJson.version = buildVersionParts.slice(0, buildVersionParts.length -1).join(".");
   packageJson.buildNumber = buildVersionParts.slice(buildVersionParts.length - 1)[0].toString();
   fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2), { encoding: 'utf8' });
} catch(error) { }
console.log("Version", packageJson.version);
console.log("Build number", packageJson.buildNumber);

console.log("Postavljanje verzije - kraj.");





