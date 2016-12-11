&quot;use strict&quot;;
const fs = require(&quot;fs&quot;);
const path = &quot;../../photos&quot;;
fs.readdir(path, function (err, files) {
    if (err) {
        return;
    }
    let arr = [];
    (function iterator(index) {
        if (index == files.length) {
            fs.writeFile(&quot;output.json&quot;, JSON.stringify(arr, null, &quot;\t&quot;));
            return;
        }

        fs.stat(path + &quot;/&quot; + files[index], function (err, stats) {
            if (err) {
                return;
            }
            if (stats.isFile()) {
                arr.push(files[index]);
            }
            iterator(index + 1);
        })
    }(0));
});