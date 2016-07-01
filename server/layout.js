/* eslint-disable max-len */

function layout(body, initialState, cssModules) {
  return (`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Application</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <link rel="stylesheet" type="text/css" href="styles.css" />
      <style id="serverStyles">${cssModules}</style>
    </head>
    <body>
      <div id="root" style="height:100%">${body}</div>
      <script type="text/javascript" charset="utf-8">
        window.__INITIAL_STATE__ = ${initialState};
      </script>
      <script src="/vendor.bundle.js"></script>
      <script src="/app.js"></script>
    </body>
    </html>
  `)
}

export default layout
