console.log("Bagde kreiranje - pocetak.");
var fs = require('fs');
var cp = require('child_process');

var assetsOutputPath = "./dist/assets/";
if (!fs.existsSync(assetsOutputPath)){
    fs.mkdirSync(assetsOutputPath);
}

var packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
var appVersion = packageJson.version;
var appName = packageJson.name;
var okoline = ['dev', 'test', 'uat', 'prod'];

// definiranje vezije
var buildNumber = "-1";
try {
   // var buildType = process.env.NPM_BUILD;
   // buildType = buildType == "main" ? "" : "-eprod";
   var buildVersion = process.env.BUILD_VERSION;
   var buildVersionParts = buildVersion.split(".");
   // appVersion = buildVersionParts.slice(0, buildVersionParts.length -1).join(".");
   buildNumber = buildVersionParts.slice(buildVersionParts.length - 1)[0].toString();
} catch(error) {
   console.log("Greška kod parsiranja build numbera.");
} finally {
   appVersion = appVersion + "." + buildNumber;
}

var branchCommit = 'branch-commit placeholder';
try {

  const rev = fs.readFileSync('.git/HEAD').toString().trim();
  if (rev.indexOf(':') === -1) {
    console.log('Sadrzaj .git/HEAD, nije predvidjene forme.', rev);
  } else {
    // da bi ovo radilo, sadrzaj HEAD-a, mora biti ovakav: 'ref: refs/heads/dev/1.0.0'
    // const branchName = cp.execSync('git branch --show-current').toString().trim(); // tek od git versije 2.22.0
    const branchName = rev.substring(16).toString().trim(); // cp.execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    console.log('branchName', branchName);
    const commitSha = fs.readFileSync('.git/' + rev.substring(5)).toString().trim(); // cp.execSync('git rev-parse HEAD').toString().trim();
    console.log('last commit', commitSha);
    branchCommit = branchName + ": " + commitSha;
  }
} catch (error) {
   
}

var badgeOutputPath = "./dist/assets/badge/";
if (!fs.existsSync(badgeOutputPath)){
    fs.mkdirSync(badgeOutputPath);
}

for (let index = 0; index < okoline.length; index++) {
    const okolina = okoline[index];
    var svg =
`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350" height="40" viewBox="0 0 3500 400" role="img" aria-label="${appName}:${okolina}: ${appVersion}">
   <title>${appName}:${okolina}: ${appVersion}</title>
   <linearGradient id="a" x2="0" y2="100%">
      <stop offset="0" stop-opacity=".1" stop-color="#EEE" />
      <stop offset="1" stop-opacity=".1" />
   </linearGradient>
   <mask id="m">
      <rect width="3500" height="200" rx="30" ry="30" fill="#FFF" />
   </mask>
   <g mask="url(#m)">
      <rect width="2000" height="200" fill="#555" />
      <rect width="1500" height="200" fill="#3C1" x="2000" />
      <rect width="2000" height="200" fill="url(#a)" />
   </g>
   <g aria-hidden="true" fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
      <text x="220" y="148" fill="#000" opacity="0.25">${appName}:${okolina}</text>
      <text x="210" y="138">${appName}:${okolina}</text>
      <text x="2040" y="148" fill="#000" opacity="0.25">${appVersion}</text>
      <text x="2030" y="138">${appVersion}</text>
   </g>
   <image x="40" y="35" width="130" height="130" xlink:href="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjUwMHB4IiBoZWlnaHQ9IjUwMHB4IiB2aWV3Qm94PSIwIDAgNTAwIDUwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAwIDUwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8ZyBpZD0iZzQ4Ij4NCgk8cG9seWdvbiBpZD0icG9seWdvbjUwIiBmaWxsPSIjQjNCM0IzIiBwb2ludHM9IjU1LjY3OCwzOTIuMjM1IDI1Mi40NTEsNTAwLjM4NSA0NTAuMjM3LDM5MC43NyA0ODcuMTA4LDg0Ljk3OCAyNTIuMjAzLDQuMjkgDQoJCTE4Ljc5NCw4Ni40MzEgCSIvPg0KCTxwb2x5Z29uIGlkPSJwb2x5Z29uNTIiIGZpbGw9IiNBNjEyMEQiIHBvaW50cz0iMjUxLjY1OCw0NzQuNTQ2IDQyOS40NjUsMzc2LjE0IDQ2My44MjYsMTAyLjY1MSAyNTEuNjU4LDMwLjI5OSAJIi8+DQoJPHBvbHlnb24gaWQ9InBvbHlnb241NCIgZmlsbD0iI0REMUIxNiIgcG9pbnRzPSIyNTEuNjU1LDQ3NC41NDYgMjUxLjY1NSwzMC4yOSA0NC45ODYsMTAzLjk1NSA3Ni41OTIsMzc3LjQ0NyAJIi8+DQoJPHBhdGggaWQ9InBhdGg1NiIgZmlsbD0iI0YyRjJGMiIgZD0iTTMxMC4wNiwyNjYuNzkzbC01OC40MDIsMjcuMzFoLTYxLjU1NWwtMjguOTM2LDcyLjM3NWwtNTMuODIxLDAuOTk2TDI1MS42NTgsNDYuNDMxDQoJCUwzMTAuMDYsMjY2Ljc5M3ogTTMwNC40MTUsMjUzLjA0M2wtNTIuMzctMTAzLjY3NmwtNDIuOTU2LDEwMS44OTJoNDIuNTY3TDMwNC40MTUsMjUzLjA0M3oiLz4NCgk8cG9seWdvbiBpZD0icG9seWdvbjU4IiBmaWxsPSIjQjNCM0IzIiBwb2ludHM9IjMwMC43ODUsMjUxLjMzOCAyNTEuNzY1LDI1MS4zMzggMjUxLjY1NSwyOTQuMDM4IDMxOS40MzcsMjk0LjEwMyAzNTEuMTE3LDM2Ny40ODUgDQoJCTQwMi42MTUsMzY4LjQzOSAyNTEuNjU1LDQ2LjQzMSAyNTIuMDQyLDE0OS4zNjcgCSIvPg0KPC9nPg0KPC9zdmc+DQo=" />
     
  <!--drugi red, height si povecao 20->40 200->400-->
   <mask id="n">
      <rect width="3500" height="200" y="200" rx="30" ry="30" fill="#FFF" />
   </mask>
   <g mask="url(#n)">
      <rect width="3500" height="200" fill="#ed780b" y="200"/>
      <rect width="3500" height="200" fill="url(#a)" y="200"/>
   </g>
   <g aria-hidden="true" fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
      <text x="220" y="348" fill="#000" opacity="0.25">${branchCommit}</text>
      <text x="210" y="338">${branchCommit}</text>
   </g>
</svg>
`;

fs.writeFileSync(badgeOutputPath + okolina + '.svg', svg);
console.log(appName + ' ' + appVersion + ' ' + badgeOutputPath + okolina + '.svg');
}

console.log("Bagde kreiranje - kraj.");